import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/experience';

const Experience = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experiencia" className="py-fluid-section bg-apple-bg scroll-mt-20" aria-labelledby="experience-title">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2"
          >
            Carreira & Histórico
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            id="experience-title"
            className="text-fluid-h2 font-extrabold tracking-tight text-apple-text leading-tight"
          >
            Trajetória Profissional & Acadêmica
          </motion.h2>
          <p className="text-apple-secondary text-base sm:text-lg mt-3">
            Experiência corporativa prática comprovada com entregas reais, metodologias ágeis e geração de valor mensurável.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative">
          {experiences.map((exp, index) => {
            return (
              <motion.article
                key={`${exp.company}-${exp.title}`}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.1 }}
                className="apple-card p-6 sm:p-8 md:p-10 border border-slate-200 dark:border-slate-800 relative"
              >
                <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-8">
                  {/* Left Column: Role, Company, Period */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-apple-secondary">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{exp.period}</span>
                      {exp.current && (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Atual
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-apple-text tracking-tight">{exp.title}</h3>
                      <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-1">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>{exp.company}</span>
                      </div>
                      {exp.companyRole && (
                        <p className="text-xs text-apple-secondary mt-1">{exp.companyRole}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-apple-secondary">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Quick KPIs */}
                    {exp.metrics && (
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {exp.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800"
                          >
                            <span className="text-[10px] text-apple-secondary block uppercase tracking-wider">{metric.label}</span>
                            <span className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{metric.value}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    <div className="pt-2">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-apple-secondary mb-2">Tecnologias Utilizadas:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-apple-text border border-slate-200 dark:border-slate-700/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Summary & Concrete Results */}
                  <div className="flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3">
                        <TrendingUp className="w-4 h-4" /> Contexto & Entregas Principais
                      </div>
                      <p className="text-sm sm:text-base text-apple-secondary leading-relaxed mb-4">
                        {exp.summary}
                      </p>

                      <ul className="space-y-3" role="list">
                        {exp.results.map((result) => (
                          <li key={result} className="flex items-start gap-3 text-xs sm:text-sm text-apple-text leading-relaxed font-medium">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
