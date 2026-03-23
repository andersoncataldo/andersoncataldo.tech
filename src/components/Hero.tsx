import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download } from 'lucide-react';
import resumeFile from '../assets/currículo Anderson Cataldo.pdf';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-bold tracking-tight">
              <Sparkles className="w-4 h-4 text-primary-400" />
              Desenvolvedor Full-Stack & Especialista RPA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.85] uppercase italic"
          >
            Building <br />
            <span className="text-primary-500">Efficiency</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed"
          >
            Olá, eu sou <span className="text-white font-bold">Anderson Cataldo</span>. Especialista em transformar processos complexos em fluxos automatizados e interfaces elegantes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a
              href="#projetos"
              className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-[2rem] font-black uppercase italic tracking-tighter text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              Ver Projetos
              <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a
              href={resumeFile}
              download="Currículo_Anderson_Cataldo.pdf"
              className="inline-flex items-center gap-3 bg-zinc-900 border border-zinc-800 text-white px-10 py-5 rounded-[2rem] font-bold uppercase tracking-tight text-lg transition-all hover:bg-zinc-800 hover:border-zinc-700 active:scale-95 shadow-xl"
            >
              <Download className="w-5 h-5 text-primary-400" />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-zinc-600">Discover More</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary-500 to-transparent opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;
