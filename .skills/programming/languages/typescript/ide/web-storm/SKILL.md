---
name: "webstorm-best-practices"
description: "Best practices for working in WebStorm — TypeScript project config as the source of truth, the Node interpreter and package manager, React/Vue/Angular framework support, the JavaScript debugger and CPU profiler, and TypeScript 7. Use when setting up, debugging, or refactoring a TypeScript or JavaScript web project in WebStorm."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "ide"
  - "web"
  - "storm"
  - "webstorm"
when_to_use: "Use when setting up, debugging, or refactoring a TypeScript or JavaScript web project in WebStorm."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../package/manager/volta/SKILL.md"
  - "../../tools/eslint/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# WebStorm

WebStorm is JetBrains' JavaScript and TypeScript IDE, and the strongest one available: a Node debugger and CPU profiler built in, framework support for React, Vue, Angular, and Next.js that understands routing and data flow, and refactorings that follow modules across the project. Its main risk is **the IDE's TypeScript service drifting from the `tsconfig` the build actually uses**, which produces a confidently wrong check. Practical WebStorm work is about **letting `tsconfig.json` own type checking, keeping the interpreter and package manager aligned with the repo, and using the debugger and profiler instead of console logs**. Language rules live in [typescript.md](../../SKILL.md) and [javascript.md](../../javascript/SKILL.md); Svelte and Nuxt work is covered in [svelte.md](../../frontend/frameworks/web/svelte/SKILL.md) and [astro.md](../../frontend/frameworks/web/astro/SKILL.md).

_Verified against WebStorm 2026.2.3 (September 2026) with TypeScript 7 support, Node LTS, and pnpm. React 19 support is current via the React Buddy plugin._

---

## 1. Editions & Node

- **WebStorm is commercial, with free student, open-source, and 30-day trial licences.** No Community edition.
- **The Node interpreter must match the repo's version.** Let it read `.nvmrc`, `.node-version`, or `volta` from `package.json`; a hard-coded path or a system Node is how the IDE debugs a runtime you do not ship.
- **The package manager must match the lockfile** — pnpm, yarn, or npm. A mismatch is the usual reason `node_modules` disagrees with the IDE's resolution, and the IDE offers to switch; take its suggestion once, then keep it consistent.
- **The IDE version is not the TypeScript version.** The `tsc` that runs is the one from the project; the IDE's bundled service is for speed and must agree with it or its checks are advisory.

---

## 2. TypeScript Project Config

- **`tsconfig.json` is the source of truth for type checking; configure the IDE to use it** (Settings → Languages & Frameworks → TypeScript → "Use TypeScript service from: tsconfig"). The IDE's bundled service is a fast approximation; the compiler is the authority.
- **Keep the project references (`composite`, `references`) intact.** A monorepo with per-package `tsconfig.json` and root references gets full cross-package resolution; collapsing it into one config is a common way to break the build.
- **`strict` belongs in the base config, inherited by the packages** — not repeated per package, where one omission silently weakens a package.
- **TypeScript 7 (the Go port) is the current generation** and WebStorm 2026.2 supports it out of the box for projects already using it, with an upgrade path for projects on earlier versions. The speed difference is real, so the migration is worth planning rather than deferring indefinitely.
- **Path aliases (`paths`) must match the bundler,** and the alias must be configured in both the IDE and the bundler config. A mismatch is a "cannot resolve module" that is not a real error.
- **Never add a `// @ts-ignore` to silence the IDE** when the compiler disagrees; resolve the underlying type error the compiler reports.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"]
}
```

---

## 3. Frameworks

- **The framework plugins (React, Vue, Angular, Next.js) provide navigation the bundler does not** — routes, components, and props resolved from the actual framework config. Enable the one that matches the repo; they are not interchangeable.
- **Next.js support understands the App Router, Server Components, and the `params`/`searchParams` typing**, which is where most of the friction in a Next project lives.
- **A component's props come from its type, not from a hand-written interface,** when the framework plugin infers them; keep the type as the single source and let the plugin read it.
- **The built-in HTTP client and a database tool are available** for a full-stack app, and are the fastest way to confirm an API returns what the frontend expects before blaming the UI.

---

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

- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).
- **An excluded directory is invisible to every inspection, refactoring, and search** — a frequent cause of "the IDE is wrong" reports in a monorepo.
- **Settings are `This computer` or project-scoped**; anything shared belongs in a committed config file.
- **The Toolbox App manages installs and plugin engines**; two engines for the same plugin explain occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- `tsconfig.json` owns type checking; the IDE reads it, the compiler is the authority.
- Node interpreter and package manager match `.nvmrc`/`volta` and the lockfile.
- Keep `tsconfig` project references and `strict` inheritance intact in a monorepo.
- TypeScript 7 is supported and faster; plan the migration rather than deferring it.
- Debugger over `console.log`; generate source maps so breakpoints hit your source.
- Node CPU profiler for the server half, DevTools for the browser half.
- One formatter/linter from the repo, wired to the same scripts as CI.

---

## Quick-Start Checklist

- [ ] Node interpreter read from `.nvmrc`/`.node-version`/`volta`, matching CI
- [ ] Package manager aligned with the lockfile; `node_modules` state consistent
- [ ] TypeScript service set to the project's `tsconfig.json`
- [ ] `strict` in the base config, inherited by packages
- [ ] Monorepo project references (`composite`, `references`) intact
- [ ] `paths` aliases matched in both the IDE and the bundler config
- [ ] Source maps generated in dev builds so breakpoints hit source
- [ ] Framework plugin enabled for the repo's framework (React/Vue/Angular/Next)
- [ ] Prettier and ESLint configured to run the repo's binaries, Tailwind plugin matched
- [ ] ESLint flat config handled if the repo uses it
- [ ] Node CPU profiler verified on a real endpoint
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] `eslint.config.js`, `.prettierrc`, `tsconfig.json`, and lockfile committed
