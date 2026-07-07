export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  private?: boolean;
}

export const projects: Project[] = [
  {
    name: "voice-pr",
    tagline: "Speak PR review into committed changes.",
    description:
      "Chrome extension plus local Node bridge for PR authors: open GitHub's Files changed tab, record while scrolling the diff, and each spoken note is anchored to the visible file and line. Local Whisper transcription keeps code audio private, then the batch is handed to an agent/orchestrator that lands reviewable commits and leaves an intent trail on the PR.",
    tech: ["JavaScript", "Chrome extension", "Node", "Whisper", "Claude agents"],
    repoUrl: "https://github.com/bath-tub/voice-pr",
  },
  {
    name: "recompile",
    tagline: "Your career, compiled to fit.",
    description:
      "Keeps a durable, provenance-backed store of your work and just-in-time compiles a resume tailored to a specific job description — every line traces back to something you actually did. Work is source, a job description is the build target, the resume is the compiled artifact. Agent-driven: your Claude Code drives the whole intake → compile → styled-output loop.",
    tech: ["Python", "Claude Code", "LLM"],
    private: true,
  },
  {
    name: "t1000",
    tagline: "A better Jira ticket → GitHub PR tool.",
    description:
      "Local CLI that turns eligible Jira tickets into draft PRs using a headless coding agent. Scans the backlog, runs a selected ticket end-to-end, and streams the agent transcript — state and run artifacts tracked in SQLite.",
    tech: ["Python", "gh CLI", "Jira API"],
    repoUrl: "https://github.com/bath-tub/t1000",
  },
  {
    name: "slopify",
    tagline: "Jira tickets into GitHub PRs.",
    description:
      "Minimal Jira-to-agent loop with two modes: a Textual TUI for ticket selection with live agent output, and a quiet mode that logs everything and surfaces only the PR link. Scores tickets with a scan model and shows a ranked, eligibility-filtered list.",
    tech: ["Python", "Textual TUI", "Jira API"],
    private: true,
  },
  {
    name: "linkedin-job-collector",
    tagline: "Finds & collects jobs from LinkedIn posts.",
    description:
      "Scrolls a LinkedIn content search, captures posts from the page's server-driven-UI payloads, dedupes them into SQLite, and emits a Claude-filtered digest of genuine remote-SWE hiring posts — then emails you when new ones match.",
    tech: ["Python", "Playwright", "SQLite", "Claude"],
    repoUrl: "https://github.com/bath/linkedin-job-collector",
  },
];

// Internal tooling built at PayIt — private employer repos, shown for context.
export const workProjects: Project[] = [
  {
    name: "squire",
    tagline: "Auto-fixes CI failures on your PRs.",
    description:
      "Local daemon that watches GitHub PRs for CI failures and dispatches Claude agents to fix them automatically, opening follow-up commits without a human in the loop.",
    tech: ["Python", "Claude agents", "GitHub"],
    private: true,
  },
  {
    name: "superdeploy",
    tagline: "Batch Kubernetes image upgrades.",
    description:
      "TUI tool for rolling image-tag upgrades across many services and environments at once — pick the services, pick the target, and drive the whole batch from one terminal view.",
    tech: ["Go", "Kubernetes", "TUI"],
    private: true,
  },
];
