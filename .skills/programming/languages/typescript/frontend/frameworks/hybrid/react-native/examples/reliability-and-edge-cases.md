# React Native Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **FlatList for long lists** — use FlatList instead of ScrollView for long lists:
- **memoization** — use React.memo for expensive components:
- **Avoid inline functions** — avoid inline functions in render:
- **Image optimization** — optimize images for mobile

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for react-native-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
