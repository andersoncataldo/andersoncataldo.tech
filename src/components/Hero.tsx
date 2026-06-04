import { motion } from 'framer-motion';
import { ArrowRight, Linkedin } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20" aria-label="Introdução">
      <div className="section-container relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex justify-center flex-wrap gap-3"
          >
            <span className="px-4 py-1.5 rounded-full bg-apple-bg border border-black/5 text-apple-secondary text-xs font-bold tracking-widest uppercase">
              Full-Stack Developer
            </span>
            <span className="px-4 py-1.5 rounded-full bg-apple-bg border border-black/5 text-apple-secondary text-xs font-bold tracking-widest uppercase">
              RPA Specialist
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-fluid-h1 font-bold tracking-tight mb-10 text-apple-text leading-[0.9]"
          >
            Engineering <br />
            <span className="text-apple-blue">Efficiency.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-14"
          >
            <p className="text-xl md:text-2xl text-apple-secondary leading-relaxed font-medium">
              Olá, sou <span className="text-apple-text">Anderson Cataldo</span>. <br />
              Desenvolvedor focado em transformar complexidade em performance através de soluções Full-Stack e automações inteligentes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#projetos"
              className="w-full sm:w-auto bg-apple-text text-white px-10 py-5 rounded-full font-bold text-xl transition-all hover:bg-zinc-800 active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center gap-2 group min-h-12"
            >
              Ver Projetos
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="https://linkedin.com/in/andersonnviana"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-apple-bg text-apple-text px-10 py-5 rounded-full font-bold text-xl border border-black/5 transition-all hover:bg-white active:scale-95 shadow-sm min-h-12"
              aria-label="Ver perfil no LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-apple-blue" />
              Conectar
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(0,102,204,0.05),transparent_50%)]" />
    </section>
  );
};

export default Hero;
