# Workflow notes

Focused reference for **cqrs-pattern**, excerpted from SKILL.md. The skill file remains the canonical guide.

```typescript
class CommandBus {
  private handlers = new Map<string, CommandHandler>()

  registerHandler(commandType: string, handler: CommandHandler): void {
    this.handlers.set(commandType, handler)
  }

  async execute(command: Command): Promise<void> {
    const handler = this.handlers.get(command.type)
    if (!handler) {
      throw new Error(`No handler for ${command.type}`)
    }
    await handler.handle(command)
  }
}
```

---

## 4. Query Implementation

- **Query objects** — define queries as read operations:

```typescript
interface Query {
  type: string
  parameters: any
}

class GetUserQuery implements Query {
  type = 'GetUser'
  parameters: {
    userId: string
  }
}
```

- **Query handlers** — implement query handlers:

```typescript
class GetUserHandler {
  constructor(private readRepository: UserReadRepository) {}

  async handle(query: GetUserQuery): Promise<UserReadModel> {
    return this.readRepository.findById(query.parameters.userId)
  }
}
```

- **Query bus** — implement query bus for routing:

```typescript
class QueryBus {
  private handlers = new Map<string, QueryHandler>()

  registerHandler(queryType: string, handler: QueryHandler): void {
    this.handlers.set(queryType, handler)
  }

  async execute(query: Query): Promise<any> {
    const handler = this.handlers.get(query.type)
    if (!handler) {
      throw new Error(`No handler for ${query.type}`)
    }
    return handler.handle(query)
  }
}
```

---

## 5. Read Model Optimization

- **Denormalized data** — design read models for specific queries:

```typescript
interface UserReadModel {
  id: string
  email: string
  name: string
  orderCount: number
  totalSpent: number
  lastOrderDate: Date
}
```

- **Materialized views** — create materialized views for complex queries:

```sql
CREATE MATERIALIZED VIEW user_order_summary AS
SELECT
  u.id,
  u.email,
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent,
  MAX(o.created_at) as last_order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email, u.name;
```

- **Caching** — implement caching for frequently accessed data:
