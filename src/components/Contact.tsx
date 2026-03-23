import { Linkedin, Github, FileText, ExternalLink, Download } from 'lucide-react';
import CopyEmail from './CopyEmail';
import resumeFile from '../assets/currículo Anderson Cataldo.pdf';

const Contact = () => {
  return (
    <section id="contato" className="py-24 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-none">
              Vamos <span className="text-primary-500">conectar</span> e construir o futuro juntos.
            </h2>
            <p className="text-zinc-400 text-xl mb-12 leading-relaxed">
              Interessado em otimizar processos ou em um novo projeto full-stack? 
              Abaixo estão os canais para falar comigo e meu currículo detalhado.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={resumeFile}
                download="Currículo_Anderson_Cataldo.pdf"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all hover:bg-zinc-200"
              >
                <Download className="w-5 h-5" />
                Baixar Currículo
              </a>
              <div className="flex items-center gap-2 px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
                 <a href="https://linkedin.com/in/andersonnviana" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <div className="w-px h-6 bg-zinc-800 mx-2" />
                <a href="https://github.com/andersoncataldo" target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <CopyEmail email="andersonvcataldo@gmail.com" />
            
            <a
              href="https://linkedin.com/in/andersonnviana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl hover:border-primary-500/50 transition-all group"
            >
              <div className="bg-primary-500/10 p-4 rounded-2xl text-primary-500 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Conectar Profissionalmente</p>
                <p className="text-lg font-medium">linkedin.com/in/andersonnviana</p>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-600" />
            </a>

            <div className="p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-all" />
              <div className="flex items-center gap-4 mb-4">
                <FileText className="w-6 h-6 text-primary-400" />
                <h4 className="font-bold">Currículo Técnico</h4>
              </div>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                Acesse o currículo em PDF com detalhes técnicos, stack completa e histórico profissional completo.
              </p>
              <a 
                href={resumeFile} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-bold text-white flex items-center gap-2 hover:underline"
              >
                Ver versão online <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
