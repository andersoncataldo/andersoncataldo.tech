import { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { projects } from '../data/projects';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { GITHUB_URL } from '../config/links';

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedTab === 'all') return projects;
    return projects.filter((p) => p.category === selectedTab);
  }, [selectedTab]);

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
              Portfólio de Engenharia & Casos Reais
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              id="projects-title"
              className="text-fluid-h2 font-extrabold tracking-tight text-apple-text leading-tight"
            >
              Projetos & Aplicações em Produção
            </motion.h2>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline min-h-[44px]"
            aria-label="Ver todos os repositórios de Anderson no GitHub"
          >
            Ver todos no GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              selectedTab === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-apple-secondary hover:text-apple-text border border-slate-200 dark:border-slate-800'
            }`}
          >
            Todos ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('fullstack')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              selectedTab === 'fullstack'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-apple-secondary hover:text-apple-text border border-slate-200 dark:border-slate-800'
            }`}
          >
            Full-Stack & Web
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('automation')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              selectedTab === 'automation'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-apple-secondary hover:text-apple-text border border-slate-200 dark:border-slate-800'
            }`}
          >
            Automações RPA & Python
          </button>
          <button
            type="button"
            onClick={() => setSelectedTab('frontend')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
              selectedTab === 'frontend'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-slate-900 text-apple-secondary hover:text-apple-text border border-slate-200 dark:border-slate-800'
            }`}
          >
            Front-End & Performance
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              className="apple-card group flex flex-col border border-slate-200 dark:border-slate-800"
            >
              {/* Preview Image */}
              {project.images?.[0] && (
                <div className="relative aspect-16/10 overflow-hidden bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                  <img
                    src={project.images[0]}
                    alt={`Preview de ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#090e1a]/85 backdrop-blur-md text-indigo-400 border border-indigo-500/30">
                      {project.categoryLabel}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                        Destaque
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-apple-text tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-apple-secondary mt-1">{project.subtitle}</p>
                </div>

                <p className="text-sm text-apple-secondary leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Challenge & Result Summary Pill */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 mb-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                      Resultado Chave:
                    </span>
                    <p className="text-xs font-semibold text-apple-text mt-0.5">{project.result}</p>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800 text-apple-text border border-slate-200 dark:border-slate-700/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition"
                  >
                    <Layers className="w-4 h-4" /> Detalhes da Arquitetura
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl text-apple-secondary hover:text-apple-text hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        aria-label={`Ver código no GitHub`}
                        title="Ver Código"
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
                        Demo <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Modal View */}
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      </div>
    </section>
  );
};

export default Projects;
