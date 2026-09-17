# Workflow notes

Focused reference for **nvm-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
