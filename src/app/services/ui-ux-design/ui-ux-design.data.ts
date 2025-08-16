// src/app/services/ui-ux-design/ui-ux-design.data.ts

import {
  Users, Layout, Boxes, PenTool, Palette, Ruler, Sparkles, Eye,
  Accessibility, Type, Image as ImageIcon, Globe, HeartHandshake,
  Cloud, ListChecks,
} from "lucide-react";

export const scope = [
  {
    icon: Users,
    title: "Discovery & Research",
    points: [
      "Stakeholder workshops & problem framing",
      "User interviews, surveys, JTBD & personas",
      "Analytics review & heuristics audit",
      "Opportunity map & north-star outcomes",
    ],
  },
  {
    icon: Layout,
    title: "Information Architecture",
    points: [
      "User flows & task models",
      "Site map, nav & URL strategy",
      "Wireframes (low → mid fidelity)",
      "Content structure & page templates",
    ],
  },
  {
    icon: Boxes,
    title: "Design System",
    points: [
      "Tokens (color, type, spacing, motion)",
      "Accessible components (WCAG 2.1 AA)",
      "States, variants, theming (incl. dark)",
      "Usage docs & Storybook handoff",
    ],
  },
  {
    icon: PenTool,
    title: "Interaction & Motion",
    points: [
      "Micro-interactions & transitions",
      "Motion specs & easing tokens",
      "Gesture & touch patterns",
      "Lottie/Rive assets where useful",
    ],
  },
  {
    icon: Palette,
    title: "Visual Design",
    points: [
      "Look & feel exploration (moodboards)",
      "Grids, typography & iconography",
      "Illustration & imagery guidance",
      "Hi-fi screens & clickable prototypes",
    ],
  },
  {
    icon: Eye,
    title: "Usability Testing",
    points: [
      "Prototype tests (remote/in-person)",
      "Task success & time-on-task",
      "A/B concepts & preference tests",
      "Insights → iteration cycles",
    ],
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    points: [
      "WCAG 2.1 AA standards from Day 1",
      "Keyboard order & focus states",
      "Color contrast & motion sensitivity",
      "Screen reader patterns & labels",
    ],
  },
  {
    icon: Type,
    title: "Content & Microcopy",
    points: [
      "Voice & tone guidelines",
      "UX writing for clarity & trust",
      "Form, error & empty-state copy",
      "Localization-ready strings",
    ],
  },
  {
    icon: ImageIcon,
    title: "Performance-minded UI",
    points: [
      "Image & icon strategy (SVG/AVIF)",
      "Font loading & fallbacks",
      "Above-the-fold prioritization",
      "Design for Core Web Vitals",
    ],
  },
  {
    icon: Globe,
    title: "i18n & RTL Readiness",
    points: [
      "Layout mirroring (RTL)",
      "Date/number/currency formats",
      "String expansion rules",
      "Locale-aware navigation",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Handoff & Collaboration",
    points: [
      "Redlines, annotations & specs",
      "Design tokens → code mapping",
      "Backlog grooming with product/eng",
      "Design QA in pre-prod",
    ],
  },
  {
    icon: Sparkles,
    title: "Iteration & Growth",
    points: [
      "Experiment roadmap & A/B ideas",
      "Heatmaps & funnel insights",
      "Continuous discovery rituals",
      "Quarterly UX health checks",
    ],
  },
];

export const quality = [
  {
    icon: ListChecks,
    title: "Design QA",
    bullets: [
      "Spec parity checks in staging",
      "Component vs. design system drift",
      "Accessibility & contrast audits",
    ],
  },
  {
    icon: Accessibility,
    title: "A11y & Usability",
    bullets: [
      "WCAG 2.1 AA verification",
      "Keyboard/screen reader flows",
      "Task success measurements",
    ],
  },
  {
    icon: Cloud,
    title: "Handoff & Traceability",
    bullets: [
      "Versioned files & specs",
      "Tokens synced to code",
      "Storybook/Zeroheight docs",
    ],
  },
  {
    icon: Sparkles,
    title: "Governance",
    bullets: [
      "Design reviews & approvals",
      "Backlog & change control",
      "Quality gates before release",
    ],
  },
];

export const deliverables = [
  {
    title: "Strategy & Research",
    bullets: [
      "Research plan & insights deck",
      "Personas/JTBD & journey maps",
      "Heuristics & analytics audit",
      "Opportunity areas",
    ],
  },
  {
    title: "UX & Flows",
    bullets: [
      "IA (site map, nav, URLs)",
      "User flows & wireframes",
      "Prototype(s) for testing",
      "Content model & states",
    ],
  },
  {
    title: "UI & System",
    bullets: [
      "Tokens & component library",
      "Hi-fi screens & variants",
      "Motion specs & assets",
      "Storybook/Zeroheight pages",
    ],
  },
  {
    title: "Enablement",
    bullets: [
      "Redlines & annotations",
      "Copy deck & tone guide",
      "KT sessions & training",
      "Handover checklist",
    ],
  },
];

export const process = [
  { step: "01", title: "Discover", desc: "Goals, users, constraints & success metrics." },
  { step: "02", title: "Define", desc: "IA, flows, wireframes & content model." },
  { step: "03", title: "Design", desc: "Design system, hi-fi UI & micro-interactions." },
  { step: "04", title: "Validate", desc: "Usability tests & accessibility checks." },
  { step: "05", title: "Handoff", desc: "Specs, tokens, Storybook & QA support." },
  { step: "06", title: "Launch", desc: "Design QA, parity checks & polish." },
  { step: "07", title: "Improve", desc: "Experiments, analytics & iteration." },
];

export const tech = [
  {
    title: "Design & Prototyping",
    tags: ["Figma", "FigJam", "Framer", "ProtoPie", "+ many more"],
  },
  {
    title: "Design Systems",
    tags: ["Tokens Studio", "Style Dictionary", "Storybook", "Zeroheight", "+ many more"],
  },
  {
    title: "Accessibility & QA",
    tags: ["axe", "Stark", "Lighthouse a11y", "NVDA/VoiceOver", "+ many more"],
  },
  {
    title: "Motion & Assets",
    tags: ["Lottie", "Rive", "After Effects", "SVGO", "+ many more"],
  },
  {
    title: "Collaboration & Handoff",
    tags: ["Jira", "Confluence", "Zeplin", "Linear", "+ many more"],
  },
  {
    title: "Research & Insight",
    tags: ["Hotjar", "GA4", "Maze", "UserTesting", "+ many more"],
  },
  {
    title: "Frontend Bridge",
    tags: ["Storybook", "Radix UI", "Tailwind", "Framer Motion", "+ many more"],
  },
  {
    title: "Localization",
    tags: ["Phrase", "Lokalise", "i18next", "FormatJS", "+ many more"],
  },
];