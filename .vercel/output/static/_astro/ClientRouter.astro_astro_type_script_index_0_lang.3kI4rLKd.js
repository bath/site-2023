const PERSIST_ATTR$1 = "data-astro-transition-persist";
function deselectScripts(doc) {
  for (const s1 of document.scripts) {
    for (const s2 of doc.scripts) {
      if (
        // Check if the script should be rerun regardless of it being the same
        !s2.hasAttribute("data-astro-rerun") && // Inline
        (!s1.src && s1.textContent === s2.textContent || // External
        s1.src && s1.type === s2.type && s1.src === s2.src)
      ) {
        s2.dataset.astroExec = "";
        break;
      }
    }
  }
}
function swapRootAttributes(doc) {
  const html = document.documentElement;
  const astroAttributes = [...html.attributes].filter(
    ({ name }) => (html.removeAttribute(name), name.startsWith("data-astro-"))
  );
  [...doc.documentElement.attributes, ...astroAttributes].forEach(
    ({ name, value }) => html.setAttribute(name, value)
  );
}
function swapHeadElements(doc) {
  for (const el of Array.from(document.head.children)) {
    const newEl = persistedHeadElement(el, doc);
    if (newEl) {
      newEl.remove();
    } else {
      el.remove();
    }
  }
  document.head.append(...doc.head.children);
}
function swapBodyElement(newElement, oldElement) {
  oldElement.replaceWith(newElement);
  for (const el of oldElement.querySelectorAll(`[${PERSIST_ATTR$1}]`)) {
    const id = el.getAttribute(PERSIST_ATTR$1);
    const newEl = newElement.querySelector(`[${PERSIST_ATTR$1}="${id}"]`);
    if (newEl) {
      newEl.replaceWith(el);
      if (newEl.localName === "astro-island" && shouldCopyProps(el) && !isSameProps(el, newEl)) {
        el.setAttribute("ssr", "");
        el.setAttribute("props", newEl.getAttribute("props"));
      }
    }
  }
}
const saveFocus = () => {
  const activeElement = document.activeElement;
  if (activeElement?.closest(`[${PERSIST_ATTR$1}]`)) {
    if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      return () => restoreFocus({ activeElement, start, end });
    }
    return () => restoreFocus({ activeElement });
  } else {
    return () => restoreFocus({ activeElement: null });
  }
};
const restoreFocus = ({ activeElement, start, end }) => {
  if (activeElement) {
    activeElement.focus();
    if (activeElement instanceof HTMLInputElement || activeElement instanceof HTMLTextAreaElement) {
      if (typeof start === "number") activeElement.selectionStart = start;
      if (typeof end === "number") activeElement.selectionEnd = end;
    }
  }
};
const persistedHeadElement = (el, newDoc) => {
  const id = el.getAttribute(PERSIST_ATTR$1);
  const newEl = id && newDoc.head.querySelector(`[${PERSIST_ATTR$1}="${id}"]`);
  if (newEl) {
    return newEl;
  }
  if (el.matches("link[rel=stylesheet]")) {
    const href = el.getAttribute("href");
    return newDoc.head.querySelector(`link[rel=stylesheet][href="${href}"]`);
  }
  return null;
};
const shouldCopyProps = (el) => {
  const persistProps = el.dataset.astroTransitionPersistProps;
  return persistProps == null || persistProps === "false";
};
const isSameProps = (oldEl, newEl) => {
  return oldEl.getAttribute("props") === newEl.getAttribute("props");
};
const swap = (doc) => {
  deselectScripts(doc);
  swapRootAttributes(doc);
  swapHeadElements(doc);
  const restoreFocusFunction = saveFocus();
  swapBodyElement(doc.body, document.body);
  restoreFocusFunction();
};

