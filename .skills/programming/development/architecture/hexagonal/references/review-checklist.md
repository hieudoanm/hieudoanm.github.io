# Review checklist

Focused reference for **hexagonal-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Domain testing** — test domain logic without adapters:

```typescript
describe('User', () => {
  it('should create user with valid data', () => {
    const user = User.create('test@example.com', 'Test User')

    expect(user.getEmail()).toBe('test@example.com')
    expect(user.getName()).toBe('Test User')
  })

  it('should update user name', () => {
    const user = User.create('test@example.com', 'Test User')
    user.updateName('Updated Name')

    expect(user.getName()).toBe('Updated Name')
  })
})
```

- **Port testing** — test ports with mock adapters:

```typescript
describe('UserApplicationService', () => {
  it('should create user', async () => {
    const mockUserRepository = createMockUserRepository()
    const mockEmailService = createMockEmailService()
    const mockEventPublisher = createMockEventPublisher()

    const service = new UserApplicationService(
      mockUserRepository,
      mockEmailService,
      mockEventPublisher
    )

    const user = await service.createUser('test@example.com', 'Test User')

    expect(mockUserRepository.save).toHaveBeenCalledWith(user)
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith('test@example.com')
    expect(mockEventPublisher.publish).toHaveBeenCalled()
  })
})
```

- **Adapter testing** — test adapters with real dependencies:

```typescript
describe('UserRepositoryAdapter', () => {
  it('should save user to database', async () => {
    const mockDb = createMockDatabase()
    const adapter = new UserRepositoryAdapter(mockDb)

    const user = User.create('test@example.com', 'Test User')
    await adapter.save(user)

    expect(mockDb.users.insertOne).toHaveBeenCalledWith({
      id: user.getId(),
      email: user.getEmail(),
      name: user.getName(),
      createdAt: expect.any(Date)
    })
  })
})
```

---

## 9. General Rules of Thumb

- **Domain isolation** — keep domain logic isolated
- **Port interfaces** — define clear port interfaces
- **Adapter implementations** — implement adapters for external systems
- **Dependency inversion** — dependencies point inward
- **Testability** — make core logic easily testable
- **Single responsibility** — each adapter has one responsibility

---

## Quick-Start Checklist

- [ ] Domain entities and services defined
- [ ] Port interfaces defined
- [ ] Primary adapters implemented
- [ ] Secondary adapters implemented
- [ ] Application services implemented
- [ ] Dependency injection configured
- [ ] Domain unit tests written
- [ ] Port integration tests written
- [ ] Adapter tests written
- [ ] Dependency rules enforced
