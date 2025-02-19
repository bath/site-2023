import { b as createAstro, c as createComponent, e as addAttribute, f as renderScript, a as renderTemplate, m as maybeRenderHead, r as renderComponent, g as renderHead, h as renderSlot } from './astro/server_CzyE8B3s.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$Astro$6 = createAstro("https://mzb.dev");
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/astro/components/ClientRouter.astro", void 0);

function getSeasonalColors() {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  );

  const seasons = [
    // Winter (cool blues with silver highlights - more subtle)
    { start: [242, 245, 250], end: [235, 240, 248] },
    // Spring (fresh greens with warm pink undertones - softened)
    { start: [240, 248, 240], end: [248, 242, 240] },
    // Summer (vibrant greens with golden sunshine - muted)
    { start: [238, 245, 238], end: [245, 242, 235] },
    // Fall (rich autumn colors - softened)
    { start: [245, 240, 235], end: [242, 238, 235] },
  ];

  const seasonIndex = Math.floor((dayOfYear / 365) * 4);
  const seasonProgress = (dayOfYear % (365 / 4)) / (365 / 4);

  const currentSeason = seasons[seasonIndex];
  const nextSeason = seasons[(seasonIndex + 1) % 4];

  const startColor = currentSeason.start.map((channel, i) =>
    Math.round(
      channel * (1 - seasonProgress) + nextSeason.start[i] * seasonProgress,
    ),
  );
  const endColor = currentSeason.end.map((channel, i) =>
    Math.round(
      channel * (1 - seasonProgress) + nextSeason.end[i] * seasonProgress,
    ),
  );

  return {
    startColor: `rgb(${startColor.join(", ")})`,
    endColor: `rgb(${endColor.join(", ")})`,
  };
}

function calculateSunPosition(currentHour) {
  const sunAngle = (currentHour - 6) / 12 * 90 - 45;
  const sunRadians = sunAngle * Math.PI / 180;
  const shadowDistance = 6;
  return {
    sunAngle,
    shadowX: -Math.sin(sunRadians) * shadowDistance,
    shadowY: Math.abs(Math.cos(sunRadians)) * shadowDistance,
    shadowOpacity: calculateShadowOpacity(currentHour)
  };
}
function calculateShadowOpacity(hours) {
  if (hours < 5 || hours > 19) return "0";
  if (hours < 6) return ((hours - 5) * 0.2).toFixed(2);
  if (hours > 18) return ((19 - hours) * 0.2).toFixed(2);
  return "0.2";
}
function formatTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

async function fetchWeatherData(apiKey) {
  try {
    if (!apiKey) ;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Kansas City,US&units=imperial&appid=${apiKey}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    if (data.main && data.weather) {
      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description
      };
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
}

const $$Astro$5 = createAstro("https://mzb.dev");
const $$NameWithSun = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$NameWithSun;
  const { sunAngle, shadowX, shadowY, shadowOpacity } = Astro2.props;
  console.log("NameWithSun Props:", {
    sunAngle,
    shadowX,
    shadowY,
    shadowOpacity
  });
  return renderTemplate`${maybeRenderHead()}<div class="name-container" data-astro-cid-lg7vm3ao> <div class="sun"${addAttribute(`
      --local-sunAngle: ${sunAngle}deg;
      --local-shadowOpacity: ${shadowOpacity};
    `, "style")} data-astro-cid-lg7vm3ao></div> <a class="name" href="/"${addAttribute(`
      --local-shadowX: ${shadowX}px;
      --local-shadowY: ${shadowY}px;
      --local-shadowOpacity: ${shadowOpacity};
    `, "style")} data-astro-cid-lg7vm3ao>
Miller Bath
</a> </div> `;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/components/NameWithSun.astro", void 0);

const $$Astro$4 = createAstro("https://mzb.dev");
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { pathname, sunAngle, shadowX, shadowY, shadowOpacity } = Astro2.props;
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };
  return renderTemplate`${maybeRenderHead()}<nav class="fixed-nav" data-astro-cid-pux6a34n> ${renderComponent($$result, "NameWithSun", $$NameWithSun, { "sunAngle": sunAngle, "shadowX": shadowX, "shadowY": shadowY, "shadowOpacity": shadowOpacity, "data-astro-cid-pux6a34n": true })} <div class="subheading" data-astro-cid-pux6a34n> <div data-astro-cid-pux6a34n>Software Engineer in Kansas City</div> </div> <div class="nav-links" data-astro-cid-pux6a34n> <a href="/"${addAttribute(["nav-link", { active: isActive("/") }], "class:list")} data-astro-cid-pux6a34n> About </a> <a href="/writings"${addAttribute(["nav-link", { active: isActive("/writings") }], "class:list")} data-astro-cid-pux6a34n>
Writings
</a> <a href="/work"${addAttribute(["nav-link", { active: isActive("/work") }], "class:list")} data-astro-cid-pux6a34n>
Work History
</a> <a href="/photographs"${addAttribute(["nav-link", { active: isActive("/photographs") }], "class:list")} data-astro-cid-pux6a34n>
Photographs
</a> <a class="nav-link" href="Miller_Bath_Resume_Aug2023.pdf" data-astro-cid-pux6a34n>Resume</a> <a class="nav-link" href="https://www.linkedin.com/in/~miller" data-astro-cid-pux6a34n>LinkedIn</a> </div> </nav> `;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/components/Navigation.astro", void 0);

