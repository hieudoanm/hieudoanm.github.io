# Angular Best Practices: Basic Usage

Best practices for building web applications with Angular. Use when creating, structuring, or reviewing Angular applications — covers components, services, dependency injection, routing, state management, and performance.

## Scenario

Use this example as a starting point when applying **angular-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Components** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
