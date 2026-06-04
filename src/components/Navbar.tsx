import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Terminal, Github } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Início', href: '#', onClick: scrollToTop },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Experiência', href: '#experiencia' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-3' : 'bg-transparent py-5'
      }`}
      aria-label="Navegação principal"
    >
      <div className="section-container">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Anderson Cataldo - Voltar ao início"
          >
            <div className="bg-[#1d1d1f] p-2 rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/10">
              <Terminal className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#1d1d1f]">
              Anderson Cataldo
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={link.onClick}
                    className="text-sm font-bold text-[#86868b] hover:text-[#1d1d1f] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="https://github.com/andersoncataldo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1d1d1f] text-white p-2.5 rounded-full hover:bg-[#2d2d2f] transition-all active:scale-95 flex items-center justify-center"
              aria-label="Ver perfil no GitHub"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1d1d1f] p-2"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden bg-white border-b border-black/5 transition-all duration-300 absolute w-full top-full left-0 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <ul className="px-6 space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                key={link.name}
                href={link.href}
                onClick={link.onClick ? link.onClick : () => setMobileMenuOpen(false)}
                className="block text-lg font-bold text-[#1d1d1f] hover:text-[#0066cc]"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
