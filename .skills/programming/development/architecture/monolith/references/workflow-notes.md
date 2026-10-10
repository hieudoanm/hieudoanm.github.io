# Workflow notes

Focused reference for **monolith-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Database Design

- **Single database** — typically one database for the entire application
- **Schema organization** — organize tables by domain:

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

- **Transaction management** — use transactions for data consistency
- **Database indexing** — optimize for common queries
- **Data migration** — implement proper migration strategy

---

## 5. API Design

- **RESTful API** — design RESTful endpoints:

```typescript
// User endpoints
GET    /api/users          // List users
GET    /api/users/:id      // Get user by ID
POST   /api/users          // Create user
PUT    /api/users/:id      // Update user
DELETE /api/users/:id      // Delete user

// Order endpoints
GET    /api/orders         // List orders
GET    /api/orders/:id     // Get order by ID
POST   /api/orders         // Create order
PUT    /api/orders/:id     // Update order
```

- **Versioning** — implement API versioning
- **DTOs** — use Data Transfer Objects for API contracts
- **Validation** — validate input at API boundaries
- **Error handling** — consistent error responses

---

## 6. Scalability Strategies

- **Vertical scaling** — scale up by adding more resources
- **Horizontal scaling** — scale out by adding more instances
- **Load balancing** — use load balancers for horizontal scaling
- **Caching** — implement caching strategies:

```typescript
// Application-level caching
const cache = new Map<string, any>();

async function getUser(id: string): Promise<User> {
  if (cache.has(id)) {
    return cache.get(id);
  }

  const user = await userRepository.findById(id);
  cache.set(id, user);
  return user;
}
```
