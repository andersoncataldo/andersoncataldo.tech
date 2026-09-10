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
  FolderGit2,
  Languages,
} from 'lucide-react';
import andersonImg from '../assets/anderson-cataldo.webp';
import { GITHUB_URL, LINKEDIN_URL } from '../config/links';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationDict } from '../i18n/translations';

interface SidebarProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const getNavLinks = (t: TranslationDict) => [
  { name: t.nav.home, href: '#', icon: Home },
  { name: t.nav.about, href: '#sobre', icon: User },
  { name: t.nav.experience, href: '#experiencia', icon: Briefcase },
  { name: t.nav.automation, href: '#rpa', icon: Zap },
  { name: t.nav.skills, href: '#habilidades', icon: Layout },
  { name: t.nav.projects, href: '#projetos', icon: FolderGit2 },
  { name: t.nav.contact, href: '#contato', icon: Mail },
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
  }: SidebarContentProps) => {
    const { t, language, setLanguage, resumePt, resumeEn } = useLanguage();
    const navLinks = getNavLinks(t);

    return (
      <div className="flex h-full flex-col justify-between p-3.5 sm:p-4 text-slate-600 dark:text-slate-300">
        <div>
          {/* Profile Card / Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4 pt-2 px-1">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl border border-indigo-500/40 bg-slate-200 dark:bg-slate-800 shadow-md">
                <img src={andersonImg} alt="Anderson Cataldo" className="h-full w-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </div>
              <div className={`transition-opacity duration-200 ${collapsed ? 'opacity-0 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`}>
                <p className="text-sm font-bold text-slate-900 dark:text-white tracking-tight truncate">Anderson Cataldo</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  <p className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium">{t.sidebar.roleTag}</p>
                </div>
              </div>
            </div>

            {isMobile ? (
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                aria-label={t.nav.closeMenu}
              >
                <X className="h-5 w-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label={collapsed ? t.nav.expandSidebar : t.nav.collapseSidebar}
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </button>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="py-4">
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
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 font-semibold shadow-sm shadow-indigo-600/10'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'}`} aria-hidden="true" />
                      <span className={`transition-opacity duration-200 truncate ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                        {link.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* External Social Links */}
            {collapsed ? (
              <div className="mt-8 flex flex-col items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                {externalLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                      className="rounded-xl p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                <p className="px-3 text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold">{t.nav.officialLinks}</p>
                <ul className="mt-2 space-y-1">
                  {externalLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100 transition"
                        >
                          <Icon className="h-4 w-4 text-slate-400" aria-hidden="true" />
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

        {/* Footer Controls: Language, Theme & Resume */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
          {/* Language Toggle */}
          <div className={`flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-1 ${collapsed ? 'justify-center' : ''}`}>
            {!collapsed && (
              <Languages className="h-4 w-4 text-slate-400 ml-1.5 shrink-0" aria-hidden="true" />
            )}
            <div className="flex flex-1 gap-1" role="group" aria-label={t.sidebar.language}>
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                className={`flex-1 h-8 rounded-lg text-xs font-bold transition ${
                  language === 'pt'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
                aria-pressed={language === 'pt'}
              >
                PT
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex-1 h-8 rounded-lg text-xs font-bold transition ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onThemeToggle}
              className="flex-1 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-xs font-semibold text-slate-700 dark:text-slate-200 transition border border-slate-200 dark:border-slate-700/60"
              aria-label={t.sidebar.toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
              {!collapsed && <span>{theme === 'dark' ? t.sidebar.lightMode : t.sidebar.darkMode}</span>}
            </button>

            {collapsed ? (
              <a
                href={language === 'pt' ? resumePt : resumeEn}
                target="_blank"
                rel="noopener noreferrer"
                download={`curriculo-anderson-cataldo-${language}.pdf`}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition px-3 shadow-sm shadow-indigo-600/20"
                aria-label={t.sidebar.downloadCv}
                title={t.sidebar.downloadCvTitle}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <div className="flex gap-1.5">
                <a
                  href={resumePt}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="curriculo-anderson-cataldo-pt.pdf"
                  className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-[11px] font-bold text-white transition px-2.5 shadow-sm shadow-indigo-600/20"
                  aria-label={`${t.sidebar.downloadCv} (PT-BR)`}
                  title={`${t.sidebar.downloadCvTitle} (PT-BR)`}
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  PT
                </a>
                <a
                  href={resumeEn}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="anderson-cataldo-resume-en.pdf"
                  className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-[11px] font-bold text-white transition px-2.5 shadow-sm shadow-indigo-600/20"
                  aria-label={`${t.sidebar.downloadCv} (EN)`}
                  title={`${t.sidebar.downloadCvTitle} (EN)`}
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  EN
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

SidebarContent.displayName = 'SidebarContent';

const Sidebar = ({ theme, onThemeToggle, collapsed, setCollapsed }: SidebarProps) => {
  const { t } = useLanguage();
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
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.3, 0.5, 0.7] },
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

    const offset = window.innerWidth >= 1024 ? 40 : 70;
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
      {/* Desktop Sidebar with Adaptive Light/Dark Glass Aesthetic */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen flex-col border-r border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#090e1a]/95 backdrop-blur-2xl text-slate-600 dark:text-slate-300 transition-all duration-300 z-40 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
        aria-label={t.nav.barLabel}
      >
        <SidebarContent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          theme={theme}
          onThemeToggle={onThemeToggle}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          setMobileOpen={setMobileOpen}
        />
      </aside>

      {/* Mobile Floating Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 dark:bg-[#090e1a]/90 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white shadow-xl shadow-slate-900/10 dark:shadow-black/30"
          aria-label={t.nav.openMenu}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation-drawer"
        >
          <Menu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <aside
        id="mobile-navigation-drawer"
        ref={mobileDrawerRef}
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[min(85vw,300px)] overflow-hidden bg-white dark:bg-[#090e1a] border-r border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-2xl transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.mobileDrawerLabel}
      >
        <SidebarContent
          collapsed={false}
          setCollapsed={() => {}}
          theme={theme}
          onThemeToggle={onThemeToggle}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          setMobileOpen={setMobileOpen}
          isMobile
        />
      </aside>
    </>
  );
};

export default Sidebar;
