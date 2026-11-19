export const profile = {
  name: "Miller Bath",
  title: "Engineer at Kanapy",
  location: "Kansas City, MO",
  email: "millerzbath@gmail.com",
  x: "https://x.com/millerbath",
  linkedin: "https://www.linkedin.com/in/millerbath",
  github: "https://github.com/bath",
  kanapy: "https://kanapy.com",
  hark: "https://hark.works",
  sourceUrl: "https://github.com/bath/site-2023",
  hook: "I build the reconstruction industry's number one agentic platform.",
};

export interface Tool {
  name: string;
  href: string;
  note: string;
}

// Small open-source tools from the agent work. One line each.
export const tools: Tool[] = [
  {
    name: "shepherd",
    href: "https://github.com/bath/shepherd",
    note: "File drop and titled tabs for Herdr, the terminal I run agents in.",
  },
  {
    name: "mm-mermaid",
    href: "https://github.com/bath/mm-mermaid",
    note: "Copy a Mermaid diagram, type mm, get a PNG and an SVG.",
  },
  {
    name: "claude-code-statusline",
    href: "https://github.com/bath/claude-code-statusline",
    note: "Sixteen status lines for Claude Code, in POSIX shell.",
  },
  {
    name: "skills",
    href: "https://github.com/bath/skills",
    note: "Agent skills. The first proves that each path of a process ends in a known state.",
  },
];
