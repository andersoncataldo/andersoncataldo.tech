import { Linkedin, FileText } from 'lucide-react';
import resumeFile from '../assets/Curriculo Anderson PT-BR.pdf';
import { motion } from 'framer-motion';
import CopyEmail from './CopyEmail';

const Contact = () => {
  return (
    <section id="contato" className="py-fluid-section bg-white" aria-labelledby="contact-title">
      <div className="section-container">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-apple-blue font-semibold text-lg mb-2"
            >
              Contato
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              id="contact-title"
              className="text-fluid-h2 font-bold tracking-tight text-apple-text mb-8 leading-tight"
            >
              Contato profissional para oportunidades e crescimento técnico.
            </motion.h2>
            <p className="text-apple-secondary text-xl mb-12 leading-relaxed font-medium max-w-xl">
              Prefiro conversas diretas sobre oportunidades, demandas de desenvolvimento e automações que tragam impacto ao time.
            </p>
          </div>

          <div className="grid gap-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="apple-card p-6 md:p-8"
            >
              <CopyEmail email="andersonvcataldo@gmail.com" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="apple-card p-6 md:p-8 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="bg-apple-bg p-4 rounded-2xl shrink-0">
                  <Linkedin className="w-6 h-6 text-apple-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold text-apple-secondary uppercase tracking-widest mb-1">Perfil</p>
                  <p className="text-lg md:text-xl font-bold text-apple-text">linkedin.com/in/andersonnviana</p>
                </div>
              </div>
              <a
                href="https://linkedin.com/in/andersonnviana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-apple-blue hover:underline font-bold"
              >
                Ver perfil no LinkedIn
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="apple-card p-6 md:p-8 bg-apple-text border-none"
            >
              <div className="flex items-start gap-4 md:gap-6 mb-8">
                <div className="bg-white/10 p-4 rounded-2xl shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Currículo Técnico</h4>
                  <p className="text-white/70 font-medium text-sm md:text-base">Baixe o PDF com meu histórico profissional e stack em detalhes.</p>
                </div>
              </div>
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-apple-text py-4 rounded-xl font-bold text-center block transition-all hover:bg-white/90 active:scale-95 min-h-12"
              >
                Baixar CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
