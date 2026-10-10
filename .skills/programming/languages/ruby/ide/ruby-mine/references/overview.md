# Overview

Focused reference for **ruby-mine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# RubyMine

RubyMine is JetBrains' Ruby and Rails IDE, with a mature Rails plugin set: navigation for routes, models, and associations, Rails-aware generators, and a debugger that handles Ruby idioms well. Its main risk is **the IDE's Ruby environment drifting from the one Bundler installs**, which produces a project that behaves differently in the editor than in the terminal. Practical RubyMine work is about **letting Bundler own the gems, selecting the interpreter through a version manager, and keeping the Rails plugin reading the same app it will deploy**. Language rules live in ruby.md; Rails conventions live in rails.md.

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
