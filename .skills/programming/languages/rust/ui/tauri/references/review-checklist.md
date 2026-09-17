# Review checklist

Focused reference for **tauri-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
