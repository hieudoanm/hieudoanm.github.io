# nvm: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `nvm.sh` sourced in `~/.zshrc`/`~/.bashrc`, verified with `nvm --version` in a fresh shell
- [ ] `.nvmrc` committed at the repo root, holding a major version
- [ ] `engines.node` in `package.json` agrees with `.nvmrc`
- [ ] CI reads `.nvmrc` (or pins an explicit version) rather than `node`
- [ ] CI uses `actions/setup-node` or an explicit install, not a non-interactive `nvm`
- [ ] `nvm alias default` set to the LTS major
- [ ] No build relies on a global package; everything critical is in `devDependencies`

## Example

A team applying **Quick-Start Checklist** to a nvm project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `nvm.sh` sourced in `~/.zshrc`/`~/.bashrc`, verified with `nvm --version` in a fresh shell**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for nvm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
