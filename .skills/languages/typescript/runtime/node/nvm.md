---
name: nvm-best-practices
description: Best practices for managing Node.js versions with nvm — .nvmrc pinning, LTS policy, global package isolation, CI setup, and the systemd/production caveat. Use when pinning Node versions or fixing "wrong version" failures.
---

# nvm

nvm is a **shell function library** that installs each Node.js version into its own directory under `~/.nvm/versions/node/` and manipulates `PATH` to switch between them. That per-version isolation is the reason it works: two projects needing incompatible Node versions coexist on one machine without conflict. Practical nvm work is about **committing the version, defaulting to LTS, and knowing the two places it does not work** — production daemons and Windows shells.

_Verified against nvm 0.40.8 (Sept 2026), Node.js 24 "Krypton" (Active LTS) and Node 26 (Current). Alternatives: fnm, Volta, mise, asdf, nvm-windows._

---

## 1. Install

- **Install via the official script, not npm.** nvm is a shell library sourced from `nvm.sh`; the `nvm` npm package is deprecated and does not do this job.
- **Review the script before piping it to bash.** It edits your shell profile; that deserves a read, especially on a work machine.
- **nvm requires bash, zsh, or ksh.** It is not a binary and will not work from `sh`, from a Makefile, or from a non-interactive CI shell that has not sourced your profile.
- **On macOS, install the Xcode Command Line Tools first** (`xcode-select --install`) — the installer checks for `cc` and fails confusingly without it.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
```

- **Use `PROFILE=/dev/null` to stop it touching your shell config**, then add the source line yourself. This is the reliable path in a dotfiles-managed environment.
- **Verify it loaded in the current shell:** `source ~/.nvm/nvm.sh && nvm --version`. A new terminal is not required if you do this.
- **Check `$NVM_DIR` if the install lands somewhere odd.** It is set by the installer and used by every other tool in the chain.

---

## 2. Pinning Per Project

- **Commit a `.nvmrc` at the repo root.** This is the single highest-value thing nvm does: it makes the Node version a reviewable part of the codebase instead of tribal knowledge.
- **A major version (`24`) is usually better than an exact patch (`24.21.0`).** The major floats to the latest patch, so you get security fixes without a PR, and the file does not churn.
- **`lts/*` in `.nvmrc` means "latest LTS", not a fixed version.** It is good for an app and wrong for anything that needs reproducibility.
- **Monorepos: one `.nvmrc` at the root.** Put it in one place; per-package files invite drift.
- **The file may contain one value plus a trailing newline**; extra tokens and `#` comments are ignored. Do not write `node 24` — write `24`.

```bash
echo "24" > .nvmrc
nvm install          # reads .nvmrc, installs if missing
nvm use              # switches the current shell to .nvmrc
```

- **Always commit `.nvmrc` and the matching `engines` field** so CI and editors agree with the shell.
- **`nvm use` with no `.nvmrc` in scope exits `127`.** That is a feature — it means "you are in the wrong directory", not "nvm is broken".

---

## 3. LTS Policy

- **Target the Active LTS for anything long-lived.** As of this writing that is Node 24 ("Krypton"); Node 26 is Current and is not yet the LTS line.
- **Node majors become Active LTS in roughly October of their release year and Maintenance LTS the following April**, then EOL after ~30 months. Check the release schedule before choosing.
- **Do not run production on Current.** You get unreleased behaviour and a support cliff on a schedule you do not control.
- **Node 20 reached EOL in April 2026.** If you are still there, upgrading is a dependency-compatibility exercise, not a leap of faith — do it on a branch.
- **Prefer the LTS codename (`lts/krypton`) in `.nvmrc` only if you want the line, not the point release.** Most teams are better served by the major.

---

## 4. Daily Commands

```bash
nvm ls                # installed versions, current one marked
nvm ls-remote --lts   # available LTS lines, without installing
nvm current           # active version
nvm which 24          # absolute path to that binary
nvm run 22 jest       # run a command under 22 without switching
nvm exec 22 npm -v    # execute anything with 22's PATH
nvm alias default 24  # what a fresh shell starts on
nvm uninstall 20      # remove a version
nvm cache clear       # drop downloaded tarballs
```

- **`nvm run`/`nvm exec` beat switching when you need one command.** They leave your shell on the current version, so a `cd ..` after a test run does not silently change your toolchain.
- **nvm 0.40's `.nvmrc` fallback in `nvm run`/`nvm exec` is not reliable** when no `.nvmrc` resolves — it falls back to the active version. Pass an explicit version when the result matters.
- **`nvm ls-remote --lts` is the safe way to look at what exists** without installing anything.
- **Set `nvm alias default` deliberately.** An unset default means a new shell silently uses the newest installed version, which is how people end up on Node 26 by accident.

---

## 5. Global Packages

- **Global packages are per Node version, by design.** Something installed under 24 is invisible under 22. This is not a bug and not something to work around.
- **Do not rely on globals for project dependencies.** If a script needs it, put it in `devDependencies` and run it through the package manager.
- **`nvm install 24 --reinstall-packages-from=22` migrates them** — it reinstalls the old version's global list under the new one. Useful after a deliberate major upgrade.
- **Treat the global list as disposable tooling** (a CLI or two), not as a dependency graph. Anything load-bearing belongs in the lockfile.

```bash
npm ls -g --depth=0                  # what this version has
nvm install 24 --reinstall-packages-from=22
```

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
