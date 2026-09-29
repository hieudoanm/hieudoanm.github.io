# 🤖 Agents

Entry point for coding agents in this repo. This file is the **router, not the rulebook**. It holds
only the conventions that hold across every language, and points at the directories that hold
everything else.

| Directory   | Holds                                           | Consult when                                          |
| ----------- | ----------------------------------------------- | ----------------------------------------------------- |
| `.agents/`  | Personas and change-type workflows              | Starting a task — adopt a persona, then a workflow    |
| `.skills/`  | Technology playbooks, one file per technology   | Writing, reviewing or debugging code in a given stack |
| `examples/` | Runnable multi-file configs (Docker, CI, nginx) | You need a working artifact, not a pasted snippet     |
| `packages/` | The pnpm + turbo workspace                      | Building, testing, or running anything                |

Indexes: [`.agents/TREE.md`](./.agents/TREE.md) · [`.skills/TREE.md`](./.skills/TREE.md)

---

## How to work here

1. **Adopt a persona** — it fixes identity, priorities, boundaries and the quality bar.
2. **Follow a workflow** — it fixes the phases and the Definition of Done for the change type.
3. **Consult the matching skill** — it owns the stack's conventions, idioms and pitfalls.
4. **Ground it in reality** — read `examples/` and the surrounding code before inventing a pattern.

Never restate a convention that a skill already owns. If a rule is missing from a skill, add it to the
skill instead of duplicating it here. This file stays under 200 lines for the same reason code does:
a rule an agent has to hunt for is a rule it will not apply.

---

## 📐 Coding Convention

Language-agnostic. Stack-specific rules live in [`.skills/`](./.skills/TREE.md).

1. **`Explicit types > Implicit`** — TypeScript types, Rust annotations, Python hints, Kotlin
   signatures. A signature tells more than a hundred lines of body.
2. **`Flat over deeply nested`** — Shallow trees, short functions, minimal indentation. Callback hell
   and 5-level `if` pyramids exhaust a context window faster than anything else.
3. **`Self-documenting identifiers`** — `getUserById(id)` needs no comment; `processData(x)` needs one.
   Name the what and the why, never the how.
4. **`Don't repeat yourself`** — When a pattern appears 15 times across files, an agent will handle 14
   of them and miss the 15th. Centralise it.
5. **`Small, focused files`** — One responsibility per file. **Functions ≤ 30 lines**, because an
   agent's reasoning degrades past ~2000 tokens and a 30-line function stays visible next to its
   callers. **Files ≤ 200 lines** — beyond that, tracing data flow between distant sections becomes
   guesswork. If you have to scroll to see a whole function, it is too long.
6. **`Explicit error handling`** — `if (err) return Err(...)` rather than silent propagation. Agents
   must see the error path to handle it.
7. **`Test names as documentation`** — `test("returns 404 when user not found")` reads faster than the
   implementation.
8. **`Consistent import structure`** — Group by origin: stdlib, third-party, internal. Agents infer
   the dependency graph from import blocks alone.
9. **`Prefer pure functions with explicit dependencies`** — Take inputs as parameters, return outputs;
   no globals or singletons. Return values are the single source of truth; mutations hide their impact.
10. **`Conventional project layouts`** — `src/`, `cmd/`, `internal/`, `tests/`. Agents locate files by
    convention instead of scanning build configs.

---

## 🔀 Stack → skill

Open the playbook before writing code in a stack. Never carry conventions between stacks by memory.

| Stack                        | Skill                                                                                                                                                                                                                                                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bash                         | [bash.md](./.skills/languages/bash/bash.md)                                                                                                                                                                                                                                                             |
| Go · CLI                     | [golang.md](./.skills/languages/go/golang.md) · [cobra.md](./.skills/languages/go/cli/cobra.md)                                                                                                                                                                                                         |
| Kotlin · web/CLI/UI          | [kotlin.md](./.skills/languages/kotlin/kotlin.md) · [ktor.md](./.skills/languages/kotlin/backend/ktor.md) · [clikt.md](./.skills/languages/kotlin/cli/clikt.md) · [compose.md](./.skills/languages/kotlin/ui/compose.md) · [material-design-m3.md](./.skills/languages/kotlin/ui/material-design-m3.md) |
| Python · data                | [python.md](./.skills/languages/python/python.md) · [pandas.md](./.skills/languages/python/data/analyst/pandas.md)                                                                                                                                                                                      |
| Rust · CLI/web/desktop       | [rust.md](./.skills/languages/rust/rust.md) · [clap.md](./.skills/languages/rust/cli/clap.md) · [axum.md](./.skills/languages/rust/backend/axum.md) · [tauri.md](./.skills/languages/rust/ui/tauri.md)                                                                                                  |
| Swift · CLI/UI               | [swift.md](./.skills/languages/swift/swift.md) · [swift-argument-parser.md](./.skills/languages/swift/cli/swift-argument-parser.md) · [swiftui.md](./.skills/languages/swift/ui/swiftui.md)                                                                                                             |
| C++ · Qt                     | [cpp.md](./.skills/languages/cpp/cpp.md) · [qt.md](./.skills/languages/qml/ui/qt.md)                                                                                                                                                                                                                    |
| TypeScript · web/testing     | [typescript.md](./.skills/languages/typescript/typescript.md) · [testing](./.skills/languages/typescript/testing/) · [web frameworks](./.skills/languages/typescript/frontend/frameworks/web/)                                                                                                          |
| Docker · Compose · Makefile  | [docker.md](./.skills/devops/docker/docker.md) · [docker-compose.md](./.skills/devops/docker/docker-compose.md) · [makefile.md](./.skills/devops/makefile/makefile.md)                                                                                                                                  |
| Databases · messaging · SaaS | [database/](./.skills/database/) · [events/](./.skills/events/) · [saas/](./.skills/saas/)                                                                                                                                                                                                              |

