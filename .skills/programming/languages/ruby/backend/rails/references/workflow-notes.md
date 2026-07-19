# Workflow notes

Focused reference for **rails-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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

- **Policies over inline authorization** — `Pundit::Policy`/explicit policy objects rather than `if user.admin?` scattered in controllers.
- **Use events or notifications to decouple flows** — `ActiveSupport::Notifications`, or Rails 7.1+ framework notifications for cross-cutting concerns.
- **Avoid anemic models _and_ god models** — find the right split between persistence shell and fat object; extract values/workflows to POROs.

---

## 4. Organizing Beyond `app/models`

- **Not everything in `app/models`** — when complexity grows, organize by feature/domain:

```text
app/
  controllers/
  models/
  services/          # PORO workflows
  policies/
  jobs/
  mailers/
  domain/            # feature-scoped objects when warranted
```

- **Rails is an application framework, not the domain** — the domain logic should survive outside Rails if ever needed; keep framework calls at the edges.
- Let conventions carry the simple case; extract structure deliberately, not early.

---

## 5. Active Record Discipline

- **Eager-load deliberately; avoid N+1** — `includes`/`preload` balanced against query size:

```ruby
users = User.where(active: true).includes(:posts)
```

- **Know eager vs lazy loading** — default understanding of when AR loads collections and why.
- **Freeze constants where appropriate** — configuration arrays/hashes `freeze`d or via `config`.
- **Explicit unified transactions** — `Model.transaction` for multi-step writes, not implicit saves:

```ruby
Order.transaction do
  order.save!
  payment.record!
end
```
