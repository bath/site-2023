import { profile } from "../data/profile";

export function GET() {
  return new Response(
    `# ${profile.name}

> ${profile.tagline}. Based in ${profile.location}.

Miller is the first engineering hire at Kanapy. ${profile.hiring}
Contact Miller about a role by email: ${profile.email}.

## Current focus

${profile.thinking.join("\n\n")}

## Pages

- [About](https://www.mzb.dev/): Current work, thinking, and hiring at Kanapy.
- [Work](https://www.mzb.dev/work): Kanapy first, followed by archived PayIt work and earlier experience.
- [Projects](https://www.mzb.dev/projects): Personal projects and archived PayIt tooling.
- [Skills](https://www.mzb.dev/skills): Engineering background.
- [Kanapy](${profile.companyUrl}): Company website.

## Contact

- [Email](mailto:${profile.email}): Contact Miller, including hiring inquiries.
- [LinkedIn](${profile.linkedin}): Professional profile.
- [GitHub](${profile.github}): Public repositories.
- [X](${profile.x}): Posts.

## Historical material

PayIt is a previous employer, not Miller's current work. The linked resume PDF is an archived snapshot from August 2026 and predates this update. Past project metrics describe that earlier work.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
