-- Migration: ai_data_retention
-- LGPD data minimization & retention enforcement:
--   - Telemetry logs: purge after 30 days
--   - Expired answer cache: purge past expires_at
--   - Recruiter leads: purge after 180 days (matches LeadForm LGPD consent notice)

create or replace function public.purge_expired_ai_data()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_telemetry_deleted integer := 0;
  v_cache_deleted integer := 0;
  v_leads_deleted integer := 0;
begin
  delete from public.ai_telemetry_logs
  where created_at < now() - interval '30 days';
  get diagnostics v_telemetry_deleted = row_count;

  delete from public.ai_answer_cache
  where expires_at < now();
  get diagnostics v_cache_deleted = row_count;

  delete from public.recruiter_leads
  where created_at < now() - interval '180 days';
  get diagnostics v_leads_deleted = row_count;

  return jsonb_build_object(
    'telemetry_deleted', v_telemetry_deleted,
    'cache_deleted', v_cache_deleted,
    'leads_deleted', v_leads_deleted,
    'ran_at', now()
  );
end;
$$;

revoke execute on function public.purge_expired_ai_data() from anon, authenticated, public;
