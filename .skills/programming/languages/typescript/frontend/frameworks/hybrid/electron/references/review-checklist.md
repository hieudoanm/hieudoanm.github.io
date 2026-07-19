# Review checklist

Focused reference for **electron-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 8. Testing

- **Spectron for E2E testing** — test Electron apps with Spectron:

```typescript
import { Application } from 'spectron'

const app = new Application({
  path: '/path/to/app'
})

await app.start()
const window = await app.client.getWindowCount()
await app.stop()
```

- **Unit testing** — test main and renderer processes separately
- **IPC testing** — test IPC communication between processes

---

## 9. Debugging

- **DevTools** — use Chrome DevTools for debugging renderer process
- **Main process debugging** — debug main process with VS Code:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/main/index.ts"
    }
  ]
}
```

- **Logging** — implement proper logging in both processes

---

## 10. General Rules of Thumb

- **Process separation** — maintain clear separation between main and renderer
- **Security first** — always enable context isolation and disable node integration
- **Type safety** — use TypeScript and share types between processes
- **Performance** — optimize startup time and memory usage
- **IPC communication** — use preload scripts for secure IPC
- **Testing** — test both processes and IPC communication

---

## Quick-Start Checklist

- [ ] Clear project structure with main/renderer/preload separation
- [ ] Context isolation enabled, node integration disabled
- [ ] Preload scripts for secure IPC communication
- [ ] TypeScript for type safety across processes
- [ ] Proper IPC handlers organized by domain
- [ ] Content security policy implemented
- [ ] Performance optimization techniques
- [ ] electron-builder configuration for packaging
- [ ] Testing setup for both processes
- [ ] Debugging configuration for main and renderer
