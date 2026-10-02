/**
 * Ranking-editor checks for the smoke test: the drag-only list, the move
 * buttons, the 5-to-0 weighting rule and the top-five cut.
 *
 * Required by scripts/ui_smoke.js; run that file rather than this one.
 */

const {
  badgeOf, check, dragAbove, dragToTop, interestOrder, pushOutOfBlock, rowFor, topThree,
} = require("./ui_harness.js");

const COGNITION = "Cognition, attention & decision-making";
const SLEEP = "Sleep & fatigue";

function checkWeightBadges(window) {
  console.log("the top three rows are weighted 3 down to 1, the rest 0");
  const badges = interestOrder(window).map((name) => badgeOf(window, name));
  check(badges.slice(0, 3).join(",") === "3,2,1",
    `the first three rows read 3,2,1 (now: ${badges.slice(0, 3).join(",")})`);
  check(badges.slice(3).every((value) => value === "0"),
    "every row past the third reads 0");
}

function checkRescoring(window) {
  console.log("raising one interest re-ranks the results");
  const before = topThree(window)[0];
  check(rowFor(window, SLEEP) !== undefined, `the ${SLEEP} row exists`);
  dragToTop(window, SLEEP);
  const after = topThree(window)[0];
  check(before !== after, `ranking changed: ${before} -> ${after}`);
  const matched = [...window.document.querySelectorAll("#projects tr")]
    .some((row) => row.textContent.includes("Sleep"));
  check(matched, "at least one sleep project now matches the new interest");
  return before;
}

/** A short ranking must count only its own rows, not the ones beneath it. */
function checkMethodBlock(window, payload) {
  console.log("a short ranking does not promote the rows beneath it");
  const rows = [...window.document.querySelectorAll("#method-list li")];
  const badges = rows.map((li) => li.querySelector(".weight").textContent);
  const ranked = payload.config.method;
  const wanted = Object.keys(ranked).filter((name) => ranked[name] > 0).length;
  const counted = badges.filter((value) => value !== "0").length;
  check(counted === wanted,
    `only the ${wanted} configured methods count (now: ${counted}, badges ${badges.join(",")})`);
  check(badges.slice(0, wanted).join(",") === "3,2,1",
    "the configured methods keep the descending weights");
  check(badges.slice(wanted, wanted + 2).every((value) => value === "0"),
    "the methods below the block read 0 rather than picking up spare weight");
}

/** Touch and keyboard need a control that drag-and-drop cannot provide. */
function checkMoveButtons(window) {
  console.log("every row can be reordered without dragging");
  const rows = [...window.document.querySelectorAll("#interest-list li")];
  const buttons = rows[0].querySelectorAll("button");
  check(buttons.length === 2, "each row carries an up and a down control");
  check(buttons[0].textContent === "\u25B2" && buttons[1].textContent === "\u25BC",
    "the controls are labelled with arrows");
  check(buttons[0].getAttribute("aria-label").startsWith("Move up"),
    "the controls name their action for screen readers");
  check(rows[0].querySelectorAll("button")[0].disabled === true
    && rows[rows.length - 1].querySelectorAll("button")[1].disabled === true,
    "the controls at each end of the list are disabled");
  const name = interestOrder(window)[7];
  const before = interestOrder(window).slice(6, 9).join("|");
  rows[7].querySelectorAll("button")[0].click();
  const after = interestOrder(window).slice(6, 9).join("|");
  check(before !== after, `clicking up moves the row (${before} -> ${after})`);
  check(badgeOf(window, name) === "0", "a row moved within the tail keeps its weight of 0");
  rows[7].querySelectorAll("button")[1].click();
  check(interestOrder(window).slice(6, 9).join("|") === before, "clicking down moves it back");
}

