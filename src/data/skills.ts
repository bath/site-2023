export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Go", "JavaScript", "TypeScript", "Java"],
  },
  {
    label: "AI / LLM",
    items: [
      "AI agent orchestration",
      "LangChain",
      "RAG",
      "FastAPI",
      "Pydantic",
    ],
  },
  {
    label: "Backend",
    items: [
      "REST & GraphQL APIs",
      "Kafka",
      "MongoDB",
      "DocumentDB",
      "PostgreSQL",
      "Microservices",
    ],
  },
  {
    label: "Frontend",
    items: ["React", "Astro", "webpack"],
  },
  {
    label: "Infra & Delivery",
    items: ["Kubernetes", "AWS", "ArgoCD", "GitHub Actions", "Gradle", "Snyk"],
  },
  {
    label: "Observability",
    items: ["OpenTelemetry", "Honeycomb"],
  },
];

export const topSkills = [
  "Backend & API design",
  "Distributed systems & reliability",
  "Applied-AI tooling",
];
