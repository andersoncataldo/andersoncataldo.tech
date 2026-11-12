import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

async function loadTsModule(relativePath) {
  const fullPath = path.resolve(ROOT_DIR, relativePath);
  const result = await esbuild.build({
    entryPoints: [fullPath],
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  const dataUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
  return import(dataUrl);
}

function normalizeAndQuantize(vec) {
  const norm = Math.sqrt(vec.reduce((acc, v) => acc + v * v, 0)) || 1;
  return vec.map((v) => Number((v / norm).toFixed(4)));
}

async function fetchGeminiEmbeddingsBatch(texts, apiKey) {
  const model = 'models/text-embedding-004';
  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:batchEmbedContents?key=${apiKey}`;

  const requests = texts.map((text) => ({
    model,
    content: { parts: [{ text }] },
    taskType: 'RETRIEVAL_DOCUMENT',
    outputDimensionality: 256,
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requests }),
  });

  if (!response.ok) {
    throw new Error(`Gemini Embedding API status ${response.status}`);
  }

  const data = await response.json();
  return (data.embeddings || []).map((e) => normalizeAndQuantize(e.values || []));
}

async function main() {
  console.log('🔨 [build-knowledge] Extraindo base completa e facetada de src/data/* e src/config/links.ts...');

  const [projectsMod, expMod, skillsMod, metricsMod, autoMod, linksMod] = await Promise.all([
    loadTsModule('src/data/projects.ts'),
    loadTsModule('src/data/experience.ts'),
    loadTsModule('src/data/skills.ts'),
    loadTsModule('src/data/metrics.ts'),
    loadTsModule('src/data/automation.ts'),
    loadTsModule('src/config/links.ts'),
  ]);

  const projects = projectsMod.projects || [];
  const experiences = expMod.experiences || [];
  const skillCategories = skillsMod.skillCategories || [];
  const keyMetrics = metricsMod.keyMetrics || [];
  const automationPipeline = autoMod.automationPipeline || [];
  const { EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL, LOCATION } = linksMod;

  /** @type {import('../src/lib/ai/types').KnowledgeChunk[]} */
  const chunks = [
    // 1. Perfil Geral e Posicionamento
    {
      id: 'profile-overview',
      category: 'profile',
      sectionAnchor: '#sobre',
      sectionLabel: { pt: 'Sobre Anderson Cataldo', en: 'About Anderson Cataldo' },
      title: {
        pt: 'Perfil Profissional e Posicionamento de Anderson Cataldo',
        en: 'Anderson Cataldo — Professional Profile & Positioning',
      },
      shortAnswer: {
        pt: '**Anderson Viana Cataldo** é Desenvolvedor Full-Stack, especialista em **Automação Corporativa (RPA)** e **Arquitetura de Agentes de IA (LLM)** com foco em Python e TypeScript. Atua na **Distribuidora Mais Saúde** (desde Jun/2026), atuou no **Grupo 3corações** (Jan/2025 a Abr/2026) e cursa o **6º semestre de Ciência da Computação na UNIFOR**.',
        en: '**Anderson Viana Cataldo** is a Full-Stack Developer specializing in **Enterprise Automation (RPA)** and **AI Agent Architectures (LLM)** using Python and TypeScript. He works at **Distribuidora Mais Saúde** (since Jun/2026), previously worked at **Grupo 3corações** (Jan/2025 to Apr/2026), and is in the **6th semester of Computer Science at UNIFOR**.',
      },
      content: {
        pt: 'Seus 3 pilares centrais são: (1) IA Aplicada & Agentes Autônomos (arquitetura Maker-Checker com 9 agentes, Claude Code, MCP e Gemini API); (2) Automação & Integração ERP Industrial (15 robôs Python integrados ao WinThor/Oracle e SEFAZ, incluindo o FTP_SYNC com redução de 99%); e (3) Engenharia Full-Stack & Qualidade Rigorosa (monorepos com SSO JWT, Next.js 16, React 19/18, FastAPI, Supabase RLS, 58 testes Pytest e 35 asserções Playwright).',
        en: 'His 3 core pillars are: (1) Applied AI & Autonomous Agents (9-agent Maker-Checker architecture with Claude Code, MCP, and Gemini API); (2) Industrial ERP Automation (15 Python robots integrated with WinThor/Oracle and SEFAZ, including FTP_SYNC with -99% time reduction); and (3) Full-Stack Engineering & Strict Quality (SSO JWT monorepos, Next.js 16, React 19/18, FastAPI, Supabase RLS, 58 Pytest suites, and 35 Playwright assertions).',
      },
      facets: {
        role: {
          pt: 'Anderson atua como Desenvolvedor Full-Stack, Engenheiro de Automação RPA e Arquiteto de Sistemas Multiagente de IA.',
          en: 'Anderson serves as a Full-Stack Developer, RPA Automation Engineer, and Multi-Agent AI Architect.',
        },
        architecture: {
          pt: 'Sua atuação apoia-se em 3 pilares técnicos: **IA Aplicada & Agentes Autônomos** (Claude Code, MCP, Gemini API, Maker-Checker), **Automação & Integração ERP Industrial** (Python, WinThor Oracle, EDI Pharma Link, SEFAZ XML) e **Engenharia Full-Stack** (Next.js 16, React 19, FastAPI, Node.js, Supabase RLS).',
          en: 'His work rests on 3 technical pillars: **Applied AI & Autonomous Agents** (Claude Code, MCP, Gemini API, Maker-Checker), **Industrial ERP Automation** (Python, WinThor Oracle, EDI Pharma Link, SEFAZ XML), and **Full-Stack Engineering** (Next.js 16, React 19, FastAPI, Node.js, Supabase RLS).',
        },
        resultImpact: {
          pt: 'Em produção real, já entregou **15 robôs corporativos**, unificou **4 sistemas internos sob SSO**, reduziu o pipeline **FTP_SYNC em 99% (6h para <10s)** e poupou **mais de 200 horas manuais**.',
          en: 'In real production, he has shipped **15 corporate robots**, unified **4 internal systems under SSO**, slashed the **FTP_SYNC pipeline by 99% (6h to <10s)**, and saved **over 200 manual hours**.',
        },
        differentials: {
          pt: '**Diferencial e 3 Pilares de Anderson Cataldo:** (1) **IA Aplicada & Agentes Autônomos** — orquestração de um squad de **9 agentes de IA no modelo Maker-Checker** (Claude Code, MCP e Gemini API) com Spec-Driven Development (OpenSpec); (2) **Automação & Integração ERP Industrial** — **15 robôs Python** em produção integrados ao **WinThor (Oracle)** e **SEFAZ** (incluindo o **FTP_SYNC com -99% de tempo**); e (3) **Engenharia Full-Stack & Qualidade Rigorosa** — monorepo com **SSO JWT (4 sistemas)**, **58 testes Pytest**, **35 asserções Playwright** e conformidade **LGPD**.',
          en: '**Anderson Cataldo’s Core Differentials & 3 Pillars:** (1) **Applied AI & Autonomous Agents** — orchestrating a **9-agent Maker-Checker AI squad** (Claude Code, MCP, Gemini API) with Spec-Driven Development (OpenSpec); (2) **Industrial ERP Automation** — **15 production Python robots** integrated with **WinThor (Oracle)** and **SEFAZ** (including **FTP_SYNC with -99% time**); and (3) **Full-Stack Engineering & Strict Quality** — **SSO JWT monorepo (4 systems)**, **58 Pytest tests**, **35 Playwright assertions**, and **LGPD** compliance.',
        },
        languagesSpoken: {
          pt: '**Idiomas falados por Anderson Cataldo:** **Português (Nativo)**, **Inglês (Avançado)** — leitura técnica fluente, documentação arquitetural, escrita de código e comunicação profissional bilíngue (PT/EN) — além de conhecimentos em **Espanhol**.',
          en: '**Languages spoken by Anderson Cataldo:** **Portuguese (Native)**, **English (Advanced)** — fluent technical reading, architectural documentation, code authoring, and bilingual (PT/EN) professional communication — plus **Spanish**.',
        },
      },
      keywords: [
        'quem e', 'who is', 'anderson', 'cataldo', 'viana', 'resumo', 'summary', 'bio', 'perfil', 'profile',
        'objetivo', 'goal', 'foco', 'posicionamento', 'diferencial', 'pilares', 'pillars', 'sobre', 'about',
      ],
      entities: ['anderson_cataldo', 'mais_saude', '3coracoes', 'unifor'],
      metrics: ['15 robôs', '-99%', '9 agentes', '6º semestre'],
    },

    // 2. Tempo Combinado de Trabalho e Estudo
    {
      id: 'work-and-study-duration',
      category: 'experience',
      sectionAnchor: '#experiencia',
      sectionLabel: { pt: 'Experiência e Formação', en: 'Experience & Education' },
      title: {
        pt: 'Tempo de Trabalho (~2 Anos) e Tempo de Estudo (3 Anos — 6º Semestre)',
        en: 'Work Duration (~2 Years) & Study Duration (3 Years — 6th Semester)',
      },
      shortAnswer: {
        pt: 'Anderson possui **~2 anos de experiência corporativa contínua em produção** (desde **Janeiro de 2025**, somando **15 robôs corporativos** e **4 sistemas web unificados**, passando pelo **Grupo 3corações** por **1 ano e 4 meses** e atualmente na **Distribuidora Mais Saúde** desde Jun/2026) e **3 anos de estudos acadêmicos dedicados (2024 – 2027)** no **Bacharelado em Ciência da Computação na UNIFOR (6º Semestre)**.',
        en: 'Anderson has **~2 years of continuous corporate production experience** (since **January 2025**, totaling **15 production robots** and **4 unified web systems**, spanning **1 year and 4 months at Grupo 3corações** and currently at **Distribuidora Mais Saúde** since Jun/2026) alongside **3 years of dedicated academic study (2024 – 2027)** in **Computer Science at UNIFOR (6th Semester)**.',
      },
      content: {
        pt: 'Cronologia completa: (1) Tempo de Trabalho: Iniciou em Janeiro de 2025 no Grupo 3corações (Jan/2025 a Abr/2026 — 1 ano e 4 meses no Setor Fiscal desenvolvendo 5 robôs RPA para 15.000+ XMLs/mês e CNDs) e atua desde Junho de 2026 na Distribuidora Mais Saúde (Full-Stack, Automação WinThor com 10 robôs, FTP_SYNC -99%, Central Grupo Mais 4 sistemas SSO e 9 agentes de IA). (2) Tempo de Estudo: 3 anos (2024 a 2027) em Ciência da Computação na UNIFOR, cursando o 6º semestre, além da certificação Huawei HCIA-Storage V5.0 (Jun/2026) e Inglês Avançado.',
        en: 'Full timeline: (1) Work Duration: Started in January 2025 at Grupo 3corações (Jan/2025 to Apr/2026 — 1 year and 4 months in Tax RPA building 5 robots for 15,000+ XMLs/mo and CNDs) and works since June 2026 at Distribuidora Mais Saúde (Full-Stack, 10 WinThor robots, FTP_SYNC -99%, Central Grupo Mais 4 SSO systems, and 9 AI agents). (2) Study Duration: 3 years (2024 to 2027) in Computer Science at UNIFOR, currently in the 6th semester, plus Huawei HCIA-Storage V5.0 certification (Jun/2026) and Advanced English.',
      },
      facets: {
        duration_when: {
          pt: 'No mercado corporativo, Anderson atua continuamente desde **Janeiro de 2025 (~2 anos de experiência prática)**: trabalhou por **1 ano e 4 meses no Grupo 3corações (Jan/2025 – Abr/2026)** e está na **Distribuidora Mais Saúde desde Junho de 2026**, somando **15 robôs entregues**. Nos estudos, dedica **3 anos (2024 – 2027)** à graduação em **Ciência da Computação na UNIFOR**, estando atualmente no **6º Semestre**.',
          en: 'In corporate production, Anderson has worked continuously since **January 2025 (~2 years of practical experience)**: **1 year and 4 months at Grupo 3corações (Jan/2025 – Apr/2026)** and at **Distribuidora Mais Saúde since June 2026**, totaling **15 shipped robots**. Academically, he has **3 years of study (2024 – 2027)** in **Computer Science at UNIFOR**, currently in the **6th Semester**.',
        },
        firstJob: {
          pt: '**Primeiro emprego de Anderson Cataldo:** Sua primeira experiência corporativa foi no **Grupo 3corações** (**Janeiro de 2025 a Abril de 2026 — 1 ano e 4 meses**, em Eusébio/Fortaleza, CE), onde atuou como **Aprendiz — Setor Fiscal (Sistemas e Projetos)** (`Desenvolvedor de Robôs RPA & Automação de Processos`), construindo **5 robôs RPA em Python** para renovação automática de **CNDs** e processamento de **15.000+ XMLs fiscais/mês (NF-e/CT-e)** com **99,85% de precisão SEFAZ** e economia de **200+ horas manuais**.',
          en: '**Anderson Cataldo’s First Job:** His first corporate position was at **Grupo 3corações** (**January 2025 to April 2026 — 1 year and 4 months**, in Eusébio/Fortaleza, CE) as **Apprentice — Tax Department (Systems & Projects)** (`RPA Robot Developer & Process Automation`), where he built **5 Python RPA robots** for automated **CND** renewals and processing **15,000+ monthly tax XMLs (NF-e/CT-e)** with **99.85% SEFAZ accuracy**, saving **200+ manual hours**.',
        },
        currentJob: {
          pt: '**Emprego atual de Anderson Cataldo:** Atualmente (**Jun/2026 – Presente**), Anderson trabalha na **Distribuidora Mais Saúde** (Fortaleza, CE — Híbrido/Presencial) como **Estagiário de T.I. — Full-Stack, Automação & IA**, liderando o desenvolvimento da **Central Grupo Mais (4 sistemas unificados com SSO JWT)**, **10 robôs RPA integrados ao ERP TOTVS WinThor (Oracle)** (incluindo o **FTP_SYNC com -99% de tempo**) e o **squad de 9 agentes de IA (Maker-Checker com Claude Code)**.',
          en: '**Anderson Cataldo’s Current Job:** Currently (**Jun/2026 – Present**), Anderson works at **Distribuidora Mais Saúde** (Fortaleza, CE — Hybrid/On-site) as **IT Intern — Full-Stack, Automation & AI**, leading the development of **Central Grupo Mais (4 unified SSO JWT systems)**, **10 Python RPA robots integrated with TOTVS WinThor ERP (Oracle)** (including **FTP_SYNC with -99% time**), and the **9-agent AI squad (Maker-Checker with Claude Code)**.',
        },
      },
      keywords: [
        'tempo de trabalho', 'tempo de experiencia', 'anos de experiencia', 'quanto tempo trabalha',
        'tempo de estudo', 'tempo de faculdade', 'work duration', 'study duration', 'how long worked',
        'how long studied', 'experiencia profissional', 'carreira', 'historico', 'cronologia', 'janeiro de 2025',
      ],
      entities: ['anderson_cataldo', 'mais_saude', '3coracoes', 'unifor'],
      metrics: ['Janeiro de 2025', '1 ano e 4 meses', '3 anos', '2024', '2027', '6º Semestre', '15 robôs'],
    },

    // 3. Formação Acadêmica UNIFOR
    {
      id: 'education-unifor',
      category: 'education',
      sectionAnchor: '#experiencia',
      sectionLabel: { pt: 'Formação Acadêmica', en: 'Academic Education' },
      title: {
        pt: 'Graduação em Ciência da Computação na UNIFOR (6º Semestre)',
        en: 'B.Sc. in Computer Science at UNIFOR (6th Semester)',
      },
      shortAnswer: {
        pt: 'Anderson cursa o **6º Semestre** do **Bacharelado em Ciência da Computação** na **Universidade de Fortaleza (UNIFOR)**, no período de **2024 a 2027 (3 anos de estudo)**, com foco em Estruturas de Dados Avançadas, Complexidade de Algoritmos (Big-O), Engenharia de Software, Bancos Relacionais (PostgreSQL/Oracle) e Inteligência Artificial Aplicada.',
        en: 'Anderson is in the **6th Semester** of his **Bachelor of Science in Computer Science** at the **University of Fortaleza (UNIFOR)** (**2024 – 2027, 3 years of study**), focusing on Advanced Data Structures, Algorithmic Complexity (Big-O), Software Engineering, Relational Databases (PostgreSQL/Oracle), and Applied AI.',
      },
      content: {
        pt: 'Na UNIFOR, conduz projetos interdisciplinares utilizando React, TypeScript, Java (Spring Boot), Python (FastAPI), modelagem relacional em PostgreSQL e Oracle, Clean Code e Spec-Driven Development. Mantém inglês avançado e certificação internacional Huawei HCIA-Storage V5.0.',
        en: 'At UNIFOR, he leads interdisciplinary projects using React, TypeScript, Java (Spring Boot), Python (FastAPI), relational modeling on PostgreSQL and Oracle, Clean Code, and Spec-Driven Development. He also holds Advanced English proficiency and the Huawei HCIA-Storage V5.0 certification.',
      },
      facets: {
        duration_when: {
          pt: 'A graduação em **Ciência da Computação na UNIFOR** compreende o período de **2024 a 2027 (3 anos de estudo dedicados)**, e Anderson encontra-se atualmente no **6º Semestre**.',
          en: 'His **B.Sc. in Computer Science at UNIFOR** spans **2024 to 2027 (3 years of study)**, and Anderson is currently in his **6th Semester**.',
        },
        architecture: {
          pt: 'A grade e os projetos acadêmicos na UNIFOR envolvem **Estruturas de Dados Avançadas**, **Análise Assintótica (Big-O)**, **Java com Spring Boot**, **Python com FastAPI**, **React/TypeScript**, **PostgreSQL**, **Oracle** e **Clean Code**.',
          en: 'Coursework and academic projects at UNIFOR cover **Advanced Data Structures**, **Asymptotic Analysis (Big-O)**, **Java with Spring Boot**, **Python with FastAPI**, **React/TypeScript**, **PostgreSQL**, **Oracle**, and **Clean Code**.',
        },
      },
      keywords: [
        'faculdade', 'universidade', 'unifor', 'ciencia da computacao', 'computer science', 'semestre',
        'semester', '6 semestre', '6º semestre', '6th semester', 'graduacao', 'degree', 'college',
        'university', 'estudo', 'estuda', 'formacao', 'academico', 'big-o', 'estruturas de dados',
      ],
      entities: ['unifor', 'ciencia_da_computacao'],
      metrics: ['3 anos', '2024', '2027', '6º Semestre'],
    },

    // 4. Certificação Internacional Huawei HCIA-Storage
    {
      id: 'certification-huawei-hcia',
      category: 'certification',
      sectionAnchor: '#experiencia',
      sectionLabel: { pt: 'Certificações Oficiais', en: 'Official Certifications' },
      title: {
        pt: 'Certificação Internacional Huawei HCIA-Storage V5.0',
        en: 'Huawei HCIA-Storage V5.0 International Certification',
      },
      shortAnswer: {
        pt: 'Anderson possui a certificação internacional **Huawei Certified ICT Associate - Storage V5.0 (HCIA-Storage)**, emitida em **Junho de 2026** pela **Huawei ICT Academy**, comprovando domínio em arquiteturas corporativas **SAN (Fibre Channel / IP-SAN) e NAS**, níveis **RAID**, virtualização de storage, snapshots e **Disaster Recovery**.',
        en: 'Anderson holds the international **Huawei Certified ICT Associate - Storage V5.0 (HCIA-Storage)** certification, issued in **June 2026** by **Huawei ICT Academy**, validating expertise in enterprise **SAN (Fibre Channel / IP-SAN) and NAS** architectures, **RAID** parity, storage virtualization, snapshots, and **Disaster Recovery**.',
      },
      content: {
        pt: 'A certificação Huawei HCIA-Storage V5.0 é a única certificação internacional oficial declarada no portfólio (ele não declara certificações AWS, Azure ou Kubernetes como possuídas). Ela fundamenta sua atuação em infraestrutura de armazenamento corporativo, resiliência de dados e continuidade de negócios.',
        en: 'The Huawei HCIA-Storage V5.0 certification is the official international certification in his portfolio (he does not claim AWS, Azure, or Kubernetes certifications). It backs his work in enterprise storage infrastructure, data resilience, and business continuity.',
      },
      facets: {
        architecture: {
          pt: 'O escopo técnico da certificação **Huawei HCIA-Storage V5.0** abrange redes de armazenamento **SAN (Fibre Channel e IP-SAN)**, sistemas **NAS**, proteção por paridade **RAID**, snapshots, replicação remota, virtualização de storage e planos de **Disaster Recovery**.',
          en: 'The technical scope of **Huawei HCIA-Storage V5.0** covers **SAN (Fibre Channel & IP-SAN)** storage networks, **NAS** systems, **RAID** parity protection, snapshots, remote replication, storage virtualization, and **Disaster Recovery** planning.',
        },
      },
      keywords: [
        'certificacao', 'certificacoes', 'certificado', 'certification', 'certifications', 'huawei',
        'hcia', 'hcia-storage', 'v5.0', 'storage', 'san', 'nas', 'raid', 'disaster recovery', 'armazenamento',
      ],
      entities: ['huawei', 'hcia_storage'],
      metrics: ['HCIA-Storage V5.0', 'Jun/2026'],
    },

    // 5. Idiomas
    {
      id: 'profile-languages',
      category: 'profile',
      sectionAnchor: '#sobre',
      sectionLabel: { pt: 'Idiomas', en: 'Languages' },
      title: {
        pt: 'Idiomas: Português, Inglês Avançado e Espanhol',
        en: 'Languages: Native Portuguese, Advanced English & Spanish',
      },
      shortAnswer: {
        pt: 'Anderson fala **Português (Nativo)**, **Inglês (Avançado)** — apto para leitura de documentação técnica, comunicação com equipes globais e entrevistas — e possui conhecimentos em **Espanhol**.',
        en: 'Anderson speaks **Portuguese (Native)**, **English (Advanced)** — ready for technical documentation, global engineering collaboration, and interviews — as well as **Spanish**.',
      },
      content: {
        pt: 'O portfólio e o currículo em PDF são integralmente bilíngues (PT-BR e EN), refletindo sua fluência técnica em inglês avançado.',
        en: 'Both his portfolio and PDF resume are fully bilingual (PT-BR and EN), reflecting his advanced technical English proficiency.',
      },
      keywords: [
        'idioma', 'idiomas', 'lingua', 'linguas', 'ingles', 'english', 'espanhol', 'spanish',
        'portugues', 'fluente', 'avancado', 'language', 'languages', 'speak', 'fala',
      ],
      entities: ['idiomas', 'ingles_avancado'],
    },

    // 6. Caso de Sucesso FTP_SYNC
    {
      id: 'rpa-ftp-sync-detail',
      category: 'rpa',
      sectionAnchor: '#rpa',
      sectionLabel: { pt: 'Automação & RPA', en: 'Automation & RPA' },
      title: {
        pt: 'Pipeline FTP_SYNC: Redução de 6 Horas para Menos de 10 Segundos (-99%)',
        en: 'FTP_SYNC Pipeline: From 6 Hours to Under 10 Seconds (-99%)',
      },
      shortAnswer: {
        pt: 'O **FTP_SYNC** é uma ponte autônoma desenvolvida em **Python 3.11+** (**Paramiko SFTP** + **ftplib**) na **Distribuidora Mais Saúde** que sincroniza a cada **15 minutos** os servidores FTP de operadores farmacêuticos (**EDI Pharma Link**: Eurofarma, Eurofarma Genérico, Smartped e Momenta) com o **SFTP do ERP TOTVS WinThor Cloud (Oracle)**, reduzindo um processo manual de **6 horas para menos de 10 segundos (-99%)**.',
        en: '**FTP_SYNC** is an autonomous **Python 3.11+** bridge (**Paramiko SFTP** + **ftplib**) built at **Distribuidora Mais Saúde** that syncs pharmaceutical partner FTPs (**EDI Pharma Link**: Eurofarma, Eurofarma Generic, Smartped, Momenta) with **TOTVS WinThor Cloud SFTP (Oracle)** every **15 minutes**, slashing a **6-hour manual process to under 10 seconds (-99%)**.',
      },
      content: {
        pt: 'Como a otimização de -99% foi alcançada no FTP_SYNC: antes, a operação baixava arquivos manualmente em múltiplos FTPs, convertia layouts e importava no WinThor (6 horas/dia). Anderson implementou varredura agendada a cada 15 min via Windows Task Scheduler e executável PyInstaller, verificação de integridade por hash/checksum para idempotência (evitando reprocessar arquivos duplicados), parsing posicional EDI Pharma Link e transferência direta via SFTP (Paramiko) para o WinThor Cloud conectado ao banco Oracle, com logs estruturados e painel de monitoramento em Streamlit.',
        en: 'How the -99% optimization in FTP_SYNC was achieved: previously, staff manually downloaded files from partner FTPs, converted layouts, and imported them into WinThor (6 hours/day). Anderson engineered a scheduled 15-minute worker packaged with PyInstaller, checksum hash verification for file idempotency, fixed-width EDI Pharma Link parsing, and direct Paramiko SFTP transfer into WinThor Cloud (Oracle DB), monitored via a Streamlit dashboard.',
      },
      facets: {
        challenge: {
          pt: 'Antes do **FTP_SYNC**, o download manual de arquivos em FTPs de parceiros farmacêuticos, a conversão de layout e a importação no **ERP WinThor Cloud (Oracle)** consumiam **6 horas diárias** e geravam atrasos na liberação de pedidos hospitalares.',
          en: 'Before **FTP_SYNC**, manually downloading files from pharmaceutical partner FTPs, transforming layouts, and importing into **WinThor Cloud ERP (Oracle)** took **6 hours daily** and delayed hospital order fulfillment.',
        },
        solution: {
          pt: 'Para resolver isso, Anderson construiu o **FTP_SYNC** em **Python 3.11+** com **Paramiko (SFTP)** e **ftplib**, rodando de forma autônoma a cada **15 minutos** com validação de hash (idempotência de arquivos), parsing posicional **EDI Pharma Link** (Eurofarma, Smartped, Momenta), empacotamento **PyInstaller** e painel de supervisão em **Streamlit**.',
          en: 'To solve this, Anderson built **FTP_SYNC** in **Python 3.11+** using **Paramiko (SFTP)** and **ftplib**, running autonomously every **15 minutes** with checksum hash validation (idempotency), **EDI Pharma Link** parsing (Eurofarma, Smartped, Momenta), **PyInstaller** packaging, and a **Streamlit** monitoring dashboard.',
        },
        resultImpact: {
          pt: 'O resultado direto do **FTP_SYNC** foi a redução do tempo de processo de **6 horas para menos de 10 segundos (-99%)**, operando 24/7 a cada 15 minutos com zero erro humano no banco **Oracle do TOTVS WinThor**.',
          en: 'The direct result of **FTP_SYNC** was slashing execution time from **6 hours to under 10 seconds (-99%)**, running 24/7 every 15 minutes with zero human error into the **TOTVS WinThor Oracle** database.',
        },
      },
      keywords: [
        'ftp_sync', 'ftp sync', 'ftpsync', 'sftp', 'ftp', 'paramiko', 'ftplib', '6 horas', '6h',
        '10 segundos', '10s', '99%', '-99%', '15 minutos', '15 min', 'pharma link', 'edi',
        'eurofarma', 'smartped', 'momenta', 'winthor', 'oracle', 'totvs', 'otimizou', 'reduziu',
      ],
      entities: ['ftp_sync', 'winthor', 'oracle', 'edi_pharma_link', 'mais_saude'],
      metrics: ['6 horas', '10 segundos', '-99%', '15 min', '10 robôs'],
    },

    // 7. Ferramentas Internas Mais Saúde (Streamlit, Tkinter, Google Sheets)
    {
      id: 'internal-tools-streamlit-tkinter-sheets',
      category: 'rpa',
      sectionAnchor: '#projetos',
      sectionLabel: { pt: 'Ferramentas Internas (Mais Saúde)', en: 'Internal Tooling (Mais Saúde)' },
      title: {
        pt: 'Ferramentas Internas: Painel Streamlit, Catálogo Tkinter (Oracle) e Google Sheets',
        en: 'Internal Tooling: Streamlit Dashboard, Tkinter Catalog Updater & Google Sheets',
      },
      shortAnswer: {
        pt: 'Além dos 10 robôs WinThor e da Central Grupo Mais, Anderson desenvolveu três ferramentas internas estratégicas na **Distribuidora Mais Saúde**: um **painel em Streamlit** para monitorar a execução dos robôs em tempo real, um **atualizador desktop em Tkinter** com consultas em lote ao banco **Oracle (WinThor)** e uma automação de inventário com **Google Sheets API e Google Apps Script**.',
        en: 'Alongside the 10 WinThor robots and Central Grupo Mais, Anderson delivered three internal tools at **Distribuidora Mais Saúde**: a **Streamlit dashboard** for real-time robot monitoring, a **Tkinter desktop catalog updater** executing batch **Oracle SQL (WinThor)** queries, and an inventory automation using **Google Sheets API and Google Apps Script**.',
      },
      content: {
        pt: 'Essas ferramentas garantem observabilidade operacional para a equipe de TI e negócios: o painel Streamlit exibe logs estruturados e status de cada robô agendado; o utilitário Tkinter permite atualização rápida de catálogos direto no Oracle; e o Google Sheets Apps Script apoia o controle ágil de inventário.',
        en: 'These tools provide operational observability: the Streamlit dashboard displays structured logs and status for scheduled robots; the Tkinter utility enables fast batch catalog updates in Oracle; and Google Sheets Apps Script supports agile inventory tracking.',
      },
      keywords: [
        'streamlit', 'tkinter', 'google sheets', 'apps script', 'painel de automacoes',
        'monitoramento de robos', 'atualizador de catalogo', 'ferramentas internas', 'desktop',
      ],
      entities: ['streamlit', 'tkinter', 'google_sheets', 'oracle', 'winthor', 'mais_saude'],
    },

    // 8. Squad de 9 Agentes de IA (Maker-Checker)
    {
      id: 'ai-agents-squad-maker-checker',
      category: 'ai_agents',
      sectionAnchor: '#experiencia',
      sectionLabel: { pt: 'Squad de 9 Agentes de IA', en: '9-Agent AI Squad' },
      title: {
        pt: 'Squad de 9 Agentes de IA & Governança Maker-Checker',
        en: '9-Agent AI Squad & Maker-Checker Governance',
      },
      shortAnswer: {
        pt: 'Na **Distribuidora Mais Saúde**, Anderson implementou um **escritório com 9 agentes de IA** sob arquitetura **Maker-Checker** utilizando **Claude Code**, **MCP (Model Context Protocol)**, **Gemini API** e **Spec-Driven Development (OpenSpec)**: composto por **1 Orquestrador**, **5 Executores Especialistas (Makers)** e **3 Validadores Independentes (Checkers)**.',
        en: 'At **Distribuidora Mais Saúde**, Anderson implemented a **9-agent AI engineering squad** under a **Maker-Checker** architecture using **Claude Code**, **MCP (Model Context Protocol)**, **Gemini API**, and **OpenSpec**: structured as **1 Orchestrator**, **5 specialized Makers**, and **3 independent Checkers**.',
      },
      content: {
        pt: 'Regra de ouro do modelo Maker-Checker: quem desenvolve o código (Front-End, Back-End, Automação, Banco de Dados, Documentação) NUNCA valida a própria entrega. Os 3 agentes validadores independentes (QA, Segurança AppSec/LGPD e Compliance de Design System) exigem aprovação em 58 testes automatizados em Pytest (E2E, autenticação e LGPD) e 35 asserções visuais em Playwright antes do go-live, operando com menor privilégio e protocolo anti-alucinação.',
        en: 'Golden rule of the Maker-Checker model: the agent that writes the code (Front-End, Back-End, Automation, Database, Documentation) NEVER validates its own work. The 3 independent validator agents (QA, AppSec/LGPD Security, and Design System Compliance) enforce 58 automated Pytest tests and 35 Playwright visual assertions before go-live, operating under least privilege and anti-hallucination guardrails.',
      },
      facets: {
        architecture: {
          pt: 'A divisão exata dos **9 agentes de IA** na Mais Saúde é: **1 Orquestrador** (planeja e decompõe tarefas via OpenSpec), **5 Executores Makers** (Front-End, Back-End, Automação RPA, Banco de Dados e Documentação) e **3 Validadores Checkers independentes** (QA, Segurança/LGPD e Compliance de Design System), integrados via **Claude Code** e **MCP**.',
          en: 'The exact breakdown of the **9 AI agents** at Mais Saúde is: **1 Orchestrator** (plans and decomposes tasks via OpenSpec), **5 Maker Executors** (Front-End, Back-End, RPA Automation, Database, and Documentation), and **3 independent Checker Validators** (QA, AppSec/LGPD Security, and Design System Compliance), integrated via **Claude Code** and **MCP**.',
        },
        solution: {
          pt: 'O princípio **Maker-Checker** garante que nenhum agente aprove o próprio código: toda entrega dos Makers passa obrigatoriamente por **58 testes Pytest** e **35 asserções Playwright** executados pelos Checkers antes de ir para produção.',
          en: 'The **Maker-Checker** principle ensures no agent approves its own code: every Maker delivery must pass **58 Pytest tests** and **35 Playwright assertions** enforced by the Checkers before reaching production.',
        },
      },
      keywords: [
        '9 agentes', '9 agents', 'squad', 'maker-checker', 'maker checker', 'claude code', 'mcp',
        'model context protocol', 'orquestrador', 'orchestrator', 'openspec', 'agentes de ia',
        'ai agents', 'multiagente', 'multi-agent', 'anti-alucinacao', 'validadores', 'checkers',
      ],
      entities: ['9_agentes', 'maker_checker', 'claude_code', 'mcp', 'pytest', 'playwright', 'mais_saude'],
      metrics: ['9 agentes', '58 testes Pytest', '35 asserções Playwright'],
    },

    // 9. Qualidade de Software, Pytest e Playwright
    {
      id: 'qa-testing-pytest-playwright',
      category: 'skill',
      sectionAnchor: '#habilidades',
      sectionLabel: { pt: 'Qualidade de Software & Testes', en: 'Software Quality & Testing' },
      title: {
        pt: 'Engenharia de Qualidade: 58 Testes Pytest e 35 Asserções Playwright',
        en: 'Quality Engineering: 58 Pytest Suites & 35 Playwright Assertions',
      },
      shortAnswer: {
        pt: 'Anderson instituiu qualidade como gate obrigatório de go-live, entregando **58 testes automatizados em Pytest** (cobrindo fluxos E2E de API, autenticação JWT/SSO e anonimização LGPD) e **35 asserções em Playwright** (regressão visual, acessibilidade WCAG 2.1 AA e verificação de drift do design system), com **100% de aprovação**.',
        en: 'Anderson established automated quality gates in production, delivering **58 automated Pytest tests** (covering API E2E flows, JWT/SSO auth, and LGPD anonymization) and **35 Playwright assertions** (visual regression, WCAG 2.1 AA accessibility, and design system drift checks), achieving a **100% pass rate**.',
      },
      content: {
        pt: 'Os gates de qualidade rodam integrados ao CI/CD (GitHub Actions), combinando lint estrito (ESLint 9 + TypeScript strict mode), suíte de 40+ evals de IA, auditoria de contraste WCAG AA e homologação independente Maker-Checker.',
        en: 'Quality gates run continuously in CI/CD (GitHub Actions), combining strict linting (ESLint 9 + TypeScript strict mode), 40+ AI evals, WCAG AA contrast verification, and independent Maker-Checker sign-off.',
      },
      keywords: [
        'pytest', 'playwright', 'teste', 'testes', 'testing', 'qa', 'qualidade', '58', '35',
        'e2e', 'unitario', 'integracao', 'regressao visual', 'go-live', 'auditoria', 'ci/cd',
      ],
      entities: ['pytest', 'playwright', 'qa'],
      metrics: ['58 testes Pytest', '35 asserções Playwright'],
    },

    // 10. Recursos Interativos do Próprio Portfólio (Terminal CLI, Command Palette, Calculadora de ROI, PWA, OG)
    {
      id: 'portfolio-interactive-features',
      category: 'portfolio_feature',
      sectionAnchor: '#projetos',
      sectionLabel: { pt: 'Recursos Interativos do Portfólio', en: 'Interactive Portfolio Features' },
      title: {
        pt: 'Funcionalidades SaaS do Portfólio: Terminal CLI (sudo hire), Command Palette (Ctrl+K), Simulador de ROI e PWA',
        en: 'Portfolio SaaS Features: Interactive CLI (sudo hire), Command Palette (Ctrl+K), ROI Simulator & PWA',
      },
      shortAnswer: {
        pt: 'Este portfólio (`andersoncataldo.tech`) foi construído como uma aplicação SaaS interativa contendo: **Command Palette Global (`Ctrl+K` / `Cmd+K`)**, **Terminal CLI Executável (`DevConsole`)** com comandos como `help`, `bio`, `stack`, `rpa`, `ai-agents`, `projects`, `cv` e o easter egg `sudo hire`, **Simulador Interativo de ROI de Automação RPA**, suporte **PWA Offline (`vite-plugin-pwa`)** e geração dinâmica de imagens **OpenGraph no Edge (`/api/og`)**.',
        en: 'This portfolio (`andersoncataldo.tech`) is engineered as an interactive SaaS application featuring: **Global Command Palette (`Ctrl+K` / `Cmd+K`)**, **Executable CLI Terminal (`DevConsole`)** supporting commands like `help`, `bio`, `stack`, `rpa`, `ai-agents`, `projects`, `cv`, and the `sudo hire` easter egg, **Interactive RPA ROI Calculator**, **Offline PWA support (`vite-plugin-pwa`)**, and **Dynamic Edge OpenGraph generation (`/api/og`)**.',
      },
      content: {
        pt: 'Detalhes das features do site: (1) No Terminal CLI do topo (Hero), digitar "sudo hire" ativa um fast-track de contratação com link direto para o WhatsApp de Anderson, além de abas JSON copiáveis (profile.json, stack.json, metrics.json). (2) A Calculadora de ROI de RPA na seção Automação permite simular volume mensal de documentos, tempo manual por item e custo/hora para calcular horas poupadas e economia anual em R$. (3) O Command Palette (Ctrl+K) permite navegar por seções, baixar o currículo em PT ou EN, alternar tema claro/escuro, mudar idioma e abrir o Anderson AI.',
        en: 'Site feature details: (1) In the Hero CLI Terminal, typing "sudo hire" triggers a hiring fast-track with a direct WhatsApp CTA, alongside copyable JSON tabs (profile.json, stack.json, metrics.json). (2) The RPA ROI Calculator in the Automation section lets visitors adjust sliders for monthly volume, manual time per item, and hourly rate to compute saved hours and annual savings. (3) The Command Palette (Ctrl+K) enables quick navigation, PT/EN resume downloads, theme/language toggling, and launching Anderson AI.',
      },
      keywords: [
        'sudo hire', 'terminal', 'cli', 'devconsole', 'command palette', 'ctrl+k', 'cmd+k',
        'atalho', 'calculadora', 'simulador', 'roi', 'pwa', 'offline', 'opengraph', 'api/og',
        'funcionalidades do site', 'este site', 'este portfolio', 'easter egg',
      ],
      entities: ['portfolio_web_tech', 'dev_console', 'command_palette', 'rpa_roi_calculator', 'pwa'],
    },

    // 11. Contato, Contratação, Disponibilidade e Currículo
    {
      id: 'contact-and-hiring',
      category: 'contact',
      sectionAnchor: '#contato',
      sectionLabel: { pt: 'Contato & Oportunidades', en: 'Contact & Inquiries' },
      title: {
        pt: 'Canais de Contato Direto, Disponibilidade e Download de Currículo',
        en: 'Direct Contact Channels, Availability & Resume Download',
      },
      shortAnswer: {
        pt: `Anderson reside em **Fortaleza, CE** e está disponível para oportunidades **Remotas, Híbridas ou Presenciais**. Você pode falar diretamente com ele pelo e-mail **[${EMAIL}](mailto:${EMAIL})**, **[LinkedIn](${LINKEDIN_URL})**, **[WhatsApp (+55 85 99225-8794)](${WHATSAPP_URL})** ou **[GitHub](${GITHUB_URL})**, além de baixar o **Currículo em PDF (PT/EN)** no topo da página.`,
        en: `Anderson is based in **Fortaleza, CE, Brazil** and is available for **Remote, Hybrid, or On-Site** roles. You can reach him directly via email at **[${EMAIL}](mailto:${EMAIL})**, **[LinkedIn](${LINKEDIN_URL})**, **[WhatsApp (+55 85 99225-8794)](${WHATSAPP_URL})**, or **[GitHub](${GITHUB_URL})**, and download his **PDF Resume (PT/EN)** from the top navigation.`,
      },
      content: {
        pt: `Canais oficiais verificados de Anderson Cataldo: E-mail: ${EMAIL} | LinkedIn: ${LINKEDIN_URL} | GitHub: ${GITHUB_URL} | WhatsApp: +55 85 99225-8794 | Localização: ${LOCATION}. Para propostas de contratação, entrevistas técnicas ou projetos de Engenharia Full-Stack, Automação RPA e Agentes de IA, basta acionar qualquer um dos canais acima.`,
        en: `Verified official contact channels for Anderson Cataldo: Email: ${EMAIL} | LinkedIn: ${LINKEDIN_URL} | GitHub: ${GITHUB_URL} | WhatsApp: +55 85 99225-8794 | Location: ${LOCATION}. For hiring inquiries, technical interviews, or Full-Stack, RPA, and AI Engineering opportunities, reach out through any channel above.`,
      },
      facets: {
        location_where: {
          pt: `Anderson mora em **Fortaleza, Ceará, Brasil**, e possui disponibilidade imediata para trabalho **Remoto, Híbrido ou Presencial**.`,
          en: `Anderson is located in **Fortaleza, Ceará, Brazil**, with immediate availability for **Remote, Hybrid, or On-Site** work.`,
        },
      },
      keywords: [
        'contato', 'contact', 'email', 'e-mail', 'linkedin', 'github', 'whatsapp', 'telefone',
        'celular', 'contratar', 'contratacao', 'hire', 'hiring', 'entrevista', 'interview',
        'vaga', 'disponibilidade', 'disponivel', 'remoto', 'remote', 'hibrido', 'presencial',
        'fortaleza', 'ceara', 'curriculo', 'cv', 'resume', 'pdf', 'falar com', 'onde mora', 'cidade',
      ],
      entities: ['contato', 'email', 'linkedin', 'github', 'whatsapp', 'curriculo', 'fortaleza'],
    },
  ];

  // 12. Adicionar dinamicamente cada Experiência de src/data/experience.ts com Facetas
  for (const exp of experiences) {
    if (exp.type === 'work') {
      const slug = exp.company.toLowerCase().includes('mais') ? 'mais-saude' : '3coracoes';
      const extraMetricPt = slug === '3coracoes' ? ' (com **99.85% de acurácia SEFAZ**)' : '';
      const extraMetricEn = slug === '3coracoes' ? ' (with **99.85% SEFAZ accuracy**)' : '';
      chunks.push({
        id: `experience-${slug}`,
        category: 'experience',
        sectionAnchor: '#experiencia',
        sectionLabel: { pt: 'Experiência Profissional', en: 'Work Experience' },
        title: {
          pt: `${exp.company} — ${exp.title.pt} (${exp.period.pt})`,
          en: `${exp.company} — ${exp.title.en} (${exp.period.en})`,
        },
        shortAnswer: {
          pt: `Na **${exp.company}** (${exp.period.pt}, ${exp.location.pt}), atuando como **${exp.title.pt}**: ${exp.summary.pt}${extraMetricPt}`,
          en: `At **${exp.company}** (${exp.period.en}, ${exp.location.en}), serving as **${exp.title.en}**: ${exp.summary.en}${extraMetricEn}`,
        },
        content: {
          pt: `${exp.company} (${exp.period.pt}) — ${exp.companyRole.pt}.\nPrincipais entregas:\n${exp.results.map((r) => `- ${r.pt}`).join('\n')}\nStack utilizada: ${exp.stack.join(', ')}.`,
          en: `${exp.company} (${exp.period.en}) — ${exp.companyRole.en}.\nKey deliveries:\n${exp.results.map((r) => `- ${r.en}`).join('\n')}\nStack used: ${exp.stack.join(', ')}.`,
        },
        facets: {
          role: {
            pt: `Na **${exp.company}**, o cargo de Anderson é **${exp.title.pt}** (${exp.companyRole.pt}), atuando no período de **${exp.period.pt}** em formato **${exp.location.pt}**.`,
            en: `At **${exp.company}**, Anderson's role is **${exp.title.en}** (${exp.companyRole.en}), during **${exp.period.en}** (${exp.location.en}).`,
          },
          architecture: {
            pt: `A stack tecnológica utilizada na **${exp.company}** inclui: **${exp.stack.join(', ')}**.`,
            en: `The technology stack used at **${exp.company}** includes: **${exp.stack.join(', ')}**.`,
          },
          resultImpact: {
            pt: `Principais resultados entregues na **${exp.company}**:\n${exp.results.slice(0, 4).map((r) => `- ${r.pt}`).join('\n')}`,
            en: `Key results delivered at **${exp.company}**:\n${exp.results.slice(0, 4).map((r) => `- ${r.en}`).join('\n')}`,
          },
          metricsSummary: {
            pt: `Métricas de destaque na **${exp.company}**: ${exp.metrics.map((m) => `**${m.label.pt}: ${typeof m.value === 'string' ? m.value : m.value.pt}**`).join(' • ')}.`,
            en: `Highlight metrics at **${exp.company}**: ${exp.metrics.map((m) => `**${m.label.en}: ${typeof m.value === 'string' ? m.value : m.value.en}**`).join(' • ')}.`,
          },
          ...(slug === '3coracoes'
            ? {
                firstJob: {
                  pt: `**Primeiro Emprego Corporativo — ${exp.company} (${exp.period.pt}):** Anderson iniciou sua carreira corporativa no **Grupo 3corações** como **${exp.title.pt}** (${exp.companyRole.pt}), atuando presencialmente por **1 ano e 4 meses**. Nessa primeira experiência profissional, desenvolveu **5 robôs RPA em Python** para renovação automática de **CNDs** e processamento de **15.000+ XMLs fiscais/mês** com **99,85% de precisão SEFAZ**, poupando **200+ horas manuais**.`,
                  en: `**First Corporate Job — ${exp.company} (${exp.period.en}):** Anderson started his corporate career at **Grupo 3corações** as **${exp.title.en}** (${exp.companyRole.en}), working on-site for **1 year and 4 months**. In this first professional role, he built **5 Python RPA robots** for automated **CND** renewals and processing **15,000+ monthly tax XMLs** with **99.85% SEFAZ accuracy**, saving **200+ manual hours**.`,
                },
              }
            : {
                currentJob: {
                  pt: `**Emprego Atual — ${exp.company} (${exp.period.pt}):** Atualmente, Anderson trabalha na **Distribuidora Mais Saúde** como **${exp.title.pt}** (${exp.companyRole.pt}), onde projetou e desenvolve a **Central Grupo Mais (monorepo SSO com 4 sistemas internos)**, **10 robôs Python integrados ao ERP TOTVS WinThor (Oracle)** (incluindo o **FTP_SYNC com redução de 6h para <10s, -99%**), o **escritório de 9 agentes de IA (Maker-Checker com Claude Code)** e **58 testes Pytest + 35 asserções Playwright**.`,
                  en: `**Current Job — ${exp.company} (${exp.period.en}):** Currently, Anderson works at **Distribuidora Mais Saúde** as **${exp.title.en}** (${exp.companyRole.en}), where he architected and builds **Central Grupo Mais (SSO monorepo unifying 4 internal systems)**, **10 Python robots integrated with TOTVS WinThor ERP (Oracle)** (including **FTP_SYNC reducing 6h to <10s, -99%**), the **9-agent AI squad (Maker-Checker with Claude Code)**, and **58 Pytest + 35 Playwright tests**.`,
                },
              }),
        },
        keywords: [
          exp.company.toLowerCase(),
          slug.replace('-', ' '),
          ...exp.stack.map((s) => s.toLowerCase()),
          'experiencia', 'experience', 'empresa', 'company', 'trabalho', 'emprego', 'cargo', 'role',
          ...(slug === '3coracoes'
            ? [
                'primeiro emprego', 'primeira experiencia', 'primeira empresa', 'onde comecou',
                'comecou a trabalhar', 'emprego anterior', 'ultimo emprego', 'aprendiz',
                'jovem aprendiz', 'first job', 'previous job', 'started working', 'apprentice',
              ]
            : [
                'emprego atual', 'trabalho atual', 'onde trabalha hoje', 'trabalha atualmente',
                'empresa atual', 'cargo atual', 'estagiario', 'estagio', 'current job',
                'current role', 'where does he work', 'intern',
              ]),
        ],
        entities: [slug.replace('-', '_'), ...exp.stack.map((s) => s.toLowerCase())],
      });
    }
  }

  // 13. Adicionar dinamicamente cada Projeto de src/data/projects.ts com todas as Facetas (Desafio, Solução, Arquitetura, Impacto, Papel, Métricas)
  for (const proj of projects) {
    chunks.push({
      id: `project-${proj.id}`,
      category: 'project',
      sectionAnchor: '#projetos',
      sectionLabel: { pt: 'Seção Projetos', en: 'Projects Section' },
      title: {
        pt: `${proj.title.pt} — ${proj.subtitle.pt}`,
        en: `${proj.title.en} — ${proj.subtitle.en}`,
      },
      shortAnswer: {
        pt: `**${proj.title.pt}**: ${proj.description.pt} **Solução:** ${proj.solution.pt} **Resultado:** ${proj.result.pt}`,
        en: `**${proj.title.en}**: ${proj.description.en} **Solution:** ${proj.solution.en} **Result:** ${proj.result.en}`,
      },
      content: {
        pt: `Projeto: ${proj.title.pt} (${proj.categoryLabel.pt}).\nDesafio: ${proj.challenge.pt}\nPapel: ${proj.role.pt}\nSolução Técnica: ${proj.solution.pt}\nArquitetura:\n${proj.architecture.map((a) => `- ${a.pt}`).join('\n')}\nResultado e Impacto: ${proj.result.pt} ${proj.impact.pt}\nMétricas: ${proj.metrics.map((m) => `${m.label.pt}: ${m.value}`).join(' | ')}\nTecnologias: ${proj.techStack.join(', ')}.`,
        en: `Project: ${proj.title.en} (${proj.categoryLabel.en}).\nChallenge: ${proj.challenge.en}\nRole: ${proj.role.en}\nTechnical Solution: ${proj.solution.en}\nArchitecture:\n${proj.architecture.map((a) => `- ${a.en}`).join('\n')}\nResult & Impact: ${proj.result.en} ${proj.impact.en}\nMetrics: ${proj.metrics.map((m) => `${m.label.en}: ${m.value}`).join(' | ')}\nTechnologies: ${proj.techStack.join(', ')}.`,
      },
      facets: {
        challenge: {
          pt: `**Desafio do projeto ${proj.title.pt}:** ${proj.challenge.pt}`,
          en: `**Challenge in ${proj.title.en}:** ${proj.challenge.en}`,
        },
        solution: {
          pt: `**Solução implementada em ${proj.title.pt}:** ${proj.solution.pt}`,
          en: `**Solution implemented in ${proj.title.en}:** ${proj.solution.en}`,
        },
        architecture: {
          pt: `**Arquitetura e Stack de ${proj.title.pt} (${proj.techStack.join(', ')}):**\n${proj.architecture.map((a) => `- ${a.pt}`).join('\n')}`,
          en: `**Architecture & Stack of ${proj.title.en} (${proj.techStack.join(', ')}):**\n${proj.architecture.map((a) => `- ${a.en}`).join('\n')}`,
        },
        resultImpact: {
          pt: `**Resultados e Impacto de ${proj.title.pt}:** ${proj.result.pt} ${proj.impact.pt} (${proj.metrics.map((m) => `**${m.label.pt}: ${m.value}**`).join(' • ')}).`,
          en: `**Results & Impact of ${proj.title.en}:** ${proj.result.en} ${proj.impact.en} (${proj.metrics.map((m) => `**${m.label.en}: ${m.value}**`).join(' • ')}).`,
        },
        role: {
          pt: `**Papel no projeto ${proj.title.pt}:** Anderson atuou como **${proj.role.pt}**, conduzindo desde a concepção arquitetural até a entrega em produção com gates de qualidade (**58 testes Pytest** e **35 asserções Playwright**).`,
          en: `**Role in ${proj.title.en}:** Anderson served as **${proj.role.en}**, leading from architectural design to production delivery with automated quality gates (**58 Pytest tests** and **35 Playwright assertions**).`,
        },
        metricsSummary: {
          pt: `Métricas do projeto **${proj.title.pt}**: ${proj.metrics.map((m) => `**${m.label.pt}: ${m.value}**`).join(' | ')}.`,
          en: `Metrics for **${proj.title.en}**: ${proj.metrics.map((m) => `**${m.label.en}: ${m.value}**`).join(' | ')}.`,
        },
      },
      keywords: [
        proj.id,
        ...proj.id.split('-').filter((w) => w.length >= 4),
        proj.title.pt.toLowerCase(),
        proj.title.en.toLowerCase(),
        ...proj.techStack.map((t) => t.toLowerCase()),
      ],
      entities: [proj.id.replace(/-/g, '_'), ...proj.techStack.map((t) => t.toLowerCase())],
    });
  }

  // 13b. Catálogo Completo de Projetos em Produção (7 Projetos Principais)
  chunks.push({
    id: 'projects-catalog-overview',
    category: 'project',
    sectionAnchor: '#projetos',
    sectionLabel: { pt: 'Catálogo de Projetos', en: 'Projects Catalog' },
    title: {
      pt: `Catálogo Completo de Projetos (${projects.length} Sistemas e Pipelines em Produção)`,
      en: `Complete Projects Catalog (${projects.length} Production Systems & Pipelines)`,
    },
    shortAnswer: {
      pt: `O portfólio de Anderson Cataldo apresenta **${projects.length} projetos principais em produção** (além de **15 robôs corporativos**):\n${projects.map((p, idx) => `${idx + 1}. **${p.title.pt}** (${p.categoryLabel.pt}) — ${p.subtitle.pt}`).join('\n')}`,
      en: `Anderson Cataldo’s portfolio showcases **${projects.length} flagship production projects** (plus **15 corporate robots**):\n${projects.map((p, idx) => `${idx + 1}. **${p.title.en}** (${p.categoryLabel.en}) — ${p.subtitle.en}`).join('\n')}`,
    },
    content: {
      pt: projects.map((p) => `- ${p.title.pt}: ${p.description.pt} (Stack: ${p.techStack.join(', ')})`).join('\n'),
      en: projects.map((p) => `- ${p.title.en}: ${p.description.en} (Stack: ${p.techStack.join(', ')})`).join('\n'),
    },
    keywords: [
      'todos os projetos', 'quais sao os projetos', 'quais projetos ele fez', 'lista de projetos',
      'quantos projetos', 'catalogo de projetos', 'all projects', 'list of projects', 'how many projects',
    ],
    entities: ['projetos_catalogo', ...projects.map((p) => p.id.replace(/-/g, '_'))],
  });

  // 14. Adicionar dinamicamente cada Etapa do Pipeline de Automação (src/data/automation.ts)
  for (const step of automationPipeline) {
    chunks.push({
      id: `rpa-step-${step.stepNumber}`,
      category: 'rpa',
      sectionAnchor: '#rpa',
      sectionLabel: { pt: 'Pipeline de Automação & RPA', en: 'Automation & RPA Pipeline' },
      title: {
        pt: `Etapa ${step.stepNumber} do Pipeline RPA: ${step.title.pt}`,
        en: `RPA Pipeline Step ${step.stepNumber}: ${step.title.en}`,
      },
      shortAnswer: {
        pt: `Na **Etapa ${step.stepNumber} (${step.title.pt})** do pipeline de automação: ${step.description.pt} (**Métrica:** ${step.metrics.pt} | **Stack:** ${step.technologies.join(', ')}).`,
        en: `In **Step ${step.stepNumber} (${step.title.en})** of the automation pipeline: ${step.description.en} (**Metric:** ${step.metrics.en} | **Stack:** ${step.technologies.join(', ')}).`,
      },
      content: {
        pt: `${step.title.pt}: ${step.description.pt}\nDetalhes técnicos:\n${step.details.map((d) => `- ${d.pt}`).join('\n')}\nTecnologias: ${step.technologies.join(', ')}.`,
        en: `${step.title.en}: ${step.description.en}\nTechnical details:\n${step.details.map((d) => `- ${d.en}`).join('\n')}\nTechnologies: ${step.technologies.join(', ')}.`,
      },
      keywords: [
        step.title.pt.toLowerCase(),
        step.title.en.toLowerCase(),
        ...step.technologies.map((t) => t.toLowerCase()),
        'rpa', 'pipeline', 'automacao', 'automation', 'robo', 'robot', `etapa ${step.stepNumber}`,
      ],
      entities: ['rpa_pipeline', ...step.technologies.map((t) => t.toLowerCase())],
    });
  }

  // 15. Adicionar dinamicamente cada Categoria de Habilidade (src/data/skills.ts)
  for (const cat of skillCategories) {
    const skillNames = cat.skills.map((s) => s.name);
    chunks.push({
      id: `skills-${cat.id}`,
      category: 'skill',
      sectionAnchor: '#habilidades',
      sectionLabel: { pt: 'Habilidades & Tecnologias', en: 'Skills & Technologies' },
      title: {
        pt: `Competências em ${cat.title.pt}`,
        en: `Skills in ${cat.title.en}`,
      },
      shortAnswer: {
        pt: `Em **${cat.title.pt}**, Anderson domina: ${cat.skills.map((s) => `**${s.name}** (${s.keyword.pt})`).join('; ')}.`,
        en: `In **${cat.title.en}**, Anderson specializes in: ${cat.skills.map((s) => `**${s.name}** (${s.keyword.en})`).join('; ')}.`,
      },
      content: {
        pt: `${cat.title.pt}: ${cat.description.pt}\nHabilidades detalhadas:\n${cat.skills.map((s) => `- ${s.name} [${s.level}]: ${s.keyword.pt}`).join('\n')}`,
        en: `${cat.title.en}: ${cat.description.en}\nDetailed skills:\n${cat.skills.map((s) => `- ${s.name} [${s.level}]: ${s.keyword.en}`).join('\n')}`,
      },
      keywords: [
        cat.id,
        cat.title.pt.toLowerCase(),
        cat.title.en.toLowerCase(),
        ...skillNames.map((n) => n.toLowerCase()),
        'skill', 'skills', 'habilidade', 'habilidades', 'stack', 'tecnologia', 'dominadas',
      ],
      entities: [cat.id.replace(/-/g, '_'), ...skillNames.map((n) => n.toLowerCase())],
    });
  }

  // 16. Resumo Consolidado das Métricas Oficiais (src/data/metrics.ts)
  chunks.push({
    id: 'metrics-official-summary',
    category: 'metric',
    sectionAnchor: '#inicio',
    sectionLabel: { pt: 'Métricas de Impacto', en: 'Impact Metrics' },
    title: {
      pt: 'Métricas Oficiais Comprovadas em Produção',
      en: 'Verified Production Impact Metrics',
    },
    shortAnswer: {
      pt: 'Principais métricas auditadas em produção: **15 robôs corporativos** (10 na Mais Saúde + 5 no Grupo 3corações), **-99% no tempo do FTP_SYNC** (de 6h para <10s), **15.000+ XMLs fiscais/mês** com **99,85% de precisão SEFAZ**, **200+ horas manuais poupadas**, **9 agentes de IA Maker-Checker**, **58 testes Pytest + 35 asserções Playwright** e **4 sistemas unificados com SSO**.',
      en: 'Key verified production metrics: **15 corporate robots** (10 at Mais Saúde + 5 at Grupo 3corações), **-99% time reduction in FTP_SYNC** (from 6h to <10s), **15,000+ fiscal XMLs/month** with **99.85% SEFAZ accuracy**, **200+ manual hours saved**, **9 Maker-Checker AI agents**, **58 Pytest tests + 35 Playwright assertions**, and **4 unified SSO systems**.',
    },
    content: {
      pt: keyMetrics.map((m) => `- ${m.value} ${m.label.pt}: ${m.description.pt} (${m.trend.pt})`).join('\n'),
      en: keyMetrics.map((m) => `- ${m.value} ${m.label.en}: ${m.description.en} (${m.trend.en})`).join('\n'),
    },
    keywords: [
      'metrica', 'metricas', 'metrics', 'numeros', 'numbers', 'resultados', 'results', 'impacto',
      'impact', 'quantos robos', 'how many robots', '15 robos', '15.000', '99.85%', '200 horas',
    ],
    entities: ['metrics', 'ftp_sync', 'winthor', '3coracoes', 'mais_saude'],
    metrics: ['15', '-99%', '15.000+', '99.85%', '200+', '9 Agentes', '58', '35', '4'],
  });

  const apiKey = process.env.GEMINI_API_KEY;
  let embeddingModelUsed = 'hybrid-local-tfidf-bm25-v2.1';

  if (apiKey) {
    try {
      console.log('🧠 [build-knowledge] GEMINI_API_KEY detectada! Gerando embeddings via text-embedding-004...');
      const ptTexts = chunks.map((c) => `${c.title.pt}. ${c.shortAnswer.pt} ${c.keywords.join(' ')}`);
      const enTexts = chunks.map((c) => `${c.title.en}. ${c.shortAnswer.en} ${c.keywords.join(' ')}`);
      const [ptEmbeddings, enEmbeddings] = await Promise.all([
        fetchGeminiEmbeddingsBatch(ptTexts, apiKey),
        fetchGeminiEmbeddingsBatch(enTexts, apiKey),
      ]);
      chunks.forEach((chunk, idx) => {
        chunk.embedding = {
          pt: ptEmbeddings[idx],
          en: enEmbeddings[idx],
        };
      });
      embeddingModelUsed = 'text-embedding-004+hybrid-bm25';
      console.log('✅ [build-knowledge] Embeddings densos gerados e quantizados com sucesso.');
    } catch (err) {
      console.warn('⚠️ [build-knowledge] Falha ao consultar Gemini Embeddings API, mantendo índice vetorial local:', err.message);
    }
  }

  /** @type {import('../src/lib/ai/types').KnowledgeIndexFile} */
  const knowledgeIndex = {
    version: '2.1.0',
    generatedAt: new Date().toISOString(),
    embeddingModel: embeddingModelUsed,
    totalChunks: chunks.length,
    canonicalMetrics: {
      shippedRobots: '15',
      maisSaudeRobots: '10',
      tresCoracoesRobots: '5',
      ftpSyncReduction: '-99%',
      ftpSyncBefore: '6 horas',
      ftpSyncAfter: '10 segundos',
      ftpSyncInterval: '15 min',
      monthlyXmls: '15.000+',
      sefazAccuracy: '99.85%',
      hoursSaved: '200+',
      aiAgentsCount: '9',
      pytestCount: '58',
      playwrightCount: '35',
      unifiedSystemsCount: '4',
      semester: '6º Semestre',
      studyDurationYears: '3 anos',
      studyPeriod: '2024 - 2027',
      workDurationYears: '~2 anos',
      workStart: 'Janeiro de 2025',
      tresCoracoesDuration: '1 ano e 4 meses',
      certificationName: 'Huawei HCIA-Storage V5.0',
    },
    knownTechnologies: [
      'python', 'typescript', 'javascript', 'react', 'next.js', 'nextjs', 'vite', 'tailwind',
      'fastapi', 'node.js', 'nodejs', 'express', 'sqlalchemy', 'alembic', 'pydantic', 'zod',
      'postgresql', 'postgres', 'supabase', 'rls', 'oracle', 'winthor', 'totvs', 'sqlite',
      'mongodb', 'neon', 'java', 'spring boot', 'django', 'vue', 'vue.js', 'framer motion',
      'recharts', 'lucide', 'playwright', 'pytest', 'selenium', 'pandas', 'lxml', 'beautifulsoup',
      'openpyxl', 'pyinstaller', 'paramiko', 'ftplib', 'sftp', 'ftp', 'edi pharma link',
      'streamlit', 'tkinter', 'claude code', 'mcp', 'gemini', 'openai', 'openspec', 'pm2',
      'docker', 'github actions', 'cloudflare pages', 'render', 'vercel', 'huawei', 'hcia-storage',
      'san', 'nas', 'raid', 'sha-256', 'jwt', 'sso', 'rbac', 'wcag', 'pwa', 'google sheets', 'apps script',
    ],
    unlistedCommonTechnologies: [
      'cobol', 'rust', 'elixir', 'erlang', 'haskell', 'scala', 'clojure', 'fortran', 'perl',
      'ruby on rails', 'ruby', 'laravel', 'php', 'symfony', 'wordpress', 'drupal', 'magento',
      'flutter', 'dart', 'swift', 'objective-c', 'kotlin', 'xamarin', 'ionic', 'cordova',
      'c#', '.net', 'aspnet', 'blazor', 'delphi', 'vb.net', 'abap', 'sap', 'salesforce', 'apex',
      'solidity', 'web3', 'blockchain', 'ethereum', 'unreal engine', 'unity', 'godot',
      'cassandra', 'couchbase', 'neo4j', 'dynamodb', 'snowflake', 'databricks', 'hadoop', 'spark', 'kafka',
      'terraform', 'ansible', 'puppet', 'chef', 'openshift', 'rancher', 'istio', 'cypress', 'jest', 'angular', 'svelte',
    ],
    chunks,
  };

  const outPath = path.resolve(ROOT_DIR, 'src/data/knowledgeIndex.json');
  fs.writeFileSync(outPath, JSON.stringify(knowledgeIndex, null, 2) + '\n', 'utf-8');
  console.log(`✅ [build-knowledge] ${chunks.length} chunks facetados gravados em src/data/knowledgeIndex.json.`);
}

main().catch((err) => {
  console.error('❌ Erro em build-knowledge:', err);
  process.exit(1);
});
