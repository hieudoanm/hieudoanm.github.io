# Workflow notes

Focused reference for **react-native-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
