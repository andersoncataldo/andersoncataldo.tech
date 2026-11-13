import React, { useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { isValidContactChannel } from '../../lib/contactValidation';

type Language = 'pt' | 'en';
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'rate_limited';

interface LeadFormProps {
  language: Language;
  /** traceId da última resposta do assistente, para correlacionar o contato com a conversa */
  traceId?: string;
  onClose: () => void;
}

const FIELD_CLASS =
  'w-full px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500';

export const LeadForm: React.FC<LeadFormProps> = ({ language, traceId, onClose }) => {
  const en = language === 'en';
  const openedAtRef = useRef<number>(Date.now());
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [contactTouched, setContactTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const contactInvalid = contactTouched && contact.trim().length > 0 && !isValidContactChannel(contact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactTouched(true);
    if (
      status === 'submitting' ||
      !name.trim() ||
      !message.trim() ||
      !consent ||
      !isValidContactChannel(contact)
    ) {
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          traceId,
          recruiterName: name.trim(),
          company: company.trim() || undefined,
          contactChannel: contact.trim(),
          message: message.trim(),
          lang: language,
          consent,
          website: honeypot,
          elapsedMs: Date.now() - openedAtRef.current,
        }),
      });

      if (res.status === 429) {
        setStatus('rate_limited');
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-indigo-50/60 dark:bg-slate-950/80 space-y-2"
      aria-label={en ? 'Direct contact form' : 'Formulário de contato direto'}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
          {en ? 'Direct Contact / Opportunity' : 'Contato Direto / Oportunidade'}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-[11px] text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          {en ? 'Hide' : 'Ocultar'}
        </button>
      </div>

      {status === 'success' ? (
        <div
          role="status"
          className="flex items-center gap-2 py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300"
        >
          <Check className="w-4 h-4 shrink-0" />
          <span>
            {en
              ? 'Contact recorded! Anderson will reach out soon.'
              : 'Contato registrado! Anderson responderá em breve.'}
          </span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              maxLength={120}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={en ? 'Your name *' : 'Seu nome *'}
              aria-label={en ? 'Your name' : 'Seu nome'}
              autoComplete="name"
              className={FIELD_CLASS}
            />
            <input
              type="text"
              maxLength={120}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={en ? 'Company (optional)' : 'Empresa (opcional)'}
              aria-label={en ? 'Company' : 'Empresa'}
              autoComplete="organization"
              className={FIELD_CLASS}
            />
          </div>

          <input
            type="text"
            required
            maxLength={180}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            onBlur={() => setContactTouched(true)}
            placeholder={en ? 'Email, LinkedIn URL or phone *' : 'E-mail, LinkedIn ou telefone *'}
            aria-label={en ? 'Contact channel' : 'Canal de contato'}
            aria-invalid={contactInvalid}
            aria-describedby={contactInvalid ? 'lead-contact-error' : undefined}
            autoComplete="email"
            className={`${FIELD_CLASS} ${contactInvalid ? 'border-rose-500 dark:border-rose-500' : ''}`}
          />
          {contactInvalid && (
            <p id="lead-contact-error" role="alert" className="text-[11px] text-rose-600 dark:text-rose-400">
              {en
                ? 'Enter a valid email, LinkedIn profile URL, or phone with area code.'
                : 'Informe um e-mail, link do LinkedIn ou telefone com DDD válido.'}
            </p>
          )}

          <textarea
            required
            rows={2}
            maxLength={1000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              en ? 'Brief note about the role or project *' : 'Breve mensagem sobre a vaga ou projeto *'
            }
            aria-label={en ? 'Message' : 'Mensagem'}
            className={`${FIELD_CLASS} resize-none`}
          />

          {/* Honeypot anti-bot: invisível para humanos e leitores de tela */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>

          <label className="flex items-start gap-2 text-[11px] leading-snug text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 accent-indigo-600"
            />
            <span>
              {en
                ? 'I authorize Anderson to use this information only to reply to this opportunity. Data is kept for up to 6 months (LGPD).'
                : 'Autorizo o Anderson a usar estas informações apenas para responder a esta oportunidade. Os dados são mantidos por até 6 meses (LGPD).'}
            </span>
          </label>

          {status === 'error' && (
            <p role="alert" className="text-[11px] text-rose-600 dark:text-rose-400">
              {en
                ? 'Could not send right now. Please try email or LinkedIn.'
                : 'Não foi possível enviar agora. Tente via e-mail ou LinkedIn.'}
            </p>
          )}
          {status === 'rate_limited' && (
            <p role="alert" className="text-[11px] text-amber-700 dark:text-amber-400">
              {en
                ? 'Too many recent submissions. Please try again later or use email.'
                : 'Muitos envios recentes. Tente novamente mais tarde ou use o e-mail.'}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting' || !consent}
            className="w-full py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {status === 'submitting'
              ? en
                ? 'Sending...'
                : 'Enviando...'
              : en
                ? 'Send Contact'
                : 'Enviar Contato'}
          </button>
        </>
      )}
    </form>
  );
};