const $$Astro$3 = createAstro("https://mzb.dev");
const $$InfoContainer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$InfoContainer;
  const { timeInfo, weatherData } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="info-container" data-astro-cid-voalp5nk> <div class="day-counter" data-astro-cid-voalp5nk>
Day ${timeInfo.currentDay} <div class="time-display" data-astro-cid-voalp5nk>${timeInfo.formattedTime}</div> </div> ${weatherData && renderTemplate`<div class="weather-info" data-astro-cid-voalp5nk> ${weatherData.temperature}°F • ${weatherData.description} </div>`} </div> `;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/components/InfoContainer.astro", void 0);

const $$GradientBackground = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="gradient-background" data-astro-cid-qumqhawe></div>  ${renderScript($$result, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/components/GradientBackground.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/components/GradientBackground.astro", void 0);

const $$Astro$2 = createAstro("https://mzb.dev");
const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/@vercel/speed-insights/dist/astro/index.astro", void 0);

const $$Astro$1 = createAstro("https://mzb.dev");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/node_modules/@vercel/analytics/dist/astro/index.astro", void 0);

const $$Astro = createAstro("https://mzb.dev");
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const pathname = Astro2.url.pathname;
  const { startColor, endColor } = getSeasonalColors();
  const now = /* @__PURE__ */ new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;
  const currentDay = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1e3 * 60 * 60 * 24)
  );
  const timeInfo = {
    currentHour,
    currentDay,
    formattedTime: formatTime(now)
  };
  const { sunAngle, shadowX, shadowY, shadowOpacity } = calculateSunPosition(currentHour);
  const weatherData = await fetchWeatherData(
    "your_api_key_here"
  );
  return renderTemplate`<html lang="en"${addAttribute(`
    --startColor: ${startColor};
    --endColor: ${endColor};
    --shadowX: ${shadowX}px;
    --shadowY: ${shadowY}px;
    --shadowOpacity: ${shadowOpacity};
    --sunAngle: ${sunAngle}deg;
  `, "style")} data-astro-cid-ouamjn2i> <head><meta charset="utf-8"><link rel="icon" href="favicon.png" type="image/png"><title>mzb.dev</title>${renderComponent($$result, "ClientRouter", $$ClientRouter, { "data-astro-cid-ouamjn2i": true })}${renderComponent($$result, "SpeedInsights", $$Index$1, { "data-astro-cid-ouamjn2i": true })}${renderComponent($$result, "Analytics", $$Index, { "data-astro-cid-ouamjn2i": true })}${renderHead()}</head> <body data-astro-cid-ouamjn2i> ${renderComponent($$result, "GradientBackground", $$GradientBackground, { "data-astro-cid-ouamjn2i": true })} <div class="layout-container" data-astro-cid-ouamjn2i> ${renderComponent($$result, "Navigation", $$Navigation, { "pathname": pathname, "sunAngle": sunAngle, "shadowX": shadowX, "shadowY": shadowY, "shadowOpacity": shadowOpacity, "data-astro-cid-ouamjn2i": true })} <main class="content" data-astro-cid-ouamjn2i> ${renderSlot($$result, $$slots["default"])} </main> </div> ${renderComponent($$result, "InfoContainer", $$InfoContainer, { "timeInfo": timeInfo, "weatherData": weatherData, "data-astro-cid-ouamjn2i": true })}  </body></html>`;
}, "/Users/bath/Dropbox (PayIt)/Mac/Documents/site-2023/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
