# Overview

Focused reference for **react-native-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
