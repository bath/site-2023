import { a as createComponent, d as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_u1eknVN-.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_ifNSKash.mjs';
export { renderers } from '../renderers.mjs';

const $$Photographs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-content"> <h1>Under Construction 🚧</h1> </div> ` })}`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/photographs.astro", void 0);

const $$file = "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/photographs.astro";
const $$url = "/photographs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Photographs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
