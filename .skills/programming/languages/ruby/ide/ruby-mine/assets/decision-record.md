# RubyMine: Decision Record

Use this record when applying [RubyMine](../SKILL.md) to a concrete project decision.

## Context

Best practices for working in RubyMine — Bundler as the dependency source, RVM/rbenv/mise interpreter selection, Rails plugins and generators, RSpec and Capybara, and the debugger. Use when setting up, debugging, or refactoring a Ruby or Rails project in RubyMine.

RubyMine is JetBrains' Ruby and Rails IDE, with a mature Rails plugin set: navigation for routes, models, and associations, Rails-aware generators, and a debugger that handles Ruby idioms well. Its main risk is **the IDE's Ruby environment drifting from the one Bundler installs**, which produces a project that behaves differently in the editor than in the terminal. Practical RubyMine work is about **letting Bundler own the gems, selecting the interpreter through a version manager, and keeping the Rails plugin reading the same app it will deploy**. Language rules live in ruby.md; Rails conventions live in rails.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Ruby and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Editions & Project Setup
- [ ] 2. Bundler
- [ ] 3. Rails Plugin
- [ ] 4. Testing
- [ ] 5. Debugging & Profiling
- [ ] 6. Code Style & Quality
- [ ] 7. JetBrains Shared Conventions
- [ ] General Rules of Thumb

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
