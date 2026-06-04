import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { Experience as ExperienceType } from '../types';

const experiences: ExperienceType[] = [
  {
    title: 'Estagiário de T.I',
    company: 'Distribuidora Mais Saúde',
    period: 'Jun/2026 - Atual',
    location: 'Ceará, Brasil',
    results: [
      'Engenharia de Front-End com Next.js e Tailwind CSS para sistemas de missão crítica, priorizando performance e Core Web Vitals.',
      'Desenvolvimento de APIs robustas em Node.js com integração nativa ao PostgreSQL via Supabase para gestão em tempo real.',
      'Implementação de fluxos de CI/CD automatizados na Vercel, reduzindo significativamente o tempo de entrega de novas features.',
      'Liderança técnica na organização de demandas internas através do Trello, elevando a transparência e agilidade do time.'
    ],
    stack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Vercel'],
    type: 'work',
  },
  {
    title: 'Aprendiz – Setor Fiscal | Sistemas e Projetos',
    company: 'Grupo 3Corações',
    period: 'Jan/2025 - Abr/2026',
    location: 'Ceará, Brasil',
    results: [
      'Arquitetura de soluções RPA de alto impacto, automatizando a extração em massa de XMLs e eliminando erros manuais críticos.',
      'Conversão de fluxos operacionais legados em rotinas automatizadas, gerando um ganho de produtividade superior a 80%.',
      'Desenvolvimento de dashboards analíticos para monitoramento de KPIs e tomada de decisão baseada em dados reais.',
      'Estruturação de documentações técnicas de alto nível para garantir a manutenibilidade e escalabilidade dos sistemas.'
    ],
    stack: ['Python', 'RPA', 'Excel Automation', 'Dashboards'],
    type: 'work',
  },
  {
    title: 'Bacharelado em Ciência da Computação',
    company: 'Universidade de Fortaleza (Unifor)',
    period: 'Jan/2024 - Atual',
    location: 'Ceará, Brasil',
    results: [
      'Foco em Engenharia de Software, Algoritmos e Desenvolvimento Full-Stack.',
      'Atualmente no 5º semestre, com sólida base acadêmica e prática.',
      'Desenvolvimento de projetos focados em performance e escalabilidade.'
    ],
    stack: ['Engenharia de Software', 'Algoritmos', 'Full-Stack'],
    type: 'education',
  },
];

const Experience = () => {
  return (
    <section id="experiencia" className="py-fluid-section bg-apple-bg" aria-labelledby="experience-title">
      <div className="section-container">
        <div className="mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-apple-blue font-semibold text-lg mb-2"
          >
            Carreira
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            id="experience-title" 
            className="text-fluid-h2 font-bold tracking-tight text-apple-text leading-tight"
          >
            Trajetória Profissional
          </motion.h2>
        </div>

        <div className="grid gap-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="apple-card p-8 md:p-12 flex flex-col md:grid md:grid-cols-[280px_1fr] gap-8 md:gap-16"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-2 text-apple-secondary text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  <span>{exp.period}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-apple-text mb-1">{exp.company}</h3>
                  <p className="text-lg text-apple-blue font-semibold">{exp.title}</p>
                </div>
                <div className="flex items-center gap-2 text-apple-secondary text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  {exp.stack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-apple-bg text-apple-text text-[11px] font-bold uppercase tracking-wider rounded-full border border-black/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-apple-secondary font-medium mb-6 uppercase tracking-widest text-xs">Principais Resultados</p>
                <ul className="space-y-4" role="list">
                  {exp.results.map((item, i) => (
                    <li key={i} className="flex gap-4 text-apple-text leading-relaxed text-base font-medium">
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-apple-blue shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
