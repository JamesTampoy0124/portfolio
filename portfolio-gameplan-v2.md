# Portfolio Website — Implementation Gameplan
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui  
**Rendering:** Static Site Generation (SSG) — no server required  
**Primary Color:** `#E36A6A`

---

## Architect's Note

This is a **static, content-driven site**. There is no authentication, no database, no API routes, and no server-side logic. Every wrong decision here costs time later — so constraints are defined upfront:

- All content lives in typed data files. No hardcoded strings in JSX.
- No default exports for data. Named exports only — makes refactoring and tree-shaking predictable.
- Components are either layout, section, or primitive. No mixing concerns.
- Animations use CSS-first. `framer-motion` is only justified for scroll-triggered entrance effects — nothing else.
- The Tailwind config is the single source of truth for design tokens. No inline hex values anywhere in components.
- TypeScript strict mode is on. No `any`, no type assertions without justification.

---

## 1. Design Tokens

All values defined once in `tailwind.config.ts`. Referenced everywhere else via token names — never raw hex.

### Color Scale
| Token | Value | Role |
|---|---|---|
| `primary` | `#E36A6A` | Interactive elements, active states, accents |
| `primary-hover` | `#C94F4F` | Hover and pressed states |
| `primary-subtle` | `#F28F8F` | Badge text, icon fills |
| `primary-surface` | `rgba(227,106,106,0.08)` | Badge backgrounds, highlighted rows |
| `bg-base` | `#0F0F0F` | Page background |
| `bg-surface` | `#1A1A1A` | Cards, panels, inputs |
| `bg-elevated` | `#242424` | Dropdown menus, tooltips |
| `border-default` | `#2E2E2E` | All default borders |
| `border-focus` | `#E36A6A` | Focus rings, active card borders |
| `text-base` | `#F0F0F0` | Primary readable text |
| `text-muted` | `#8A8A8A` | Labels, captions, secondary info |

### Typography
| Role | Font | Weight |
|---|---|---|
| Headings | `Inter` | 600 / 700 |
| Body | `Inter` | 400 / 500 |
| Code / Tech labels | `JetBrains Mono` | 400 |

Type scale: `12 · 14 · 16 · 18 · 20 · 24 · 32 · 40 · 56px`

---

## 2. Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Education.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── TechStack.tsx
│   ├── primitives/
│   │   ├── SectionHeading.tsx
│   │   ├── Timeline.tsx
│   │   └── TechBadge.tsx
│   └── ui/
├── data/
│   ├── index.ts
│   ├── personal.ts
│   ├── education.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── projects.ts
│   └── techstack.ts
├── types/
│   └── index.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── avatar.webp
│   ├── resume.pdf
│   ├── icons/
│   └── projects/
├── tailwind.config.ts
├── components.json
└── next.config.ts
```

**Why `primitives/`:** Reusable structural components that are not shadcn/ui and not full sections. `Timeline` is used by both `Education` and `Experience`. `SectionHeading` enforces consistent section title markup. Keeping these isolated prevents copy-paste drift.

**Why `types/index.ts`:** A single file for all shared interfaces. When a data shape changes, there is one place to update — not five.

**Why `data/index.ts`:** Re-exports everything. Consumers import from `@/data`, not from individual files. This keeps import paths stable if files are ever split or renamed.

---

## 3. Type Definitions (`types/index.ts`)

Define all data shapes before writing any component or data file.

```ts
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface EducationEntry {
  degree: string;
  school: string;
  location: string;
  period: string;
  gwa?: string;
  honors?: string;
  highlights?: string[];
}

export type SkillCategory = "Frontend" | "Backend" | "Database" | "Tools" | "AI Tools";

export interface SkillGroup {
  category: SkillCategory;
  items: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  responsibilities: string[];
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
}

export interface TechItem {
  name: string;
  category: SkillCategory;
  iconSlug: string;
}
```

---

## 4. Data Layer (`data/`)

Data files contain **no logic**. They are typed constant arrays and objects — nothing else.

### `data/personal.ts`
```ts
import type { PersonalInfo } from "@/types";

