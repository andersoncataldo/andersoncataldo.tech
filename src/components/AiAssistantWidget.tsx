import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Bot, Sparkles, X, Send, Trash2, ArrowRight, CornerDownLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { QUICK_PROMPTS, queryOfflineKnowledge } from '../data/aiKnowledge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: 'gemini' | 'offline';
}

export const AiAssistantWidget: React.FC = () => {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Inicializar mensagem de boas-vindas
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content:
            language === 'en'
              ? "👋 Hello! I'm **Anderson AI**, official assistant for Anderson Cataldo's portfolio. Ask me about his architecture achievements, enterprise automations (FTP_SYNC -99%), 9-agent AI squad, or certifications!"
              : '👋 Olá! Sou o **Anderson AI**, assistente oficial do portfólio de Anderson Cataldo. Pergunte-me sobre suas realizações de engenharia, automações corporativas (FTP_SYNC -99%), squad com 9 agentes de IA ou certificações!',
          mode: 'gemini',
        },
      ]);
    }
  }, [language, messages.length]);

  // Rolar para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Foco no input ao abrir
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escutar evento global para abrir o assistente
  useEffect(() => {
    const handleOpenAi = () => setIsOpen(true);
    window.addEventListener('open-anderson-ai', handleOpenAi);
    return () => window.removeEventListener('open-anderson-ai', handleOpenAi);
  }, []);

  // Fechar com Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isStreaming) return;

    setInputMessage('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
    };

    const assistantId = `assistant-${Date.now()}`;
    const initialAssistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      mode: 'gemini',
    };

    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang: language,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId ? { ...msg, content: accumulated } : msg,
                  ),
                );
              }
            } catch {
              // Fragmento JSON
            }
          }
        }
      }
    } catch {
      // Fallback determinístico de contingência caso o endpoint falhe (ou no Vite dev sem serverless)
      const fallbackText = queryOfflineKnowledge(query, language);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: fallbackText, mode: 'offline' }
            : msg,
        ),
      );
    } finally {
      setIsStreaming(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content:
          language === 'en'
            ? 'Conversation history cleared. What would you like to know about Anderson Cataldo?'
            : 'Histórico limpo. O que você gostaria de saber sobre a carreira de Anderson Cataldo?',
        mode: 'gemini',
      },
    ]);
  };

  return (
    <>
      {/* Botão Flutuante (Trigger) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/90 dark:bg-indigo-950/90 backdrop-blur-md text-white border border-indigo-500/30 hover:border-indigo-400 shadow-xl shadow-indigo-950/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          aria-label={isOpen ? 'Fechar assistente de IA' : 'Abrir assistente conversacional de IA'}
          aria-expanded={isOpen}
        >
          {/* Badge Indicador de Presença */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <div className="flex items-center gap-1.5 font-sans font-bold text-xs tracking-wide">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Anderson AI</span>
          </div>

          <Sparkles className="w-3.5 h-3.5 text-amber-400 opacity-80 group-hover:rotate-12 transition-transform" />
        </motion.button>
      </div>

      {/* Janela de Chat Expansível */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[580px] flex flex-col rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-950/40 overflow-hidden"
            role="dialog"
            aria-label="Assistente Virtual Anderson AI"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                  <Bot className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-sans font-bold text-sm text-slate-900 dark:text-white">
                      Anderson AI
                    </h3>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      RAG
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>{language === 'en' ? 'Grounded & Anti-Hallucination' : 'Fatos Verificados & Anti-Alucinação'}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title={language === 'en' ? 'Clear conversation' : 'Limpar conversa'}
                  aria-label={language === 'en' ? 'Clear conversation' : 'Limpar conversa'}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title={language === 'en' ? 'Close chat' : 'Fechar chat'}
                  aria-label={language === 'en' ? 'Close chat' : 'Fechar chat'}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompts (Sugestões Rápidas para Recrutadores) */}
            <div className="px-3 py-2 bg-slate-50/50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSendMessage(item.query[language])}
                  disabled={isStreaming}
                  className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 transition disabled:opacity-50"
                >
                  {item.label[language]}
                </button>
              ))}
            </div>

            {/* Mensagens */}
            <div
              className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-[13px] leading-relaxed"
              aria-live="polite"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60 rounded-bl-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">
                      {msg.content || (
                        <span className="inline-flex items-center gap-1 text-slate-400 italic">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-100" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-200" />
                        </span>
                      )}
                    </div>
                  </div>

                  {msg.role === 'assistant' && msg.mode === 'offline' && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1 font-mono">
                      <span>• {language === 'en' ? 'Offline Verified Cache' : 'Modo Factual Local'}</span>
                    </span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    language === 'en'
                      ? 'Ask about projects, architecture, stack...'
                      : 'Pergunte sobre projetos, arquitetura, stack...'
                  }
                  disabled={isStreaming}
                  className="w-full pl-3 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
                />
                <span className="hidden sm:inline-flex absolute right-2.5 top-2.5 text-slate-400 pointer-events-none">
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </span>
              </div>

              <button
                type="submit"
                disabled={!inputMessage.trim() || isStreaming}
                aria-label={language === 'en' ? 'Send message' : 'Enviar mensagem'}
                className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition shadow-sm shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                {isStreaming ? (
                  <ArrowRight className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistantWidget;
