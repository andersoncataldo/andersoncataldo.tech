import { memo, useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  Home,
  User,
  Briefcase,
  Layout,
  Mail,
  Github,
  Linkedin,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  FileText,
  Zap,
} from 'lucide-react';
import andersonImg from '../assets/anderson-cataldo.webp';
import resumeFile from '../assets/Anderson_Viana_Curriculo_PT-BR.pdf';
import { GITHUB_URL, LINKEDIN_URL } from '../config/links';

interface SidebarProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const navLinks = [
  { name: 'Início', href: '#', icon: Home },
  { name: 'Sobre', href: '#sobre', icon: User },
  { name: 'Experiência', href: '#experiencia', icon: Briefcase },
  { name: 'Automação', href: '#rpa', icon: Zap },
  { name: 'Habilidades', href: '#habilidades', icon: Layout },
  { name: 'Projetos', href: '#projetos', icon: FileText },
  { name: 'Contato', href: '#contato', icon: Mail },
];

const externalLinks = [
  {
    name: 'GitHub',
    href: GITHUB_URL,
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: LINKEDIN_URL,
    icon: Linkedin,
  },
];

interface SidebarContentProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  activeSection: string;
  handleNavClick: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
  setMobileOpen: (value: boolean) => void;
  isMobile?: boolean;
}

// Declared outside of Sidebar so it isn't recreated (and remounted) on every render.
const SidebarContent = memo(
  ({
    collapsed,
    setCollapsed,
    theme,
    onThemeToggle,
    activeSection,
    handleNavClick,
    setMobileOpen,
    isMobile = false,
  }: SidebarContentProps) => (
    <>
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-3xl bg-white/10">
              <img src={andersonImg} alt="Anderson Cataldo" className="h-full w-full object-cover" />
            </div>
            <div className={`transition-opacity duration-200 ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <p className="text-sm font-semibold text-white">Anderson Cataldo</p>
              <p className="text-[11px] text-slate-400">Full-Stack | RPA</p>
            </div>
          </div>
          {isMobile ? (
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
              aria-label="Fechar menu móvel"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
              aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          )}
        </div>

        <nav className="px-2 py-5">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const targetId = link.href === '#' ? 'inicio' : link.href.slice(1);
              const isActive = activeSection === targetId;

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(event) => handleNavClick(link.href, event)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                      isActive ? 'bg-white/15 text-white' : 'text-slate-100 hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-apple-accent' : 'text-apple-secondary'}`} aria-hidden="true" />
                    <span className={`transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                      {link.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {collapsed ? (
            <div className="mt-10 flex items-center justify-center gap-3 px-2">
              {externalLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="rounded-2xl p-2 text-slate-100 transition hover:bg-white/10"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 px-4">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Links</p>
              <ul className="mt-4 space-y-2">
                {externalLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                        aria-label={link.name}
                      >
                        <Icon className="h-5 w-5 text-slate-200" aria-hidden="true" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </nav>
      </div>

      <div className="border-t border-white/10 px-5 py-5">
        {!collapsed && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 transition-opacity duration-200">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Tema</p>
            <p className="mt-2 text-sm text-slate-100">{theme === 'dark' ? 'Modo escuro' : 'Modo claro'}</p>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onThemeToggle}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/10 text-sm font-semibold text-white transition hover:bg-white/15"
            aria-label="Alternar entre modo claro e escuro"
            aria-pressed={theme === 'dark'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!collapsed && <span>Tema</span>}
          </button>
          {!collapsed && (
            <div className="flex flex-col items-center gap-1">
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                download="curriculo-anderson-cataldo.pdf"
                className="inline-flex h-11 items-center justify-center rounded-3xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15"
                aria-label="Baixar currículo profissional em PDF"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>CV</span>
              </a>
              <span className="text-[9px] uppercase tracking-[0.2em] text-slate-300">Atualizado em Jul/2026</span>
            </div>
          )}
        </div>
      </div>
    </>
  ),
);

SidebarContent.displayName = 'SidebarContent';

const Sidebar = ({ theme, onThemeToggle, collapsed, setCollapsed }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.35, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href === '#' ? 'inicio' : href.replace('#', '');
    const target = document.getElementById(targetId);

    if (!target) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const offset = window.innerWidth >= 1024 ? 96 : 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleNavClick = (href: string, event: MouseEvent<HTMLAnchorElement>) => {
    if (mobileOpen) {
      setMobileOpen(false);
    }

    event.preventDefault();

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    scrollToSection(href);
  };

  useEffect(() => {
    if (!mobileOpen) return;

    const prevActive = document.activeElement as HTMLElement | null;
    const node = mobileDrawerRef.current;
    const focusableSelector = 'a[href], button, textarea, select, [tabindex]:not([tabindex="-1"])';
    const focusable = node ? Array.from(node.querySelectorAll<HTMLElement>(focusableSelector)) : [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }

      if (e.key === 'Tab' && focusable.length > 0) {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    first?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      prevActive?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen flex-col border-r border-apple bg-apple-accent text-white transition-all duration-300 dark:border-white/10 ${
          collapsed ? 'w-20' : 'w-72'
        }`}
          aria-label="Barra lateral de navegação"
      >
        <div className="flex h-full flex-col justify-between">
          <SidebarContent
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            theme={theme}
            onThemeToggle={onThemeToggle}
            activeSection={activeSection}
            handleNavClick={handleNavClick}
            setMobileOpen={setMobileOpen}
          />
        </div>
      </aside>

      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-apple-accent text-white shadow-lg shadow-black/20"
          aria-label="Abrir menu de navegação"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="mobile-navigation-drawer"
        ref={mobileDrawerRef}
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[min(90vw,320px)] overflow-hidden bg-apple-accent text-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação móvel"
      >
        <div className="flex h-full flex-col justify-between">
          <SidebarContent
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            theme={theme}
            onThemeToggle={onThemeToggle}
            activeSection={activeSection}
            handleNavClick={handleNavClick}
            setMobileOpen={setMobileOpen}
            isMobile
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
