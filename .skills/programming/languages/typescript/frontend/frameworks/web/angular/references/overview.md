# Overview

Focused reference for **angular-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
