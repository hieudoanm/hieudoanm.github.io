# Review checklist

Focused reference for **ruby-mine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).
- **An excluded directory is invisible to every inspection, refactoring, and search.**
- **Settings are `This computer` or project-scoped**; anything shared belongs in a committed config file.
- **The Toolbox App manages installs and plugin engines**; two engines for the same plugin explain occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- Version manager selects the interpreter; `.ruby-version` is committed; the IDE honours it.
- Bundler owns the gems; never add a gem in the IDE or install to the system set.
- `Gemfile.lock` committed for applications, updated in the same commit as the `Gemfile`.
- Run everything through `bundle exec` / `bin/`; a bare `rails` may load a different gem set.
- The Rails plugin reads the real app; a "cannot resolve constant" is usually Zeitwerk, not index staleness.
- RSpec configured with the right rootdir; verify the discovered test count matches the CLI.
- RuboCop from the repo in the IDE; hooks in the repo, not the commit dialog.

---

## Quick-Start Checklist

- [ ] Interpreter selected via RVM/rbenv/asdf/mise, `.ruby-version` committed
- [ ] Gem source set to Bundler in the IDE
- [ ] `bundle install` run through the IDE so lockfile and gem set agree
- [ ] `Gemfile.lock` committed for the app; `vendor/bundle/` and `coverage/` ignored
- [ ] Every run/exec via `bundle exec` or `bin/`
- [ ] Rails plugin enabled; generators used from the IDE where they update the `Gemfile`
- [ ] Zeitwerk path/constant mismatches resolved rather than suppressed
- [ ] RSpec configured as the test runner, rootdir matching `.rspec`
- [ ] Capybara driver and `RAILS_ENV` verified for system specs
- [ ] Test count cross-checked against `rspec --dry-run`
- [ ] RuboCop configured from the committed `.rubocop.yml`
- [ ] Debugger used for logic; `stackprof`/`ruby-prof` for performance on a real workload
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
