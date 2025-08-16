// src/app/services/branding/branding.data.ts

import {
  PenTool, Palette, Type, Sparkles, Megaphone, FileText, Layout,
  BookmarkCheck, Image as ImageIcon, Camera, Share2, Globe, Link2,
  Gauge, Shield, Cloud, LibraryBig, Wand2, FolderDown,
} from "lucide-react";

export const scope = [
  {
    icon: Sparkles,
    title: "Brand Strategy",
    points: [
      "Positioning, value prop & differentiators",
      "Audience/ICP & messaging pillars",
      "Voice, tone & personality traits",
      "Competitive & category audit",
    ],
  },
  {
    icon: PenTool,
    title: "Logo Exploration",
    points: [
      "Concept routes & creative directions",
      "Marks, wordmarks & lockups",
      "Scalability & legibility checks",
      "Black/white & small-size proofs",
    ],
  },
  {
    icon: Palette,
    title: "Visual Identity",
    points: [
      "Color system & accessibility ratios",
      "Typography & variable font sets",
      "Iconography/illustration style",
      "Grid, spacing & elevation rules",
    ],
  },
  {
    icon: Type,
    title: "Messaging System",
    points: [
      "Tagline & elevator pitch",
      "Headline formulas & CTAs",
      "Product/feature narratives",
      "Do’s/don’ts & tone sliders",
    ],
  },
  {
    icon: Layout,
    title: "Brand System & Tokens",
    points: [
      "Design tokens (color, type, radius)",
      "Component specs & UI patterns",
      "Dark mode & theming guidance",
      "Storybook/Zeroheight docs",
    ],
  },
  {
    icon: FileText,
    title: "Guidelines & Governance",
    points: [
      "Logo usage & clear space",
      "Photography & art direction",
      "Co-branding/partnership rules",
      "Template & asset versioning",
    ],
  },
  {
    icon: Megaphone,
    title: "Go-to-Market Creative",
    points: [
      "Campaign concepts & ad sets",
      "Landing hero & social riffs",
      "Email/SMS launch assets",
      "Out-of-home & print ready",
    ],
  },
  {
    icon: Share2,
    title: "Social & Content Kit",
    points: [
      "Profile/cover imagery & bios",
      "Post/story/reel templates",
      "Hashtag & caption playbook",
      "UGC & creator guidelines",
    ],
  },
  {
    icon: Globe,
    title: "Web & SEO Hand-Off",
    points: [
      "Favicon/app icons & meta sets",
      "Open Graph & social cards",
      "Title/description patterns",
      "Brand landing scaffolds",
    ],
  },
  {
    icon: Link2,
    title: "Campaign Enablement",
    points: [
      "Ad copy matrices & variants",
      "Image/video ratio kits (1:1, 9:16, etc.)",
      "UTM naming standards",
      "Creative testing roadmap",
    ],
  },
  {
    icon: Camera,
    title: "Asset Production",
    points: [
      "Logo suite (SVG/PNG/PDF/AI)",
      "Patterns, textures & shapes",
      "Mockups for product/packaging",
      "Motion logo/Lottie (optional)",
    ],
  },
  {
    icon: BookmarkCheck,
    title: "Launch Support",
    points: [
      "Brand rollout checklist",
      "Internal enablement deck",
      "KT & training sessions",
      "Post-launch polish sprint",
    ],
  },
];

export const quality = [
  {
    icon: Gauge,
    title: "Clarity & Consistency",
    bullets: [
      "One source of truth for assets",
      "Tokenized decisions → dev ready",
      "Accessible color & type choices",
    ],
  },
  {
    icon: Shield,
    title: "Brand Safety",
    bullets: [
      "Usage rules to prevent drift",
      "Co-branding & partner controls",
      "Trademark-friendly guidance",
    ],
  },
  {
    icon: LibraryBig,
    title: "Ready for Marketing",
    bullets: [
      "Ad-ready creative kits",
      "SEO/social metadata patterns",
      "Testing & iteration playbook",
    ],
  },
  {
    icon: FolderDown,
    title: "Hand-off & Support",
    bullets: [
      "Versioned exports & source files",
      "Docs hosted (Zeroheight/Notion)",
      "On-call brand QA for launch",
    ],
  },
];

export const deliverables = [
  {
    title: "Strategy & System",
    bullets: [
      "Brand strategy deck",
      "Messaging architecture",
      "Design tokens & components",
      "Brand guidelines (PDF/URL)",
    ],
  },
  {
    title: "Identity Suite",
    bullets: [
      "Logo marks & lockups (light/dark)",
      "Favicon/app icons",
      "Color & type specs",
      "Icon/illustration starter set",
    ],
  },
  {
    title: "Marketing Kit",
    bullets: [
      "Ad sets & creative templates",
      "Social/profile assets & bios",
      "Email/SMS launch assets",
      "OG/social card library",
    ],
  },
  {
    title: "Enablement",
    bullets: [
      "Templates (deck, docs, one-pagers)",
      "KT & training sessions",
      "Handover checklist",
      "30-day support window",
    ],
  },
];

export const process = [
  { step: "01", title: "Discover", desc: "Workshops, research, brand audit & goals." },
  { step: "02", title: "Define", desc: "Positioning, voice, messaging & creative routes." },
  { step: "03", title: "Design", desc: "Logo, identity, tokens & design system." },
  { step: "04", title: "Validate", desc: "Accessibility, small-size & real-world mocks." },
  { step: "05", title: "Activate", desc: "Campaign kits, social assets & SEO meta." },
  { step: "06", title: "Handoff", desc: "Guides, exports, source & training." },
  { step: "07", title: "Launch", desc: "Rollout support & post-launch refinements." },
];

export const tech = [
  { title: "Design & Vector", tags: ["Figma", "FigJam", "Illustrator", "Photoshop", "+ many more"] },
  { title: "Motion & Export", tags: ["After Effects", "Lottie", "Rive", "SVGO", "+ many more"] },
  { title: "Systems & Docs", tags: ["Tokens Studio", "Style Dictionary", "Storybook", "Zeroheight", "+ many more"] },
  { title: "Content & Social", tags: ["Notion", "Airtable", "Canva", "Hootsuite/Buffer", "+ many more"] },
  { title: "SEO & Meta", tags: ["OG/OpenGraph", "Schema.org", "Ahrefs/Semrush", "Lighthouse", "+ many more"] },
  { title: "Collab & Handoff", tags: ["Jira", "Confluence", "Zeplin", "Linear", "+ many more"] },
  { title: "File Delivery", tags: ["SVG/PNG/AVIF", "PDF/AI/FIG", "Font sources", "Renditions per channel"] },
  { title: "Web Bridge", tags: ["Tailwind tokens", "Radix UI", "Framer Motion", "Storybook", "+ many more"] },
];