import { motion } from 'framer-motion';
import { Terminal, Layout, Wrench, ShieldCheck } from 'lucide-react';

const Skills = () => {
  const skillGroups = [
    {
      title: 'Front-End',
      icon: <Layout className="w-6 h-6 text-primary-500" aria-hidden="true" />,
      skills: ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Figma'],
    },
    {
      title: 'Back-End & RPA',
      icon: <Terminal className="w-6 h-6 text-primary-500" aria-hidden="true" />,
      skills: ['Python (Playwright, Pyautogui, Pandas, shutil, os)', 'Java (Spring Boot)', 'javaScript (Node.js)'],
    },
    {
      title: 'Ferramentas & DB',
      icon: <Wrench className="w-6 h-6 text-emerald-500" aria-hidden="true" />,
      skills: ['Git & GitHub', 'SQL', 'PostgreSQL', 'Postman'],
    },
  ];

  const softSkills = [
    'Adaptabilidade',
    'Comunicação Assertiva',
    'Trabalho em Equipe',
    'Aprendizado Contínuo',
    'Pensamento Analítico',
  ];

  return (
    <section id="habilidades" className="py-24 bg-zinc-900/30" aria-labelledby="skills-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="skills-title" className="text-3xl md:text-5xl font-bold mb-4">Stack Tecnológica</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Combinando ferramentas modernas para criar aplicações robustas e processos automatizados eficientes.
          </p>
        </div>

        <ul className="grid md:grid-cols-3 gap-8 mb-16" role="list">
          {skillGroups.map((group, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-zinc-700 transition-all hover:-translate-y-1"
            >
              <div className="bg-zinc-800/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6" aria-hidden="true">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold mb-6" id={`skill-group-${index}`}>{group.title}</h3>
              <ul className="flex flex-wrap gap-2" aria-labelledby={`skill-group-${index}`}>
                {group.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-medium rounded-lg border border-zinc-700"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>

        <div className="bg-linear-to-r from-primary-500/10 to-primary-500/10 border border-zinc-800 p-8 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-zinc-900 p-3 rounded-2xl border border-zinc-800" aria-hidden="true">
                <ShieldCheck className="w-8 h-8 text-primary-500" />
              </div>
              <div>
                <h4 className="text-lg font-bold" id="soft-skills-title">Habilidades Comportamentais</h4>
                <p className="text-sm text-zinc-400">Diferenciais que potencializam o trabalho técnico.</p>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center gap-3" aria-labelledby="soft-skills-title">
              {softSkills.map((skill, i) => (
                <li key={i} className="text-sm font-medium text-zinc-300 px-4 py-2 bg-zinc-950/50 rounded-full border border-zinc-800">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
