# RubyMine: Validation Plan

Use this plan to verify work guided by [RubyMine](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Ruby and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Configure RSpec as the test runner** (Settings → Languages & Frameworks → Ruby SDK and Gems → RSpec), so the IDE's test view and rspec produce the same output and the same coverage attribution
- [ ] **Run tests through bundle exec rspec and the IDE's RSpec runner interchangeably** — the rootdir must match .rspec/spec_helper.rb, or examples silently do not appear
- [ ] **Capybara specs need the right driver and server:** a system spec that passes in the terminal but not in the IDE usually means a different driver (rack_test vs selenium) or a missing RAILS_ENV
- [ ] **A test that is not discovered is a green suite that proves nothing** — check the IDE's test count against rspec --dry-run before trusting a clean run
- [ ] **SimpleCov writes coverage/** — ignore it; do not commit it
- [ ] **Use the repo's RuboCop** (Settings → Languages & Frameworks → Ruby SDK and Gems → RuboCop), so the IDE's inspections match rubocop in CI. The built-in Ruby style is fine as a default but must not fight the committed config
- [ ] **Set the code style to the project's (Rails omakase, Standard, or a .rubocop.yml)** and commit .rubocop.yml; the IDE should be a view of it, not a second opinion
- [ ] **Pre-commit hooks belong in the repo**, not the IDE's commit dialog
- [ ] **Frozen string literal comments, naming, and idiom inspections** should be enforced by the shared config, not by an inspection severity nobody else sees

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
