# Implementation notes

Focused reference for **ruby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ruby
begin
  result = risky!(input)
rescue NetworkError => e
  Rails.logger.warn("network: #{e.message}")
  retry if retries_left?
end
```

- **Rethrow with `raise e` preserves origin; `raise` re-raises the current exception** — never `raise RuntimeError.new(e.message)` (loses class + trace).
- **`ensure` for guaranteed cleanup (file/connection release).**
- **No empty rescue blocks** — convert, log, or rethrow; never silently continue.

---

## 6. OOP Design & Dependency Injection

- **Constructor injection for collaborators** — no global/class-level mutable state:

```ruby
class ReportService
  def initialize(repo = UserRepository.new, formatter: ReportFormatter.new)
    @repo = repo
    @formatter = formatter
  end
end
```

- **Program to duck-typed roles, not concrete classes** — pass objects that respond to the needed messages (testable fakes by default).
- **Modules (`include`/`extend`/`prepend`) for cross-cutting behavior** — keep inheritance depth ≤ 2.
- **`sealed_class`-style discipline**: use `frozen` classes + factory constructors when a set of variants is closed.
- **Interfaces over monkey-patching third parties** — wrap external APIs in adapter objects you own.

---

## 7. Style & Conventions

- **RuboCop**: the style contract — `bin/rubocop` enforcement in CI:

```ruby
# .rubocop.yml baseline: Layout, Style, Lint families on default config
```

- **Semantic naming** — `find_active_user(id)` over `getUser(1)`; predicate methods end in `?` (`active?`), mutators in `!` for the dangerous version.
- **Small methods over long chains** — a method body beyond ~10 lines with branching is a refactor signal.
- **One class per file; files small; requires grouped (stdlib, third-party, internal).**
- **The keystone convention**: readable code beats clever code — the reviewer should trace data without a debugger.

---

## 8. Testing

- **RSpec (or Minitest) on behavior** — contracts for success, failure, validation, not-found and edge sizes:

```ruby
RSpec.describe UserService do
  describe "#find!" do
    it "raises when the user is missing" do
      expect { service.find!(999) }.to raise_error(UserNotFound)
    end
  end
end
```

- **Fakes at constructor seams over mock-everything** — `let(:repo) { fake_repo }` injection keeps tests honest.
- **`subject`/`described_class` for focus; `shared_examples` for cross-class contracts.**
- **Deterministic** — `Random` seeds, no sleeps, no ambient env; freeze time with timecop-style helpers.
- **Run `bin/rspec` + `bin/rubocop` before "done"** — a red suite is a fail-fast signal.
