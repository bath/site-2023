import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CdY3OlNe.mjs';
import { manifest } from './manifest_DNP8AOr9.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/500.astro.mjs');
const _page2 = () => import('./pages/photographs.astro.mjs');
const _page3 = () => import('./pages/work.astro.mjs');
const _page4 = () => import('./pages/writings.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/500.astro", _page1],
    ["src/pages/photographs.astro", _page2],
    ["src/pages/work.astro", _page3],
    ["src/pages/writings.astro", _page4],
    ["src/pages/index.astro", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "95b60439-c7b1-4c3c-a33c-1d15b1fe8e7e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
