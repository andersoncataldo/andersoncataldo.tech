import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, Zap } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Aprendiz – Assistente Administrativo | Sistemas e Projetos',
      company: 'Grupo 3Corações',
      period: 'Jan/2025 - Atual',
      description: [
        'Automatizei a renovação de certidões de débitos em portais web utilizando Python (Playwright, Pandas).',
        'Reduzi o tempo de execução da rotina em mais de 85%.',
        'Desenvolvi scripts para extração e roteamento inteligente de 2.000 a 8.000 arquivos XML mensais.',
      ],
      type: 'work',
    },
    {
      title: 'Projeto de Extensão - Clube do Livro',
      company: 'Universidade de Fortaleza',
      period: 'Out/2025 - Dez/2025',
      description: [
        'Desenvolvi componentes e interfaces interativas utilizando React e Tailwind.',
        'Estruturei a documentação técnica (requisitos, objetivos e metodologias).',
        'Utilizei ferramentas como diagrams.net, Astah e TypeScript.',
      ],
      type: 'project',
    },
    {
      title: 'Bacharelado em Ciência da Computação',
      company: 'Universidade de Fortaleza (Unifor)',
      period: 'Início em 2024.1',
      description: [
        'Foco em algoritmos, arquitetura de sistemas e desenvolvimento de software.',
        'Participação ativa em projetos acadêmicos e de extensão.',
      ],
      type: 'education',
    },
  ];

  return (
    <section id="experiencia" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Minha Trajetória</h2>
            <p className="text-zinc-400 max-w-xl">
              Experiência profissional e acadêmica focada em resultados mensuráveis e excelência técnica.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-xl text-primary-400">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">+85% de eficiência em automações</span>
          </div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[200px_1px_1fr] md:gap-12">
                {/* Period - Desktop */}
                <div className="hidden md:flex flex-col items-end pt-1">
                  <div className="flex items-center gap-2 text-zinc-500 font-medium">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                </div>

                {/* Timeline Line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800 md:relative md:left-auto">
                  <div className="absolute top-2 -left-[5px] w-2.5 h-2.5 rounded-full bg-primary-500 ring-4 ring-zinc-950" />
                </div>

                {/* Content */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-3xl hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-primary-500 mb-2">
                        {exp.type === 'work' ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                        <span className="text-xs font-bold uppercase tracking-wider">{exp.type === 'work' ? 'Profissional' : exp.type === 'education' ? 'Acadêmico' : 'Projeto'}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                      <p className="text-zinc-400 font-medium">{exp.company}</p>
                      {/* Period - Mobile */}
                      <div className="md:hidden flex items-center gap-2 text-zinc-500 text-sm mt-2">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-zinc-400 leading-relaxed">
                        <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-zinc-700 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
