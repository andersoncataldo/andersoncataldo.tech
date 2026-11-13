import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';

const LazyAiAssistantWidget = lazy(() => import('../AiAssistantWidget'));

/**
 * Gatilho leve para o Anderson AI: mantém o motor de IA e o índice de conhecimento
 * fora do bundle inicial, carregando-os sob demanda no primeiro clique ou evento Ctrl+K.
 */
export const AiAssistantLauncher: React.FC = () => {
  const [hasActivated, setHasActivated] = useState(false);

  useEffect(() => {
    const handleOpenAi = () => setHasActivated(true);
    window.addEventListener('open-anderson-ai', handleOpenAi);
    return () => window.removeEventListener('open-anderson-ai', handleOpenAi);
  }, []);

  if (hasActivated) {
    return (
      <Suspense fallback={null}>
        <LazyAiAssistantWidget initialOpen />
      </Suspense>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={() => setHasActivated(true)}
        onMouseEnter={() => {
          void import('../AiAssistantWidget');
        }}
        className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/95 dark:bg-indigo-950/95 backdrop-blur-md text-white border border-indigo-500/30 hover:border-indigo-400 shadow-xl shadow-indigo-950/30 transition-all hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        aria-label="Abrir assistente conversacional de IA"
        aria-expanded={false}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        <div className="flex items-center gap-1.5 font-sans font-bold text-xs tracking-wide">
          <Bot className="w-4 h-4 text-indigo-400" />
          <span>Anderson AI</span>
        </div>

        <Sparkles className="w-3.5 h-3.5 text-amber-400 opacity-80 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
