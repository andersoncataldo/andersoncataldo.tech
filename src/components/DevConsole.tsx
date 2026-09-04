import { useState } from 'react';
import { Terminal, Copy, Check, Sparkles } from 'lucide-react';
import { AVAILABILITY, LOCATION } from '../config/links';

export const DevConsole = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'stack' | 'metrics'>('profile');

  const profileJson = {
    name: "Anderson Cataldo",
    role: "Full-Stack Developer & Automação RPA",
    education: "Ciência da Computação (Unifor - 6º Semestre)",
    location: LOCATION,
    status: AVAILABILITY,
    focus: [
      "Aplicações Web Escaláveis (React, Next.js, TypeScript)",
      "Automação de Processos de Backoffice (Python, RPA, ETL)",
      "APIs RESTful & Modelagem de Bancos (Node.js, PostgreSQL)"
    ]
  };

  const stackJson = {
    frontend: ["React 18/19", "Next.js", "TypeScript", "Tailwind CSS v4"],
    backend: ["Node.js (Express)", "Python (Django)", "Java (Spring Boot)"],
    database_cloud: ["PostgreSQL", "Supabase", "Vercel", "Git/GitHub"],
    automation: ["Python RPA", "Pandas", "lxml / BeautifulSoup", "Task Scheduling"],
    methodologies: ["Clean Code", "RESTful APIs", "Scrum / Kanban", "CI/CD"]
  };

  const metricsJson = {
    xmls_processed_monthly: "15.000+",
    manual_hours_saved: "200h+",
    internal_apps_deployed: "3+",
    academic_status: "Graduando 6º Semestre Unifor"
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
            cataldo@dev-environment:~
          </span>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            profile.json
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('stack')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeTab === 'stack'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            stack.json
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metrics')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeTab === 'metrics'
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            metrics.json
          </button>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition"
          aria-label="Copiar especificações JSON"
          title="Copiar JSON"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Console Body */}
      <div className="p-4 md:p-5 text-slate-300 overflow-x-auto max-h-[320px] scrollbar-thin">
        <div className="flex items-center gap-2 text-slate-500 mb-3 text-xs">
          <span className="text-emerald-400 font-bold">$</span>
          <span>cat specs/{activeTab}.json</span>
          <span className="text-slate-600 text-[10px] ml-auto flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> Live Data
          </span>
        </div>

        <pre className="text-indigo-300 font-mono text-[11px] md:text-xs leading-relaxed">
          <code>
            {JSON.stringify(currentData, null, 2)}
          </code>
        </pre>
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="px-4 py-2 bg-[#0b101d] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold">Disponível para contratação</span>
        </div>
        <span className="text-slate-500 hidden sm:inline">TypeScript 5 • React 18 • Node 20 • Python 3.12</span>
      </div>
    </div>
  );
};

export default DevConsole;
