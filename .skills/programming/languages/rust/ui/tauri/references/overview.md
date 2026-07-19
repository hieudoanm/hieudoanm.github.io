# Overview

Focused reference for **tauri-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
