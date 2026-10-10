# Implementation notes

Focused reference for **tauri-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
