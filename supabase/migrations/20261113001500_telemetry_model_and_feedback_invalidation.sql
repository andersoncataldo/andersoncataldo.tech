-- Passo 1, 2 e 4: Rastreamento de modelo/reason, invalidação automática do cache L2 por feedback negativo e agendamento opcional de retenção LGPD

ALTER TABLE public.ai_telemetry_logs
  ADD COLUMN IF NOT EXISTS model_used text,
  ADD COLUMN IF NOT EXISTS response_reason text;

-- Atualiza ai_submit_feedback mantendo a mesma assinatura (compatível com restClient.ts)
-- Quando p_helpful = false, invalida entradas correspondentes em ai_answer_cache
CREATE OR REPLACE FUNCTION public.ai_submit_feedback(
  p_secret text,
  p_trace_id text,
  p_helpful boolean,
  p_comment text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_expected text;
  v_locale text;
  v_intent text;
  v_query text;
BEGIN
  SELECT value INTO v_expected
  FROM public.ai_private_config
  WHERE key = 'write_secret';

  IF v_expected IS NULL OR p_secret IS DISTINCT FROM v_expected THEN
    RAISE EXCEPTION 'unauthorized write';
  END IF;

  UPDATE public.ai_telemetry_logs
  SET
    helpful = p_helpful,
    feedback_comment = CASE
      WHEN p_comment IS NULL OR length(trim(p_comment)) = 0 THEN feedback_comment
      ELSE left(trim(p_comment), 500)
    END,
    feedback_at = now()
  WHERE trace_id = p_trace_id
  RETURNING locale, intent, original_query
  INTO v_locale, v_intent, v_query;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Feedback negativo invalida respostas em cache L2 para evitar reuso de resposta mal avaliada
  IF p_helpful = false AND v_query IS NOT NULL THEN
    DELETE FROM public.ai_answer_cache
    WHERE locale = COALESCE(v_locale, locale)
      AND intent = COALESCE(v_intent, intent)
      AND normalized_query = lower(regexp_replace(trim(v_query), '[^a-zA-Z0-9À-ÿ\s]', '', 'g'));
  END IF;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.ai_submit_feedback(text, text, boolean, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.ai_submit_feedback(text, text, boolean, text) TO anon, authenticated, service_role;

-- Agenda retenção LGPD diária se pg_cron estiver habilitado no projeto Supabase
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.unschedule('purge-expired-ai-data-daily')
    WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'purge-expired-ai-data-daily');

    PERFORM cron.schedule(
      'purge-expired-ai-data-daily',
      '0 3 * * *',
      'SELECT public.purge_expired_ai_data();'
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- Ignora caso pg_cron não tenha permissão no plano atual (fallback via GitHub Actions / RPC)
  NULL;
END $$;
