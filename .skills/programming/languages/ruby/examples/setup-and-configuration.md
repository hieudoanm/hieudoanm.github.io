# Ruby Best Practices: 1. Object Model & Message Passing

## Source guidance

This example applies the **1. Object Model & Message Passing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Objects answer messages; methods are contracts** — design around `send`-style intent, but never rely on it in prod paths:
- **`attr_reader` default, `attr_writer`/`attr_accessor` only deliberately** — public state surface is a decision.
- **`private` for helpers; `protected` for same-class collaborations; never `class << self` surprises for plain class methods (`def self.` reads better).**
- **`def initialize` with keyword arguments (`name:`) as the value contract** — positional for private/internal seams.
- **`Struct`/`Data` for plain data carriers** when a full class is overkill:

## Example

```ruby
User = Data.define(:name, :email)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for ruby-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
