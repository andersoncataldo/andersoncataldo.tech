import { motion, useReducedMotion } from 'framer-motion';
import PipelineVisualizer from './PipelineVisualizer';

const Automation = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="rpa" className="py-fluid-section bg-apple-bg scroll-mt-20" aria-labelledby="automation-title">
      <div className="section-container">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 mb-2"
          >
            Engenharia de Automação & RPA
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            id="automation-title"
            className="text-fluid-h2 font-extrabold tracking-tight text-apple-text leading-tight"
          >
            Automação de Processos & Dados em Larga Escala
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            className="text-apple-secondary text-base sm:text-lg mt-3 leading-relaxed"
          >
            Construção de robôs e pipelines em Python para extração, validação contra schemas SEFAZ, tratamento de dados (Pandas) e integração com sistemas legados — com mais de <strong className="text-apple-text font-semibold">15.000 documentos processados por mês</strong>.
          </motion.p>
        </div>

        {/* Interactive Pipeline Visualizer Component */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
        >
          <PipelineVisualizer />
        </motion.div>
      </div>
    </section>
  );
};

export default Automation;