export const personal: PersonalInfo = {
  name: "Alex Rivera",
  title: "Full Stack Developer",
  tagline: "I build reliable, maintainable web applications — from UI to infrastructure.",
  bio: "Full Stack Developer with 3+ years delivering production web applications across e-commerce, logistics, and SaaS domains. Experienced across the full delivery cycle: requirements, architecture, implementation, and deployment. Currently focused on React/Next.js frontends and Node.js APIs backed by MySQL.",
  email: "alex.rivera@email.com",
  phone: "+63 912 345 6789",
  address: "Cebu City, Central Visayas, Philippines",
  github: "https://github.com/alexrivera",
  linkedin: "https://linkedin.com/in/alexrivera",
  resumeUrl: "/resume.pdf",
};
```

### `data/education.ts`
```ts
import type { EducationEntry } from "@/types";

export const education: EducationEntry[] = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "University of San Carlos",
    location: "Cebu City, Philippines",
    period: "2018 – 2022",
    gwa: "1.75",
    honors: "Cum Laude",
    highlights: [
      "Capstone: Facial recognition-based attendance system using Python and React",
      "Member, Google Developer Student Club — organized 3 campus dev events",
    ],
  },
  {
    degree: "Senior High School — STEM Strand",
    school: "Cebu Institute of Technology – University",
    location: "Cebu City, Philippines",
    period: "2016 – 2018",
  },
];
```

### `data/skills.ts`
```ts
import type { SkillGroup, Certificate } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript (ES2022+)", "React", "Next.js", "Tailwind CSS", "shadcn/ui"],
  },
  {
    category: "Backend",
    items: ["Node.js", "PHP (Native)", "Java", "REST API Design"],
  },
  {
    category: "Database",
    items: ["MySQL"],
  },
  {
    category: "Tools",
    items: ["Postman", "Figma", "Git", "VS Code"],
  },
  {
    category: "AI Tools",
    items: ["Cursor", "GitHub Copilot", "Windsurf"],
  },
];

export const certificates: Certificate[] = [
  {
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta / Coursera",
    date: "March 2023",
    credentialUrl: "https://coursera.org/verify/placeholder",
  },
  {
    name: "OpenJS Node.js Application Developer (JSNAD)",
    issuer: "OpenJS Foundation",
    date: "August 2023",
    credentialUrl: "https://training.linuxfoundation.org/verify",
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "January 2024",
    credentialUrl: "https://aws.amazon.com/verification",
  },
];
```

### `data/experience.ts`
```ts
import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    role: "Junior Full Stack Developer",
    company: "TechHive Solutions",
    location: "Cebu City, Philippines",
    period: "Jan 2023 – Present",
    current: true,
    responsibilities: [
      "Delivered and maintained 5 client-facing web applications using React and Node.js",
      "Designed and documented REST APIs consumed by web and mobile clients",
      "Reduced average page load time by 40% through code splitting, lazy loading, and image optimization",
      "Collaborated with product designers in Figma to produce component-accurate implementations",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Nexus Digital Agency",
    location: "Remote",
    period: "Jun 2022 – Dec 2022",
    current: false,
    responsibilities: [
      "Built 8 responsive landing pages in HTML, CSS, and vanilla JavaScript",
      "Tested and documented 30+ API endpoints in Postman for a client integration project",
      "Participated in bi-weekly sprint reviews and contributed to technical backlog refinement",
    ],
  },
];
```

### `data/projects.ts`
```ts
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "TaskFlow",
    description: "Project management tool with Kanban boards, real-time updates, and team assignment. Built to handle multi-workspace organizations with role-based access.",
    stack: ["Next.js", "Node.js", "MySQL", "Tailwind CSS"],
    githubUrl: "https://github.com/alexrivera/taskflow",
    liveUrl: "https://taskflow.alexrivera.dev",
    imageUrl: "/projects/taskflow.webp",
    featured: true,
  },
  {
    title: "ShopEase",
    description: "Full-stack e-commerce platform with product catalog, cart, checkout, and an admin dashboard for inventory and order management.",
    stack: ["React", "PHP", "MySQL", "CSS"],
    githubUrl: "https://github.com/alexrivera/shopease",
    liveUrl: "https://shopease.alexrivera.dev",
    imageUrl: "/projects/shopease.webp",
    featured: true,
  },
  {
    title: "DevBlog",
    description: "Markdown-based personal blogging platform with syntax highlighting, tag filtering, and static generation per post.",
    stack: ["Next.js", "Tailwind CSS", "shadcn/ui"],
    githubUrl: "https://github.com/alexrivera/devblog",
    imageUrl: "/projects/devblog.webp",
    featured: false,
  },
  {
    title: "AttendEase",
    description: "Capstone project. Facial recognition-based attendance system for classrooms using Python for detection and a React dashboard for records management.",
    stack: ["Python", "React", "Node.js", "MySQL"],
    githubUrl: "https://github.com/alexrivera/attendease",
    imageUrl: "/projects/attendease.webp",
    featured: false,
  },
];
```

### `data/techstack.ts`
```ts
import type { TechItem } from "@/types";

