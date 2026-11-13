import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    title: {
      pt: 'Estagiário de T.I. — Full-Stack, Automação & IA',
      en: 'IT Intern — Full-Stack, Automation & AI',
    },
    company: 'Distribuidora Mais Saúde',
    companyRole: {
      pt: 'Engenharia de Software, Agentes de IA & Integrações WinThor',
      en: 'Software Engineering, AI Agents & WinThor Integrations',
    },
    period: { pt: 'Jun/2026 - Presente', en: 'Jun/2026 - Present' },
    location: { pt: 'Fortaleza, CE - Híbrido / Presencial', en: 'Fortaleza, CE - Hybrid / On-site' },
    summary: {
      pt: 'Projeta e desenvolve a Central Grupo Mais (monorepo com SSO que unifica 4 sistemas internos), robôs de integração Python conectados ao ERP TOTVS WinThor (Oracle) e arquitetura de agentes de IA em modelo maker-checker com governança rigorosa.',
      en: 'Architects and builds Central Grupo Mais (corporate SSO monorepo unifying 4 internal systems), Python integration robots connected to TOTVS WinThor ERP (Oracle) and maker-checker AI multi-agent architecture with strict quality gates.',
    },
    results: [
      {
        pt: 'Projetou e desenvolve a Central Grupo Mais, monorepo corporativo com SSO (JWT) unificando 4 sistemas internos (Central, Chamados, Devolução e Ativos) em Next.js 16/React 19, Vite, Node.js/Express, Python/FastAPI, Supabase (RLS) e deploy Cloudflare Pages + Render.',
        en: 'Architected and develops Central Grupo Mais, a corporate monorepo with SSO (JWT) unifying 4 internal systems (Central, Service Desk, Returns, IT Assets) using Next.js 16/React 19, Vite, Node.js/Express, Python/FastAPI, Supabase (RLS), and Cloudflare Pages + Render deployment.',
      },
      {
        pt: 'Implementou escritório de 9 agentes de IA (orquestrador, 5 executores especialistas e 3 validadores independentes) no modelo maker-checker com Claude Code, menor privilégio, protocolo anti-alucinação e escalonamento para revisão humana.',
        en: 'Implemented a 9 AI agent squad (orchestrator, 5 specialized implementers, 3 independent validators) in a maker-checker model with Claude Code: least privilege, anti-hallucination protocols, and human review escalation.',
      },
      {
        pt: 'Instituiu qualidade como gate de entrega: 58 testes Pytest (E2E, autenticação e LGPD) e 35 asserções Playwright de regressão visual, lint e checagem de drift do design system em 5 pacotes.',
        en: 'Established quality as a delivery gate: 58 Pytest tests (E2E flows, authentication, LGPD) and 35 Playwright visual regression assertions, linting, and design system drift checks across 5 packages.',
      },
      {
        pt: 'Desenvolveu 10 automações Python integradas ao WinThor (Oracle), incluindo 4 robôs de estoque EDI Pharma Link (Eurofarma, Eurofarma Genérico, Smartped, Momenta) via FTP/SFTP, empacotados com PyInstaller e agendados.',
        en: 'Built 10 Python automations integrated with WinThor (Oracle), including 4 inventory integration robots for pharmaceutical operators (Eurofarma, Eurofarma Generic, Smartped, Momenta) via EDI Pharma Link and FTP/SFTP.',
      },
      {
        pt: 'Criou o FTP_SYNC, ponte autônoma entre servidores FTP de parceiros e o SFTP do WinThor Cloud (TOTVS) com sincronização a cada 15 min, reduzindo o tempo de coleta e lançamento de 6 h para menos de 10 s por ciclo (mediana; redução superior a 99,9%).',
        en: 'Created FTP_SYNC, an autonomous bridge between partner FTP servers and WinThor Cloud SFTP syncing every 15 min, reducing ingestion and registration time from 6 h to under 10 s per cycle (median; >99.9% reduction).',
      },
      {
        pt: 'Construiu motor de IA no Sistema de Devolução: diagnóstico executivo com LLM (Gemini/OpenAI), curva de Pareto de causas-raiz e detecção de anomalias com fallback local (< 1s), timeout de inferência e anonimização de dados (LGPD).',
        en: 'Built an AI engine in the Returns System: executive diagnostics with LLM (Gemini/OpenAI), Pareto root-cause curve, and anomaly detection with local heuristic fallback (< 1s) and LGPD data anonymization.',
      },
      {
        pt: 'Entregou ferramentas internas estratégicas: painel de automações em Streamlit para monitoramento de robôs, controle de inventário de TI (Google Sheets + Apps Script) e atualizador de catálogo Tkinter com consulta em lote ao Oracle.',
        en: 'Delivered strategic internal tooling: Streamlit automation dashboard to monitor robot executions, IT asset inventory control (Google Sheets + Apps Script), and Tkinter inventory updater with batch Oracle SQL queries.',
      },
    ],
    metrics: [
      { label: { pt: 'Redução FTP_SYNC', en: 'FTP_SYNC Reduction' }, value: '>99.9% (6h ➔ <10s)' },
      { label: { pt: 'Robôs WinThor', en: 'WinThor Robots' }, value: '10 robôs' },
      { label: { pt: 'Suíte de Testes', en: 'Test Suites' }, value: '58 Pytest + 35 E2E' },
      { label: { pt: 'Sistemas Unificados', en: 'Unified Systems' }, value: '4 em 1 (SSO)' },
    ],
    stack: [
      'Next.js 16',
      'React 19',
      'Python',
      'FastAPI',
      'Node.js',
      'Agentes de IA',
      'Claude Code',
      'Supabase',
      'PostgreSQL',
      'TOTVS WinThor (Oracle)',
      'Pytest',
      'Playwright',
      'Cloudflare Pages',
    ],
    type: 'work',
    current: true,
  },
  {
    title: {
      pt: 'Aprendiz — Setor Fiscal (Sistemas e Projetos)',
      en: 'Apprentice — Tax Department (Systems & Projects)',
    },
    company: 'Grupo 3corações',
    companyRole: {
      pt: 'Desenvolvedor de Robôs RPA & Automação de Processos',
      en: 'RPA Robot Developer & Process Automation',
    },
    period: { pt: 'Jan/2025 - Abr/2026', en: 'Jan/2025 - Apr/2026' },
    location: { pt: 'Eusébio / Fortaleza, CE - Presencial', en: 'Eusébio / Fortaleza, CE - On-site' },
    summary: {
      pt: 'Desenvolvimento e sustentação de 5 robôs RPA em Python para renovação automática de CNDs em portais web, extração massiva de XML fiscais (15.000+/mês) e integração automatizada com planilhas corporativas.',
      en: 'Development and maintenance of 5 Python RPA robots for automated renewal of tax clearance certificates (CNDs) across web portals, bulk XML extraction (15,000+/mo), and automated corporate spreadsheet integration.',
    },
    results: [
      {
        pt: 'Desenvolveu 5 robôs RPA em Python para renovação automática de CNDs (Certidões Negativas de Débitos) em portais governamentais, extração massiva de dados de XML fiscais e manipulação de arquivos.',
        en: 'Developed 5 Python RPA robots for automatic renewal of tax clearance certificates (CNDs) across government portals, bulk fiscal XML data extraction, and automated file handling.',
      },
      {
        pt: 'Processou continuamente mais de 15.000 arquivos XML de NFe/CTe por mês com 99.85% de precisão de extração e validação contra schemas da SEFAZ.',
        en: 'Continuously processed over 15,000 NFe/CTe XML files monthly with 99.85% extraction accuracy and schema validation against SEFAZ.',
      },
      {
        pt: 'Poupou mais de 200 horas acumuladas de trabalho operacional manual da equipe fiscal, eliminando falhas humanas de digitação e conciliação.',
        en: 'Saved over 200 cumulative hours of manual operational work for the tax team, eradicating human data-entry errors.',
      },
      {
        pt: 'Automatizou a interação com sistemas web e o preenchimento de planilhas corporativas a partir dos dados extraídos, eliminando retrabalho no setor fiscal.',
        en: 'Automated web portal interaction and corporate spreadsheet population from extracted data, eliminating manual rework in the tax department.',
      },
      {
        pt: 'Elaborou documentação técnica aprofundada dos robôs e operou controle ágil de chamados técnicos com lideranças.',
        en: 'Authored thorough technical documentation for robots and ran agile technical ticketing with leadership.',
      },
    ],
    metrics: [
      { label: { pt: 'Documentos / Mês', en: 'Documents / Month' }, value: '15.000+ XMLs' },
      { label: { pt: 'Horas Poupadas', en: 'Hours Saved' }, value: '200h+' },
      { label: { pt: 'Robôs em Produção', en: 'Robots Shipped' }, value: '5 robôs' },
    ],
    stack: ['Python', 'RPA', 'Pandas', 'Selenium', 'lxml', 'BeautifulSoup', 'Excel Avançado', 'Scrum'],
    type: 'work',
    current: false,
  },
  {
    title: {
      pt: 'Bacharelado em Ciência da Computação',
      en: "Bachelor's Degree in Computer Science",
    },
    company: 'Universidade de Fortaleza (UNIFOR)',
    companyRole: { pt: 'Graduando — 6º Semestre', en: 'Undergraduate — 6th Semester' },
    period: { pt: '2024 - Em andamento', en: '2024 - In progress' },
    location: { pt: 'Fortaleza, CE', en: 'Fortaleza, CE' },
    summary: {
      pt: 'Formação acadêmica de excelência com ênfase em Fundamentos da Computação, Estruturas de Dados, Algoritmos, Análise de Complexidade, Engenharia de Software e Inteligência Artificial.',
      en: 'Top-tier academic training focusing on Computer Science Fundamentals, Data Structures, Algorithms, Complexity Analysis, Software Engineering, and Artificial Intelligence.',
    },
    results: [
      {
        pt: 'Domínio de estruturas de dados avançadas, análise assintótica (Big-O), design patterns e arquitetura de software orientada a objetos.',
        en: 'Mastery of advanced data structures, asymptotic complexity analysis (Big-O), software design patterns, and OOP architecture.',
      },
      {
        pt: 'Condução de projetos interdisciplinares com React, Java Spring Boot, Python FastAPI e modelagem relacional avançada com PostgreSQL e Oracle.',
        en: 'Led interdisciplinary engineering projects utilizing React, Java Spring Boot, Python FastAPI, and relational modeling on PostgreSQL and Oracle.',
      },
      {
        pt: 'Aplicação contínua de boas práticas de Clean Code, Spec-Driven Development e testes automatizados em todo o ciclo acadêmico e profissional.',
        en: 'Continuous application of Clean Code best practices, Spec-Driven Development, and automated testing throughout academic and professional projects.',
      },
    ],
    metrics: [
      { label: { pt: 'Progresso', en: 'Progress' }, value: { pt: '6º Semestre', en: '6th Semester' } },
      { label: { pt: 'Foco de Pesquisa', en: 'Focus Area' }, value: { pt: 'IA & Engenharia', en: 'AI & Engineering' } },
    ],
    stack: ['Estruturas de Dados', 'Algoritmos', 'Java', 'Spring Boot', 'PostgreSQL', 'TypeScript', 'Clean Code', 'IA Aplicada'],
    type: 'education',
    current: true,
  },
  {
    title: {
      pt: 'Certificação HCIA-Storage V5.0',
      en: 'HCIA-Storage V5.0 Certification',
    },
    company: 'Huawei ICT Academy',
    companyRole: { pt: 'Certificação Profissional Internacional', en: 'International Professional Certification' },
    period: { pt: 'Jun/2026', en: 'Jun/2026' },
    location: { pt: 'Online / Internacional', en: 'Online / International' },
    summary: {
      pt: 'Certificação profissional em tecnologias corporativas de armazenamento e infraestrutura: arquiteturas SAN e NAS, protocolos de armazenamento, tecnologias RAID, virtualização de storage e estratégias de backup e recuperação contra desastres (Disaster Recovery).',
      en: 'Professional certification covering enterprise storage architectures: SAN and NAS systems, storage networking protocols, RAID technologies, storage virtualization, and disaster recovery and backup strategies.',
    },
    results: [
      {
        pt: 'Domínio das tecnologias e tendências de armazenamento corporativo, arquiteturas SAN (Fibre Channel e IP-SAN) e NAS.',
        en: 'Mastery of enterprise storage technologies and trends, SAN (Fibre Channel and IP-SAN) and NAS architectures.',
      },
      {
        pt: 'Compreensão de confiabilidade de dados através de proteção por paridade RAID, snapshots, replicação remota e continuidade de negócios.',
        en: 'In-depth understanding of enterprise data resilience through RAID parity, snapshots, remote replication, and business continuity.',
      },
    ],
    metrics: [
      { label: { pt: 'Emissor', en: 'Issuer' }, value: 'Huawei' },
      { label: { pt: 'Nível', en: 'Level' }, value: 'Associate Engineer' },
    ],
    stack: ['Enterprise Storage', 'SAN / NAS', 'RAID', 'Disaster Recovery', 'Storage Virtualization'],
    type: 'certification',
    current: false,
  },
];
