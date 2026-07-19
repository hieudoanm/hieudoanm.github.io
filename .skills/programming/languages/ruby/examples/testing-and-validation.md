# Ruby Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **RSpec (or Minitest) on behavior** — contracts for success, failure, validation, not-found and edge sizes:
- **Fakes at constructor seams over mock-everything** — `let(:repo) { fake_repo }` injection keeps tests honest.
- **`subject`/`described_class` for focus; `shared_examples` for cross-class contracts.**
- **Deterministic** — `Random` seeds, no sleeps, no ambient env; freeze time with timecop-style helpers.
- **Run `bin/rspec` + `bin/rubocop` before "done"** — a red suite is a fail-fast signal.

## Example

```ruby
RSpec.describe UserService do
  describe "#find!" do
    it "raises when the user is missing" do
      expect { service.find!(999) }.to raise_error(UserNotFound)
    end
  end
end
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for ruby-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
