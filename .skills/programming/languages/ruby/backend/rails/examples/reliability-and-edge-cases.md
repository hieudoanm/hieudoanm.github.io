# Rails Backend Best Practices: 6. Performance, Memory & Safety

## Source guidance

This example applies the **6. Performance, Memory & Safety** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Be mindful of N+1, eager/lazy loading, and object allocations** in request paths — measure before optimizing.
- **Use caching intentionally** — fragment caching, low-level caching (`Rails.cache.fetch`) over re-computation:
- **Avoid premature optimization** — clarity first, cache/profile only where data shows need.
- **Validate input early** — strong parameters + model validations; `permit` at the controller boundary.
- **Escape output appropriately** — ERB auto-escapes; be deliberate in JSON/API responses and `raw`.
- **Freeze constants; avoid allocation in hot loops.**

## Example

```ruby
Rails.cache.fetch("users/#{id}/profile", expires_in: 10.minutes) do
  expensive_serialization(user)
end
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for rails-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
