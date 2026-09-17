/**
 * Smoke-test the published dashboard in a real DOM.
 *
 * scripts/verify_js.py proves the browser scorer matches Python; this proves the
 * page around it boots, the two tabs are wired, and that editing a preference
 * actually re-ranks the results.
 *
 * Usage: node scripts/ui_smoke.js
 */

const fs = require("fs");
const path = require("path");
const {
  STORAGE_KEY, badgeOf, collect, check, inlineScripts, interestOrder, load, payloadOf, topThree,
} = require("./ui_harness.js");
const ranking = require("./ui_ranking.js");

const PAGE = path.join(__dirname, "..", "public", "index.html");
const COGNITION = "Cognition, attention & decision-making";
const SLEEP = "Sleep & fatigue";

function checkBoot(window, payload) {
  console.log("boots without throwing");
  const rows = window.document.querySelectorAll("#projects tr").length;
  check(rows === payload.projects.length, `results table lists all ${payload.projects.length} projects`);
}

function checkPreferenceLists(window, payload) {
  console.log("tab 1 lists every category");
  const { document } = window;
  const interests = document.querySelectorAll("#interest-list li").length;
  const methods = document.querySelectorAll("#method-list li").length;
  check(interests === payload.config.subject_categories.length, `all ${interests} subject categories are listed`);
  check(methods === payload.config.method_categories.length, `all ${methods} methods are listed`);
  const options = [...document.querySelectorAll("#programme option")].map((o) => o.value);
  check(options[0] === "", 'the degree list starts with "Any programme"');
  check(options.length > 1, `the degree list is filled from the data (${options.length - 1} programmes)`);
  check(document.getElementById("programme").tagName === "SELECT", "degree is a select, not free text");
  check(document.querySelector("#interest-list select") === null,
    "interests carry no priority control: the drag order is the only input");
  check(document.querySelector("#method-list select") === null,
    "methods carry no priority control either");
}

/** Position is the weight: 5, 4, 3, 2, 1, then 0 for everything past that. */
function checkTabs(window) {
  console.log("tabs switch");
  const { document } = window;
  check(document.getElementById("panel-results").hidden === true, "results panel starts hidden");
  document.getElementById("tab-results").click();
  check(document.getElementById("panel-results").hidden === false, "clicking the tab reveals results");
  document.getElementById("tab-setup").click();
  check(document.getElementById("panel-setup").hidden === false, "clicking back returns to setup");
}

function checkReload(html, seed) {
  console.log("preferences persist across a reload");
  const reloaded = load(inlineScripts(html), seed);
  const ranked = JSON.parse(seed).interest.ranked;
  check(interestOrder(reloaded.window).slice(0, ranked.length).join("|") === ranked.join("|"),
    "the ranked order came back after reload");
  const badges = ranked.map((name) => badgeOf(reloaded.window, name)).join(",");
  const cap = Number(reloaded.window.eval("MAX_RANKED"));
  const wanted = ranked.map((_, index) => String(Math.max(cap - index, 0))).join(",");
  check(badges === wanted, `its weights came back too (${badges} vs ${wanted})`);
  const counted = interestOrder(reloaded.window)
    .filter((name) => badgeOf(reloaded.window, name) !== "0").length;
  check(counted <= cap, `no more than ${cap} rows count at once (now ${counted})`);
  const fresh = load(inlineScripts(html));
  const head = (dom) => interestOrder(dom).slice(0, cap).join("|");
  check(head(reloaded.window) !== head(fresh.window),
    `the reloaded ranking differs from the defaults (${head(reloaded.window)})`);
  fresh.window.close();
  return reloaded;
}

function checkReset(reloaded, payload, before) {
  console.log("reset restores the committed defaults");
  const { document } = reloaded.window;
  document.getElementById("reset").click();
  const ranked = Object.keys(payload.config.interest).filter((name) => payload.config.interest[name] > 0);
  check(interestOrder(reloaded.window).slice(0, ranked.length).join("|") === ranked.join("|"),
    "reset restores the repository's default ranking");
  check(topThree(reloaded.window)[0] === before, `reset restores the original top match (${before})`);
}

function main() {
  const html = fs.readFileSync(PAGE, "utf8");
  const payload = payloadOf(fs.readFileSync(path.join(__dirname, "..", "public", "scripts.js"), "utf8"));
  const dom = load(inlineScripts(html));
  checkBoot(dom.window, payload);
  checkPreferenceLists(dom.window, payload);
  checkTabs(dom.window);
  const before = ranking.runRankingChecks(dom.window, payload);
  const seed = dom.window.localStorage.getItem(STORAGE_KEY);
  check(seed !== null && seed !== undefined, "state was written to localStorage");
  dom.window.close();
  const reloaded = checkReload(html, seed);
  checkReset(reloaded, payload, before);
  reloaded.window.close();
  const errors = collect();
  check(errors.length === 0,
    `the page threw nothing (${errors.length}: ${errors.map((e) => e.message).join("; ")})`);
  console.log("\nOK: the dashboard boots, tabs work, and preferences drive the ranking");
}

main();
