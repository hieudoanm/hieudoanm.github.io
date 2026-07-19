# Workflow notes

Focused reference for **webstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
