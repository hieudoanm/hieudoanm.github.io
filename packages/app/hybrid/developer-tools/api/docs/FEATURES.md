# Features

> API Client — full-scale Postman / Insomnia / Bruno.

## Request Composer

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

## Authentication

- Bearer and Basic auth presets
- OAuth 1.0 and 2.0 flows (pending)
- API Key and Digest auth (pending)

## Response

- Response panel with status, time, size, headers
- Copy response body button
- Response preview by content-type
- Response diffing between requests
- Pretty / raw / preview renderers (JSON, XML, HTML, image) (pending)
- Response cookies viewer (pending)
- JSON schema validation of responses (pending)

## Realtime & Protocols

- WebSocket client (connect, message log, close)
- gRPC client (proto import, unary and streaming calls)
- MQTT client (connect, subscribe, publish)

## Scripting & Testing

- Pre-request scripts (JS sandbox) (pending)
- Test assertions (status, headers, body, schema) (pending)
- Test runner with pass/fail summary (pending)
- Script console / log output panel (pending)
- Collection runner with delay and failure handling (pending)
- Data-driven runs with CSV/JSON data files (pending)
- Test report export (HTML / JSON) (pending)

## Collections & Variables

- Request collections (saved, named, grouped)
- Environment variables (`{{var}}` substitution)
- Multiple environments with active selector (pending)
- Variable inspector with usage and unresolved references (pending)
- Dynamic variables ({{$guid}}, {{$timestamp}}, {{$randomInt}}) (pending)

## History & Automation

- Local request history
- History search and filtering
- Newman-style CLI runner in Tauri desktop (pending)
- Scheduled monitors (mock) (pending)

## API Design & Team

- Code generation (curl, fetch, fetch-ts)
- Schema preview (OpenAPI import)
- OpenAPI import/export (2.0 and 3.0/3.1) (pending)
- Mock server from collection or schema (pending)
- API documentation generation (pending)
- Team workspaces (pending)
- Git-based collection versioning (local-first, Bruno-style) (pending)
- Cloud sync (mock) (pending)

## Platform

- Tauri desktop app build (bundling configured; signing not yet)
- Light and dark themes (pending)
- Command palette (Ctrl+K) (pending)
- Plugin system (Bruno-style) (pending)

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
