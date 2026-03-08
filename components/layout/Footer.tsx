import { Github, Linkedin, Mail } from "lucide-react";
import { personal, socialLinkLabels } from "@/data";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="section-padding border-t border-border-default py-10">
      <div className="max-content flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="text-sm text-text-muted">&copy; {year} {personal.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label={socialLinkLabels.github} className="text-text-muted transition-colors hover:text-primary">
            <Github size={18} />
          </a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label={socialLinkLabels.linkedin} className="text-text-muted transition-colors hover:text-primary">
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${personal.email}`} aria-label={socialLinkLabels.email} className="text-text-muted transition-colors hover:text-primary">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
