-- Migration: rename_answer_cache
-- Honest naming: the L2 cache is an exact-match cache keyed by a hash of the normalized query
-- (locale + aspect + normalized text). It performs NO semantic/embedding similarity.
-- Non-destructive: renames the table/index/policy and adds the renamed upsert function.
-- (The legacy `upsert_ai_semantic_cache` function and the unused `embedding` column are removed
--  in a later, separately-approved cleanup.)

alter table public.ai_semantic_cache rename to ai_answer_cache;
alter index if exists public.ai_semantic_cache_lookup_idx rename to ai_answer_cache_lookup_idx;
alter policy "ai_semantic_cache_public_read" on public.ai_answer_cache rename to "ai_answer_cache_public_read";

revoke execute on function public.upsert_ai_semantic_cache(text, text, text, text, text, text, text, text[]) from anon, authenticated, public;

create or replace function public.upsert_ai_answer_cache(
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

  insert into public.ai_answer_cache (
    query_hash, locale, normalized_query, intent, aspect, crag_status,
    response_text, citations, hit_count, expires_at, updated_at
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
    hit_count = public.ai_answer_cache.hit_count + 1,
    expires_at = now() + interval '7 days',
    updated_at = now();
end;
$$;

grant execute on function public.upsert_ai_answer_cache(text, text, text, text, text, text, text, text[]) to anon, authenticated;
