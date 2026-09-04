export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'fullstack' | 'automation' | 'frontend';
  categoryLabel: string;
  description: string;
  challenge: string;
  role: string;
  solution: string;
  architecture?: string[];
  result: string;
  techStack: string[];
  impact: string;
  metrics?: { label: string; value: string }[];
  icon: string;
  github?: string;
  liveDemo?: string;
  featured?: boolean;
  images?: string[];
}

export interface Experience {
  title: string;
  company: string;
  companyRole?: string;
  period: string;
  location: string;
  summary: string;
  results: string[];
  metrics?: { label: string; value: string }[];
  stack: string[];
  type: 'work' | 'education';
  current?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    level: 'Avançado' | 'Intermediário' | 'Em expansão';
    keyword: string;
    highlight?: boolean;
  }[];
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
  trend?: string;
}
