# Implementation notes

Focused reference for **nvm-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

---

## 6. CI

- **Non-interactive shells do not load `nvm`.** `npm ci` in a pipeline on a bare image needs nvm sourced explicitly or Node installed by other means.
- **The most robust CI shape is an explicit install, not nvm**: download the version your `.nvmrc` names and put it on `PATH`. nvm in CI adds shell state for no benefit.
- **If you do use nvm in CI, pin the tag**: `nvm install 24` and then `nvm use 24` — never `nvm install node`, which is Current and will change under you.
- **Cache `~/.nvm` if you must use it**; the download is the slow part.
- **Read the version from `.nvmrc` rather than duplicating it in the workflow.** Two sources of truth is how CI and laptops diverge.

```yaml
- uses: actions/setup-node@v4
  with:
    node-version-file: .nvmrc
- run: npm ci
```

- **`actions/setup-node` is usually the right answer for GitHub Actions** — it caches, it is fast, and it needs no shell state.

---

## 7. Production & Daemons

- **nvm installs into `~/.nvm`, so a systemd service running as another user cannot see it.** This is the single most common "works locally, 502 in production" cause in a Node project.
- **Never run a production daemon off an nvm-installed Node.** Install Node from the distribution's repository, NodeSource, or a tarball into a system path.
- **Pin the daemon's Node with a `PATH=` in the unit file**, and verify with `systemctl show -p Environment` rather than assuming.
- **A container image should bake in the Node binary**, never run `nvm install` at start-up — it adds a network dependency to every boot.
- **nvm has no unattended-upgrade story.** Whoever owns the machine owns Node patching, on whatever cadence they choose.

```ini
[Service]
ExecStart=/usr/bin/node /srv/app/server.js
Environment=PATH=/usr/local/bin:/usr/bin:/bin
```

---

## 8. Alternatives

- **fnm** — a Rust binary, much faster than nvm, shell-agnostic, and reads `.nvmrc`. The best default if you are starting fresh and want identical tooling across macOS and Linux.
- **Volta** — pins Node *and* the package manager per project via `volta` fields in `package.json`. Excellent if you dislike a separate `.nvmrc`; weaker in CI because Volta is another binary to install.
- **mise** (formerly rtx) — polyglot runtime manager covering Node, Ruby, Go, and more, reading `.tool-versions`. Choose it when the team already juggles several runtimes; nvm is Node-only.
- **asdf** — the original polyglot plugin manager. Solid, but slower and its ecosystem predates mise.
- **nvm-windows** — a completely separate implementation for native Windows shells. `nvm use` semantics differ, and the profile-hook approach does not exist there.
- **Do not mix nvm with Volta or mise for Node.** Both rewrite `PATH` and which one wins is a source of intermittent "wrong version" bugs.
