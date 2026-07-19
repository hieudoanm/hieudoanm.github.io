# Review checklist

Focused reference for **ruby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
