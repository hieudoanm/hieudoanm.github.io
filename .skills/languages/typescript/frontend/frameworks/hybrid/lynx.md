---
name: lynx-best-practices
description: Best practices for building applications with Lynx (React Native web runtime). Use when creating, structuring, or reviewing Lynx applications — covers components, navigation, web runtime integration, and performance.
---

# Lynx Best Practices

Lynx is a React Native-based web runtime that allows React Native applications to run in web browsers. Best practice is to write React Native code that works across platforms, handle web-specific differences, and optimize for web performance.

---

## 1. Core Stack

- Lynx **latest stable**
- React Native **latest stable**
- React **18+**
- TypeScript **strict mode**
- Web runtime for browser support

```bash
npm install @lynx-js/react-native
```

---

## 2. Component Structure

- **React Native components** — use React Native components that work across platforms:

```typescript
import { View, Text, StyleSheet } from 'react-native'

function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Card Title</Text>
      <Text style={styles.content}>Card content</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
  }
})
```

- **Platform-specific code** — handle platform differences:

```typescript
import { Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        maxWidth: '100%',
      },
      default: {
        width: '100%',
      },
    }),
  },
})
```

- **Web-specific optimizations** — optimize for web runtime

---

## 3. Web Runtime Integration

- **Web-specific components** — use web-specific components when needed:

```typescript
import { View } from 'react-native'
import { WebView } from 'react-native-web'

function WebComponent() {
  return (
    <WebView
      source={{ uri: 'https://example.com' }}
      style={{ flex: 1 }}
    />
  )
}
```

- **CSS integration** — use CSS for web-specific styling:

```typescript
import { StyleSheet } from 'react-native'

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

- **Browser APIs** — access browser APIs when in web runtime:

```typescript
import { Platform } from 'react-native'

if (Platform.OS === 'web') {
  // Use browser APIs
  window.addEventListener('resize', handleResize)
}
```

---

## 4. Navigation

- **React Navigation** — use React Navigation for cross-platform navigation:

```typescript
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
```

- **Web routing** — handle web-specific routing:

```typescript
import { Linking } from 'react-native'

const handleDeepLink = (url: string) => {
  if (Platform.OS === 'web') {
    // Handle web deep linking
    window.history.pushState({}, '', url)
  } else {
    // Handle native deep linking
    Linking.openURL(url)
  }
}
```

---

## 5. Performance

- **Web-specific optimizations** — optimize for web performance:

```typescript
import { useMemo, useCallback } from 'react'

const optimizedComponent = useMemo(() => {
  return <ExpensiveComponent />
}, [dependencies])

const handleClick = useCallback(() => {
  // Handle click
}, [dependencies])
```

- **Lazy loading** — lazy load components for web:

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
