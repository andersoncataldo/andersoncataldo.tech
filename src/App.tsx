import { Suspense, lazy, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading components for better performance
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Automation = lazy(() => import('./components/Automation'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-apple-accent border-t-transparent rounded-full animate-spin" aria-label="Carregando seção" />
  </div>
);

const SectionError = () => (
  <div className="section-container py-12">
    <div className="apple-card p-8 text-center">
      <p className="text-apple-accent font-bold uppercase tracking-[0.22em] text-xs mb-2">Aviso</p>
      <h3 className="text-2xl font-bold text-apple-text mb-3">Esta seção não pôde ser carregada.</h3>
      <p className="text-apple-secondary font-medium">Tente recarregar a página ou voltar mais tarde.</p>
    </div>
  </div>
);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const root = document.documentElement;
    const savedTheme = window.localStorage.getItem('portfolio-theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return root.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-apple-text focus:rounded-full focus:ring-2 focus:ring-apple-accent"
      >
        Pular para o conteúdo
      </a>
      <div className={`min-h-screen overflow-x-hidden bg-apple-bg text-apple-text selection:bg-indigo-500/10 transition-colors transition-[padding-left] duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <Sidebar theme={theme} onThemeToggle={handleThemeToggle} collapsed={collapsed} setCollapsed={setCollapsed} />
        <main id="main-content" className="relative">
          <Hero />
          <ErrorBoundary fallback={<SectionError />}>
            <Suspense fallback={<SectionLoader />}>
              <About />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<SectionError />}>
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<SectionError />}>
            <Suspense fallback={<SectionLoader />}>
              <Automation />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<SectionError />}>
            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<SectionError />}>
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<SectionError />}>
            <Suspense fallback={<SectionLoader />}>
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
