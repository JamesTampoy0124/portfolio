import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { projects, sectionCopy } from "@/data";
import { AnimatedSection } from "@/components/primitives/AnimatedSection";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { TechBadge } from "@/components/primitives/TechBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const capstoneProjects = projects.filter((project) => project.category === "capstone");
  const collaborativeProjects = projects.filter((project) => project.category === "collaborative");
  const personalProjects = projects.filter((project) => project.category === "personal");

  return (
    <section id="projects" className="px-6 pt-20 md:px-8 lg:px-25">
      <div className="max-content">
        <AnimatedSection>
          <SectionHeading
            label={sectionCopy.projects.label}
            title={sectionCopy.projects.title}
            description={sectionCopy.projects.description}
          />

          <div className="space-y-12">
            {/* Capstone Projects */}
            {capstoneProjects.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-text-base">Capstone Project</h3>
                  <Badge variant="subtle" className="text-xs">Academic</Badge>
                </div>
                <div className="space-y-6">
                  {capstoneProjects.map((project) => (
                    <Card key={project.title} className="overflow-hidden border-primary/20 bg-primary-surface/5">
                      <div className="">
                        <CardContent className="space-y-4 p-6">
                          <div className="flex items-start justify-between">
                            <h3 className="text-xl font-semibold text-text-base">{project.title}</h3>
                            <Badge variant="outline" className="text-xs">Full-Stack Dev & UI/UX Design</Badge>
                          </div>
                          <p className="leading-relaxed text-text-muted">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <TechBadge key={tech} name={tech} />
                            ))}
                          </div>                         
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other Collaborative Projects */}
            {collaborativeProjects.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-text-base">Other Collaborative Projects</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {collaborativeProjects.map((project) => (
                    <Card key={project.title}>
                      <CardHeader>
                        <CardTitle className="text-base">{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="line-clamp-3 text-sm text-text-muted">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <TechBadge key={tech} name={tech} />
                          ))}
                        </div>                      
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
