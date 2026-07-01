// Official marketing pages for companies/orgs mentioned across the site.
// Verified to resolve (2026-06). qTrade.io is intentionally absent — the
// domain is defunct (DNS no longer resolves), so it stays plain text rather
// than linking a dead/parked page. Cerner now redirects to Oracle Health.
export const companyLinks: Record<string, string> = {
  PayIt: "https://payitgov.com",
  VIZIO: "https://www.vizio.com",
  Cerner: "https://www.cerner.com",
  "University of Kansas": "https://ku.edu",
  Code2College: "https://code2college.org",
  Astro: "https://astro.build",
};

export interface TextSegment {
  text: string;
  href?: string;
}

// Split free text into segments, marking any known company name so it can be
// rendered as a link. Longest names first so multi-word names win over parts.
export function linkifyCompanies(text: string): TextSegment[] {
  const names = Object.keys(companyLinks).sort((a, b) => b.length - a.length);
  if (names.length === 0) return [{ text }];

  const escaped = names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`\\b(${escaped.join("|")})\\b`, "g");

  const segments: TextSegment[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ text: text.slice(last, match.index) });
    }
    segments.push({ text: match[0], href: companyLinks[match[0]] });
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last) });
  return segments;
}
