import { Linkedin, Github, FileText, Mail } from 'lucide-react';
import resumeFile from '../assets/curriculo_andersoncataldo.pdf';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contato" className="py-fluid-section bg-white" aria-labelledby="contact-title">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
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
              Vamos iniciar <br />
              <span className="text-apple-secondary">algo novo juntos.</span>
            </motion.h2>
            <p className="text-apple-secondary text-xl mb-12 leading-relaxed font-medium max-w-md">
              Sempre interessado em novos desafios, parcerias e projetos inovadores. Entre em contato por qualquer um dos canais oficiais.
            </p>

            <div className="flex gap-4">
              <a 
                href="https://linkedin.com/in/andersonnviana" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-apple-bg rounded-2xl border border-black/5 text-apple-secondary hover:text-apple-blue transition-all min-h-12 min-w-12 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/andersoncataldo" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-4 bg-apple-bg rounded-2xl border border-black/5 text-apple-secondary hover:text-apple-text transition-all min-h-12 min-w-12 flex items-center justify-center"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="mailto:andersonvcataldo@gmail.com" 
                className="p-4 bg-apple-bg rounded-2xl border border-black/5 text-apple-secondary hover:text-apple-blue transition-all min-h-12 min-w-12 flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="grid gap-6 w-full">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="apple-card p-6 md:p-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-apple-bg p-4 rounded-2xl shrink-0">
                  <Mail className="w-6 h-6 text-apple-blue" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-apple-secondary uppercase tracking-widest mb-1">E-mail Profissional</p>
                  <p className="text-lg md:text-xl font-bold text-apple-text truncate">andersonvcataldo@gmail.com</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="apple-card p-6 md:p-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <div className="bg-apple-bg p-4 rounded-2xl shrink-0">
                  <Linkedin className="w-6 h-6 text-apple-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold text-apple-secondary uppercase tracking-widest mb-1">LinkedIn</p>
                  <p className="text-lg md:text-xl font-bold text-apple-text">/andersonnviana</p>
                </div>
              </div>
              <a 
                href="https://linkedin.com/in/andersonnviana" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-apple-blue hover:underline font-bold shrink-0 min-h-12 flex items-center"
              >
                Conectar
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
                  <p className="text-white/60 font-medium text-sm md:text-base">Versão completa em PDF com todos os detalhes de carreira e stack.</p>
                </div>
              </div>
              <a 
                href={resumeFile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-apple-text py-4 rounded-xl font-bold text-center block transition-all hover:bg-white/90 active:scale-95 min-h-12"
              >
                Download PDF
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
