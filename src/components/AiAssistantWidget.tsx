import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Bot,
  Sparkles,
  X,
  Send,
  Trash2,
  CornerDownLeft,
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  Briefcase,
  Check,
  Copy,
  Square,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { QUICK_PROMPTS, queryOfflineKnowledge } from '../data/aiKnowledge';
import { LeadForm } from './ai/LeadForm';

export type AgentAction =
  | { type: 'open_lead_form'; reason?: string }
  | { type: 'navigate_to_section'; section: 'sobre' | 'experiencia' | 'projetos' | 'automacao' | 'skills' | 'contato' }
  | { type: 'offer_cv_download'; language: 'pt' | 'en' };

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode?: 'gemini' | 'direct' | 'offline';
  traceId?: string;
  feedback?: 'up' | 'down' | null;
  actions?: AgentAction[];
}

function getWelcomeText(lang: 'pt' | 'en'): string {
  return lang === 'en'
    ? "👋 Hello! I'm **Anderson AI**, official assistant for Anderson Cataldo's portfolio. Ask me about his architecture achievements, enterprise automations (**FTP_SYNC -99%**), **9-agent AI squad**, or certifications!"
    : '👋 Olá! Sou o **Anderson AI**, assistente oficial do portfólio de Anderson Cataldo. Pergunte-me sobre suas realizações de engenharia, automações corporativas (**FTP_SYNC -99%**), **squad com 9 agentes de IA** ou certificações!';
}

/**
 * Renderiza inline markdown (**negrito** e [link](url)) com proteção anti-XSS
 */
