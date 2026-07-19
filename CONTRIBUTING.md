# Contributing to hieudoanm.github.io

Thanks for contributing to the `hieudoanm.github.io` repository — the
organization's GitHub Pages site and pnpm workspace.

## Workspace

A pnpm workspace (`packages/**`) driven by Turborepo:

- `packages/app` — Next.js web app plus `headless`, `hybrid`, `native`
  variants.
- `packages/cli` — command-line tooling (`jack`), with a `bash` variant.
- `packages/data` — data projects.
- `packages/modules` — shared libraries.
- `packages/watch` — device integrations.
- `examples/` — runnable multi-file configs (Docker, CI, nginx).

## Setup

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd hieudoanm.github.io
pnpm install
```

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test     # serialised to avoid port clashes
pnpm build
pnpm format
```

Agent/metadata conventions live in [AGENTS.md](AGENTS.md); validate agent
metadata with `python3 .agents/scripts/validate.py` when touching `.agents/`
or `.skills/`.

## Conventions

- Explicit types over implicit; flat structures; functions ≤ 30 lines, files
  ≤ 200 lines.
- Consult the matching `.skills/` playbook before writing code in a stack —
  never carry conventions between stacks by memory.
- No secrets or personal data in examples or data projects.

## License

By contributing, you agree that your contributions will be licensed under the
repository license in [`LICENSE`](LICENSE).
