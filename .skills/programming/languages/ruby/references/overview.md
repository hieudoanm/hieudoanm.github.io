# Overview

Focused reference for **ruby-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
