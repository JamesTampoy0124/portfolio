import { certificates, sectionCopy, skillGroups } from "@/data";
import { AnimatedSection } from "@/components/primitives/AnimatedSection";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { TechBadge } from "@/components/primitives/TechBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Skills() {
  return (
    <section id="skills" className="px-6 pt-20 md:px-8 lg:px-25">
      <div className="max-content">
        <AnimatedSection>
          <SectionHeading
            label={sectionCopy.skills.label}
            title={sectionCopy.skills.title}
            description={sectionCopy.skills.description}
          />

          <Tabs defaultValue="skills">
            <TabsList>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {skillGroups.map((group) => (
                <Card key={group.category}>
                  <CardHeader>
                    <CardTitle className="text-base">{group.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <TechBadge key={item} name={item} />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="certifications" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <Card key={certificate.name}>
                  <CardHeader>
                    <CardTitle className="text-base">{certificate.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-text-muted">{certificate.issuer}</p>
                    <p className="text-xs font-mono text-text-muted">{certificate.date}</p>
                    <a
                      href={certificate.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary transition-colors hover:text-primary-hover"
                    >
                      Verify
                    </a>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </AnimatedSection>
      </div>
    </section>
  );
}
