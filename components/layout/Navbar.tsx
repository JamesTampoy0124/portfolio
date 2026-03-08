"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { navLinks, personal } from "@/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [activeId, setActiveId] = useState<string>("top");
  const [open, setOpen] = useState(false);

  const sectionIds = useMemo(() => ["top", ...navLinks.map((link) => link.id)], []);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-20% 0px -30% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border-default bg-bg-base/70 backdrop-blur-md">
      <div className="max-content flex h-16 items-center justify-between px-6 md:px-12 lg:px-24">
        <a href="#top" className="font-mono text-sm font-medium text-text-base" aria-label="Go to top">
          <span className="text-primary">J</span>ames.dev
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={cn(
                  "text-sm transition-colors hover:text-primary",
                  activeId === link.id ? "text-primary" : "text-text-muted"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button variant="outline" size="sm">
              Resume
              <span className="sr-only">(opens in new tab)</span>
            </Button>
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-default text-text-base md:hidden"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border-default bg-bg-surface md:hidden">
          <ul className="max-content space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors hover:text-primary",
                    activeId === link.id ? "bg-primary-surface text-primary" : "text-text-muted"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="block rounded-md px-3 py-2 text-sm text-text-base">
                Resume
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
