export interface Stat {
  value: string;
  label: string;
  detail: string;
}

export interface Stage {
  step: string;
  title: string;
  summary: string;
  detail: string;
}

// The headline numbers, in the order they should be read.
export const stats: Stat[] = [
  {
    value: "100+",
    label: "services migrated",
    detail: "Java microservices moved to a new runtime in four weeks.",
  },
  {
    value: "7×",
    label: "throughput",
    detail:
      "178 pull requests in 2025 → 1,264 in the first seven months of 2026.",
  },
  {
    value: "374",
    label: "tickets delivered",
    detail: "Closed through the agent pipeline rather than by hand.",
  },
  {
    value: "63",
    label: "PRs into the orchestrator",
    detail:
      "Of 73 total in the repo — second-highest committer on the project.",
  },
];

// Scout → pitch → buy-in → build → deliver. The loop, not a single win.
export const stages: Stage[] = [
  {
    step: "01",
    title: "Scout",
    summary: "Run the new thing against real work before anyone asks you to.",
    detail:
      "I spent nights pointing coding agents at actual Jira tickets — two throwaway CLIs (t1000, slopify) that drove a ticket to a draft PR and streamed the transcript. The point was never the tools. It was getting a concrete answer to 'what do these break on our codebase' while everyone else was still watching vendor demos.",
  },
  {
    step: "02",
    title: "Pitch",
    summary: "Turn the finding into a proposal with a real target attached.",
    detail:
      "A 100+ service Java runtime upgrade was sitting in the backlog as a year of hand-editing. I wrote the RFC arguing we run it as an agent-driven migration instead — scoped, staged, with the failure modes I'd already hit written down as risks rather than discovered later.",
  },
  {
    step: "03",
    title: "Buy-in",
    summary: "Take it through review instead of around it.",
    detail:
      "Two stages of architecture-guild review, each one a week of open stakeholder comment, each round of feedback folded back into the document. Slower than shipping it quietly, and the reason it became the org's plan instead of my side project.",
  },
  {
    step: "04",
    title: "Build",
    summary: "Build the interfaces the agents were missing.",
    detail:
      "The orchestrator ran Docker-isolated agents across multiple repos and opened signed PRs off Jira tickets — I contributed 63 of its 73 pull requests. Around it I built a Go CLI giving agents a machine-readable interface to our internal knowledge base, and MCP servers wiring log search and tracing in, so an agent could read production instead of guessing at it.",
  },
  {
    step: "05",
    title: "Deliver",
    summary: "Ship it, and count what actually landed.",
    detail:
      "100+ services on the new runtime in four weeks. 374 tickets closed through the pipeline. My own PR volume went from 178 in a year to 1,264 in seven months — most of them agent-driven, which is the point: the work was designing a loop that holds up in review, not typing faster.",
  },
];

export const impactIntro =
  "The same loop four times over: find the thing the industry just figured out, prove it on real work, get the org behind it, then build and ship it. Here is the clearest run of it.";

export const impactCaveat =
  "Numbers are from internal Jira and GitHub, measured 2026-08-06.";
