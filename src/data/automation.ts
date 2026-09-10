import { LocalizedText } from '../types';

export interface PipelineStep {
  stepNumber: string;
  title: LocalizedText;
  description: LocalizedText;
  technologies: string[];
  metrics: LocalizedText;
  details: LocalizedText[];
}

export const automationPipeline: PipelineStep[] = [
  {
    stepNumber: '01',
    title: { pt: 'Captura & Ingestão de Lotes', en: 'Batch Capture & Ingestion' },
    description: {
      pt: 'Monitoramento contínuo de diretórios, e-mails e portais fiscais para download assíncrono de arquivos XML.',
      en: 'Continuous monitoring of directories, emails and tax portals for asynchronous XML file downloads.',
    },
    technologies: ['Python', 'Requests', 'Selenium Headless', 'Watchdog'],
    metrics: { pt: 'Varredura a cada 15 min', en: 'Scan every 15 min' },
    details: [
      { pt: 'Download automático de lotes de NFe/CTe', en: 'Automatic download of NFe/CTe batches' },
      { pt: 'Descompactação e saneamento de arquivos .zip', en: 'Unzipping and sanitizing .zip files' },
      { pt: 'Validação de integridade do arquivo antes do processamento', en: 'File integrity validation before processing' },
    ],
  },
  {
    stepNumber: '02',
    title: { pt: 'Parsing & Validação de Schemas', en: 'Parsing & Schema Validation' },
    description: {
      pt: 'Extração segura de chaves de acesso, emitentes, destinatários, impostos (ICMS/PIS/COFINS) e valores totais.',
      en: 'Secure extraction of access keys, issuers, recipients, taxes (ICMS/PIS/COFINS) and total amounts.',
    },
    technologies: ['lxml', 'BeautifulSoup', 'Regex', 'Schema Validator'],
    metrics: { pt: '99.85% de precisão', en: '99.85% accuracy' },
    details: [
      { pt: 'Validação de conformidade contra o schema oficial da SEFAZ', en: 'Compliance validation against the official SEFAZ schema' },
      { pt: 'Filtro de notas canceladas e cartas de correção', en: 'Filtering of cancelled invoices and correction letters' },
      { pt: 'Tratamento de exceções com logs estruturados de auditoria', en: 'Exception handling with structured audit logs' },
    ],
  },
  {
    stepNumber: '03',
    title: { pt: 'ETL & Conciliação de Dados', en: 'ETL & Data Reconciliation' },
    description: {
      pt: 'Transformação dos dados extraídos em DataFrames otimizados para conciliação contábil e auditoria fiscal.',
      en: 'Transforming extracted data into optimized DataFrames for accounting reconciliation and tax auditing.',
    },
    technologies: ['Pandas', 'NumPy', 'OpenPyXL', 'PostgreSQL'],
    metrics: { pt: '15k+ XMLs / mês', en: '15k+ XMLs / month' },
    details: [
      { pt: 'Cruzamento de dados entre nota emitida e livro contábil', en: 'Cross-referencing issued invoices against accounting ledgers' },
      { pt: 'Detecção de divergências de alíquota em tempo real', en: 'Real-time detection of tax-rate discrepancies' },
      { pt: 'Alimentação de banco de dados para relatórios históricos', en: 'Feeding the database for historical reporting' },
    ],
  },
  {
    stepNumber: '04',
    title: { pt: 'Entrega & Relatórios Executivos', en: 'Delivery & Executive Reporting' },
    description: {
      pt: 'Disponibilização automatizada de planilhas formatadas e painéis de indicadores para tomada de decisão.',
      en: 'Automated delivery of formatted spreadsheets and KPI dashboards to support decision-making.',
    },
    technologies: ['Power BI', 'Excel Automation', 'Notificações Automatizadas'],
    metrics: { pt: 'Redução de 3h40 para 18s', en: 'Reduced from 3h40 to 18s' },
    details: [
      { pt: 'Exportação de planilhas com formatação condicional pronta para auditoria', en: 'Exporting audit-ready spreadsheets with conditional formatting' },
      { pt: 'Geração de sumário executivo com total de notas e valores conciliados', en: 'Generating an executive summary with total invoices and reconciled amounts' },
      { pt: 'Eliminação completa de digitação manual e retrabalho', en: 'Complete elimination of manual data entry and rework' },
    ],
  },
];

export const rpaHighlights: { title: LocalizedText; subtitle: LocalizedText; description: LocalizedText }[] = [
  {
    title: { pt: '200+ Horas Manuais Eliminadas', en: '200+ Manual Hours Eliminated' },
    subtitle: { pt: 'Eficiência de Escala', en: 'Efficiency at Scale' },
    description: {
      pt: 'A equipe fiscal foi liberada de tarefas braçais e repetitivas, passando a focar em análise estratégica e conformidade tributária.',
      en: 'The tax team was freed from repetitive manual tasks and could focus on strategic analysis and tax compliance.',
    },
  },
  {
    title: { pt: '15.000+ Arquivos XMLs / Mês', en: '15,000+ XML Files / Month' },
    subtitle: { pt: 'Capacidade de Processamento', en: 'Processing Capacity' },
    description: {
      pt: 'Rotina estável executada no Grupo 3Corações com alta tolerância a falhas e relatórios detalhados de auditoria.',
      en: 'Stable routine running at Grupo 3Corações with high fault tolerance and detailed audit reports.',
    },
  },
  {
    title: { pt: 'Precisão e Compliance Zero Erro', en: 'Zero-Error Precision & Compliance' },
    subtitle: { pt: 'Confiabilidade de Dados', en: 'Data Reliability' },
    description: {
      pt: 'Eliminação dos riscos de digitação incorreta de chaves de acesso de 44 dígitos e valores de impostos.',
      en: 'Eliminated the risk of typing errors in 44-digit access keys and tax amounts.',
    },
  },
];
