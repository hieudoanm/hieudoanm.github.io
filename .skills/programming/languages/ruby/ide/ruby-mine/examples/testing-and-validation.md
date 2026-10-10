# RubyMine: 4. Testing

## Scenario

A project is working on **4. testing** for RubyMine. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Configure RSpec as the test runner** (Settings → Languages & Frameworks → Ruby SDK and Gems → RSpec), so the IDE's test view and `rspec` produce the same output and the same coverage attribution.
- **Run tests through `bundle exec rspec` and the IDE's RSpec runner interchangeably** — the rootdir must match `.rspec`/`spec_helper.rb`, or examples silently do not appear.
- **Capybara specs need the right driver and server:** a system spec that passes in the terminal but not in the IDE usually means a different driver (rack_test vs selenium) or a missing `RAILS_ENV`.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Testing** section of [SKILL.md](../SKILL.md).
