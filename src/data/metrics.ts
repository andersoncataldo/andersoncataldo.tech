import { MetricItem } from '../types';

export const keyMetrics: MetricItem[] = [
  {
    value: '15',
    label: { pt: 'Automações Entregues', en: 'Shipped Automations' },
    description: {
      pt: 'Robôs em Python integrados ao ERP WinThor (Oracle) e portais fiscais, reduzindo processos de horas para segundos.',
      en: 'Python robots integrated with WinThor ERP (Oracle) and tax portals, slashing workflows from hours to seconds.',
    },
    trend: { pt: 'Produção contínua', en: 'Continuous production' },
  },
  {
    value: '-99%',
    label: { pt: 'Redução FTP_SYNC', en: 'FTP_SYNC Slashing' },
    description: {
      pt: 'Ponte autônoma entre parceiros e WinThor Cloud que reduziu o tempo de integração de 6 horas para menos de 10s.',
      en: 'Autonomous partner-to-WinThor bridge reducing sync and registration time from 6 hours to under 10 seconds.',
    },
    trend: { pt: 'A cada 15 min', en: 'Every 15 min' },
  },
  {
    value: '15k+',
    label: { pt: 'XMLs Fiscais / Mês', en: 'Fiscal XMLs / Month' },
    description: {
      pt: 'Documentos fiscais processados com 99.85% de conformidade com schemas oficiais da SEFAZ.',
      en: 'Tax documents processed with 99.85% compliance against official SEFAZ government schemas.',
    },
    trend: { pt: 'Zero erro fiscal', en: 'Zero tax error' },
  },
  {
    value: '9 Agentes',
    label: { pt: 'Escritório de IA', en: 'AI Agent Squad' },
    description: {
      pt: 'Arquitetura multiagente maker-checker com Claude Code, MCP e protocolos estritos anti-alucinação.',
      en: 'Maker-checker multi-agent architecture with Claude Code, MCP, and strict anti-hallucination protocols.',
    },
    trend: { pt: 'Engenharia assistida', en: 'AI-assisted delivery' },
  },
];
