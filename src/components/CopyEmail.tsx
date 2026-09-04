import { useEffect, useRef, useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';

const CopyEmail = ({ email }: { email: string }) => {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      setStatus('error');
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setStatus('idle');
      }, 2500);
    } catch (err) {
      setStatus('error');
      console.error('Failed to copy!', err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-4 p-6 apple-card border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all group w-full text-left"
      aria-label={`Copiar e-mail profissional: ${email}`}
    >
      <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 group-hover:scale-105 transition-transform shrink-0" aria-hidden="true">
        <Mail className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-mono font-bold text-apple-secondary uppercase tracking-wider">E-mail Profissional</p>
        <p className="text-base sm:text-lg font-bold text-apple-text truncate mt-0.5">{email}</p>
        <p className="text-xs text-apple-secondary hidden sm:block">Clique em qualquer lugar do cartão para copiar</p>
      </div>
      <div
        className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-apple-secondary text-xs font-semibold flex items-center gap-1.5 transition"
        role="status"
        aria-live="polite"
      >
        {status === 'copied' ? (
          <>
            <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copiado!</span>
          </>
        ) : status === 'error' ? (
          <span className="text-rose-500">Erro ao copiar</span>
        ) : (
          <>
            <Copy className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Copiar</span>
          </>
        )}
      </div>
    </button>
  );
};

export default CopyEmail;
