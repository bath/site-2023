export const profile = {
  name: "Miller Bath",
  title: "Backend Engineer",
  location: "San Francisco, CA",
  // Honest "where I am now → where I'm headed" — reinforces the relocation story.
  locationShort: "KC → SF",
  email: "millerzbath@gmail.com",
  linkedin: "https://www.linkedin.com/in/millerbath",
  github: "https://github.com/bath",
  resumeHref: "/Miller_Bath_Resume.pdf",
  sourceUrl: "https://github.com/bath/site-2023",
  tagline: "Backend engineer · payments & reliability",

  // The 30-second hook. Leads with the strongest, evidence-backed identity.
  hook: "I build revenue-critical backend systems — and keep them standing when traffic spikes.",

  summary: [
    "At PayIt I took Payment Plans from zero to production as the primary engineer — a recurring-payments platform spanning four backend services in Java, Kafka, and MongoDB. It shipped four weeks early and has processed $15M+ to date.",
    "I'm at my best in the messy middle of production. I cut a service's MongoDB round-trips from 2N to 2 to kill an out-of-memory failure under a 6× traffic spike, and rerouted POS card payments through graceful shutdown so a Kubernetes deploy never drops an in-flight transaction.",
    "Lately I build the tooling around AI-assisted engineering — a prompt-management service with safe canary rollout, plus CLIs and orchestration that let coding agents work against real systems. I used it to move a 100-service fleet onto a new Java runtime in about a month.",
  ],

  // Scannable proof chips for the 30-second founder skim.
  highlights: [
    "$15M+ processed",
    "0 → 1 Payment Plans, 4 wks early",
    "6× traffic spike, zero OOM",
    "100+ services → Java 25 in 4 wks",
  ],

  lookingFor:
    "Open to backend, product, or AI-product roles at SF seed–Series A startups. Relocating to San Francisco in 2026.",
};
