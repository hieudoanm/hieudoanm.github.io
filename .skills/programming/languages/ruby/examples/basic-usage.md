# Ruby Best Practices: Basic Usage

Best practices for writing Ruby — the language conventions for Ruby 3 applications and tooling. Use when writing, structuring, or reviewing Ruby — covers object model, immutability, blocks, nil safety, error handling, OOP design, testing, and tooling.

## Scenario

Use this example as a starting point when applying **ruby-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Object Model & Message Passing** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ruby
class User
  attr_reader :name, :email

  def initialize(name:, email:)
    @name = name
    @email = email
  end
end
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
