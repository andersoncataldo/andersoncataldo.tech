import { Linkedin, FileText, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';
import resumeFile from '../assets/Anderson_Viana_Curriculo_PT-BR.pdf';
import { motion, useReducedMotion } from 'framer-motion';
import CopyEmail from './CopyEmail';
import { EMAIL, LINKEDIN_URL, WHATSAPP_URL, LOCATION, AVAILABILITY } from '../config/links';

const Contact = () => {
  const shouldReduceMotion = useReducedMotion();

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
              Contato Profissional & Oportunidades
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              id="contact-title"
              className="text-fluid-h2 font-extrabold tracking-tight text-apple-text mb-6 leading-tight"
            >
              Vamos conversar sobre oportunidades e desafios de engenharia?
            </motion.h2>

            <p className="text-apple-secondary text-base sm:text-lg mb-8 leading-relaxed">
              Estou aberto a oportunidades profissionais como <strong className="text-apple-text font-semibold">Desenvolvedor Júnior ou Estagiário Full-Stack / Front-End</strong>. Tenho facilidade para me adaptar a novas tecnologias, comprometimento com entregas de qualidade e motivação contínua para crescer com o time.
            </p>

            {/* Recruiter Availability Box */}
            <div className="p-6 rounded-2xl apple-card border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50/50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900 mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Status Atual de Contratação
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-apple-text mb-2">{AVAILABILITY}</h3>
              <p className="text-xs sm:text-sm text-apple-secondary leading-relaxed">
                Disponível para atuação em modelo remoto (qualquer região do Brasil) ou híbrido/presencial em Fortaleza e região metropolitana.
              </p>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-2 text-xs text-apple-secondary">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>{LOCATION}</span>
              </div>
            </div>

            {/* What you can expect */}
            <div className="space-y-2.5">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-apple-secondary mb-3">
                O que você pode esperar de mim no time:
              </p>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-apple-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Curva de aprendizado rápida em novas stacks e ferramentas</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-apple-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Mentalidade analítica voltada a poupar tempo e simplificar processos</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-apple-text">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Comunicação transparente, código documentado e boa convivência em equipe</span>
              </div>
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
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Mensagem Direta</p>
                  <p className="text-base sm:text-lg font-bold text-apple-text mt-0.5">Conversar no WhatsApp</p>
                  <p className="text-xs text-apple-secondary">Resposta rápida para recrutadores e gestores</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hidden sm:inline group-hover:translate-x-1 transition-transform">
                Enviar Mensagem ➔
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
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-apple-secondary">Rede Profissional</p>
                  <p className="text-base sm:text-lg font-bold text-apple-text mt-0.5">linkedin.com/in/andersonnviana</p>
                  <p className="text-xs text-apple-secondary">Conecte-se comigo e acompanhe minhas publicações</p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hidden sm:inline group-hover:translate-x-1 transition-transform">
                Ver Perfil ➔
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
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-200">Documento Oficial</span>
                  <h4 className="text-lg sm:text-xl font-bold text-white mt-0.5">Currículo Técnico Completo</h4>
                  <p className="text-xs sm:text-sm text-indigo-100 mt-1 leading-relaxed">
                    Baixe o PDF com o histórico detalhado, formação acadêmica e stack técnica completa.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-indigo-200">
                  PDF Atualizado • Julho/2026
                </span>
                <a
                  href={resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="curriculo-anderson-cataldo.pdf"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 min-h-[42px]"
                >
                  <FileText className="w-4 h-4" /> Baixar Currículo PDF
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
