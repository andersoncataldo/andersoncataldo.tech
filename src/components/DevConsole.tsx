import { useState, useRef, useEffect } from 'react';
import { Terminal, Copy, Check, Sparkles, Send } from 'lucide-react';
import { LOCATION, EMAIL, LINKEDIN_URL, WHATSAPP_URL, GITHUB_URL } from '../config/links';
import { useLanguage } from '../context/LanguageContext';

interface TerminalEntry {
  command: string;
  output: string | React.ReactNode;
}

export const DevConsole = () => {
  const { t, language, currentResume } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'metrics' | 'cli'>('cli');

  // Interactive CLI State
  const [cliInput, setCliInput] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1">
          <p className="text-emerald-400 font-bold">
            Anderson Cataldo Interactive Shell v2.5 [x86_64-pc-enterprise]
          </p>
          <p className="text-slate-400">
            {language === 'pt'
              ? 'Digite "help" para ver os comandos disponíveis ou navegue pelas abas JSON acima.'
              : 'Type "help" to see available commands or browse the JSON tabs above.'}
          </p>
        </div>
      ),
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const cliBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'cli') {
      cliBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  const profileJson = {
    name: 'Anderson Viana Cataldo',
    role: language === 'pt' ? 'Desenvolvedor Full-Stack | Automação & RPA | Agentes de IA' : 'Full-Stack Developer | Automation & RPA | AI Agents',
    education: language === 'pt' ? 'Ciência da Computação (UNIFOR - 6º Semestre)' : 'Computer Science (UNIFOR - 6th Semester)',
    certification: 'Huawei HCIA-Storage V5.0 (2026)',
    location: LOCATION,
    english_level: language === 'pt' ? 'Avançado' : 'Advanced',
    specialties: [
      'Agentes de IA (Maker-Checker, Claude Code, MCP, Gemini API)',
      'Automação Corporativa & RPA Python (TOTVS WinThor Oracle, 15 Robôs)',
      'Sistemas Web Enterprise (Next.js 16, React 19, FastAPI, Supabase RLS)',
    ],
  };

  const stackJson = {
    ai_and_agents: ['Multi-Agent Systems', 'Claude Code', 'MCP', 'Google Gemini API', 'OpenAI', 'Guardrails', 'Anti-Hallucination'],
    automation_rpa: ['Python', 'WinThor ERP (Oracle)', 'EDI Pharma Link', 'Paramiko (SFTP)', 'Playwright', 'Selenium', 'Pandas'],
    backend: ['Node.js (Express)', 'Python (FastAPI)', 'TypeScript', 'SQLAlchemy', 'Alembic', 'Zod', 'Pydantic v2', 'JWT SSO'],
    frontend: ['React 19', 'Next.js 16 (App Router)', 'Tailwind CSS 4', 'Recharts', 'Framer Motion', 'WCAG 2.1 AA'],
    database_cloud: ['PostgreSQL', 'Supabase (RLS)', 'Oracle SQL', 'Cloudflare Pages', 'Render', 'Vercel', 'Huawei HCIA-Storage'],
    quality_devops: ['Pytest (58 suites)', 'Playwright (35 visual tests)', 'GitHub Actions CI/CD', 'Spec-Driven Dev (OpenSpec)'],
  };

  const metricsJson = {
    shipped_automations: '15 robôs em produção',
    ftp_sync_time_slashed: '-99% (de 6 horas para < 10 segundos)',
    monthly_xml_volume: '15.000+ XMLs fiscais / mês (99.85% acurácia)',
    ai_agent_squad: '9 agentes no modelo maker-checker',
    unified_corporate_systems: '4 sistemas em 1 monorepo com SSO',
    tests_and_gates: '58 testes Pytest + 35 asserções Playwright E2E',
  };

  const currentData =
    activeTab === 'profile' ? profileJson :
    activeTab === 'stack' ? stackJson : metricsJson;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(currentData, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const root = parts[0].toLowerCase();

    let output: React.ReactNode = null;

    switch (root) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-amber-400 font-bold">{language === 'pt' ? 'Comandos disponíveis:' : 'Available commands:'}</p>
            <p><span className="text-emerald-400 font-bold">bio</span> — {language === 'pt' ? 'Resumo profissional executivo' : 'Executive professional summary'}</p>
            <p><span className="text-emerald-400 font-bold">stack</span> — {language === 'pt' ? 'Visão consolidada da stack tecnológica' : 'Consolidated tech stack overview'}</p>
            <p><span className="text-emerald-400 font-bold">rpa</span> — {language === 'pt' ? 'Métricas do motor de automação (15 robôs e FTP_SYNC)' : 'Automation engine metrics (15 robots & FTP_SYNC)'}</p>
            <p><span className="text-emerald-400 font-bold">ai-agents</span> — {language === 'pt' ? 'Arquitetura do escritório de 9 agentes de IA' : '9 AI agent squad maker-checker architecture'}</p>
            <p><span className="text-emerald-400 font-bold">projects</span> — {language === 'pt' ? 'Lista dos projetos corporativos e autorais' : 'List of corporate and featured projects'}</p>
            <p><span className="text-emerald-400 font-bold">contact</span> — {language === 'pt' ? 'Canais oficiais de contato direto' : 'Direct official contact channels'}</p>
            <p><span className="text-emerald-400 font-bold">cv</span> — {language === 'pt' ? 'Baixar o currículo oficial em PDF' : 'Download official PDF resume'}</p>
            <p><span className="text-emerald-400 font-bold">clear</span> — {language === 'pt' ? 'Limpar histórico do terminal' : 'Clear terminal history'}</p>
            <p><span className="text-emerald-400 font-bold">sudo hire</span> — {language === 'pt' ? 'Proposta de contratação direta' : 'Direct hiring fast-track'}</p>
          </div>
        );
        break;

      case 'bio':
        output = (
          <div className="space-y-1.5 text-slate-300">
            <p className="text-indigo-400 font-bold">Anderson Viana Cataldo</p>
            <p className="text-slate-400">
              {language === 'pt'
                ? 'Desenvolvedor Full-Stack e de Automação focado em IA aplicada ao desenvolvimento de software. Atua na Distribuidora Mais Saúde projetando monorepos corporativos (Next.js 16, React 19, FastAPI, Supabase RLS) e robôs de integração Python conectados ao ERP TOTVS WinThor (Oracle).'
                : 'Full-Stack and Automation Developer focused on applied AI in software engineering. Works at Distribuidora Mais Saúde architecting corporate monorepos (Next.js 16, React 19, FastAPI, Supabase RLS) and Python integration robots connected to TOTVS WinThor ERP (Oracle).'}
            </p>
            <p className="text-emerald-400 text-xs">
              🎓 Ciência da Computação UNIFOR (6º sem) • 🏆 Huawei HCIA-Storage V5.0 • 🌐 Inglês Avançado
            </p>
          </div>
        );
        break;

      case 'stack':
        output = (
          <div className="space-y-1 text-slate-300 font-mono text-xs">
            <p className="text-cyan-400 font-bold">Tech Stack & Ecosystem:</p>
            <p><strong className="text-white">AI & Agents:</strong> Claude Code, MCP, Gemini API, Multi-Agent Maker-Checker, Guardrails</p>
            <p><strong className="text-white">Automation:</strong> Python, WinThor (Oracle), EDI Pharma Link, SFTP/FTP, Playwright, Pandas</p>
            <p><strong className="text-white">Back-End:</strong> Node.js, Express, Python FastAPI, SQLAlchemy, Alembic, Zod, JWT SSO</p>
            <p><strong className="text-white">Front-End:</strong> React 19, Next.js 16, Tailwind CSS 4, Recharts, Framer Motion, WCAG AA</p>
            <p><strong className="text-white">Storage/DB:</strong> PostgreSQL, Supabase RLS, Oracle SQL, Huawei Enterprise Storage</p>
            <p><strong className="text-white">Testing & CI:</strong> Pytest (58 suites), Playwright Visual (35 assertions), GitHub Actions</p>
          </div>
        );
        break;

      case 'rpa':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">🚀 Automation & Industrial RPA Engine:</p>
            <p>• <strong className="text-white">15 Robôs Entregues:</strong> 10 na Mais Saúde (WinThor/Oracle) + 5 no Grupo 3corações</p>
            <p>• <strong className="text-white">FTP_SYNC:</strong> Ponte autônoma SFTP/FTP a cada 15 min; processo de 6h reduzido para &lt; 10s (−99%)</p>
            <p>• <strong className="text-white">15.000+ XMLs/mês:</strong> Ingestão, validação SEFAZ e conciliação contábil contínua</p>
            <p>• <strong className="text-white">200h+ Manuais Poupadas:</strong> Risco fiscal zerado com validação por regras de negócio</p>
          </div>
        );
        break;

      case 'ai-agents':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-purple-400 font-bold">🤖 9-Agent Maker-Checker Squad:</p>
            <p>• <strong className="text-white">Orquestrador:</strong> Planeja, divide requisitos e delega tarefas</p>
            <p>• <strong className="text-white">5 Executores Especialistas:</strong> Front-end, Back-end, Automação, Banco de Dados e Documentação</p>
            <p>• <strong className="text-white">3 Validadores Independentes:</strong> QA, Segurança (AppSec/LGPD) e Compliance (Design System drift)</p>
            <p className="text-xs text-slate-400">Regra de ouro: Quem executa nunca valida o próprio código; menor privilégio e guardrails anti-alucinação.</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-indigo-400 font-bold">Featured Projects:</p>
            <p>1. <strong className="text-white">Central Grupo Mais & SSO:</strong> Monorepo 4-em-1 (Next.js 16, FastAPI, Supabase)</p>
            <p>2. <strong className="text-white">Sistema de Chamados:</strong> RBAC 4 níveis, SLA preditivo, BI com Recharts</p>
            <p>3. <strong className="text-white">Devolução com IA:</strong> Logística reversa com LLM, Pareto e fallback &lt; 1s</p>
            <p>4. <strong className="text-white">FTP_SYNC & WinThor EDI:</strong> Automação SFTP reduzindo 6h para &lt; 10s</p>
            <p>5. <strong className="text-white">RPA Fiscal 3corações:</strong> 15.000 XMLs/mês e emissão de CNDs</p>
            <p>6. <strong className="text-white">São Carlo Acutis:</strong> Plataforma gamificada web full-stack</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-slate-300">
            <p className="text-emerald-400 font-bold">Official Contacts:</p>
            <p>📧 Email: <a href={`mailto:${EMAIL}`} className="text-indigo-400 underline">{EMAIL}</a></p>
            <p>💬 WhatsApp: <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-emerald-400 underline">+55 85 99225-8794</a></p>
            <p>💼 LinkedIn: <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{LINKEDIN_URL}</a></p>
            <p>🐙 GitHub: <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-slate-300 underline">{GITHUB_URL}</a></p>
          </div>
        );
        break;

      case 'cv':
        output = (
          <div className="text-emerald-400">
            <p>✓ {language === 'pt' ? 'Iniciando download do currículo oficial...' : 'Starting official resume download...'}</p>
          </div>
        );
        window.open(currentResume, '_blank');
        break;

      case 'clear':
        setHistory([]);
        setCliInput('');
        return;

      case 'sudo':
        if (parts[1] === 'hire') {
          output = (
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950 to-indigo-950 border border-emerald-500/50 space-y-1.5">
              <p className="text-emerald-400 font-bold text-sm">🎉 PERMISSION GRANTED: Fast-Track Activated!</p>
              <p className="text-slate-200">
                {language === 'pt'
                  ? 'Obrigado pelo interesse! Anderson Cataldo está pronto para agregar valor imediato à sua equipe de engenharia com foco em Full-Stack, Automação e IA.'
                  : 'Thank you for your interest! Anderson Cataldo is ready to bring immediate impact to your engineering organization with Full-Stack, Automation, and AI.'}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                {language === 'pt' ? 'Falar com Anderson no WhatsApp &rarr;' : 'Chat with Anderson on WhatsApp &rarr;'}
              </a>
            </div>
          );
        } else {
          output = <p className="text-rose-400">sudo: command not found. Try: sudo hire</p>;
        }
        break;

      default:
        output = (
          <p className="text-rose-400">
            command not found: {trimmed}. {language === 'pt' ? 'Digite "help" para ver os comandos.' : 'Type "help" for command list.'}
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setCliInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(cliInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setCliInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setCliInput(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else {
        setHistoryIndex(-1);
        setCliInput('');
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-700/60 bg-[#090d16] shadow-2xl shadow-indigo-950/20 text-left font-mono text-xs md:text-sm">
      {/* Console Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 text-slate-400 flex items-center gap-1.5 text-xs">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            {t.devConsole.terminalUser}
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800" role="tablist" aria-label="Terminal categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'cli'}
            onClick={() => {
              setActiveTab('cli');
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
              activeTab === 'cli'
                ? 'bg-emerald-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            &gt;_ CLI
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.devConsole.tabProfile}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'stack'}
            onClick={() => setActiveTab('stack')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
              activeTab === 'stack'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.devConsole.tabStack}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'metrics'}
            onClick={() => setActiveTab('metrics')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
              activeTab === 'metrics'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.devConsole.tabMetrics}
          </button>
        </div>

        {/* Copy Button (Active on JSON tabs) */}
        {activeTab !== 'cli' && (
          <button
            type="button"
            onClick={handleCopy}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition focus:outline-none focus:ring-1 focus:ring-indigo-400"
            aria-label={t.devConsole.copyAria}
            title={t.devConsole.copyTitle}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Console Body */}
      {activeTab === 'cli' ? (
        <div
          className="p-4 md:p-5 text-slate-300 overflow-y-auto max-h-[340px] scrollbar-thin space-y-3 cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-bold">visitor@cataldo-tech:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
              <div className="text-xs pl-2 border-l border-slate-800">{entry.output}</div>
            </div>
          ))}

          {/* Prompt Input Line */}
          <div className="flex items-center gap-2 text-xs pt-1">
            <span className="text-emerald-400 font-bold shrink-0">visitor@cataldo-tech:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="help"
              className="w-full bg-transparent text-white focus:outline-none caret-emerald-400 font-mono text-xs"
              aria-label="Interactive terminal command input"
            />
            <button
              type="button"
              onClick={() => executeCommand(cliInput)}
              className="p-1 rounded text-slate-500 hover:text-emerald-400 transition"
              aria-label="Send command"
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
          <div ref={cliBottomRef} />
        </div>
      ) : (
        <div id="console-panel" role="tabpanel" aria-label={activeTab} className="p-4 md:p-5 text-slate-300 overflow-x-auto max-h-[340px] scrollbar-thin">
          <div className="flex items-center gap-2 text-slate-500 mb-3 text-xs">
            <span className="text-emerald-400 font-bold">$</span>
            <span>{t.devConsole.catCommand}/{activeTab}.json</span>
            <span className="text-slate-600 text-[10px] ml-auto flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> {t.devConsole.liveData}
            </span>
          </div>

          <pre className="text-indigo-300 font-mono text-[11px] md:text-xs leading-relaxed">
            <code>
              {JSON.stringify(currentData, null, 2)}
            </code>
          </pre>
        </div>
      )}

      {/* Terminal Footer Status Bar */}
      <div className="px-4 py-2 bg-[#0b101d] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold">
            {activeTab === 'cli' ? 'CLI Mode: Ready' : t.devConsole.footerStatus}
          </span>
        </div>
        <span className="text-slate-500 hidden sm:inline">TypeScript 5 • React 19 • Python 3.12 • Claude Code</span>
      </div>
    </div>
  );
};

export default DevConsole;
