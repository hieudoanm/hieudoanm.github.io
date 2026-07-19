# Workflow notes

Focused reference for **ruby-mine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Configure RubyMine's gem source as Bundler** (Settings → Languages & Frameworks → Ruby SDK and Gems → "Bundler"), so the IDE's gem list is what Bundler installed rather than the system gem set.
- **Run `bundle install` from the IDE's terminal or tool window**, so the lockfile and the indexed gem set move together.
- **`Gemfile.lock` drift is the "works locally" bug in its most common form:** a developer's lock is ahead of CI's, so a gem exists locally and is missing in production. Update the lock in the same commit as the `Gemfile`.
- **Do not add gems to the IDE by hand.** "Install missing gem" is convenient but produces an unrecorded `Gemfile` change; add it to the `Gemfile` and re-bundle instead.
- **`bundle exec` is the only correct way to run anything** — a bare `ruby` or `rails` may load a different gem set than the app will use in production.
- **`bin/` executables (Rails, rspec, rake) should be run through `bin/` or `bundle exec`**, and the IDE run configuration should use the same, so `PATH` differences cannot change behaviour.

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

---

## 3. Rails Plugin

- **The Rails plugin is the reason to use RubyMine for Rails** — it resolves routes, models, associations, and migrations into real navigation instead of grep.
- **The plugin reads the actual application,** so an unresolved constant or a broken association is a real error; start the app or run the relevant spec to confirm rather than trusting a stale index.
- **Use the plugin's generators (`Rails → Generate`) which write files and the Gemfile entries together,** rather than running `rails generate` in a terminal and then telling the IDE about it.
- **Autoloading follows Zeitwerk:** a constant must live at the path its name implies. The plugin's "cannot resolve constant" hint is usually a genuine naming or path problem, not an index staleness issue.
- **Partial and view resolution depends on the app's paths,** so an unusual view directory that works in the terminal can look unresolved in the IDE until the Rails support is enabled for the project.

---

## 4. Testing

- **Configure RSpec as the test runner** (Settings → Languages & Frameworks → Ruby SDK and Gems → RSpec), so the IDE's test view and `rspec` produce the same output and the same coverage attribution.
- **Run tests through `bundle exec rspec` and the IDE's RSpec runner interchangeably** — the rootdir must match `.rspec`/`spec_helper.rb`, or examples silently do not appear.
- **Capybara specs need the right driver and server:** a system spec that passes in the terminal but not in the IDE usually means a different driver (rack_test vs selenium) or a missing `RAILS_ENV`.
- **A test that is not discovered is a green suite that proves nothing** — check the IDE's test count against `rspec --dry-run` before trusting a clean run.
- **SimpleCov writes `coverage/`** — ignore it; do not commit it.
