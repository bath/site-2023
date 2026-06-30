export interface Role {
  company: string;
  title: string;
  dates: string;
  location?: string;
  context?: string;
  bullets: string[];
}

export interface EarlierRole {
  company: string;
  title: string;
  dates: string;
  note: string;
}

export const experience: Role[] = [
  {
    company: "PayIt",
    title: "Software Engineer II",
    dates: "Oct 2024 — Present",
    context: "Payments platform, reliability, and applied-AI tooling.",
    bullets: [
      "Led Payment Plans from zero to production as primary engineer — a recurring-payments platform across four backend services (Java, Kafka, MongoDB) with idempotent consumers and full refund / cancellation policy logic. Shipped 4 weeks early; $15M+ processed to date, ~$400K projected ARR.",
      "Diagnosed and killed a production out-of-memory failure during a 6× traffic spike (~350 → 2,195 req/min) by batching GraphQL DataLoaders — cutting MongoDB round-trips from 2N to 2 per request.",
      "Eliminated dropped in-flight card transactions during Kubernetes scale-down by routing the HTTP-client lifecycle through SIGTERM and adding a SIGTERM-aware healthcheck — pods now finish in-flight /sales calls ~2m15s past shutdown (vs ~50s).",
      "Built an internal LLM prompt-management system (FastAPI, DocumentDB, LangChain) — immutable versioning, weighted A/B routing, and a single-active-version invariant for safe canary rollout of prompt changes in production.",
      "Helped build an internal AI agent orchestrator and used it to migrate 100+ Java microservices to Java 25 in four weeks; earlier joined skunkworks team Daedalus, a Go CLI giving coding agents a constrained, machine-readable interface to an internal knowledge base.",
      "Filled gaps across the stack — WCAG 2.2 fixes in the React checkout SDK, a webpack 4→5 upgrade clearing 17 critical/high CVEs, and a Gradle-lockfile + Snyk rollout across 19 services.",
    ],
  },
  {
    company: "PayIt",
    title: "Software Engineer",
    dates: "Jan 2021 — Oct 2024",
    context:
      "Promoted from Associate. Feature delivery, incident response, and platform modernization.",
    bullets: [
      "Built org-wide bulk transaction-resolution tooling (React UI + payment-service batch endpoints) — now the entry point for incident and reconciliation workflows; resolved 15K+ transactions and authored the engineering runbook.",
      "Shipped end-to-end digital DMV vision-form support across 6 repositories, moving an offline state-renewal requirement fully online, with reconciliation reporting for 10+ government tenants.",
      "Migrated 14 services to AWS Secrets Manager via the Kubernetes External Secrets Operator, and ran production on-call across payments, DMV, tax, and POS systems — 600+ incidents.",
    ],
  },
];

export const earlier: EarlierRole[] = [
  {
    company: "qTrade.io",
    title: "Software Intern",
    dates: "2020",
    note: "Built Go API endpoints and a tick-by-tick crypto market-data archiver.",
  },
  {
    company: "VIZIO",
    title: "Software Engineering Intern",
    dates: "2020",
    note: "Built a voice-search developer tool adopted by 10+ engineers.",
  },
  {
    company: "Cerner",
    title: "Software Engineering Intern",
    dates: "2019",
    note: "Built a CSV-import web component used by hundreds of clients.",
  },
];

export const leadership = [
  "Co-led PayIt's Code2College internship — interviewing, candidate evaluation, and mentorship for early-career engineers.",
];

export const education = [
  {
    school: "University of Kansas",
    degree: "B.S. Computer Science",
    dates: "2020",
  },
];
