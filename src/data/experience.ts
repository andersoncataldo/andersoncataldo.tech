import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    title: 'Estagiário de Tecnologia da Informação',
    company: 'Distribuidora Mais Saúde',
    companyRole: 'Desenvolvedor Full-Stack & Suporte a Sistemas',
    period: 'Jun/2026 - Presente',
    location: 'Fortaleza, CE (Presencial / Híbrido)',
    summary: 'Atuação na concepção e evolução de aplicações web internas para otimização de rotinas de atendimento, estoque e relatórios operacionais em tempo real.',
    results: [
      'Desenvolveu sistemas web internos com Next.js (App Router), TypeScript e Tailwind CSS, acelerando em 40% a agilidade da equipe na consulta e atualização de registros operacionais.',
      'Estruturou APIs RESTful em Node.js integradas ao banco PostgreSQL via Supabase com autenticação segura e Row-Level Security.',
      'Implementou esteira de entrega contínua com deploys automáticos na Vercel a cada Pull Request, reduzindo o tempo de publicação de novas features.',
      'Organizou o fluxo de backlog e sprints via metodologia ágil (Kanban no Trello), alinhando entregas técnicas diretamente com as necessidades dos usuários internos.',
      'Prestou suporte técnico nível 2, documentando fluxos de sistemas para prevenir incidentes e garantir alta disponibilidade operacional.'
    ],
    metrics: [
      { label: 'Tempo de consulta', value: '-40%' },
      { label: 'Sistemas entregues', value: '3+' },
      { label: 'Uptime operacional', value: '99.9%' }
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind CSS', 'Vercel', 'Git Flow'],
    type: 'work',
    current: true,
  },
  {
    title: 'Jovem Aprendiz – Setor Fiscal & Projetos de Sistemas',
    company: 'Grupo 3Corações',
    companyRole: 'Desenvolvedor de Automações RPA & Analista de Processos',
    period: 'Jan/2025 - Abr/2026',
    location: 'Eusébio / Fortaleza, CE',
    summary: 'Desenvolvimento e sustentação de robôs de automação de processos (RPA) em Python voltados para o setor fiscal de uma das maiores empresas de alimentos do Brasil.',
    results: [
      'Construiu scripts de automação em Python (RPA) para download, extração em massa e validação de mais de 15.000 arquivos XML de NFe por mês.',
      'Poupou mais de 200 horas acumuladas de trabalho operacional manual repetitivo da equipe fiscal, eliminando falhas humanas de digitação e conciliação.',
      'Desenvolveu rotinas de tratamento de dados com Pandas e integração com planilhas Excel avançadas para conciliação contábil automatizada.',
      'Criou painéis de indicadores e acompanhamento de métricas operacionais que apoiaram lideranças na tomada de decisões estratégicas.',
      'Elaborou documentação técnica detalhada de cada automação e manual de contingência, assegurando facilidade de manutenção e escalabilidade do código.'
    ],
    metrics: [
      { label: 'Documentos/mês', value: '15.000+' },
      { label: 'Horas manuais poupadas', value: '200h+' },
      { label: 'Precisão na extração', value: '99.8%' }
    ],
    stack: ['Python', 'RPA', 'Pandas', 'XML/NFe', 'Excel Avançado', 'Power BI / Dashboards', 'Scrum'],
    type: 'work',
    current: false,
  },
  {
    title: 'Bacharelado em Ciência da Computação',
    company: 'Universidade de Fortaleza (Unifor)',
    companyRole: 'Graduando – 6º Semestre',
    period: 'Jan/2024 - Dez/2027 (Previsão)',
    location: 'Fortaleza, CE',
    summary: 'Formação acadêmica sólida com foco em Fundamentos da Computação, Engenharia de Software, Estruturas de Dados, Bancos de Dados Relacionais e Desenvolvimento de Sistemas.',
    results: [
      'Aprofundamento em algoritmos, análise de complexidade (Big-O), padrões de projeto e desenvolvimento de software orientado a objetos.',
      'Desenvolvimento de projetos práticos interdisciplinares aplicando React, Java Spring Boot e modelagem relacional de dados com PostgreSQL.',
      'Participação ativa em resolução de problemas algorítmicos e aplicação prática de boas práticas de Clean Code em trabalhos acadêmicos de engenharia.'
    ],
    metrics: [
      { label: 'Progresso do curso', value: '6º Semestre' },
      { label: 'Foco técnico', value: 'Engenharia de Software' }
    ],
    stack: ['Estruturas de Dados', 'Algoritmos', 'Java / Spring', 'PostgreSQL', 'TypeScript', 'Clean Code'],
    type: 'education',
    current: true,
  },
];
