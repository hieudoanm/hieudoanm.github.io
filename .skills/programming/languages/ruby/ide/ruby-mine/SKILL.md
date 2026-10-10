---
name: "ruby-mine-best-practices"
description: "Best practices for working in RubyMine — Bundler as the dependency source, RVM/rbenv/mise interpreter selection, Rails plugins and generators, RSpec and Capybara, and the debugger. Use when setting up, debugging, or refactoring a Ruby or Rails project in RubyMine."
tags:
  - "programming"
  - "language"
  - "ruby"
  - "ide"
  - "mine"
when_to_use: "Use when setting up, debugging, or refactoring a Ruby or Rails project in RubyMine."
prerequisites:
  - "Basic familiarity with Ruby and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../../typescript/ide/web-storm/SKILL.md"
  - "../../../php/ide/php-storm/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# RubyMine

RubyMine is JetBrains' Ruby and Rails IDE, with a mature Rails plugin set: navigation for routes, models, and associations, Rails-aware generators, and a debugger that handles Ruby idioms well. Its main risk is **the IDE's Ruby environment drifting from the one Bundler installs**, which produces a project that behaves differently in the editor than in the terminal. Practical RubyMine work is about **letting Bundler own the gems, selecting the interpreter through a version manager, and keeping the Rails plugin reading the same app it will deploy**. Language rules live in [ruby.md](../../SKILL.md); Rails conventions live in [rails.md](../../backend/rails/SKILL.md).

_Verified against RubyMine 2026.2.3 (September 2026) with Ruby 3.4 and Rails 8.x. Bundler 2.x, RSpec 3.x._

---

## 1. Editions & Project Setup

- **RubyMine is commercial, with free student, open-source, and 30-day trial licences.** No Community edition.
- **Select the interpreter through a version manager, not a hard-coded path** — RVM, rbenv, asdf, or mise. A path like `~/.rvm/rubies/ruby-3.4.1` in the IDE but `ruby` in the shell is a mismatch waiting to happen.
- **`.ruby-version` should be committed** and the IDE should honour it. Without it, the editor indexes one Ruby while CI runs another, and a version-specific construct looks invalid in the editor.
- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore`.
- **`vendor/bundle/` is ignored** when gems are installed into a project-local path; `Gemfile.lock` is committed for applications.

---

## 2. Bundler

- **Configure RubyMine's gem source as Bundler** (Settings → Languages & Frameworks → Ruby SDK and Gems → "Bundler"), so the IDE's gem list is what Bundler installed rather than the system gem set.
- **Run `bundle install` from the IDE's terminal or tool window**, so the lockfile and the indexed gem set move together.
- **`Gemfile.lock` drift is the "works locally" bug in its most common form:** a developer's lock is ahead of CI's, so a gem exists locally and is missing in production. Update the lock in the same commit as the `Gemfile`.
- **Do not add gems to the IDE by hand.** "Install missing gem" is convenient but produces an unrecorded `Gemfile` change; add it to the `Gemfile` and re-bundle instead.
- **`bundle exec` is the only correct way to run anything** — a bare `ruby` or `rails` may load a different gem set than the app will use in production.
- **`bin/` executables (Rails, rspec, rake) should be run through `bin/` or `bundle exec`**, and the IDE run configuration should use the same, so `PATH` differences cannot change behaviour.

```ruby
# Gemfile
source "https://rubygems.org"
ruby "3.4.1"

gem "rails", "~> 8.0"
gem "pg", "~> 1.5"

group :development, :test do
  gem "rspec-rails"
  gem "capybara"
  gem "rubocop-rails-omakase", require: false
end
```

---

## 3. Rails Plugin

- **The Rails plugin is the reason to use RubyMine for Rails** — it resolves routes, models, associations, and migrations into real navigation instead of grep.
- **The plugin reads the actual application,** so an unresolved constant or a broken association is a real error; start the app or run the relevant spec to confirm rather than trusting a stale index.
- **Use the plugin's generators (`Rails → Generate`) which write files and the Gemfile entries together,** rather than running `rails generate` in a terminal and then telling the IDE about it.
- **Autoloading follows Zeitwerk:** a constant must live at the path its name implies. The plugin's "cannot resolve constant" hint is usually a genuine naming or path problem, not an index staleness issue.
- **Partial and view resolution depends on the app's paths,** so an unusual view directory that works in the terminal can look unresolved in the IDE until the Rails support is enabled for the project.

---

## 4. Testing

- **Configure RSpec as the test runner** (Settings → Languages & Frameworks → Ruby SDK and Gems → RSpec), so the IDE's test view and `rspec` produce the same output and the same coverage attribution.
- **Run tests through `bundle exec rspec` and the IDE's RSpec runner interchangeably** — the rootdir must match `.rspec`/`spec_helper.rb`, or examples silently do not appear.
- **Capybara specs need the right driver and server:** a system spec that passes in the terminal but not in the IDE usually means a different driver (rack_test vs selenium) or a missing `RAILS_ENV`.
- **A test that is not discovered is a green suite that proves nothing** — check the IDE's test count against `rspec --dry-run` before trusting a clean run.
- **SimpleCov writes `coverage/`** — ignore it; do not commit it.

---

## 5. Debugging & Profiling

- **RubyMine's debugger is genuinely good for Ruby,** handling blocks, `method_missing`, and RSpec well. Use it for logic rather than sprinkling `puts`.
- **Set a conditional breakpoint for the "works for me" case,** and use "Evaluate Expression" in a meaningful frame rather than where the error surfaced.
- **Attach to a running Rails process** for anything request-shaped, since a debugger-launched server is not the one under real load.
- **The memory/allocations view is available but the better production answer is `stackprof` or `ruby-prof` on a real workload** — a debug-instrumented process changes its own timings, so compare relative costs rather than absolute numbers.
- **Break on raised exceptions for errors inside the framework,** where the visible backtrace is many frames downstream of the cause.

---

## 6. Code Style & Quality

- **Use the repo's RuboCop** (Settings → Languages & Frameworks → Ruby SDK and Gems → RuboCop), so the IDE's inspections match `rubocop` in CI. The built-in Ruby style is fine as a default but must not fight the committed config.
- **Set the code style to the project's (Rails omakase, Standard, or a `.rubocop.yml`)** and commit `.rubocop.yml`; the IDE should be a view of it, not a second opinion.
- **Pre-commit hooks belong in the repo**, not the IDE's commit dialog.
- **Frozen string literal comments, naming, and idiom inspections** should be enforced by the shared config, not by an inspection severity nobody else sees.

---

## 7. JetBrains Shared Conventions

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
