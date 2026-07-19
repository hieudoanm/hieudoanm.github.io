# Overview

Focused reference for **deno-runtime**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Deno Runtime Best Practices

Deno is a secure-by-default TypeScript-first runtime: modules come from URLs/JSR, permissions are granted explicitly per-run, everything standard ships in the runtime and `deno_std`, and the toolchain (`fmt`, `lint`, `test`, `doc`, `compile`) is built in. Best practice here is embracing that model — sandboxed permissions as a feature, URL/JSR modules without `node_modules`, Web-standard APIs by default, and letting the built-in tools be the gates.

---

## 1. Secure by Default (Permissions)

- **No implicit network, filesystem, or environment access** — the runtime starts sandboxed; grant only what the program needs:

```bash
deno run --allow-net=api.example.com src/main.ts    # allow network, scoped to one origin
deno run --allow-net --allow-read=./config src/main.ts
```

| Permission      | Grants                                   | Prefer scoping                                 |
| --------------- | ---------------------------------------- | ---------------------------------------------- |
| `--allow-net`   | Outbound socket/HTTP                     | `--allow-net=<host>` to a known allowlist      |
| `--allow-read`  | Read the filesystem                      | `--allow-read=<path>` (dir or glob)            |
| `--allow-write` | Write the filesystem                     | `--allow-write=<path>` for the specific dir    |
| `--allow-env`   | Read `Deno.env`                          | `--allow-env=KEY1,KEY2` for the named variables |
| `--allow-run`   | Spawn child processes                    | Avoid if possible; treat as high-risk          |
| `--deny-*`      | Explicit forbidden capability (belt+braces) | Combined with `--allow-*` for strictness     |

- **`deno run --check`/`deno check`** type-checks as it runs — the compiler is part of execution, not a separate step.
- **Prompt as a fallback, not the default** — use `--allow-all`/`-A` only for trusted internal scripts, never for apps parsing external input.

---

## 2. Modules & Dependencies
