---
name: angular-best-practices
description: Best practices for building web applications with Angular. Use when creating, structuring, or reviewing Angular applications — covers components, services, dependency injection, routing, state management, and performance.
---

# Angular Best Practices

Angular is a platform for building web applications. Best practice is to follow Angular's architecture patterns, use dependency injection properly, implement efficient change detection, and maintain clear separation of concerns.

---

## 1. Core Stack

- Angular **latest stable**
- TypeScript **strict mode**
- Angular CLI for tooling
- RxJS for reactive programming
- Angular Material for UI components

```bash
ng new my-app --strict
```

---

## 2. Project Structure

```text
src/
├── app/
│   ├── core/              # Singleton services
│   │   ├── services/
│   │   └── guards/
│   ├── features/          # Feature modules
│   │   ├── home/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── home.module.ts
│   │   └── user/
│   ├── shared/            # Shared components/pipes
│   │   ├── components/
│   │   ├── pipes/
│   │   └── directives/
│   └── app.module.ts
├── assets/
├── environments/
└── styles/
```

- **Feature modules** — organize by feature, not by type
- **Core module** — for singleton services and one-time-only imports
- **Shared module** — for reusable components, pipes, directives
- **Consistent naming** — follow Angular naming conventions

---

## 3. Components

- **Single Responsibility** — components should have one clear purpose:

```typescript
@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
    }
  `]
})
export class UserCardComponent {
  @Input() user!: User;
}
```

- **Smart vs Dumb components** — separate container components from presentational components
- **OnPush change detection** — use OnPush for better performance:

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent { }
```

- **Lifecycle hooks** — use lifecycle hooks appropriately:

```typescript
ngOnInit() {
  // Initialize component
}

ngOnDestroy() {
  // Clean up subscriptions
}
```

---

## 4. Services & Dependency Injection

- **Services for business logic** — keep business logic in services:

```typescript
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }
}
```

- **Dependency injection** — use constructor injection:

```typescript
constructor(
  private userService: UserService,
  private router: Router
) {}
```

- **Singleton services** — use `providedIn: 'root'` for singletons
- **Interface segregation** — keep services focused on single responsibilities

---

## 5. RxJS & Reactive Programming

- **Observables for async operations** — use Observables for HTTP calls:

```typescript
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}
```

- **Async pipe** — use async pipe in templates:

```html
<div *ngIf="users$ | async as users">
  <div *ngFor="let user of users">{{ user.name }}</div>
</div>
```

- **Operators** — use RxJS operators for data transformation:

```typescript
getUsersWithFilter(filter: string): Observable<User[]> {
  return this.http.get<User[]>('/api/users').pipe(
    map(users => users.filter(user => user.name.includes(filter))),
    catchError(error => of([]))
  );
}
```

- **Unsubscribe** — always unsubscribe from Observables:

```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.userService.getUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe(users => this.users = users);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

---

## 6. Routing

- **Lazy loading** — lazy load feature modules:

```typescript
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
  }
];
```

- **Route guards** — use guards for route protection:

```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    return this.authService.isAuthenticated();
  }
}
```

- **Route parameters** — handle route parameters properly:

```typescript
ngOnInit() {
  this.userId = this.route.snapshot.paramMap.get('id');
  this.loadUser(this.userId);
}
```

---

## 7. Forms

- **Reactive forms** — prefer reactive forms over template-driven forms:

```typescript
this.userForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]]
});
```

- **Form validation** — implement proper form validation:

```typescript
get name() { return this.userForm.get('name'); }
get email() { return this.userForm.get('email'); }

onSubmit() {
  if (this.userForm.valid) {
    this.userService.createUser(this.userForm.value);
  }
}
```

- **Custom validators** — create custom validators when needed:

```typescript
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;
    if (!email.includes('@')) {
      return { invalidEmail: true };
    }
    return null;
  };
}
```

---

## 8. State Management

- **Services for simple state** — use services for simple state management:

```typescript
@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state$ = new BehaviorSubject<User | null>(null);

  getState(): Observable<User | null> {
    return this.state$.asObservable();
  }

  setState(user: User): void {
    this.state$.next(user);
  }
}
```

- **NgRx for complex state** — use NgRx for complex state management:

```typescript
export const loadUsers = createAction('[User] Load Users');

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true }))
);
```

- **Signals** — use Angular Signals for reactive state (Angular 16+):

```typescript
count = signal(0);

increment() {
  this.count.update(value => value + 1);
}
```

---

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
