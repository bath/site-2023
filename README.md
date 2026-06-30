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
