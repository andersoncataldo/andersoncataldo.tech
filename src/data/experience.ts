import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    title: {
      pt: 'Estagiário de Tecnologia da Informação',
      en: 'Information Technology Intern',
    },
    company: 'Distribuidora Mais Saúde',
    companyRole: {
      pt: 'Desenvolvedor Full-Stack & Suporte a Sistemas',
      en: 'Full-Stack Developer & Systems Support',
    },
    period: { pt: 'Jun/2026 - Presente', en: 'Jun/2026 - Present' },
    location: { pt: 'Fortaleza, CE - Presencial', en: 'Fortaleza, CE - On-site' },
    summary: {
      pt: 'Atuação na concepção e evolução de aplicações web internas para otimização de rotinas de atendimento, estoque e relatórios operacionais em tempo real.',
      en: 'Designing and evolving internal web applications to streamline customer service workflows, inventory control and real-time operational reporting.',
    },
    results: [
      {
        pt: 'Desenvolveu sistemas web internos com Next.js (App Router), TypeScript e Tailwind CSS, acelerando em 40% a agilidade da equipe na consulta e atualização de registros operacionais.',
        en: 'Built internal web systems with Next.js (App Router), TypeScript and Tailwind CSS, speeding up the team\'s record lookup and updates by 40%.',
      },
      {
        pt: 'Estruturou APIs RESTful em Node.js integradas ao banco PostgreSQL via Supabase com autenticação segura e Row-Level Security.',
        en: 'Structured RESTful APIs in Node.js integrated with a PostgreSQL database via Supabase, with secure authentication and Row-Level Security.',
      },
      {
        pt: 'Implementou esteira de entrega contínua com deploys automáticos na Vercel a cada Pull Request, reduzindo o tempo de publicação de novas features.',
        en: 'Implemented a continuous delivery pipeline with automatic Vercel deploys on every Pull Request, shortening feature release time.',
      },
      {
        pt: 'Organizou o fluxo de backlog e sprints via metodologia ágil (Kanban no Trello), alinhando entregas técnicas diretamente com as necessidades dos usuários internos.',
        en: 'Organized backlog and sprint flow using agile methodology (Kanban on Trello), aligning technical deliveries directly with internal users\' needs.',
      },
      {
        pt: 'Prestou suporte técnico nível 2, documentando fluxos de sistemas para prevenir incidentes e garantir alta disponibilidade operacional.',
        en: 'Provided level 2 technical support, documenting system flows to prevent incidents and ensure high operational availability.',
      },
    ],
    metrics: [
      { label: { pt: 'Tempo de consulta', en: 'Lookup time' }, value: '-40%' },
      { label: { pt: 'Sistemas entregues', en: 'Systems shipped' }, value: '3+' },
      { label: { pt: 'Uptime operacional', en: 'Operational uptime' }, value: '99.9%' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vercel', 'Git Flow'],
    type: 'work',
    current: true,
  },
  {
    title: {
      pt: 'Jovem Aprendiz – Setor Fiscal & Projetos de Sistemas',
      en: 'Apprentice – Tax Department & Systems Projects',
    },
    company: 'Grupo 3Corações',
    companyRole: {
      pt: 'Desenvolvedor de Automações RPA & Analista de Processos',
      en: 'RPA Automation Developer & Process Analyst',
    },
    period: { pt: 'Jan/2025 - Abr/2026', en: 'Jan/2025 - Apr/2026' },
    location: { pt: 'Eusébio / Fortaleza, CE - Presencial', en: 'Eusébio / Fortaleza, CE - On-site' },
    summary: {
      pt: 'Desenvolvimento e sustentação de robôs de automação de processos (RPA) em Python voltados para o setor fiscal de uma das maiores empresas de alimentos do Brasil.',
      en: 'Developed and maintained Python RPA robots for the tax department of one of the largest food companies in Brazil.',
    },
    results: [
      {
        pt: 'Construiu scripts de automação em Python (RPA) para download, extração em massa e validação de mais de 15.000 arquivos XML de NFe por mês.',
        en: 'Built Python (RPA) automation scripts for downloading, bulk extraction and validation of more than 15,000 NFe XML files per month.',
      },
      {
        pt: 'Poupou mais de 200 horas acumuladas de trabalho operacional manual repetitivo da equipe fiscal, eliminando falhas humanas de digitação e conciliação.',
        en: 'Saved more than 200 accumulated hours of repetitive manual work for the tax team, eliminating human errors in data entry and reconciliation.',
      },
      {
        pt: 'Desenvolveu rotinas de tratamento de dados com Pandas e integração com planilhas Excel avançadas para conciliação contábil automatizada.',
        en: 'Developed data-processing routines with Pandas and advanced Excel spreadsheet integration for automated accounting reconciliation.',
      },
      {
        pt: 'Criou painéis de indicadores e acompanhamento de métricas operacionais que apoiaram lideranças na tomada de decisões estratégicas.',
        en: 'Created KPI dashboards and operational metric tracking that supported leadership in strategic decision-making.',
      },
      {
        pt: 'Elaborou documentação técnica detalhada de cada automação e manual de contingência, assegurando facilidade de manutenção e escalabilidade do código.',
        en: 'Authored detailed technical documentation and contingency manuals for each automation, ensuring maintainability and scalable code.',
      },
    ],
    metrics: [
      { label: { pt: 'Documentos/mês', en: 'Documents/month' }, value: '15.000+' },
      { label: { pt: 'Horas manuais poupadas', en: 'Manual hours saved' }, value: '200h+' },
      { label: { pt: 'Precisão na extração', en: 'Extraction accuracy' }, value: '99.8%' },
    ],
    stack: ['Python', 'RPA', 'Pandas', 'XML/NFe', 'Excel Avançado', 'Dashboards', 'Scrum'],
    type: 'work',
    current: false,
  },
  {
    title: {
      pt: 'Bacharelado em Ciência da Computação',
      en: "Bachelor's Degree in Computer Science",
    },
    company: 'Universidade de Fortaleza (Unifor)',
    companyRole: { pt: 'Graduando – 6º Semestre', en: 'Undergraduate – 6th Semester' },
    period: { pt: 'Jan/2024 - Dez/2027 (Previsão)', en: 'Jan/2024 - Dec/2027 (Expected)' },
    location: { pt: 'Fortaleza, CE', en: 'Fortaleza, CE' },
    summary: {
      pt: 'Formação acadêmica sólida com foco em Fundamentos da Computação, Desenvolvimento de Software, Estruturas de Dados, Bancos de Dados Relacionais e Desenvolvimento de Sistemas.',
      en: 'Solid academic background focused on Computing Fundamentals, Software Development, Data Structures, Relational Databases and Systems Development.',
    },
    results: [
      {
        pt: 'Aprofundamento em algoritmos, análise de complexidade (Big-O), padrões de projeto e desenvolvimento de software orientado a objetos.',
        en: 'Deep dive into algorithms, complexity analysis (Big-O), design patterns and object-oriented software development.',
      },
      {
        pt: 'Desenvolvimento de projetos práticos interdisciplinares aplicando React, Java Spring Boot e modelagem relacional de dados com PostgreSQL.',
        en: 'Developed interdisciplinary hands-on projects applying React, Java Spring Boot and relational data modeling with PostgreSQL.',
      },
      {
        pt: 'Participação ativa em resolução de problemas algorítmicos e aplicação prática de boas práticas de Clean Code em trabalhos acadêmicos de engenharia.',
        en: 'Active participation in algorithmic problem solving and practical application of Clean Code best practices in academic engineering work.',
      },
    ],
    metrics: [
      { label: { pt: 'Progresso do curso', en: 'Program progress' }, value: { pt: '6º Semestre', en: '6th Semester' } },
      { label: { pt: 'Foco técnico', en: 'Technical focus' }, value: { pt: 'Engenharia de Software', en: 'Software Engineering' } },
    ],
    stack: ['Estruturas de Dados', 'Algoritmos', 'Java / Spring', 'PostgreSQL', 'TypeScript', 'Clean Code', 'Metodologias Ágeis', 'Padrões de Projeto', 'POO'],
    type: 'education',
    current: true,
  },
];
