import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: { pt: 'Front-End & UI Moderna', en: 'Front-End & Modern UI' },
    description: {
      pt: 'Interfaces reativas, componentização escalável e foco em experiência do usuário e performance.',
      en: 'Reactive interfaces, scalable componentization and a focus on user experience and performance.',
    },
    iconName: 'Layout',
    skills: [
      { name: 'React 18 / 19', level: 'advanced', keyword: { pt: 'Virtual DOM, Custom Hooks, Context API', en: 'Virtual DOM, Custom Hooks, Context API' }, highlight: true },
      { name: 'TypeScript', level: 'advanced', keyword: { pt: 'Strict Typing, Generics, Interfaces, Tipagem Segura', en: 'Strict Typing, Generics, Interfaces, Type Safety' }, highlight: true },
      { name: 'Next.js (App Router)', level: 'intermediate', keyword: { pt: 'SSR, SSG, Server Components, API Routes', en: 'SSR, SSG, Server Components, API Routes' }, highlight: true },
      { name: 'Tailwind CSS v4', level: 'advanced', keyword: { pt: 'Design Tokens, Responsividade, Dark Mode', en: 'Design Tokens, Responsiveness, Dark Mode' }, highlight: true },
      { name: 'Framer Motion', level: 'intermediate', keyword: { pt: 'Micro-interações, Transições Suaves, Acessibilidade', en: 'Micro-interactions, Smooth Transitions, Accessibility' } },
      { name: 'HTML5 & CSS3 Semântico', level: 'advanced', keyword: { pt: 'WCAG 2.1 AA, SEO, Layouts Flex/Grid', en: 'WCAG 2.1 AA, SEO, Flex/Grid Layouts' } },
      { name: 'Vue.js', level: 'growing', keyword: { pt: 'Reatividade, Composition API', en: 'Reactivity, Composition API' } },
    ],
  },
  {
    id: 'backend',
    title: { pt: 'Back-End & APIs RESTful', en: 'Back-End & RESTful APIs' },
    description: {
      pt: 'Construção de rotas seguras, serviços desacoplados e integração contínua de microsserviços.',
      en: 'Building secure routes, decoupled services and continuous microservice integration.',
    },
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express', level: 'intermediate', keyword: { pt: 'APIs REST, Middlewares, Autenticação JWT', en: 'REST APIs, Middlewares, JWT Authentication' }, highlight: true },
      { name: 'Python (Django & Scripts)', level: 'intermediate', keyword: { pt: 'APIs REST, Automação, Data Pipelines', en: 'REST APIs, Automation, Data Pipelines' }, highlight: true },
      { name: 'Java & Spring Boot', level: 'intermediate', keyword: { pt: 'Arquitetura em Camadas, JPA/Hibernate, Maven', en: 'Layered Architecture, JPA/Hibernate, Maven' }, highlight: true },
      { name: 'Modelagem de APIs REST', level: 'intermediate', keyword: { pt: 'Status Codes, Tratamento de Erros, Paginação', en: 'Status Codes, Error Handling, Pagination' } },
      { name: 'Postman & Insomnia', level: 'advanced', keyword: { pt: 'Testes de Integração, Documentação de Rotas', en: 'Integration Testing, Route Documentation' } },
    ],
  },
  {
    id: 'database',
    title: { pt: 'Bancos de Dados & Nuvem', en: 'Databases & Cloud' },
    description: {
      pt: 'Modelagem relacional, persistência confiável, serverless e esteiras de deploy contínuo.',
      en: 'Relational modeling, reliable persistence, serverless infrastructure and continuous deploy pipelines.',
    },
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 'intermediate', keyword: { pt: 'Consultas Otimizadas, Índices, Relacionamentos', en: 'Optimized Queries, Indexes, Relationships' }, highlight: true },
      { name: 'Supabase BaaS', level: 'advanced', keyword: { pt: 'Postgres em Nuvem, Row-Level Security, Realtime', en: 'Cloud Postgres, Row-Level Security, Realtime' }, highlight: true },
      { name: 'Neon Serverless', level: 'intermediate', keyword: { pt: 'Database Branching, Serverless Postgres', en: 'Database Branching, Serverless Postgres' } },
      { name: 'MongoDB', level: 'growing', keyword: { pt: 'NoSQL, Document-based, Mongoose', en: 'NoSQL, Document-based, Mongoose' } },
      { name: 'Vercel Deployment', level: 'advanced', keyword: { pt: 'CI/CD Automatizado, Edge Functions, Preview Deployments', en: 'Automated CI/CD, Edge Functions, Preview Deployments' }, highlight: true },
      { name: 'Git & GitHub', level: 'advanced', keyword: { pt: 'Git Flow, Pull Requests, Code Review, Branches', en: 'Git Flow, Pull Requests, Code Review, Branches' }, highlight: true },
    ],
  },
  {
    id: 'automation',
    title: { pt: 'Automação & Engenharia RPA', en: 'Automation & RPA Engineering' },
    description: {
      pt: 'Transformação de fluxos manuais de backoffice em rotinas automáticas de alta precisão.',
      en: 'Turning manual back-office workflows into high-precision automated routines.',
    },
    iconName: 'Bot',
    skills: [
      { name: 'Python RPA & Automação', level: 'advanced', keyword: { pt: 'Automação de Tarefas, Scripts Agendados, Cron', en: 'Task Automation, Scheduled Scripts, Cron' }, highlight: true },
      { name: 'Extração e Parsing XML / NFe', level: 'advanced', keyword: { pt: 'Documentos Fiscais, Validação de Schemas', en: 'Tax Documents, Schema Validation' }, highlight: true },
      { name: 'Pandas & Análise de Dados', level: 'intermediate', keyword: { pt: 'ETL, Limpeza de Dados, Exportação de Relatórios', en: 'ETL, Data Cleaning, Report Exporting' }, highlight: true },
      { name: 'Selenium & Web Scraping', level: 'intermediate', keyword: { pt: 'Navegação Headless, Extração Dinâmica de Portais', en: 'Headless Browsing, Dynamic Portal Extraction' } },
      { name: 'Power BI & Dashboards', level: 'intermediate', keyword: { pt: 'Visualização de Métricas Operacionais e KPIs', en: 'Operational Metrics & KPI Visualization' } },
    ],
  },
  {
    id: 'engineering',
    title: { pt: 'Engenharia de Software & Práticas', en: 'Software Engineering & Practices' },
    description: {
      pt: 'Mentalidade orientada à qualidade de entrega, manutenibilidade de código e colaboração ágil.',
      en: 'A mindset oriented toward delivery quality, code maintainability and agile collaboration.',
    },
    iconName: 'ShieldCheck',
    skills: [
      { name: 'Clean Code & SOLID (Bases)', level: 'intermediate', keyword: { pt: 'Legibilidade, Separação de Responsabilidades', en: 'Readability, Separation of Concerns' }, highlight: true },
      { name: 'Metodologias Ágeis (Scrum / Kanban)', level: 'advanced', keyword: { pt: 'Sprints, Trello, Jira, Priorização de Demandas', en: 'Sprints, Trello, Jira, Backlog Prioritization' }, highlight: true },
      { name: 'Estruturas de Dados & Algoritmos', level: 'intermediate', keyword: { pt: 'Formação Unifor C.C, Complexidade Big-O', en: 'Unifor CS Coursework, Big-O Complexity' } },
      { name: 'Testes Automatizados (Bases)', level: 'growing', keyword: { pt: 'Jest, React Testing Library, Testes Unitários', en: 'Jest, React Testing Library, Unit Tests' } },
      { name: 'Docker (Conceitos & Containers)', level: 'growing', keyword: { pt: 'Ambientes Padronizados, Dockerfile', en: 'Standardized Environments, Dockerfile' } },
    ],
  },
];
