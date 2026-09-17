# Workflow notes

Focused reference for **tauri-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
