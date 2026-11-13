-- Migration: secure_write_path
-- Problem: the publishable `anon` key is public by design, so any visitor could (a) INSERT arbitrary rows
-- into telemetry/leads straight through PostgREST (bypassing /api rate limits and guardrails) and
-- (b) call the cache upsert RPC to POISON cached answers served to other visitors.
-- Fix: every write now goes through SECURITY DEFINER RPCs that require a server-side write secret
-- (held only in the Edge runtime env `AI_WRITE_SECRET` and in public.ai_private_config).
-- `anon` keeps read-only access to public knowledge chunks and non-expired cached answers.
--
-- The secret itself is NOT stored in this repository. Provision/rotate it with:
--   insert into public.ai_private_config(key, value) values ('write_secret', '<random-hex>')
--   on conflict (key) do update set value = excluded.value;

-- 1. Private config (no policies, no grants -> unreachable via PostgREST)
create table if not exists public.ai_private_config (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
alter table public.ai_private_config enable row level security;
revoke all on table public.ai_private_config from anon, authenticated, public;

create or replace function public.ai_check_write_secret(p_secret text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select p_secret is not null
     and char_length(p_secret) >= 32
     and exists (
       select 1 from public.ai_private_config c
       where c.key = 'write_secret' and c.value = p_secret
     );
$$;
revoke execute on function public.ai_check_write_secret(text) from anon, authenticated, public;

-- 2. Consent tracking for LGPD on leads
alter table public.recruiter_leads add column if not exists consent_at timestamptz;

-- 3. Secured telemetry insert
create or replace function public.ai_log_telemetry(p_secret text, p_payload jsonb)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.ai_check_write_secret(p_secret) then
    return false;
  end if;

  insert into public.ai_telemetry_logs (
    trace_id, session_id, locale, original_query, rewritten_query, intent, aspect, crag_status,
    confidence, is_multi_part, needs_clarification, used_llm, cache_hit, cove_repaired,
    top_chunk_ids, citations, latency_ms
  )
  values (
    p_payload->>'trace_id',
    coalesce(p_payload->>'session_id', 'anonymous'),
    coalesce(p_payload->>'locale', 'pt'),
    left(p_payload->>'original_query', 600),
    left(coalesce(p_payload->>'rewritten_query', ''), 800),
    p_payload->>'intent',
    coalesce(p_payload->>'aspect', 'general'),
    p_payload->>'crag_status',
    coalesce((p_payload->>'confidence')::numeric, 0),
    coalesce((p_payload->>'is_multi_part')::boolean, false),
    coalesce((p_payload->>'needs_clarification')::boolean, false),
    coalesce((p_payload->>'used_llm')::boolean, false),
    coalesce((p_payload->>'cache_hit')::boolean, false),
    coalesce((p_payload->>'cove_repaired')::boolean, false),
    array(select jsonb_array_elements_text(coalesce(p_payload->'top_chunk_ids', '[]'::jsonb))),
    array(select jsonb_array_elements_text(coalesce(p_payload->'citations', '[]'::jsonb))),
    coalesce((p_payload->>'latency_ms')::integer, 0)
  )
  on conflict (trace_id) do nothing;

  return true;
end;
$$;

-- 4. Secured feedback
create or replace function public.ai_submit_feedback(
  p_secret text,
  p_trace_id text,
  p_helpful boolean,
  p_comment text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_updated integer;
begin
  if not public.ai_check_write_secret(p_secret) then
    return false;
  end if;
  if p_trace_id is null or char_length(p_trace_id) < 8 or char_length(p_trace_id) > 80 then
    return false;
  end if;

  update public.ai_telemetry_logs
  set
    helpful = p_helpful,
    feedback_comment = coalesce(left(p_comment, 500), feedback_comment),
    feedback_at = now()
  where trace_id = p_trace_id
    and created_at > (now() - interval '24 hours');

  get diagnostics v_updated = row_count;
  return v_updated > 0;
end;
$$;

-- 5. Secured answer-cache upsert
create or replace function public.ai_upsert_answer_cache(
  p_secret text,
  p_query_hash text,
  p_locale text,
  p_normalized_query text,
  p_intent text,
  p_aspect text,
  p_crag_status text,
  p_response_text text,
  p_citations text[] default '{}'
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.ai_check_write_secret(p_secret) then
    return false;
  end if;
  if p_query_hash is null or char_length(p_query_hash) < 8
     or p_locale not in ('pt', 'en')
     or p_crag_status not in ('sufficient', 'partial')
     or p_response_text is null or char_length(p_response_text) < 10 or char_length(p_response_text) > 6000 then
    return false;
  end if;

  insert into public.ai_answer_cache (
    query_hash, locale, normalized_query, intent, aspect, crag_status,
    response_text, citations, hit_count, expires_at, updated_at
  )
  values (
    p_query_hash, p_locale, left(p_normalized_query, 500), left(p_intent, 40),
    left(coalesce(p_aspect, 'general'), 40), p_crag_status, p_response_text,
    coalesce(p_citations, '{}'), 1, now() + interval '7 days', now()
  )
  on conflict (query_hash, locale) do update
  set
    response_text = excluded.response_text,
    citations = excluded.citations,
    hit_count = public.ai_answer_cache.hit_count + 1,
    expires_at = now() + interval '7 days',
    updated_at = now();

  return true;
end;
$$;

-- 6. Secured lead insert with DB-enforced rate limits (works across all Edge instances)
create or replace function public.ai_submit_lead(p_secret text, p_payload jsonb)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_name text := trim(coalesce(p_payload->>'recruiter_name', ''));
  v_contact text := trim(coalesce(p_payload->>'contact_channel', ''));
  v_message text := trim(coalesce(p_payload->>'message', ''));
  v_consent boolean := coalesce((p_payload->>'consent')::boolean, false);
  v_count integer;
begin
  if not public.ai_check_write_secret(p_secret) then
    return 'forbidden';
  end if;
  if char_length(v_name) < 2 or char_length(v_contact) < 3 or char_length(v_message) < 5 or not v_consent then
    return 'invalid';
  end if;

  select count(*) into v_count from public.recruiter_leads where created_at > now() - interval '1 hour';
  if v_count >= 20 then
    return 'rate_limited';
  end if;
  select count(*) into v_count
  from public.recruiter_leads
  where contact_channel = left(v_contact, 180) and created_at > now() - interval '1 hour';
  if v_count >= 3 then
    return 'rate_limited';
  end if;

  insert into public.recruiter_leads (
    trace_id, recruiter_name, company, contact_channel, role_title, message, locale, status, consent_at
  )
  values (
    left(p_payload->>'trace_id', 80),
    left(v_name, 120),
    left(nullif(trim(coalesce(p_payload->>'company', '')), ''), 120),
    left(v_contact, 180),
    left(nullif(trim(coalesce(p_payload->>'role_title', '')), ''), 160),
    left(v_message, 1500),
    case when p_payload->>'locale' = 'en' then 'en' else 'pt' end,
    'new',
    now()
  );

  return 'ok';
end;
$$;

-- 7. Lock down the old unauthenticated write paths
revoke insert on table public.ai_telemetry_logs from anon, authenticated;
revoke insert on table public.recruiter_leads from anon, authenticated;
revoke execute on function public.submit_ai_feedback(text, boolean, text) from anon, authenticated, public;
revoke execute on function public.upsert_ai_answer_cache(text, text, text, text, text, text, text, text[]) from anon, authenticated, public;

-- 8. Expose only the secured RPCs (each validates the secret internally)
revoke execute on function public.ai_log_telemetry(text, jsonb) from public;
revoke execute on function public.ai_submit_feedback(text, text, boolean, text) from public;
revoke execute on function public.ai_upsert_answer_cache(text, text, text, text, text, text, text, text, text[]) from public;
revoke execute on function public.ai_submit_lead(text, jsonb) from public;
grant execute on function public.ai_log_telemetry(text, jsonb) to anon, authenticated;
grant execute on function public.ai_submit_feedback(text, text, boolean, text) to anon, authenticated;
grant execute on function public.ai_upsert_answer_cache(text, text, text, text, text, text, text, text, text[]) to anon, authenticated;
grant execute on function public.ai_submit_lead(text, jsonb) to anon, authenticated;
