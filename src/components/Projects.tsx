import { motion } from 'framer-motion';
import { Github, ExternalLink, BookOpen, ArrowRight, Layout } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Plataforma Educacional Gamificada',
      description: 'Desenvolvimento Full Stack de uma plataforma educacional com gamificação, focada em escalabilidade e alta performance.',
      tech: ['Java (Spring Boot)', 'React', 'TypeScript', 'PostgreSQL'],
      icon: <Layout className="w-10 h-10 text-primary-500" aria-hidden="true" />,
      github: 'https://github.com/andersoncataldo/CarloAcutis',
      link: 'https://carlo-acutis-virid.vercel.app',
    },
    {
      title: 'Plataforma Clube do Livro',
      description: 'Interface interativa desenvolvida para o projeto de extensão da Unifor, focada em usabilidade e organização de acervo.',
      tech: ['React.js', 'TypeScript', 'Tailwind CSS'],
      icon: <BookOpen className="w-10 h-10 text-primary-500" aria-hidden="true" />,
      github: 'https://github.com/leonardomenesedev/myweblib-front',
      link: 'https://myweblib.vercel.app/login',
    },
  ];

  return (
    <section id="projetos" className="py-24 bg-zinc-950" aria-labelledby="projects-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 id="projects-title" className="text-3xl md:text-5xl font-bold mb-4">Projetos em Destaque</h2>
            <p className="text-zinc-400 max-w-xl">
              Soluções reais desenvolvidas para otimizar processos e melhorar a experiência do usuário.
            </p>
          </div>
          <a 
            href="https://github.com/andersoncataldo" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold transition-colors"
            aria-label="Ver todos os repositórios no GitHub"
          >
            Ver repositórios no GitHub
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-4xl overflow-hidden hover:border-zinc-700 transition-all flex flex-col"
            >
              <div className="p-8 md:p-10 h-full flex flex-col">
                <div className="mb-8 flex justify-between items-start">
                  <div className="bg-zinc-800 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500" aria-hidden="true">
                    {project.icon}
                  </div>
                  {project.github && (
                    <div className="flex gap-2">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                        title={`Ver código de ${project.title} no GitHub`}
                        aria-label={`Ver código de ${project.title} no GitHub`}
                      >
                        <Github className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-2 mb-8 mt-auto" aria-label={`Tecnologias usadas em ${project.title}`}>
                  {project.tech.map((t, i) => (
                    <li key={i} className="px-3 py-1 bg-zinc-950 text-zinc-400 text-xs font-medium rounded-full border border-zinc-800">
                      {t}
                    </li>
                  ))}
                </ul>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-bold group/btn"
                    aria-label={`Conhecer o projeto ${project.title}`}
                  >
                    Conhecer projeto
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all" aria-hidden="true">
                      <ArrowRight className="w-4 h-4" />
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