const TRANSITION_BEFORE_PREPARATION = "astro:before-preparation";
const TRANSITION_AFTER_PREPARATION = "astro:after-preparation";
const TRANSITION_BEFORE_SWAP = "astro:before-swap";
const TRANSITION_AFTER_SWAP = "astro:after-swap";
const triggerEvent$1 = (name) => document.dispatchEvent(new Event(name));
class BeforeEvent extends Event {
  from;
  to;
  direction;
  navigationType;
  sourceElement;
  info;
  newDocument;
  signal;
  constructor(type, eventInitDict, from, to, direction, navigationType, sourceElement, info, newDocument, signal) {
    super(type, eventInitDict);
    this.from = from;
    this.to = to;
    this.direction = direction;
    this.navigationType = navigationType;
    this.sourceElement = sourceElement;
    this.info = info;
    this.newDocument = newDocument;
    this.signal = signal;
    Object.defineProperties(this, {
      from: { enumerable: true },
      to: { enumerable: true, writable: true },
      direction: { enumerable: true, writable: true },
      navigationType: { enumerable: true },
      sourceElement: { enumerable: true },
      info: { enumerable: true },
      newDocument: { enumerable: true, writable: true },
      signal: { enumerable: true }
    });
  }
}
class TransitionBeforePreparationEvent extends BeforeEvent {
  formData;
  loader;
  constructor(from, to, direction, navigationType, sourceElement, info, newDocument, signal, formData, loader) {
    super(
      TRANSITION_BEFORE_PREPARATION,
      { cancelable: true },
      from,
      to,
      direction,
      navigationType,
      sourceElement,
      info,
      newDocument,
      signal
    );
    this.formData = formData;
    this.loader = loader.bind(this, this);
    Object.defineProperties(this, {
      formData: { enumerable: true },
      loader: { enumerable: true, writable: true }
    });
  }
}
class TransitionBeforeSwapEvent extends BeforeEvent {
  direction;
  viewTransition;
  swap;
  constructor(afterPreparation, viewTransition) {
    super(
      TRANSITION_BEFORE_SWAP,
      void 0,
      afterPreparation.from,
      afterPreparation.to,
      afterPreparation.direction,
      afterPreparation.navigationType,
      afterPreparation.sourceElement,
      afterPreparation.info,
      afterPreparation.newDocument,
      afterPreparation.signal
    );
    this.direction = afterPreparation.direction;
    this.viewTransition = viewTransition;
    this.swap = () => swap(this.newDocument);
    Object.defineProperties(this, {
      direction: { enumerable: true },
      viewTransition: { enumerable: true },
      swap: { enumerable: true, writable: true }
    });
  }
}
async function doPreparation(from, to, direction, navigationType, sourceElement, info, signal, formData, defaultLoader) {
  const event = new TransitionBeforePreparationEvent(
    from,
    to,
    direction,
    navigationType,
    sourceElement,
    info,
    window.document,
    signal,
    formData,
    defaultLoader
  );
  if (document.dispatchEvent(event)) {
    await event.loader();
    if (!event.defaultPrevented) {
      triggerEvent$1(TRANSITION_AFTER_PREPARATION);
      if (event.navigationType !== "traverse") {
        updateScrollPosition({ scrollX, scrollY });
      }
    }
  }
  return event;
}
function doSwap(afterPreparation, viewTransition) {
  const event = new TransitionBeforeSwapEvent(afterPreparation, viewTransition);
  document.dispatchEvent(event);
  event.swap();
  return event;
}

