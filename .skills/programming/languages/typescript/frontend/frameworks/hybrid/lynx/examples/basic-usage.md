# Lynx Best Practices: Basic Usage

Best practices for building applications with Lynx (React Native web runtime). Use when creating, structuring, or reviewing Lynx applications — covers components, navigation, web runtime integration, and performance.

## Scenario

Use this example as a starting point when applying **lynx-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Component Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
