# Implementation notes

Focused reference for **lynx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```typescript
import { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  )
}
```

- **Image optimization** — optimize images for web:

```typescript
import { Image } from 'react-native'

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 100, height: 100 }}
  resizeMode="cover"
/>
```

---

## 6. Styling

- **StyleSheet** — use StyleSheet for cross-platform styling:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
```

- **Web-specific CSS** — use CSS for web-specific styling:

```typescript
const styles = StyleSheet.create({
  container: {
    // React Native styles
    padding: 16,
    // Web-specific CSS
    '@media (min-width: 768px)': {
      padding: 32,
    },
  },
})
```

- **Responsive design** — implement responsive design for web:

```typescript
import { useWindowDimensions } from 'react-native'

function ResponsiveComponent() {
  const { width } = useWindowDimensions()
  const isTablet = width >= 768

  return (
    <View style={{ padding: isTablet ? 32 : 16 }}>
      {/* Content */}
    </View>
  )
}
```

---

## 7. State Management

- **Context API** — use Context for state management:

```typescript
const AppContext = createContext<AppContextType | null>(null)

export const AppProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState)
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  )
}
```

- **Local storage** — use appropriate storage for web:
