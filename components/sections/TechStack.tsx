"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { sectionCopy, techFilters, techstack } from "@/data";
import type { SkillCategory } from "@/types";
import { AnimatedSection } from "@/components/primitives/AnimatedSection";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { cn } from "@/lib/utils";

type Filter = SkillCategory | "All";

const localIconSlugs = new Set(["cursor", "githubcopilot", "windsurf"]);

function iconSrc(iconSlug: string) {
  if (localIconSlugs.has(iconSlug)) {
    return `/icons/${iconSlug}.svg`;
  }
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconSlug}/${iconSlug}-original.svg`;
}

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<Filter>("All");

  const items = useMemo(() => {
    if (activeCategory === "All") {
      return techstack;
    }
    return techstack.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="tech-stack" className="px-6 pt-20 pb-10 md:px-8 lg:px-25">
      <div className="max-content">
        <AnimatedSection>
          <SectionHeading
            label={sectionCopy.techStack.label}
            title={sectionCopy.techStack.title}
            description={sectionCopy.techStack.description}
          />

          <div className="mb-8 flex flex-wrap gap-2">
            {techFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-mono transition-colors",
                  activeCategory === filter
                    ? "border-border-focus bg-primary-surface text-primary"
                    : "border-border-default text-text-muted hover:border-border-focus hover:text-primary"
                )}
                onClick={() => setActiveCategory(filter as Filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {items.map((item, index) => (
              <div
                key={item.name}
                className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl border border-border-default bg-bg-surface p-3 transition-all hover:border-border-focus hover:shadow-[0_0_0_1px_#E36A6A]"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <Image src={iconSrc(item.iconSlug)} alt={item.name} width={40} height={40} unoptimized />
                <span className="text-center font-mono text-xs text-text-muted">{item.name}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
