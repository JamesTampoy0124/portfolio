import type { Certificate, SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript (ES2022+)", "React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Basic PHP (Native)", "Java", "REST API Design"],
  },
  {
    category: "Database",
    items: ["MySQL"],
  },
  {
    category: "Tools",
    items: ["Postman", "Figma", "Git", "VS Code"],
  },
  {
    category: "AI Tools",
    items: ["Cursor", "GitHub Copilot", "Windsurf"],
  },
];

export const certificates: Certificate[] = [
  {
    name: "JSE™ – Certified Entry-Level JavaScript Programmer",
    issuer: "JavaScript Education (JSE™)",
    date: "August 2025",
    credentialUrl: "/Certification.pdf",
  }
];
