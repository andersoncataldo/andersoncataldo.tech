import { motion, useReducedMotion } from 'framer-motion';
import andersonImg from '../assets/anderson-cataldo.jpeg';
import { MapPin, GraduationCap } from 'lucide-react';

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="sobre" className="py-fluid-section bg-apple-bg dark:bg-slate-950 scroll-mt-24 lg:scroll-mt-28" aria-labelledby="about-title">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-4/5 rounded-[40px] overflow-hidden bg-apple-bg border-apple shadow-2xl">
              <img
                src={andersonImg}
                alt="Anderson Cataldo"
                className="w-full h-full object-cover"
                loading="lazy"
                width={400}
                height={500}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 apple-card p-6 bg-apple-bg/80 backdrop-blur-md">
              <p className="text-3xl font-bold text-apple-text">6º</p>
              <p className="text-[10px] font-bold text-apple-secondary uppercase tracking-widest">Semestre C.C</p>
            </div>
          </motion.div>

          <article className="order-1 lg:order-2">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-apple-accent font-semibold text-lg mb-2"
            >
              Sobre
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              id="about-title"
              className="text-fluid-h2 font-bold tracking-tight text-apple-text mb-8 leading-tight"
            >
              Tecnologia que reduz trabalho manual <br />
              e acelera resultados.
            </motion.h2>

            <div className="space-y-6 text-apple-text text-fluid-body leading-relaxed font-medium mb-12">
              <p>
                Sou estudante de Ciência da Computação na Unifor com experiência prática em projetos internos e automações de alto impacto. Minha prioridade é entregar soluções que deixam equipes mais produtivas e processos mais confiáveis.
              </p>
              <p>
                Trabalho com React, TypeScript e automações em Python para criar sistemas e rotinas que liberam tempo operacional, melhoram a experiência do usuário e suportam decisões mais rápidas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="p-6 bg-apple-bg rounded-3xl border border-apple">
                <div className="flex items-center gap-4 mb-2">
                  <GraduationCap className="w-5 h-5 text-apple-accent" />
                  <p className="font-bold text-apple-text">Formação</p>
                </div>
                <p className="text-sm text-apple-secondary font-medium leading-relaxed">Bacharelado em Ciência da Computação (Unifor) - 6º semestre.</p>
              </div>
              <div className="p-6 bg-apple-bg rounded-3xl border border-apple">
                <div className="flex items-center gap-4 mb-2">
                  <MapPin className="w-5 h-5 text-apple-accent" />
                  <p className="font-bold text-apple-text">Localização</p>
                </div>
                <p className="text-sm text-apple-secondary font-medium leading-relaxed">Fortaleza, Ceará — disponível para oportunidades em desenvolvimento e automação.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
