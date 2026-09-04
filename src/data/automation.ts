export interface PipelineStep {
  stepNumber: string;
  title: string;
  description: string;
  technologies: string[];
  metrics: string;
  details: string[];
}

export const automationPipeline: PipelineStep[] = [
  {
    stepNumber: '01',
    title: 'Captura & Ingestão de Lotes',
    description: 'Monitoramento contínuo de diretórios, e-mails e portais fiscais para download assíncrono de arquivos XML.',
    technologies: ['Python', 'Requests', 'Selenium Headless', 'Watchdog'],
    metrics: 'Varredura a cada 15 min',
    details: [
      'Download automático de lotes de NFe/CTe',
      'Descompactação e saneamento de arquivos .zip',
      'Validação de integridade do arquivo antes do processamento'
    ]
  },
  {
    stepNumber: '02',
    title: 'Parsing & Validação de Schemas',
    description: 'Extração segura de chaves de acesso, emitentes, destinatários, impostos (ICMS/PIS/COFINS) e valores totais.',
    technologies: ['lxml', 'BeautifulSoup', 'Regex', 'Schema Validator'],
    metrics: '99.85% de precisão',
    details: [
      'Validação de conformidade contra o schema oficial da SEFAZ',
      'Filtro de notas canceladas e cartas de correção',
      'Tratamento de exceções com logs estruturados de auditoria'
    ]
  },
  {
    stepNumber: '03',
    title: 'ETL & Conciliação de Dados',
    description: 'Transformação dos dados extraídos em DataFrames otimizados para conciliação contábil e auditoria fiscal.',
    technologies: ['Pandas', 'NumPy', 'OpenPyXL', 'PostgreSQL'],
    metrics: '15k+ XMLs / mês',
    details: [
      'Cruzamento de dados entre nota emitida e livro contábil',
      'Detecção de divergências de alíquota em tempo real',
      'Alimentação de banco de dados para relatórios históricos'
    ]
  },
  {
    stepNumber: '04',
    title: 'Entrega & Relatórios Executivos',
    description: 'Disponibilização automatizada de planilhas formatadas e painéis de indicadores para tomada de decisão.',
    technologies: ['Power BI', 'Excel Automation', 'Notificações Automatizadas'],
    metrics: 'Redução de 3h40 para 18s',
    details: [
      'Exportação de planilhas com formatação condicional pronta para auditoria',
      'Geração de sumário executivo com total de notas e valores conciliados',
      'Eliminação completa de digitação manual e retrabalho'
    ]
  }
];

export const rpaHighlights = [
  {
    title: '200+ Horas Manuais Eliminadas',
    subtitle: 'Eficiência de Escala',
    description: 'A equipe fiscal foi liberada de tarefas braçais e repetitivas, passando a focar em análise estratégica e conformidade tributária.',
  },
  {
    title: '15.000+ Arquivos XMLs / Mês',
    subtitle: 'Capacidade de Processamento',
    description: 'Rotina estável executada no Grupo 3Corações com alta tolerância a falhas e relatórios detalhados de auditoria.',
  },
  {
    title: 'Precisão e Compliance Zero Erro',
    subtitle: 'Confiabilidade de Dados',
    description: 'Eliminação dos riscos de digitação incorreta de chaves de acesso de 44 dígitos e valores de impostos.',
  }
];
