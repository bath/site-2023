import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(
  new URL("../src/components/ThemeScript.astro", import.meta.url),
  "utf8",
)
  .split("<script is:inline>")[1]
  .split("</script>")[0];

function browser({ blocked = false } = {}) {
  const handlers = new Map();
  const storage = new Map();
  function listen(type, handler) {
    if (!handlers.has(type)) handlers.set(type, []);
    handlers.get(type).push(handler);
  }
  function dispatch(type, event = {}) {
    for (const handler of handlers.get(type) ?? []) handler(event);
  }
  function page() {
    const attributes = {};
    const button = {
      setAttribute: (name, value) => {
        attributes[name] = value;
      },
    };
    const document = {
      querySelectorAll: () => [button],
      addEventListener: listen,
    };
    document.documentElement = { dataset: {}, ownerDocument: document };
    return { document, attributes };
  }
  const current = page();
  const media = {
    matches: false,
    addEventListener: (type, handler) => listen(`media:${type}`, handler),
  };
  const context = vm.createContext({
    document: current.document,
    URLSearchParams,
    location: { search: "" },
    CustomEvent: class {
      constructor(type) {
        this.type = type;
      }
    },
    localStorage: {
      getItem(key) {
        if (blocked) throw new Error("Storage blocked");
        return storage.get(key);
      },
      setItem(key, value) {
        if (blocked) throw new Error("Storage blocked");
        storage.set(key, value);
      },
    },
    window: {
      matchMedia: () => media,
      addEventListener: listen,
      dispatchEvent: (event) => dispatch(event.type, event),
    },
  });
  const run = () => vm.runInContext(source, context);
  run();
  return {
    ...current,
    media,
    storage,
    dispatch,
    page,
    run,
    click: () => dispatch("click", { target: { closest: () => ({}) } }),
  };
}

for (const blocked of [false, true]) {
  test(`theme cycles and reports its current and next choice with storage ${blocked ? "blocked" : "enabled"}`, () => {
    const b = browser({ blocked });
    for (const [current, next] of [
      ["light", "dark"],
      ["dark", "auto"],
      ["auto", "light"],
    ]) {
      b.click();
      assert.equal(b.document.documentElement.dataset.themeChoice, current);
      assert.match(
        b.attributes["aria-label"],
        new RegExp(`Color theme: ${current}`),
      );
      assert.match(
        b.attributes["aria-label"],
        new RegExp(`Switch to ${next} theme`),
      );
      if (!blocked) assert.equal(b.storage.get("theme"), current);
    }
  });
}

test("auto theme follows the OS and reaches the next page before the swap", () => {
  const b = browser();
  b.media.matches = true;
  b.dispatch("media:change");
  assert.equal(b.document.documentElement.dataset.theme, "dark");
  assert.match(b.attributes["aria-label"], /auto \(dark\)/);
  const incoming = b.page();
  b.dispatch("astro:before-swap", { newDocument: incoming.document });
  assert.equal(incoming.document.documentElement.dataset.theme, "dark");
  assert.match(incoming.attributes["aria-label"], /auto \(dark\)/);
  b.click();
  b.run();
  b.click();
  assert.equal(b.document.documentElement.dataset.themeChoice, "dark");
});

test("a changed theme preference in another tab updates this page", () => {
  const b = browser();
  b.storage.set("theme", "dark");
  b.dispatch("storage", { key: "theme" });
  assert.equal(b.document.documentElement.dataset.themeChoice, "dark");
  assert.match(b.attributes["aria-label"], /Switch to auto theme/);
});
