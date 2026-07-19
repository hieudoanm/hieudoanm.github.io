# Overview

Focused reference for **nvm-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
