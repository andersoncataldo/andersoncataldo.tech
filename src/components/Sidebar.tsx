import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Home,
  User,
  Briefcase,
  Layout,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Search,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';

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
  { name: 'Projetos', href: '#projetos', icon: Layout },
  { name: 'Habilidades', href: '#habilidades', icon: Sparkles },
  { name: 'Contato', href: '#contato', icon: Mail },
];

const externalLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/andersoncataldo',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/andersonnviana',
    icon: Linkedin,
  },
];

const profileMenuItems = [
  { name: 'Configurações', icon: Settings },
  { name: 'Ajuda', icon: HelpCircle },
  { name: 'Sair', icon: LogOut },
];

const Sidebar = ({ theme, onThemeToggle, collapsed, setCollapsed }: SidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const filteredNavLinks = useMemo(
    () =>
      navLinks.filter((link) =>
        link.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const filteredExternalLinks = useMemo(
    () =>
      externalLinks.filter((link) =>
        link.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  const handleNavClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
    setSearchOpen(false);
  };

  return (
    <>
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen flex-col border-r border-black/5 bg-[#0f172a] text-white transition-all duration-300 dark:border-white/10 ${
          collapsed ? 'w-20' : 'w-72'
        }`}
        aria-label="Barra lateral de navegação"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-apple-blue text-lg font-bold">
                  A
                </div>
                {!collapsed && (
                  <div>
                    <p className="text-sm font-semibold text-white">Anderson Cataldo</p>
                    <p className="text-[11px] text-slate-400">Portfólio de carreira</p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
                aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
              >
                {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </button>
            </div>

            <div className="border-b border-white/10 px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                {!collapsed && <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Navegação</p>}
                <button
                  type="button"
                  onClick={() => setSearchOpen((current) => !current)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
                  aria-label="Abrir busca"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {searchOpen && !collapsed && (
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-3">
                  <label htmlFor="sidebar-search" className="sr-only">
                    Buscar navegação
                  </label>
                  <input
                    id="sidebar-search"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    type="text"
                    placeholder="Buscar seção"
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/30"
                  />
                </div>
              )}
            </div>

            <nav className="px-2 py-5">
              <ul className="space-y-1">
                {filteredNavLinks.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-slate-400">Nenhuma seção encontrada.</li>
                ) : (
                  filteredNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          onClick={handleNavClick}
                          className="group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                        >
                          <Icon className="h-5 w-5 text-apple-blue" aria-hidden="true" />
                          {!collapsed && <span>{link.name}</span>}
                        </a>
                      </li>
                    );
                  })
                )}
              </ul>

              {!collapsed && (
                <div className="mt-10 px-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Links</p>
                  <ul className="mt-4 space-y-2">
                    {filteredExternalLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
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
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white text-apple-blue text-lg font-bold">
                A
              </div>
              {!collapsed && (
                <div>
                  <p className="text-sm font-semibold text-white">Anderson</p>
                  <p className="text-[11px] text-slate-400">Graduando em C.C.</p>
                </div>
              )}
            </div>

            {!collapsed && (
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
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
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {!collapsed && <span>Tema</span>}
              </button>
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((current) => !current)}
                  className="inline-flex h-11 items-center justify-center rounded-3xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15"
                  aria-haspopup="true"
                  aria-expanded={profileMenuOpen}
                >
                  Menu
                </button>
              )}
            </div>

            {profileMenuOpen && !collapsed && (
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Perfil</p>
                <p className="mt-2 text-sm font-semibold text-white">andersonvcataldo@gmail.com</p>
                <ul className="mt-4 space-y-2">
                  {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-200 transition hover:bg-white/10"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-apple-text text-white shadow-lg shadow-black/20"
          aria-label="Abrir menu de navegação"
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
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[min(90vw,320px)] overflow-hidden bg-apple-text text-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Menu de navegação móvel"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-apple-blue text-lg font-bold">
                  A
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Anderson Cataldo</p>
                  <p className="text-[11px] text-slate-400">Portfólio de carreira</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
                aria-label="Fechar menu móvel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-white/10 px-5 py-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Navegação</p>
                <button
                  type="button"
                  onClick={() => setSearchOpen((current) => !current)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/15"
                  aria-label="Abrir busca"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {searchOpen && (
                <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-3">
                  <label htmlFor="sidebar-search-mobile" className="sr-only">
                    Buscar navegação
                  </label>
                  <input
                    id="sidebar-search-mobile"
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    type="text"
                    placeholder="Buscar seção"
                    className="w-full rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/30"
                  />
                </div>
              )}
            </div>

            <nav className="px-2 py-5">
              <ul className="space-y-1">
                {filteredNavLinks.length === 0 ? (
                  <li className="px-4 py-3 text-sm text-slate-400">Nenhuma seção encontrada.</li>
                ) : (
                  filteredNavLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          onClick={handleNavClick}
                          className="group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                        >
                          <Icon className="h-5 w-5 text-apple-blue" aria-hidden="true" />
                          <span>{link.name}</span>
                        </a>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="mt-10 px-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Links</p>
                <ul className="mt-4 space-y-2">
                  {filteredExternalLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                        >
                          <Icon className="h-5 w-5 text-slate-200" aria-hidden="true" />
                          <span>{link.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>

          <div className="border-t border-white/10 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white text-apple-blue text-lg font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Anderson</p>
                <p className="text-[11px] text-slate-400">Graduando em C.C.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={onThemeToggle}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15"
                aria-label="Alternar tema"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span>Tema</span>
              </button>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((current) => !current)}
                className="inline-flex h-11 items-center justify-center rounded-3xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white transition hover:bg-white/15"
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
              >
                Menu
              </button>
            </div>
            {profileMenuOpen && (
              <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20">
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Perfil</p>
                <p className="mt-2 text-sm font-semibold text-white">andersonvcataldo@gmail.com</p>
                <ul className="mt-4 space-y-2">
                  {profileMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() => setProfileMenuOpen(false)}
                          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-200 transition hover:bg-white/10"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{item.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
