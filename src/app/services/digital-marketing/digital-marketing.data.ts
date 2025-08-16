// src/app/services/digital-marketing/digital-marketing.data.ts

import {
  Megaphone, Target, Search, FileText, Wrench, LineChart, Users, Shield,
  Gauge, MousePointerClick, Workflow, Bot, Cloud, ServerCog, Sparkles,
} from "lucide-react";

export const scope = [
  {
    icon: Target,
    title: "Strategy & Roadmap",
    points: [
      "Brand positioning & ICP definition",
      "Objectives, budgets & channel mix",
      "Messaging pillars & value props",
      "90-day execution plan",
    ],
  },
  {
    icon: Search,
    title: "SEO Foundations",
    points: [
      "Keyword & intent research",
      "On-page structure & internal links",
      "Schema/rich results opportunities",
      "Local & international SEO setup",
    ],
  },
  {
    icon: Wrench,
    title: "Technical SEO",
    points: [
      "Crawl, index & site architecture",
      "CWV: LCP/INP/CLS improvements",
      "Sitemaps, robots & hreflang",
      "Redirects, canonicals & dupes",
    ],
  },
  {
    icon: FileText,
    title: "Content & Editorial",
    points: [
      "Topic clusters & briefs",
      "Landing/blog templates & CTAs",
      "Content calendar & governance",
      "Repurposing for social/email",
    ],
  },
  {
    icon: Megaphone,
    title: "Paid Media (PPC/PPM)",
    points: [
      "Google/Microsoft Ads buildout",
      "Meta/LinkedIn/TikTok campaigns",
      "Bidding, audiences & exclusions",
      "Creative testing & scheduling",
    ],
  },
  {
    icon: Users,
    title: "Social & Community",
    points: [
      "Channel strategy & tone",
      "Organic calendar & asset kits",
      "Influencer & UGC programs",
      "Social listening & response",
    ],
  },
  {
    icon: Bot,
    title: "Lifecycle & Automation",
    points: [
      "Welcome, nurture & re-engage flows",
      "Email/SMS segmentation & scoring",
      "Personalization & triggers",
      "CRM sync & hygiene",
    ],
  },
  {
    icon: ServerCog,
    title: "Analytics & Tagging",
    points: [
      "GA4/GTM set-up & server-side GTM",
      "Event/UTM governance",
      "GSC/Ads/CRM data alignment",
      "Looker dashboards",
    ],
  },
  {
    icon: LineChart,
    title: "Attribution & Measurement",
    points: [
      "Modeling (data-driven/position-based)",
      "Offline/CRM revenue stitching",
      "Channel & creative contribution",
      "Experiment design & guardrails",
    ],
  },
  {
    icon: MousePointerClick,
    title: "CRO & Experimentation",
    points: [
      "Heuristics & funnel analysis",
      "A/B & multivariate tests",
      "Landing page frameworks",
      "UX & copy iteration loops",
    ],
  },
  {
    icon: Shield,
    title: "Governance & Compliance",
    points: [
      "Consent (CMP) & privacy banners",
      "GDPR/PECR policy alignment",
      "Data retention & access rules",
      "Brand safety & ad policies",
    ],
  },
  {
    icon: Gauge,
    title: "Performance & Scaling",
    points: [
      "Budget pacing & forecast",
      "Creative fatigue & rotation",
      "Audience expansion & LALs",
      "Always-on optimization",
    ],
  },
];

export const quality = [
  {
    icon: Workflow,
    title: "Operating Model",
    bullets: [
      "Weekly sprints & clear owners",
      "Shared backlog & SLAs",
      "Change & approval workflow",
    ],
  },
  {
    icon: Shield,
    title: "Risk & Compliance",
    bullets: [
      "Consent & privacy reviews",
      "Brand safety & exclusions",
      "Platform policy checks",
    ],
  },
  {
    icon: LineChart,
    title: "Measurement",
    bullets: [
      "Scorecards & channel KPIs",
      "Revenue & pipeline tie-back",
      "Test read-outs & learnings",
    ],
  },
  {
    icon: Sparkles,
    title: "Continuous Improvement",
    bullets: [
      "Creative & audience refresh",
      "SEO/content refresh cadence",
      "Quarterly strategy resets",
    ],
  },
];

export const deliverables = [
  {
    title: "Strategy Pack",
    bullets: [
      "ICP & messaging pillars",
      "Channel mix & budgets",
      "90-day roadmap",
      "Measurement framework",
    ],
  },
  {
    title: "Channel Playbooks",
    bullets: [
      "SEO & content templates",
      "PPC build & naming standards",
      "Social calendar & asset kit",
      "Automation flow maps",
    ],
  },
  {
    title: "Data & Reporting",
    bullets: [
      "GA4/GTM event model",
      "Attribution & UTM rules",
      "Looker dashboards",
      "Weekly exec summary",
    ],
  },
  {
    title: "Enablement",
    bullets: [
      "KT & tooling training",
      "Copy/design guidelines",
      "Ops runbooks",
      "Handover checklist",
    ],
  },
];

export const process = [
  { step: "01", title: "Discover", desc: "Goals, ICP, baseline & gaps." },
  { step: "02", title: "Audit", desc: "SEO, content, paid & data stack." },
  { step: "03", title: "Plan", desc: "Roadmap, budgets & KPIs." },
  { step: "04", title: "Build", desc: "Assets, tagging & launches." },
  { step: "05", title: "Launch", desc: "Phased go-live & QA." },
  { step: "06", title: "Optimize", desc: "Tests, bids, creatives & UX." },
  { step: "07", title: "Scale", desc: "New channels & automation." },
];

export const tech = [
  {
    title: "SEO & Research",
    tags: ["Ahrefs", "Semrush", "Screaming Frog", "Sitebulb", "+ many more"],
  },
  {
    title: "Analytics & Tagging",
    tags: ["GA4", "GTM / sGTM", "GSC", "Looker Studio", "+ many more"],
  },
  {
    title: "Ads Platforms",
    tags: ["Google Ads", "Microsoft Ads", "Meta", "LinkedIn/TikTok", "+ many more"],
  },
  {
    title: "Automation & CRM",
    tags: ["HubSpot", "Salesforce", "Klaviyo", "Mailchimp", "+ many more"],
  },
  {
    title: "Attribution & Mobile",
    tags: ["Segment", "mParticle", "AppsFlyer", "Adjust/Branch", "+ many more"],
  },
  {
    title: "CRO & Testing",
    tags: ["Optimizely", "VWO", "Google Optimize alts", "PostHog Experiments", "+ many more"],
  },
  {
    title: "Social & Content",
    tags: ["Hootsuite", "Buffer", "Canva", "Airtable/Notion", "+ many more"],
  },
  {
    title: "Privacy & Consent",
    tags: ["OneTrust", "Cookiebot", "Sourcepoint", "Seers", "+ many more"],
  },
];