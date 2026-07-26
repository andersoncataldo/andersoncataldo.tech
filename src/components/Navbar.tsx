import { useState, useEffect, useCallback, type MouseEvent } from 'react';
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

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Início', href: '#', onClick: scrollToTop },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Experiência', href: '#experiencia' },
    { name: 'RPA', href: '#rpa' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-apple-bg/90 backdrop-blur-md border-b border-apple py-3' : 'bg-transparent py-5'
      }`}
      aria-label="Navegação principal"
    >
      <div className="section-container">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a
            href="#"
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
            aria-label="Anderson Cataldo - Voltar ao início"
          >
            <div className="bg-apple-text p-2 rounded-xl group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/10">
              <Terminal className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-apple-text">
              Anderson Cataldo
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                    <a
                    href={link.href}
                    onClick={link.onClick}
                    className="text-sm font-bold text-apple-secondary hover:text-apple-text transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="#contato"
                className="bg-apple-text text-white px-5 py-3 rounded-full font-semibold text-sm uppercase tracking-[0.08em] hover:opacity-95 transition-all"
              >
                Fale comigo
              </a>
              <a
                href="https://github.com/andersoncataldo"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-apple-text text-white p-2.5 rounded-full hover:opacity-90 transition-all active:scale-95 flex items-center justify-center"
                aria-label="Ver perfil no GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-apple-text p-2"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden bg-apple-bg border-b border-apple transition-all duration-300 absolute w-full top-full left-0 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <ul className="px-6 space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={link.onClick ? link.onClick : () => setMobileMenuOpen(false)}
                className="block text-lg font-bold text-apple-text hover:text-apple-accent"
                aria-label={`Ir para ${link.name}`}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-bold text-white bg-apple-text px-5 py-3 rounded-full text-center"
              aria-label="Ir para contato"
            >
              Fale comigo
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
