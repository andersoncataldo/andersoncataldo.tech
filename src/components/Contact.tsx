import { Linkedin, FileText, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import CopyEmail from './CopyEmail';
import { EMAIL, LINKEDIN_URL, WHATSAPP_URL, LOCATION } from '../config/links';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();
  const { t, resumePt, resumeEn } = useLanguage();

  return (
    <section id="contato" className="py-fluid-section bg-apple-bg scroll-mt-20" aria-labelledby="contact-title">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Left Column: Heading & Availability */}
          <div>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2"
            >
              {t.contact.eyebrow}
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              id="contact-title"
              className="text-fluid-h2 font-extrabold tracking-tight text-apple-text mb-6 leading-tight"
            >
              {t.contact.title}
            </motion.h2>

            <p
              className="text-apple-secondary text-base sm:text-lg mb-8 leading-relaxed [&_strong]:text-apple-text [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: t.contact.intro }}
            />

            {/* Professional Status Box */}
            <div className="p-6 rounded-2xl apple-card border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {t.contact.statusLabel}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-apple-text mb-2">{t.common.availabilityStatus}</h3>
              <p className="text-xs sm:text-sm text-apple-secondary leading-relaxed">
                {t.contact.availabilityNote}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-xs text-apple-secondary">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{LOCATION}</span>
              </div>
            </div>

            {/* What you can expect */}
            <div className="space-y-2.5">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-apple-secondary mb-3">
                {t.contact.expectTitle}
              </p>
              {t.contact.expectItems.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-apple-text">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Contact Cards */}
          <div className="grid gap-4 w-full">
            {/* Copy Email Card */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <CopyEmail email={EMAIL} />
            </motion.div>

            {/* WhatsApp Direct Card */}
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              className="apple-card p-6 border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-500/50 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{t.contact.whatsappLabel}</p>
                  <p className="text-base sm:text-lg font-bold text-apple-text mt-0.5">{t.contact.whatsappTitle}</p>
                  <p className="text-xs text-apple-secondary">{t.contact.whatsappNote}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hidden sm:inline group-hover:translate-x-1 transition-transform">
                {t.contact.whatsappCta}
              </span>
            </motion.a>

            {/* LinkedIn Profile Card */}
            <motion.a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
              className="apple-card p-6 border border-slate-200 dark:border-slate-800 flex items-center justify-between group transition"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 group-hover:scale-105 transition-transform shrink-0">
                  <Linkedin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-apple-secondary">{t.contact.linkedinLabel}</p>
                  <p className="text-base sm:text-lg font-bold text-apple-text mt-0.5">linkedin.com/in/andersonnviana</p>
                  <p className="text-xs text-apple-secondary">{t.contact.linkedinNote}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hidden sm:inline group-hover:translate-x-1 transition-transform">
                {t.contact.linkedinCta}
              </span>
            </motion.a>

            {/* Resume Technical Download Box */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              className="apple-card p-6 sm:p-7 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-600/20 border-none"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-200">{t.contact.resumeDocLabel}</span>
                  <h4 className="text-lg sm:text-xl font-bold text-white mt-0.5">{t.contact.resumeTitle}</h4>
                  <p className="text-xs sm:text-sm text-indigo-100 mt-1 leading-relaxed">
                    {t.contact.resumeNote}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-200">
                  {t.contact.resumeUpdated}
                </span>
                <div className="flex gap-2">
                  <a
                    href={resumePt}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="curriculo-anderson-cataldo-pt.pdf"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[42px]"
                  >
                    <FileText className="w-4 h-4" /> {t.contact.resumeDownloadPt}
                  </a>
                  <a
                    href={resumeEn}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="anderson-cataldo-resume-en.pdf"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 text-white border border-white/40 hover:bg-white/25 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[42px]"
                  >
                    <FileText className="w-4 h-4" /> {t.contact.resumeDownloadEn}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
