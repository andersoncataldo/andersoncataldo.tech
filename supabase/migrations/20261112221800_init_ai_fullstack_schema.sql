-- =============================================================================
-- Migration: 20261112221800_init_ai_fullstack_schema
-- Project: andersoncataldo.tech (cagywhslrofuwlmpzbfy)
-- Description: Dual-Layer Full-Stack AI Schema (Knowledge Chunks, Telemetry
--              LLMOps + Feedback Loop, Global Semantic Cache, Recruiter Leads)
--              following Supabase Postgres Best Practices & Strict RLS.
-- =============================================================================

-- 1. Extensions
create schema if not exists extensions;
create extension if not exists vector with schema extensions;
create extension if not exists pg_trgm with schema extensions;

-- 2. Table: public.ai_knowledge_chunks
create table if not exists public.ai_knowledge_chunks (
  id bigint generated always as identity primary key,
  chunk_id text not null unique,
  lang text not null check (lang in ('pt', 'en')),
  category text not null,
  title text not null,
  content text not null,
  short_answer text not null,
  anchor text not null,
  keywords text[] not null default '{}',
  entities text[] not null default '{}',
  synonyms text[] not null default '{}',
  facets jsonb not null default '{}'::jsonb,
  priority integer not null default 5,
  embedding extensions.vector(768),
  search_vector tsvector generated always as (
    to_tsvector(
      'simple',
      coalesce(title, '') || ' ' || coalesce(short_answer, '') || ' ' || coalesce(content, '')
    )
  ) stored,
  updated_at timestamptz not null default now()
);

create index if not exists ai_knowledge_chunks_lang_category_idx
  on public.ai_knowledge_chunks (lang, category);

create index if not exists ai_knowledge_chunks_search_idx
  on public.ai_knowledge_chunks using gin (search_vector);

create index if not exists ai_knowledge_chunks_facets_idx
  on public.ai_knowledge_chunks using gin (facets);

alter table public.ai_knowledge_chunks enable row level security;

create policy "ai_knowledge_chunks_public_read"
  on public.ai_knowledge_chunks
  for select
  to anon, authenticated
  using (true);

