export interface LocalizedText {
  pt: string;
  en: string;
}

export interface Project {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  category: 'fullstack' | 'automation' | 'frontend';
  categoryLabel: LocalizedText;
  description: LocalizedText;
  challenge: LocalizedText;
  role: LocalizedText;
  solution: LocalizedText;
  architecture?: LocalizedText[];
  result: LocalizedText;
  techStack: string[];
  impact: LocalizedText;
  metrics?: { label: LocalizedText; value: string }[];
  icon: string;
  github?: string;
  liveDemo?: string;
  featured?: boolean;
  images?: string[];
}

export interface Experience {
  title: LocalizedText;
  company: string;
  companyRole?: LocalizedText;
  period: LocalizedText;
  location: LocalizedText;
  summary: LocalizedText;
  results: LocalizedText[];
  metrics?: { label: LocalizedText; value: string }[];
  stack: string[];
  type: 'work' | 'education';
  current?: boolean;
}

export type SkillLevel = 'advanced' | 'intermediate' | 'growing';

export interface SkillCategory {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  iconName: string;
  skills: {
    name: string;
    level: SkillLevel;
    keyword: LocalizedText;
    highlight?: boolean;
  }[];
}

export interface MetricItem {
  value: string;
  label: LocalizedText;
  description: LocalizedText;
  trend?: LocalizedText;
}
