# Lynx Best Practices: 2. Component Structure

## Source guidance

This example applies the **2. Component Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **React Native components** — use React Native components that work across platforms:
- **Platform-specific code** — handle platform differences:
- **Web-specific optimizations** — optimize for web runtime

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for lynx-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
