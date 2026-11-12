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
    title: { pt: 'FTP_SYNC & Coleta Autônoma', en: 'FTP_SYNC & Autonomous Ingestion' },
    description: {
      pt: 'Ponte autônoma conectando servidores FTP/SFTP de parceiros farmacêuticos (Eurofarma, Smartped, Momenta) e portais fiscais a cada 15 minutos.',
      en: 'Autonomous bridge connecting partner pharmaceutical FTP/SFTP servers (Eurofarma, Smartped, Momenta) and tax portals every 15 minutes.',
    },
    technologies: ['Python 3.11+', 'Paramiko', 'ftplib', 'WinSCP', 'Task Scheduler'],
    metrics: { pt: 'Varredura a cada 15 min', en: 'Scan every 15 min' },
    details: [
      { pt: 'Sincronização bidirecional entre parceiros e SFTP do WinThor Cloud', en: 'Bidirectional sync between partners and WinThor Cloud SFTP' },
      { pt: 'Download assíncrono de arquivos EDI Pharma Link e lotes de NFe/CTe', en: 'Asynchronous download of EDI Pharma Link files and NFe batches' },
      { pt: 'Validação de integridade e descompressão segura de arquivos', en: 'File integrity checksum verification and secure decompression' },
    ],
  },
  {
    stepNumber: '02',
    title: { pt: 'Parsing & Validação de Schemas', en: 'Parsing & Schema Validation' },
    description: {
      pt: 'Extração segura de dados, validação contra layouts EDI Pharma Link e schemas oficiais da SEFAZ com verificação de notas canceladas.',
      en: 'Secure data extraction, compliance validation against EDI Pharma Link layouts and official SEFAZ schemas with cancellation checks.',
    },
    technologies: ['lxml', 'BeautifulSoup', 'Regex', 'Schema Validator'],
    metrics: { pt: '99.85% de precisão', en: '99.85% accuracy' },
    details: [
      { pt: 'Validação rigorosa contra esquemas XML oficiais da SEFAZ', en: 'Rigorous validation against official SEFAZ XML schemas' },
      { pt: 'Parsing estruturado de layouts posicionais EDI Pharma Link', en: 'Structured parsing of fixed-width EDI Pharma Link layouts' },
      { pt: 'Tratamento de exceções e logs de auditoria imutáveis', en: 'Exception handling and immutable audit logging' },
    ],
  },
  {
    stepNumber: '03',
    title: { pt: 'Integração WinThor ERP (Oracle) & ETL', en: 'WinThor ERP (Oracle) & ETL Integration' },
    description: {
      pt: 'Lançamento automatizado no banco de dados Oracle do ERP TOTVS WinThor com conciliação contábil via Pandas e verificação de duplicidade.',
      en: 'Automated loading into TOTVS WinThor ERP Oracle database with automated Pandas reconciliation and duplicate invoice checks.',
    },
    technologies: ['Oracle SQL', 'Pandas', 'OpenPyXL', 'SQLAlchemy'],
    metrics: { pt: '10 robôs WinThor', en: '10 WinThor robots' },
    details: [
      { pt: 'Atualização instantânea de lotes de estoque farmacêutico', en: 'Instant batch update of pharmaceutical inventory lots' },
      { pt: 'Cruzamento contábil e conciliação de faturamento sem erro humano', en: 'Accounting cross-matching and billing reconciliation with zero human error' },
      { pt: 'Detecção preventiva de duplicidades de notas fiscais', en: 'Preventative detection of duplicate invoice access keys' },
    ],
  },
  {
    stepNumber: '04',
    title: { pt: 'Entrega Executiva & Monitoramento', en: 'Executive Delivery & Monitoring' },
    description: {
      pt: 'Painéis em Streamlit para supervisão em tempo real, relatórios gerenciais e redução de processos de 6 horas para menos de 10 segundos.',
      en: 'Streamlit dashboards for real-time robot supervision, executive reporting, and workflows reduced from 6 hours to under 10 seconds.',
    },
    technologies: ['Streamlit', 'Notificações Webhook', 'PyInstaller Standalone'],
    metrics: { pt: 'De 6h para < 10s (−99%)', en: 'From 6h to < 10s (-99%)' },
    details: [
      { pt: 'Painel Streamlit com histórico detalhado de execuções de robôs', en: 'Streamlit dashboard tracking detailed robot run history' },
      { pt: 'Alertas automáticos em caso de indisponibilidade de servidores parceiros', en: 'Automated webhook alerts on partner server downtime' },
      { pt: 'Eliminação massiva de trabalho braçal e risco fiscal zerado', en: 'Massive reduction of manual burden and eradicated tax risks' },
    ],
  },
];

export const rpaHighlights: { title: LocalizedText; subtitle: LocalizedText; description: LocalizedText }[] = [
  {
    title: { pt: '-99% no Tempo do FTP_SYNC', en: '-99% Slashing in FTP_SYNC' },
    subtitle: { pt: 'De 6 horas para < 10 segundos', en: 'From 6 hours to < 10 seconds' },
    description: {
      pt: 'Ponte autônoma entre parceiros logísticos e o SFTP do WinThor Cloud que processa pedidos e notas fiscais a cada 15 minutos sem intervenção humana.',
      en: 'Autonomous bridge between logistics partners and WinThor Cloud SFTP processing orders and invoices every 15 minutes with zero human intervention.',
    },
  },
  {
    title: { pt: '15 Automações em Produção', en: '15 Robots in Production' },
    subtitle: { pt: 'WinThor (Oracle) & Portais Fiscais', en: 'WinThor (Oracle) & Tax Portals' },
    description: {
      pt: '10 robôs dedicados a integrações corporativas na Mais Saúde e 5 robôs RPA para emissão de CNDs e XMLs no Grupo 3corações.',
      en: '10 robots dedicated to enterprise integrations at Mais Saúde and 5 RPA robots for CND clearance and XML processing at Grupo 3corações.',
    },
  },
  {
    title: { pt: '15.000+ XMLs com Zero Erro', en: '15,000+ XMLs with Zero Error' },
    subtitle: { pt: 'Validação Oficial SEFAZ', en: 'Official SEFAZ Compliance' },
    description: {
      pt: 'Processamento massivo e contínuo com 99.85% de conformidade, economizando centenas de horas operacionais.',
      en: 'Massive continuous processing with 99.85% compliance, saving hundreds of operational hours.',
    },
  },
];
