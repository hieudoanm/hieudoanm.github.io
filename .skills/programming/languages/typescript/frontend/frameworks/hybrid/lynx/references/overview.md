# Overview

Focused reference for **lynx-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