export const techstack: TechItem[] = [
  { name: "HTML5",         category: "Frontend",  iconSlug: "html5" },
  { name: "CSS3",          category: "Frontend",  iconSlug: "css3" },
  { name: "JavaScript",    category: "Frontend",  iconSlug: "javascript" },
  { name: "Tailwind CSS",  category: "Frontend",  iconSlug: "tailwindcss" },
  { name: "shadcn/ui",     category: "Frontend",  iconSlug: "shadcnui" },
  { name: "React",         category: "Frontend",  iconSlug: "react" },
  { name: "Node.js",       category: "Backend",   iconSlug: "nodejs" },
  { name: "Java",          category: "Backend",   iconSlug: "java" },
  { name: "PHP",           category: "Backend",   iconSlug: "php" },
  { name: "MySQL",         category: "Database",  iconSlug: "mysql" },
  { name: "Postman",       category: "Tools",     iconSlug: "postman" },
  { name: "Figma",         category: "Tools",     iconSlug: "figma" },
  { name: "Cursor",        category: "AI Tools",  iconSlug: "cursor" },
  { name: "GitHub Copilot",category: "AI Tools",  iconSlug: "githubcopilot" },
  { name: "Windsurf",      category: "AI Tools",  iconSlug: "windsurf" },
];
```

### `data/index.ts`
```ts
export { personal } from "./personal";
export { education } from "./education";
export { skillGroups, certificates } from "./skills";
export { experience } from "./experience";
export { projects } from "./projects";
export { techstack } from "./techstack";
```

---

## 5. Configuration

### Bootstrap
```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir=false
cd portfolio
npx shadcn@latest init
npx shadcn@latest add badge button card separator tabs avatar progress tooltip
npm install lucide-react framer-motion react-intersection-observer
```

### `tailwind.config.ts`
```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E36A6A",
          hover: "#C94F4F",
          subtle: "#F28F8F",
          surface: "rgba(227,106,106,0.08)",
        },
        bg: {
          base: "#0F0F0F",
          surface: "#1A1A1A",
          elevated: "#242424",
        },
        border: {
          default: "#2E2E2E",
          focus: "#E36A6A",
        },
        text: {
          base: "#F0F0F0",
          muted: "#8A8A8A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 6%;
    --foreground: 0 0% 94%;
    --card: 0 0% 10%;
    --card-foreground: 0 0% 94%;
    --primary: 0 68% 65%;
    --primary-foreground: 0 0% 100%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 54%;
    --border: 0 0% 18%;
    --radius: 0.625rem;
  }

  * {
    @apply border-border-default;
  }

  body {
    @apply bg-bg-base text-text-base font-sans antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-semibold tracking-tight;
  }
}

