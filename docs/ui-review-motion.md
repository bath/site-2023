# Motion and navigation review

Reviewed the Astro sidebar and Projects page with the Emil Kowalski design engineering skill. The site keeps its seasonal colors, fixed desktop rail, timeline, and text-first layout.

| Before                                                                                                                                         | After                                                                                                                                                    | Why                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| The sidebar link itself moved 2 px on hover. Its accent tick animated `width` from 0 to 8 px.                                                  | The link stays still. A fixed-width accent fades in over 150 ms.                                                                                         | The pointer target must stay in place. Opacity does not change layout. The small accent keeps the site's character.                 |
| Primary and external links had text-sized hit areas. On mobile, primary links had only 0.1 rem of vertical padding.                            | All sidebar links have a minimum 44 × 44 px target, including the short X label.                                                                         | The larger hit area is easier to tap. The text size stays the same.                                                                 |
| The desktop rail had a fixed viewport height with no scroll overflow.                                                                          | The rail uses the dynamic viewport height, with vertical scrolling. Its inner content can grow past the viewport.                                        | Links remain reachable on a short desktop window and at increased text size. The mobile header still uses document flow.            |
| Link colors, accents, and arrow feedback were defined only for hover. Arrow glyphs moved diagonally. Hover styles could persist after a touch. | Keyboard focus receives immediate color and accent feedback. Arrow feedback uses opacity. Hover styles apply only to a fine pointer that supports hover. | Keyboard and touch input get clear states. Repeated link use does not move the interface. The global focus outline remains visible. |
| Pages played a 450 ms slide and fade on every navigation.                                                                                      | The content appears immediately.                                                                                                                         | Reading and link navigation do not need decorative entry motion, including when a visitor uses the keyboard.                        |
| Project repository titles had no underline and a text-sized target.                                                                            | Repository titles have a quiet underline and a minimum 44 px height. Hover and focus use the link color.                                                 | A title that opens a repository must look actionable and be easy to select.                                                         |
| Reduced-motion rules removed sidebar transitions, but left arrow displacement in the hover state. Project arrows had no reduced-motion rule.   | These components no longer move on interaction. Reduced motion removes their remaining color and opacity transitions.                                    | Reduced motion must remove displacement itself, not only its interpolation.                                                         |

## Evidence and validation

- Source evidence: `src/components/SidebarNav.astro` contained `translateX(2px)`, `transition: width 0.2s ease`, `height: 100vh`, and text-sized mobile link padding. `src/pages/projects.astro` contained the 450 ms entry animation and `translate(1px, -1px)` arrow hover rule.
- Ran `npx prettier --write src/components/SidebarNav.astro src/pages/projects.astro`.
- Ran `npm run build`: passed; Astro generated all four static routes.
- Checked the CSS rules for hover gating, immediate keyboard focus, target dimensions, desktop overflow, mobile normal flow, and reduced motion.

## Browser verification

- At 390 × 844, the page has no horizontal overflow. Every sidebar link and the theme button measures at least 44 × 44 px.
- At 1024 × 500, the desktop sidebar has a 500 px viewport, 712 px of content, and `overflow-y: auto`. Keyboard navigation reaches the bottom links.
- Work and Projects archive disclosures open. The Projects disclosure also opens with Enter.
- The homepage, Work, Projects, and Skills routes render. The theme choice and accessible control label persist across navigation.
- Removed page entry motion on the other reading pages as well.

## Limits

Hover fixes were checked in source and rendered styles. The browser tool does not expose pointer hover or reduced-motion emulation, so those states were not exercised with a real pointer or OS setting. No physical device or assistive technology test was run.
