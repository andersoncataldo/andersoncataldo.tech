import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Front-End & UI Moderna',
    description: 'Interfaces reativas, componentização escalável e foco em experiência do usuário e performance.',
    iconName: 'Layout',
    skills: [
      { name: 'React 18 / 19', level: 'Avançado', keyword: 'Virtual DOM, Custom Hooks, Context API', highlight: true },
      { name: 'TypeScript', level: 'Avançado', keyword: 'Strict Typing, Generics, Interfaces, Tipagem Segura', highlight: true },
      { name: 'Next.js (App Router)', level: 'Intermediário', keyword: 'SSR, SSG, Server Components, API Routes', highlight: true },
      { name: 'Tailwind CSS v4', level: 'Avançado', keyword: 'Design Tokens, Responsividade, Dark Mode', highlight: true },
      { name: 'Framer Motion', level: 'Intermediário', keyword: 'Micro-interações, Transições Suaves, Acessibilidade' },
      { name: 'HTML5 & CSS3 Semântico', level: 'Avançado', keyword: 'WCAG 2.1 AA, SEO, Layouts Flex/Grid' },
      { name: 'Vue.js', level: 'Em expansão', keyword: 'Reatividade, Composition API' },
    ],
  },
  {
    title: 'Back-End & APIs RESTful',
    description: 'Construção de rotas seguras, serviços desacoplados e integração contínua de microsserviços.',
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express', level: 'Intermediário', keyword: 'APIs REST, Middlewares, Autenticação JWT', highlight: true },
      { name: 'Python (Django & Scripts)', level: 'Intermediário', keyword: 'APIs REST, Automação, Data Pipelines', highlight: true },
      { name: 'Java & Spring Boot', level: 'Intermediário', keyword: 'Arquitetura em Camadas, JPA/Hibernate, Maven', highlight: true },
      { name: 'Modelagem de APIs REST', level: 'Intermediário', keyword: 'Status Codes, Tratamento de Erros, Paginação' },
      { name: 'Postman & Insomnia', level: 'Avançado', keyword: 'Testes de Integração, Documentação de Rotas' },
    ],
  },
  {
    title: 'Bancos de Dados & Nuvem',
    description: 'Modelagem relacional, persistência confiável, serverless e esteiras de deploy contínuo.',
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL', level: 'Intermediário', keyword: 'Consultas Otimizadas, Índices, Relacionamentos', highlight: true },
      { name: 'Supabase BaaS', level: 'Avançado', keyword: 'Postgres em Nuvem, Row-Level Security, Realtime', highlight: true },
      { name: 'Neon Serverless', level: 'Intermediário', keyword: 'Database Branching, Serverless Postgres' },
      { name: 'MongoDB', level: 'Em expansão', keyword: 'NoSQL, Document-based, Mongoose' },
      { name: 'Vercel Deployment', level: 'Avançado', keyword: 'CI/CD Automatizado, Edge Functions, Preview Deployments', highlight: true },
      { name: 'Git & GitHub', level: 'Avançado', keyword: 'Git Flow, Pull Requests, Code Review, Branches', highlight: true },
    ],
  },
  {
    title: 'Automação & Engenharia RPA',
    description: 'Transformação de fluxos manuais de backoffice em rotinas automáticas de alta precisão.',
    iconName: 'Bot',
    skills: [
      { name: 'Python RPA & Automação', level: 'Avançado', keyword: 'Automação de Tarefas, Scripts Agendados, Cron', highlight: true },
      { name: 'Extração e Parsing XML / NFe', level: 'Avançado', keyword: 'Documentos Fiscais, Validação de Schemas', highlight: true },
      { name: 'Pandas & Análise de Dados', level: 'Intermediário', keyword: 'ETL, Limpeza de Dados, Exportação de Relatórios', highlight: true },
      { name: 'Selenium & Web Scraping', level: 'Intermediário', keyword: 'Navegação Headless, Extração Dinâmica de Portais' },
      { name: 'Power BI & Dashboards', level: 'Intermediário', keyword: 'Visualização de Métricas Operacionais e KPIs' },
    ],
  },
  {
    title: 'Engenharia de Software & Práticas',
    description: 'Mentalidade orientada à qualidade de entrega, manutenibilidade de código e colaboração ágil.',
    iconName: 'ShieldCheck',
    skills: [
      { name: 'Clean Code & SOLID (Bases)', level: 'Intermediário', keyword: 'Legibilidade, Separação de Responsabilidades', highlight: true },
      { name: 'Metodologias Ágeis (Scrum / Kanban)', level: 'Avançado', keyword: 'Sprints, Trello, Jira, Priorização de Demandas', highlight: true },
      { name: 'Estruturas de Dados & Algoritmos', level: 'Intermediário', keyword: 'Formação Unifor C.C, Complexidade Big-O' },
      { name: 'Testes Automatizados (Bases)', level: 'Em expansão', keyword: 'Jest, React Testing Library, Testes Unitários' },
      { name: 'Docker (Conceitos & Containers)', level: 'Em expansão', keyword: 'Ambientes Padronizados, Dockerfile' },
    ],
  },
];
