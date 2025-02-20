import { c as createAstro, a as createComponent, r as renderHead, b as renderTemplate } from '../chunks/astro/server_u1eknVN-.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://mzb.dev");
const $$500 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$500;
  const { error } = Astro2.props;
  return renderTemplate`<html> <head><title>Server Error</title>${renderHead()}</head> <body> <h1>Server Error</h1> <p>Something went wrong on our server.</p> ${false} </body></html>`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/500.astro", void 0);
const $$file = "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/500.astro";
const $$url = "/500";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$500,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
