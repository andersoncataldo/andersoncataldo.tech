import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import andersonImg from './assets/anderson cataldo.jpeg';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-primary-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <section id="sobre" className="py-24 bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden bg-zinc-800 border-2 border-zinc-800/50 relative shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <img 
                    src={andersonImg} 
                    alt="Anderson Cataldo" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              <div>
                <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block">Sobre Mim</span>
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase leading-none italic">
                  Criando o <span className="text-zinc-500 group-hover:text-white transition-colors underline decoration-primary-500 underline-offset-8">futuro</span> através do código.
                </h2>
                <div className="space-y-6 text-zinc-400 text-lg leading-relaxed max-w-xl mb-12">
                  <p>
                    Sou estudante de Ciência da Computação na Unifor, apaixonado por identificar gargalos operacionais e criar soluções tecnológicas que otimizam o tempo e a eficiência.
                  </p>
                  <p>
                    Minha jornada tem sido marcada por projetos desafiadores, desde a criação de sistemas de automação que reduzem horas de trabalho manual a minutos, até o desenvolvimento de interfaces modernas e intuitivas que encantam os usuários.
                  </p>
                </div>

                <div className="grid gap-6 border-t border-zinc-800 pt-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-tight">Ciência da Computação</p>
                      <p className="text-zinc-500 text-sm">Universidade de Fortaleza (UNIFOR)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-tight">Fortaleza-CE, Brasil</p>
                      <p className="text-zinc-500 text-sm">Disponível para trabalho remoto ou híbrido</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800 text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6 6-6"/><path d="m5 14 6 6 6-6"/></svg>
                    </div>
                    <div>
                      <p className="text-white font-bold tracking-tight">Português (Nativo) • Inglês (Intermediário)</p>
                      <p className="text-zinc-500 text-sm">Espanhol (Básico)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
