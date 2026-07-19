# Implementation notes

Focused reference for **jsr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```bash
npx jsr publish --allow-dirty    # newer versions ask clean tree
```

- **`deno publish` with `--token`/login flow; CI secrets host the JSR token.**

```yaml
- run: npx jsr publish
  env:
    JSR_TOKEN: ${{ secrets.JSR_TOKEN }}
```

- **Version bump + tag aligned (`v1.2.3` ↔ package version); CI is the only publisher.**

---

## 5. Consuming JSR

- **Consumers add via `jsr add @myorg/lib` (Deno) or `npx jsr add @myorg/lib` for Node-style:**

```ts
import { thing } from "jsr:@myorg/lib";   // Deno specifier
import { thing } from "npm:@myorg/lib";   // Node interop via npm-compat
```

- **Lock-graph (`deno.lock`/package-lock) covers JSR deps — integrity verified at install.**
- **Version ranges follow `@std` conventions (JSR versions in the specifier).**
