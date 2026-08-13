import { motion, useReducedMotion } from 'framer-motion';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="inicio" className="relative min-h-[94vh] flex items-center justify-center overflow-hidden bg-apple-bg dark:bg-slate-950 scroll-mt-24 lg:scroll-mt-28" aria-label="Introdução">
      <div className="section-container relative z-10">
        <div className="text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex flex-wrap justify-center gap-3"
          >
            <span className="px-4 py-1.5 rounded-full bg-apple-bg border border-apple text-apple-secondary text-xs font-bold tracking-widest uppercase">
              Desenvolvedor Full-Stack
            </span>
            <span className="px-4 py-1.5 rounded-full bg-apple-bg border border-apple text-apple-secondary text-xs font-bold tracking-widest uppercase">
              Automação de Processos
            </span>
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-fluid-h1 font-bold tracking-tight mb-10 text-apple-text leading-[0.9]"
          >
            Full-Stack Developer com <br />
            <span className="text-apple-accent">impacto real em React e RPA.</span>
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-14"
          >
            <p className="text-xl md:text-2xl text-apple-secondary leading-relaxed font-medium">
              Sou Anderson Cataldo. Crio produtos digitais e automações que reduzem trabalho manual, aceleram entregas e deixam equipes livres para focar no que importa.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            <div className="apple-card p-6 text-left">
              <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-3">+ horas</p>
              <p className="text-3xl font-black text-apple-text mb-2">200+</p>
              <p className="text-lg font-bold text-apple-text">horas automatizadas</p>
            </div>
            <div className="apple-card p-6 text-left">
              <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-3">Produção</p>
              <p className="text-3xl font-black text-apple-text mb-2">3</p>
              <p className="text-lg font-bold text-apple-text">sistemas em produção</p>
            </div>
            <div className="apple-card p-6 text-left">
              <p className="text-apple-secondary uppercase text-[10px] tracking-widest mb-3">Empresas</p>
              <p className="text-3xl font-black text-apple-text mb-2">2</p>
              <p className="text-lg font-bold text-apple-text">organizações atendidas</p>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
          >
            <a
              href="#projetos"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-apple-accent px-6 py-3 text-base font-bold text-white shadow-lg shadow-apple-accent/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Ver Projetos
            </a>
            <a
              href="#contato"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-apple bg-apple-bg px-6 py-3 text-base font-bold text-apple-text transition hover:-translate-y-0.5 hover:border-apple-accent"
            >
              Entrar em Contato
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(0,102,204,0.06),transparent_50%)]" />
    </section>
  );
};

export default Hero;
