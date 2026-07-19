# Review checklist

Focused reference for **javascript-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

- **`package.json` with `"type": "module"`; pinned deps (`package-lock.json` committed).**
- **Lint (`eslint`) enforces the style; a formatter (`prettier`) removes bikeshedding.**
- **Tests default (`node:test`/vitest/jest) with the harness matching Node's runtime.**
- **Node versions engine-pinned (`engines`); CI builds + tests single-job first, faster later.**

---

## General Rules of Thumb

- **ESM + strict; JSDoc types where TS isn't used.**
- **`??`/`?.` over truthy traps; `Map`/`Set` for collections.**
- **async/await + explicit errors; `finally` cleanup; no silent catches.**
- **DOM: addEventListener, query once, avoid injected HTML.**
- **Lint + format + test; engine-pinned, lockfile committed.**

---

## Quick-Start Checklist

- [ ] ESM modules; strict mode; `"type": "module"` in package.json
- [ ] JSDoc public contracts; defaults/`??`; no `!x` truth traps
- [ ] async/await with `try/finally`; `.catch` handled at boundaries
- [ ] Domain error subclasses; validated inputs
- [ ] `addEventListener`; `textContent` over innerHTML for untrusted data
- [ ] ESLint + prettier; tests wired; engine pinned; lockfile committed
