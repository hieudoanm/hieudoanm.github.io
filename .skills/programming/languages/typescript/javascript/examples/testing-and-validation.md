# JavaScript Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] ESM modules; strict mode; `"type": "module"` in package.json
- [ ] JSDoc public contracts; defaults/`??`; no `!x` truth traps
- [ ] async/await with `try/finally`; `.catch` handled at boundaries
- [ ] Domain error subclasses; validated inputs
- [ ] `addEventListener`; `textContent` over innerHTML for untrusted data
- [ ] ESLint + prettier; tests wired; engine pinned; lockfile committed

## Example

A team applying **Quick-Start Checklist** to a JavaScript Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] ESM modules; strict mode; `"type": "module"` in package.json**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for javascript-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
