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
              Dois caminhos claros: vaga ou projeto.
            </motion.h2>
            <p className="text-apple-secondary text-xl mb-12 leading-relaxed font-medium max-w-xl">
              Estou à disposição para oportunidades de carreira e parcerias em automação. Escolha o canal que faz mais sentido para sua demanda e receba uma resposta rápida.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="mailto:andersonvcataldo@gmail.com?subject=Oportunidade de vaga"
                className="apple-card p-6 border border-black/5 hover:shadow-lg transition-all"
                aria-label="Contato por e-mail para vaga"
              >
                <p className="text-xs uppercase tracking-widest text-apple-secondary mb-2">Recrutadores</p>
                <h3 className="text-xl font-bold text-apple-text mb-3">Vaga CLT/estágio/júnior</h3>
                <p className="text-apple-secondary leading-relaxed font-medium">
                  Receba meu currículo técnico e roadmap de carreira para vagas de front-end, back-end e energia em projetos corporativos.
                </p>
              </a>
              <a
                href="https://wa.me/5585992258794?text=Olá,%20Anderson.%20Tenho%20interesse%20em%20uma%20automação%20ou%20projeto%20digital."
                target="_blank"
                rel="noopener noreferrer"
                className="apple-card p-6 border border-black/5 hover:shadow-lg transition-all"
                aria-label="Contato por WhatsApp para projeto ou automação"
              >
                <p className="text-xs uppercase tracking-widest text-apple-secondary mb-2">Clientes</p>
                <h3 className="text-xl font-bold text-apple-text mb-3">Projeto ou automação</h3>
                <p className="text-apple-secondary leading-relaxed font-medium">
                  Converse sobre um projeto, rotina a ser automatizada ou solução que reduza horas de trabalho manual no seu negócio.
                </p>
              </a>
            </div>
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
