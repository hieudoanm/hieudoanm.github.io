# Ionic Framework Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Virtual scrolling** — use virtual scroll for long lists:
- **Lazy loading** — lazy load routes:
- **Optimize images** — optimize images for mobile

## Example

```typescript
<IonVirtualScroll items={items}>
  {(item) => (
    <IonItem>
      <IonLabel>{item.name}</IonLabel>
    </IonItem>
  )}
</IonVirtualScroll>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for ionic-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
