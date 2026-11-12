import { useEffect, useState, useRef } from 'react';
import {
  Search,
  ArrowRight,
  FileText,
  Mail,
  MessageCircle,
  Moon,
  Sun,
  Globe,
  Calculator,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EMAIL, WHATSAPP_URL } from '../config/links';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

interface CommandItem {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const CommandPalette = ({ isOpen, onClose, onThemeToggle, theme }: CommandPaletteProps) => {
  const { language, setLanguage, resumePt, resumeEn } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // ignore
    }
    onClose();
  };

  // Command items list
  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-home',
      category: language === 'pt' ? 'Navegação' : 'Navigation',
      title: language === 'pt' ? 'Início' : 'Home',
      subtitle: language === 'pt' ? 'Voltar ao topo da página' : 'Back to top',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => scrollTo('inicio'),
    },
    {
      id: 'nav-about',
      category: language === 'pt' ? 'Navegação' : 'Navigation',
      title: language === 'pt' ? 'Sobre Anderson Cataldo' : 'About Anderson Cataldo',
      subtitle: language === 'pt' ? 'Trajetória, formação e pilares' : 'Background and career philosophy',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => scrollTo('sobre'),
    },
    {
      id: 'nav-exp',
      category: language === 'pt' ? 'Navegação' : 'Navigation',
      title: language === 'pt' ? 'Experiência Profissional' : 'Work Experience',
      subtitle: language === 'pt' ? 'Mais Saúde, Grupo 3corações e UNIFOR' : 'Mais Saúde, 3corações and UNIFOR',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => scrollTo('experiencia'),
    },
    {
      id: 'nav-rpa',
      category: language === 'pt' ? 'Navegação' : 'Navigation',
      title: language === 'pt' ? 'Automação & RPA Industrial' : 'Automation & Industrial RPA',
      subtitle: language === 'pt' ? 'Pipeline de 15 robôs, FTP_SYNC e Simulador de ROI' : '15 robots pipeline, FTP_SYNC & ROI Simulator',
      icon: <Calculator className="w-4 h-4 text-emerald-500" />,
      action: () => scrollTo('rpa'),
    },
    {
      id: 'nav-skills',
      category: language === 'pt' ? 'Navegação' : 'Navigation',
      title: language === 'pt' ? 'Habilidades & Tecnologias' : 'Skills & Technologies',
      subtitle: language === 'pt' ? 'IA & Agentes, Python, Back-End, Front-End, DevOps' : 'AI & Agents, Python, Back-End, Front-End, DevOps',
      icon: <ArrowRight className="w-4 h-4 text-indigo-500" />,
      action: () => scrollTo('habilidades'),
    },
    {
      id: 'nav-projects',
      category: language === 'pt' ? 'Navegação' : 'Navigation',
      title: language === 'pt' ? 'Projetos em Destaque' : 'Featured Projects',
      subtitle: language === 'pt' ? 'Central Grupo Mais, Chamados, Devolução com IA e mais' : 'Central Grupo Mais, Service Desk, AI Returns and more',
      icon: <Layers className="w-4 h-4 text-purple-500" />,
      action: () => scrollTo('projetos'),
    },
    {
      id: 'nav-contact',
      category: language === 'pt' ? 'Navegação' : 'Navigation',
      title: language === 'pt' ? 'Contato & Oportunidades' : 'Contact & Inquiries',
      subtitle: language === 'pt' ? 'Conectar via e-mail ou WhatsApp' : 'Get in touch via email or WhatsApp',
      icon: <Mail className="w-4 h-4 text-indigo-500" />,
      action: () => scrollTo('contato'),
    },

    // Quick Actions
    {
      id: 'action-ask-ai',
      category: language === 'pt' ? 'Inteligência Artificial' : 'Artificial Intelligence',
      title: language === 'pt' ? 'Pergunte ao Anderson AI' : 'Ask Anderson AI',
      subtitle: language === 'pt' ? 'Assistente conversacional RAG com streaming' : 'Conversational RAG assistant with streaming',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      action: () => {
        onClose();
        setTimeout(() => window.dispatchEvent(new CustomEvent('open-anderson-ai')), 150);
      },
      badge: 'AI',
    },
    {
      id: 'action-copy-email',
      category: language === 'pt' ? 'Ações Rápidas' : 'Quick Actions',
      title: language === 'pt' ? 'Copiar E-mail' : 'Copy Email Address',
      subtitle: EMAIL,
      icon: <Mail className="w-4 h-4 text-indigo-500" />,
      action: copyEmail,
      badge: 'Email',
    },
    {
      id: 'action-whatsapp',
      category: language === 'pt' ? 'Ações Rápidas' : 'Quick Actions',
      title: language === 'pt' ? 'Conversar no WhatsApp' : 'Chat on WhatsApp',
      subtitle: '+55 85 99225-8794',
      icon: <MessageCircle className="w-4 h-4 text-emerald-500" />,
      action: () => {
        window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
        onClose();
      },
      badge: 'WhatsApp',
    },
    {
      id: 'action-cv-pt',
      category: language === 'pt' ? 'Ações Rápidas' : 'Quick Actions',
      title: language === 'pt' ? 'Baixar Currículo (Português)' : 'Download Resume (Portuguese)',
      subtitle: 'Anderson_Viana_Curriculo_PT-BR.pdf',
      icon: <FileText className="w-4 h-4 text-indigo-500" />,
      action: () => {
        window.open(resumePt, '_blank');
        onClose();
      },
      badge: 'PT-BR',
    },
    {
      id: 'action-cv-en',
      category: language === 'pt' ? 'Ações Rápidas' : 'Quick Actions',
      title: language === 'pt' ? 'Baixar Currículo (Inglês)' : 'Download Resume (English)',
      subtitle: 'Anderson_Viana_Curriculum_EN.pdf',
      icon: <FileText className="w-4 h-4 text-indigo-500" />,
      action: () => {
        window.open(resumeEn, '_blank');
        onClose();
      },
      badge: 'EN',
    },

    // Preferences
    {
      id: 'pref-theme',
      category: language === 'pt' ? 'Preferências' : 'Preferences',
      title: theme === 'dark' ? (language === 'pt' ? 'Mudar para Modo Claro' : 'Switch to Light Mode') : (language === 'pt' ? 'Mudar para Modo Escuro' : 'Switch to Dark Mode'),
      subtitle: theme === 'dark' ? 'Tema claro de alto contraste' : 'Tema escuro focado em produtividade',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />,
      action: () => {
        onThemeToggle();
        onClose();
      },
      badge: theme === 'dark' ? 'Light' : 'Dark',
    },
    {
      id: 'pref-lang',
      category: language === 'pt' ? 'Preferências' : 'Preferences',
      title: language === 'pt' ? 'Switch to English' : 'Mudar para Português',
      subtitle: language === 'pt' ? 'Change interface language to English' : 'Alterar o idioma da interface para Português',
      icon: <Globe className="w-4 h-4 text-cyan-500" />,
      action: () => {
        setLanguage(language === 'pt' ? 'en' : 'pt');
        onClose();
      },
      badge: language === 'pt' ? 'EN' : 'PT-BR',
    },
  ];

  // Filter commands by query
  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle?.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredCommands.length ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredCommands.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        current.action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder={
              language === 'pt'
                ? 'Digite um comando, projeto ou navegação... (ex: rpa, cv, projetos)'
                : 'Type a command, project or navigation... (e.g. rpa, cv, projects)'
            }
            className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            aria-autocomplete="list"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command Items List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 scrollbar-thin">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <Sparkles className="w-6 h-6 mx-auto mb-2 text-indigo-400/50" />
              <p>{language === 'pt' ? 'Nenhum resultado encontrado.' : 'No commands found.'}</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={isSelected ? 'text-white' : 'text-slate-400'}>{cmd.icon}</span>
                    <div className="min-w-0">
                      <p className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {cmd.title}
                      </p>
                      {cmd.subtitle && (
                        <p className={`text-[11px] truncate ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {cmd.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isSelected
                            ? 'bg-indigo-700 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {cmd.badge}
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-mono ${
                        isSelected ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      {cmd.category}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px]">↓</kbd>
              <span className="ml-1">{language === 'pt' ? 'navegar' : 'navigate'}</span>
            </span>
            <span className="flex items-center gap-1 font-mono ml-2">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px]">↵</kbd>
              <span className="ml-1">{language === 'pt' ? 'executar' : 'execute'}</span>
            </span>
          </div>
          <span className="font-mono text-[10px]">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800">ESC</kbd> {language === 'pt' ? 'fechar' : 'close'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
