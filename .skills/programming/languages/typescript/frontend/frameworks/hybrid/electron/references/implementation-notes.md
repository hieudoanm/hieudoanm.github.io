# Implementation notes

Focused reference for **electron-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Validate input** — validate all input from renderer process
- **Disable dangerous features** — disable remote module, webSecurity false

---

## 6. Performance

- **Lazy loading** — lazy load heavy dependencies:

```typescript
// Load heavy library only when needed
const heavyLibrary = await import('heavy-library')
```

- **Web workers** — use web workers for CPU-intensive tasks:

```typescript
const worker = new Worker('./worker.js', { type: 'module' })
worker.postMessage({ data: 'some data' })
```

- **Memory management** — clean up resources properly:

```typescript
window.addEventListener('beforeunload', () => {
  // Clean up resources
})
```

- **Optimize startup** — minimize main process startup time

---

## 7. Packaging

- **electron-builder configuration** — configure electron-builder:

```yaml
# electron-builder.yml
appId: com.example.myapp
productName: MyApp
directories:
  buildResources: build
  output: dist
files:
  - dist/**/*
  - package.json
win:
  target:
    - nsis
mac:
  target:
    - dmg
linux:
  target:
    - AppImage
```

- **Code signing** — sign your applications for distribution
- **Auto-updates** — implement auto-updates using electron-updater

---
