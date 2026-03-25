import { motion } from 'framer-motion';
import { Github, ExternalLink, Bot, BookOpen, ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Automação de Certidões de Débitos',
      description: 'Sistema RPA para renovação automatizada em portais governamentais, reduzindo o tempo de rotina em 85%. Gerencia milhares de XMLs mensais.',
      tech: ['Python', 'Playwright', 'Pandas', 'OS/Shutil'],
      icon: <Bot className="w-10 h-10 text-primary-500" />,
      github: '#',
      link: '#',
    },
    {
      title: 'Plataforma Clube do Livro',
      description: 'Interface interativa desenvolvida para o projeto de extensão da Unifor, focada em usabilidade e organização de acervo.',
      tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      icon: <BookOpen className="w-10 h-10 text-primary-500" />,
      github: '#',
      link: '#',
    },
  ];

  return (
    <section id="projetos" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Projetos em Destaque</h2>
            <p className="text-zinc-400 max-w-xl">
              Soluções reais desenvolvidas para otimizar processos e melhorar a experiência do usuário.
            </p>
          </div>
          <a href="https://github.com/andersoncataldo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-bold transition-colors">
            Ver repositórios no GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden hover:border-zinc-700 transition-all"
            >
              <div className="p-8 md:p-10">
                <div className="mb-8 flex justify-between items-start">
                  <div className="bg-zinc-800 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                    {project.icon}
                  </div>
                  <div className="flex gap-2">
                    <a href={project.github} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-950 text-zinc-400 text-xs font-medium rounded-full border border-zinc-800">
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-white font-bold group/btn"
                >
                  Conhecer projeto
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
