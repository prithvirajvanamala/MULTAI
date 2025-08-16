// src/app/services/qa-testing/qa-testing.data.ts

import {
  Bug, ListChecks, Beaker, Workflow, Cloud, Gauge, Shield, Eye,
  ServerCog, Database, Rocket, ChevronRight, ClipboardCheck, Boxes,
} from "lucide-react";

export const scope = [
  {
    icon: ClipboardCheck,
    title: "Test Strategy & Planning",
    points: [
      "Risk-based strategy & acceptance criteria",
      "Traceability (requirements → tests → defects)",
      "Test matrix by platform, browser, and device",
      "Definition of Done & quality gates",
    ],
  },
  {
    icon: Bug,
    title: "Manual Functional Testing",
    points: [
      "Exploratory & scenario-based testing",
      "Regression & smoke suites",
      "Cross-browser/cross-device validation",
      "Edge, boundary & negative cases",
    ],
  },
  {
    icon: Beaker,
    title: "Test Automation",
    points: [
      "UI automation (Playwright/Cypress)",
      "API automation (REST Assured/Supertest)",
      "Mobile automation (Appium/Detox)",
      "Page-object & data-driven patterns",
    ],
  },
  {
    icon: Boxes,
    title: "API & Contract Testing",
    points: [
      "Postman/Newman suites & collections",
      "Pact contract tests & mock servers",
      "Schema validation & compatibility",
      "Rate-limit, auth & error model checks",
    ],
  },
  {
    icon: Gauge,
    title: "Performance & Load",
    points: [
      "k6/Gatling/JMeter scenarios",
      "Baseline SLOs, soak & spike tests",
      "Web Vitals & Lighthouse budgets",
      "Perf regressions in CI",
    ],
  },
  {
    icon: Shield,
    title: "Security Testing",
    points: [
      "OWASP checks, ZAP active scans",
      "Dependency/SCA & secrets scanning",
      "AuthZ/AuthN, session & CSRF tests",
      "Headers, CSP & TLS hardening checks",
    ],
  },
  {
    icon: Eye,
    title: "Accessibility (a11y)",
    points: [
      "WCAG 2.1 AA audits (axe/pa11y)",
      "Keyboard & focus order",
      "Screen reader flows",
      "Color contrast & motion settings",
    ],
  },
  {
    icon: Database,
    title: "Data & Migration QA",
    points: [
      "ETL/ELT validation & row parity",
      "Schema/lineage & constraints",
      "Reports/dashboard parity checks",
      "PII masking & anonymization",
    ],
  },
  {
    icon: ServerCog,
    title: "CI/CD & Quality Gates",
    points: [
      "Azure DevOps/GitHub Actions pipelines",
      "Parallelization & flaky test control",
      "Allure/Lighthouse gating thresholds",
      "Testcontainers & ephemeral envs",
    ],
  },
  {
    icon: Cloud,
    title: "Device & Browser Lab",
    points: [
      "BrowserStack/Sauce Labs clouds",
      "Real device rigs & OS matrices",
      "Network, locale & accessibility modes",
      "Visual regression with image diff",
    ],
  },
  {
    icon: Workflow,
    title: "UAT & Release Readiness",
    points: [
      "UAT coordination & sign-off",
      "Defect triage & stabilization",
      "Go/no-go & rollback validation",
      "Release notes & evidence pack",
    ],
  },
  {
    icon: Rocket,
    title: "Maintenance & Support",
    points: [
      "Suite upkeep & flaky test triage",
      "Dependency & SDK hygiene",
      "Runtime incident reproduction",
      "Knowledge base & playbooks",
    ],
  },
];

export const quality = [
  {
    icon: ListChecks,
    title: "Governance & Risk",
    bullets: [
      "Risk matrix & mitigation plan",
      "Audit-ready evidence & approvals",
      "Change/rollback procedures",
    ],
  },
  {
    icon: Gauge,
    title: "Coverage & Metrics",
    bullets: [
      "Reqs traceability & defect trends",
      "Code & test coverage insights",
      "MTTR & reliability signals",
    ],
  },
  {
    icon: Shield,
    title: "Non-functional Quality",
    bullets: [
      "Performance SLOs & alerts",
      "Security baselines & scans",
      "Accessibility compliance",
    ],
  },
  {
    icon: ServerCog,
    title: "Reporting & Observability",
    bullets: [
      "Allure dashboards & HTML reports",
      "Sentry/Datadog/App Insights hooks",
      "QA scorecards for stakeholders",
    ],
  },
];

export const deliverables = [
  {
    title: "Strategy & Docs",
    bullets: [
      "Test strategy & plan",
      "Traceability matrix",
      "Risk register",
      "Sign-off checklist",
    ],
  },
  {
    title: "Automation Assets",
    bullets: [
      "UI/API/Mobile suites",
      "Reusable page objects",
      "Data factories & seeds",
      "Allure/Lighthouse reports",
    ],
  },
  {
    title: "Quality Ops",
    bullets: [
      "CI gates & pipelines",
      "Runbooks & playbooks",
      "Defect workflow",
      "A11y & security evidence",
    ],
  },
  {
    title: "Enablement",
    bullets: [
      "KT & tooling training",
      "Author & analyst training",
      "Handover checklist",
      "Ongoing support options",
    ],
  },
];

export const process = [
  { step: "01", title: "Discover", desc: "Goals, risks, acceptance, scope & envs." },
  { step: "02", title: "Plan", desc: "Test plan, matrices, data & device coverage." },
  { step: "03", title: "Prepare", desc: "Harness, fixtures, seeds & pipelines." },
  { step: "04", title: "Execute", desc: "Manual + automation, triage & fixes." },
  { step: "05", title: "Harden", desc: "Perf, security, a11y & regression gates." },
  { step: "06", title: "Sign-off", desc: "UAT, evidence pack & release readiness." },
  { step: "07", title: "Operate", desc: "Dashboards, upkeep, audits & support." },
];

export const tech = [
  {
    title: "Web/UI Automation",
    tags: ["Playwright", "Cypress", "Selenium", "TestCafe", "+ many more"],
  },
  {
    title: "Mobile Automation",
    tags: ["Appium", "Detox", "XCUITest", "Espresso", "+ many more"],
  },
  {
    title: "API & Contract",
    tags: ["Postman/Newman", "REST Assured", "Supertest", "Pact", "+ many more"],
  },
  {
    title: "Performance",
    tags: ["k6", "Gatling", "JMeter", "Lighthouse CI", "+ many more"],
  },
  {
    title: "Security",
    tags: ["OWASP ZAP", "Burp Suite", "Snyk", "Dependabot/Renovate", "+ many more"],
  },
  {
    title: "Accessibility",
    tags: ["axe-core", "pa11y", "Lighthouse a11y", "NVDA/VoiceOver", "+ many more"],
  },
  {
    title: "CI/CD & Lab",
    tags: ["Azure DevOps", "GitHub Actions", "BrowserStack", "Sauce Labs", "+ many more"],
  },
  {
    title: "Reporting & Mgmt",
    tags: ["Allure", "TestRail", "Zephyr/Xray", "Jira", "+ many more"],
  },
];