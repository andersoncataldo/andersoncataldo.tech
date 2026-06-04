import { motion } from 'framer-motion';
import andersonImg from '../assets/anderson cataldo.jpeg';
import { MapPin, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <section id="sobre" className="py-fluid-section bg-white" aria-labelledby="about-title">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="aspect-4/5 rounded-[40px] overflow-hidden bg-apple-bg border border-black/5 shadow-2xl">
              <img 
                src={andersonImg} 
                alt="Anderson Cataldo" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 apple-card p-6 bg-white/80 backdrop-blur-md">
              <p className="text-3xl font-bold text-apple-text">5º</p>
              <p className="text-[10px] font-bold text-apple-secondary uppercase tracking-widest">Semestre C.C</p>
            </div>
          </motion.div>

          <article className="order-1 lg:order-2">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-apple-blue font-semibold text-lg mb-2"
            >
              Sobre
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              id="about-title" 
              className="text-fluid-h2 font-bold tracking-tight text-apple-text mb-8 leading-tight"
            >
              Transformando código em <br />
              <span className="text-apple-secondary">experiências de impacto.</span>
            </motion.h2>
            
            <div className="space-y-6 text-apple-text text-fluid-body leading-relaxed font-medium mb-12">
              <p>
                Como acadêmico de Ciência da Computação na Unifor, minha jornada é movida pela interseção entre <span className="text-apple-blue">design funcional</span> e <span className="text-apple-blue">engenharia robusta</span>.
              </p>
              <p>
                Especializado no ecossistema TypeScript e automações inteligentes, foco em entregar soluções que não apenas resolvem problemas, mas que elevam o padrão de eficiência operacional e experiência do usuário.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              <div className="p-6 bg-apple-bg rounded-3xl border border-black/5">
                <div className="flex items-center gap-4 mb-2">
                  <GraduationCap className="w-5 h-5 text-apple-blue" />
                  <p className="font-bold text-apple-text">Formação Acadêmica</p>
                </div>
                <p className="text-sm text-apple-secondary font-medium leading-relaxed">Bacharelado em Ciência da Computação (Unifor) - 5º Semestre.</p>
              </div>
              <div className="p-6 bg-apple-bg rounded-3xl border border-black/5">
                <div className="flex items-center gap-4 mb-2">
                  <MapPin className="w-5 h-5 text-apple-blue" />
                  <p className="font-bold text-apple-text">Localização</p>
                </div>
                <p className="text-sm text-apple-secondary font-medium leading-relaxed">Baseado em Fortaleza, Ceará. Aberto a projetos globais.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
