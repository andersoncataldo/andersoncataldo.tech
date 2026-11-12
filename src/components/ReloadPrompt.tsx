import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ReloadPrompt: React.FC = () => {
  const { language } = useLanguage();
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 flex items-start gap-3 transition-all animate-fade-in">
      <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
        {offlineReady ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <RefreshCw className="w-5 h-5 animate-spin" />
        )}
      </div>

      <div className="flex-1">
        <h4 className="font-sans font-bold text-xs text-slate-900 dark:text-white">
          {offlineReady
            ? language === 'en'
              ? 'App ready to work offline'
              : 'Pronto para uso offline'
            : language === 'en'
              ? 'New content available'
              : 'Nova versão disponível'}
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
          {offlineReady
            ? language === 'en'
              ? 'Assets cached for offline browsing.'
              : 'Recursos armazenados em cache local.'
            : language === 'en'
              ? 'Click update to reload with the latest improvements.'
              : 'Clique em atualizar para carregar as últimas melhorias.'}
        </p>

        {needRefresh && (
          <button
            type="button"
            onClick={() => updateServiceWorker(true)}
            className="mt-2.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
          >
            {language === 'en' ? 'Update now' : 'Atualizar agora'}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={close}
        aria-label={language === 'en' ? 'Dismiss' : 'Fechar'}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ReloadPrompt;
