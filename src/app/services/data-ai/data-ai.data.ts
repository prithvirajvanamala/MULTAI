// src/app/services/data-ai/data-ai.data.ts

import {
  Database,
  Cloud,
  Workflow,
  BarChart3,
  Cable,
  LineChart,
  ShieldCheck,
  Lock,
  Gauge,
  ListChecks,
  Code2,
  Rocket,
  Sparkles,
  Bot,
  Brain,
  MessageSquare,
  Image,
  Mic,
  BookOpen,
  Search,
  Link as LinkIcon,
  Plug,
  Zap,
  CloudCog,
  ChevronRight,
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

/* ---------- DATA PLATFORM: What we’ll do ---------- */
export const dataScope = [
  {
    icon: BookOpen,
    title: "Data Strategy & Architecture",
    points: [
      "Current-state audit & target data model",
      "Lakehouse/warehouse blueprint (medallion)",
      "Ingestion, storage, access & governance map",
      "TCO & scaling plan across clouds",
    ],
  },
  {
    icon: Workflow,
    title: "ETL/ELT & Data Engineering",
    points: [
      "Batch/stream pipelines & CDC",
      "dbt modeling with tests & docs",
      "Airflow/Dagster orchestration",
      "Data quality checks (GE/Soda)",
    ],
  },
  {
    icon: Database,
    title: "Warehouses & Lakehouses",
    points: [
      "Snowflake/Redshift/BigQuery design",
      "Delta/Lakehouse on Databricks",
      "Partitioning, clustering, Z-order",
      "Cost/perf optimization & caching",
    ],
  },
  {
    icon: Cable,
    title: "Data & Report Migration",
    points: [
      "Legacy → cloud (DB/DW/files)",
      "Power BI/Looker/Tableau migrations",
      "Schema mapping & parity validation",
      "Cutover plan, rollback & sign-off",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & BI",
    points: [
      "Power BI/Tableau/Looker dashboards",
      "Semantic models & RLS",
      "Self-serve datasets & governance",
      "Experiment readouts & insights",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Data Quality, Lineage & Catalog",
    points: [
      "Rules, tests & anomaly detection",
      "Lineage & impact analysis",
      "Catalog & glossary (business terms)",
      "SLOs & freshness monitors",
    ],
  },
  {
    icon: Lock,
    title: "Security, Privacy & Compliance",
    points: [
      "PII handling & de-identification",
      "IAM, VPC/Private Link, IP allowlists",
      "Policy-as-code & audits",
      "GDPR/ISO/SOC alignment",
    ],
  },
  {
    icon: Gauge,
    title: "Performance & Cost Control",
    points: [
      "Query/storage optimisation",
      "Autoscale, caching & clustering",
      "Unit economics & budgets",
      "Chargeback/showback reporting",
    ],
  },
  {
    icon: MessageSquare,
    title: "Enablement & Adoption",
    points: [
      "Runbooks & playbooks",
      "Training for analysts & engineers",
      "KT & handover workshops",
      "Support & maintenance plans",
    ],
  },
];

/* ---------- AI SOLUTIONS: What we’ll do (expanded) ---------- */
export const aiScope = [
  {
    icon: Sparkles,
    title: "AI Strategy & Use Cases",
    points: [
      "Prioritised use-case backlog with ROI",
      "Feasibility, risk & data readiness",
      "Pilot → scale roadmap & guardrails",
      "Build vs. buy guidance",
    ],
  },
  {
    icon: Search,
    title: "Semantic Search & Knowledge",
    points: [
      "RAG pipelines (chunking, rerank, hybrid)",
      "Connect SharePoint, Confluence, GDrive, Notion",
      "Vector stores & metadata filters",
      "Feedback loops & freshness rules",
    ],
  },
  {
    icon: Bot,
    title: "LLM Apps, Agents & Orchestration",
    points: [
      "Tool/function calling & multi-step agents",
      "Workflow engines & guardrails",
      "Grounded prompts & context windows",
      "Human-in-the-loop escalation",
    ],
  },
  {
    icon: MessageSquare,
    title: "Chatbots & Channel Integrations",
    points: [
      "Web widget, mobile & in-app chat",
      "Slack/Teams/WhatsApp (via Twilio)",
      "Zendesk/Intercom/ServiceNow handoff",
      "Auth, SSO & CRM case sync",
    ],
  },
  {
    icon: Image,
    title: "Computer Vision & Doc AI",
    points: [
      "OCR, forms & document understanding",
      "Image classification & object detection",
      "Quality checks & defect detection",
      "Layout/receipt/invoice parsing",
    ],
  },
  {
    icon: Mic,
    title: "Speech & Multimodal",
    points: [
      "ASR (speech-to-text) & diarization",
      "TTS/voice cloning for responses",
      "Real-time voice bots & call center AI",
      "Multimodal inputs (image/audio/video)",
    ],
  },
  {
    icon: Brain,
    title: "NLP & Language Intelligence",
    points: [
      "Summarization, Q&A & extraction",
      "NER, sentiment & topic modeling",
      "Translation & content rewriting",
      "Policy/compliance redaction",
    ],
  },
  {
    icon: LineChart,
    title: "Recommendations & Forecasting",
    points: [
      "Personalisation & next-best-action",
      "Demand & churn forecasting",
      "Pricing & promo optimisation",
      "Anomaly/fraud detection",
    ],
  },
  {
    icon: Plug,
    title: "Copilots & Domain Integrations",
    points: [
      "M365/Dynamics, Salesforce, ServiceNow",
      "VS Code/dev workflows & internal apps",
      "Email/docs/spreadsheets copilots",
      "Vertical copilots (support, sales, HR)",
    ],
  },
  {
    icon: Zap,
    title: "Realtime & Streaming AI",
    points: [
      "Streaming context & outputs",
      "Event-driven triggers & SLAs",
      "Low-latency inference paths",
      "Voice & multimodal sessions",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Safety, Privacy & Governance",
    points: [
      "Moderation, PII redaction & hardening",
      "Jailbreak/prompt-injection defenses",
      "Data boundary & tenant isolation",
      "Model/feature access governance",
    ],
  },
  {
    icon: CloudCog,
    title: "MLOps, Serving & Evaluation",
    points: [
      "Model registries & versioning",
      "CI/CD & A/B/canary for AI",
      "RAG & prompt evals (quality/citation)",
      "Drift, latency & cost monitors",
    ],
  },
];

/* ---------- Quality & delivery ---------- */
export const quality = [
  {
    icon: ListChecks,
    title: "Testing & Validation",
    bullets: [
      "Pipeline unit/integration tests",
      "Contract/schema checks & golden sets",
      "AI evals (truthfulness, safety, UX)",
    ],
  },
  {
    icon: Code2,
    title: "CI/CD & DevOps",
    bullets: [
      "Azure DevOps/GitHub Actions pipelines",
      "Infra as code (Terraform/Bicep)",
      "Blue-green & canary releases",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Governance",
    bullets: [
      "RBAC/ABAC, data contracts",
      "Lineage & approvals workflow",
      "Audits, policy enforcement",
    ],
  },
  {
    icon: Rocket,
    title: "Reliability",
    bullets: [
      "SLA/SLOs & on-call runbooks",
      "Alerting & auto-remediation",
      "Backup, DR & chaos drills",
    ],
  },
];

/* ---------- Deliverables ---------- */
export const deliverables = [
  {
    title: "Architecture & Strategy",
    bullets: [
      "Target architecture & patterns",
      "Roadmap & cost model",
      "Security/governance blueprint",
      "Migration/cutover plan",
    ],
  },
  {
    title: "Pipelines & Models",
    bullets: [
      "dbt models & docs",
      "ETL/ELT pipelines & tests",
      "Feature store definitions",
      "Model/APIs (batch & real-time)",
    ],
  },
  {
    title: "AI Apps & RAG",
    bullets: [
      "Chat/copilot apps & agents",
      "RAG pipelines & eval reports",
      "Guardrails & moderation",
      "Channel & CRM integrations",
    ],
  },
  {
    title: "Analytics & Reporting",
    bullets: [
      "Dashboards & semantic layer",
      "KPI catalog & data dictionary",
      "Report migration packs",
      "Usage & adoption guides",
    ],
  },
  {
    title: "Docs & Enablement",
    bullets: [
      "Runbooks & playbooks",
      "KT sessions & training",
      "Handover materials",
      "Support & maintenance plan",
    ],
  },
  {
    title: "QA & Compliance",
    bullets: [
      "DQ rules & lineage maps",
      "Access controls & audits",
      "Perf/cost reports",
      "Release notes & sign-off",
    ],
  },
];

/* ---------- Process ---------- */
export const process = [
  { step: "01", title: "Discover", desc: "Goals, data landscape, risks & success metrics." },
  { step: "02", title: "Design", desc: "Target architecture, governance & roadmap." },
  { step: "03", title: "Build", desc: "Pipelines, models, RAG/agents & infra as code." },
  { step: "04", title: "Validate", desc: "Tests, AI evals, security & performance." },
  { step: "05", title: "Deploy", desc: "CI/CD, phased cutover & observability." },
  { step: "06", title: "Operate", desc: "SLA/SLOs, monitoring & cost control." },
  { step: "07", title: "Improve", desc: "Optimise, iterate & scale new use cases." },
];

/* ---------- Tech & tools (expanded) ---------- */
export const tech = [
  {
    title: "Cloud Platforms",
    tags: [
      "Azure (Synapse, Databricks, AML, ADLS)",
      "AWS (S3, Glue, EMR, SageMaker)",
      "GCP (BigQuery, Dataflow, Vertex AI)",
      "+ many more",
    ],
  },
  {
    title: "Warehouses & Lakes",
    tags: ["Snowflake", "Redshift", "BigQuery", "Delta Lake", "Iceberg/Hudi", "+ many more"],
  },
  {
    title: "Ingest & Orchestration",
    tags: ["Airflow", "Dagster", "Fivetran", "Kafka/Kinesis/PubSub", "Stitch", "+ many more"],
  },
  {
    title: "Modeling & Quality",
    tags: ["dbt", "Great Expectations", "Soda", "Datafold", "+ many more"],
  },
  {
    title: "BI & Analytics",
    tags: ["Power BI", "Tableau", "Looker", "Looker Studio", "Metabase", "+ many more"],
  },
  {
    title: "LLM & Frameworks",
    tags: ["OpenAI / Azure OpenAI", "Hugging Face", "LangChain", "LlamaIndex", "Assistants/Tools", "+ many more"],
  },
  {
    title: "Vector & Search",
    tags: ["Pinecone", "Weaviate", "Qdrant", "Milvus", "Elastic/OpenSearch", "pgvector/FAISS", "+ many more"],
  },
  {
    title: "NLP & Vision",
    tags: ["Transformers", "spaCy", "OpenCV", "Tesseract", "Azure/Google/AWS Vision", "+ many more"],
  },
  {
    title: "Speech & Realtime",
    tags: ["Whisper", "Azure Speech", "Amazon Transcribe/Polly", "Google Speech", "WebRTC/WS", "+ many more"],
  },
  {
    title: "MLOps & Observability",
    tags: ["MLflow", "W&B", "KServe/Seldon", "BentoML", "Evidently/Arize", "+ many more"],
  },
  {
    title: "Security & Governance",
    tags: ["IAM/ABAC", "Private Link/VPC", "KMS/Key Vault", "Collibra/Alation", "+ many more"],
  },
  {
    title: "DevOps & CI/CD",
    tags: ["Azure DevOps", "GitHub Actions", "GitLab CI", "Terraform/Bicep", "Docker/Kubernetes", "+ many more"],
  },
];