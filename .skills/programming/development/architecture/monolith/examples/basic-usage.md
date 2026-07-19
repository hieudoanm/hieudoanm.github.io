# Monolithic Architecture Best Practices: Basic Usage

Best practices for designing and implementing monolithic applications. Use when planning, structuring, or reviewing monolithic architecture — covers module organization, scalability, maintainability, and evolution strategies.

## Scenario

Use this example as a starting point when applying **monolith-architecture** to a small, representative task. It demonstrates the pattern shown in the skill’s **4. Database Design** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
