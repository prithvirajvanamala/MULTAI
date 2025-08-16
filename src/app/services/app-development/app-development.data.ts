// src/app/services/app-development/app-development.data.ts

import {
  Smartphone,
  Layout,
  Boxes,
  Code2,
  Bell,
  Gauge,
  Shield,
  Store,
  Workflow,
  Cloud,
  RefreshCcw,
  Wrench,
  ListChecks,
  ServerCog,
  FileCode2,
  Rocket,
  GraduationCap,
  HardDrive,
  GitBranch,
  Monitor,
  Bug,
  Lock,
  Database,
  BarChart,
} from "lucide-react";
import { type Variants } from "framer-motion";

/* ---------- Motion Variants ---------- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export const containerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

/* ---------- Data Arrays ---------- */
export const scope = [
  {
    icon: Layout,
    title: "Architecture",
    points: [
      "Clean Architecture, MVVM/MVI patterns",
      "API contracts (REST/GraphQL) & BFF",
      "State mgmt (Redux/RTK, Bloc, Context)",
      "Modular codebase & versioning strategy",
    ],
  },
  {
    icon: Boxes,
    title: "Design System",
    points: [
      "Tokens (color, type, spacing, motion)",
      "Reusable components & design patterns",
      "WCAG 2.1 AA accessibility for mobile",
      "Dark mode & adaptive layouts",
    ],
  },
  {
    icon: Code2,
    title: "App Build & Integrations",
    points: [
      "React Native / Flutter / Native (Swift/Kotlin)",
      "Auth (SSO/OAuth, biometrics), RBAC",
      "Payments (Stripe, Apple/Google Pay)",
      "CRM, search, analytics, feature flags",
    ],
  },
  {
    icon: Smartphone,
    title: "Offline-First & Sync",
    points: [
      "Local storage (SQLite/Room/Core Data/MMKV)",
      "Delta sync & conflict resolution",
      "Background tasks & retry queues",
      "Graceful degraded modes",
    ],
  },
  {
    icon: Bell,
    title: "Engagement",
    points: [
      "Push (APNs/FCM) & in-app messaging",
      "Deep links & universal links / app links",
      "Remote config & feature targeting",
      "Attribution & cohorts",
    ],
  },
  {
    icon: Gauge,
    title: "Performance",
    points: [
      "Startup time, jank & memory budgets",
      "Bundles, split APK/ABI, Hermes/V8 tuning",
      "Image/font/animation optimization",
      "Profiling & regression guardrails",
    ],
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    points: [
      "Keychain/Keystore, secure storage",
      "SSL pinning & cert rotation",
      "Jailbreak/root detection & obfuscation",
      "GDPR/ATT consent & data minimization",
    ],
  },
  {
    icon: Store,
    title: "Store Readiness",
    points: [
      "App ID, signing & provisioning",
      "Listings, screenshots & privacy labels",
      "Review guidelines compliance",
      "Release trains & phased rollout",
    ],
  },
  {
    icon: Workflow,
    title: "CI/CD & Automation",
    points: [
      "Azure DevOps Pipelines / GitHub Actions",
      "Fastlane/Gradle tasks, code signing at scale",
      "Multi-env builds & gated approvals",
      "TestFlight / Play Console tracks",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud Engineering",
    points: [
      "BFF/edge APIs & API gateway",
      "Notifications, media & downloads pipeline",
      "IaC (Terraform/Bicep), secret mgmt",
      "Monitoring (App Insights/Sentry/Datadog)",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Migration & Upgrades",
    points: [
      "SDK/OS upgrades (iOS/Android) safely",
      "RN/Flutter channel & dependency hygiene",
      "Incremental module rewrites",
      "Zero-downtime cutovers & rollback",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    points: [
      "SLA support & health checks",
      "Security patches & hotfix playbooks",
      "A/B tests & CRO experiments",
      "Roadmap & backlog grooming",
    ],
  },
];

export const quality = [
  {
    icon: ListChecks,
    title: "QA: Manual & Automation",
    bullets: [
      "Exploratory, UAT & device matrices",
      "Unit (XCTest/Jest), UI (XCUITest/Espresso/Detox)",
      "Maestro flows & accessibility checks",
    ],
  },
  {
    icon: Gauge,
    title: "Performance Engineering",
    bullets: [
      "Startup, FPS/jank, memory & battery",
      "Network, images & bundle size budgets",
      "Continuous perf tracking in CI",
    ],
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    bullets: [
      "Secure storage & transport, CSP/ATS",
      "Secrets, device checks & anti-tamper",
      "PII handling, GDPR/ATT consent",
    ],
  },
  {
    icon: ServerCog,
    title: "DevOps & Observability",
    bullets: [
      "Crashlytics/Sentry & release tracking",
      "Logs, metrics & traces (OTel)",
      "Rollbacks & DR readiness",
    ],
  },
];

export const deliverables = [
  {
    icon: FileCode2,
    title: "Engineering",
    bullets: [
      "iOS & Android apps (prod-ready)",
      "Component library & design tokens",
      "API contracts & architecture docs",
      "CI/CD pipelines & IaC",
    ],
  },
  {
    icon: Rocket,
    title: "Release & Store",
    bullets: [
      "Signing, provisioning & keystores",
      "App Store / Play Console listings",
      "Privacy labels & screenshots",
      "Release calendar & rollout plan",
    ],
  },
  {
    icon: HardDrive,
    title: "Operations",
    bullets: [
      "Runbooks & on-call playbook",
      "Monitoring dashboards & alerts",
      "Security baseline & backups",
      "Incident & rollback strategy",
    ],
  },
  {
    icon: GraduationCap,
    title: "Enablement",
    bullets: [
      "KT sessions for dev/ops/support",
      "Authoring & analytics training",
      "Tooling training (CI/QA/crash)",
      "Handover checklist",
    ],
  },
];

export const process = [
  { step: "01", title: "Discovery", desc: "Goals, users, metrics, risks & scope." },
  { step: "02", title: "Plan", desc: "Backlog, milestones, envs & access." },
  { step: "03", title: "Design", desc: "Flows → UI; patterns; tokens; a11y." },
  { step: "04", title: "Build", desc: "Incremental features, integrations, flags." },
  { step: "05", title: "QA & Beta", desc: "Manual + automation, TestFlight/Closed test." },
  { step: "06", title: "Launch", desc: "Submissions, phased rollout, monitoring." },
  { step: "07", title: "Operate", desc: "Sprints, upgrades, CRO & perf tuning." },
];

export const tech = [
  {
    icon: Code2,
    title: "Frameworks",
    tags: [
      "React Native (New Arch/Hermes)",
      "Flutter (Material 3)",
      "iOS: Swift/SwiftUI",
      "Android: Kotlin/Jetpack Compose",
      "+ many more",
    ],
  },
  {
    icon: GitBranch,
    title: "Build & Release",
    tags: [
      "Azure DevOps Pipelines",
      "GitHub Actions / Bitrise",
      "Fastlane, Gradle, Xcode Cloud",
      "App Center, TestFlight, Play Console",
      "+ many more",
    ],
  },
  {
    icon: Bug,
    title: "Testing",
    tags: [
      "XCTest, XCUITest",
      "JUnit/Espresso",
      "Detox, Maestro",
      "Jest/Vitest, Playwright",
      "+ many more",
    ],
  },
  {
    icon: Monitor,
    title: "Device Labs",
    tags: [
      "BrowserStack",
      "Firebase Test Lab",
      "AWS Device Farm",
      "Real device rigs",
      "+ many more",
    ],
  },
  {
    icon: BarChart,
    title: "Analytics & Growth",
    tags: [
      "Firebase Analytics, GA4",
      "Mixpanel, Segment, Amplitude",
      "AppsFlyer/Adjust (attribution)",
      "Remote Config & A/B testing",
      "+ many more",
    ],
  },
  {
    icon: Gauge,
    title: "Crash & Performance",
    tags: [
      "Crashlytics, Sentry Mobile",
      "Firebase Perf, New Relic",
      "App Insights",
      "OpenTelemetry",
      "+ many more",
    ],
  },
  {
    icon: Lock,
    title: "Security",
    tags: [
      "Keychain/Keystore, SecureStore",
      "App Attest / DeviceCheck",
      "SSL pinning",
      "Code obfuscation",
      "+ many more",
    ],
  },
  {
    icon: Database,
    title: "Backend & Data",
    tags: [
      "GraphQL/REST/tRPC BFF",
      "Postgres, Redis, SQLite/Core Data/Room",
      "Supabase/Hasura",
      "S3/Cloudinary for media",
      "+ many more",
    ],
  },
];