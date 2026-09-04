import { motion, useReducedMotion } from 'framer-motion';
import andersonImg from '../assets/anderson-cataldo.webp';
import { GraduationCap, MapPin, Globe, Code2, Cpu, Users2 } from 'lucide-react';
import { LOCATION } from '../config/links';

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      icon: <Code2 className="w-5 h-5 text-indigo-500" />,
      title: 'Engenharia & Código Limpo',
      description: 'Foco em TypeScript estrito, componentização desacoplada e código legível que qualquer time consegue manter com facilidade.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-cyan-500" />,
      title: 'Foco em Eficiência & Automação',
      description: 'Identificação rápida de gargalos operacionais e desenvolvimento de rotinas RPA/scripts para eliminar trabalho repetitivo.'
    },
    {
      icon: <Users2 className="w-5 h-5 text-emerald-500" />,
      title: 'Comunicação & Mentalidade Ágil',
      description: 'Vivência prática em sprints Kanban/Scrum, alinhamento constante com usuários internos e documentação técnica de fácil leitura.'
    }
  ];

  return (
    <section id="sobre" className="py-fluid-section bg-apple-bg scroll-mt-20" aria-labelledby="about-title">
      <div className="section-container">
        <div className="grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">
          {/* Photo & Profile Card */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 aspect-4/5 max-w-sm mx-auto">
              <img
                src={andersonImg}
                alt="Anderson Cataldo - Desenvolvedor Full-Stack"
                className="w-full h-full object-cover"
                loading="lazy"
                width={400}
                height={500}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-bold text-lg">Anderson Cataldo</p>
                <p className="text-xs text-indigo-300 font-mono">Full-Stack Dev & RPA Specialist</p>
              </div>
            </div>

            {/* Float Card */}
            <div className="mt-4 p-4 rounded-2xl apple-card border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Graduação</p>
                <p className="text-sm font-bold text-apple-text">Ciência da Computação</p>
                <p className="text-xs text-apple-secondary">Unifor • 6º Semestre</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Ativo
              </span>
            </div>
          </motion.div>

          {/* Narrative & Pillars */}
          <article>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <span className="text-xs uppercase font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400">
                Trajetória & Filosofia
              </span>
              <h2
                id="about-title"
                className="text-fluid-h2 font-extrabold tracking-tight text-apple-text leading-tight"
              >
                Engenharia de software que resolve problemas reais de negócios.
              </h2>
            </motion.div>

            <div className="mt-6 space-y-4 text-apple-secondary text-base sm:text-lg leading-relaxed font-normal">
              <p>
                Como estudante de <strong className="text-apple-text font-semibold">Ciência da Computação na Unifor (6º semestre)</strong>, combino fundamentos sólidos de computação — como estruturas de dados, algoritmos e bancos de dados relacionais — com experiência direta no desenvolvimento de soluções em produção.
              </p>
              <p>
                Minha vivência prática inclui o desenvolvimento de <strong className="text-apple-text font-semibold">sistemas web corporativos com Next.js, React e Supabase</strong> na Distribuidora Mais Saúde e a criação de <strong className="text-apple-text font-semibold">robôs de automação (RPA) em Python</strong> no Grupo 3Corações, que processam mais de 15.000 XMLs fiscais mensalmente e reduziram mais de 200 horas de trabalho manual.
              </p>
              <p>
                Busco oportunidades como <strong className="text-apple-text font-semibold">Desenvolvedor Júnior ou Estagiário Full-Stack / Front-End</strong>, trazendo proatividade, curva rápida de aprendizado, comprometimento com prazos e capacidade de agregar valor técnico desde o primeiro dia.
              </p>
            </div>

            {/* 3 Pillars */}
            <div className="mt-8 space-y-3">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-4 rounded-2xl apple-card border border-slate-200 dark:border-slate-800 flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-apple-text text-sm sm:text-base">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-apple-secondary mt-0.5 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Academic & Geographic Specs */}
            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Formação</span>
                </div>
                <p className="text-xs font-semibold text-apple-text">B.Sc. Ciência da Computação</p>
                <p className="text-[11px] text-apple-secondary">Unifor (2024 - 2027)</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Localização</span>
                </div>
                <p className="text-xs font-semibold text-apple-text">{LOCATION}</p>
                <p className="text-[11px] text-apple-secondary">Disponível para viagens</p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Idiomas</span>
                </div>
                <p className="text-xs font-semibold text-apple-text">Português (Nativo)</p>
                <p className="text-[11px] text-apple-secondary">Inglês (Intermediário Técnico)</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
