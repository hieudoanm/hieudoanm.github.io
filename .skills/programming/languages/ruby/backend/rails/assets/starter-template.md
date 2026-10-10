# Rails Backend Best Practices: Starter Template

A reusable starting point derived from the **7. Background Jobs & Async** section of [Rails Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ruby
class SendWelcomeEmailJob < ApplicationJob
  queue_as :default
  def perform(user_id)
    UserMailer.welcome(User.find(user_id)).deliver_now
  end
end
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
