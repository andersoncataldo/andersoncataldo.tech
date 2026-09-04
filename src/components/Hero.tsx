import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, MessageCircle } from 'lucide-react';
import DevConsole from './DevConsole';
import { keyMetrics } from '../data/metrics';
import { WHATSAPP_URL } from '../config/links';
import resumeFile from '../assets/Anderson_Viana_Curriculo_PT-BR.pdf';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-apple-bg pt-16 pb-12 sm:pt-20 sm:pb-16 tech-grid-pattern scroll-mt-20"
      aria-label="Apresentação Profissional"
    >
      {/* Subtle Ambient Glows */}
      <div className="ambient-glow bg-indigo-500/15 w-[500px] h-[500px] -top-32 -left-20" aria-hidden="true" />
      <div className="ambient-glow bg-cyan-500/10 w-[450px] h-[450px] -bottom-32 -right-20" aria-hidden="true" />

      <div className="section-container relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Availability Status Badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
            className="mb-6 inline-flex flex-wrap items-center justify-center gap-2"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-apple-text">Disponível para novas oportunidades</span>
              <span className="text-apple-secondary font-normal">• Estágio & Júnior</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.1 }}
            className="text-fluid-h1 font-extrabold tracking-tight mb-6 text-apple-text leading-[1.05]"
          >
            Desenvolvedor Full-Stack com <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              impacto real em React, APIs e RPA.
            </span>
          </motion.h1>

          {/* Subtitle / Positioning */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-apple-secondary leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            Olá, sou <strong className="text-apple-text font-semibold">Anderson Cataldo</strong>. Graduando em Ciência da Computação (Unifor - 6º Semestre) e desenvolvedor com experiência prática na criação de sistemas web modernos e robôs de automação que já pouparam mais de <strong className="text-apple-text font-semibold">200 horas de trabalho manual</strong>.
          </motion.p>

          {/* Quick CTAs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12"
          >
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition-all hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
            >
              Ver Projetos <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              download="curriculo-anderson-cataldo.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3.5 text-sm font-bold text-apple-text hover:border-indigo-500 transition-all hover:-translate-y-0.5 min-h-[48px]"
            >
              <FileText className="w-4 h-4 text-indigo-500" /> Baixar Currículo
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-3.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 transition-all hover:-translate-y-0.5 min-h-[48px]"
              aria-label="Conversar via WhatsApp"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </motion.div>

          {/* Key Quantifiable Metrics */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left mb-14"
          >
            {keyMetrics.map((metric) => (
              <div
                key={metric.label}
                className="apple-card p-4 sm:p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                    {metric.trend}
                  </span>
                  <p className="text-2xl sm:text-3xl font-black text-apple-text mt-1 mb-1 tracking-tight">
                    {metric.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-apple-text leading-snug">
                    {metric.label}
                  </p>
                </div>
                <p className="text-[11px] text-apple-secondary mt-2 leading-relaxed line-clamp-2">
                  {metric.description}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Interactive DevConsole Terminal Widget */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.5 }}
            className="w-full"
          >
            <DevConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
