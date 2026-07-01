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
  tagline: "Backend engineer · payments & AI tooling",

  // The two surface areas everything ladders up to.
  pillars: [
    {
      key: "backend",
      label: "Backend engineering",
      blurb:
        "Revenue-critical services in Java, Kafka, and MongoDB — the systems that move money and have to be right.",
    },
    {
      key: "ai-tooling",
      label: "AI tooling",
      blurb:
        "The platform around AI-assisted engineering — prompt management, CLIs, and orchestration that let coding agents work against real systems.",
    },
  ],

  // The 30-second hook. Two pillars, no reliability headline.
  hook: "I build the backend systems that move money — and the AI tooling that lets engineers move faster.",

  summary: [
    "At PayIt I took Payment Plans from zero to production as the primary engineer — a recurring-payments platform spanning four backend services in Java, Kafka, and MongoDB. It shipped four weeks early and has processed $15M+ to date.",
    "Lately I build the tooling around AI-assisted engineering: an internal prompt-management service with versioning and safe canary rollout, plus CLIs and orchestration that give coding agents a constrained, machine-readable interface to real systems. I used it to move a 100-service fleet onto a new Java runtime in about a month.",
    "I'm at my best in the messy middle of production — batching GraphQL DataLoaders to cut a service's MongoDB round-trips from 2N to 2, or routing POS card payments through graceful shutdown so a deploy never drops an in-flight transaction.",
  ],

  // Scannable proof chips for the 30-second founder skim.
  highlights: [
    "$15M+ processed",
    "0 → 1 Payment Plans, 4 wks early",
    "100+ services → Java 25 in 4 wks",
    "Prompt platform w/ safe canary rollout",
  ],

  lookingFor:
    "Open to backend, product, or AI-product roles at SF seed–Series A startups. Relocating to San Francisco in 2026.",
};
