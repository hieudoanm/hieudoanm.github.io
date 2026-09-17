# WebStorm: Workflow Checklist

A practical run sheet for applying [WebStorm](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Node: **WebStorm is commercial, with free student, open-source, and 30-day trial licences.** No Community edition
- [ ] 1. Editions & Node: **The Node interpreter must match the repo's version.** Let it read .nvmrc, .node-version, or volta from package.json; a hard-coded path or a system Node is how the IDE debugs a runtime you do not ship
- [ ] 2. TypeScript Project Config: **tsconfig.json is the source of truth for type checking; configure the IDE to use it** (Settings → Languages & Frameworks → TypeScript → "Use TypeScript service from: tsconfig"). The IDE's bundled service is a fast approximation; the compiler is the authority
- [ ] 2. TypeScript Project Config: **Keep the project references (composite, references) intact.** A monorepo with per-package tsconfig.json and root references gets full cross-package resolution; collapsing it into one config is a common way to break the build
- [ ] 3. Frameworks: **The framework plugins (React, Vue, Angular, Next.js) provide navigation the bundler does not** — routes, components, and props resolved from the actual framework config. Enable the one that matches the repo; they are not interchangeable
- [ ] 3. Frameworks: **Next.js support understands the App Router, Server Components, and the params/searchParams typing**, which is where most of the friction in a Next project lives
- [ ] 4. Debugging & Profiling: **Use the JavaScript debugger, not console.log.** Conditional breakpoints, watches, and the async stack view handle a call stack console.log cannot reproduce
- [ ] 4. Debugging & Profiling: **Break on uncaught exceptions and on caught ones selectively** — the "paused on exception" setting is a first-class debugging tool for a stack you cannot otherwise follow
- [ ] 5. Code Style & Quality: **Configure the formatter and linter from the repo's config** — Prettier for format, ESLint for lint — and let the IDE run the repo's binaries rather than its own reimplementation, so the editor and pnpm format produce identical output
- [ ] 5. Code Style & Quality: **Prettier's Tailwind plugin sorts classes; the IDE must use the same plugin and config** or every file reorders on the next format

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
