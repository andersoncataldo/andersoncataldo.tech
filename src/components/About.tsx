import { motion, useReducedMotion } from 'framer-motion';
import andersonImg from '../assets/anderson-cataldo.webp';
import { GraduationCap, MapPin, Globe, Code2, Cpu, Users2 } from 'lucide-react';
import { LOCATION } from '../config/links';
import { useLanguage } from '../context/LanguageContext';

const pillarIcons = [
  <Code2 className="w-5 h-5 text-indigo-500" key="code" />,
  <Cpu className="w-5 h-5 text-cyan-500" key="cpu" />,
  <Users2 className="w-5 h-5 text-emerald-500" key="users" />,
];

const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section id="sobre" className="py-fluid-section bg-apple-bg scroll-mt-20" aria-labelledby="about-title">
      <div className="section-container">
        <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
          {/* Photo & Profile Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 aspect-4/5 max-w-sm mx-auto">
              <img
                src={andersonImg}
                alt="Anderson Cataldo - Full-Stack Developer"
                className="w-full h-full object-cover"
                loading="lazy"
                width={400}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-bold text-lg">{t.about.photoName}</p>
                <p className="text-xs text-indigo-300 font-mono">{t.about.photoRole}</p>
              </div>
            </div>

            {/* Float Card */}
            <div className="mt-4 p-4 rounded-2xl apple-card border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{t.about.degreeLabel}</p>
                <p className="text-sm font-bold text-apple-text">{t.about.degreeValue}</p>
                <p className="text-xs text-apple-secondary">{t.about.degreeSchool}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                {t.about.activeStatus}
              </span>
            </div>
          </motion.div>

          {/* Narrative & Pillars */}
          <article>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
                {t.about.eyebrow}
              </span>
              <h2
                id="about-title"
                className="text-fluid-h2 font-extrabold tracking-tight text-apple-text leading-tight"
              >
                {t.about.title}
              </h2>
            </motion.div>

            <div className="mt-6 space-y-4 text-apple-secondary text-base sm:text-lg leading-relaxed font-normal [&_strong]:text-apple-text [&_strong]:font-semibold">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            {/* 3 Pillars */}
            <div className="mt-8 space-y-3">
              {t.about.pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="p-4 rounded-2xl apple-card border border-slate-200 dark:border-slate-800 flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                    {pillarIcons[index]}
                  </div>
                  <div>
                    <h3 className="font-bold text-apple-text text-sm sm:text-base">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-apple-secondary mt-0.5 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic & Geographic Specs */}
            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t.about.specs.education}</span>
                </div>
                <p className="text-xs font-semibold text-apple-text">{t.about.specs.educationValue}</p>
                <p className="text-[11px] text-apple-secondary">{t.about.specs.educationRange}</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t.about.specs.location}</span>
                </div>
                <p className="text-xs font-semibold text-apple-text">{LOCATION}</p>
                <p className="text-[11px] text-apple-secondary">{t.about.specs.locationNote}</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t.about.specs.languages}</span>
                </div>
                <p className="text-xs font-semibold text-apple-text">{t.about.specs.languagePt}</p>
                <p className="text-[11px] text-apple-secondary">{t.about.specs.languageEn}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
