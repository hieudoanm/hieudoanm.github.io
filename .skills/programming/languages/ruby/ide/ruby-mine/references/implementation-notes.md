# Implementation notes

Focused reference for **ruby-mine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
