import { a as createComponent, d as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_u1eknVN-.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_ifNSKash.mjs';
export { renderers } from '../renderers.mjs';

const $$Work = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-content"> <h1>Under Construction 🚧</h1> <!-- <div class="workbox">
      <div class="job">
        <span>PayIt, Software Engineer</span><br />
        <span>Maintenance - Java, Javascript, Clojure</span>
      </div>
      <br />
      <div class="job">
        <span>PayIt, Associate Software Engineer</span><br />
        <span>Maintenance - Java, Javascript, Clojure</span>
      </div>
      <br />
      <div class="job">
        <span>qTrade, Software Intern</span><br />
        <span>Crypto data archive - Go</span>
      </div>
      <br />
      <div class="job">
        <span>Vizio, Software Intern</span><br />
        <span>Voice search - Python</span>
      </div>
      <br />
      <div class="job">
        <span>Cerner, Software Intern</span><br />
        <span>Population Health - Ruby, Javascript</span>
      </div>
    </div> --> </div> ` })}`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/work.astro", void 0);

const $$file = "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/work.astro";
const $$url = "/work";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Work,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
