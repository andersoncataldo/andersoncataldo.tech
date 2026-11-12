import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Layers, Lock, Globe, Sparkles, Server, Bot, Cpu, ShieldCheck, Layout, BookOpen } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { GITHUB_URL } from '../config/links';
import { useLanguage } from '../context/LanguageContext';

const projectIcons: Record<string, typeof Layers> = {
  Layers,
  Server,
  Bot,
  Cpu,
  ShieldCheck,
  Layout,
  BookOpen,
};

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t, language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const filters: { id: string; label: string }[] = [
    { id: 'all', label: `${t.projects.filters.all} (${projects.length})` },
    { id: 'fullstack', label: t.projects.filters.fullstack },
    { id: 'automation', label: t.projects.filters.automation },
    { id: 'frontend', label: t.projects.filters.frontend },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedTab === 'all') return projects;
    return projects.filter((p) => p.category === selectedTab);
  }, [selectedTab]);

  const activeProject: Project | null =
    activeProjectIndex !== null ? filteredProjects[activeProjectIndex] || null : null;

  const handlePrevProject = () => {
    if (activeProjectIndex !== null) {
      setActiveProjectIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : filteredProjects.length - 1
      );
    }
  };

  const handleNextProject = () => {
    if (activeProjectIndex !== null) {
      setActiveProjectIndex((prev) =>
        prev !== null && prev + 1 < filteredProjects.length ? prev + 1 : 0
      );
    }
  };

  return (
    <section id="projetos" className="py-fluid-section bg-apple-bg scroll-mt-20" aria-labelledby="projects-title">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2"
            >
              {t.projects.eyebrow}
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              id="projects-title"
              className="text-fluid-h2 font-extrabold tracking-tight text-apple-text leading-tight"
            >
              {t.projects.title}
            </motion.h2>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline min-h-[44px]"
            aria-label={t.projects.viewAllGithubAria}
          >
            {t.projects.viewAllGithub} <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selectedTab === filter.id}
              onClick={() => {
                setSelectedTab(filter.id);
                setActiveProjectIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                selectedTab === filter.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-slate-900 text-apple-secondary hover:text-apple-text border border-slate-200 dark:border-slate-800'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid — Text-First Engineering Cards (Preserving Data Privacy) */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const Icon = projectIcons[project.icon] || Layers;
            const isCorporate = project.id.includes('grupo') || project.id.includes('mais-saude') || project.id.includes('winthor') || project.id.includes('3coracoes') || project.id.includes('ativos');

            return (
              <motion.article
                key={project.id}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.08 }}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md group flex flex-col overflow-hidden transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                {/* Engineering Card Header */}
                <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-slate-50/80 via-white to-indigo-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/20">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                        {project.categoryLabel[language]}
                      </span>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                          <Sparkles className="w-3 h-3" /> {t.projects.featured}
                        </span>
                      )}
                    </div>

                    {/* Privacy & Governance Badge */}
                    {isCorporate ? (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
                        title={language === 'pt' ? 'Dados internos e código corporativo sob conformidade LGPD' : 'Enterprise internal code and data under privacy compliance'}
                      >
                        <Lock className="w-3 h-3 text-amber-500" />
                        <span>{language === 'pt' ? 'Corporativo • LGPD' : 'Enterprise • LGPD'}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                        <Globe className="w-3 h-3 text-indigo-500" />
                        <span>{language === 'pt' ? 'Projeto Autoral' : 'Open Project'}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-start gap-3.5 pt-1">
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-indigo-600 dark:text-indigo-400 shadow-sm shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-apple-text tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title[language]}
                      </h3>
                      <p className="text-xs font-medium text-apple-secondary mt-0.5 line-clamp-1">
                        {project.subtitle[language]}
                      </p>
                    </div>
                  </div>

                  {/* Top KPI Metrics Preview */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 font-mono">
                      {project.metrics.map((m) => (
                        <div key={m.label.pt} className="text-left">
                          <span className="text-[10px] text-apple-secondary uppercase block truncate">
                            {m.label[language]}
                          </span>
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block truncate">
                            {typeof m.value === 'string' ? m.value : m.value[language]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-apple-secondary leading-relaxed mb-4">
                      {project.description[language]}
                    </p>

                    {/* Challenge & Result Summary Pill */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1 mb-5">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                        {t.projects.keyResult}
                      </span>
                      <p className="text-xs font-semibold text-apple-text leading-snug">
                        {project.result[language]}
                      </p>
                    </div>
                  </div>

                  <div>
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-apple-text border border-slate-200 dark:border-slate-700/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveProjectIndex(index)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition"
                      >
                        <Layers className="w-4 h-4" /> {t.projects.detailsButton}
                      </button>

                      <div className="flex items-center gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl text-apple-secondary hover:text-apple-text hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            aria-label={t.projects.viewCode}
                            title={t.projects.viewCode}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-600/20 transition"
                          >
                            {t.projects.demo} <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Modal View with Continuous Prev/Next Navigation */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProjectIndex(null)}
          onPrev={handlePrevProject}
          onNext={handleNextProject}
          currentIndex={activeProjectIndex ?? undefined}
          totalProjects={filteredProjects.length}
        />
      </div>
    </section>
  );
};

export default Projects;
