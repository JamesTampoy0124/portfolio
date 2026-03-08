import { experience, sectionCopy } from "@/data";
import { AnimatedSection } from "@/components/primitives/AnimatedSection";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Timeline } from "@/components/primitives/Timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Experience() {
  return (
    <section id="experience" className="px-6 pt-20 pb-10 md:px-8 lg:px-25">
      <div className="max-content">
        <AnimatedSection>
          <SectionHeading
            label={sectionCopy.experience.label}
            title={sectionCopy.experience.title}
            description={sectionCopy.experience.description}
          />

          <Timeline
            items={experience}
            renderItem={(entry) => (
              <article className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-text-base">
                    {entry.role} <span className="text-primary">@ {entry.company}</span>
                  </h3>
                  <p className="text-sm text-text-muted">
                    {entry.location} - {entry.period}
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-text-muted">
                    {entry.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                {entry.projects && entry.projects.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-text-base uppercase tracking-wide">Collaborative Mini Projects</h4>
                    <div className="space-y-3">
                      {entry.projects.map((project, index) => (
                        <Card key={index} className="border-border-default bg-bg-surface">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center justify-between">
                              <span>{project.title}</span>
                              {project.role && (
                                <span className="text-xs font-normal text-primary bg-primary-surface px-2 py-1 rounded">
                                  {project.role}
                                </span>
                              )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-text-muted leading-relaxed">
                              {project.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            )}
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
