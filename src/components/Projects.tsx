import { motion } from 'framer-motion';
import { Github, ExternalLink, BookOpen, Layout, ArrowRight } from 'lucide-react';
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
    liveDemo: 'https://andersoncataldotech.vercel.app',
  },
];

const Projects = () => {
  return (
    <section id="projetos" className="py-fluid-section bg-white" aria-labelledby="projects-title">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-apple-blue font-semibold text-lg mb-2"
            >
              Portfolio
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
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
            className="inline-flex items-center gap-2 text-apple-blue font-bold text-lg hover:underline underline-offset-4 decoration-2 min-h-[48px]"
            aria-label="Ver todos os repositórios no GitHub"
          >
            Ver Repositórios <ExternalLink className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="apple-card group flex flex-col"
            >
              <div className="p-10 md:p-12 h-full flex flex-col">
                <div className="mb-10 flex justify-between items-start">
                  <div className="bg-apple-bg p-5 rounded-2xl border border-black/5 group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                    {project.icon === 'Layout' ? <Layout className="w-10 h-10 text-apple-blue" /> : <BookOpen className="w-10 h-10 text-apple-blue" />}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-3 text-apple-secondary hover:text-apple-text transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                        aria-label={`Ver código de ${project.title} no GitHub`}
                      >
                        <Github className="w-6 h-6" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-3xl font-bold mb-4 tracking-tight text-apple-text">{project.title}</h3>
                <p className="text-apple-secondary mb-6 leading-relaxed text-lg font-medium">
                  {project.description}
                </p>

                <div className="mb-8 grid gap-4 p-6 bg-apple-bg rounded-2xl border border-black/5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-apple-blue mb-1">Problema</p>
                    <p className="text-apple-text text-sm">{project.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-apple-secondary mb-1">Solução</p>
                    <p className="text-apple-text text-sm">{project.solution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-apple-blue mb-1">Resultado</p>
                    <p className="text-apple-text font-semibold text-sm">{project.result}</p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2 mb-10 mt-auto">
                  {project.techStack.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-white text-apple-text text-[11px] font-bold uppercase tracking-wider rounded-full border border-black/5">
                      {t}
                    </span>
                  ))}
                </ul>

                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-apple-blue font-bold text-lg group/btn w-fit min-h-[48px]"
                  >
                    Acessar Projeto
                    <div className="w-10 h-10 rounded-full bg-apple-bg flex items-center justify-center group-hover/btn:bg-apple-blue group-hover/btn:text-white transition-all duration-300" aria-hidden="true">
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