function checkDragRanking(window) {
  console.log("dragging is the only ranking input");
  const before = interestOrder(window);
  check(before[0] === SLEEP, `the earlier drag put ${SLEEP} on top`);
  dragAbove(window, COGNITION, SLEEP);
  check(badgeOf(window, COGNITION) === "3", "the dragged row takes weight 3");
  check(badgeOf(window, SLEEP) === "2", "the row it was dropped above falls to 2");
  check(interestOrder(window).slice(0, 2).join("|") === `${COGNITION}|${SLEEP}`,
    "the list keeps the new order instead of re-sorting it");
  const third = interestOrder(window)[2];
  const fourth = interestOrder(window)[3];
  check(badgeOf(window, third) === "1" && badgeOf(window, fourth) === "0",
    "exactly three rows carry a weight above 0");
}

function checkPushingOut(window) {
  console.log("a row pushed out of the block stops counting");
  const { document } = window;
  pushOutOfBlock(window, COGNITION);
  const unranked = interestOrder(window)[5];
  check(badgeOf(window, COGNITION) === "0",
    "the pushed row now reads 0 instead of a weight");
  check(rowFor(window, COGNITION).classList.contains("off"),
    "the pushed row is dimmed");
  const active = document.getElementById("active-dimensions").textContent;
  check(active.includes("Interest match"),
    `Interest match stays active while rows remain ranked (now: ${active})`);
  check(active.includes("Programme fit"), "Programme fit stays active because a degree is still chosen");
  const counted = (scope) => [...window.document.querySelectorAll(`#${scope}-list li`)]
    .filter((li) => li.querySelector(".weight").textContent !== "0").length;
  const summary = document.getElementById("setup-summary").textContent;
  check(summary === `2 interests, ${counted("method")} method${counted("method") === 1 ? "" : "s"}`,
    `the tab 1 summary counts the rows still ranked (${summary})`);
  const ranked = interestOrder(window).filter((name) => badgeOf(window, name) !== "0");
  const columns = [...document.querySelectorAll("#heatmap svg text")]
    .map((node) => node.textContent).slice(0, ranked.length);
  check(columns.join("|") === ranked.join("|"),
    `the heatmap columns follow the ranked order, strongest first (${columns.length} columns)`);
  check(!columns.includes(unranked), "a zero-weight category gets no heatmap column");
}

/** A category outside the block must not be credited, however well it matches. */
function checkOutsideTheBlock(window, payload) {
  console.log("only the top three rows may contribute to a score");
  const ranked = interestOrder(window).slice(0, 3);
  const categoriesOf = (project) => (project.categories || "").split("; ");
  const matchesAlone = (name) => payload.projects.some((project) => {
    const categories = categoriesOf(project);
    return categories.includes(name) && !categories.some((other) => ranked.includes(other));
  });
  // Any row below the block that some project matches on its own.
  const outside = interestOrder(window).slice(3).find(matchesAlone);
  check(outside !== undefined, `found a category below the block to test with: ${outside}`);
  if (outside === undefined) return;
  const solo = payload.projects.find((project) => {
    const categories = categoriesOf(project);
    return categories.includes(outside) && !categories.some((name) => ranked.includes(name));
  });
  const rowOf = () => [...window.document.querySelectorAll("#projects tr")]
    .find((tr) => tr.textContent.includes(solo.title));
  const row = rowOf();
  check(row !== undefined, "that project is still listed");
  // Columns: rank, project, supervisor, methods, why it matched, ...
  const why = row.querySelectorAll("td")[4].textContent;
  check(!why.includes(outside), `a category outside the block is not credited (why: ${why})`);
  dragToTop(window, outside);
  const moved = rowOf();
  check(moved !== undefined && moved.querySelectorAll("td")[4].textContent.includes(outside),
    "dragging it into the block does credit it");
}

/** Runs the editor checks in order and returns the original top-ranked project. */
function runRankingChecks(window, payload) {
  checkWeightBadges(window);
  checkMethodBlock(window, payload);
  checkMoveButtons(window);
  const before = checkRescoring(window);
  checkDragRanking(window);
  checkOutsideTheBlock(window, payload);
  checkPushingOut(window);
  return before;
}

module.exports = { runRankingChecks };