-- 3. Table: public.ai_telemetry_logs
create table if not exists public.ai_telemetry_logs (
  id bigint generated always as identity primary key,
  trace_id text not null unique check (char_length(trace_id) between 8 and 80),
  session_id text not null default 'anonymous' check (char_length(session_id) <= 80),
  locale text not null default 'pt' check (locale in ('pt', 'en')),
  original_query text not null check (char_length(original_query) between 1 and 600),
  rewritten_query text not null default '' check (char_length(rewritten_query) <= 800),
  intent text not null check (char_length(intent) between 2 and 40),
  aspect text not null default 'general' check (char_length(aspect) between 2 and 40),
  crag_status text not null check (crag_status in ('sufficient', 'partial', 'insufficient')),
  confidence numeric(5,4) not null default 0 check (confidence >= 0 and confidence <= 1),
  is_multi_part boolean not null default false,
  needs_clarification boolean not null default false,
  used_llm boolean not null default false,
  cache_hit boolean not null default false,
  cove_repaired boolean not null default false,
  top_chunk_ids text[] not null default '{}',
  citations text[] not null default '{}',
  latency_ms integer not null default 0 check (latency_ms >= 0 and latency_ms <= 60000),
  helpful boolean,
  feedback_comment text check (feedback_comment is null or char_length(feedback_comment) <= 500),
  feedback_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists ai_telemetry_logs_created_at_idx
  on public.ai_telemetry_logs (created_at desc);

create index if not exists ai_telemetry_logs_crag_gaps_idx
  on public.ai_telemetry_logs (crag_status, created_at desc)
  where crag_status in ('partial', 'insufficient');

create index if not exists ai_telemetry_logs_helpful_idx
  on public.ai_telemetry_logs (helpful, created_at desc)
  where helpful is not null;

alter table public.ai_telemetry_logs enable row level security;

create policy "ai_telemetry_logs_anon_insert"
  on public.ai_telemetry_logs
  for insert
  to anon, authenticated
  with check (
    char_length(trace_id) between 8 and 80
    and char_length(original_query) between 1 and 600
    and helpful is null
  );

-- Controlled RPC for updating feedback on a specific trace_id without exposing SELECT/UPDATE on the table
create or replace function public.submit_ai_feedback(
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
  if p_trace_id is null or char_length(p_trace_id) < 8 or char_length(p_trace_id) > 80 then
    return false;
  end if;

  if p_comment is not null and char_length(p_comment) > 500 then
    p_comment := left(p_comment, 500);
  end if;

  update public.ai_telemetry_logs
  set
    helpful = p_helpful,
    feedback_comment = coalesce(p_comment, feedback_comment),
    feedback_at = now()
  where trace_id = p_trace_id
    and created_at > (now() - interval '24 hours');

  get diagnostics v_updated = row_count;
  return v_updated > 0;
end;
$$;

grant execute on function public.submit_ai_feedback(text, boolean, text) to anon, authenticated;

-- 4. Table: public.ai_semantic_cache
create table if not exists public.ai_semantic_cache (
  id bigint generated always as identity primary key,
  query_hash text not null check (char_length(query_hash) between 8 and 128),
  locale text not null check (locale in ('pt', 'en')),
  normalized_query text not null check (char_length(normalized_query) between 1 and 500),
  intent text not null check (char_length(intent) between 2 and 40),
  aspect text not null default 'general' check (char_length(aspect) between 2 and 40),
  crag_status text not null check (crag_status in ('sufficient', 'partial')),
  response_text text not null check (char_length(response_text) between 1 and 6000),
  citations text[] not null default '{}',
  hit_count integer not null default 1 check (hit_count >= 1),
  expires_at timestamptz not null default (now() + interval '7 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (query_hash, locale)
);

create index if not exists ai_semantic_cache_lookup_idx
  on public.ai_semantic_cache (query_hash, locale, expires_at);

alter table public.ai_semantic_cache enable row level security;

create policy "ai_semantic_cache_public_read"
  on public.ai_semantic_cache
  for select
  to anon, authenticated
  using (expires_at > now());

create or replace function public.upsert_ai_semantic_cache(
  p_query_hash text,
  p_locale text,
  p_normalized_query text,
  p_intent text,
  p_aspect text,
  p_crag_status text,
  p_response_text text,
  p_citations text[] default '{}'
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_query_hash is null or char_length(p_query_hash) < 8 then
    return;
  end if;
  if p_locale not in ('pt', 'en') or p_crag_status not in ('sufficient', 'partial') then
    return;
  end if;
  if p_response_text is null or char_length(p_response_text) < 10 or char_length(p_response_text) > 6000 then
    return;
  end if;

  insert into public.ai_semantic_cache (
    query_hash,
    locale,
    normalized_query,
    intent,
    aspect,
    crag_status,
    response_text,
    citations,
    hit_count,
    expires_at,
    updated_at
  )
  values (
    p_query_hash,
    p_locale,
    left(p_normalized_query, 500),
    left(p_intent, 40),
    left(coalesce(p_aspect, 'general'), 40),
    p_crag_status,
    p_response_text,
    coalesce(p_citations, '{}'),
    1,
    now() + interval '7 days',
    now()
  )
  on conflict (query_hash, locale) do update
  set
    response_text = excluded.response_text,
    citations = excluded.citations,
    hit_count = public.ai_semantic_cache.hit_count + 1,
    expires_at = now() + interval '7 days',
    updated_at = now();
end;
$$;

grant execute on function public.upsert_ai_semantic_cache(text, text, text, text, text, text, text, text[]) to anon, authenticated;

-- 5. Table: public.recruiter_leads
create table if not exists public.recruiter_leads (
  id bigint generated always as identity primary key,
  trace_id text check (trace_id is null or char_length(trace_id) <= 80),
  recruiter_name text not null check (char_length(recruiter_name) between 2 and 120),
  company text check (company is null or char_length(company) <= 120),
  contact_channel text not null check (char_length(contact_channel) between 3 and 180),
  role_title text check (role_title is null or char_length(role_title) <= 160),
  message text not null check (char_length(message) between 5 and 1500),
  locale text not null default 'pt' check (locale in ('pt', 'en')),
  status text not null default 'new' check (status in ('new', 'reviewed', 'contacted', 'archived')),
  created_at timestamptz not null default now()
);

create index if not exists recruiter_leads_created_at_idx
  on public.recruiter_leads (created_at desc);

alter table public.recruiter_leads enable row level security;

create policy "recruiter_leads_anon_insert"
  on public.recruiter_leads
  for insert
  to anon, authenticated
  with check (
    status = 'new'
    and char_length(recruiter_name) between 2 and 120
    and char_length(contact_channel) between 3 and 180
    and char_length(message) between 5 and 1500
  );

-- 6. Explicit Table & Sequence Grants for anon/authenticated (paired with RLS above)
grant select on table public.ai_knowledge_chunks to anon, authenticated;
grant select on table public.ai_semantic_cache to anon, authenticated;
grant insert on table public.ai_telemetry_logs to anon, authenticated;
grant insert on table public.recruiter_leads to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

