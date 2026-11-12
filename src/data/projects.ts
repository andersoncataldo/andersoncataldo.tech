import previewCarlo from '../assets/project-carlo-acutis-preview.svg';
import previewPortfolio from '../assets/project-portfolio-preview.svg';
import previewRpa from '../assets/project-rpa-preview.svg';
import previewOps from '../assets/project-ops-dashboard.svg';
import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'central-grupo-mais',
    title: { pt: 'Central Grupo Mais & SSO Corporativo', en: 'Central Grupo Mais & Corporate SSO' },
    subtitle: {
      pt: 'Monorepo Corporativo Unificando 4 Sistemas Internos com Autenticação Centralizada',
      en: 'Corporate Monorepo Unifying 4 Internal Systems with Centralized SSO',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'Full-Stack & Cloud', en: 'Full-Stack & Cloud' },
    description: {
      pt: 'Ecossistema corporativo monorepo com Single Sign-On (JWT) que unifica 4 plataformas críticas da Distribuidora Mais Saúde: Portal Central, Sistema de Chamados, Devoluções e Gestão de Ativos.',
      en: 'Corporate monorepo ecosystem with Single Sign-On (JWT) unifying 4 mission-critical platforms at Distribuidora Mais Saúde: Central Portal, Service Desk, Returns, and IT Asset Management.',
    },
    challenge: {
      pt: 'A organização operava múltiplos silos de informação, com credenciais dispersas, lentidão no fluxo operacional e ausência de padronização arquitetural entre os setores da empresa.',
      en: 'The company operated across fragmented information silos, disjointed credentials, slow operational workflows, and a lack of architectural standardization across business units.',
    },
    role: { pt: 'Arquiteto de Software & Engenheiro Full-Stack', en: 'Software Architect & Full-Stack Engineer' },
    solution: {
      pt: 'Projeto de arquitetura monorepo unificada com front-ends em Next.js 16/React 19 e Vite, back-ends desacoplados em Node.js/Express (TypeScript) e Python/FastAPI, banco PostgreSQL/Supabase com Row-Level Security e esteira de deploy contínuo em Cloudflare Pages + Render.',
      en: 'Architected a unified monorepo with front-ends in Next.js 16/React 19 and Vite, decoupled back-ends in Node.js/Express (TypeScript) and Python/FastAPI, PostgreSQL/Supabase with Row-Level Security, and CI/CD on Cloudflare Pages + Render.',
    },
    architecture: [
      { pt: 'Front-End: Next.js 16 (App Router), React 19, Vite, Tailwind CSS 4', en: 'Front-End: Next.js 16 (App Router), React 19, Vite, Tailwind CSS 4' },
      { pt: 'Back-End: Node.js (Express/TS), Python (FastAPI), Pydantic v2', en: 'Back-End: Node.js (Express/TS), Python (FastAPI), Pydantic v2' },
      { pt: 'Autenticação & Segurança: SSO corporativo via JWT, Row-Level Security (RLS) no PostgreSQL', en: 'Auth & Security: Corporate SSO via JWT, Row-Level Security (RLS) on PostgreSQL' },
      { pt: 'DevOps & Deploy: Monorepo estruturado, Cloudflare Pages e Render com gates de CI/CD', en: 'DevOps & Deploy: Structured monorepo, Cloudflare Pages and Render with CI/CD gates' },
    ],
    result: {
      pt: 'Unificação de 4 fluxos corporativos com login único seguro, zero fricção de acesso para colaboradores e isolamento multi-tenant por RLS.',
      en: 'Unified 4 corporate workflows under a single secure login, zero access friction for employees, and strict multi-tenant isolation via RLS.',
    },
    impact: {
      pt: 'Eliminação de duplicidade de cadastros e ganho massivo de governança operacional e de segurança em toda a empresa.',
      en: 'Eradicated duplicate user profiles and delivered massive operational governance and security compliance across the enterprise.',
    },
    metrics: [
      { label: { pt: 'Sistemas Unificados', en: 'Systems Unified' }, value: '4 em 1' },
      { label: { pt: 'Autenticação', en: 'Authentication' }, value: 'SSO (JWT)' },
      { label: { pt: 'Segurança', en: 'Security' }, value: 'Supabase RLS' },
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'FastAPI', 'Node.js', 'PostgreSQL', 'Supabase', 'Cloudflare Pages'],
    icon: 'Layers',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewOps],
  },
  {
    id: 'sistema-chamados-mais-saude',
    title: { pt: 'Sistema de Chamados Corporativo', en: 'Corporate Service Desk System' },
    subtitle: {
      pt: 'Plataforma Multinível de Atendimento com RBAC Granular e BI com Recharts',
      en: 'Multi-Tier Service Desk Platform with Granular RBAC and Recharts BI',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'Full-Stack & BI', en: 'Full-Stack & BI' },
    description: {
      pt: 'Plataforma enterprise de atendimento técnico e operacional com 4 níveis de hierarquia (solicitante → atendente → gestor → admin), cálculo de SLA preditivo, métricas de MTTR, BI interativo e e-mails transacionais.',
      en: 'Enterprise IT and operational ticketing platform featuring 4 hierarchical tiers (requester → agent → manager → admin), predictive SLA tracking, MTTR metrics, interactive BI dashboards, and transactional emails.',
    },
    challenge: {
      pt: 'O atendimento de chamados internos sofria com desorganização em conversas informais e ausência de visibilidade de SLAs e tempos médios de resolução (MTTR).',
      en: 'Internal incident handling suffered from disorganized informal chats and zero visibility into operational SLAs and Mean Time to Resolution (MTTR).',
    },
    role: { pt: 'Engenheiro Full-Stack (Levantamento ao Deploy)', en: 'Full-Stack Engineer (Requirements to Deploy)' },
    solution: {
      pt: 'Desenvolvimento do sistema ponta a ponta com Next.js 16, React 19, Tailwind CSS 4, Supabase (PostgreSQL com RLS e Auth Hooks), dashboards em Recharts, ações em lote e relatórios automatizados em PDF.',
      en: 'Engineered end-to-end with Next.js 16, React 19, Tailwind CSS 4, Supabase (PostgreSQL with RLS and Auth Hooks), Recharts dashboards, batch ticketing actions, and automated PDF exports.',
    },
    architecture: [
      { pt: 'Front-End: Next.js 16, React 19, Tailwind CSS 4, Recharts, Lucide Icons', en: 'Front-End: Next.js 16, React 19, Tailwind CSS 4, Recharts, Lucide Icons' },
      { pt: 'BaaS & DB: Supabase (PostgreSQL), Custom Auth Hooks, Row-Level Security', en: 'BaaS & DB: Supabase (PostgreSQL), Custom Auth Hooks, Row-Level Security' },
      { pt: 'Negócio: Motor de cálculo preditivo de SLA e medição contínua de MTTR', en: 'Business Logic: Predictive SLA calculation engine and continuous MTTR tracking' },
      { pt: 'Comunicação: E-mails transacionais assíncronos e notificações automáticas de status', en: 'Communication: Asynchronous transactional emails and automated status pings' },
    ],
    result: {
      pt: 'Adoção integral pela empresa com redução drástica no tempo de resposta a incidentes e relatórios gerenciais em tempo real para tomada de decisão.',
      en: '100% adoption across the company with drastic incident turnaround time reduction and real-time management BI reports for decision makers.',
    },
    impact: {
      pt: 'Rastreabilidade total dos chamados da organização com conformidade rigorosa aos SLAs estabelecidos.',
      en: 'Full enterprise incident traceability with strict compliance to established corporate SLAs.',
    },
    metrics: [
      { label: { pt: 'Hierarquia RBAC', en: 'RBAC Levels' }, value: '4 Níveis' },
      { label: { pt: 'Monitoramento SLA', en: 'SLA Tracking' }, value: 'Preditivo' },
      { label: { pt: 'Geração Relatórios', en: 'Reporting' }, value: 'PDF Instantâneo' },
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'PostgreSQL', 'Recharts'],
    icon: 'Server',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewOps],
  },
  {
    id: 'sistema-devolucoes-ia',
    title: { pt: 'Sistema de Devolução com Diagnóstico por IA', en: 'AI-Powered Returns & Reverse Logistics' },
    subtitle: {
      pt: 'Logística Reversa Inteligente com LLM, Análise de Pareto e Modo TV',
      en: 'Intelligent Reverse Logistics with LLM Diagnostics, Pareto Curve & TV Mode',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'IA & Logística', en: 'AI & Logistics' },
    description: {
      pt: 'Sistema corporativo de logística reversa que substituiu formulários e planilhas por triagem automatizada, validação de NF duplicada, Modo TV para a expedição e motor de IA com diagnósticos executivos.',
      en: 'Enterprise reverse logistics system replacing Google Forms and spreadsheets with automated triage, duplicate invoice validation, warehouse TV Mode, and an AI diagnostic engine.',
    },
    challenge: {
      pt: 'O controle manual de devoluções gerava notas duplicadas, falta de rastreio em tempo real no estoque e ausência de análise preditiva das causas-raiz de devolução de produtos.',
      en: 'Manual returns processing caused duplicate credit notes, lack of real-time warehouse visibility, and zero systematic root-cause analytics on product returns.',
    },
    role: { pt: 'Engenheiro de Software & Arquiteto de IA', en: 'Software Engineer & AI Architect' },
    solution: {
      pt: 'Construção da plataforma com React + Vite, API robusta em Python/FastAPI (SQLAlchemy, Alembic, Pydantic v2), testes com Pytest e motor de IA (Gemini/OpenAI) com curva de Pareto, fallback local (< 1s) e sanitização de dados conforme a LGPD.',
      en: 'Built with React + Vite, Python/FastAPI backend (SQLAlchemy, Alembic, Pydantic v2), Pytest test suites, and an AI diagnostic engine (Gemini/OpenAI) with Pareto curve, sub-second heuristic fallback, and LGPD anonymization.',
    },
    architecture: [
      { pt: 'Front-End: React 19, Vite, Tailwind CSS, Modo TV para painel de expedição', en: 'Front-End: React 19, Vite, Tailwind CSS, TV Mode for warehouse displays' },
      { pt: 'Back-End: Python, FastAPI, SQLAlchemy, Alembic, Pydantic v2, Pytest', en: 'Back-End: Python, FastAPI, SQLAlchemy, Alembic, Pydantic v2, Pytest' },
      { pt: 'Motor de IA: Diagnóstico executivo (Gemini/OpenAI) com Pareto, detecção de anomalias e fallback < 1s', en: 'AI Engine: Executive diagnosis (Gemini/OpenAI), Pareto curves, anomaly detection & < 1s fallback' },
      { pt: 'Segurança & LGPD: Anonimização automática de dados de clientes antes da inferência de IA', en: 'Security & LGPD: Automatic PII anonymization prior to LLM inference' },
    ],
    result: {
      pt: 'Eliminação completa de NFs duplicadas, visibilidade de devoluções em tela cheia na expedição e relatórios de IA que apontam as principais causas de avaria de carga.',
      en: '100% eradication of duplicate invoices, full-screen live visibility in shipping, and AI reports pinpointing primary causes of cargo damage.',
    },
    impact: {
      pt: 'Redução de perdas financeiras na logística reversa e insights imediatos para negociação com transportadoras e fabricantes.',
      en: 'Reduced financial shrinkage in reverse logistics and generated immediate insights for vendor and freight carrier negotiations.',
    },
    metrics: [
      { label: { pt: 'Fallback de IA', en: 'AI Fallback' }, value: '< 1 segundo' },
      { label: { pt: 'NFs Duplicadas', en: 'Duplicate Invoices' }, value: 'Zero falhas' },
      { label: { pt: 'Conformidade', en: 'Compliance' }, value: 'LGPD Sanitized' },
    ],
    techStack: ['Python', 'FastAPI', 'React', 'Gemini API', 'OpenAI', 'SQLAlchemy', 'PostgreSQL', 'Pytest'],
    icon: 'Bot',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewOps],
  },
  {
    id: 'ftp-sync-edi-winthor',
    title: { pt: 'FTP_SYNC & Motor EDI WinThor (Oracle)', en: 'FTP_SYNC & WinThor EDI Engine' },
    subtitle: {
      pt: 'Ponte Autônoma SFTP e Robôs de Integração Farmacêutica com ERP TOTVS',
      en: 'Autonomous SFTP Bridge & Pharma EDI Integration Robots with TOTVS ERP',
    },
    category: 'automation',
    categoryLabel: { pt: 'Automação & ERP', en: 'Automation & ERP' },
    description: {
      pt: 'Pipeline autônomo em Python de integração de estoque e faturamento conectando 4 gigantes farmacêuticos (Eurofarma, Eurofarma Genérico, Smartped e Momenta) ao ERP TOTVS WinThor (Oracle) no padrão EDI Pharma Link via FTP/SFTP.',
      en: 'Autonomous Python pipeline for inventory and billing integration connecting 4 pharmaceutical giants (Eurofarma, Eurofarma Generic, Smartped, Momenta) to TOTVS WinThor ERP (Oracle) in EDI Pharma Link format via FTP/SFTP.',
    },
    challenge: {
      pt: 'O download manual de arquivos em servidores FTP, conversão de layout e importação no ERP WinThor Cloud consumia 6 horas diárias de trabalho operacional e estava sujeito a atrasos críticos na liberação de pedidos.',
      en: 'Manual downloading from partner FTPs, layout transformation, and manual import into WinThor Cloud took 6 daily hours of operational work and caused severe shipping delays.',
    },
    role: { pt: 'Engenheiro de Automação & Integração ERP', en: 'Automation & ERP Integration Engineer' },
    solution: {
      pt: 'Desenvolvimento do FTP_SYNC com Paramiko e ftplib rodando a cada 15 min de forma autônoma, com validação de hash, tratamento de layout EDI Pharma Link, empacotamento com PyInstaller e execução agendada.',
      en: 'Developed FTP_SYNC using Paramiko and ftplib running autonomously every 15 minutes, with hash validation, EDI Pharma Link parsing, PyInstaller packaging, and scheduled Windows tasks.',
    },
    architecture: [
      { pt: 'Core: Python 3.11+, Paramiko (SFTP), ftplib, PyInstaller', en: 'Core: Python 3.11+, Paramiko (SFTP), ftplib, PyInstaller' },
      { pt: 'Protocolos & Formatos: EDI Pharma Link, SFTP WinThor Cloud, FTP de Parceiros', en: 'Protocols & Layouts: EDI Pharma Link, WinThor Cloud SFTP, Partner FTPs' },
      { pt: 'Resiliência: Idempotência de arquivos, logs estruturados com rotação e notificações automáticas', en: 'Resilience: File idempotency, rotated structured logging, and automatic alert webhooks' },
      { pt: 'ERP Integrado: TOTVS WinThor (Banco de Dados Oracle)', en: 'Integrated ERP: TOTVS WinThor (Oracle Database)' },
    ],
    result: {
      pt: 'Processo que levava 6 horas manuais passou a ser executado em menos de 10 segundos (−99%), com zero interferência humana e dados 100% sincronizados a cada 15 minutos.',
      en: 'A process that previously took 6 manual hours was reduced to under 10 seconds (-99%), running 24/7 with zero human intervention and refreshed data every 15 minutes.',
    },
    impact: {
      pt: 'Liberação acelerada de cargas hospitalares e farmacêuticas de alta prioridade sem risco de divergência de estoque.',
      en: 'Accelerated dispatch of high-priority hospital and pharmaceutical cargo with zero inventory divergence.',
    },
    metrics: [
      { label: { pt: 'Tempo de Processo', en: 'Process Time' }, value: '6h ➔ < 10s' },
      { label: { pt: 'Ganho de Eficiência', en: 'Efficiency Gain' }, value: '-99%' },
      { label: { pt: 'Frequência de Sync', en: 'Sync Interval' }, value: 'A cada 15 min' },
    ],
    techStack: ['Python', 'SFTP / FTP', 'EDI Pharma Link', 'TOTVS WinThor', 'Oracle SQL', 'Paramiko', 'PyInstaller'],
    icon: 'Bot',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewRpa],
  },
  {
    id: 'rpa-fiscal-3coracoes',
    title: { pt: 'Motor RPA & Extração Fiscal (Grupo 3corações)', en: 'RPA Engine & Tax Data Extraction' },
    subtitle: {
      pt: '5 Robôs em Python para Extração de 15.000 XMLs/mês e Emissão Automática de CNDs',
      en: '5 Python Robots for 15,000 XMLs/mo Extraction and Automated CND Certification',
    },
    category: 'automation',
    categoryLabel: { pt: 'Automação & RPA', en: 'Automation & RPA' },
    description: {
      pt: 'Conjunto de 5 robôs RPA em Python em produção no Grupo 3corações para renovação automática de CNDs em portais do governo, extração massiva de XML fiscais (15.000+/mês) e integração direta com planilhas corporativas.',
      en: 'Suite of 5 production Python RPA robots at Grupo 3corações for automated CND renewals on tax portals, bulk XML extraction (15,000+/mo), and direct corporate spreadsheet reconciliation.',
    },
    challenge: {
      pt: 'A equipe fiscal gastava centenas de horas manuais conferindo notas em portais da SEFAZ e preenchendo planilhas linha a linha, com alto risco de autuações por erro de digitação.',
      en: 'The tax team spent hundreds of manual hours downloading invoices from government portals and typing data into spreadsheets, with severe compliance and penalty risks.',
    },
    role: { pt: 'Desenvolvedor RPA & Analista de Automação', en: 'RPA Developer & Automation Analyst' },
    solution: {
      pt: 'Criação de scripts com Selenium, lxml, BeautifulSoup e Pandas para navegação headless, captura assíncrona, validação rigorosa de schemas fiscais e geração automatizada de relatórios executivos.',
      en: 'Built workers using Selenium, lxml, BeautifulSoup, and Pandas for headless browsing, async downloading, strict schema validation, and automated executive report generation.',
    },
    architecture: [
      { pt: 'Parsing & XML: lxml, BeautifulSoup4, Schemas SEFAZ', en: 'Parsing & XML: lxml, BeautifulSoup4, SEFAZ Schemas' },
      { pt: 'Automação Web: Selenium Headless, Requests, Captura de CNDs', en: 'Web Automation: Headless Selenium, Requests, CND Capture' },
      { pt: 'ETL & Dados: Pandas, OpenPyXL, exportação para conciliação contábil', en: 'ETL & Data: Pandas, OpenPyXL, export for accounting reconciliation' },
    ],
    result: {
      pt: 'Mais de 15.000 XMLs processados mensalmente com 99.85% de precisão e mais de 200 horas operacionais poupadas para a equipe fiscal.',
      en: 'Over 15,000 XMLs processed monthly with 99.85% precision and 200+ manual hours saved for the tax department.',
    },
    impact: {
      pt: 'Risco de inconsistência tributária zerado e produtividade da equipe direcionada para análise estratégica.',
      en: 'Tax inconsistency risk eradicated and team productivity redirected to strategic financial planning.',
    },
    metrics: [
      { label: { pt: 'Volume Mensal', en: 'Monthly Volume' }, value: '15.000+ XMLs' },
      { label: { pt: 'Horas Poupadas', en: 'Hours Saved' }, value: '200h+' },
      { label: { pt: 'Acurácia SEFAZ', en: 'SEFAZ Accuracy' }, value: '99.85%' },
    ],
    techStack: ['Python', 'RPA', 'Pandas', 'Selenium', 'lxml', 'BeautifulSoup', 'Excel Automation'],
    icon: 'Bot',
    github: 'https://github.com/andersoncataldo',
    featured: true,
    images: [previewRpa],
  },
  {
    id: 'squad-agentes-ia',
    title: { pt: 'Squad de Agentes de IA Autônomos', en: 'Autonomous AI Agent Squad' },
    subtitle: {
      pt: 'Arquitetura Multiagente com Memória Compartilhada e Orquestrador 24/7',
      en: 'Multi-Agent Architecture with Shared Memory and 24/7 Orchestrator',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'IA & Sistemas Multiagente', en: 'AI & Multi-Agent Systems' },
    description: {
      pt: 'Arquitetura de sistemas multiagente construída do zero para dominar os fundamentos de orquestração de LLMs: personas especializadas por papel, memória e contexto compartilhado em JSON, e gerenciamento de processos via PM2.',
      en: 'Multi-agent architecture built from scratch to master the foundational mechanics of LLM orchestration: specialized role-based personas, shared JSON context memory, and 24/7 PM2 process management.',
    },
    challenge: {
      pt: 'Construir um sistema multiagente resiliente capaz de colaborar na resolução de problemas complexos sem perder contexto ou entrar em loops infinitos de alucinação.',
      en: 'Build a resilient multi-agent collective capable of collaborating on complex tasks without losing context or entering hallucination loops.',
    },
    role: { pt: 'Pesquisador & Engenheiro de IA', en: 'AI Researcher & Engineer' },
    solution: {
      pt: 'Implementação em Node.js com a API do Google Gemini, sistema de arquivos como barramento de memória compartilhada, máquina de estados finitos para delegação entre agentes e daemon de supervisão com PM2.',
      en: 'Implemented in Node.js using Google Gemini API, filesystem-based shared context bus, finite state machine for agent handoffs, and PM2 process supervision.',
    },
    architecture: [
      { pt: 'Core: Node.js, Google Gemini API, PM2 Daemon', en: 'Core: Node.js, Google Gemini API, PM2 Daemon' },
      { pt: 'Memória: Context Bus compartilhado em JSON com histórico conversacional', en: 'Memory: Shared JSON Context Bus with conversational memory buffers' },
      { pt: 'Orquestração: Padrão maker-checker e validação de contratos de saída com Zod', en: 'Orchestration: Maker-checker pattern and output contract enforcement via Zod' },
    ],
    result: {
      pt: 'Operação autônoma estável 24/7 com execução de tarefas distribuídas e relatórios analíticos de alta consistência.',
      en: 'Stable 24/7 autonomous execution with distributed task handling and highly consistent analytical reporting.',
    },
    impact: {
      pt: 'Base teórica e prática sólida aplicada diretamente no desenvolvimento corporativo assistido por IA e na criação do ecossistema de 9 agentes da Mais Saúde.',
      en: 'Solid foundational mastery applied directly to AI-assisted corporate engineering and the 9-agent squad at Mais Saúde.',
    },
    metrics: [
      { label: { pt: 'Disponibilidade', en: 'Uptime' }, value: '24/7 (PM2)' },
      { label: { pt: 'Modelo', en: 'LLM Model' }, value: 'Google Gemini' },
      { label: { pt: 'Orquestração', en: 'Orchestration' }, value: 'Multiagente' },
    ],
    techStack: ['Node.js', 'Google Gemini API', 'PM2', 'Multi-Agent', 'Prompt Engineering', 'TypeScript'],
    icon: 'Cpu',
    github: 'https://github.com/andersoncataldo',
    featured: false,
    images: [previewCarlo],
  },
  {
    id: 'sistema-ativos-ti',
    title: { pt: 'Sistema de Ativos de TI & Termos SHA-256', en: 'IT Asset Management & SHA-256 Custody' },
    subtitle: {
      pt: 'Gestão de Inventário com Aprovação em 2 Níveis e Integridade Criptográfica',
      en: 'Inventory Management with 2-Step Approval and Cryptographic Integrity',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'Full-Stack & Segurança', en: 'Full-Stack & Security' },
    description: {
      pt: 'Sistema corporativo para controle de inventário e custódia de equipamentos de informática com esteira de aprovação em 2 níveis, histórico auditado por triggers no PostgreSQL e geração de termos (.docx) com assinatura de hash SHA-256.',
      en: 'Corporate IT equipment custody and inventory platform with a 2-tier approval flow, audit history via PostgreSQL triggers, and automated .docx Responsibility Term generation signed with SHA-256 cryptographic hashes.',
    },
    challenge: {
      pt: 'O controle de empréstimo de notebooks e periféricos carecia de governança, gerando perdas patrimoniais e termos de responsabilidade em papel sem rastreabilidade legal.',
      en: 'Hardware checkout lacked governance, leading to corporate asset loss and untracked paper sign-offs lacking digital proof of tamper resistance.',
    },
    role: { pt: 'Engenheiro Full-Stack', en: 'Full-Stack Engineer' },
    solution: {
      pt: 'Desenvolvimento com Next.js, Node.js e Supabase/PostgreSQL. Implementação de triggers de auditoria imutável e automação de emissão de documentos com cálculo de hash SHA-256 gravado no banco de dados.',
      en: 'Engineered with Next.js, Node.js, and Supabase/PostgreSQL. Implemented immutable database audit triggers and document generator hashing every signed term with SHA-256.',
    },
    architecture: [
      { pt: 'Front-End: Next.js (App Router), React, Tailwind CSS', en: 'Front-End: Next.js (App Router), React, Tailwind CSS' },
      { pt: 'Back-End & DB: Node.js, Supabase, Triggers SQL imutáveis de auditoria', en: 'Back-End & DB: Node.js, Supabase, Immutable SQL audit triggers' },
      { pt: 'Criptografia: Hash SHA-256 para verificação de integridade de termos', en: 'Cryptography: SHA-256 hashing for tamper-evident document verification' },
    ],
    result: {
      pt: '100% dos ativos corporativos inventariados e termos digitais gerados com prova de integridade antifraude.',
      en: '100% of enterprise assets inventoried and digital sign-offs issued with tamper-proof integrity proofs.',
    },
    impact: {
      pt: 'Compliance total do departamento de TI com normas de patrimônio e segurança da informação.',
      en: 'Full IT department compliance with internal asset governance and information security regulations.',
    },
    metrics: [
      { label: { pt: 'Aprovação', en: 'Approval' }, value: '2 Níveis' },
      { label: { pt: 'Integridade', en: 'Integrity' }, value: 'Hash SHA-256' },
      { label: { pt: 'Auditoria', en: 'Audit' }, value: 'Triggers SQL' },
    ],
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'SHA-256'],
    icon: 'ShieldCheck',
    github: 'https://github.com/andersoncataldo',
    featured: false,
    images: [previewOps],
  },
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
      pt: 'Desenvolvimento do front-end em React + TypeScript com componentização modular. Back-end robusto com persistência relacional no Supabase/PostgreSQL e deploy otimizado na Vercel.',
      en: 'Front-end built with React + TypeScript using modular componentization. Robust back-end with relational persistence on Supabase/PostgreSQL and optimized deployment on Vercel.',
    },
    architecture: [
      { pt: 'Front-End: React 18, TypeScript, Tailwind CSS, Lucide Icons', en: 'Front-End: React 18, TypeScript, Tailwind CSS, Lucide Icons' },
      { pt: 'Banco de Dados: Supabase / PostgreSQL com modelagem relacional de usuários e pontuações', en: 'Database: Supabase / PostgreSQL with relational modeling of users and scores' },
      { pt: 'Infraestrutura & Deploy: Vercel com CI/CD contínuo', en: 'Infrastructure & Deploy: Vercel with continuous CI/CD' },
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
      { label: { pt: 'Disponibilidade', en: 'Availability' }, value: '100%' },
      { label: { pt: 'Deploy', en: 'Deploy' }, value: 'Vercel Edge' },
    ],
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vercel'],
    icon: 'Layout',
    github: 'https://github.com/andersoncataldo/CarloAcutis',
    liveDemo: 'https://carlo-acutis-virid.vercel.app',
    featured: false,
    images: [previewCarlo],
  },
  {
    id: 'portfolio-web-tech',
    title: { pt: 'Portfólio Web SaaS de Alta Performance', en: 'High-Performance SaaS Web Portfolio' },
    subtitle: {
      pt: 'Arquitetura Front-End Moderna com Acessibilidade WCAG AA, Terminal CLI e Command Palette',
      en: 'Modern Front-End Architecture with WCAG AA Accessibility, Interactive CLI & Command Palette',
    },
    category: 'frontend',
    categoryLabel: { pt: 'Front-End & Craft', en: 'Front-End & Craft' },
    description: {
      pt: 'Interface pessoal projetada no mais alto padrão de craft de engenharia (estilo Linear e Raycast), implementando tokens Tailwind v4, modo escuro/claro perfeito, Command Palette global, simulador de ROI e terminal executável.',
      en: 'Personal engineering showcase built to Silicon Valley craft standards (Linear and Raycast style), featuring Tailwind v4 tokens, flawless dark/light mode, global Command Palette, ROI calculator, and interactive CLI.',
    },
    challenge: {
      pt: 'Construir uma vitrine que combine velocidade instantânea (<1.5s), 100% em SEO e Acessibilidade (WCAG 2.1 AA) e interatividade de software de ponta.',
      en: 'Build a showcase blending sub-1.5s load speeds, 100% SEO and WCAG 2.1 AA accessibility, and deep software-like interactivity.',
    },
    role: { pt: 'Lead Front-End & UI/UX Engineer', en: 'Lead Front-End & UI/UX Engineer' },
    solution: {
      pt: 'Construção com React 18, TypeScript, Tailwind CSS v4, Framer Motion respeitando prefers-reduced-motion, atalhos de teclado e arquitetura modular.',
      en: 'Crafted with React 18, TypeScript, Tailwind CSS v4, Framer Motion honoring prefers-reduced-motion, keyboard accessibility, and modular architecture.',
    },
    architecture: [
      { pt: 'Bundler: Vite 6 com code-splitting e tree-shaking agressivo', en: 'Bundler: Vite 6 with aggressive code-splitting and tree-shaking' },
      { pt: 'Design: Tailwind CSS v4 com tokens nativos no @theme', en: 'Design: Tailwind CSS v4 with native tokens via @theme' },
      { pt: 'Acessibilidade: WCAG 2.1 AA, navegação via teclado, focus trap em modais e leitores de tela', en: 'Accessibility: WCAG 2.1 AA, keyboard navigation, modal focus traps, and screen-readers' },
      { pt: 'Interatividade: Command Palette (Ctrl+K), Terminal CLI executável e simulador de ROI', en: 'Interactivity: Command Palette (Ctrl+K), executable CLI terminal, and ROI calculator' },
    ],
    result: {
      pt: '100% de conformidade com TypeScript estrito, carregamento instantâneo e nota máxima em qualidade técnica.',
      en: '100% strict TypeScript compliance, instant loading, and maximum technical quality rating.',
    },
    impact: {
      pt: 'Apresentação técnica impecável que atrai recrutadores e lideranças técnicas de alto nível.',
      en: 'Flawless engineering presentation engaging high-caliber tech recruiters and engineering leadership.',
    },
    metrics: [
      { label: { pt: 'Lighthouse Score', en: 'Lighthouse Score' }, value: '98+' },
      { label: { pt: 'Acessibilidade', en: 'Accessibility' }, value: 'WCAG AA' },
      { label: { pt: 'Padrão Visual', en: 'Design Standard' }, value: 'SaaS Craft' },
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Vite', 'SEO'],
    icon: 'BookOpen',
    github: 'https://github.com/andersoncataldo/andersoncataldo.tech',
    liveDemo: 'https://andersoncataldo.tech',
    featured: false,
    images: [previewPortfolio],
  },
];
