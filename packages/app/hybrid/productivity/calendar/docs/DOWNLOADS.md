# Downloads

## Web App

Install as a PWA from the hosted URL. Click the install button in your browser's
address bar to add it to your home screen.

## Desktop App

Pre-built binaries are available on the
[Releases](https://github.com/hieudoanm/hieudoanm.github.io/releases) page.

### Platforms

| Platform | Format             | Status |
| -------- | ------------------ | ------ |
| macOS    | `.dmg` / `.app`    | ✅     |
| Windows  | `.msi` / `.exe`    | ✅     |
| Linux    | `.deb` / `.AppImage` | ✅   |

### Build from Source

```bash
# Install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Tauri CLI
cargo install tauri-cli

# Build desktop app
pnpm tauri build
```

The built binaries will be in `src-tauri/target/release/bundle/`.

## System Requirements

### Desktop

- **macOS**: 10.15+ (Catalina)
- **Windows**: 10+ (64-bit)
- **Linux**: Ubuntu 18.04+, Debian 10+, Fedora 32+

### Web

- Modern browser with ES2020+ support
- Service Worker support (for PWA/offline)
