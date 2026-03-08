import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { heroCopy, personal, socialLinkLabels } from "@/data";
import { AnimatedSection } from "@/components/primitives/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="px-6 pt-20 md:px-8 lg:px-25">
      <div className="max-content">
        <AnimatedSection className="grid min-h-[80vh] items-center gap-12 md:grid-cols-2">
          <div className="order-2 space-y-6 md:order-1">
            {personal.open ? <Badge variant="subtle">{heroCopy.availability}</Badge> : null}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-text-base sm:text-5xl md:text-6xl">{personal.name}</h1>
              <p className="text-xl font-medium text-primary sm:text-2xl">{personal.title}</p>
              <p className="max-w-2xl leading-relaxed text-text-muted">{personal.tagline}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#projects">
                <Button>{heroCopy.viewWork}</Button>
              </a>
              <a href="#about">
                <Button variant="ghost">{heroCopy.getInTouch}</Button>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label={socialLinkLabels.github} className="text-text-muted transition-colors hover:text-primary">
                <Github size={20} />
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label={socialLinkLabels.linkedin} className="text-text-muted transition-colors hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${personal.email}`} aria-label={socialLinkLabels.email} className="text-text-muted transition-colors hover:text-primary">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center md:order-2 md:justify-end">
            <div className="group relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-primary-hover opacity-75 blur transition duration-300 group-hover:opacity-100 group-hover:duration-200"></div>
              <div className="relative h-[280px] w-[280px] overflow-hidden rounded-full border-2 border-border-default bg-bg-surface shadow-xl">
                <Image
                  src="/profile.jpg"
                  alt={`${personal.name} avatar`}
                  width={280}
                  height={280}
                  priority
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
