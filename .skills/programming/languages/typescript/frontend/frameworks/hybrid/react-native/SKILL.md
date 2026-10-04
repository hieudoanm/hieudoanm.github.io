---
name: react-native-best-practices
description: Best practices for building mobile applications with React Native. Use when creating, structuring, or reviewing a React Native app — covers components, navigation, state management, performance, and platform-specific code.
---

# React Native Best Practices

React Native is a framework for building mobile applications using React. Best practice is to follow platform conventions, optimize performance, use proper navigation patterns, and handle platform-specific code elegantly.

---

## 1. Core Stack

- React Native **latest stable**
- React **18+**
- TypeScript **strict mode**
- Expo for development (optional)
- React Navigation for routing

```bash
npx react-native init MyApp --template react-native-template-typescript
# or with Expo
npx create-expo-app MyApp --template expo-template-blank-typescript
```

---

## 2. Project Structure

```text
src/
├── components/           # Reusable components
│   ├── Button.tsx
│   └── Card.tsx
├── screens/             # Screen components
│   ├── HomeScreen.tsx
│   └── ProfileScreen.tsx
├── navigation/          # Navigation configuration
│   ├── AppNavigator.tsx
│   └── TabNavigator.tsx
├── hooks/               # Custom hooks
│   ├── useAuth.ts
│   └── useApi.ts
├── services/            # API services
│   └── api.ts
├── store/               # State management
│   └── index.ts
├── utils/               # Utility functions
│   └── helpers.ts
├── types/               # TypeScript types
│   └── index.ts
└── assets/              # Images, fonts, etc.
```

- **Feature-based organization** — organize by feature or screen
- **Reusable components** — separate reusable UI components
- **TypeScript types** — centralize type definitions
- **Platform-specific code** — use platform-specific file extensions

---

## 3. Components

- **Functional components** — use functional components with hooks:

```typescript
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text onPress={onPress} style={styles.text}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  }
})
```

- **Props with TypeScript** — define clear prop interfaces
- **StyleSheet** — use StyleSheet for performance
- **Platform-specific styles** — use Platform.select for platform differences:

```typescript
import { Platform, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
})
```

---

## 4. Navigation

- **React Navigation** — use React Navigation for app navigation:

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

- **Navigation types** — use navigation prop types:

```typescript
import { StackNavigationProp } from '@react-navigation/stack'

type RootStackParamList = {
  Home: undefined
  Profile: { userId: string }
}

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>
```

- **Deep linking** — implement deep linking for your app
- **Tab navigation** — use bottom tab navigation for main sections

---

## 5. State Management

- **Context API** — use Context API for simple state:

```typescript
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
```

- **Redux Toolkit** — use Redux Toolkit for complex state:

```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})
```

- **Zustand** — use Zustand for simple, lightweight state management
- **Local state** — use useState for component-local state

---

## 6. Platform-Specific Code

- **Platform module** — use Platform module for platform detection:

```typescript
import { Platform } from 'react-native'

const component = Platform.select({
  ios: () => <IOSComponent />,
  android: () => <AndroidComponent />,
})
```

- **Platform-specific files** — use platform-specific file extensions:

```text
Button.ios.tsx
Button.android.tsx
```

- **SafeAreaView** — use SafeAreaView for proper layout:

```typescript
import { SafeAreaView } from 'react-native-safe-area-context'

<SafeAreaView style={styles.container}>
  {/* Content */}
</SafeAreaView>
```

---

## 7. Performance

- **FlatList for long lists** — use FlatList instead of ScrollView for long lists:

```typescript
<FlatList
  data={items}
  renderItem={({ item }) => <Item item={item} />}
  keyExtractor={(item) => item.id}
  initialNumToRender={10}
  maxToRenderPerBatch={5}
  windowSize={5}
/>
```

- **memoization** — use React.memo for expensive components:

```typescript
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* expensive rendering */}</div>
})
```

- **Avoid inline functions** — avoid inline functions in render:

```typescript
// Bad
onPress={() => handlePress(item.id)}

// Good
const handlePress = useCallback(() => {
  onPress(item.id)
}, [item.id, onPress])
```

- **Image optimization** — optimize images for mobile

---

## 8. Styling

- **StyleSheet** — use StyleSheet for performance:

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})
```

- **Responsive design** — use Dimensions for responsive layouts:

```typescript
import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')
```

- **Styled Components** — use styled-components for dynamic styling:

```typescript
import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background-color: white;
`
```

---

## 9. APIs

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
