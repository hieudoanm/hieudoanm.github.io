---
name: tauri-best-practices
description: Best practices for building cross-platform desktop applications with Tauri (Rust + web frontend). Use when creating, structuring, or reviewing a Tauri app — covers app structure, commands, state management, security, and frontend integration.
---

# Tauri Best Practices

Tauri is a framework for building tiny, fast binaries for all major desktop platforms using a web frontend. Best practice is to leverage Rust's safety and performance while maintaining a clean separation between the Rust backend and web frontend, with secure command passing and proper state management.

---

## 1. Core Stack

- Rust **latest stable**
- Tauri **2.x** (latest stable)
- Web frontend (React, Vue, Svelte, etc.)
- TypeScript for frontend
- Cargo for Rust package management

```bash
npm create tauri-app
# or
cargo install tauri-cli
cargo tauri init
```

---

## 2. Project Structure

```text
src-tauri/
├── Cargo.toml              # Rust dependencies
├── tauri.conf.json         # Tauri configuration
├── src/
│   ├── main.rs             # Rust entry point
│   ├── lib.rs              # Library exports
│   ├── commands/           # Tauri commands
│   │   ├── mod.rs
│   │   ├── app.rs
│   │   └── system.rs
│   ├── state/              # Application state
│   │   ├── mod.rs
│   │   └── app_state.rs
│   └── utils/              # Utility functions
├── icons/                  # App icons
└── resources/              # Additional resources

src/                        # Frontend code
├── main.tsx                # Frontend entry
├── App.tsx                 # Main component
└── components/             # Frontend components
```

- **Clear separation** — Rust backend in `src-tauri/`, web frontend in `src/`
- **Command modules** — organize Tauri commands by domain
- **State management** — centralize application state in Rust
- **Type safety** — share types between Rust and frontend via generated types

---

## 3. Tauri Commands

- **Commands bridge frontend and backend** — define Rust functions callable from frontend:

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
```

- **Register commands in main** — add commands to the Tauri app:

```rust
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

- **Error handling** — use `Result` for commands that can fail:

```rust
#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    std::fs::read_to_string(&path)
        .map_err(|e| e.to_string())
}
```

- **Async commands** — use `async` for long-running operations:

```rust
#[tauri::command]
async fn fetch_data(url: String) -> Result<String, String> {
    let response = reqwest::get(&url).await
        .map_err(|e| e.to_string())?;
    let text = response.text().await
        .map_err(|e| e.to_string())?;
    Ok(text)
}
```

---

## 4. State Management

- **Use Tauri's state management** — share state across commands:

```rust
struct AppState {
    counter: Arc<Mutex<i32>>,
}

#[tauri::command]
fn increment(state: State<'_, AppState>) -> i32 {
    let mut counter = state.counter.lock().unwrap();
    *counter += 1;
    *counter
}
```

- **Initialize state in main** — create and inject state:

```rust
fn main() {
    let state = AppState {
        counter: Arc::new(Mutex::new(0)),
    };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![increment])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

- **Thread-safe state** — use `Arc<Mutex<T>>` for shared mutable state
- **Immutable state where possible** — prefer `Arc<T>` over `Arc<Mutex<T>>` for read-only data

---

## 5. Frontend Integration

- **Invoke commands from frontend** — use Tauri's API:

```typescript
import { invoke } from '@tauri-apps/api/tauri'

const result = await invoke('greet', { name: 'World' })
console.log(result) // "Hello, World! You've been greeted from Rust!"
```

- **Type safety** — generate TypeScript types from Rust commands:

```typescript
// Tauri generates types automatically
interface GreetArgs {
  name: string
}

