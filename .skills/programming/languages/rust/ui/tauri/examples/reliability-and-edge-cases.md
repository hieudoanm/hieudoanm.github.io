# Tauri Best Practices: 6. Security

## Source guidance

This example applies the **6. Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Least privilege** — only expose necessary commands to frontend
- **Validate input** — validate all input from frontend in Rust commands:
- **File system access** — use Tauri's file system APIs with proper permissions
- **Disable dangerous features** — disable shell access, file system access if not needed
- **Content security policy** — configure CSP in `tauri.conf.json`

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for tauri-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
