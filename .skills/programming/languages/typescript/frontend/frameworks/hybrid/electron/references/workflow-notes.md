# Workflow notes

Focused reference for **electron-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
