import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 pt-20" aria-label="Introdução">
      <div className="section-container relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex flex-wrap justify-center gap-3"
          >
            <span className="px-4 py-1.5 rounded-full bg-apple-bg border border-black/5 text-apple-secondary text-xs font-bold tracking-widest uppercase">
              Desenvolvedor Full-Stack
            </span>
            <span className="px-4 py-1.5 rounded-full bg-apple-bg border border-black/5 text-apple-secondary text-xs font-bold tracking-widest uppercase">
              Automação de Processos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-fluid-h1 font-bold tracking-tight mb-10 text-apple-text leading-[0.9]"
          >
            Full-stack em formação com <br />
            <span className="text-apple-blue">impacto real em React e RPA.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-14"
          >
            <p className="text-xl md:text-2xl text-apple-secondary leading-relaxed font-medium">
              Sou Anderson Cataldo. Crio produtos digitais e automações que reduzem trabalho manual, aceleram entregas e deixam equipes livres para focar no que importa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            <div className="apple-card p-6 text-left">
              <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-3">Formação</p>
              <p className="text-lg font-bold text-apple-text">6º semestre em Ciência da Computação</p>
            </div>
            <div className="apple-card p-6 text-left">
              <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-3">Experiência</p>
              <p className="text-lg font-bold text-apple-text">Apps internos e automações corporativas</p>
            </div>
            <div className="apple-card p-6 text-left">
              <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-3">Diferencial</p>
              <p className="text-lg font-bold text-apple-text">React/TypeScript + RPA</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto"
          >
            {['6º semestre', '2 experiências profissionais', 'Automações RPA'].map((label) => (
              <div key={label} className="px-5 py-4 bg-apple-bg rounded-full border border-black/5 text-sm font-semibold text-apple-text">
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(0,102,204,0.06),transparent_50%)]" />
    </section>
  );
};

export default Hero;
