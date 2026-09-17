# Implementation notes

Focused reference for **react-native-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
