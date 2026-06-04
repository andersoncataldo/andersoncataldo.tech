export interface Project {
  title: string;
  description: string;
  challenge?: string;
  role?: string;
  solution: string;
  result: string;
  techStack: string[];
  impact: string;
  icon: string; // Icon name from lucide
  github?: string;
  liveDemo?: string;
  images?: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  results: string[];
  stack: string[];
  type: 'work' | 'education';
}
