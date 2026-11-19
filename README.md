# mzb.dev

My personal site — [mzb.dev](https://mzb.dev). Built with [Astro](https://astro.build).

One page: what I do now, what is next, Hark, a few small tools, and what came before.

- The background gradient changes with the season. It is computed from the day of the year.
- Light, dark and auto themes. The theme is set before first paint. `?theme=dark` shares a themed link.

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # static build → ./dist
```

Node ≥ 22.12 (see `.nvmrc`).

## Structure

```
src/
  data/profile.ts     links and the small-tools list
  pages/index.astro   the page and its copy
  layouts/            MainLayout: <head>, theme, share tags
  components/         gradient, theme script, theme toggle
  styles/global.css   theme tokens
public/               favicon, share image, résumé PDF
```

`/work`, `/projects` and `/skills` redirect to `/`. Vercel deploys `main`.

`public/og.png` is the share image. `og.html` is its source: open it at 1200 × 630 and take a screenshot.

## Résumé PDF

The page does not link the PDF: it is from August 2026 and shows PayIt as the current job. The file stays so old links work.

`public/Miller_Bath_Resume.pdf` is a build artifact, not a source — don't edit it by hand.

- **Source of truth:** [`bath/sf-startup-transition`](https://github.com/bath/sf-startup-transition) → `resume/` — templated markdown (`@VAR=real||redacted` header block, `{VAR}` placeholders in the body). `base_resume.md` is the trunk; dated snapshots live in `versions/` (the snapshot matching this PDF is `versions/2026-08-17-v9-kc-only.md`).
- **Renderer:** [`bath/recompile`](https://github.com/bath/recompile) — `recompile render <dir>/` turns `resume.md` into `resume.html` (via `render_html` + the packaged `templates/preview.css`) and prints it to PDF with headless Chrome. No `uv`? Call `recompile.render_html` / `recompile.pdf_render` directly with python3, `src/` on the path.
- **To update:** edit the markdown source, re-render, copy the new `resume.pdf` over `public/Miller_Bath_Resume.pdf`, push to `main` — Vercel deploys it.
