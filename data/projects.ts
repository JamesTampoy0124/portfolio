import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Academic Haven",
    description: "An automated learning management system to empower Dalaguete National High School. Focuses on optimizing administrative workflows, digitizing academic assessments, and to improve institutional efficiency and student readiness for digital world.",
    stack: ["Next.js", "Node.js", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com/JamesTampoy0124/academic-haven",
    imageUrl: "/projects/academic-haven.svg",
    featured: true,
    category: "capstone",
  },
  {
    title: "E-Logbook System",
    description: "A Java-based attendance management system designed to track and monitor PN scholars' participation with automated record-keeping and reporting capabilities.",
    stack: ["Java", "MySQL"],
    githubUrl: "https://github.com/JamesTampoy0124/e-logbook",
    imageUrl: "/projects/e-logbook.svg",
    featured: false,
    category: "collaborative",
  },
  {
    title: "TaskCanvas",
    description: "A web-based task prioritization and organization platform that helps users streamline their workflow through intelligent task management and productivity optimization features.",
    stack: ["HTML", "CSS", "JavaScript", "MySQL"],
    githubUrl: "https://github.com/JamesTampoy0124/taskcanvas",
    imageUrl: "/projects/taskcanvas.svg",
    featured: false,
    category: "collaborative",
  },
  {
    title: "TaskFlow",
    description:
      "Project management tool with Kanban boards, real-time updates, and team assignment. Built to handle multi-workspace organizations with role-based access.",
    stack: ["Next.js", "Node.js", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com/alexrivera/taskflow",
    liveUrl: "https://taskflow.alexrivera.dev",
    imageUrl: "/projects/taskflow.svg",
    featured: true,
    category: "personal",
  },
  {
    title: "ShopEase",
    description:
      "Full-stack e-commerce platform with product catalog, cart, checkout, and an admin dashboard for inventory and order management.",
    stack: ["React", "PHP", "MySQL", "CSS"],
    githubUrl: "https://github.com/alexrivera/shopease",
    liveUrl: "https://shopease.alexrivera.dev",
    imageUrl: "/projects/shopease.svg",
    featured: true,
    category: "personal",
  },
  {
    title: "DevBlog",
    description: "Markdown-based personal blogging platform with syntax highlighting, tag filtering, and static generation per post.",
    stack: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    githubUrl: "https://github.com/alexrivera/devblog",
    imageUrl: "/projects/devblog.svg",
    featured: false,
    category: "personal",
  },
  {
    title: "AttendEase",
    description:
      "Facial recognition-based attendance system for classrooms using Python for detection and a React dashboard for records management.",
    stack: ["Python", "React", "Node.js", "MySQL"],
    githubUrl: "https://github.com/alexrivera/attendease",
    imageUrl: "/projects/attendease.svg",
    featured: false,
    category: "personal",
  },
];
