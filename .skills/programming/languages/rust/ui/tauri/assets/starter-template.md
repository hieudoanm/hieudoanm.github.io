# Tauri Best Practices: Starter Template

A reusable starting point derived from the **6. Security** section of [Tauri Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
