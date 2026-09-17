/**
 * DOM harness for the dashboard smoke test.
 *
 * jsdom lives in the monorepo, not in this Python project, so resolve it from
 * the pnpm store when it is not on the module path.
 */

const fs = require("fs");
const path = require("path");

const STORAGE_KEY = "uob-research-projects.preferences.v1";
const problems = [];

/** Errors the page threw. The test fails on these, so silence is not success. */
function collect() {
  return problems;
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function check(condition, message) {
  if (!condition) fail(message);
  console.log(`  ok  ${message}`);
}

function loadJsdom() {
  if (process.env.JSDOM_PATH) return require(process.env.JSDOM_PATH);
  try {
    return require("jsdom");
  } catch (error) { /* fall through to the pnpm store */ }
  const store = path.join(__dirname, "..", "..", "..", "..", "..", "..", "node_modules", ".pnpm");
  if (fs.existsSync(store)) {
    const match = fs.readdirSync(store).find((name) => name.startsWith("jsdom@"));
    if (match) return require(path.join(store, match, "node_modules", "jsdom"));
  }
  throw new Error("jsdom not found: install it, or set JSDOM_PATH to a jsdom directory");
}

const { JSDOM, VirtualConsole } = loadJsdom();

function load(html, seed) {
  const console_ = new VirtualConsole();
  console_.on("jsdomError", (error) => problems.push(error));
  return new JSDOM(html, {
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: console_,
    url: "https://example.test/",
    // Seeding before parse is how a returning visitor's state gets there.
    beforeParse(window) {
      if (seed) window.localStorage.setItem(STORAGE_KEY, seed);
    },
  });
}

// A top-level `const` is a lexical binding, not a property on window, so read
// the payload out of the markup instead of off the global object.
function payloadOf(html) {
  const match = html.match(/const data=(\{[\s\S]*?\});\s*\/\* scoring:start \*\//);
  if (!match) throw new Error("could not find the embedded payload");
  return JSON.parse(match[1]);
}

/**
 * Inline scripts.js into the document.
 *
 * The page loads its behaviour from a sibling file, which jsdom will not fetch
 * over the fake https origin; splicing it in keeps the test hermetic.
 */
function inlineScripts(html) {
  const source = fs.readFileSync(path.join(__dirname, "..", "public", "scripts.js"), "utf8");
  return html.replace('<script src="scripts.js"></script>', `<script>${source}</script>`);
}

function topThree(window) {
  return [...window.document.querySelectorAll("#projects tr")]
    .slice(0, 3)
    .map((row) => row.querySelector(".rank").textContent);
}

/** Rows are rebuilt on every edit, so always re-query by name. */
function rowFor(window, name) {
  return [...window.document.querySelectorAll("#interest-list li")]
    .find((li) => li.dataset.name === name);
}

/** The weight the row is currently showing, read from its badge. */
function badgeOf(window, name) {
  const row = rowFor(window, name);
  return row ? row.querySelector(".weight").textContent : undefined;
}

function interestOrder(window) {
  return [...window.document.querySelectorAll("#interest-list li")]
    .map((li) => li.dataset.name);
}

/** Drag a row to the very top: first choice, weight 5. */
function dragToTop(window, name) {
  dragAbove(window, name, interestOrder(window)[0]);
}

/** Drag a row down past the fifth until it reads 0. */
function pushOutOfBlock(window, name) {
  const order = interestOrder(window);
  for (let attempt = 0; attempt < order.length; attempt += 1) {
    if (badgeOf(window, name) === "0") return;
    dragAbove(window, name, interestOrder(window)[interestOrder(window).length - 1]);
  }
}

/** jsdom will not synthesise HTML5 drag events, so dispatch them by hand. */
function dragEvent(window, type) {
  const event = new window.Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, "dataTransfer", { value: { effectAllowed: "" } });
  return event;
}

function dragAbove(window, sourceName, targetName) {
  const source = rowFor(window, sourceName);
  const target = rowFor(window, targetName);
  source.dispatchEvent(dragEvent(window, "dragstart"));
  target.dispatchEvent(dragEvent(window, "dragover"));
  target.dispatchEvent(dragEvent(window, "drop"));
}

module.exports = {
  STORAGE_KEY, badgeOf, collect, check, dragAbove, dragToTop,
  inlineScripts, interestOrder, load, payloadOf, pushOutOfBlock, rowFor, topThree,
};
