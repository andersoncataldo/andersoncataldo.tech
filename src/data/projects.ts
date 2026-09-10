import previewCarlo from '../assets/project-carlo-acutis-preview.svg';
import previewPortfolio from '../assets/project-portfolio-preview.svg';
import previewRpa from '../assets/project-rpa-preview.svg';
import previewOps from '../assets/project-ops-dashboard.svg';
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'carlo-acutis',
    title: { pt: 'Plataforma Gamificada São Carlo Acutis', en: 'São Carlo Acutis Gamified Platform' },
    subtitle: {
      pt: 'Engenharia Full-Stack & Gamificação Educacional Interativa',
      en: 'Full-Stack Engineering & Interactive Educational Gamification',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'Full-Stack', en: 'Full-Stack' },
    description: {
      pt: 'Sistema web educacional gamificado com missões interativas, quizzes em tempo real e sistema de pontuação e progresso para o público jovem.',
      en: 'Gamified educational web system with interactive missions, real-time quizzes and a scoring/progress system aimed at a young audience.',
    },
    challenge: {
      pt: 'Construir uma arquitetura desacoplada e responsiva capaz de processar respostas em tempo real com validação no backend sem engasgos na UI.',
      en: 'Build a decoupled, responsive architecture capable of processing real-time answers with backend validation without any UI lag.',
    },
    role: { pt: 'Engenheiro Full-Stack & UI/UX Designer', en: 'Full-Stack Engineer & UI/UX Designer' },
    solution: {
      pt: 'Desenvolvimento do front-end em React + TypeScript com componentização modular e gerenciamento de estado. Back-end robusto em Java Spring Boot com persistência relacional no PostgreSQL e deploy otimizado na Vercel.',
      en: 'Front-end built with React + TypeScript using modular componentization and state management. Robust back-end in Java Spring Boot with relational persistence on PostgreSQL and optimized deployment on Vercel.',
    },
    architecture: [
      { pt: 'Front-End: React 18, TypeScript, Tailwind CSS, Lucide Icons', en: 'Front-End: React 18, TypeScript, Tailwind CSS, Lucide Icons' },
      { pt: 'Back-End: Java 17, Spring Boot, Spring Data JPA, RESTful API', en: 'Back-End: Java 17, Spring Boot, Spring Data JPA, RESTful API' },
      { pt: 'Banco de Dados: PostgreSQL com modelagem relacional de usuários e pontuações', en: 'Database: PostgreSQL with relational modeling of users and scores' },
      { pt: 'Infraestrutura & Deploy: Vercel (Front) e Railway / Render (Back)', en: 'Infrastructure & Deploy: Vercel (Front-end) and Railway / Render (Back-end)' },
    ],
    result: {
      pt: 'Interface fluida com tempo de carregamento inferior a 1.2s e 100% de precisão no cálculo de rankings e conquistas.',
      en: 'Smooth interface with load time under 1.2s and 100% accuracy in ranking and achievement calculations.',
    },
    impact: {
      pt: 'Alta adesão de usuários, gamificação imersiva e arquitetura pronta para escalabilidade horizontal.',
      en: 'High user adoption, immersive gamification and an architecture ready for horizontal scalability.',
    },
    metrics: [
      { label: { pt: 'Tempo de Carregamento', en: 'Load Time' }, value: '< 1.2s' },
      { label: { pt: 'Stack', en: 'Stack' }, value: 'React + Spring Boot' },
      { label: { pt: 'Disponibilidade', en: 'Availability' }, value: '100%' },
    ],
    techStack: ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS', 'REST API'],
    icon: 'Layout',
    github: 'https://github.com/andersoncataldo/CarloAcutis',
    liveDemo: 'https://carlo-acutis-virid.vercel.app',
    featured: true,
    images: [previewCarlo],
  },
  {
    id: 'rpa-fiscal-extractor',
    title: { pt: 'Motor de Automação RPA & Extração Fiscal', en: 'RPA Automation Engine & Tax Data Extraction' },
    subtitle: {
      pt: 'Pipeline em Python para Extração e Tratamento em Massa de XMLs',
      en: 'Python Pipeline for Bulk XML Extraction and Processing',
    },
    category: 'automation',
    categoryLabel: { pt: 'Automação & Python', en: 'Automation & Python' },
    description: {
      pt: 'Robô corporativo de automação de processos desenvolvido para captura contínua, validação contra schemas SEFAZ, parsing de tags fiscais e geração de relatórios consolidados.',
      en: 'Corporate process-automation robot built for continuous capture, SEFAZ schema validation, tax-tag parsing and consolidated report generation.',
    },
    challenge: {
      pt: 'O processo manual dependia de operadores baixando e checando milhares de arquivos XML semanalmente, o que gerava gargalos e riscos de inconsistências fiscais.',
      en: 'The manual process relied on operators downloading and checking thousands of XML files every week, creating bottlenecks and tax-inconsistency risks.',
    },
    role: { pt: 'Desenvolvedor RPA & Analista de Automação', en: 'RPA Developer & Automation Analyst' },
    solution: {
      pt: 'Criação de worker assíncrono em Python com BeautifulSoup/lxml e Pandas. Validação rigorosa dos dados, tratamento de erros com retentativas automáticas e exportação estruturada para conciliação contábil.',
      en: 'Built an asynchronous Python worker with BeautifulSoup/lxml and Pandas. Rigorous data validation, error handling with automatic retries, and structured export for accounting reconciliation.',
    },
    architecture: [
      { pt: 'Linguagem: Python 3.11+, Scripts Agendados (Windows Task Scheduler / Cron)', en: 'Language: Python 3.11+, Scheduled Scripts (Windows Task Scheduler / Cron)' },
      { pt: 'Parsing & ETL: lxml, BeautifulSoup, Pandas, NumPy', en: 'Parsing & ETL: lxml, BeautifulSoup, Pandas, NumPy' },
      { pt: 'Manipulação de Arquivos: OpenPyXL, os/shutil com logs estruturados', en: 'File Handling: OpenPyXL, os/shutil with structured logs' },
      { pt: 'Tratamento de Exceções: Try/Catch granular com alertas e relatórios de discrepâncias', en: 'Exception Handling: granular try/catch with alerts and discrepancy reports' },
    ],
    result: {
      pt: 'Mais de 15.000 XMLs processados mensalmente com acurácia de 99.85%, reduzindo um processo de 3h40min para meros 18 segundos.',
      en: 'More than 15,000 XMLs processed monthly with 99.85% accuracy, cutting a 3h40min process down to just 18 seconds.',
    },
    impact: {
      pt: 'Economia comprovada de mais de 200 horas de trabalho manual acumuladas e risco fiscal zerado.',
      en: 'Proven savings of over 200 accumulated hours of manual work, with tax risk reduced to zero.',
    },
    metrics: [
      { label: { pt: 'Processamento', en: 'Processing' }, value: '15.000+ XML/mês' },
      { label: { pt: 'Tempo Reduzido', en: 'Time Reduced' }, value: '-92%' },
      { label: { pt: 'Confiabilidade', en: 'Reliability' }, value: '99.85%' },
    ],
    techStack: ['Python', 'RPA', 'Pandas', 'XML / lxml', 'ETL', 'Excel Automation', 'Loguru'],
    icon: 'Bot',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewRpa],
  },
  {
    id: 'internal-ops-dashboard',
    title: { pt: 'Painel de Operações & Gestão Interna', en: 'Operations Dashboard & Internal Management' },
    subtitle: {
      pt: 'Aplicação Web Corporativa para Controle Operacional em Tempo Real',
      en: 'Corporate Web Application for Real-Time Operational Control',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'Full-Stack', en: 'Full-Stack' },
    description: {
      pt: 'Sistema web desenvolvido sob demanda na Distribuidora Mais Saúde para centralizar dados operacionais, acompanhamento de estoque e agilizar consultas da equipe técnica.',
      en: 'Web system built on demand at Distribuidora Mais Saúde to centralize operational data, track inventory and speed up lookups for the technical team.',
    },
    challenge: {
      pt: 'A equipe dependia de consultas manuais dispersas em planilhas e sistemas legados lentos, atrasando atendimentos e relatórios para a diretoria.',
      en: 'The team relied on manual lookups scattered across spreadsheets and slow legacy systems, delaying service and reporting to management.',
    },
    role: { pt: 'Desenvolvedor Full-Stack (Time de T.I)', en: 'Full-Stack Developer (IT Team)' },
    solution: {
      pt: 'Estruturação de aplicação com Next.js (App Router), autenticação e banco relacional no Supabase/PostgreSQL, com formulários tipados e filtros instantâneos no front-end.',
      en: 'Built the application with Next.js (App Router), authentication and a relational database on Supabase/PostgreSQL, with typed forms and instant front-end filters.',
    },
    architecture: [
      { pt: 'Front-End: Next.js 14, React 18, Tailwind CSS, Lucide Icons', en: 'Front-End: Next.js 14, React 18, Tailwind CSS, Lucide Icons' },
      { pt: 'Backend & DB: Supabase (PostgreSQL), Edge API Routes, Row-Level Security', en: 'Backend & DB: Supabase (PostgreSQL), Edge API Routes, Row-Level Security' },
      { pt: 'Metodologia: Kanban ágil com feedback contínuo dos operadores internos', en: 'Methodology: agile Kanban with continuous feedback from internal operators' },
    ],
    result: {
      pt: 'Redução de 40% no tempo médio de consulta operacional e unificação de 4 rotinas distintas em uma única plataforma web moderna.',
      en: 'A 40% reduction in average operational lookup time and 4 separate routines unified into a single modern web platform.',
    },
    impact: {
      pt: 'Maior transparência nos dados, eliminação de retrabalho e equipe operacional mais produtiva.',
      en: 'Greater data transparency, eliminated rework and a more productive operations team.',
    },
    metrics: [
      { label: { pt: 'Ganho de Agilidade', en: 'Speed Gain' }, value: '+40%' },
      { label: { pt: 'Latência API', en: 'API Latency' }, value: '< 85ms' },
      { label: { pt: 'Usuários Ativos', en: 'Active Users' }, value: 'Equipe Interna' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Vercel'],
    icon: 'Server',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewOps],
  },
  {
    id: 'portfolio-web-tech',
    title: { pt: 'Portfólio Web de Engenharia & Performance', en: 'Engineering & Performance Web Portfolio' },
    subtitle: {
      pt: 'Arquitetura Front-End Moderna com Acessibilidade e SEO 100%',
      en: 'Modern Front-End Architecture with Full Accessibility and SEO',
    },
    category: 'frontend',
    categoryLabel: { pt: 'Front-End', en: 'Front-End' },
    description: {
      pt: 'Interface pessoal moderna projetada para recrutadores e tech leads, implementando design system sob medida com tokens Tailwind v4, suporte a modo escuro/claro e navegação fluida.',
      en: 'Modern personal interface designed for recruiters and tech leads, implementing a custom design system with Tailwind v4 tokens, dark/light mode support and fluid navigation.',
    },
    challenge: {
      pt: 'Criar uma apresentação de nível júnior maduro, demonstrando boas práticas de código, performance exemplar e comunicação clara de resultados.',
      en: 'Create a presentation with mature junior-level polish, demonstrating good coding practices, exemplary performance and clear communication of results.',
    },
    role: { pt: 'Lead Front-End & UI Designer', en: 'Lead Front-End & UI Designer' },
    solution: {
      pt: 'Construção com React 18, TypeScript, Tailwind CSS v4, animações reduzidas conforme preferência do usuário (prefers-reduced-motion) e pontuação máxima no Lighthouse.',
      en: 'Built with React 18, TypeScript, Tailwind CSS v4, reduced animations based on user preference (prefers-reduced-motion) and top Lighthouse scores.',
    },
    architecture: [
      { pt: 'Bundler: Vite 6 com otimização de chunks e tree-shaking', en: 'Bundler: Vite 6 with chunk optimization and tree-shaking' },
      { pt: 'Design: Tailwind CSS v4 com tokens tipados no @theme', en: 'Design: Tailwind CSS v4 with typed tokens in @theme' },
      { pt: 'Acessibilidade: WCAG 2.1 AA, navegação via teclado e leitor de tela (aria labels)', en: 'Accessibility: WCAG 2.1 AA, keyboard navigation and screen-reader support (aria labels)' },
      { pt: 'SEO: Meta tags OpenGraph completas, JSON-LD Schema e sitemap automático', en: 'SEO: complete OpenGraph meta tags, JSON-LD schema and automatic sitemap' },
    ],
    result: {
      pt: '100% de conformidade com TypeScript estrito, carregamento instantâneo e layout totalmente responsivo.',
      en: '100% strict TypeScript compliance, instant loading and a fully responsive layout.',
    },
    impact: {
      pt: 'Apresentação profissional impecável de projetos e competências técnicas.',
      en: 'A flawless professional presentation of projects and technical skills.',
    },
    metrics: [
      { label: { pt: 'Lighthouse Score', en: 'Lighthouse Score' }, value: '98+' },
      { label: { pt: 'Acessibilidade', en: 'Accessibility' }, value: 'WCAG AA' },
      { label: { pt: 'Design System', en: 'Design System' }, value: 'Tailwind v4' },
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Vite', 'SEO'],
    icon: 'BookOpen',
    github: 'https://github.com/andersoncataldo/andersoncataldo.tech',
    liveDemo: 'https://andersoncataldo.tech',
    featured: false,
    images: [previewPortfolio],
  },
];
