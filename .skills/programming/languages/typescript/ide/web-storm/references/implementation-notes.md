# Implementation notes

Focused reference for **webstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Debugging & Profiling

- **Use the JavaScript debugger, not `console.log`.** Conditional breakpoints, watches, and the async stack view handle a call stack `console.log` cannot reproduce.
- **Break on uncaught exceptions and on caught ones selectively** — the "paused on exception" setting is a first-class debugging tool for a stack you cannot otherwise follow.
- **Source maps must be generated for the code you are stepping into** (`sourceMap: true` in the dev build). Without them the debugger steps into the bundled output, which is the usual reason "the breakpoint in my source never hits".
- **The bundled CPU profiler records a running Node process** and attributes cost to your source when source maps are present. It is the fastest route from "this endpoint is slow" to the function responsible.
- **Keep a profiling run off the debug-instrumented path** — a profiler's own overhead changes the timings; compare relative costs.
- **Chrome DevTools remains the tool for the browser half** (network, rendering, memory) and the Node profiler for the server half; they are complementary, not competing.

---

## 5. Code Style & Quality

- **Configure the formatter and linter from the repo's config** — Prettier for format, ESLint for lint — and let the IDE run the repo's binaries rather than its own reimplementation, so the editor and `pnpm format` produce identical output.
- **Prettier's Tailwind plugin sorts classes; the IDE must use the same plugin and config** or every file reorders on the next format.
- **`eslint --fix` and `prettier --write` in the IDE should be wired to the same scripts as CI,** so a save produces the same result as a commit hook.
- **`eslint` flat config (`eslint.config.js`) is the current form**; a legacy `.eslintrc` is being phased out. Configure the IDE for the form the repo uses.
- **Pre-commit hooks belong in the repo,** not the IDE's commit dialog; the hook is the shared rule.
- **Commit `eslint.config.js`, `.prettierrc`, `tsconfig.json`, and the lockfile** — these four define the project's front-end contract and belong in review.

---

## 6. JetBrains Shared Conventions
