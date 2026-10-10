# Implementation notes

Focused reference for **monolith-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
