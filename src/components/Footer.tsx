const Footer = () => {
  return (
    <footer className="py-12 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Anderson Cataldo
            </span>
            <p className="text-sm text-zinc-500">© {new Date().getFullYear()} - Todos os direitos reservados.</p>
          </div>

          <div className="flex gap-8">
            <a href="#sobre" className="text-sm text-zinc-500 hover:text-white transition-colors">Sobre</a>
            <a href="#projetos" className="text-sm text-zinc-500 hover:text-white transition-colors">Projetos</a>
            <a href="#contato" className="text-sm text-zinc-500 hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
