import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, MessageCircle } from 'lucide-react';
import DevConsole from './DevConsole';
import { keyMetrics } from '../data/metrics';
import { WHATSAPP_URL } from '../config/links';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t, language, currentResume } = useLanguage();

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-apple-bg pt-16 pb-12 sm:pt-20 sm:pb-16 tech-grid-pattern scroll-mt-20"
      aria-label={t.hero.ariaLabel}
    >
      {/* Subtle Ambient Glows */}
      <div className="ambient-glow bg-indigo-500/15 w-[500px] h-[500px] -top-32 -left-20" aria-hidden="true" />
      <div className="ambient-glow bg-cyan-500/10 w-[450px] h-[450px] -bottom-32 -right-20" aria-hidden="true" />

      <div className="section-container relative z-10 w-full">
        <div className="text-center max-w-4xl mx-auto">
          {/* Engineering Status Badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
            className="mb-6 inline-flex flex-wrap items-center justify-center gap-2"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-sm text-slate-800 dark:text-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>{t.hero.statusBadge}</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">• {t.hero.statusBadgeSuffix}</span>
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.1 }}
            className="text-fluid-h1 font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white leading-[1.08]"
          >
            {t.hero.headlinePrefix} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400">
              {t.hero.headlineHighlight}
            </span>
          </motion.h1>

          {/* Subtitle / Positioning */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto mb-8"
          >
            {t.hero.introLead} <strong className="text-slate-900 dark:text-white font-semibold">Anderson Cataldo</strong>{t.hero.introMiddle}{' '}
            <strong className="text-slate-900 dark:text-white font-semibold">{t.hero.introHours}</strong>.
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
              {t.hero.ctaProjects} <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={currentResume}
              target="_blank"
              rel="noopener noreferrer"
              download={`curriculo-anderson-cataldo-${language}.pdf`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3.5 text-sm font-bold text-slate-800 dark:text-white hover:border-indigo-500 shadow-sm transition-all hover:-translate-y-0.5 min-h-[48px]"
            >
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> {t.hero.ctaResume}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-4 py-3.5 text-sm font-bold text-emerald-700 dark:text-emerald-400 transition-all hover:-translate-y-0.5 min-h-[48px]"
              aria-label={t.hero.whatsappAria}
            >
              <MessageCircle className="w-4 h-4" /> {t.hero.ctaWhatsapp}
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
                key={metric.label.pt}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-md backdrop-blur-md flex flex-col justify-between transition-all hover:border-indigo-500/40 hover:-translate-y-0.5"
              >
                <div>
                  {metric.trend && (
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                      {metric.trend[language]}
                    </span>
                  )}
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 mb-1 tracking-tight">
                    {metric.value}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                    {metric.label[language]}
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  {metric.description[language]}
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
