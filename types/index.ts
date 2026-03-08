export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  open: boolean;
}

export interface EducationEntry {
  degree: string;
  school: string;
  location: string;
  period: string;
  gwa?: string;
  honors?: string;
  highlights?: string[];
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools" | "AI Tools";

export interface SkillGroup {
  category: SkillCategory;
  items: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
  projects?: ExperienceProject[];
}

export interface ExperienceProject {
  title: string;
  description: string;
  role?: string;
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  category?: "capstone" | "collaborative" | "personal";
}

export interface TechItem {
  name: string;
  category: SkillCategory;
  iconSlug: string;
}
