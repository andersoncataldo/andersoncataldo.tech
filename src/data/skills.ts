import { SkillCategory } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-agents',
    title: { pt: 'IA Aplicada & Orquestração de Agentes', en: 'Applied AI & Agent Orchestration' },
    description: {
      pt: 'Orquestração e multiplexação de agentes de IA, engenharia de prompt rigorosa e integração com LLMs em produção.',
      en: 'AI agent orchestration & multiplexing, strict prompt engineering, and production LLM integrations.',
    },
    iconName: 'Bot',
    skills: [
      { name: 'Orquestração Multiagente (Maker-Checker)', level: 'advanced', keyword: { pt: 'Claude Code, Antigravity CLI, Fluxos em Paralelo', en: 'Claude Code, Antigravity CLI, Parallel Workflows' }, highlight: true },
      { name: 'MCP (Model Context Protocol)', level: 'advanced', keyword: { pt: 'Servidores MCP, Conectores de Ferramentas & Contexto', en: 'MCP Servers, Tool Connectors & Context' }, highlight: true },
      { name: 'Google Gemini API & OpenAI', level: 'advanced', keyword: { pt: 'Diagnóstico por IA, Gemini Vision, Structured JSON', en: 'AI Diagnostics, Gemini Vision, Structured JSON' }, highlight: true },
      { name: 'Guardrails, Evals & Anti-Alucinação', level: 'advanced', keyword: { pt: 'Validação Zod/Pydantic, CRAG + CoVe, Fallback < 1s', en: 'Zod/Pydantic Contracts, CRAG + CoVe, < 1s Fallback' }, highlight: true },
      { name: 'Multiplexação CLI em Linux/WSL2', level: 'intermediate', keyword: { pt: 'Herdr, RTK (Economia de Tokens), Ponytail, git worktree', en: 'Herdr, RTK (Token Efficiency), Ponytail, git worktree' }, highlight: true },
      { name: 'Machine Learning & NumPy', level: 'intermediate', keyword: { pt: 'Regressão Linear, kNN, Perceptron, k-fold CV sem frameworks', en: 'Linear Regression, kNN, Perceptron, manual k-fold CV' } },
    ],
  },
  {
    id: 'frontend',
    title: { pt: 'Front-End & UI SaaS', en: 'Front-End & SaaS UI' },
    description: {
      pt: 'Aplicações web rápidas, design systems consistentes, acessibilidade WCAG AA e foco em experiência do usuário.',
      en: 'Fast web applications, consistent design systems, WCAG AA accessibility, and polished UX.',
    },
    iconName: 'Layout',
    skills: [
      { name: 'TypeScript', level: 'advanced', keyword: { pt: 'Strict Mode, Generics, Type Safety Ponta a Ponta', en: 'Strict Mode, Generics, End-to-End Type Safety' }, highlight: true },
      { name: 'React 19 / 18', level: 'advanced', keyword: { pt: 'Custom Hooks, Context API, Suspense, ErrorBoundary', en: 'Custom Hooks, Context API, Suspense, ErrorBoundary' }, highlight: true },
      { name: 'Next.js 16 (App Router)', level: 'advanced', keyword: { pt: 'Server Actions, SSR, SSG, Edge Runtime', en: 'Server Actions, SSR, SSG, Edge Runtime' }, highlight: true },
      { name: 'Tailwind CSS 4 & Vite 6', level: 'advanced', keyword: { pt: 'Design Tokens, Dark/Light Mode, PWA Offline-First', en: 'Design Tokens, Dark/Light Mode, Offline-First PWA' }, highlight: true },
      { name: 'Recharts & Dashboards de BI', level: 'intermediate', keyword: { pt: 'Gráficos Interativos, MTTR, SLAs Preditivos', en: 'Interactive Charts, MTTR, Predictive SLAs' } },
      { name: 'Acessibilidade WCAG 2.1 AA', level: 'intermediate', keyword: { pt: 'Focus Trap, WAI-ARIA, Leitores de Tela, Contraste', en: 'Focus Trap, WAI-ARIA, Screen Readers, Contrast' }, highlight: true },
      { name: 'Framer Motion', level: 'intermediate', keyword: { pt: 'Micro-interações, Prefers-Reduced-Motion', en: 'Micro-interactions, Prefers-Reduced-Motion' } },
      { name: 'Vue.js', level: 'growing', keyword: { pt: 'Composition API, Reatividade', en: 'Composition API, Reactivity' } },
    ],
  },
  {
    id: 'backend',
    title: { pt: 'Back-End & Arquitetura de APIs', en: 'Back-End & API Architecture' },
    description: {
      pt: 'Serviços desacoplados em Python e Node.js, autenticação corporativa e contratos estritos de validação.',
      en: 'Decoupled services in Python and Node.js, corporate authentication, and strict runtime validation contracts.',
    },
    iconName: 'Server',
    skills: [
      { name: 'Python & FastAPI', level: 'advanced', keyword: { pt: 'Pydantic v2, SQLAlchemy, Alembic, APIs Assíncronas', en: 'Pydantic v2, SQLAlchemy, Alembic, Async APIs' }, highlight: true },
      { name: 'Node.js & Express (TypeScript)', level: 'advanced', keyword: { pt: 'APIs RESTful, Middlewares, Clean Architecture', en: 'RESTful APIs, Middlewares, Clean Architecture' }, highlight: true },
      { name: 'Autenticação JWT, SSO & RBAC', level: 'advanced', keyword: { pt: 'Single Sign-On Corporativo, 4 Níveis de Acesso', en: 'Corporate Single Sign-On, 4 Role Tiers' }, highlight: true },
      { name: 'Zod & Pydantic Validation', level: 'advanced', keyword: { pt: 'Tipagem Estrita em Tempo de Execução', en: 'Strict Runtime Type Validation' } },
      { name: 'Java & Spring Boot', level: 'intermediate', keyword: { pt: 'Spring Data JPA, Hibernate, Maven, REST APIs', en: 'Spring Data JPA, Hibernate, Maven, REST APIs' } },
      { name: 'Django & REST Framework', level: 'intermediate', keyword: { pt: 'ORM, Painel Admin, Endpoints REST', en: 'ORM, Admin Panel, REST Endpoints' } },
    ],
  },
  {
    id: 'automation',
    title: { pt: 'Automação & RPA Industrial', en: 'Automation & Industrial RPA' },
    description: {
      pt: 'Eliminação de gargalos operacionais com robôs Python conectados a ERPs, bancos e portais corporativos.',
      en: 'Eliminating operational bottlenecks with Python robots connected to ERPs, banks, and corporate portals.',
    },
    iconName: 'Cpu',
    skills: [
      { name: 'Python RPA & Automação', level: 'advanced', keyword: { pt: '15 Robôs Entregues, Redução de Horas para Segundos', en: '15 Shipped Robots, Hours Reduced to Seconds' }, highlight: true },
      { name: 'Integração WinThor ERP (Oracle)', level: 'advanced', keyword: { pt: 'Consultas em Lote, Atualização de Catálogos e Estoque', en: 'Batch Queries, Inventory & Catalog Sync' }, highlight: true },
      { name: 'EDI Pharma Link & FTP/SFTP', level: 'advanced', keyword: { pt: 'Paramiko, ftplib, Sync a cada 15 min, >99,9% ganho', en: 'Paramiko, ftplib, 15-min Sync Intervals, >99.9% gain' }, highlight: true },
      { name: 'Parsing XML/PDF/Excel (SEFAZ & Bancos)', level: 'advanced', keyword: { pt: 'lxml, pdfplumber, OpenPyXL, Pandas, Decimal', en: 'lxml, pdfplumber, OpenPyXL, Pandas, Decimal' }, highlight: true },
      { name: 'Playwright & Selenium Headless', level: 'advanced', keyword: { pt: 'Web Scraping, Emissão de CNDs, Portais Governamentais', en: 'Web Scraping, CND Certificates, Gov Portals' } },
      { name: 'Streamlit, PyInstaller & Apps Script', level: 'intermediate', keyword: { pt: 'Painéis Executivos, Executáveis Standalone, Planilhas', en: 'Executive Dashboards, Standalone Executables, Sheets' } },
    ],
  },
  {
    id: 'database',
    title: { pt: 'Bancos de Dados & Armazenamento', en: 'Databases & Storage' },
    description: {
      pt: 'Persistência relacional e orientada a grafos, isolamento RLS, consultas enterprise e storage corporativo.',
      en: 'Relational and graph persistence, RLS isolation, enterprise queries, and corporate storage.',
    },
    iconName: 'Database',
    skills: [
      { name: 'PostgreSQL & Supabase BaaS', level: 'advanced', keyword: { pt: 'Row-Level Security (RLS), Auth Hooks, RPCs SECURITY DEFINER', en: 'Row-Level Security (RLS), Auth Hooks, SECURITY DEFINER RPCs' }, highlight: true },
      { name: 'Oracle SQL (TOTVS WinThor)', level: 'intermediate', keyword: { pt: 'Consultas em Lote, Triggers, Integração ERP', en: 'Batch Queries, Triggers, ERP Integration' }, highlight: true },
      { name: 'Neo4j & Cypher (NoSQL Grafos)', level: 'intermediate', keyword: { pt: 'Modelagem em Grafos, Sistemas de Recomendação, CRUD', en: 'Graph Modeling, Recommendation Engines, CRUD' } },
      { name: 'Certificação Huawei HCIA-Storage', level: 'intermediate', keyword: { pt: 'SAN/NAS, RAID, Disaster Recovery, Virtualização', en: 'SAN/NAS, RAID, Disaster Recovery, Virtualization' }, highlight: true },
      { name: 'SQLite, MongoDB & Neon Serverless', level: 'intermediate', keyword: { pt: 'Persistência Local, NoSQL Documental, Edge Postgres', en: 'Embedded Local, Document NoSQL, Edge Postgres' } },
    ],
  },
  {
    id: 'devops-quality',
    title: { pt: 'Qualidade, Linux & Cloud', en: 'Quality, Linux & Cloud' },
    description: {
      pt: 'Gates de entrega automatizados, ambiente Linux produtivo para agentes, CI/CD e segurança defensiva.',
      en: 'Automated delivery gates, high-velocity Linux agent workflows, CI/CD, and defensive AppSec.',
    },
    iconName: 'ShieldCheck',
    skills: [
      { name: 'Pytest (58+ Suítes Corporativas)', level: 'advanced', keyword: { pt: 'Testes Unitários, Integração, E2E, LGPD e Idempotência', en: 'Unit, Integration, E2E, LGPD, and Idempotency Tests' }, highlight: true },
      { name: 'Playwright (35 Asserções Visuais)', level: 'advanced', keyword: { pt: 'Regressão Visual, Checagem de Drift de UI', en: 'Visual Regression, UI Drift Verification' }, highlight: true },
      { name: 'Linux (Ubuntu/WSL2) & CLI Produtiva', level: 'advanced', keyword: { pt: 'git worktree, Herdr, RTK, gh, pnpm, ripgrep, lazygit', en: 'git worktree, Herdr, RTK, gh, pnpm, ripgrep, lazygit' }, highlight: true },
      { name: 'Vercel Edge, Cloudflare Pages & Render', level: 'advanced', keyword: { pt: 'Deploy Contínuo, Serverless/Edge Functions, Monorepos', en: 'Continuous Deploy, Serverless/Edge Functions, Monorepos' }, highlight: true },
      { name: 'GitHub Actions (CI/CD)', level: 'intermediate', keyword: { pt: 'Pipelines de Lint, Testes, Evals e Smoke Tests', en: 'Lint, Test, Evals, and Smoke Test Pipelines' } },
      { name: 'AppSec & LGPD Compliance', level: 'intermediate', keyword: { pt: 'JWT, RLS, CSP, Prevenção contra IDOR e Anonimização', en: 'JWT, RLS, CSP, IDOR Prevention & Anonymization' }, highlight: true },
      { name: 'Docker & Monorepo Git', level: 'intermediate', keyword: { pt: 'Containers Padronizados, Gestão Multi-Pacote', en: 'Standardized Containers, Multi-Package Management' } },
    ],
  },
  {
    id: 'methods',
    title: { pt: 'Métodos & Práticas de Engenharia', en: 'Methods & Engineering Practices' },
    description: {
      pt: 'Engenharia orientada a especificações, governança de entregas e comunicação clara com negócio.',
      en: 'Spec-driven engineering, delivery governance, and clear business communication.',
    },
    iconName: 'Zap',
    skills: [
      { name: 'Spec-Driven Dev (OpenSpec & BDD)', level: 'advanced', keyword: { pt: 'Especificações Antes do Código, Menor Alucinação', en: 'Specs Before Code, Lower Hallucination' }, highlight: true },
      { name: 'Arquitetura Maker-Checker', level: 'advanced', keyword: { pt: 'Separação entre Execução e Validação Independente', en: 'Separation Between Execution & Independent Validation' }, highlight: true },
      { name: 'Documentação Técnica & ADRs', level: 'intermediate', keyword: { pt: 'Playbooks de Contingência, Decisões de Arquitetura', en: 'Contingency Playbooks, Architecture Decisions' } },
      { name: 'Metodologias Ágeis (Scrum / Kanban)', level: 'intermediate', keyword: { pt: 'Sprints, Priorização de Backlog, Entrega Contínua', en: 'Sprints, Backlog Prioritization, Continuous Delivery' } },
    ],
  },
];
