# Roadmap

Ordered from highest confidence / lowest effort to larger future work.

## Near term
- [ ] Package details pane: render description, homepage, dependencies, file locations.
- [ ] Per-package "Reinstall" and "Pin / Unpin" actions.
- [ ] Dependency graph / reverse-dependency view for a formula.
- [ ] Native uninstall (with `--zap` for casks) confirmation flow.
- [ ] Keyboard shortcuts and proper menu commands.

## Medium term
- [ ] Live progress / log streaming for long-running installs and upgrades.
- [ ] Taps management (list, add, remove custom taps).
- [ ] Interactive Services detail (pid, log paths, restart policy).
- [ ] Cache/cleanup tooling surface (`brew cleanup`, `brew doctor` output).

## Longer term
- [ ] Notifications when background auto-update finds outdated packages.
- [ ] Homebrew configuration editor (env vars, `HOMEBREW_*`).
- [ ] ARM vs Intel (Rosetta) awareness.
- [ ] Optional formula analytics toggle.

## Non-goals
- Replacing or reimplementing Homebrew's engine.
- Managing brew itself outside of running Homebrew.
- Telemetry or cloud sync.
