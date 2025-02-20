import 'kleur/colors';
import { e as decodeKey } from './chunks/astro/server_u1eknVN-.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_CGyNwpcb.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BawOC43N.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/bath/Dropbox%20(PayIt)/Mac/Documents/site-2023/","cacheDir":"file:///Users/bath/Dropbox%20(PayIt)/Mac/Documents/site-2023/node_modules/.astro/","outDir":"file:///Users/bath/Dropbox%20(PayIt)/Mac/Documents/site-2023/dist/","srcDir":"file:///Users/bath/Dropbox%20(PayIt)/Mac/Documents/site-2023/src/","publicDir":"file:///Users/bath/Dropbox%20(PayIt)/Mac/Documents/site-2023/public/","buildClientDir":"file:///Users/bath/Dropbox%20(PayIt)/Mac/Documents/site-2023/dist/client/","buildServerDir":"file:///Users/bath/Dropbox%20(PayIt)/Mac/Documents/site-2023/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/500","isIndex":false,"type":"page","pattern":"^\\/500\\/?$","segments":[[{"content":"500","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/500.astro","pathname":"/500","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.DMRf3PmO.css"}],"routeData":{"route":"/photographs","isIndex":false,"type":"page","pattern":"^\\/photographs\\/?$","segments":[[{"content":"photographs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/photographs.astro","pathname":"/photographs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.DMRf3PmO.css"}],"routeData":{"route":"/work","isIndex":false,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.DMRf3PmO.css"}],"routeData":{"route":"/writings","isIndex":false,"type":"page","pattern":"^\\/writings\\/?$","segments":[[{"content":"writings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/writings.astro","pathname":"/writings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"inline","content":".aboutme[data-astro-cid-j7pv25f6]{font-size:1.2em}img[data-astro-cid-j7pv25f6]{flex:50%}"},{"type":"external","src":"/_astro/index.DMRf3PmO.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://mzb.dev","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/500.astro",{"propagation":"none","containsHead":true}],["/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/photographs.astro",{"propagation":"none","containsHead":true}],["/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/work.astro",{"propagation":"none","containsHead":true}],["/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/pages/writings.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:src/pages/500@_@astro":"pages/500.astro.mjs","\u0000@astro-page:src/pages/photographs@_@astro":"pages/photographs.astro.mjs","\u0000@astro-page:src/pages/work@_@astro":"pages/work.astro.mjs","\u0000@astro-page:src/pages/writings@_@astro":"pages/writings.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DL3u50L2.mjs","\u0000@astrojs-manifest":"manifest_DNP8AOr9.mjs","/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/components/GradientBackground.astro?astro&type=script&index=0&lang.ts":"_astro/GradientBackground.astro_astro_type_script_index_0_lang.CV2HulJe.js","/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.3kI4rLKd.js","/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.OMazZCgV.js","/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CedQ3dOP.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/components/GradientBackground.astro?astro&type=script&index=0&lang.ts","function getSeasonalColors() {\n  const now = new Date();\n  const dayOfYear = Math.floor(\n    (now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,\n  );\n\n  const seasons = [\n    // Winter (cool blues with silver highlights - more subtle)\n    { start: [242, 245, 250], end: [235, 240, 248] },\n    // Spring (fresh greens with warm pink undertones - softened)\n    { start: [240, 248, 240], end: [248, 242, 240] },\n    // Summer (vibrant greens with golden sunshine - muted)\n    { start: [238, 245, 238], end: [245, 242, 235] },\n    // Fall (rich autumn colors - softened)\n    { start: [245, 240, 235], end: [242, 238, 235] },\n  ];\n\n  const seasonIndex = Math.floor((dayOfYear / 365) * 4);\n  const seasonProgress = (dayOfYear % (365 / 4)) / (365 / 4);\n\n  const currentSeason = seasons[seasonIndex];\n  const nextSeason = seasons[(seasonIndex + 1) % 4];\n\n  const startColor = currentSeason.start.map((channel, i) =>\n    Math.round(\n      channel * (1 - seasonProgress) + nextSeason.start[i] * seasonProgress,\n    ),\n  );\n  const endColor = currentSeason.end.map((channel, i) =>\n    Math.round(\n      channel * (1 - seasonProgress) + nextSeason.end[i] * seasonProgress,\n    ),\n  );\n\n  return {\n    startColor: `rgb(${startColor.join(\", \")})`,\n    endColor: `rgb(${endColor.join(\", \")})`,\n  };\n}\n\nconst gradientEl = document.getElementById(\"gradient-background\");\nconst { startColor, endColor } = getSeasonalColors();\nif (gradientEl) {\n  gradientEl.style.background = `linear-gradient(135deg, ${startColor}, ${endColor})`;\n}"],["/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var name = \"@vercel/speed-insights\";\nvar version = \"1.2.0\";\nvar initQueue = () => {\n  if (window.si) return;\n  window.si = function a(...params) {\n    (window.siq = window.siq || []).push(params);\n  };\n};\nfunction isBrowser() {\n  return typeof window !== \"undefined\";\n}\nfunction detectEnvironment() {\n  try {\n    const env = \"production\";\n    if (env === \"development\" || env === \"test\") ;\n  } catch (e) {\n  }\n  return \"production\";\n}\nfunction isDevelopment() {\n  return detectEnvironment() === \"development\";\n}\nfunction computeRoute(pathname, pathParams) {\n  if (!pathname || !pathParams) {\n    return pathname;\n  }\n  let result = pathname;\n  try {\n    const entries = Object.entries(pathParams);\n    for (const [key, value] of entries) {\n      if (!Array.isArray(value)) {\n        const matcher = turnValueToRegExp(value);\n        if (matcher.test(result)) {\n          result = result.replace(matcher, `/[${key}]`);\n        }\n      }\n    }\n    for (const [key, value] of entries) {\n      if (Array.isArray(value)) {\n        const matcher = turnValueToRegExp(value.join(\"/\"));\n        if (matcher.test(result)) {\n          result = result.replace(matcher, `/[...${key}]`);\n        }\n      }\n    }\n    return result;\n  } catch (e) {\n    return pathname;\n  }\n}\nfunction turnValueToRegExp(value) {\n  return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);\n}\nfunction escapeRegExp(string) {\n  return string.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");\n}\nfunction getScriptSrc(props) {\n  if (props.scriptSrc) {\n    return props.scriptSrc;\n  }\n  if (isDevelopment()) {\n    return \"https://va.vercel-scripts.com/v1/speed-insights/script.debug.js\";\n  }\n  if (props.dsn) {\n    return \"https://va.vercel-scripts.com/v1/speed-insights/script.js\";\n  }\n  if (props.basePath) {\n    return `${props.basePath}/speed-insights/script.js`;\n  }\n  return \"/_vercel/speed-insights/script.js\";\n}\nfunction injectSpeedInsights(props = {}) {\n  var _a;\n  if (!isBrowser() || props.route === null) return null;\n  initQueue();\n  const src = getScriptSrc(props);\n  if (document.head.querySelector(`script[src*=\"${src}\"]`)) return null;\n  if (props.beforeSend) {\n    (_a = window.si) == null ? void 0 : _a.call(window, \"beforeSend\", props.beforeSend);\n  }\n  const script = document.createElement(\"script\");\n  script.src = src;\n  script.defer = true;\n  script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : \"\");\n  script.dataset.sdkv = version;\n  if (props.sampleRate) {\n    script.dataset.sampleRate = props.sampleRate.toString();\n  }\n  if (props.route) {\n    script.dataset.route = props.route;\n  }\n  if (props.endpoint) {\n    script.dataset.endpoint = props.endpoint;\n  } else if (props.basePath) {\n    script.dataset.endpoint = `${props.basePath}/speed-insights/vitals`;\n  }\n  if (props.dsn) {\n    script.dataset.dsn = props.dsn;\n  }\n  if (isDevelopment() && props.debug === false) {\n    script.dataset.debug = \"false\";\n  }\n  script.onerror = () => {\n    console.log(\n      `[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`\n    );\n  };\n  document.head.appendChild(script);\n  return {\n    setRoute: (route) => {\n      script.dataset.route = route ?? void 0;\n    }\n  };\n}\n\nfunction getBasePath() {\n  try {\n    return undefined                                                    ;\n  } catch {\n  }\n}\ncustomElements.define(\n  \"vercel-speed-insights\",\n  class VercelSpeedInsights extends HTMLElement {\n    constructor() {\n      super();\n      try {\n        const props = JSON.parse(this.dataset.props ?? \"{}\");\n        const params = JSON.parse(this.dataset.params ?? \"{}\");\n        const route = computeRoute(this.dataset.pathname ?? \"\", params);\n        injectSpeedInsights({\n          route,\n          ...props,\n          framework: \"astro\",\n          basePath: getBasePath(),\n          beforeSend: window.speedInsightsBeforeSend\n        });\n      } catch (err) {\n        throw new Error(`Failed to parse SpeedInsights properties: ${err}`);\n      }\n    }\n  }\n);"]],"assets":["/_astro/index.DMRf3PmO.css","/Miller_Bath_Resume_Aug2023.pdf","/dogcow.png","/favicon-old.svg","/favicon.ico","/favicon.png","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.3kI4rLKd.js","/_astro/index.astro_astro_type_script_index_0_lang.OMazZCgV.js","/images/kaitlinAndChase.jpeg"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"4DJW8Zg9GdGJyog/laWBp7CENCqB8NZLLosAg0qpWGo="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
