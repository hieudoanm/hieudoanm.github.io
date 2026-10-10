# Review checklist

Focused reference for **lynx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```typescript
import { Platform } from 'react-native'

const storage = Platform.OS === 'web'
  ? localStorage
  : AsyncStorage

await storage.setItem('key', 'value')
```

---

## 8. Testing

- **React Native Testing Library** — test components:

```typescript
import { render, fireEvent } from '@testing-library/react-native'

test('handles button press', () => {
  const { getByText } = render(<Button />)
  fireEvent.press(getByText('Click me'))
})
```

- **Web-specific testing** — test web-specific functionality:

```typescript
import { render, screen } from '@testing-library/react'

test('renders in web runtime', () => {
  render(<Component />)
  expect(screen.getByText('Content')).toBeInTheDocument()
})
```

---

## 9. General Rules of Thumb

- **Cross-platform first** — write code that works across platforms
- **Platform detection** — detect platform for platform-specific behavior
- **Web optimization** — optimize for web performance
- **React Native components** — use React Native components
- **State management** — use appropriate state management solution
- **Testing** — test both native and web functionality

---

## Quick-Start Checklist

- [ ] React Native components used consistently
- [ ] Platform detection for platform-specific code
- [ ] Web-specific optimizations implemented
- [ ] React Navigation for cross-platform navigation
- [ ] StyleSheet for cross-platform styling
- [ ] Web-specific CSS when needed
- [ ] Performance optimization for web
- [ ] Appropriate storage solution
- [ ] Testing setup for both platforms
- [ ] Responsive design for web
