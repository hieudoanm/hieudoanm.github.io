# Review checklist

Focused reference for **nvm-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

---

## 9. Common Pitfalls

- **Running `nvm` from `sh`, a Makefile, or a non-interactive shell**, where the function was never defined.
- **Using a production daemon on an nvm Node** — the service user cannot reach `~/.nvm`.
- **Depending on global packages** that exist only under one version.
- **No `.nvmrc`, or one holding an exact patch** that you then have to bump by hand forever.
- **Floating to `node` or Current** instead of the LTS line.
- **`.nvmrc` in a subdirectory of a monorepo** while CI reads the root one.
- **Trusting the `nvm run` fallback** when no `.nvmrc` resolved, in 0.40.
- **Piping the install script to bash without reading it** on a machine whose profile it will edit.
- **Running `nvm install` inside a Dockerfile**, making container boot depend on the network.
- **Leaving `nvm alias default` unset**, so fresh shells pick the newest version installed.
- **Node 20 past EOL (April 2026)** still in a service you have not revisited.

---

## General Rules of Thumb

- Commit a `.nvmrc` with a major version at the repo root; keep `engines` in step.
- Active LTS for anything durable; never Current in production.
- `.nvm` for local development, `setup-node` or a direct install in CI, a distribution or tarball for daemons.
- Project dependencies in `devDependencies`; globals for disposable CLI tools only.
- `nvm run`/`nvm exec` for one-off version switches instead of changing the shell.
- fnm, Volta, or mise if you want Node-only tooling to be faster or polyglot — pick one, never two.

---

## Quick-Start Checklist

- [ ] `nvm.sh` sourced in `~/.zshrc`/`~/.bashrc`, verified with `nvm --version` in a fresh shell
- [ ] `.nvmrc` committed at the repo root, holding a major version
- [ ] `engines.node` in `package.json` agrees with `.nvmrc`
- [ ] CI reads `.nvmrc` (or pins an explicit version) rather than `node`
- [ ] CI uses `actions/setup-node` or an explicit install, not a non-interactive `nvm`
- [ ] `nvm alias default` set to the LTS major
- [ ] No build relies on a global package; everything critical is in `devDependencies`
- [ ] Production daemon runs on a system-installed Node, with `PATH` set in the unit file
- [ ] Container images bake in Node instead of running `nvm install`
- [ ] Linux/macOS only — a Windows contributor has `fnm` or `nvm-windows` documented
- [ ] Not running Node 20 (EOL April 2026) on anything unmaintained
