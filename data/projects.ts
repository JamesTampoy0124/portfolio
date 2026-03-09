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
    stack: ["Java", "HTML", "CSS", "MySQL"],
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
];
