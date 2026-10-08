# Working on mzb.dev

This is Miller Bath's personal Astro site, deployed on Vercel from `main`.

## Content

- `src/data/profile.ts` holds current work, hiring, contact details, and thinking. The homepage and `/llms.txt` use it.
- Miller works at Kanapy and is hiring product managers, designers, and engineers. Do not invent a job title, start date, salary, location policy, or job listing.
- PayIt is previous work. Keep its history in the archive, below Kanapy.
- The resume PDF is an August 2026 archive. Read README.md before changing it; its source lives in another repository.
- `/llms.txt` is the public agent-readable overview. This file is for agents editing the repository.

## Development

Use Node >=22.12, `npm ci`, `npm run dev`, and `npm run build`.
Run `npx prettier --check` on changed source files. There is no test suite configured.
Use a branch and a dedicated worktree under `.worktrees/`. Keep commits signed and open a PR.

## Interface

Keep the existing Astro architecture, seasonal background, and light/dark/auto themes.
Keep link hit areas stationary on hover. Use color or opacity for feedback.
Provide visible keyboard focus, comfortable touch targets, and reduced-motion behavior.
Check desktop, narrow mobile, and short desktop windows. Keep navigation reachable.
Theme handlers must survive Astro client navigation without duplicate listeners.

## Verification

Build before pushing. Check the homepage, Work, Projects, Skills, and `/llms.txt`.
Check theme switching, keyboard navigation, archive disclosures, and hover styles.
Record UI findings and verification limits in `docs/ui-review-*.md`.