const result = await invoke<string>('greet', { name: 'World' })
```

- **Error handling** — handle errors from Rust commands:

```typescript
try {
  const result = await invoke('read_file', { path: '/path/to/file' })
  console.log(result)
} catch (error) {
  console.error('Failed to read file:', error)
}
```

---

## 6. Security

- **Least privilege** — only expose necessary commands to frontend
- **Validate input** — validate all input from frontend in Rust commands:

```rust
#[tauri::command]
fn open_file(path: String) -> Result<(), String> {
    // Validate path is within allowed directory
    if !path.starts_with("/allowed/path") {
        return Err("Path not allowed".to_string());
    }
    // Open file
    Ok(())
}
```

- **File system access** — use Tauri's file system APIs with proper permissions
- **Disable dangerous features** — disable shell access, file system access if not needed
- **Content security policy** — configure CSP in `tauri.conf.json`

---

## 7. Window Management

- **Window configuration** — configure windows in `tauri.conf.json`:

```json
{
  "tauri": {
    "windows": [
      {
        "title": "My App",
        "width": 800,
        "height": 600,
        "resizable": true,
        "fullscreen": false
      }
    ]
  }
}
```

- **Multiple windows** — create and manage multiple windows:

```rust
#[tauri::command]
async fn create_window(app: AppHandle) -> Result<(), String> {
    let _window = tauri::WindowBuilder::new(
        &app,
        "secondary",
        tauri::WindowUrl::App("index.html".into())
    )
    .title("Secondary Window")
    .build()
    .map_err(|e| e.to_string())?;
    Ok(())
}
```

- **Window events** — listen to window events:

```rust
window.on_window_event(|event| {
    match event {
        WindowEvent::CloseRequested { api, .. } => {
            api.prevent_close();
        }
        _ => {}
    }
});
```

---

## 8. System Integration

- **File system** — use Tauri's file system APIs:

```rust
use tauri::api::file;

#[tauri::command]
fn read_file(path: String) -> Result<String, String> {
    file::read_string(&path).map_err(|e| e.to_string())
}
```

- **System dialogs** — use system dialogs for file operations:

```rust
use tauri::api::dialog;

#[tauri::command]
async fn open_file_dialog() -> Result<String, String> {
    dialog::blocking::FileDialogBuilder::new()
        .pick_file()
        .ok_or("No file selected".to_string())
}
```

- **Notifications** — use system notifications:

```rust
use tauri::api::notification;

#[tauri::command]
fn show_notification() {
    notification::Notification::new("com.example.app")
        .title("Hello")
        .body("World")
        .show()
        .unwrap();
}
```

---

## 9. Testing

- **Unit tests** — test Rust commands with standard Rust testing:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_greet() {
        assert_eq!(greet("World"), "Hello, World! You've been greeted from Rust!");
    }
}
```

- **Integration tests** — test frontend-backend integration
- **E2E tests** — use Tauri's testing utilities for end-to-end testing

---

## 10. Build & Distribution

- **Build for different platforms** — build for Windows, macOS, and Linux:

```bash
cargo tauri build
# Platform-specific
cargo tauri build --target x86_64-pc-windows-msvc
cargo tauri build --target x86_64-apple-darwin
cargo tauri build --target x86_64-unknown-linux-gnu
```

- **Code signing** — sign your applications for distribution
- **Auto-updates** — implement auto-updates using Tauri's updater
- **Installer configuration** — configure installers in `tauri.conf.json`

---

## 11. General Rules of Thumb

- **Separate concerns** — keep Rust backend and web frontend separate
- **Type safety** — use TypeScript and Rust's type system
- **Security first** — validate all input, follow least privilege
- **Performance** — leverage Rust's performance for heavy operations
- **Error handling** — use `Result` for proper error handling
- **Testing** — test both Rust commands and frontend integration

---

## Quick-Start Checklist

- [ ] Proper project structure with `src-tauri/` and `src/`
- [ ] Commands organized in modules by domain
- [ ] State management with Tauri's state system
- [ ] Type-safe command invocation from frontend
- [ ] Input validation in all commands
- [ ] Security configuration in `tauri.conf.json`
- [ ] Window management configured properly
- [ ] System integration using Tauri APIs
- [ ] Unit tests for Rust commands
- [ ] Build configuration for target platforms