@layer utilities {
  .section-padding {
    @apply px-6 py-24 md:px-12 lg:px-24;
  }

  .max-content {
    @apply max-w-6xl mx-auto w-full;
  }
}
```

### `next.config.ts`
```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default config;
```

`output: "export"` produces a fully static build. Zero server dependency. Deploys to Vercel, Netlify, Cloudflare Pages, or any CDN with no configuration.

---

## 6. Component Architecture

### Primitive: `SectionHeading.tsx`

Used by every section to maintain consistent heading hierarchy and visual style. Never hardcode section titles inline.

```tsx
interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeading({ label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 space-y-3">
      <span className="font-mono text-sm text-primary">{label}</span>
      <h2 className="text-3xl font-bold text-text-base">{title}</h2>
      {description && (
        <p className="text-text-muted max-w-xl">{description}</p>
      )}
    </div>
  );
}
```

### Primitive: `Timeline.tsx`

Shared between `Education` and `Experience`. Accepts items as a generic render prop to avoid coupling.

```tsx
interface TimelineProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function Timeline<T>({ items, renderItem }: TimelineProps<T>) {
  return (
    <div className="relative space-y-10 before:absolute before:left-0 before:top-2 
                    before:h-full before:w-px before:bg-border-default">
      {items.map((item, index) => (
        <div key={index} className="relative pl-8">
          <div className="absolute left-[-5px] top-1.5 h-[10px] w-[10px] 
                          rounded-full bg-primary ring-2 ring-bg-base" />
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
```

### Primitive: `TechBadge.tsx`

Single responsibility: renders a consistent pill for any tech name. Used in project cards and the skills section.

```tsx
interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-default 
                     bg-bg-surface px-3 py-0.5 font-mono text-xs text-primary">
      {name}
    </span>
  );
}
```

---

## 7. Section Specifications

### Navbar
- Fixed, full-width, `z-50`, backdrop blur with `bg-bg-base/70`
- Left: monospaced logo `alex.dev` — `a` in `text-primary`
- Center: nav links visible at `md+`, collapsed to sheet/drawer on mobile
- Right: "Resume" button — outline variant, opens `/resume.pdf` in new tab
- Active section tracking via `IntersectionObserver` on section `id` anchors — not scroll position math
- No JS framework router links. All anchors are `href="#section-id"` with `scroll-behavior: smooth` in CSS

### Hero
- Full viewport height (`min-h-svh`)
- Two-column grid at `md+`, single column on mobile (avatar above text, or hidden on xs)
- Content order: availability badge → name → title → bio → CTA row → social links
- Availability badge: `"Available for opportunities"` — shown/hidden by toggling `open` field in `personal.ts`
- Two CTAs: "View Work" (filled primary, scrolls to `#projects`) + "Get in Touch" (ghost, scrolls to `#about`)
- Social row: GitHub, LinkedIn, Email — icon links, 20px, `text-text-muted` default, `text-primary` on hover
- Avatar: circular, 240×240, `webp` format, `priority` prop on Next.js `<Image>`

### About
- Two-column at `md+`: bio (60%) + contact card (40%)
- Bio: 3–4 sentence paragraph from `personal.bio`, no bullet points
- Contact card: address, email (`mailto:`), phone (`tel:`), GitHub, LinkedIn — each row is an icon + label
- No `<form>`. Contact is direct links only. No JavaScript needed.

### Education
- Uses `<Timeline>` primitive
- Each entry: degree (bold), school (muted), `period` badge, honors badge if present, highlights as a clean unordered list
- No unnecessary visual weight — this section is a quick scan, not a feature

### Skills
- `<Tabs>` with two tabs: "Skills" and "Certifications"
- Skills tab: one subsection per `SkillGroup`, skill items rendered as `<TechBadge>`
- Avoid `<Progress>` bars for proficiency — they invite skepticism and add no verifiable information
- Certifications tab: card per certificate — name, issuer, date, and "Verify" link opening credential URL

### Experience
- Uses `<Timeline>` primitive
- Each entry: role (bold) + company (`text-primary`) on same line, location + period on second line, responsibilities as `ul` with tight spacing
- Quantified results in responsibilities (numbers, percentages, counts) — these are the only lines that matter to a hiring reader

### Projects
- Featured projects (top): 2-column asymmetric layout — left image, right content. Large cards, full description visible.
- Other projects (bottom): 3-column grid of compact cards — title, 1-line description, stack badges, icon links
- Featured flag in data controls which grid a project appears in — no hardcoded IDs
- Project image: `Next.js <Image>` with `fill` and `object-cover` inside a fixed-aspect-ratio container
- Links: GitHub icon always present. Live URL icon only rendered if `liveUrl` is defined.

### Tech Stack
- Filter tabs by `SkillCategory` (All · Frontend · Backend · Database · Tools · AI Tools)
- Active category stored in `useState` — no router state, no URL params
- Grid: `grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6`
- Each cell: centered icon (40px) + name label in `font-mono text-xs`
- Icons: use [devicons CDN](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/) for HTML5, CSS3, JS, React, Node.js, Java, PHP, MySQL, Postman, Figma, Git. For Cursor, Copilot, Windsurf: download official brand SVGs and serve from `/public/icons/`.
- Hover state: `border-border-focus` + `shadow-[0_0_0_1px_#E36A6A]`

### Footer
- Single row at `md+`: copyright left, social links right
- Stacked on mobile
- No decorative elements. No "built with ❤️" copy — it is noise.

---

## 8. Animation Strategy

Animations are **progressive enhancement** — the page must be fully readable and functional with zero animation. Never gate content visibility behind animation state.

Use `framer-motion` `<motion.div>` with `useInView` (`{ once: true, margin: "-80px" }`) for scroll-triggered entrance. Apply only to section wrappers and card groups — not individual words or characters.

| Element | Effect | Duration |
|---|---|---|
| Section wrapper | `opacity: 0 → 1`, `y: 16 → 0` | 500ms |
| Card group | Staggered `opacity` + `y`, 60ms delay per item | 400ms each |
| Hero text block | `opacity` + `y` on mount, staggered 80ms | 500ms |
| Tech grid items | Staggered scale-in (`scale: 0.9 → 1`) | 250ms each |

Keep `ease: "easeOut"` across all transitions. No spring physics, no bounce — this is a professional portfolio, not a game.

`prefers-reduced-motion`: Wrap all `motion` components with a `useReducedMotion()` check. If true, skip the animation and render the final state immediately.

```tsx
import { useReducedMotion } from "framer-motion";

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 9. Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | 100 |
| LCP | < 1.5s |
| CLS | < 0.05 |
| Total JS (gzipped) | < 120kb |

Key decisions that support these targets:

- `output: "export"` — fully static, no server runtime overhead
- Avatar in `webp` format, served via Next.js `<Image>` with `priority`
- Project images lazy-loaded with explicit `width` and `height` to prevent CLS
- `framer-motion` is the only animation dependency — no GSAP, no other libraries
- No Google Fonts via `<link>` — use `next/font/google` which self-hosts and eliminates a render-blocking request
- Devicon SVGs served locally from `/public/icons/` — no CDN dependency at runtime

---

## 10. Accessibility Requirements

These are not optional.

- All interactive elements must have accessible labels (`aria-label` on icon-only buttons and links)
- Section elements use semantic HTML: `<section>`, `<article>`, `<nav>`, `<main>`, `<footer>`
- Heading hierarchy: one `<h1>` (name in Hero), `<h2>` per section, `<h3>` within sections
- Color contrast: `#E36A6A` on `#1A1A1A` passes WCAG AA at 3.8:1 for large text. Use `text-text-base` (`#F0F0F0`) on dark surfaces for body text — passes AAA at 14:1
- Focus indicators must be visible: `focus-visible:ring-2 focus-visible:ring-primary` on all interactive elements
- Resume PDF link: `target="_blank"` with `rel="noopener noreferrer"` and visually hidden `(opens in new tab)` for screen readers

---

## 11. SEO & Metadata (`app/layout.tsx`)

```ts
import type { Metadata } from "next";
import { personal } from "@/data";

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.title}`,
  description: personal.bio,
  openGraph: {
    title: `${personal.name} — ${personal.title}`,
    description: personal.tagline,
    url: "https://alexrivera.dev",
    siteName: personal.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.title}`,
    description: personal.tagline,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

Generate `/public/og-image.png` (1200×630) as a static asset. Do not use `next/og` dynamic generation — it adds a server function to what is otherwise a fully static build.

---

## 12. Deployment

### Vercel (Recommended)
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/alexrivera/portfolio.git
git push -u origin main
```

Import repository on [vercel.com](https://vercel.com). Zero configuration required for Next.js with `output: "export"`. Set custom domain in project settings.

### Cloudflare Pages (Alternative)
Build command: `npm run build`  
Output directory: `out`  
No environment variables required.

### Environment Variables
None required. This is a fully static site. If a contact form is added later using Resend or Formspree, add `NEXT_PUBLIC_FORM_ENDPOINT` at that time.

---

## 13. Implementation Checklist

### Phase 1 — Foundation
- [ ] Initialize Next.js project with TypeScript, Tailwind, App Router
- [ ] Configure `tailwind.config.ts` with full token set
- [ ] Configure `globals.css` with CSS variables and utility classes
- [ ] Set up `next/font` for Inter and JetBrains Mono
- [ ] Define all types in `types/index.ts`
- [ ] Populate all data files
- [ ] Set `output: "export"` in `next.config.ts`
- [ ] Initialize shadcn/ui and add required components

### Phase 2 — Primitives and Layout
- [ ] `SectionHeading` primitive
- [ ] `Timeline` primitive
- [ ] `TechBadge` primitive
- [ ] `AnimatedSection` wrapper
- [ ] `Navbar` with intersection-based active state
- [ ] `Footer`

### Phase 3 — Sections
- [ ] Hero
- [ ] About
- [ ] Education
- [ ] Skills (tabs: Skills + Certifications)
- [ ] Experience
- [ ] Projects (featured + grid)
- [ ] Tech Stack (filtered grid)

### Phase 4 — Quality
- [ ] Accessibility audit (axe DevTools or Lighthouse)
- [ ] Keyboard navigation test (Tab through all interactive elements)
- [ ] Mobile viewport test at 375px, 390px, 430px
- [ ] Lighthouse run — target all scores ≥ 95
- [ ] `prefers-reduced-motion` verified
- [ ] All `<Image>` components have explicit dimensions
- [ ] OG image generated and verified with [opengraph.xyz](https://opengraph.xyz)
- [ ] Resume PDF tested and accessible

### Phase 5 — Deploy
- [ ] Push to GitHub
- [ ] Deploy on Vercel
- [ ] Connect custom domain
- [ ] Verify HTTPS and `www` redirect
- [ ] Test on real iOS and Android devices

---

## 14. Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "framer-motion": "11.x",
    "lucide-react": "latest",
    "react-intersection-observer": "9.x",
    "class-variance-authority": "0.7.x",
    "clsx": "2.x",
    "tailwind-merge": "2.x"
  },
  "devDependencies": {
    "typescript": "5.x",
    "@types/react": "18.x",
    "@types/node": "20.x",
    "tailwindcss": "3.x",
    "tailwindcss-animate": "1.x",
    "eslint": "8.x",
    "eslint-config-next": "14.x"
  }
}
```

**No additional dependencies.** Every item above has a clear, non-replaceable function. Adding libraries for things Tailwind, shadcn, or the browser already handle natively is how projects become unmaintainable.
