export interface Role {
  company: string;
  title: string;
  dates: string;
  location?: string;
  context?: string;
  bullets: string[];
}

export const experience: Role[] = [
  {
    company: "PayIt",
    title: "Software Engineer II",
    dates: "Oct 2024 — Present",
    location: "Kansas City, MO",
    context:
      "Payments Adoption team; also contributing to internal AI product expansion and agent-first SDLC initiatives.",
    bullets: [
      "Built Payment Plans, a recurring payment scheduling system using REST APIs, Kafka, MongoDB, automated email notifications, and OpenTelemetry in Honeycomb — delivered 4 weeks ahead of schedule using Claude Code and Cursor.",
      "Eliminated dropped transactions during Kubernetes deployments by implementing graceful shutdown handling, enabling 24/7 deployments.",
      "Increased Java security and reduced dependency drift by implementing lockfiles across 15 services.",
      "Reduced Google API spend by $40K/year (~30%) by auditing usage and removing unnecessary contact and atmosphere data requests.",
      "Mentored a software intern through scoping, pairing, and delivery of 11 production features of an internal web app.",
      "Refactored driver license barcode scanning to support modern AAMVA formats, shipping critical go-live work for 4 clients.",
      "Built an internal Go CLI that scores backlog tickets for AI suitability via Atlassian's API, then dispatches selected tickets to headless AI agents that generate GitHub pull requests.",
      "Expanding an internal RAG product (LangChain, ElasticSearch, Google AI Studio) by exploring ingestion of client website documentation to broaden retrieval coverage.",
      "Partnering with selected engineering teams to evaluate an agent-first SDLC, identifying opportunities for AI-assisted planning, implementation, and validation with human review and operational guardrails.",
    ],
  },
  {
    company: "PayIt",
    title: "Software Engineer",
    dates: "Jan 2022 — Oct 2024",
    location: "Kansas City, MO",
    context:
      "Maintenance team supporting feature delivery, incident response, and platform modernization across 15+ government clients; 9-month rotation to .NET support team.",
    bullets: [
      "Built bulk transaction resolution tooling in an internal back-office app, now the org-wide entry point for incident and reporting workflows — resolved 15K+ transactions.",
      "Delivered end-to-end KDOR Vision Form support for Kansas DMV renewals across 6 repositories, enabling digital vision form upload for DL and CDL renewal workflows.",
      "Automated installment send and generation, reducing operational work from days to half a day.",
      "Extended account-deletion workflows through Kafka to retire downstream eBilling enrollments, preventing orphaned billing state after customer deactivation.",
      "Led migration to AWS Secrets Manager across 10+ services using the Kubernetes External Secrets Operator.",
      "Developed financial remittance reports for 6+ government clients using Python and Java.",
    ],
  },
  {
    company: "PayIt",
    title: "Associate Software Engineer",
    dates: "Jan 2021 — Jan 2022",
    location: "Kansas City, MO",
    context:
      "Early-career feature development and production support for government payment systems.",
    bullets: [
      "Served in on-call rotation for P1 incidents across DMV, tax, utilities, and courts — diagnosing transaction failures, payment issues, and data integrity problems.",
      "Shipped partial payment support for GR property tax, email accessibility fixes, and client-facing workflow updates for Kansas and KCK.",
    ],
  },
  {
    company: "qTrade.io",
    title: "Software Intern",
    dates: "Feb 2020 — Nov 2020",
    location: "Lawrence, KS",
    bullets: [
      "Developed CoinCapture, a skunkworks project to record and archive tick-by-tick cryptocurrency market data.",
      "Created new Go API endpoints for qTrade.io internal services with tests for malformed and null requests.",
      "Assisted in creation and completion of translation files for qTrade.io.",
    ],
  },
  {
    company: "VIZIO",
    title: "Software Engineering Intern",
    dates: "Jun 2020 — Aug 2020",
    location: "Remote",
    bullets: [
      "Created a developer tool for Vizio's voice search service, adopted by 10+ developers and maintained for multiple years.",
      "Integrated multiple API endpoints to fetch and format data accurately based on user search queries.",
      "Streamlined debugging by designing a web page that simulates voice search queries.",
    ],
  },
  {
    company: "Cerner Corporation",
    title: "Software Engineer Intern",
    dates: "May 2019 — Aug 2019",
    location: "Kansas City, MO",
    bullets: [
      "Engineered a web component for importing .CSV files, used by hundreds of clients for patient record management.",
      "Established error-checking mechanisms for uploaded .CSV files via RESTful requests parsed using Ruby on Rails.",
      "Ensured code reliability with comprehensive unit tests using Jest and RSpec, leading to a successful deployment.",
    ],
  },
];

export const leadership = [
  "Facilitated quarterly Spotify-model squad health checks across 5 engineering teams; summarized themes for managers and directors, with analysis delivered to the VP of Engineering.",
  "Co-led PayIt's Code2College internship program — interview planning, candidate evaluation, and ongoing volunteer mentorship for undergraduate students.",
];

export const education = [
  {
    school: "University of Kansas",
    degree: "B.S. Computer Science",
    dates: "2015 — 2020",
  },
];
