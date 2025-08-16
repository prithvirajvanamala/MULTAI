// src/app/services/web-development/web-development.data.ts

import {
  Layout,
  Boxes,
  Code2,
  Search,
  Gauge,
  RefreshCcw,
  Wrench,
  Shield,
  ServerCog,
  Workflow,
  Cloud,
  ListChecks,
  Rocket,
  Tablet,
  Database,
  Link,
  GitBranch,
  Bug,
  Activity,
  BarChart,
  HardDrive, // Used for deliverables
  FileCode2, // Used for deliverables
  Handshake, // Used for deliverables
  GraduationCap, // Used for deliverables
  Monitor, // Used for tech
  Webhook, // Used for tech
  FolderSearch, // Used for tech
  ShoppingCart, // Used for tech
} from "lucide-react";

export const scope = [
  {
    icon: Layout,
    title: "Architecture",
    points: [
      "Information architecture & URL strategy",
      "API design (REST/GraphQL) & data contracts",
      "Domain modelling, roles & permissions",
      "Versioning, error model & pagination",
    ],
  },
  {
    icon: Boxes,
    title: "Design System",
    points: [
      "Tokens (color, type, spacing, motion)",
      "Accessible components (WCAG 2.1 AA)",
      "Responsive grid & theming (incl. dark)",
      "Storybook docs & usage guidelines",
    ],
  },
  {
    icon: Code2,
    title: "Build & Integrations",
    points: [
      "Next.js App Router, RSC, ISR/SSR/SSG",
      "Headless CMS, image CDN & media pipeline",
      "Auth (OAuth/SSO/magic links), RBAC",
      "Stripe, search, CRM, email/SMS, webhooks",
    ],
  },
  {
    icon: Search,
    title: "Technical SEO",
    points: [
      "Semantic HTML & JSON-LD structured data",
      "Meta/OG, canonical, robots & sitemaps",
      "i18n/hreflang & crawl-budget minded builds",
      "Redirect map (301/410) & link architecture",
    ],
  },
  {
    icon: Gauge,
    title: "Performance",
    points: [
      "Core Web Vitals targets (LCP/CLS/INP)",
      "Code-split, prefetch & route caching",
      "Image optimization & font strategy",
      "Edge caching, ISR & profiling",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Migration & Upgrades",
    points: [
      "Legacy → headless content & asset moves",
      "Zero-downtime cutover & rollback plan",
      "Framework/deps upgrades with flags",
      "SEO parity & analytics continuity",
    ],
  },
  {
    icon: Workflow,
    title: "Azure DevOps Pipelines",
    points: [
      "YAML multi-stage (build/test/deploy)",
      "Environments, approvals & checks",
      "Variable groups, Key Vault secrets",
      "Artifacts, caching & self-hosted agents",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Engineering",
    points: [
      "IaC (Terraform/Bicep) & GitOps",
      "CDN/WAF, API gateway, autoscaling",
      "Networking (VNet, peering, private links)",
      "Monitoring (App Insights/CloudWatch)",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    points: [
      "SLA-backed support & health checks",
      "Security patches & dependency hygiene",
      "Performance reviews & CRO experiments",
      "Backlog grooming & roadmap updates",
    ],
  },
];

export const quality = [
  {
    icon: ListChecks,
    title: "QA: Manual & Automation",
    bullets: [
      "Exploratory & UAT across devices",
      "Unit, API & E2E (Playwright/Cypress)",
      "A11y & Lighthouse gates in CI",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Engineering",
    bullets: [
      "LCP/CLS/INP budgets & alerts",
      "Edge/ISR, code-split & prefetch",
      "Regression guardrails & profiling",
    ],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    bullets: [
      "HTTPS, HSTS, CSP, secure headers",
      "AuthN/Z, secrets, least-privilege access",
      "GDPR-aware tracking & consent",
    ],
  },
  {
    icon: ServerCog,
    title: "DevOps & Observability",
    bullets: [
      "CI/CD with preview deploys",
      "Errors, logs, uptime & traces",
      "Rollbacks & DR readiness",
    ],
  },
];

export const deliverables = [
  {
    icon: FileCode2,
    title: "Engineering",
    bullets: [
      "Production-ready site/app",
      "Component library & tokens",
      "API specs & diagrams",
      "CI/CD & IaC",
    ],
  },
  {
    icon: HardDrive,
    title: "Content & SEO",
    bullets: [
      "CMS schema, roles & workflows",
      "Content migration & redirects",
      "SEO baseline (schema/meta)",
      "Editorial guide",
    ],
  },
  {
    icon: Handshake,
    title: "Operations",
    bullets: [
      "Runbooks & on-call playbook",
      "Monitoring & alerting",
      "Security baseline",
      "Backups & DR plan",
    ],
  },
  {
    icon: GraduationCap,
    title: "Enablement",
    bullets: [
      "KT sessions for teams",
      "CMS/author training",
      "Tooling training (analytics/testing)",
      "Handover checklist",
    ],
  },
];

export const process = [
  { step: "01", title: "Discovery", desc: "Goals, users, metrics, risks & scope." },
  { step: "02", title: "Plan", desc: "Backlog, milestones, envs & access." },
  { step: "03", title: "Design", desc: "Flows → UI; tokens; CMS schema; a11y." },
  { step: "04", title: "Build", desc: "Incremental delivery, integrations, flags." },
  { step: "05", title: "QA & Hardening", desc: "Manual + automation, perf & security gates." },
  { step: "06", title: "Launch", desc: "Cutover, DNS/301s, monitoring, rollback." },
  { step: "07", title: "Operate", desc: "Sprints, upgrades, CRO & performance tuning." },
];

export const tech = [
  {
    icon: Rocket,
    title: "Frontend",
    tags: [
      "Next.js (App Router, RSC, ISR/SSR/SSG)",
      "React + TypeScript",
      "Tailwind CSS, Radix UI, shadcn/ui",
      "Framer Motion, GSAP",
    ],
  },
  {
    icon: Webhook,
    title: "API & BFF",
    tags: [
      "Node.js (NestJS/Express)",
      "tRPC / GraphQL (Apollo) / REST",
      "WebSockets / SSE",
      "Zod validation & sanitization",
    ],
  },
  {
    icon: Database,
    title: "Data & Storage",
    tags: [
      "PostgreSQL (Neon), MySQL (PlanetScale)",
      "MongoDB (Atlas), SQLite (dev)",
      "Prisma ORM, Drizzle",
      "Redis (Upstash), S3, Cloudinary",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Content & Commerce",
    tags: [
      "Sanity, Contentful, Strapi",
      "MDX pipelines",
      "Shopify Storefront API",
      "Algolia/Meilisearch",
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Infra",
    tags: [
      "Vercel (Edge/ISR), Cloudflare",
      "Azure (App Service, Functions, KV)",
      "AWS (Lambda/S3/CloudFront)",
      "Docker, Terraform/Bicep, GitHub Actions/Azure DevOps",
    ],
  },
  {
    icon: Bug,
    title: "Testing & Quality",
    tags: [
      "Jest/Vitest (unit), Playwright/Cypress (E2E)",
      "Axe (a11y), Lighthouse CI",
      "Contract tests (Pact)",
      "OWASP ZAP (dynamic scans)",
    ],
  },
  {
    icon: Shield,
    title: "Observability & Security",
    tags: [
      "Sentry, App Insights, Datadog, OpenTelemetry",
      "Log drains (Elastic/Loki)",
      "Helmet, rate-limit, CSRF",
      "Dependabot/Renovate",
    ],
  },
  {
    icon: BarChart,
    title: "Analytics & Growth",
    tags: [
      "GA4, GTM, PostHog, Segment",
      "Looker Studio",
      "Hotjar / FullStory",
      "Experiment hooks (A/B)",
    ],
  },
];