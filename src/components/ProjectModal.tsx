import { useEffect, useRef } from 'react';
import { X, Github, ExternalLink, CheckCircle2, Layers, Cpu, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalProjects?: number;
}

export const ProjectModal = ({
  project,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalProjects,
}: ProjectModalProps) => {
  const { t, language } = useLanguage();
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

    const modalNode = modalContainerRef.current;
    const focusableSelector = 'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = modalNode ? Array.from(modalNode.querySelectorAll<HTMLElement>(focusableSelector)) : [];
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    // Focus close button initially
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft' && onPrev) {
        e.preventDefault();
        onPrev();
        return;
      }

      if (e.key === 'ArrowRight' && onNext) {
        e.preventDefault();
        onNext();
        return;
      }

      if (e.key === 'Tab' && focusable.length > 0) {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={modalContainerRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Actions: Prev / Next / Close */}
        <div className="absolute top-5 right-5 flex items-center gap-2">
          {totalProjects && currentIndex !== undefined && (
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={onPrev}
                className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                aria-label={language === 'pt' ? 'Projeto anterior (Seta esquerda)' : 'Previous project (Left arrow)'}
                title={language === 'pt' ? 'Anterior (←)' : 'Previous (←)'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono px-1 font-semibold text-slate-500 dark:text-slate-400">
                {currentIndex + 1}/{totalProjects}
              </span>
              <button
                type="button"
                onClick={onNext}
                className="p-1 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                aria-label={language === 'pt' ? 'Próximo projeto (Seta direita)' : 'Next project (Right arrow)'}
                title={language === 'pt' ? 'Próximo (→)' : 'Next (→)'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-apple-secondary hover:text-apple-text transition"
            aria-label={t.projectModal.closeAria}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <div className="mb-6 pr-32">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
              {project.categoryLabel[language]}
            </span>
            {project.role && (
              <span className="text-xs text-apple-secondary font-medium">• {project.role[language]}</span>
            )}
          </div>
          <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-apple-text tracking-tight">
            {project.title[language]}
          </h2>
          <p className="text-apple-secondary text-sm mt-1">{project.subtitle[language]}</p>
        </div>

        {/* Modal Content Sections */}
        <div className="space-y-6 text-apple-secondary text-sm leading-relaxed">
          {/* Main Description */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              {t.projectModal.overview}
            </h3>
            <p className="text-base text-apple-text">{project.description[language]}</p>
          </div>

          {/* Metrics Grid */}
          {project.metrics && (
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              {project.metrics.map((m) => (
                <div key={m.label.pt} className="text-center">
                  <span className="text-[10px] text-apple-secondary font-mono uppercase block">{m.label[language]}</span>
                  <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                    {typeof m.value === 'string' ? m.value : m.value[language]}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Challenge & Solution Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-1.5 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" /> {t.projectModal.challenge}
              </h4>
              <p>{project.challenge[language]}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {t.projectModal.solution}
              </h4>
              <p>{project.solution[language]}</p>
            </div>
          </div>

          {/* Architecture / Highlights */}
          {project.architecture && (
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> {t.projectModal.architecture}
              </h4>
              <ul className="space-y-2">
                {project.architecture.map((item) => (
                  <li key={item.pt} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span>{item[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Result & Impact */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 text-indigo-950 dark:text-indigo-200">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-1">
              {t.projectModal.businessImpact}
            </h4>
            <p className="font-medium">{project.impact[language]}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-apple-secondary mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> {t.projectModal.technologies}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-apple-text border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onPrev && onNext && (
              <span className="text-xs text-slate-400 hidden sm:inline">
                {language === 'pt' ? 'Dica: use as teclas ← e → para navegar' : 'Tip: use ← and → keys to browse'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-apple-text hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <Github className="w-4 h-4" /> {t.projectModal.viewRepository}
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition"
              >
                <ExternalLink className="w-4 h-4" /> {t.projectModal.accessLive}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