const pushState = history.pushState.bind(history);
const replaceState = history.replaceState.bind(history);
const updateScrollPosition = (positions) => {
  if (history.state) {
    history.scrollRestoration = "manual";
    replaceState({ ...history.state, ...positions }, "");
  }
};
const supportsViewTransitions = !!document.startViewTransition;
const transitionEnabledOnThisPage = () => !!document.querySelector('[name="astro-view-transitions-enabled"]');
const samePage = (thisLocation, otherLocation) => thisLocation.pathname === otherLocation.pathname && thisLocation.search === otherLocation.search;
let mostRecentNavigation;
let mostRecentTransition;
let originalLocation;
const triggerEvent = (name) => document.dispatchEvent(new Event(name));
const onPageLoad$1 = () => triggerEvent("astro:page-load");
const announce = () => {
  let div = document.createElement("div");
  div.setAttribute("aria-live", "assertive");
  div.setAttribute("aria-atomic", "true");
  div.className = "astro-route-announcer";
  document.body.append(div);
  setTimeout(
    () => {
      let title = document.title || document.querySelector("h1")?.textContent || location.pathname;
      div.textContent = title;
    },
    // Much thought went into this magic number; the gist is that screen readers
    // need to see that the element changed and might not do so if it happens
    // too quickly.
    60
  );
};
const PERSIST_ATTR = "data-astro-transition-persist";
const DIRECTION_ATTR = "data-astro-transition";
const OLD_NEW_ATTR = "data-astro-transition-fallback";
let parser;
let currentHistoryIndex = 0;
{
  if (history.state) {
    currentHistoryIndex = history.state.index;
    scrollTo({ left: history.state.scrollX, top: history.state.scrollY });
  } else if (transitionEnabledOnThisPage()) {
    replaceState({ index: currentHistoryIndex, scrollX, scrollY }, "");
    history.scrollRestoration = "manual";
  }
}
async function fetchHTML(href, init) {
  try {
    const res = await fetch(href, init);
    const contentType = res.headers.get("content-type") ?? "";
    const mediaType = contentType.split(";", 1)[0].trim();
    if (mediaType !== "text/html" && mediaType !== "application/xhtml+xml") {
      return null;
    }
    const html = await res.text();
    return {
      html,
      redirected: res.redirected ? res.url : void 0,
      mediaType
    };
  } catch {
    return null;
  }
}
function getFallback$1() {
  const el = document.querySelector('[name="astro-view-transitions-fallback"]');
  if (el) {
    return el.getAttribute("content");
  }
  return "animate";
}
function runScripts() {
  let wait = Promise.resolve();
  for (const script of document.getElementsByTagName("script")) {
    if (script.dataset.astroExec === "") continue;
    const type = script.getAttribute("type");
    if (type && type !== "module" && type !== "text/javascript") continue;
    const newScript = document.createElement("script");
    newScript.innerHTML = script.innerHTML;
    for (const attr of script.attributes) {
      if (attr.name === "src") {
        const p = new Promise((r) => {
          newScript.onload = newScript.onerror = r;
        });
        wait = wait.then(() => p);
      }
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.dataset.astroExec = "";
    script.replaceWith(newScript);
  }
  return wait;
}
const moveToLocation = (to, from, options, pageTitleForBrowserHistory, historyState) => {
  const intraPage = samePage(from, to);
  const targetPageTitle = document.title;
  document.title = pageTitleForBrowserHistory;
  let scrolledToTop = false;
  if (to.href !== location.href && !historyState) {
    if (options.history === "replace") {
      const current = history.state;
      replaceState(
        {
          ...options.state,
          index: current.index,
          scrollX: current.scrollX,
          scrollY: current.scrollY
        },
        "",
        to.href
      );
    } else {
      pushState(
        { ...options.state, index: ++currentHistoryIndex, scrollX: 0, scrollY: 0 },
        "",
        to.href
      );
    }
  }
  document.title = targetPageTitle;
  originalLocation = to;
  if (!intraPage) {
    scrollTo({ left: 0, top: 0, behavior: "instant" });
    scrolledToTop = true;
  }
  if (historyState) {
    scrollTo(historyState.scrollX, historyState.scrollY);
  } else {
    if (to.hash) {
      history.scrollRestoration = "auto";
      const savedState = history.state;
      location.href = to.href;
      if (!history.state) {
        replaceState(savedState, "");
        if (intraPage) {
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }
    } else {
      if (!scrolledToTop) {
        scrollTo({ left: 0, top: 0, behavior: "instant" });
      }
    }
    history.scrollRestoration = "manual";
  }
};
function preloadStyleLinks(newDocument) {
  const links = [];
  for (const el of newDocument.querySelectorAll("head link[rel=stylesheet]")) {
    if (!document.querySelector(
      `[${PERSIST_ATTR}="${el.getAttribute(
        PERSIST_ATTR
      )}"], link[rel=stylesheet][href="${el.getAttribute("href")}"]`
    )) {
      const c = document.createElement("link");
      c.setAttribute("rel", "preload");
      c.setAttribute("as", "style");
      c.setAttribute("href", el.getAttribute("href"));
      links.push(
        new Promise((resolve) => {
          ["load", "error"].forEach((evName) => c.addEventListener(evName, resolve));
          document.head.append(c);
        })
      );
    }
  }
  return links;
}
async function updateDOM(preparationEvent, options, currentTransition, historyState, fallback) {
  async function animate(phase) {
    function isInfinite(animation) {
      const effect = animation.effect;
      if (!effect || !(effect instanceof KeyframeEffect) || !effect.target) return false;
      const style = window.getComputedStyle(effect.target, effect.pseudoElement);
      return style.animationIterationCount === "infinite";
    }
    const currentAnimations = document.getAnimations();
    document.documentElement.setAttribute(OLD_NEW_ATTR, phase);
    const nextAnimations = document.getAnimations();
    const newAnimations = nextAnimations.filter(
      (a) => !currentAnimations.includes(a) && !isInfinite(a)
    );
    return Promise.allSettled(newAnimations.map((a) => a.finished));
  }
  if (fallback === "animate" && !currentTransition.transitionSkipped && !preparationEvent.signal.aborted) {
    try {
      await animate("old");
    } catch {
    }
  }
  const pageTitleForBrowserHistory = document.title;
  const swapEvent = doSwap(preparationEvent, currentTransition.viewTransition);
  moveToLocation(swapEvent.to, swapEvent.from, options, pageTitleForBrowserHistory, historyState);
  triggerEvent(TRANSITION_AFTER_SWAP);
  if (fallback === "animate") {
    if (!currentTransition.transitionSkipped && !swapEvent.signal.aborted) {
      animate("new").finally(() => currentTransition.viewTransitionFinished());
    } else {
      currentTransition.viewTransitionFinished();
    }
  }
}
function abortAndRecreateMostRecentNavigation() {
  mostRecentNavigation?.controller.abort();
  return mostRecentNavigation = {
    controller: new AbortController()
  };
}
async function transition(direction, from, to, options, historyState) {
  const currentNavigation = abortAndRecreateMostRecentNavigation();
  if (!transitionEnabledOnThisPage() || location.origin !== to.origin) {
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    location.href = to.href;
    return;
  }
  const navigationType = historyState ? "traverse" : options.history === "replace" ? "replace" : "push";
  if (navigationType !== "traverse") {
    updateScrollPosition({ scrollX, scrollY });
  }
  if (samePage(from, to)) {
    if (direction !== "back" && to.hash || direction === "back" && from.hash) {
      moveToLocation(to, from, options, document.title, historyState);
      if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
      return;
    }
  }
  const prepEvent = await doPreparation(
    from,
    to,
    direction,
    navigationType,
    options.sourceElement,
    options.info,
    currentNavigation.controller.signal,
    options.formData,
    defaultLoader
  );
  if (prepEvent.defaultPrevented || prepEvent.signal.aborted) {
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    if (!prepEvent.signal.aborted) {
      location.href = to.href;
    }
    return;
  }
  async function defaultLoader(preparationEvent) {
    const href = preparationEvent.to.href;
    const init = { signal: preparationEvent.signal };
    if (preparationEvent.formData) {
      init.method = "POST";
      const form = preparationEvent.sourceElement instanceof HTMLFormElement ? preparationEvent.sourceElement : preparationEvent.sourceElement instanceof HTMLElement && "form" in preparationEvent.sourceElement ? preparationEvent.sourceElement.form : preparationEvent.sourceElement?.closest("form");
      init.body = form?.attributes.getNamedItem("enctype")?.value === "application/x-www-form-urlencoded" ? new URLSearchParams(preparationEvent.formData) : preparationEvent.formData;
    }
    const response = await fetchHTML(href, init);
    if (response === null) {
      preparationEvent.preventDefault();
      return;
    }
    if (response.redirected) {
      const redirectedTo = new URL(response.redirected);
      if (redirectedTo.origin !== preparationEvent.to.origin) {
        preparationEvent.preventDefault();
        return;
      }
      preparationEvent.to = redirectedTo;
    }
    parser ??= new DOMParser();
    preparationEvent.newDocument = parser.parseFromString(response.html, response.mediaType);
    preparationEvent.newDocument.querySelectorAll("noscript").forEach((el) => el.remove());
    if (!preparationEvent.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !preparationEvent.formData) {
      preparationEvent.preventDefault();
      return;
    }
    const links = preloadStyleLinks(preparationEvent.newDocument);
    links.length && !preparationEvent.signal.aborted && await Promise.all(links);
  }
  async function abortAndRecreateMostRecentTransition() {
    if (mostRecentTransition) {
      if (mostRecentTransition.viewTransition) {
        try {
          mostRecentTransition.viewTransition.skipTransition();
        } catch {
        }
        try {
          await mostRecentTransition.viewTransition.updateCallbackDone;
        } catch {
        }
      }
    }
    return mostRecentTransition = { transitionSkipped: false };
  }
  const currentTransition = await abortAndRecreateMostRecentTransition();
  if (prepEvent.signal.aborted) {
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    return;
  }
  document.documentElement.setAttribute(DIRECTION_ATTR, prepEvent.direction);
  if (supportsViewTransitions) {
    currentTransition.viewTransition = document.startViewTransition(
      async () => await updateDOM(prepEvent, options, currentTransition, historyState)
    );
  } else {
    const updateDone = (async () => {
      await Promise.resolve();
      await updateDOM(prepEvent, options, currentTransition, historyState, getFallback$1());
      return void 0;
    })();
    currentTransition.viewTransition = {
      updateCallbackDone: updateDone,
      // this is about correct
      ready: updateDone,
      // good enough
      // Finished promise could have been done better: finished rejects iff updateDone does.
      // Our simulation always resolves, never rejects.
      finished: new Promise((r) => currentTransition.viewTransitionFinished = r),
      // see end of updateDOM
      skipTransition: () => {
        currentTransition.transitionSkipped = true;
        document.documentElement.removeAttribute(OLD_NEW_ATTR);
      }
    };
  }
  currentTransition.viewTransition?.updateCallbackDone.finally(async () => {
    await runScripts();
    onPageLoad$1();
    announce();
  });
  currentTransition.viewTransition?.finished.finally(() => {
    currentTransition.viewTransition = void 0;
    if (currentTransition === mostRecentTransition) mostRecentTransition = void 0;
    if (currentNavigation === mostRecentNavigation) mostRecentNavigation = void 0;
    document.documentElement.removeAttribute(DIRECTION_ATTR);
    document.documentElement.removeAttribute(OLD_NEW_ATTR);
  });
  try {
    await currentTransition.viewTransition?.updateCallbackDone;
  } catch (e) {
    const err = e;
    console.log("[astro]", err.name, err.message, err.stack);
  }
}
async function navigate(href, options) {
  await transition("forward", originalLocation, new URL(href, location.href), options ?? {});
}
function onPopState(ev) {
  if (!transitionEnabledOnThisPage() && ev.state) {
    location.reload();
    return;
  }
  if (ev.state === null) {
    return;
  }
  const state = history.state;
  const nextIndex = state.index;
  const direction = nextIndex > currentHistoryIndex ? "forward" : "back";
  currentHistoryIndex = nextIndex;
  transition(direction, originalLocation, new URL(location.href), {}, state);
}
const onScrollEnd = () => {
  if (history.state && (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY)) {
    updateScrollPosition({ scrollX, scrollY });
  }
};
{
  if (supportsViewTransitions || getFallback$1() !== "none") {
    originalLocation = new URL(location.href);
    addEventListener("popstate", onPopState);
    addEventListener("load", onPageLoad$1);
    if ("onscrollend" in window) addEventListener("scrollend", onScrollEnd);
    else {
      let intervalId, lastY, lastX, lastIndex;
      const scrollInterval = () => {
        if (lastIndex !== history.state?.index) {
          clearInterval(intervalId);
          intervalId = void 0;
          return;
        }
        if (lastY === scrollY && lastX === scrollX) {
          clearInterval(intervalId);
          intervalId = void 0;
          onScrollEnd();
          return;
        } else {
          lastY = scrollY, lastX = scrollX;
        }
      };
      addEventListener(
        "scroll",
        () => {
          if (intervalId !== void 0) return;
          lastIndex = history.state?.index, lastY = scrollY, lastX = scrollX;
          intervalId = window.setInterval(scrollInterval, 50);
        },
        { passive: true }
      );
    }
  }
  for (const script of document.getElementsByTagName("script")) {
    script.dataset.astroExec = "";
  }
}

const prefetchedUrls = /* @__PURE__ */ new Set();
const listenedAnchors = /* @__PURE__ */ new WeakSet();
let prefetchAll = void 0;
let defaultStrategy = void 0;
let inited = false;
function init(defaultOpts) {
  if (inited) return;
  inited = true;
  prefetchAll ??= defaultOpts?.prefetchAll;
  defaultStrategy ??= defaultOpts?.defaultStrategy ?? "hover";
  initTapStrategy();
  initHoverStrategy();
  initViewportStrategy();
  initLoadStrategy();
}
function initTapStrategy() {
  for (const event of ["touchstart", "mousedown"]) {
    document.body.addEventListener(
      event,
      (e) => {
        if (elMatchesStrategy(e.target, "tap")) {
          prefetch(e.target.href, { ignoreSlowConnection: true });
        }
      },
      { passive: true }
    );
  }
}
function initHoverStrategy() {
  let timeout;
  document.body.addEventListener(
    "focusin",
    (e) => {
      if (elMatchesStrategy(e.target, "hover")) {
        handleHoverIn(e);
      }
    },
    { passive: true }
  );
  document.body.addEventListener("focusout", handleHoverOut, { passive: true });
  onPageLoad(() => {
    for (const anchor of document.getElementsByTagName("a")) {
      if (listenedAnchors.has(anchor)) continue;
      if (elMatchesStrategy(anchor, "hover")) {
        listenedAnchors.add(anchor);
        anchor.addEventListener("mouseenter", handleHoverIn, { passive: true });
        anchor.addEventListener("mouseleave", handleHoverOut, { passive: true });
      }
    }
  });
  function handleHoverIn(e) {
    const href = e.target.href;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      prefetch(href);
    }, 80);
  }
  function handleHoverOut() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = 0;
    }
  }
}
function initViewportStrategy() {
  let observer;
  onPageLoad(() => {
    for (const anchor of document.getElementsByTagName("a")) {
      if (listenedAnchors.has(anchor)) continue;
      if (elMatchesStrategy(anchor, "viewport")) {
        listenedAnchors.add(anchor);
        observer ??= createViewportIntersectionObserver();
        observer.observe(anchor);
      }
    }
  });
}
function createViewportIntersectionObserver() {
  const timeouts = /* @__PURE__ */ new WeakMap();
  return new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      const anchor = entry.target;
      const timeout = timeouts.get(anchor);
      if (entry.isIntersecting) {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeouts.set(
          anchor,
          setTimeout(() => {
            observer.unobserve(anchor);
            timeouts.delete(anchor);
            prefetch(anchor.href);
          }, 300)
        );
      } else {
        if (timeout) {
          clearTimeout(timeout);
          timeouts.delete(anchor);
        }
      }
    }
  });
}
function initLoadStrategy() {
  onPageLoad(() => {
    for (const anchor of document.getElementsByTagName("a")) {
      if (elMatchesStrategy(anchor, "load")) {
        prefetch(anchor.href);
      }
    }
  });
}
function prefetch(url, opts) {
  url = url.replace(/#.*/, "");
  const ignoreSlowConnection = opts?.ignoreSlowConnection ?? false;
  if (!canPrefetchUrl(url, ignoreSlowConnection)) return;
  prefetchedUrls.add(url);
  if (document.createElement("link").relList?.supports?.("prefetch") && opts?.with !== "fetch") {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.setAttribute("href", url);
    document.head.append(link);
  } else {
    fetch(url, { priority: "low" });
  }
}
function canPrefetchUrl(url, ignoreSlowConnection) {
  if (!navigator.onLine) return false;
  if (!ignoreSlowConnection && isSlowConnection()) return false;
  try {
    const urlObj = new URL(url, location.href);
    return location.origin === urlObj.origin && (location.pathname !== urlObj.pathname || location.search !== urlObj.search) && !prefetchedUrls.has(url);
  } catch {
  }
  return false;
}
function elMatchesStrategy(el, strategy) {
  if (el?.tagName !== "A") return false;
  const attrValue = el.dataset.astroPrefetch;
  if (attrValue === "false") {
    return false;
  }
  if (strategy === "tap" && (attrValue != null || prefetchAll) && isSlowConnection()) {
    return true;
  }
  if (attrValue == null && prefetchAll || attrValue === "") {
    return strategy === defaultStrategy;
  }
  if (attrValue === strategy) {
    return true;
  }
  return false;
}
function isSlowConnection() {
  if ("connection" in navigator) {
    const conn = navigator.connection;
    return conn.saveData || /2g/.test(conn.effectiveType);
  }
  return false;
}
function onPageLoad(cb) {
  cb();
  let firstLoad = false;
  document.addEventListener("astro:page-load", () => {
    if (!firstLoad) {
      firstLoad = true;
      return;
    }
    cb();
  });
}

function getFallback() {
  const el = document.querySelector('[name="astro-view-transitions-fallback"]');
  if (el) {
    return el.getAttribute("content");
  }
  return "animate";
}
function isReloadEl(el) {
  return el.dataset.astroReload !== void 0;
}
if (supportsViewTransitions || getFallback() !== "none") {
  document.addEventListener("click", (ev) => {
    let link = ev.target;
    if (ev.composed) {
      link = ev.composedPath()[0];
    }
    if (link instanceof Element) {
      link = link.closest("a, area");
    }
    if (!(link instanceof HTMLAnchorElement) && !(link instanceof SVGAElement) && !(link instanceof HTMLAreaElement))
      return;
    const linkTarget = link instanceof HTMLElement ? link.target : link.target.baseVal;
    const href = link instanceof HTMLElement ? link.href : link.href.baseVal;
    const origin = new URL(href, location.href).origin;
    if (isReloadEl(link) || link.hasAttribute("download") || !link.href || linkTarget && linkTarget !== "_self" || origin !== location.origin || ev.button !== 0 || // left clicks only
    ev.metaKey || // new tab (mac)
    ev.ctrlKey || // new tab (windows)
    ev.altKey || // download
    ev.shiftKey || // new window
    ev.defaultPrevented) {
      return;
    }
    ev.preventDefault();
    navigate(href, {
      history: link.dataset.astroHistory === "replace" ? "replace" : "auto",
      sourceElement: link
    });
  });
  document.addEventListener("submit", (ev) => {
    let el = ev.target;
    if (el.tagName !== "FORM" || ev.defaultPrevented || isReloadEl(el)) {
      return;
    }
    const form = el;
    const submitter = ev.submitter;
    const formData = new FormData(form, submitter);
    const formAction = typeof form.action === "string" ? form.action : form.getAttribute("action");
    const formMethod = typeof form.method === "string" ? form.method : form.getAttribute("method");
    let action = submitter?.getAttribute("formaction") ?? formAction ?? location.pathname;
    const method = submitter?.getAttribute("formmethod") ?? formMethod ?? "get";
    if (method === "dialog" || location.origin !== new URL(action, location.href).origin) {
      return;
    }
    const options = { sourceElement: submitter ?? form };
    if (method === "get") {
      const params = new URLSearchParams(formData);
      const url = new URL(action);
      url.search = params.toString();
      action = url.toString();
    } else {
      options.formData = formData;
    }
    ev.preventDefault();
    navigate(action, options);
  });
  {
    init({ prefetchAll: true });
  }
}
