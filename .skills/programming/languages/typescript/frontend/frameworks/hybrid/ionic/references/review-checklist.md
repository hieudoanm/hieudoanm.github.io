# Review checklist

Focused reference for **ionic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Ionic Storage** — use Ionic Storage for local data:

```typescript
import { Storage } from '@ionic/storage'

const storage = new Storage()
await storage.create()

await storage.set('name', 'John')
const name = await storage.get('name')
```

- **Secure storage** — use secure storage for sensitive data:

```typescript
import { SecureStorage } from '@ionic-native/secure-storage'

const secureStorage = new SecureStorage()
await secureStorage.set('token', 'my-token')
```

---

## 10. Testing

- **Ionic Testing** — test Ionic components:

```typescript
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders home page', () => {
  render(<App />)
  expect(screen.getByText('Home')).toBeInTheDocument()
})
```

- **E2E testing** — use Detox or Appium for E2E testing
- **Unit testing** — test services and business logic

---

## 11. General Rules of Thumb

- **Ionic components** — use Ionic's pre-built components
- **Platform conventions** — follow iOS and Material Design guidelines
- **Capacitor for native** — use Capacitor for native functionality
- **State management** — choose appropriate state management solution
- **Performance** — optimize for mobile performance
- **Theming** — use Ionic's theming system

---

## Quick-Start Checklist

- [ ] Ionic CLI with TypeScript
- [ ] Ionic components used consistently
- [ ] Ionic Router for navigation
- [ ] Capacitor for native functionality
- [ ] State management solution chosen
- [ ] Platform-specific handling
- [ ] Performance optimization techniques
- [ ] Ionic theming configured
- [ ] Storage solution implemented
- [ ] Testing setup configured
