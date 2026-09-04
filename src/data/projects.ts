import previewCarlo from '../assets/project-carlo-acutis-preview.svg';
import previewPortfolio from '../assets/project-portfolio-preview.svg';
import previewRpa from '../assets/project-rpa-preview.svg';
import previewOps from '../assets/project-ops-dashboard.svg';
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'carlo-acutis',
    title: 'Plataforma Gamificada São Carlo Acutis',
    subtitle: 'Engenharia Full-Stack & Gamificação Educacional Interativa',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    description: 'Sistema web educacional gamificado com missões interativas, quizzes em tempo real e sistema de pontuação e progresso para o público jovem.',
    challenge: 'Construir uma arquitetura desacoplada e responsiva capaz de processar respostas em tempo real com validação no backend sem engasgos na UI.',
    role: 'Engenheiro Full-Stack & UI/UX Designer',
    solution: 'Desenvolvimento do front-end em React + TypeScript com componentização modular e gerenciamento de estado. Back-end robusto em Java Spring Boot com persistência relacional no PostgreSQL e deploy otimizado na Vercel.',
    architecture: [
      'Front-End: React 18, TypeScript, Tailwind CSS, Lucide Icons',
      'Back-End: Java 17, Spring Boot, Spring Data JPA, RESTful API',
      'Banco de Dados: PostgreSQL com modelagem relacional de usuários e pontuações',
      'Infraestrutura & Deploy: Vercel (Front) e Railway / Render (Back)'
    ],
    result: 'Interface fluida com tempo de carregamento inferior a 1.2s e 100% de precisão no cálculo de rankings e conquistas.',
    impact: 'Alta adesão de usuários, gamificação imersiva e arquitetura pronta para escalabilidade horizontal.',
    metrics: [
      { label: 'Tempo de Carregamento', value: '< 1.2s' },
      { label: 'Stack', value: 'React + Spring Boot' },
      { label: 'Disponibilidade', value: '100%' }
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
    title: 'Motor de Automação RPA & Extração Fiscal',
    subtitle: 'Pipeline em Python para Extração e Tratamento em Massa de XMLs',
    category: 'automation',
    categoryLabel: 'Automação & Python',
    description: 'Robô corporativo de automação de processos desenvolvido para captura contínua, validação contra schemas SEFAZ, parsing de tags fiscais e geração de relatórios consolidados.',
    challenge: 'O processo manual dependia de operadores baixando e checando milhares de arquivos XML semanalmente, o que gerava gargalos e riscos de inconsistências fiscais.',
    role: 'Desenvolvedor RPA & Analista de Automação',
    solution: 'Criação de worker assíncrono em Python com BeautifulSoup/lxml e Pandas. Validação rigorosa dos dados, tratamento de erros com retentativas automáticas e exportação estruturada para conciliação contábil.',
    architecture: [
      'Linguagem: Python 3.11+, Scripts Agendados (Windows Task Scheduler / Cron)',
      'Parsing & ETL: lxml, BeautifulSoup, Pandas, NumPy',
      'Manipulação de Arquivos: OpenPyXL, os/shutil com logs estruturados',
      'Tratamento de Exceções: Try/Catch granular com alertas e relatórios de discrepâncias'
    ],
    result: 'Mais de 15.000 XMLs processados mensalmente com acurácia de 99.85%, reduzindo um processo de 3h40min para meros 18 segundos.',
    impact: 'Economia comprovada de mais de 200 horas de trabalho manual acumuladas e risco fiscal zerado.',
    metrics: [
      { label: 'Processamento', value: '15.000+ XML/mês' },
      { label: 'Tempo Reduzido', value: '-92%' },
      { label: 'Confiabilidade', value: '99.85%' }
    ],
    techStack: ['Python', 'RPA', 'Pandas', 'XML / lxml', 'ETL', 'Excel Automation', 'Loguru'],
    icon: 'Bot',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewRpa],
  },
  {
    id: 'internal-ops-dashboard',
    title: 'Painel de Operações & Gestão Interna',
    subtitle: 'Aplicação Web Corporativa para Controle Operacional em Tempo Real',
    category: 'fullstack',
    categoryLabel: 'Full-Stack',
    description: 'Sistema web desenvolvido sob demanda na Distribuidora Mais Saúde para centralizar dados operacionais, acompanhamento de estoque e agilizar consultas da equipe técnica.',
    challenge: 'A equipe dependia de consultas manuais dispersas em planilhas e sistemas legados lentos, atrasando atendimentos e relatórios para a diretoria.',
    role: 'Desenvolvedor Full-Stack (Estágio T.I)',
    solution: 'Estruturação de aplicação com Next.js (App Router), autenticação e banco relacional no Supabase/PostgreSQL, com formulários tipados e filtros instantâneos no front-end.',
    architecture: [
      'Front-End: Next.js 14, React 18, Tailwind CSS, Lucide Icons',
      'Backend & DB: Supabase (PostgreSQL), Edge API Routes, Row-Level Security',
      'Metodologia: Kanban ágil com feedback contínuo dos operadores internos'
    ],
    result: 'Redução de 40% no tempo médio de consulta operacional e unificação de 4 rotinas distintas em uma única plataforma web moderna.',
    impact: 'Maior transparência nos dados, eliminação de retrabalho e equipe operacional mais produtiva.',
    metrics: [
      { label: 'Ganho de Agilidade', value: '+40%' },
      { label: 'Latência API', value: '< 85ms' },
      { label: 'Usuários Ativos', value: 'Equipe Interna' }
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Supabase', 'Vercel'],
    icon: 'Server',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewOps],
  },
  {
    id: 'portfolio-web-tech',
    title: 'Portfólio Web de Engenharia & Performance',
    subtitle: 'Arquitetura Front-End Moderna com Acessibilidade e SEO 100%',
    category: 'frontend',
    categoryLabel: 'Front-End',
    description: 'Interface pessoal moderna projetada para recrutadores e tech leads, implementando design system sob medida com tokens Tailwind v4, suporte a modo escuro/claro e navegação fluida.',
    challenge: 'Criar uma apresentação de nível júnior maduro, demonstrando boas práticas de código, performance exemplar e comunicação clara de resultados.',
    role: 'Lead Front-End & UI Designer',
    solution: 'Construção com React 18, TypeScript, Tailwind CSS v4, animações reduzidas conforme preferência do usuário (prefers-reduced-motion) e pontuação máxima no Lighthouse.',
    architecture: [
      'Bundler: Vite 6 com otimização de chunks e tree-shaking',
      'Design: Tailwind CSS v4 com tokens tipados no @theme',
      'Acessibilidade: WCAG 2.1 AA, navegação via teclado e leitor de tela (aria labels)',
      'SEO: Meta tags OpenGraph completas, JSON-LD Schema e sitemap automático'
    ],
    result: '100% de conformidade com TypeScript estrito, carregamento instantâneo e layout totalmente responsivo.',
    impact: 'Apresentação profissional impecável de projetos e competências técnicas.',
    metrics: [
      { label: 'Lighthouse Score', value: '98+' },
      { label: 'Acessibilidade', value: 'WCAG AA' },
      { label: 'Design System', value: 'Tailwind v4' }
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Vite', 'SEO'],
    icon: 'BookOpen',
    github: 'https://github.com/andersoncataldo/andersoncataldo.tech',
    liveDemo: 'https://andersoncataldo.tech',
    featured: false,
    images: [previewPortfolio],
  },
];
