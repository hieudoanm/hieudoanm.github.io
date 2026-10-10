# Implementation notes

Focused reference for **bun-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Testing (bun:test)

- **`bun test` + `bun:test`** is a Jest-compatible runner with zero config — `describe`/`it`/`expect`, `beforeEach`/`afterEach`, mocks/spies, and TS native:

```ts
import { test, expect, mock } from "bun:test";

const read = mock(() => "v");
test("reads the value", () => {
    expect(read()).toBe("v");
    expect(read).toHaveBeenCalledTimes(1);
});
```

- **`bun test --coverage` for reports** (built-in coverage provider, no extra dependency); watch mode via `bun test --watch`.
- **Test the service boundary with real `Bun.serve` on a random port** (`Bun.serve({ port: 0 })` → `server.url`) for honest integration tests — spin-up is fast enough that dockerizing every test isn't needed for small services.

---

## 6. The Package Manager

- **`bun install` is faster than `pnpm` similarly-committed setups** and produces a binary `bun.lock` — but committing either a `bun.lock`/`bun.lockb` file — whichever you choose — is the reproducibility contract.
- **Workspaces** in `package.json` are supported ([`"workspaces": ["packages/*"]`]) for monorepos; `bun add`/`bun add -d` for dependency changes.
- **Scripts**: `bun run dev` runs `dev` scripts; Bun runs package.json `bin`/lifecycle scripts without `npx`.
- **`native` Node deps work** (Bun maintains Node.js API compat), but check `node:`-requiring libs on `bun` if you hit a compat edge — prefer pure-JS/`bun:`-native alternatives where availability matters.

---

## 7. Tooling & Distribution
