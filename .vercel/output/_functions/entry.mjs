import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CSqZL2Tn.mjs';
import { manifest } from './manifest_BaFs6aUW.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/photographs.astro.mjs');
const _page2 = () => import('./pages/work.astro.mjs');
const _page3 = () => import('./pages/writings.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/photographs.astro", _page1],
    ["src/pages/work.astro", _page2],
    ["src/pages/writings.astro", _page3],
    ["src/pages/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "2eb794a7-a7c4-4b10-98d5-09f42894aa10",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
