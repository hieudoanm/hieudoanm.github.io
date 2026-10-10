# Monolithic Architecture Best Practices: Starter Template

A reusable starting point derived from the **4. Database Design** section of [Monolithic Architecture Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```sql
-- User domain
users (id, email, password_hash, created_at)
user_profiles (user_id, first_name, last_name)

-- Order domain
orders (id, user_id, status, total, created_at)
order_items (id, order_id, product_id, quantity, price)

-- Payment domain
payments (id, order_id, amount, status, created_at)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
