import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, Layout, Wrench, ShieldCheck } from 'lucide-react';

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();

  const skillGroups = [
    {
      title: 'Front-End',
      icon: <Layout className="w-6 h-6 text-apple-accent" aria-hidden="true" />,
      skills: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
    },
    {
      title: 'Back-End & Automation',
      icon: <Terminal className="w-6 h-6 text-apple-accent" aria-hidden="true" />,
      skills: ['Node.js (Express)', 'Java (Spring Boot)', 'Python (Django)', 'RPA'],
    },
    {
      title: 'Infrastructure & DB',
      icon: <Wrench className="w-6 h-6 text-apple-accent" aria-hidden="true" />,
      skills: ['Git & GitHub', 'PostgreSQL', 'Supabase', 'Neon', 'MongoDB', 'Vercel'],
    },
  ];

  const softSkills = [
    'Pensamento Analítico',
    'Resolução de Problemas',
    'Comunicação Técnica',
    'Aprendizado Autônomo',
    'Trabalho em Equipe',
  ];

  return (
    <section id="habilidades" className="py-fluid-section bg-apple-bg scroll-mt-24 lg:scroll-mt-28" aria-labelledby="skills-title">
      <div className="section-container">
        <div className="text-center mb-20">
          <motion.p 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-apple-accent font-semibold text-lg mb-2"
          >
            Expertise
          </motion.p>
          <motion.h2 
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            id="skills-title" 
            className="text-fluid-h2 font-bold tracking-tight text-apple-text leading-tight"
          >
            Stack Tecnológica
          </motion.h2>
        </div>

        <ul className="grid md:grid-cols-3 gap-8 mb-16" role="list">
          {skillGroups.map((group, index) => (
            <motion.li
              key={index}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
              className="apple-card p-10 flex flex-col items-start"
            >
              <div className="bg-apple-bg w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border-apple" aria-hidden="true">
                {group.icon}
              </div>
              <h3 className="text-2xl font-bold mb-8 text-apple-text tracking-tight">{group.title}</h3>
              <ul className="flex flex-wrap gap-3" aria-labelledby={`skill-group-${index}`}>
                {group.skills.map((skill, i) => (
                  <li
                    key={i}
                    className="px-4 py-2 bg-apple-bg text-apple-text text-sm font-semibold rounded-xl border-apple"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>

        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
          className="apple-card p-10 bg-apple-bg/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-6">
              <div className="bg-apple-bg p-5 rounded-2xl shadow-sm border-apple" aria-hidden="true">
                <ShieldCheck className="w-10 h-10 text-apple-accent" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-apple-text">Mindset Profissional</h4>
                <p className="text-apple-secondary text-lg">Habilidades que impulsionam o valor técnico.</p>
              </div>
            </div>
            <ul className="flex flex-wrap justify-center gap-4" aria-labelledby="soft-skills-title">
              {softSkills.map((skill, i) => (
                <li key={i} className="text-sm font-bold text-apple-text px-6 py-3 bg-apple-bg rounded-2xl border-apple shadow-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
