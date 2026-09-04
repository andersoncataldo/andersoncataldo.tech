import { useState } from 'react';
import { automationPipeline, rpaHighlights } from '../data/automation';
import { Bot, CheckCircle2, Cpu, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const PipelineVisualizer = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(1);
  const currentStep = automationPipeline[activeStepIndex];

  return (
    <div className="w-full space-y-8">
      {/* Pipeline Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {automationPipeline.map((step, index) => {
          const isActive = index === activeStepIndex;
          return (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => setActiveStepIndex(index)}
              className={`text-left p-4 rounded-2xl border transition-all relative ${
                isActive
                  ? 'bg-indigo-600/10 border-indigo-500 shadow-md shadow-indigo-500/10 dark:bg-indigo-950/40'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-indigo-400/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  Passo {step.stepNumber}
                </span>
                {isActive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
              </div>
              <p className="font-bold text-sm text-apple-text truncate">{step.title.split('&')[0]}</p>
              <p className="text-[11px] text-apple-secondary truncate mt-1">{step.metrics}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Flow Container */}
      <div className="apple-card p-6 md:p-8 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-[#0b1120] border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  Etapa {currentStep.stepNumber} de 04
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-apple-text">{currentStep.title}</h3>
              </div>
            </div>

            <p className="text-apple-secondary text-base leading-relaxed">
              {currentStep.description}
            </p>

            {/* Step Sub-points */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-apple-secondary">Validações Técnicas & Ações:</p>
              <ul className="space-y-2">
                {currentStep.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5 text-sm text-apple-text">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Tags */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-apple-secondary font-semibold mr-1">Tecnologias:</span>
              {currentStep.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-apple-text border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metric Pill Card */}
          <div className="w-full lg:w-72 p-6 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest text-indigo-200 font-bold">Métrica de Performance</span>
                <Zap className="w-4 h-4 text-amber-300" />
              </div>
              <p className="text-3xl font-extrabold mb-2 tracking-tight">{currentStep.metrics}</p>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Garantia de integridade com execução autônoma e sem necessidade de intervenção humana em lote.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-indigo-400/30 flex items-center justify-between text-xs font-semibold">
              <span>Status Operacional</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Ativo
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quantitative Highlights Row */}
      <div className="grid md:grid-cols-3 gap-4">
        {rpaHighlights.map((item, idx) => (
          <div
            key={item.title}
            className="apple-card p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
                {idx === 0 ? <Zap className="w-5 h-5" /> : idx === 1 ? <Bot className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                <span className="text-xs font-bold uppercase tracking-wider text-apple-secondary">{item.subtitle}</span>
              </div>
              <h4 className="text-lg font-bold text-apple-text mb-2">{item.title}</h4>
              <p className="text-sm text-apple-secondary leading-relaxed">{item.description}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Impacto Comprovado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
