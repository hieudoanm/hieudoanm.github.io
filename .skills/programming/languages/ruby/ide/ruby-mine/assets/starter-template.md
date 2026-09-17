# RubyMine: Starter Template

A reusable starting point derived from the **2. Bundler** section of [RubyMine](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
