# Implementation notes

Focused reference for **angular-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
