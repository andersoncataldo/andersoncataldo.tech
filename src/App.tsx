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
    <div className="w-8 h-8 border-4 border-apple-blue border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen bg-apple-bg text-apple-text selection:bg-apple-blue/10 transition-colors duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
      <Sidebar theme={theme} onThemeToggle={handleThemeToggle} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="relative">
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
  );
}

export default App;
