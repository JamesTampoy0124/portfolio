import { education, sectionCopy } from "@/data";
import { AnimatedSection } from "@/components/primitives/AnimatedSection";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Timeline } from "@/components/primitives/Timeline";
import { Badge } from "@/components/ui/badge";

export function Education() {
  return (
    <section id="education" className="px-6 pt-20 md:px-8 lg:px-25">
      <div className="max-content">
        <AnimatedSection>
          <SectionHeading
            label={sectionCopy.education.label}
            title={sectionCopy.education.title}
            description={sectionCopy.education.description}
          />

          <Timeline
            items={education}
            renderItem={(entry) => (
              <article className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-text-base">{entry.degree}</h3>
                  <Badge variant="outline">{entry.period}</Badge>
                </div>
                <p className="text-sm text-text-muted">{entry.school} - {entry.location}</p>
                {entry.highlights?.length ? (
                  <ul className="list-disc space-y-1 pl-5 text-sm text-text-muted">
                    {/* {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))} */}
                  </ul>
                ) : null}
              </article>
            )}
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
