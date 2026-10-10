# Workflow notes

Focused reference for **jsr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **JSR publishes TS/JS source (compiled at use) — no build artifact worship:**

```text
mod.ts            # public entry
lib/*.ts          # modules
mod_test.ts       # tests peer entry (excluded from publish)
```

- **Explicit `publish.exclude` keeps tests/docs private to the package.**
- **Dependency specifiers `jsr:` (other JSR) or `npm:` (npm interop) both valid — JSR resolves at install.**

---

## 3. Runtime Compatibility

- **Target runtime deltas tested: Deno (default), Node (`node:` modules), Browser (no `Deno.` globals):**
- **Guard feature-detects (`typeof Deno !== "undefined"`) at the seams; avoid unconditional `Deno.*` in public entry.**
- **`npx -y jsr publish --dry-run` for the guard check; `deno task check` before any release.**

---

## 4. Publishing & CI

- **Publish idempotent from CI on tags:**
