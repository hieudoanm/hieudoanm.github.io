# Implementation notes

Focused reference for **oclif-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
import { ux } from '@oclif/core';

ux.action.start('Fetching');
await load(); // >300ms op
ux.action.stop('done');
```

---

## 6. Errors & Exit Codes

- **`this.error(msg, { exit: 2 })` / `this.warn`** are the _only_ ways to signal failures in a command — they print to stderr, set the exit code, and flush properly:

```ts
if (!(await exists(key))) {
  this.error(
    `key "${key}" not found — run 'app config list' to see available keys`,
    { exit: 2 }
  );
}
```

- **`this.catch(err)`** overrides the default error path for translating exceptions into actionable messages (never rethrow a raw `TypeError` as a command failure if you can explain it).
- **Use `exit: 2` for usage-type errors (wrong flags/args) and `exit: 1` for runtime failures**; distinguish only where callers need to branch.
- **`simple: { shift: 1 }`-style pretty printing for unexpected errors enabled globally** — unexpected failures should read as a bug report, not a stack dump mid-table.

---

## 7. Plugins & Team Boundaries

- **Ship capability groups as oclif plugins** (`@oclif/plugin-help`, `plugin-plugins`, `plugin-version` are the framework's own) — a team owns the code and the commands it exposes; the app composes plugins.
- **Write commands as `export default class`** so plugin packaging (`@oclif/test` harness + `eslint-config-oclif`) works across projects.
- **`topics` in plugin config** describe the domain surface; command discovery happens at runtime, so new plugin commands show up in help/completion automatically.
- **Keep plugins focused** — a plugin is a release and a help surface; one idea per plugin, shared services via the plugin's public API.

---

## 8. Testing
