# WebStorm: 2. TypeScript Project Config

## Scenario

A project is working on **2. typescript project config** for WebStorm. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`tsconfig.json` is the source of truth for type checking; configure the IDE to use it** (Settings → Languages & Frameworks → TypeScript → "Use TypeScript service from: tsconfig"). The IDE's bundled service is a fast approximation; the compiler is the authority.
- **Keep the project references (`composite`, `references`) intact.** A monorepo with per-package `tsconfig.json` and root references gets full cross-package resolution; collapsing it into one config is a common way to break the build.
- **`strict` belongs in the base config, inherited by the packages** — not repeated per package, where one omission silently weakens a package.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. TypeScript Project Config** section of [SKILL.md](../SKILL.md).