Skills follow one shape: `name`/`description` frontmatter, numbered sections, bolded rules, then a
`Quick-Start Checklist`. Match that shape when you add one. Several skills are written against a
specific major version — read the intro before trusting an example.

---

## 🔄 SDLC

| Phase    | Adopt                                                                                                 | Output                                                                                                   |
| -------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Planning | [product-owner](./.agents/persona/product/product-owner.md)                                           | Outcomes and a prioritised backlog; items small enough to accept                                         |
| Analysis | [business-analyst](./.agents/persona/product/business-analyst.md)                                     | Given/When/Then criteria with explicit assumptions                                                       |
| Design   | [architect](./.agents/persona/solution/architect.md) · [design](./.agents/persona/solution/design.md) | Trade-offs recorded, existing patterns favoured over silent shortcuts                                    |
| Develop  | [senior](./.agents/persona/engineer/senior.md) or [lead](./.agents/persona/engineer/lead.md)          | The change, per its [workflow](./.agents/workflows/), against the skill rules above                      |
| Test     | [senior](./.agents/persona/engineer/senior.md)                                                        | Tests that encode the contract; unit locally per change, integration across boundaries and failure paths |
| Review   | [lead](./.agents/persona/engineer/lead.md)                                                            | Correctness, contracts and scope; the workflow's DoD confirmed                                           |
| Deliver  | [scrum-master](./.agents/persona/delivery/scrum-master.md)                                            | Cadence, blockers and the release train                                                                  |

---

## 📦 Workspace

A pnpm workspace (`packages/**`) driven by turbo. `pnpm-workspace.yaml` also pins `allowBuilds` for
native modules and `overrides` for transitive deps — change those, not the lockfile.

| Path                  | Contents                                                          |
| --------------------- | ----------------------------------------------------------------- |
| `packages/app`        | Next.js web app, plus `headless`, `hybrid`, `native` variants     |
| `packages/cli`        | Command-line tooling (`jack`), with a `bash` variant              |
| `packages/data`       | Data projects (`github`, `world.bank`, `machine-learning`, …)     |
| `packages/extensions` | Browser and VS Code extensions                                    |
| `packages/modules`    | Shared libraries (`api`, `css`, `frontend`, `lodash`, `chess`, …) |
| `packages/watch`      | Device integrations (`garmin`)                                    |
| `examples/`           | Runnable configs — see below                                      |

**Commands** (turbo fans these out across the workspace; `test` is serialised to avoid port clashes):

```bash
pnpm dev          # watch mode          pnpm lint        # lint
pnpm build        # production build    pnpm typecheck   # types only
pnpm test         # full test suite     pnpm format      # write
```

---

## 🧪 Examples

[`examples/`](./examples/) holds **runnable multi-file artifacts**, not snippets — the things a skill
cannot inline. Prefer a skill snippet for a pattern; prefer `examples/` when you need a whole file to
copy or a stack to actually run.

| Path                       | Contains                                                            |
| -------------------------- | ------------------------------------------------------------------- |
| `examples/docker/compose/` | Per-database stacks (Postgres, Cassandra, HBase, CouchDB, Kafka, …) |
| `examples/docker/file/`    | Production Dockerfiles per language and per server (nginx, HAProxy) |
| `examples/ci/`             | GitHub Actions and Jenkins pipelines per language                   |

When you add one, keep the path shape and link it from the relevant skill. When you find a skill whose
"quick start" should really be a working stack, add the artifact rather than growing the playbook —
playbooks are capped at 200 lines for a reason.

---

## ✅ Definition of Done

- [ ] Persona adopted, workflow followed, its DoD met
- [ ] Matching skills consulted; no convention invented against them
- [ ] Functions ≤ 30 lines, files ≤ 200 lines
- [ ] Error paths explicit and tested
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test` green
- [ ] No secrets; no unrelated churn in the diff
- [ ] Any missing convention added to the right skill, not to this file
