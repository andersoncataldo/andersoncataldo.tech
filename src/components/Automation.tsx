import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Cpu, FileText } from 'lucide-react';

const Automation = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="rpa" className="py-fluid-section bg-apple-bg scroll-mt-24 lg:scroll-mt-28" aria-labelledby="automation-title">
      <div className="section-container">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
              className="text-apple-accent font-semibold text-lg mb-2"
            >
              Automação
            </motion.p>
            <motion.h2
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1, duration: 0.45 }}
              id="automation-title"
              className="text-fluid-h2 font-bold tracking-tight text-apple-text leading-tight mb-8"
            >
              Automação de processos repetitivos para resultados rápidos.
            </motion.h2>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2, duration: 0.45 }}
              className="text-apple-secondary text-lg leading-relaxed font-medium max-w-2xl"
            >
              Atuação focada em automatizar processos que reduzem tarefas manuais, aumentam a confiabilidade de rotinas operacionais e aceleram a entrega de resultados.
            </motion.p>
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3, duration: 0.45 }}
            className="grid gap-6"
          >
            <article className="apple-card p-8 border border-apple">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-apple-bg p-3 rounded-2xl shadow-sm">
                  <Zap className="w-6 h-6 text-apple-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-1">O que entrego</p>
                  <h3 className="text-xl font-bold text-apple-text">Redução de tarefas operacionais</h3>
                </div>
              </div>
              <p className="text-apple-secondary leading-relaxed font-medium">
                Automação de rotinas fiscais, extração de dados e preenchimento automático de planilhas para eliminar retrabalho e acelerar entregas.
              </p>
            </article>

            <article className="apple-card p-8 border border-apple">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-apple-bg p-3 rounded-2xl shadow-sm">
                  <Cpu className="w-6 h-6 text-apple-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-1">Como trabalho</p>
                  <h3 className="text-xl font-bold text-apple-text">Integração confiável entre sistemas</h3>
                </div>
              </div>
              <p className="text-apple-secondary leading-relaxed font-medium">
                Estruturo automações que conectam sistemas distintos, reduzindo falhas humanas e mantendo o controle do fluxo de informação.
              </p>
            </article>

            <article className="apple-card p-8 border border-apple bg-apple-accent text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-apple-bg/10 p-3 rounded-2xl">
                  <FileText className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="uppercase text-[10px] tracking-widest text-white/70 mb-1">Resultados</p>
                  <h3 className="text-xl font-bold">Estabilidade operacional</h3>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed font-medium">
                Entregas focadas em reduzir retrabalho e garantir rotinas confiáveis em operações que dependem de dados e integração entre sistemas.
              </p>
            </article>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Automation;
