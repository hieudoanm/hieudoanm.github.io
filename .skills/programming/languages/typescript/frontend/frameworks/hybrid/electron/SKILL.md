---
name: electron-best-practices
description: Best practices for building cross-platform desktop applications with Electron (JavaScript/TypeScript). Use when creating, structuring, or reviewing an Electron app — covers main/renderer process architecture, IPC, security, packaging, and performance.
---

# Electron Best Practices

Electron is a framework for building cross-platform desktop applications using web technologies. Best practice is to maintain clear separation between main and renderer processes, use secure IPC communication, optimize performance, and follow security best practices.

---

## 1. Core Stack

- Electron **latest stable**
- Node.js **LTS**
- TypeScript **strict mode**
- React/Vue/Svelte for renderer process
- electron-builder for packaging

```bash
npm init electron-app my-app
# or
npm install --save-dev electron electron-builder
```

---

## 2. Project Structure

```text
src/
├── main/                  # Main process
│   ├── index.ts           # Main entry point
│   ├── ipc/               # IPC handlers
│   │   ├── handlers.ts
│   │   └── channels.ts
│   ├── windows/           # Window management
│   │   └── mainWindow.ts
│   └── menu/              # Application menu
├── renderer/              # Renderer process
│   ├── index.html
│   ├── App.tsx
│   └── components/
├── preload/               # Preload scripts
│   └── index.ts
└── shared/                # Shared code
    └── types.ts

package.json
electron-builder.yml
```

- **Clear separation** — main process, renderer process, and preload scripts
- **IPC organization** — organize IPC handlers by domain
- **Type safety** — share types between main and renderer processes
- **Security boundaries** — preload scripts act as secure bridges

---

## 3. Main Process

- **Entry point** — main process entry point:

```typescript
import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.loadFile('src/renderer/index.html')
}

app.whenReady().then(createWindow)
```

- **Window management** — manage window lifecycle:

```typescript
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

- **Application menu** — create custom application menu:

```typescript
import { Menu } from 'electron'

const template: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      { role: 'quit' }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

---

## 4. IPC Communication

- **Context isolation** — use preload scripts for secure IPC:

```typescript
// preload/index.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message: string) => ipcRenderer.invoke('send-message', message),
  onMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('message', (_event, message) => callback(message))
  }
})
```

- **IPC handlers** — handle IPC in main process:

```typescript
import { ipcMain } from 'electron'

ipcMain.handle('send-message', async (event, message: string) => {
  console.log('Received message:', message)
  return 'Message received'
})
```

- **Type safety** — define types for IPC communication:

```typescript
// shared/types.ts
export interface ElectronAPI {
  sendMessage: (message: string) => Promise<string>
  onMessage: (callback: (message: string) => void) => void
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
```

---

## 5. Security

- **Context isolation** — always enable context isolation:

```typescript
webPreferences: {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true
}
```

- **Disable node integration** — never enable node integration in renderer
- **Content security policy** — implement CSP:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

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
