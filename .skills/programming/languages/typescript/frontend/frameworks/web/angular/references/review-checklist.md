# Review checklist

Focused reference for **angular-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 9. Performance

- **OnPush change detection** — use OnPush for better performance
- **TrackBy in ngFor** — use trackBy for efficient list rendering:

```html
<div *ngFor="let user of users; trackBy: trackByUserId">
  {{ user.name }}
</div>
```

```typescript
trackByUserId(index: number, user: User): number {
  return user.id;
}
```

- **Lazy loading** — lazy load feature modules and components
- **Virtual scrolling** — use CDK virtual scroll for long lists:

```html
<cdk-virtual-scroll-viewport itemSize="50">
  <div *cdkVirtualFor="let item of items">{{ item.name }}</div>
</cdk-virtual-scroll-viewport>
```

---

## 10. Testing

- **Unit tests** — test components and services:

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should get users', () => {
    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
    });

    const req = httpMock.expectOne('/api/users');
    req.flush([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
  });
});
```

- **Integration tests** — test component interactions
- **E2E tests** — use Protractor or Cypress for end-to-end testing

---

## 11. General Rules of Thumb

- **Single Responsibility** — each component/service should have one clear purpose
- **Dependency Injection** — use constructor injection
- **Reactive programming** — use RxJS for async operations
- **OnPush change detection** — use OnPush for better performance
- **Lazy loading** — lazy load feature modules
- **TypeScript** — use TypeScript strict mode
- **Testing** — write comprehensive tests

---

## Quick-Start Checklist

- [ ] Angular CLI with strict mode enabled
- [ ] Feature-based project structure
- [ ] OnPush change detection strategy
- [ ] Constructor injection for dependencies
- [ ] RxJS for async operations
- [ ] Reactive forms for form handling
- [ ] Lazy loading for feature modules
- [ ] TrackBy for ngFor loops
- [ ] Services for business logic
- [ ] Comprehensive testing setup
