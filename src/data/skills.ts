import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-agents',
    title: { pt: 'IA & Sistemas Multiagente', en: 'AI & Multi-Agent Systems' },
    description: {
      pt: 'Orquestração avançada de agentes autônomos, engenharia de prompt rigorosa e integração com LLMs.',
      en: 'Advanced autonomous agent orchestration, strict prompt engineering, and production LLM integrations.',
    },
    iconName: 'Bot',
    skills: [
      { name: 'Agentes de IA & Multiagente', level: 'advanced', keyword: { pt: 'Arquitetura Maker-Checker, Orquestração 24/7', en: 'Maker-Checker Architecture, 24/7 Orchestration' }, highlight: true },
      { name: 'Claude Code & Subagentes', level: 'advanced', keyword: { pt: 'Desenvolvimento Assistido por IA, Fluxos Autônomos', en: 'AI-Assisted Engineering, Autonomous Workflows' }, highlight: true },
      { name: 'MCP (Model Context Protocol)', level: 'advanced', keyword: { pt: 'Servidores MCP, Conectores de Ferramentas', en: 'MCP Servers, Tool Integration Connectors' }, highlight: true },
      { name: 'Google Gemini API & OpenAI', level: 'advanced', keyword: { pt: 'Diagnóstico por IA, Embeddings, Structured JSON', en: 'AI Diagnostics, Embeddings, Structured JSON' }, highlight: true },
      { name: 'Guardrails & Anti-Alucinação', level: 'advanced', keyword: { pt: 'Validação Zod/Pydantic, Fallback Local < 1s', en: 'Zod/Pydantic Contracts, < 1s Local Fallback' }, highlight: true },
      { name: 'Engenharia de Prompt & RAG', level: 'advanced', keyword: { pt: 'System Prompts, Context Bus, Saídas Estruturadas', en: 'System Prompts, Context Bus, Structured Outputs' }, highlight: true },
    ],
  },
  {
    id: 'automation',
    title: { pt: 'Automação & RPA Industrial', en: 'Automation & Industrial RPA' },
    description: {
      pt: 'Eliminação de gargalos operacionais com robôs Python conectados a ERPs e portais corporativos.',
      en: 'Eliminating operational bottlenecks with Python robots connected to ERPs and corporate portals.',
    },
    iconName: 'Cpu',
    skills: [
      { name: 'Python RPA & Automação', level: 'advanced', keyword: { pt: '15 Robôs Entregues, Redução de Horas para Segundos', en: '15 Shipped Robots, Hours Reduced to Seconds' }, highlight: true },
      { name: 'Integração WinThor ERP (Oracle)', level: 'advanced', keyword: { pt: 'Consultas em Lote, Atualização de Catálogos e Estoque', en: 'Batch Queries, Inventory & Catalog Sync' }, highlight: true },
      { name: 'EDI Pharma Link & FTP/SFTP', level: 'advanced', keyword: { pt: 'Paramiko, ftplib, Sync a cada 15 min, -99% tempo', en: 'Paramiko, ftplib, 15-min Sync Intervals, -99% time' }, highlight: true },
      { name: 'Parsing XML / NFe & Schemas SEFAZ', level: 'advanced', keyword: { pt: 'lxml, BeautifulSoup, Validação de Esquemas Fiscais', en: 'lxml, BeautifulSoup, Tax Schema Compliance' }, highlight: true },
      { name: 'Playwright & Selenium Headless', level: 'advanced', keyword: { pt: 'Web Scraping, Emissão de CNDs, Portais Governamentais', en: 'Web Scraping, CND Certificates, Gov Portals' }, highlight: true },
      { name: 'Pandas, ETL & OpenPyXL', level: 'advanced', keyword: { pt: 'Conciliação Contábil Automatizada, DataFrames', en: 'Automated Ledger Reconciliation, DataFrames' }, highlight: true },
      { name: 'PyInstaller & Windows Task Scheduler', level: 'intermediate', keyword: { pt: 'Executáveis Standalone, Tarefas Agendadas', en: 'Standalone Executables, Scheduled Tasks' } },
    ],
  },
  {
    id: 'backend',
    title: { pt: 'Back-End & Arquitetura de APIs', en: 'Back-End & API Architecture' },
    description: {
      pt: 'Serviços escaláveis, microsserviços desacoplados, segurança enterprise e autenticação segura.',
      en: 'Scalable services, decoupled microservices, enterprise application security, and robust auth.',
    },
    iconName: 'Server',
    skills: [
      { name: 'Node.js & Express (TypeScript)', level: 'advanced', keyword: { pt: 'APIs RESTful, Middlewares, Clean Architecture', en: 'RESTful APIs, Middlewares, Clean Architecture' }, highlight: true },
      { name: 'Python & FastAPI', level: 'advanced', keyword: { pt: 'Pydantic v2, SQLAlchemy, Alembic, Alta Concorrência', en: 'Pydantic v2, SQLAlchemy, Alembic, High Concurrency' }, highlight: true },
      { name: 'Autenticação JWT, SSO & RBAC', level: 'advanced', keyword: { pt: 'Single Sign-On Corporativo, 4 Níveis de Acesso', en: 'Corporate Single Sign-On, 4 Role Tiers' }, highlight: true },
      { name: 'Java & Spring Boot', level: 'intermediate', keyword: { pt: 'Spring Data JPA, Hibernate, Maven, REST APIs', en: 'Spring Data JPA, Hibernate, Maven, REST APIs' }, highlight: true },
      { name: 'Django & REST Framework', level: 'intermediate', keyword: { pt: 'ORM, Painel Admin, Endpoints Seguros', en: 'ORM, Admin Panel, Secure Endpoints' } },
      { name: 'Zod & Pydantic Validation', level: 'advanced', keyword: { pt: 'Tipagem Estrita em Tempo de Execução', en: 'Strict Runtime Type Validation' } },
    ],
  },
  {
    id: 'frontend',
    title: { pt: 'Front-End & UI SaaS', en: 'Front-End & SaaS UI' },
    description: {
      pt: 'Aplicações web ultra-rápidas, design system refinado, acessibilidade total e craft visual impecável.',
      en: 'Lightning-fast web applications, polished design systems, full accessibility, and flawless craft.',
    },
    iconName: 'Layout',
    skills: [
      { name: 'React 19 / 18', level: 'advanced', keyword: { pt: 'Custom Hooks, Context API, Suspense, ErrorBoundary', en: 'Custom Hooks, Context API, Suspense, ErrorBoundary' }, highlight: true },
      { name: 'Next.js 16 (App Router)', level: 'advanced', keyword: { pt: 'Server Actions, SSR, SSG, Edge Runtime', en: 'Server Actions, SSR, SSG, Edge Runtime' }, highlight: true },
      { name: 'TypeScript', level: 'advanced', keyword: { pt: 'Strict Mode, Generics, Type Safety Ponta a Ponta', en: 'Strict Mode, Generics, End-to-End Type Safety' }, highlight: true },
      { name: 'Tailwind CSS 4', level: 'advanced', keyword: { pt: 'Design Tokens, CSS Variables, Dark/Light Mode', en: 'Design Tokens, CSS Variables, Dark/Light Mode' }, highlight: true },
      { name: 'Recharts & Dashboards de BI', level: 'advanced', keyword: { pt: 'Gráficos Interativos, MTTR, SLAs Preditivos', en: 'Interactive Charts, MTTR, Predictive SLAs' }, highlight: true },
      { name: 'Framer Motion', level: 'intermediate', keyword: { pt: 'Micro-interações, Prefers-Reduced-Motion', en: 'Micro-interactions, Prefers-Reduced-Motion' } },
      { name: 'Acessibilidade WCAG 2.1 AA', level: 'advanced', keyword: { pt: 'Focus Trap, WAI-ARIA, Leitores de Tela, Contraste', en: 'Focus Trap, WAI-ARIA, Screen Readers, Contrast' }, highlight: true },
      { name: 'Vue.js', level: 'growing', keyword: { pt: 'Composition API, Reatividade', en: 'Composition API, Reactivity' } },
    ],
  },
  {
    id: 'database',
    title: { pt: 'Bancos de Dados & Armazenamento', en: 'Databases & Storage' },
    description: {
      pt: 'Persistência relacional otimizada, isolamento RLS, consultas enterprise e armazenamento corporativo.',
      en: 'Optimized relational persistence, RLS isolation, enterprise queries, and corporate storage.',
    },
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL & Supabase BaaS', level: 'advanced', keyword: { pt: 'Row-Level Security (RLS), Auth Hooks, Realtime', en: 'Row-Level Security (RLS), Auth Hooks, Realtime' }, highlight: true },
      { name: 'Oracle SQL (TOTVS WinThor)', level: 'intermediate', keyword: { pt: 'Consultas em Lote, Triggers, ERP Integration', en: 'Batch Queries, Triggers, ERP Integration' }, highlight: true },
      { name: 'Certificação Huawei HCIA-Storage', level: 'advanced', keyword: { pt: 'SAN/NAS, RAID, Disaster Recovery, Virtualização', en: 'SAN/NAS, RAID, Disaster Recovery, Virtualization' }, highlight: true },
      { name: 'SQLite & MongoDB', level: 'intermediate', keyword: { pt: 'Persistência Local e Document-Based NoSQL', en: 'Local Embedded & Document-Based NoSQL' } },
      { name: 'Google Sheets API & Apps Script', level: 'advanced', keyword: { pt: 'Automação de Planilhas e Controle de Ativos', en: 'Spreadsheet Automation & Asset Tracking' } },
      { name: 'Neon Serverless Postgres', level: 'intermediate', keyword: { pt: 'Database Branching, Serverless Edge Postgres', en: 'Database Branching, Serverless Edge Postgres' } },
    ],
  },
  {
    id: 'devops-quality',
    title: { pt: 'Qualidade, Cloud & DevOps', en: 'Quality, Cloud & DevOps' },
    description: {
      pt: 'Gates de entrega automatizados, testes rigorosos, CI/CD e segurança defensiva de aplicações.',
      en: 'Automated delivery gates, rigorous test suites, continuous deployment, and defensive AppSec.',
    },
    iconName: 'ShieldCheck',
    skills: [
      { name: 'Pytest (58 Suítes Corporativas)', level: 'advanced', keyword: { pt: 'Testes de Integração, E2E, LGPD e Autenticação', en: 'Integration Tests, E2E, LGPD and Authentication' }, highlight: true },
      { name: 'Playwright (35 Asserções)', level: 'advanced', keyword: { pt: 'Regressão Visual, Checagem de Drift de UI', en: 'Visual Regression, UI Drift Verification' }, highlight: true },
      { name: 'GitHub Actions (CI/CD)', level: 'advanced', keyword: { pt: 'Pipelines Automatizados de Lint, Testes e Go-Live', en: 'Automated Lint, Test and Go-Live Pipelines' }, highlight: true },
      { name: 'Cloudflare Pages & Render', level: 'advanced', keyword: { pt: 'Deploy Contínuo de Frontends e APIs Monorepo', en: 'Continuous Monorepo Frontend & API Deployments' }, highlight: true },
      { name: 'Vercel Edge Platform', level: 'advanced', keyword: { pt: 'Preview Deployments, Serverless Functions, Edge Cache', en: 'Preview Deployments, Serverless Functions, Edge Cache' }, highlight: true },
      { name: 'AppSec & LGPD Compliance', level: 'advanced', keyword: { pt: 'JWT, RLS, CSP, Prevenção contra IDOR e Anonimização', en: 'JWT, RLS, CSP, IDOR Prevention & Anonymization' }, highlight: true },
      { name: 'Docker & Monorepo Git', level: 'intermediate', keyword: { pt: 'Containers Padronizados, Gestão Multi-Pacote', en: 'Standardized Containers, Multi-Package Management' } },
    ],
  },
  {
    id: 'methods',
    title: { pt: 'Métodos & Práticas de Engenharia', en: 'Methods & Engineering Practices' },
    description: {
      pt: 'Engenharia orientada a especificações, comunicação ágil e foco implacável em entrega de valor.',
      en: 'Spec-driven development, agile communication, and a relentless focus on delivering business value.',
    },
    iconName: 'Zap',
    skills: [
      { name: 'Spec-Driven Dev (OpenSpec & BDD)', level: 'advanced', keyword: { pt: 'Especificações Antes do Código, Menor Alucinação', en: 'Specs Before Code, Context Preservation' }, highlight: true },
      { name: 'Arquitetura Maker-Checker', level: 'advanced', keyword: { pt: 'Quem Desenvolve Nunca Aprova o Próprio Código', en: 'Executors Never Validate Their Own Deliveries' }, highlight: true },
      { name: 'Metodologias Ágeis (Scrum / Kanban)', level: 'advanced', keyword: { pt: 'Sprints, Priorização de Backlog, Trello, Jira', en: 'Sprints, Backlog Grooming, Trello, Jira' }, highlight: true },
      { name: 'Documentação Técnica & ADRs', level: 'advanced', keyword: { pt: 'Guias de Contingência, Decisões de Arquitetura', en: 'Contingency Manuals, Architecture Decisions' }, highlight: true },
      { name: 'Comunicação Intersetorial', level: 'advanced', keyword: { pt: 'Tradução de Dores de Negócio em Software', en: 'Translating Business Pains into Working Code' }, highlight: true },
    ],
  },
];
