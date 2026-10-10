# Bun Runtime Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] TS executed natively — no pre-compile step in the dev loop
- [ ] `Bun.serve` with routed fetch handler; `server.stop()` graceful shutdown
- [ ] `Bun.file` for streaming/range file responses; `Bun.write` for one-shots
- [ ] `Bun.$` shell interpolation (no `child_process` string-squashing)
- [ ] `bun:test` + `bun test --coverage`; native TS in tests
- [ ] `bun install` + committed lockfile; workspaces for monorepos
- [ ] `bun run --watch` for dev; `--compile` single-binary distribution where appropriate

## Example

A team applying **Quick-Start Checklist** to a Bun Runtime Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] TS executed natively — no pre-compile step in the dev loop**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for bun-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
