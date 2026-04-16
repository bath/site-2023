export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "Python", "Go", "C#"],
  },
  {
    label: "Back End",
    items: [
      "Dropwizard",
      "REST APIs",
      "Kafka",
      "MongoDB",
      "PostgreSQL",
      "Microservices",
      ".NET",
      "Node.js",
    ],
  },
  {
    label: "Front End",
    items: ["React", "Astro", "HTML/CSS"],
  },
  {
    label: "Infrastructure",
    items: [
      "Kubernetes",
      "AWS",
      "ArgoCD",
      "Docker",
      "Jenkins",
      "GitHub Actions",
      "External Secrets Operator",
    ],
  },
  {
    label: "Observability",
    items: ["OpenTelemetry", "Honeycomb", "PagerDuty", "Snyk"],
  },
  {
    label: "AI tooling",
    items: ["Claude Code", "Cursor", "LangChain", "ElasticSearch", "RAG"],
  },
];

export const topSkills = ["Distributed Systems", "Java Development", "Software Design"];
