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
      pt: 'A organização operava múltiplos silos de informação, com credenciais dispersas, lentidão no fluxo operacional e ausência de padronização entre os setores da empresa.',
      en: 'The company operated across fragmented information silos, disjointed credentials, slow operational workflows, and a lack of standardization across business units.',
    },
    role: { pt: 'Desenvolvedor Full-Stack (Implementação & Qualidade)', en: 'Full-Stack Developer (Implementation & Quality)' },
    solution: {
      pt: 'Desenvolvimento de funcionalidades sobre arquitetura monorepo definida pela gestão, com front-ends em Next.js 16/React 19 e Vite, back-ends desacoplados em Node.js/Express (TypeScript) e Python/FastAPI, PostgreSQL/Supabase com Row-Level Security e deploy contínuo em Cloudflare Pages + Render.',
      en: 'Developed features across a management-architected monorepo with Next.js 16/React 19 and Vite front-ends, decoupled Node.js/Express (TypeScript) and Python/FastAPI back-ends, PostgreSQL/Supabase with Row-Level Security, and CI/CD on Cloudflare Pages + Render.',
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
      pt: 'Eliminação de duplicidade de cadastros e ganho expressivo de governança operacional e segurança em toda a empresa.',
      en: 'Eradicated duplicate user profiles and delivered substantial operational governance and security compliance across the enterprise.',
    },
    metrics: [
      { label: { pt: 'Sistemas Unificados', en: 'Systems Unified' }, value: '4 em 1' },
      { label: { pt: 'Autenticação', en: 'Authentication' }, value: 'SSO (JWT)' },
      { label: { pt: 'Segurança', en: 'Security' }, value: 'Supabase RLS' },
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'FastAPI', 'Node.js', 'PostgreSQL', 'Supabase', 'Cloudflare Pages'],
    icon: 'Layers',
    featured: true,
  },
  {
    id: 'rpa-extrato-bancario',
    title: { pt: 'RPA Extratos — Consolidação Automática Bancária', en: 'Bank Statement RPA Consolidation Engine' },
    subtitle: {
      pt: 'Pipeline Híbrido Determinístico + Gemini Vision com Reconciliação Decimal e Painel Streamlit',
      en: 'Hybrid Deterministic + Gemini Vision Pipeline with Decimal Reconciliation & Streamlit UI',
    },
    category: 'automation',
    categoryLabel: { pt: 'RPA & IA Aplicada', en: 'RPA & Applied AI' },
    description: {
      pt: 'Automação ponta a ponta em Python que ingere extratos bancários heterogêneos (PDF, Excel .xlsx e capturas de tela PNG), aplica detecção de layout por conteúdo, reconciliação aritmética exata em Decimal e gera planilhas consolidadas com logs auditáveis em JSON.',
      en: 'End-to-end Python automation ingesting heterogeneous bank statements (PDF, Excel .xlsx, and PNG screenshots), applying content-based layout classification, exact Decimal arithmetic reconciliation, and generating consolidated workbooks with auditable JSON logs.',
    },
    challenge: {
      pt: 'Consolidar extratos bancários de múltiplos bancos em formatos inconsistentes sem perder rastreabilidade, preservando precisão em centavos e isolando falhas por arquivo sem interromper o lote.',
      en: 'Consolidate multi-bank statements across inconsistent layouts without losing traceability, preserving cent-level arithmetic accuracy and isolating per-file failures without halting the batch.',
    },
    role: { pt: 'Engenheiro Full-Stack & Automação RPA', en: 'Full-Stack & RPA Automation Engineer' },
    solution: {
      pt: 'Arquitetura determinística primeiro (`pdfplumber` + `openpyxl`), reservando a API do Google Gemini (`temperature=0` + JSON Schema validado por Pydantic) exclusivamente para imagens PNG — sempre submetidas à reconciliação aritmética em `Decimal`, detecção de duplicidade por SHA-256, 52+ testes Pytest e interface interativa em Streamlit.',
      en: 'Deterministic-first architecture (`pdfplumber` + `openpyxl`), reserving Google Gemini API (`temperature=0` + Pydantic-validated JSON Schema) strictly for PNG images — always verified by `Decimal` arithmetic reconciliation, SHA-256 duplicate detection, 52+ Pytest tests, and an interactive Streamlit dashboard.',
    },
    architecture: [
      { pt: 'Pipeline em 5 Etapas: Descoberta (SHA-256) → Classificação (magic bytes/conteúdo) → Extração → Validação → Consolidação', en: '5-Stage Pipeline: Discovery (SHA-256) → Classification (magic bytes/content) → Extraction → Validation → Consolidation' },
      { pt: 'Extratores Desacoplados: pdfplumber (PDF), openpyxl (Excel) e Google Gemini Vision + Pydantic (PNG)', en: 'Decoupled Extractors: pdfplumber (PDF), openpyxl (Excel), and Google Gemini Vision + Pydantic (PNG)' },
      { pt: 'Confiabilidade & Testes: Reconciliação exata em Decimal, isolamento de falhas, 52+ testes Pytest e GitHub Actions', en: 'Reliability & Testing: Exact Decimal reconciliation, failure isolation, 52+ Pytest tests, and GitHub Actions CI' },
      { pt: 'Observabilidade & UI: Painel interativo Streamlit (modo Demo + Ao Vivo) com download de XLSX e logs estruturados', en: 'Observability & UI: Interactive Streamlit dashboard (Demo + Live modes) with XLSX and structured log exports' },
    ],
    result: {
      pt: 'Redução estimada de 87% no tempo de fechamento mensal (de ~2,77 h para ~21 min incluindo revisão de exceções), com 100% de rastreabilidade por arquivo e 52+ testes automatizados aprovados.',
      en: 'Estimated 87% reduction in monthly closing time (~2.77 h down to ~21 min including exception review), with 100% per-file traceability and 52+ passing automated tests.',
    },
    impact: {
      pt: 'Prova pública verificável combinando engenharia Python limpa, validação estrita de contratos, uso econômico de LLMs (~US$ 0,03/lote) e interface executiva pronta para auditoria.',
      en: 'Public, verifiable proof combining clean Python engineering, strict contract validation, cost-efficient LLM usage (~$0.03/batch), and an audit-ready executive interface.',
    },
    metrics: [
      { label: { pt: 'Redução de Tempo', en: 'Time Reduction' }, value: '~87%' },
      { label: { pt: 'Testes Pytest', en: 'Pytest Suite' }, value: '52+ testes' },
      { label: { pt: 'Auditoria', en: 'Audit Trail' }, value: 'SHA-256 + Decimal' },
    ],
    techStack: ['Python', 'Pydantic', 'Gemini API', 'Streamlit', 'Pytest', 'pdfplumber', 'OpenPyXL', 'GitHub Actions'],
    icon: 'Bot',
    github: 'https://github.com/andersoncataldo/case-rpa-consolidacao-extratos',
    liveDemo: 'https://case-rpa-consolidacao-extratos.streamlit.app/',
    featured: true,
  },
  {
    id: 'portfolio-web-tech',
    title: { pt: 'Portfólio Web SaaS & Agente Anderson AI', en: 'SaaS Web Portfolio & Anderson AI Agent' },
    subtitle: {
      pt: 'Arquitetura Full-Stack Edge com CRAG, Tool Calling Gemini, Cache L1/L2 Supabase e WCAG AA',
      en: 'Full-Stack Edge Architecture with CRAG, Gemini Tool Calling, Supabase L1/L2 Cache & WCAG AA',
    },
    category: 'fullstack',
    categoryLabel: { pt: 'IA Aplicada & Full-Stack', en: 'Applied AI & Full-Stack' },
    description: {
      pt: 'Plataforma pessoal de engenharia unindo front-end modular com lazy loading, PWA offline-first, Command Palette (Ctrl+K), terminal CLI executável e o agente conversacional Anderson AI com pipeline híbrido CRAG + CoVe, Function Calling e persistência segura no Supabase.',
      en: 'Personal engineering platform uniting lazy-loaded modular UI, offline-first PWA, Command Palette (Ctrl+K), executable CLI terminal, and the Anderson AI agent powered by a hybrid CRAG + CoVe pipeline, Function Calling, and secure Supabase persistence.',
    },
    challenge: {
      pt: 'Combinar carregamento inicial leve (<115 kB gzip no chunk principal) e acessibilidade WCAG 2.1 AA com um agente de IA em produção que entregue 0% de alucinação, fallback multi-modelo resiliente e segurança LGPD sem expor chaves privilegiadas no Edge.',
      en: 'Combine a lightweight initial bundle (<115 kB gzip main chunk) and WCAG 2.1 AA accessibility with a production AI agent delivering 0% hallucinations, resilient multi-model fallback, and LGPD security without exposing privileged keys on the Edge.',
    },
    role: { pt: 'Engenheiro Full-Stack & Sistemas de IA', en: 'Full-Stack & AI Systems Engineer' },
    solution: {
      pt: 'Pipeline híbrido de 5 etapas (BM25 + Cosseno + RRF + MMR + Chain-of-Verification) em TypeScript acoplado ao Gemini 3.8 Flash / 3.5 Flash-Lite via SSE com Tool Calling (LeadForm, navegação e CV), cache L1/L2 no Supabase com invalidação por feedback negativo e RPCs autenticadas via AI_WRITE_SECRET.',
      en: '5-stage hybrid pipeline (BM25 + Cosine + RRF + MMR + Chain-of-Verification) in TypeScript paired with Gemini 3.8 Flash / 3.5 Flash-Lite over SSE with Tool Calling (LeadForm, section navigation, CV download), Supabase L1/L2 cache with negative-feedback invalidation, and AI_WRITE_SECRET-guarded RPCs.',
    },
    architecture: [
      { pt: 'Front-End & Performance: React 18, TypeScript, Tailwind CSS v4, Vite 6 PWA e lazy loading do widget de IA', en: 'Front-End & Performance: React 18, TypeScript, Tailwind CSS v4, Vite 6 PWA, and lazy-loaded AI widget' },
      { pt: 'Motor de IA & Edge: Vercel Edge (/api/chat, /api/feedback, /api/lead, /api/og), Gemini 3.8 Flash + fallback 3.5 Flash-Lite e Tool Calling', en: 'AI & Edge Engine: Vercel Edge (/api/chat, /api/feedback, /api/lead, /api/og), Gemini 3.8 Flash + 3.5 Flash-Lite fallback, and Tool Calling' },
      { pt: 'Dados & Segurança LGPD: Supabase PostgreSQL com RLS, RPCs SECURITY DEFINER (AI_WRITE_SECRET), cache L2 (ai_answer_cache) e purge automático', en: 'Data & LGPD Security: Supabase PostgreSQL with RLS, SECURITY DEFINER RPCs (AI_WRITE_SECRET), L2 cache (ai_answer_cache), and automated purge' },
      { pt: 'Qualidade & Observabilidade: 95/95 evals (71 núcleo + 24 difíceis), testes de contrato de API, telemetria completa e smoke test diário em produção', en: 'Quality & Observability: 95/95 evals (71 core + 24 hard), API contract tests, full Edge telemetry, and daily production smoke tests' },
    ],
    result: {
      pt: '95/95 evals aprovados com 0% de alucinação (p95 < 22 ms no motor local), chunk principal enxuto e observabilidade ponta a ponta em produção.',
      en: '95/95 evals passing with 0% hallucinations (p95 < 22 ms local engine), slim main bundle, and end-to-end production observability.',
    },
    impact: {
      pt: 'Demonstração prática de engenharia de IA, segurança AppSec/LGPD e acabamento de interface em um sistema real auditável.',
      en: 'Hands-on proof of applied AI engineering, AppSec/LGPD security, and UI craft running in a live auditable system.',
    },
    metrics: [
      { label: { pt: 'Evals Sem Alucinação', en: 'Zero-Hallucination Evals' }, value: '95/95' },
      { label: { pt: 'Latência Motor Local', en: 'Local Engine p95' }, value: '<22 ms' },
      { label: { pt: 'Acessibilidade', en: 'Accessibility' }, value: 'WCAG AA' },
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS v4', 'Vite 6', 'Vercel Edge', 'Gemini 3.8/3.5', 'Supabase RLS', 'CRAG + CoVe'],
    icon: 'BookOpen',
    github: 'https://github.com/andersoncataldo/andersoncataldo.tech',
    liveDemo: 'https://andersoncataldotech.vercel.app',
    featured: true,
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
      pt: 'Processo que levava 6 h manuais passou a ser executado em menos de 10 s por ciclo (mediana; redução superior a 99,9%), sem interferência humana e com dados sincronizados a cada 15 minutos.',
      en: 'A process that previously took 6 manual hours was reduced to under 10 s per cycle (median; >99.9% reduction), running 24/7 with zero human intervention and refreshed data every 15 minutes.',
    },
    impact: {
      pt: 'Liberação acelerada de cargas hospitalares e farmacêuticas de alta prioridade sem risco de divergência de estoque.',
      en: 'Accelerated dispatch of high-priority hospital and pharmaceutical cargo with zero inventory divergence.',
    },
    metrics: [
      { label: { pt: 'Tempo de Processo', en: 'Process Time' }, value: '6h ➔ < 10s' },
      { label: { pt: 'Ganho de Eficiência', en: 'Efficiency Gain' }, value: '>99.9%' },
      { label: { pt: 'Frequência de Sync', en: 'Sync Interval' }, value: 'A cada 15 min' },
    ],
    techStack: ['Python', 'SFTP / FTP', 'EDI Pharma Link', 'TOTVS WinThor', 'Oracle SQL', 'Paramiko', 'PyInstaller'],
    icon: 'Bot',
    featured: true,
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
      pt: 'O controle manual de devoluções gerava notas duplicadas, falta de rastreio em tempo real no estoque e ausência de análise sistemática das causas-raiz de devolução de produtos.',
      en: 'Manual returns processing caused duplicate credit notes, lack of real-time warehouse visibility, and zero systematic root-cause analytics on product returns.',
    },
    role: { pt: 'Desenvolvedor Full-Stack & IA Aplicada', en: 'Full-Stack & Applied AI Developer' },
    solution: {
      pt: 'Construção da plataforma com React + Vite, API em Python/FastAPI (SQLAlchemy, Alembic, Pydantic v2), testes com Pytest e motor de IA (Gemini/OpenAI) com curva de Pareto, fallback local (< 1s) e sanitização de dados conforme a LGPD.',
      en: 'Built with React + Vite, Python/FastAPI backend (SQLAlchemy, Alembic, Pydantic v2), Pytest test suites, and an AI diagnostic engine (Gemini/OpenAI) with Pareto curve, sub-second heuristic fallback, and LGPD anonymization.',
    },
    architecture: [
      { pt: 'Front-End: React 19, Vite, Tailwind CSS, Modo TV para painel de expedição', en: 'Front-End: React 19, Vite, Tailwind CSS, TV Mode for warehouse displays' },
      { pt: 'Back-End: Python, FastAPI, SQLAlchemy, Alembic, Pydantic v2, Pytest', en: 'Back-End: Python, FastAPI, SQLAlchemy, Alembic, Pydantic v2, Pytest' },
      { pt: 'Motor de IA: Diagnóstico executivo (Gemini/OpenAI) com Pareto, detecção de anomalias e fallback < 1s', en: 'AI Engine: Executive diagnosis (Gemini/OpenAI), Pareto curves, anomaly detection & < 1s fallback' },
      { pt: 'Segurança & LGPD: Anonimização automática de dados de clientes antes da inferência de IA', en: 'Security & LGPD: Automatic PII anonymization prior to LLM inference' },
    ],
    result: {
      pt: 'Bloqueio automatizado de NFs duplicadas, visibilidade de devoluções em tela cheia na expedição e relatórios de IA que apontam as principais causas de avaria de carga.',
      en: 'Automated blocking of duplicate invoices, full-screen live visibility in shipping, and AI reports pinpointing primary causes of cargo damage.',
    },
    impact: {
      pt: 'Redução de perdas financeiras na logística reversa e insights imediatos para negociação com transportadoras e fabricantes.',
      en: 'Reduced financial shrinkage in reverse logistics and generated immediate insights for vendor and freight carrier negotiations.',
    },
    metrics: [
      { label: { pt: 'Fallback de IA', en: 'AI Fallback' }, value: '< 1 segundo' },
      { label: { pt: 'NFs Duplicadas', en: 'Duplicate Invoices' }, value: 'Bloqueio auto' },
      { label: { pt: 'Conformidade', en: 'Compliance' }, value: 'LGPD Sanitized' },
    ],
    techStack: ['Python', 'FastAPI', 'React', 'Gemini API', 'OpenAI', 'SQLAlchemy', 'PostgreSQL', 'Pytest'],
    icon: 'Cpu',
    featured: false,
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
    role: { pt: 'Desenvolvedor Full-Stack', en: 'Full-Stack Developer' },
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
      pt: 'Adoção integral pela empresa com redução no tempo de resposta a incidentes e relatórios gerenciais em tempo real para tomada de decisão.',
      en: 'Company-wide adoption with faster incident turnaround times and real-time management BI reports for decision makers.',
    },
    impact: {
      pt: 'Rastreabilidade total dos chamados da organização com acompanhamento contínuo dos SLAs estabelecidos.',
      en: 'Full enterprise incident traceability with continuous monitoring of established corporate SLAs.',
    },
    metrics: [
      { label: { pt: 'Hierarquia RBAC', en: 'RBAC Levels' }, value: '4 Níveis' },
      { label: { pt: 'Monitoramento SLA', en: 'SLA Tracking' }, value: 'Preditivo' },
      { label: { pt: 'Geração Relatórios', en: 'Reporting' }, value: 'PDF Instantâneo' },
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'PostgreSQL', 'Recharts'],
    icon: 'Server',
    featured: false,
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
    role: { pt: 'Desenvolvedor RPA & Automação', en: 'RPA & Automation Developer' },
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
      pt: 'Mais de 15.000 XMLs processados mensalmente com 99,85% de conformidade contra schemas SEFAZ e mais de 200 horas operacionais poupadas para a equipe fiscal.',
      en: 'Over 15,000 XMLs processed monthly with 99.85% SEFAZ schema compliance and 200+ manual hours saved for the tax department.',
    },
    impact: {
      pt: 'Redução drástica de inconsistências tributárias e produtividade da equipe direcionada para análise estratégica.',
      en: 'Drastically reduced tax inconsistencies and redirected team productivity to strategic financial analysis.',
    },
    metrics: [
      { label: { pt: 'Volume Mensal', en: 'Monthly Volume' }, value: '15.000+ XMLs' },
      { label: { pt: 'Horas Poupadas', en: 'Hours Saved' }, value: '200h+' },
      { label: { pt: 'Acurácia SEFAZ', en: 'SEFAZ Accuracy' }, value: '99.85%' },
    ],
    techStack: ['Python', 'RPA', 'Pandas', 'Selenium', 'lxml', 'BeautifulSoup', 'Excel Automation'],
    icon: 'Bot',
    featured: false,
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
    role: { pt: 'Desenvolvedor Full-Stack', en: 'Full-Stack Developer' },
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
      pt: 'Inventário corporativo centralizado e termos digitais emitidos com prova criptográfica de integridade.',
      en: 'Centralized corporate asset inventory and digital custody sign-offs issued with tamper-evident cryptographic proofs.',
    },
    impact: {
      pt: 'Conformidade do departamento de TI com normas de patrimônio e segurança da informação.',
      en: 'IT department compliance with internal asset governance and information security policies.',
    },
    metrics: [
      { label: { pt: 'Aprovação', en: 'Approval' }, value: '2 Níveis' },
      { label: { pt: 'Integridade', en: 'Integrity' }, value: 'Hash SHA-256' },
      { label: { pt: 'Auditoria', en: 'Audit' }, value: 'Triggers SQL' },
    ],
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'SHA-256'],
    icon: 'ShieldCheck',
    featured: false,
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
      pt: 'Sistema web educacional gamificado com conteúdo biográfico temático, quizzes autenticados por temporada, progressão por XP, ligas paroquiais e área administrativa protegida.',
      en: 'Gamified educational web platform with thematic biographical content, authenticated seasonal quizzes, XP progression, parish leagues, and a protected admin area.',
    },
    challenge: {
      pt: 'Construir uma arquitetura responsiva garantindo integridade das pontuações, prevenção contra respostas duplicadas e isolamento de dados diretamente no banco.',
      en: 'Build a responsive architecture enforcing score integrity, duplicate-answer prevention, and user data isolation directly at the database layer.',
    },
    role: { pt: 'Desenvolvedor Full-Stack & UI/UX', en: 'Full-Stack Developer & UI/UX' },
    solution: {
      pt: 'Front-end em React 19 + TypeScript + Tailwind CSS + Framer Motion com suíte Vitest; back-end em Supabase (PostgreSQL, Auth, Row-Level Security e RPCs SECURITY DEFINER) e deploy contínuo na Vercel.',
      en: 'Front-end in React 19 + TypeScript + Tailwind CSS + Framer Motion with Vitest test suite; back-end on Supabase (PostgreSQL, Auth, Row-Level Security, and SECURITY DEFINER RPCs) with continuous Vercel deployment.',
    },
    architecture: [
      { pt: 'Front-End: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Vitest', en: 'Front-End: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Vitest' },
      { pt: 'Banco & Segurança: Supabase (PostgreSQL, Auth, RLS, triggers de perfil e RPCs SECURITY DEFINER)', en: 'Database & Security: Supabase (PostgreSQL, Auth, RLS, profile triggers, and SECURITY DEFINER RPCs)' },
      { pt: 'Infraestrutura & Deploy: Vercel com CI/CD contínuo e schema SQL idempotente', en: 'Infrastructure & Deploy: Vercel with continuous CI/CD and idempotent SQL schema' },
    ],
    result: {
      pt: 'Interface fluida (< 1.2s de carregamento) com regras de XP, ranking e ligas reforçadas no servidor via PostgreSQL RPCs e RLS.',
      en: 'Smooth interface (< 1.2s load time) with XP, ranking, and league rules enforced server-side via PostgreSQL RPCs and RLS.',
    },
    impact: {
      pt: 'Aplicação pública completa em produção comprovando domínio prático de autenticação, RLS e modelagem relacional.',
      en: 'Full public production app demonstrating hands-on mastery of authentication, RLS policies, and relational modeling.',
    },
    metrics: [
      { label: { pt: 'Segurança DB', en: 'DB Security' }, value: 'RLS + RPCs' },
      { label: { pt: 'Testes', en: 'Testing' }, value: 'Vitest' },
      { label: { pt: 'Deploy', en: 'Deploy' }, value: 'Vercel Edge' },
    ],
    techStack: ['React 19', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vitest', 'Vercel'],
    icon: 'Layout',
    github: 'https://github.com/andersoncataldo/CarloAcutis',
    liveDemo: 'https://carlo-acutis-virid.vercel.app',
    featured: false,
  },
];
