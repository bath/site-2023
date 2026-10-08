# mzb.dev

My personal site — [mzb.dev](https://mzb.dev). Built with [Astro](https://astro.build).

A small, fast, dependency-light site with a few intentional touches:

- **Seasonal gradient** that shifts through the year (winter blues → spring → summer golds → fall ambers), computed from the day of year.
- **Live sun** that tracks the visitor's local time of day and casts a moving shadow on my name.
- **Light / dark / auto** theming — resolved before first paint (no flash), persisted, and `auto` follows the OS. Append `?theme=dark` to any URL to share a themed link.
- A couple of easter eggs for the curious. ↑↑↓↓←→←→BA.

## Develop

```sh
npm install
npm run dev      # local dev server
npm test         # theme behavior regression checks
npm run build    # static build → ./dist
npm run preview  # preview the build
```

Node ≥ 22.12 (see `.nvmrc`).

## Structure

```
src/
  components/   nav, gradient, theme toggle/script, live clock, easter eggs
  data/         profile, experience, skills  (content lives here)
  layouts/      MainLayout — shared <head>, theming, OG meta
  pages/        index (about), work, skills, simulate (year-in-60s)
  styles/       global.css — theme tokens + responsive layout
public/          favicon, résumé PDF, OG image
```

Content is data-driven: edit `src/data/*.ts` to update copy, work history, and skills.

Deployed on Vercel. The résumé is served as a static file from `public/Miller_Bath_Resume.pdf`.

## Résumé PDF

`public/Miller_Bath_Resume.pdf` is a build artifact, not a source — don't edit it by hand.

- **Source of truth:** [`bath/sf-startup-transition`](https://github.com/bath/sf-startup-transition) → `resume/` — templated markdown (`@VAR=real||redacted` header block, `{VAR}` placeholders in the body). `base_resume.md` is the trunk; dated snapshots live in `versions/` (the snapshot matching this PDF is `versions/2026-08-17-v9-kc-only.md`).
- **Renderer:** [`bath/recompile`](https://github.com/bath/recompile) — `recompile render <dir>/` turns `resume.md` into `resume.html` (via `render_html` + the packaged `templates/preview.css`) and prints it to PDF with headless Chrome. No `uv`? Call `recompile.render_html` / `recompile.pdf_render` directly with python3, `src/` on the path.
- **To update:** edit the markdown source, re-render, copy the new `resume.pdf` over `public/Miller_Bath_Resume.pdf`, push to `main` — Vercel deploys it.

## Current content and agent access

`src/data/profile.ts` supplies the homepage and `/llms.txt`, including Kanapy work,
hiring, and product details. `/llms.txt` is a plain-text Markdown overview with
links to the rest of the site. The shared HTML head and homepage link to it.
`AGENTS.md` contains instructions for agents editing this repository.

PayIt work appears in closed archive disclosures on Work and Projects. The
résumé link is marked as an archive because the PDF predates the Kanapy update.
The UI review and its verification limits are recorded in `docs/ui-review-*.md`.
