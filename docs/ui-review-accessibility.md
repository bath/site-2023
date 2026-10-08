# Theme, focus, and motion review

This review used the Emil Kowalski design engineering skill and the shadcn skill. The site keeps its Astro components and seasonal colors. The changes use native buttons and shared color tokens.

| Before                                                                                                                | After                                                                                                                  | Why                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| The theme button had the same name in every state.                                                                    | Its name and title report the current choice, resolved auto theme, and next action.                                    | A visitor using a screen reader can identify the choice and action. A three-choice cycle does not use a binary pressed state. |
| The theme button read storage after each click. A failed storage write left it stuck on auto.                         | The current page keeps the choice in memory and writes storage when permitted.                                         | Theme selection works when storage is blocked.                                                                                |
| Other tabs could change the saved choice without updating this page.                                                  | Storage events update the theme and its name.                                                                          | The visible control stays consistent with the saved choice.                                                                   |
| The incoming page received the theme attribute, but seasonal colors were set after page load.                         | The incoming document receives seasonal colors before the swap.                                                        | Navigation retains the day-specific palette.                                                                                  |
| Small footer text used a faint token with a minimum sampled contrast of 2.34:1 in light mode and 3.15:1 in dark mode. | The faint token has minimum sampled contrast of 5.03:1 and 6.00:1. The subtle token remains stronger.                  | Small text needs at least 4.5:1 contrast.                                                                                     |
| The light focus outline used orange with minimum sampled contrast of 1.61:1.                                          | A focus token uses the link palette, with minimum sampled contrast of 5.25:1 in light mode and 7.07:1 in dark mode.    | Keyboard focus must remain visible against seasonal backgrounds.                                                              |
| Body links showed an underline only on hover, drawn by animating width.                                               | Body links keep an underline.                                                                                          | Touch and keyboard visitors can identify links before interaction. It also removes an unnecessary layout animation.           |
| Hover moved the theme control. There was no press feedback.                                                           | Hover changes color on devices with a fine pointer. Press applies a small scale change. The target is 44 by 44 pixels. | The target stays in place on hover and gives direct press feedback.                                                           |
| Reduced motion stopped the page entrance and ambient gradient only.                                                   | It also stops transitions, smooth scroll, and the theme press scale.                                                   | Motion preferences apply to repeated interactions.                                                                            |
| The shared layout had no skip control.                                                                                | A link appears on keyboard focus and moves focus to the main content.                                                  | Keyboard visitors can bypass repeated navigation.                                                                             |

## Evidence

`node --test tests/theme.test.mjs` passes four checks. The checks cover the three-choice cycle, current and next accessible names, enabled and blocked storage, OS preference changes in auto mode, an incoming page, repeated script execution, and storage changes from another tab. The test uses the actual inline script with small browser doubles.

A Node calculation sampled both seasonal color stops for each of the 365 day inputs in light and dark mode. It used sRGB alpha compositing and the WCAG relative luminance formula. The numbers above are the lowest sampled values, rounded to two decimal places for this log.

The Astro navigation change follows the documented `astro:before-swap` and `astro:page-load` lifecycle. See [Astro view transitions](https://docs.astro.build/en/guides/view-transitions/). Contrast targets follow [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## Browser verification

The theme control cycles through auto, light, and dark with matching accessible names.
Dark mode persists through navigation to Work and back to About. Enter on the
skip link moves focus to `main-content`. The built `/llms.txt` returns HTTP 200
with `Content-Type: text/plain`.

## Limits

The color calculation checks seasonal stops. It does not measure every rendered pixel, translucent surface, or image. The script tests do not emulate a screen reader or Astro's full router. The parent review checks the site in a browser. This review does not claim a full WCAG audit.
