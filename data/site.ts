import type { SkillCategory } from "@/types";

export const navLinks = [
  { id: "about", label: "About", href: "#about" },
  { id: "education", label: "Education", href: "#education" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "tech-stack", label: "Tech Stack", href: "#tech-stack" },
] as const;

export const sectionCopy = {
  about: {
    label: "01",
    title: "About Me",
    description: "A concise snapshot of who I am and how to reach me.",
  },
  education: {
    label: "02",
    title: "Education",
    description: "Academic foundation and highlights.",
  },
  skills: {
    label: "03",
    title: "Skills & Certifications",
    description: "Practical technologies and verifiable credentials.",
  },
  experience: {
    label: "04",
    title: "Work Experience",
    description: "Hands-on delivery with measurable impact.",
  },
  projects: {
    label: "05",
    title: "School Projects",
    description: "Selected work across full-stack product delivery.",
  },
  techStack: {
    label: "06",
    title: "Tech Stack",
    description: "Tools and technologies I actively work with.",
  },
} as const;

export const heroCopy = {
  availability: "Available for opportunities",
  viewWork: "View Work",
  getInTouch: "Get in Touch",
} as const;

export const socialLinkLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "Email",
} as const;

export const techFilters: Array<SkillCategory | "All"> = ["All", "Frontend", "Backend", "Database", "Tools", "AI Tools"];
