import { motion } from 'framer-motion';
import { Terminal, Layout, Wrench, ShieldCheck } from 'lucide-react';

const Skills = () => {
  const skillGroups = [
    {
      title: 'Back-end & RPA',
      icon: <Terminal className="w-6 h-6 text-primary-500" />,
      skills: ['Python (Playwright, Pandas)', 'Java (Spring Boot)', 'SQL', 'Node.js'],
    },
    {
      title: 'Front-end & UI/UX',
      icon: <Layout className="w-6 h-6 text-indigo-500" />,
      skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'HTML5/CSS3'],
    },
    {
      title: 'Ferramentas & Infra',
      icon: <Wrench className="w-6 h-6 text-emerald-500" />,
      skills: ['Git & GitHub', 'PostgreSQL', 'Docker', 'Vite', 'Postman'],
    },
  ];

  const softSkills = [
    'Adaptabilidade Técnica',
    'Comunicação Assertiva',
    'Trabalho em Equipe',
    'Resolução de Problemas',
    'Pensamento Analítico',
  ];

  return (
    <section id="habilidades" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Stack Tecnológica</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Combinando ferramentas modernas para criar aplicações robustas e processos automatizados eficientes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-zinc-700 transition-all hover:-translate-y-1"
            >
              <div className="bg-zinc-800/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-lg border border-zinc-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary-500/10 to-indigo-500/10 border border-zinc-800 p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
                <ShieldCheck className="w-8 h-8 text-primary-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold">Habilidades Comportamentais</h4>
                <p className="text-sm text-zinc-400">Diferenciais que potencializam o trabalho técnico.</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {softSkills.map((skill, i) => (
                <span key={i} className="text-sm font-medium text-zinc-300 px-4 py-2 bg-zinc-950/50 rounded-full border border-zinc-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
