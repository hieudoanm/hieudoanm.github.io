# RubyMine: Basic Usage

Best practices for working in RubyMine — Bundler as the dependency source, RVM/rbenv/mise interpreter selection, Rails plugins and generators, RSpec and Capybara, and the debugger. Use when setting up, debugging, or refactoring a Ruby or Rails project in RubyMine.

## Scenario

Use this example as a starting point when applying **ruby-mine-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Bundler** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ruby
# Gemfile
source "https://rubygems.org"
ruby "3.4.1"

gem "rails", "~> 8.0"
gem "pg", "~> 1.5"

group :development, :test do
  gem "rspec-rails"
  gem "capybara"
  gem "rubocop-rails-omakase", require: false
end
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
