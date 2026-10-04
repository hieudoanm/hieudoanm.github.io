---
name: ruby-best-practices
description: Best practices for writing Ruby — the language conventions for Ruby 3 applications and tooling. Use when writing, structuring, or reviewing Ruby — covers object model, immutability, blocks, nil safety, error handling, OOP design, testing, and tooling.
---

# Ruby Best Practices

Ruby is an expressive, message-passing language where reads-like-prose matters as much as behavior. Practical Ruby leans on **immutability + freeze and explicit nil handling via safe navigation, blocks for composition, and a disciplined object model** — `attr_reader`/`private` over monkey-patching, classes that receive dependencies explicitly. The standard library and gems provide the ecosystem; **RuboCop + RSpec are the review gates**.

---

## 1. Object Model & Message Passing

- **Objects answer messages; methods are contracts** — design around `send`-style intent, but never rely on it in prod paths:

```ruby
class User
  attr_reader :name, :email

  def initialize(name:, email:)
    @name = name
    @email = email
  end
end
```

- **`attr_reader` default, `attr_writer`/`attr_accessor` only deliberately** — public state surface is a decision.
- **`private` for helpers; `protected` for same-class collaborations; never `class << self` surprises for plain class methods (`def self.` reads better).**
- **`def initialize` with keyword arguments (`name:`) as the value contract** — positional for private/internal seams.
- **`Struct`/`Data` for plain data carriers** when a full class is overkill:

```ruby
User = Data.define(:name, :email)
```

---

## 2. Immutability & Freeze

- **Prefer immutable values; `freeze` what shouldn't change** — frozen containers can't be silently mutated from another stack frame:

```ruby
DEFAULT_OPTIONS = { retries: 3, timeout: 30 }.freeze
```

- **`#dup`/`#clone` before mutation of shared config** — a mutable default is the classic shared-state bug.
- **Constants are a contract** — reuse or reference, but never reassign or mutate from callerland.
- **Strings are mutable in Ruby** — use frozen string literals (`# frozen_string_literal: true`) as the project default:

```ruby
# frozen_string_literal: true
```

- **Returning a frozen copy at API edges** prevents callers from corrupting internal state.

---

## 3. Blocks, Enumerables & Composition

- **Methods that yield use blocks with `yield` or `&block`** — blocks are the idiomatic composition tool:

```ruby
def with_retry(times: 3, &block)
  times.times do |attempt|
    begin
      return yield
    rescue TransientError
      sleep(0.1 * attempt) if attempt.positive?
    end
  end
  raise "retries exhausted"
end
```

- **Enumerable over hand-rolled loops** — `map`, `select`, `reduce`, `each_with_object`, `group_by`:

```ruby
scores = users.filter_map { |u| u.score if u.active? }.sum
```

- **`filter_map`/`tally`/`compact` over post-loop compaction; `each_with_object` for accumulator objects.**
- **`&:method` shorthand only when the method needs no args** — a probe with arguments reads clearer as an explicit block.
- **Keep blocks small** — a block over ~6 lines is a method in hiding; extract with `then`/named extraction.

---

## 4. Nil Safety & Required Values

- **Safe navigation `&.` and `||`/`nil?` for defaulting:**

```ruby
city = user&.address&.city || "unknown"
```

- **`Hash#dig`/`Array#dig` for nested data without `if a && a[:b] && a[:b][:c]`:**

```ruby
region = payload.dig(:user, :prefs, :region)
```

- **`fetch(key, default)` over `[]` for Hash reads with a guaranteed fallback** — and `Hash#fetch` raises with `raise`-less clarity.
- **Constructor params `required:`/positional required raise early** — never ship a half-built object that must rely on later mutation.
- **`nil` is data** when absence is a real state; prefer explaining it in the type/api over returning `""` placeholders.

---

## 5. Error Handling

- **Exceptions for genuine failures; custom exception classes per domain**:

```ruby
class UserNotFound < StandardError; end

def find!(id)
  record = find(id)
  raise UserNotFound, "user #{id} missing" unless record
  record
end
```

- **`begin/rescue/else/ensure` with narrow rescue classes** — `rescue StandardError` in prod is a smell; `rescue => e` only at the true boundary for conversion:

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

---

## 9. Async, Threads & Concurrency

- **Ruby threads share memory** — a mutex/`Queue`/`Channel` for shared state; never grow into optimistic lock forgetfulness:

```ruby
queue = Queue.new
threads = workers.times.map { |i| Thread.new { process(queue) } }
work.each { |job| queue << job }
threads.each(&:join)
```

- **`Thread` yields the GVL for I/O; heavy CPU needs workers/processes (`fork`/sidekiq-style concurrency).**
- **Fiber/coroutines (`Fiber`) for cooperative concurrency only where the model fits.**
- **Prefer background-job queues (`Sidekiq`, `GoodJob`) for latency-tolerant work** over in-process threads at scale — restart survivability and backpressure.

---

## 10. Tooling & Project Structure

- **Bundler + gemfile.lock** — a project is a reproducible environment:

```bash
bundle install
bundle exec rspec
```

- **`bin/` scripts for the dev gates** (`bin/setup`, `bin/test`, `bin/lint`) — conventions a colleague discovers by `ls bin`.
- **Explicit Ruby version pinning** (`.ruby-version` + gemspec/Dockerfile).
- **Consistent project layout** (Rails conventional or a documented alternative) so files land where the team expects.
- **Secrets via env, never code; `dotenv` only for local dev.**

---

## General Rules of Thumb

- **Reads-like-prose**: semantic names, predicate `?`, mutator `!`, small methods.
- **Immutable by default; freeze shared constants; dup before mutating.**
- **Blocks/Enumerable compose; loops are a smell.**
- **`&.`/`dig`/`fetch` for nil-safe unwrapping; `nil` modeled, not hidden.**
- **Dependencies injected at construction; classes stay small and single-purpose.**
- **RuboCop + RSpec are part of "done".**

---

## Quick-Start Checklist

- [ ] `attr_reader` + `private` discipline; `Data.define` for plain data
- [ ] `# frozen_string_literal: true`; frozen constants; dup-before-mutate
- [ ] Blocks/Enumerable (`map`/`select`/`reduce`/`filter_map`) over loops
- [ ] `&.`/`dig`/`fetch` for safe unwrapping; required keywords at construction
- [ ] Domain exception classes; narrow rescues; `ensure` cleanup; no empty rescues
- [ ] Constructor injection; duck-typed roles; no global mutable state
- [ ] RuboCop clean; small semantic methods; one class per file
- [ ] RSpec contract tests; fakes at seams; deterministic
- [ ] `bin/` scripts for setup/test/lint; version pinned; secrets via env