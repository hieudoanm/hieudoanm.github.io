# API

> A full-scale API client — compose requests, inspect responses, and debug
> protocols across phone, tablet, laptop, and desktop. It runs everywhere.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────┐
│  API Client                              │
│  ──────────────────────────────────────  │
│  POST https://api.example.com/v1/users   │
│  ┌────────────────────────────────────┐  │
│  │ Key         │ Value                │  │
│  │ Content-Type│ application/json     │  │
│  │ Authorization│ Bearer eyJ...       │  │
│  └────────────────────────────────────┘  │
│  { "name": "Ada", "role": "engineer" }   │
│                                          │
│  ▶ Send                      200 OK 42ms │
│  ┌────────────────────────────────────┐  │
│  │ { "id": 42, "name": "Ada" }       │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-developer-tools-api-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-api-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-api-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-api-latest/api_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-api-latest/api_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-api-latest/api_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-api-latest/api_x64.msi

<br>

¹ Android `.aab` — upload to Google Play or sideload via bundletool.

² macOS `.dmg` — Apple Silicon build (M1/M2/M3/M4).

## First run

- **macOS:** Right-click the `.dmg` and select _Open_ to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x api_amd64.AppImage && ./api_amd64.AppImage`
- **Windows SmartScreen:** Click _More info → Run anyway_ if SmartScreen flags
  the installer.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-api-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/developer-tools/api
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Full-scale API client in your pocket — compose, send, and inspect HTTP,
WebSocket, gRPC, and MQTT requests from any device. Built with Tauri so it ships
everywhere: phone, tablet, laptop, desktop.

---

## Features

Build, test, and debug APIs without leaving your keyboard.

### 🔗 Request Composer

- Method + URL composer with send
- Params / headers key-value editors
- Body editor with JSON beautify
- Keyboard shortcuts (Ctrl+Enter send, Ctrl+L clear)
- Request timeout and redirect control
- Multiple request tabs
- Multipart form-data body with file uploads
- GraphQL composer (query and variables editors, schema introspection)
- Cookie jar with domain scoping
- Protocol switcher (HTTP, WebSocket, gRPC, MQTT)

### 🔐 Authentication

- Bearer and Basic auth presets
- OAuth 1.0 and 2.0 flows (pending)
- API Key and Digest auth (pending)

### 📬 Response

- Response panel with status, time, size, headers
- Copy response body button
- Response preview by content-type
- Response diffing between requests
- Pretty / raw / preview renderers (JSON, XML, HTML, image) (pending)
- Response cookies viewer (pending)
- JSON schema validation of responses (pending)

### ⚡ Realtime & Protocols

- WebSocket client (connect, message log, close)
- gRPC client (proto import, unary and streaming calls)
- MQTT client (connect, subscribe, publish)

### 🧪 Scripting & Testing

- Pre-request scripts (JS sandbox) (pending)
- Test assertions (status, headers, body, schema) (pending)
- Test runner with pass/fail summary (pending)
- Script console / log output panel (pending)
- Collection runner with delay and failure handling (pending)
- Data-driven runs with CSV/JSON data files (pending)
- Test report export (HTML / JSON) (pending)

### 📂 Collections & Variables

- Request collections (saved, named, grouped)
- Environment variables (`{{var}}` substitution)
- Multiple environments with active selector (pending)
- Variable inspector with usage and unresolved references (pending)
- Dynamic variables ({{$guid}}, {{$timestamp}}, {{$randomInt}}) (pending)

### 🕒 History & Automation

- Local request history
- History search and filtering
- Newman-style CLI runner in Tauri desktop (pending)
- Scheduled monitors (mock) (pending)

### 📐 API Design & Team

- Code generation (curl, fetch, fetch-ts)
- Schema preview (OpenAPI import)
- OpenAPI import/export (2.0 and 3.0/3.1) (pending)
- Mock server from collection or schema (pending)
- API documentation generation (pending)
- Team workspaces (pending)
- Git-based collection versioning (local-first, Bruno-style) (pending)
- Cloud sync (mock) (pending)

### 🖥️ Platform

- Tauri desktop app build (bundling configured; signing not yet)
- Light and dark themes (pending)
- Command palette (Ctrl+K) (pending)
- Plugin system (Bruno-style) (pending)

---

## First run

---

## Next steps

- **Want to contribute?** Check [CONTRIBUTING](CONTRIBUTING) for setup and dev
  commands.
- **Curious what's coming?** Read the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
