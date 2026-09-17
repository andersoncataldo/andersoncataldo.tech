import { useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle2, Layers, Cpu, BarChart3 } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

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
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-apple-secondary hover:text-apple-text transition"
          aria-label={t.projectModal.closeAria}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-8">
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

        {/* Image Preview */}
        {project.images?.[0] && (
          <div className="mb-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
            <img
              src={project.images[0]}
              alt={`${t.projectModal.previewAlt} ${project.title[language]}`}
              className="w-full h-56 sm:h-72 object-cover"
            />
          </div>
        )}

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {project.metrics.map((m) => (
              <div key={m.label.pt} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <p className="text-[11px] text-apple-secondary font-medium uppercase tracking-wider">{m.label[language]}</p>
                <p className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {typeof m.value === 'string' ? m.value : m.value[language]}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Overview & Deep Dive */}
        <div className="space-y-5 text-sm sm:text-base leading-relaxed text-apple-text">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" /> {t.projectModal.engineeringChallenge}
            </h3>
            <p className="text-apple-secondary bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
              {project.challenge[language]}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> {t.projectModal.solutionArchitecture}
            </h3>
            <p className="text-apple-secondary mb-3">{project.solution[language]}</p>

            {project.architecture && (
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-apple-text uppercase tracking-wider">{t.projectModal.architectureDetail}</p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-apple-secondary">
                  {project.architecture.map((arch) => (
                    <li key={arch.pt} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{arch[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" /> {t.projectModal.resultImpact}
            </h3>
            <p className="text-apple-secondary font-medium">{project.result[language]}</p>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-apple-secondary mb-2">{t.projectModal.techStack}</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-apple-text border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition"
              >
                {t.projectModal.accessDemo} <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-apple-text font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <Github className="w-4 h-4" /> {t.projectModal.viewRepo}
              </a>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-apple-secondary hover:text-apple-text text-sm font-semibold ml-auto"
          >
            {t.projectModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
