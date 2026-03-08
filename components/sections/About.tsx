import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { personal, sectionCopy } from "@/data";
import { AnimatedSection } from "@/components/primitives/AnimatedSection";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="px-6 pt-20 md:px-8 lg:px-25">
      <div className="max-content">
        <AnimatedSection>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <SectionHeading
                label={sectionCopy.about.label}
                title={sectionCopy.about.title}
                description={sectionCopy.about.description}
              />
              <article>
                <p className="leading-relaxed text-text-muted">{personal.bio}</p>
              </article>
            </div>
            
            <div className="flex items-center justify-end">
              <Card className="w-full max-w-md">
                <CardContent className="space-y-4 p-6">
                  <ContactRow icon={<MapPin size={16} />} label="Address" value={personal.address} />
                  <ContactRow icon={<Mail size={16} />} label="Email" value={personal.email} href={`mailto:${personal.email}`} />
                  <ContactRow icon={<Phone size={16} />} label="Phone" value={personal.phone} href={`tel:${personal.phone.replace(/\s+/g, "")}`} />
                  <ContactRow icon={<Github size={16} />} label="GitHub" value="View Profile" href={personal.github} />
                  <ContactRow icon={<Linkedin size={16} />} label="LinkedIn" value="View Profile" href={personal.linkedin} />
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

interface ContactRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}

function ContactRow({ icon, label, value, href }: ContactRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 text-primary">{icon}</span>
      <div className="space-y-1">
        <p className="text-xs font-mono uppercase tracking-wide text-text-muted">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-sm text-text-base transition-colors hover:text-primary"
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-text-base">{value}</p>
        )}
      </div>
    </div>
  );
}
