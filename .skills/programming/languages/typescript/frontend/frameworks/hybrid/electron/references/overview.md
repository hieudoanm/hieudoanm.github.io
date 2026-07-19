# Overview

Focused reference for **electron-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
