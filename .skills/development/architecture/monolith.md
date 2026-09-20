---
name: monolith-architecture
description: Best practices for designing and implementing monolithic applications. Use when planning, structuring, or reviewing monolithic architecture — covers module organization, scalability, maintainability, and evolution strategies.
---

# Monolithic Architecture Best Practices

Monolithic architecture is a traditional software design where the application is built as a single, unified unit. Best practice is to structure monoliths with clear module boundaries, implement proper separation of concerns, and design for eventual evolution into microservices if needed.

---

## 1. Core Principles

- **Single deployment unit** — entire application deployed as one unit
- **Shared database** — typically uses a single database
- **Clear module boundaries** — well-defined interfaces between modules
- **Layered architecture** — presentation, business, and data layers
- **Evolutionary design** — structure for potential future decomposition

---

## 2. Project Structure

```text
my-monolith/
├── src/
│   ├── presentation/       # API/UI layer
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   ├── dto/
│   │   │   └── middleware/
│   │   └── web/
│   │       └── views/
│   ├── business/          # Business logic layer
│   │   ├── services/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── value-objects/
│   │   │   └── repositories/
│   │   └── use-cases/
│   ├── infrastructure/    # External dependencies
│   │   ├── database/
│   │   ├── external-apis/
│   │   ├── messaging/
│   │   └── caching/
│   └── shared/            # Shared utilities
│       ├── utils/
│       └── config/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── config/
```

- **Layered architecture** — clear separation between layers
- **Domain-driven design** — organize around business domains
- **Dependency rules** — dependencies point inward
- **Module boundaries** — well-defined interfaces between modules

---

## 3. Module Organization

- **Domain modules** — organize by business domain:

```text
business/
├── user/
│   ├── entities/
│   ├── services/
│   ├── repositories/
│   └── dto/
├── order/
│   ├── entities/
│   ├── services/
│   ├── repositories/
│   └── dto/
└── payment/
    ├── entities/
    ├── services/
    ├── repositories/
    └── dto/
```

- **Shared kernel** — common functionality shared across domains
- **Bounded contexts** — clear boundaries between business contexts
- **Interface segregation** — modules depend on abstractions, not implementations

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

- **Database optimization** — optimize database queries and indexes
- **Async processing** — use message queues for long-running tasks

---

## 7. Maintainability

- **Code organization** — follow consistent naming conventions
- **Documentation** — document architecture and design decisions
- **Testing** — comprehensive testing strategy:

```typescript
// Unit tests
describe('UserService', () => {
  it('should create user', async () => {
    const user = await userService.create(userData);
    expect(user).toBeDefined();
  });
});

// Integration tests
describe('User API', () => {
  it('should create user via API', async () => {
    const response = await request(app).post('/api/users').send(userData);
    expect(response.status).toBe(201);
  });
});
```

- **Logging** — implement structured logging
- **Monitoring** — monitor application health and performance

---

## 8. Evolution to Microservices

- **Modular monolith** — structure for eventual decomposition:

```typescript
// Define clear module boundaries
interface UserModule {
  createUser(data: UserData): Promise<User>;
  getUser(id: string): Promise<User>;
}

interface OrderModule {
  createOrder(data: OrderData): Promise<Order>;
  getOrder(id: string): Promise<Order>;
}
```

- **Database per service** — prepare for database separation
- **API boundaries** — define clear API boundaries
- **Gradual migration** — migrate incrementally

---

## 9. Security

- **Authentication** — implement authentication mechanism
- **Authorization** — implement role-based access control
- **Input validation** — validate all input
- **Secure communication** — use HTTPS
- **Secrets management** — manage secrets securely

---

## 10. Deployment

- **Containerization** — use Docker for consistent deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

- **CI/CD** — implement continuous integration and deployment
- **Environment configuration** — manage environment-specific configuration
- **Health checks** — implement health check endpoints

---

## 11. General Rules of Thumb

- **Clear module boundaries** — define and respect module boundaries
- **Layered architecture** — maintain clear separation between layers
- **Domain-driven design** — organize around business domains
- **Database optimization** — optimize database performance
- **Scalability planning** — plan for horizontal and vertical scaling
- **Evolutionary design** — design for potential future decomposition

---

## Quick-Start Checklist

- [ ] Layered architecture with clear boundaries
- [ ] Domain-driven organization
- [ ] RESTful API design
- [ ] Database schema organized by domain
- [ ] Caching strategy implemented
- [ ] Comprehensive testing
- [ ] Structured logging
- [ ] Monitoring and alerting
- [ ] Containerized deployment
- [ ] CI/CD pipeline
