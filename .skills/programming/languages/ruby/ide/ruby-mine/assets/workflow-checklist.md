# RubyMine: Workflow Checklist

A practical run sheet for applying [RubyMine](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Editions & Project Setup: **RubyMine is commercial, with free student, open-source, and 30-day trial licences.** No Community edition
- [ ] 1. Editions & Project Setup: **Select the interpreter through a version manager, not a hard-coded path** — RVM, rbenv, asdf, or mise. A path like ~/.rvm/rubies/ruby-3.4.1 in the IDE but ruby in the shell is a mismatch waiting to happen
- [ ] 2. Bundler: **Configure RubyMine's gem source as Bundler** (Settings → Languages & Frameworks → Ruby SDK and Gems → "Bundler"), so the IDE's gem list is what Bundler installed rather than the system gem set
- [ ] 2. Bundler: **Run bundle install from the IDE's terminal or tool window**, so the lockfile and the indexed gem set move together
- [ ] 3. Rails Plugin: **The Rails plugin is the reason to use RubyMine for Rails** — it resolves routes, models, associations, and migrations into real navigation instead of grep
- [ ] 3. Rails Plugin: **The plugin reads the actual application,** so an unresolved constant or a broken association is a real error; start the app or run the relevant spec to confirm rather than trusting a stale index
- [ ] 4. Testing: **Configure RSpec as the test runner** (Settings → Languages & Frameworks → Ruby SDK and Gems → RSpec), so the IDE's test view and rspec produce the same output and the same coverage attribution
- [ ] 4. Testing: **Run tests through bundle exec rspec and the IDE's RSpec runner interchangeably** — the rootdir must match .rspec/spec_helper.rb, or examples silently do not appear
- [ ] 5. Debugging & Profiling: **RubyMine's debugger is genuinely good for Ruby,** handling blocks, method_missing, and RSpec well. Use it for logic rather than sprinkling puts
- [ ] 5. Debugging & Profiling: **Set a conditional breakpoint for the "works for me" case,** and use "Evaluate Expression" in a meaningful frame rather than where the error surfaced

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
