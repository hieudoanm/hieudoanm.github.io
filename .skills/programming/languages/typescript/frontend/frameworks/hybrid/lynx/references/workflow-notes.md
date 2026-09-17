# Workflow notes

Focused reference for **lynx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