function renderInlineFormatting(text: string): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternalAnchor = /^#[a-zA-Z0-9_-]+$/.test(href);
      const isSafeProtocol =
        isInternalAnchor ||
        href.startsWith('https://') ||
        href.startsWith('http://') ||
        href.startsWith('mailto:');
      if (isSafeProtocol) {
        return (
          <a
            key={idx}
            href={href}
            target={isInternalAnchor || href.startsWith('mailto:') ? undefined : '_blank'}
            rel={isInternalAnchor || href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            onClick={(e) => {
              if (isInternalAnchor) {
                e.preventDefault();
                const targetEl = document.getElementById(href.slice(1));
                targetEl?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="font-bold text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-500 transition-colors"
          >
            {label}
          </a>
        );
      }
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * Renderiza blocos Markdown leves (### títulos, - listas e parágrafos) em JSX puro
 */
function renderFormattedContent(content: string): React.ReactNode {
  const lines = content.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={index} className="h-1" />;
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h4
              key={index}
              className="font-bold text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 pt-0.5"
            >
              {renderInlineFormatting(trimmed.slice(4))}
            </h4>
          );
        }

        if (trimmed.startsWith('- ')) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="text-indigo-500 dark:text-indigo-400 font-bold mt-0.5">•</span>
              <span className="flex-1">{renderInlineFormatting(trimmed.slice(2))}</span>
            </div>
          );
        }

        const numberedMatch = trimmed.match(/^(\d+\.)\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div key={index} className="flex items-start gap-2 pl-1">
              <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[11px] mt-0.5">
                {numberedMatch[1]}
              </span>
              <span className="flex-1">{renderInlineFormatting(numberedMatch[2])}</span>
            </div>
          );
        }

        return (
          <p key={index} className="leading-relaxed">
            {renderInlineFormatting(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

interface AiAssistantWidgetProps {
  initialOpen?: boolean;
}

export const AiAssistantWidget: React.FC<AiAssistantWidgetProps> = ({ initialOpen = false }) => {
  const { language, currentResume } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [inputMessage, setInputMessage] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingStage, setStreamingStage] = useState<'retrieving' | 'generating' | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: getWelcomeText(language),
      mode: 'gemini',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionIdRef = useRef<string>(
    `ses_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
  );
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Atualizar mensagem de boas-vindas ao alternar idioma caso nenhuma pergunta tenha sido enviada
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id.startsWith('welcome')) {
        return [
          {
            ...prev[0],
            content: getWelcomeText(language),
          },
        ];
      }
      return prev;
    });
  }, [language]);

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

  // Escutar evento global para abrir o assistente (ex: via Command Palette Ctrl+K)
  useEffect(() => {
    const handleOpenAi = () => setIsOpen(true);
    window.addEventListener('open-anderson-ai', handleOpenAi);
    return () => window.removeEventListener('open-anderson-ai', handleOpenAi);
  }, []);

  // Fechar com Escape e prender foco (focus trap) dentro do diálogo
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setTimeout(() => triggerRef.current?.focus(), 0);
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? inputMessage).trim();
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
    setStreamingStage('retrieving');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang: language,
          sessionId: sessionIdRef.current,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (!response.ok || !response.body || !contentType.includes('text/event-stream')) {
        throw new Error(`Invalid SSE response (${response.status})`);
      }
      setStreamingStage('generating');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulated = '';
      let detectedMode: 'gemini' | 'direct' | 'offline' = 'gemini';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr) as {
                text?: string;
                mode?: string;
                traceId?: string;
                action?: AgentAction;
              };
              if (parsed.mode === 'offline' || parsed.mode === 'direct') {
                detectedMode = parsed.mode;
              }
              if (parsed.action) {
                const action = parsed.action;
                if (action.type === 'open_lead_form') {
                  setShowLeadForm(true);
                }
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? {
                          ...msg,
                          actions: msg.actions ? [...msg.actions, action] : [action],
                        }
                      : msg,
                  ),
                );
              }
              if (parsed.traceId) {
                const traceId = parsed.traceId;
                setMessages((prev) =>
                  prev.map((msg) => (msg.id === assistantId ? { ...msg, traceId } : msg)),
                );
              }
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantId
                      ? { ...msg, content: accumulated, mode: detectedMode }
                      : msg,
                  ),
                );
              }
            } catch {
              // Fragmento JSON parcial
            }
          }
        }
      }

      if (!accumulated.trim()) {
        throw new Error('Empty stream response');
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      // Fallback com motor ML Híbrido (BM25 + Cosine Similarity + RRF + MMR + Síntese Conversacional)
      const historyPayload = messages
        .filter((m) => !m.id.startsWith('welcome'))
        .map((m) => ({ role: m.role, content: m.content }));
      const fallbackText = queryOfflineKnowledge(query, language, historyPayload);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? { ...msg, content: fallbackText, mode: 'offline' }
            : msg,
        ),
      );
    } finally {
      abortControllerRef.current = null;
      setIsStreaming(false);
      setStreamingStage(null);
    }
  };

  const handleStopStreaming = () => {
    abortControllerRef.current?.abort();
  };

  const handleCopyMessage = async (messageId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      setTimeout(() => {
        setCopiedId((prev) => (prev === messageId ? null : prev));
      }, 2000);
    } catch {
      // Clipboard indisponível no contexto
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: getWelcomeText(language),
        mode: 'gemini',
      },
    ]);
  };

  const handleFeedback = (messageId: string, traceId: string, helpful: boolean) => {
    const rating: 'up' | 'down' = helpful ? 'up' : 'down';
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, feedback: rating } : msg)),
    );
    void fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ traceId, helpful }),
    }).catch(() => undefined);
  };

  return (
    <>
      {/* Botão Flutuante (Trigger) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          className="relative group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900/95 dark:bg-indigo-950/95 backdrop-blur-md text-white border border-indigo-500/30 hover:border-indigo-400 shadow-xl shadow-indigo-950/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
            ref={dialogRef}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[80vh] h-[560px] flex flex-col rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-indigo-950/40 overflow-hidden"
            role="dialog"
            aria-modal="true"
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
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      RAG
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>
                      {language === 'en'
                        ? 'Grounded & Anti-Hallucination'
                        : 'Fatos Verificados & Anti-Alucinação'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowLeadForm((prev) => !prev)}
                  title={language === 'en' ? 'Send recruiter contact' : 'Enviar contato de recrutamento'}
                  aria-label={language === 'en' ? 'Send recruiter contact' : 'Enviar contato de recrutamento'}
                  aria-expanded={showLeadForm}
                  className={`p-1.5 rounded-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    showLeadForm
                      ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  title={language === 'en' ? 'Clear conversation' : 'Limpar conversa'}
                  aria-label={language === 'en' ? 'Clear conversation' : 'Limpar conversa'}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title={language === 'en' ? 'Close chat' : 'Fechar chat'}
                  aria-label={language === 'en' ? 'Close chat' : 'Fechar chat'}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Painel Inline de Contato de Recrutadores / Leads */}
            {showLeadForm && (
              <LeadForm
                language={language}
                traceId={[...messages].reverse().find((m) => m.traceId)?.traceId}
                onClose={() => setShowLeadForm(false)}
              />
            )}

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
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200/60 dark:border-slate-700/60 rounded-bl-xs'
                    }`}
                  >
                    <div className="font-sans">
                      {msg.content ? (
                        msg.role === 'assistant' ? (
                          renderFormattedContent(msg.content)
                        ) : (
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400 italic py-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-100" />
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse delay-200" />
                          {streamingStage && (
                            <span className="ml-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              {streamingStage === 'retrieving'
                                ? language === 'en'
                                  ? 'Searching verified base...'
                                  : 'Consultando base verificada...'
                                : language === 'en'
                                  ? 'Generating AI response...'
                                  : 'Gerando resposta com IA...'}
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {msg.role === 'assistant' && msg.actions && msg.actions.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {msg.actions.map((action, idx) => {
                        if (action.type === 'open_lead_form') {
                          return (
                            <button
                              key={`${msg.id}-act-${idx}`}
                              type="button"
                              onClick={() => setShowLeadForm(true)}
                              className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/70 transition font-medium"
                            >
                              {language === 'en' ? 'Open Contact Form' : 'Abrir Formulário de Contato'}
                            </button>
                          );
                        }
                        if (action.type === 'navigate_to_section') {
                          return (
                            <button
                              key={`${msg.id}-act-${idx}`}
                              type="button"
                              onClick={() => {
                                const el = document.getElementById(action.section);
                                el?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition font-medium"
                            >
                              {language === 'en' ? `Go to #${action.section}` : `Ir para #${action.section}`}
                            </button>
                          );
                        }
                        if (action.type === 'offer_cv_download') {
                          return (
                            <a
                              key={`${msg.id}-act-${idx}`}
                              href={currentResume}
                              download={`curriculo-anderson-cataldo-${action.language}.pdf`}
                              className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/70 transition font-medium"
                            >
                              {language === 'en' ? 'Download Resume (PDF)' : 'Baixar Currículo (PDF)'}
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}

                  {msg.role === 'assistant' && msg.mode === 'direct' && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 font-mono">
                      <span>
                        •{' '}
                        {language === 'en'
                          ? 'Direct verified response'
                          : 'Resposta direta (base verificada)'}
                      </span>
                    </span>
                  )}
                  {msg.role === 'assistant' && msg.mode === 'offline' && (
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1 font-mono">
                      <span>
                        •{' '}
                        {language === 'en'
                          ? 'Offline mode (verified local base — generative AI unavailable)'
                          : 'Modo offline (base local verificada — IA generativa indisponível)'}
                      </span>
                    </span>
                  )}

                  {msg.role === 'assistant' &&
                    !msg.id.startsWith('welcome') &&
                    msg.content &&
                    !isStreaming && (
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          aria-label={language === 'en' ? 'Copy response' : 'Copiar resposta'}
                          title={language === 'en' ? 'Copy response' : 'Copiar resposta'}
                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {msg.traceId && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.id, msg.traceId!, true)}
                              aria-label={language === 'en' ? 'Helpful response' : 'Resposta útil'}
                              aria-pressed={msg.feedback === 'up'}
                              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                                msg.feedback === 'up'
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFeedback(msg.id, msg.traceId!, false)}
                              aria-label={language === 'en' ? 'Unhelpful response' : 'Resposta não útil'}
                              aria-pressed={msg.feedback === 'down'}
                              className={`p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                                msg.feedback === 'down'
                                  ? 'text-rose-600 dark:text-rose-400'
                                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                              }`}
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                            {msg.feedback && (
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                                <Check className="w-3 h-3 text-emerald-500" />
                                {language === 'en' ? 'Thanks!' : 'Obrigado!'}
                              </span>
                            )}
                          </>
                        )}
                      </div>
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
                  maxLength={500}
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

              {isStreaming ? (
                <button
                  type="button"
                  onClick={handleStopStreaming}
                  aria-label={language === 'en' ? 'Stop generating' : 'Parar geração'}
                  title={language === 'en' ? 'Stop generating' : 'Parar geração'}
                  className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition shadow-sm shadow-rose-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  aria-label={language === 'en' ? 'Send message' : 'Enviar mensagem'}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition shadow-sm shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistantWidget;
