# Workflow notes

Focused reference for **angular-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
