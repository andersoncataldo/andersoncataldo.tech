import { motion, useReducedMotion } from 'framer-motion';
import { Github, ExternalLink, BookOpen, Layout, ArrowRight } from 'lucide-react';
import previewCarlo from '../assets/project-carlo-acutis-preview.svg';
import previewPortfolio from '../assets/project-portfolio-preview.svg';
import { Project as ProjectType } from '../types';

const projects: ProjectType[] = [
  {
    title: 'Plataforma Gamificada São Carlo Acutis',
    description: 'Engenharia Full-Stack de uma plataforma educacional interativa.',
    challenge: 'Criar uma experiência engajadora para o ensino de história religiosa.',
    role: 'Full-Stack Developer',
    solution: 'Arquitetura com React no Front-End e Spring Boot no Back-End, utilizando PostgreSQL para persistência.',
    result: 'Plataforma performática com sistema de recompensas em tempo real.',
    techStack: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL'],
    impact: 'Alta performance e escalabilidade para múltiplos usuários.',
    icon: 'Layout',
    github: 'https://github.com/andersoncataldo/CarloAcutis',
    liveDemo: 'https://carlo-acutis-virid.vercel.app',
    images: [previewCarlo],
  },
  {
    title: 'Portfólio Web Profissional',
    description: 'Design e desenvolvimento de uma vitrine técnica moderna com estética minimalista.',
    challenge: 'Apresentar habilidades técnicas e resultados de forma clara e atraente.',
    role: 'UI/UX Designer & Lead Developer',
    solution: 'Uso de Tailwind CSS v4 para tipografia fluida e Framer Motion para interatividade premium.',
    result: 'Interface fluida, responsiva e otimizada para SEO.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    impact: 'Destaque profissional com interface fluida e design responsivo.',
    icon: 'BookOpen',
    github: 'https://github.com/andersoncataldo/andersoncataldo.tech',
    liveDemo: 'https://andersoncataldo.tech',
    images: [previewPortfolio],
  },
];

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projetos" className="py-fluid-section bg-apple-bg dark:bg-slate-950 scroll-mt-24 lg:scroll-mt-28" aria-labelledby="projects-title">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-apple-accent font-semibold text-lg mb-2"
            >
              Projetos
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              id="projects-title"
              className="text-fluid-h2 font-bold tracking-tight text-apple-text leading-tight"
            >
              Projetos Selecionados
            </motion.h2>
          </div>
          <a
            href="https://github.com/andersoncataldo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-apple-accent font-bold text-lg hover:underline underline-offset-4 decoration-2 min-h-[48px]"
            aria-label="Ver todos os repositórios no GitHub"
          >
            Ver Repositórios <ExternalLink className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
              className="apple-card group flex flex-col"
            >
              <div className="p-6 md:p-8 h-full flex flex-col">
                <div className="mb-6 overflow-hidden rounded-[24px] border border-apple bg-apple-bg">
                  <img
                    src={project.images?.[0]}
                    alt={`Preview do projeto ${project.title}`}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="mb-6 flex justify-between items-start">
                  <div className="bg-apple-bg p-5 rounded-2xl border-apple transition-transform duration-500" aria-hidden="true">
                    {project.icon === 'Layout' ? <Layout className="w-10 h-10 text-apple-accent" /> : <BookOpen className="w-10 h-10 text-apple-accent" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-apple px-3 py-2 text-apple-secondary hover:text-apple-text transition-colors min-h-[48px]"
                        aria-label={`Ver código de ${project.title} no GitHub`}
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Ver código</span>
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-4 tracking-tight text-apple-text">{project.title}</h3>
                {project.role && (
                  <span className="inline-flex items-center rounded-full bg-apple-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-apple-accent mb-4">
                    {project.role}
                  </span>
                )}
                <p className="text-apple-secondary mb-6 leading-relaxed text-lg font-medium">
                  {project.description}
                </p>

                <div className="mb-8 grid gap-4 p-6 bg-apple-bg rounded-2xl border border-apple">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-apple-accent mb-1">Problema</p>
                    <p className="text-apple-text text-sm">{project.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-apple-secondary mb-1">Solução</p>
                    <p className="text-apple-text text-sm">{project.solution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-apple-accent mb-1">Resultado</p>
                    <p className="text-apple-text font-semibold text-sm">{project.result}</p>
                  </div>
                  {project.impact && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-apple-accent mb-1">Impacto</p>
                      <p className="text-apple-text text-sm">{project.impact}</p>
                    </div>
                  )}
                </div>

                <ul className="flex flex-wrap gap-2 mb-10 mt-auto">
                  {project.techStack.map((t) => (
                    <span key={t} className="border border-apple px-3 py-1 bg-apple-bg text-apple-text text-[11px] font-bold uppercase tracking-wider rounded-full">
                      {t}
                    </span>
                  ))}
                </ul>

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-apple-accent font-bold text-lg group/btn w-fit min-h-[48px]"
                  >
                    Acessar Projeto
                    <div className="w-10 h-10 rounded-full bg-apple-bg flex items-center justify-center group-hover/btn:bg-apple-accent group-hover/btn:text-white transition-all duration-300" aria-hidden="true">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
