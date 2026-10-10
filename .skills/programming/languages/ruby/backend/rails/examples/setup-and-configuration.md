# Rails Backend Best Practices: 3. Architecture & Design Rates

## Source guidance

This example applies the **3. Architecture & Design Rates** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Explicit boundaries:**
- Controllers (HTTP)
- Models (persistence & invariants)
- Services/Interactors (workflows)
- Jobs (async work)
- **Service objects over fat models** — when a workflow touches multiple models or has many steps, put it in a service object:
- **Policies over inline authorization** — `Pundit::Policy`/explicit policy objects rather than `if user.admin?` scattered in controllers.

## Example

This excerpt is from the cited **3. Architecture & Design Rates** section.

```ruby
class CreateUser
  def self.call(params)
    new(params).call
  end

  def initialize(params)
    @params = params
  end

  def call
    user.transaction do
      user.save!
      invite_email.deliver_later
    end
    user
  end
end
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for rails-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
