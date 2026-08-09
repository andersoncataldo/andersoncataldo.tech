import { Suspense, lazy, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';

// Lazy loading components for better performance
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Automation = lazy(() => import('./components/Automation'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Simple loading placeholder
const SectionLoader = () => (
  <div className="w-full h-48 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-apple-accent border-t-transparent rounded-full animate-spin"></div>
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
      <div className={`min-h-screen overflow-x-hidden bg-apple-bg text-apple-text selection:bg-apple-accent/10 transition-colors transition-[padding-left] duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <Sidebar theme={theme} onThemeToggle={handleThemeToggle} collapsed={collapsed} setCollapsed={setCollapsed} />
        <main id="main-content" className="relative">
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Automation />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
