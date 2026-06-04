const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-[#f5f5f7] border-t border-black/5">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[#86868b] text-sm font-medium">
            <p>© {currentYear} Anderson Cataldo. Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-8">
            <a href="https://linkedin.com/in/andersonnviana" target="_blank" rel="noopener noreferrer" className="text-[#86868b] hover:text-zinc-950 text-sm font-bold transition-colors">LinkedIn</a>
            <a href="https://github.com/andersoncataldo" target="_blank" rel="noopener noreferrer" className="text-[#86868b] hover:text-zinc-950 text-sm font-bold transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
