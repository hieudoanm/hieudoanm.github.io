# Roadmap

## Phase 1 — Core

> Foundation: composer, tabs, response viewer

- [x] Method + URL composer with send
- [x] Params/Headers key-value editors
- [x] Body editor with JSON beautify
- [x] Response panel with status, time, size, headers
- [x] Local request history

## Phase 2 — Enhanced

> Polish: authentication, persistence

- [x] Bearer and Basic auth presets
- [x] Draft autosave
- [x] Keyboard shortcuts (Ctrl+Enter send, Ctrl+L clear)
- [x] Copy response body button
- [x] Response preview by content-type

## Phase 3 — Advanced

> Power: variables, collections, export

- [x] Environment variables (`{{var}}` substitution)
- [x] Request collections (saved, named, grouped)
- [x] Export/import requests as JSON
- [x] Request timeout and redirect control
- [x] Response diffing between requests

## Phase 4 — Organization

> Scale: tabs, search, codegen

- [x] Multiple request tabs
- [x] History search and filtering
- [x] Code generation (curl, fetch, fetch-ts)
- [x] Schema preview (OpenAPI import)

## Phase 5 — Advanced Protocols

> Protocols: cookies, uploads, GraphQL, realtime

- [x] Cookie jar with domain scoping (inspect and send request cookies)
- [x] Multipart form-data body with file uploads
- [x] GraphQL composer (query and variables editors, schema introspection)
- [x] WebSocket client (connect, message log, close)
- [x] gRPC client (import proto, invoke unary and streaming calls)
- [x] MQTT client (connect, subscribe, publish)

## Phase 6 — Scripting & Testing

> Automation: pre-request scripts, test assertions, dynamic data

- [x] Pre-request scripts (JS sandbox)
- [x] Test scripts with assertions (status, headers, body, schema)
- [x] Test results with pass/fail summary per request
- [x] Script console / log output panel
- [x] Dynamic variables ({{$guid}}, {{$timestamp}}, {{$randomInt}})
- [x] Data files (CSV/JSON) for data-driven testing (delivered with Phase 7)

## Phase 7 — Runner & Automation

> Scale: run collections, reports, CLI

- [x] Collection runner (sequential with delay and failure handling)
- [x] Data-driven collection runs (CSV/JSON iterations)
- [x] Test report export (HTML / JSON)
- [ ] Newman-style CLI runner in Tauri desktop
- [x] Scheduled monitors (mock)

## Phase 8 — Team & Versioning

> Share: workspaces, git-based collections, cloud

- [ ] Team workspaces
- [ ] Git-based collection versioning (local-first, Bruno-style)
- [ ] Cloud sync (mock)
- [ ] Shareable request links
- [ ] Comments and reviews (mock)

## Phase 9 — API Design & Docs

> Design: OpenAPI, mocks, documentation

- [x] OpenAPI import/export (3.0.x)
- [x] Mock server from collection or schema
- [x] API documentation generation
- [x] Request examples with response schemas
- [x] JSON schema validation of responses

## Phase 10 — Platform & UX

> Polish: themes, command palette, plugins, packaging

- [ ] Light and dark themes
- [ ] Command palette (Ctrl+K)
- [ ] Customizable keyboard shortcuts
- [ ] Plugin system (Bruno-style)
- [ ] Global search across requests, collections, environments
- [ ] Desktop app packaging with code signing
