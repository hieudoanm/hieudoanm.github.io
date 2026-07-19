# Review checklist

Focused reference for **react-native-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Fetch API** — use fetch for network requests:

```typescript
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
```

- **Axios** — use Axios for advanced HTTP features:

```typescript
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
})
```

- **Async storage** — use AsyncStorage for local data:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.error('Error storing data:', error)
  }
}
```

---

## 10. Testing

- **React Native Testing Library** — test components:

```typescript
import { render, fireEvent } from '@testing-library/react-native'

test('increments counter', () => {
  const { getByText } = render(<Counter />)
  fireEvent.press(getByText('Increment'))
  expect(getByText('Count: 1')).toBeTruthy()
})
```

- **Detox for E2E testing** — use Detox for end-to-end testing:

```typescript
describe('Example', () => {
  beforeEach(async () => {
    await device.launchApp()
  })

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible()
  })
})
```

---

## 11. General Rules of Thumb

- **Platform conventions** — follow iOS and Android design guidelines
- **Performance first** — optimize lists, images, and rendering
- **TypeScript** — use TypeScript for type safety
- **Navigation** — use React Navigation for app navigation
- **State management** — choose appropriate state management solution
- **Platform-specific code** — handle platform differences elegantly
- **Testing** — test components and user interactions

---

## Quick-Start Checklist

- [ ] TypeScript enabled with strict mode
- [ ] Clear project structure with components/screens separation
- [ ] React Navigation for app navigation
- [ ] TypeScript interfaces for props and navigation
- [ ] Platform-specific code handled properly
- [ ] Performance optimization (FlatList, memoization)
- [ ] SafeAreaView for proper layout
- [ ] State management solution chosen
- [ ] API client configured
- [ ] Testing setup with React Native Testing Library
