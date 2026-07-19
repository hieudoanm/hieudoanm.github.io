# Review checklist

Focused reference for **tornado-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Deploy: one tornado server (or proxy + workers) — loops = process-bound; no async-death.**
- **Pin version; CI test with asyncio loop (`tornado.testing`); health endpoints.**

---

## General Rules of Thumb

- **Handlers async; never block the IOLoop.**
- **DB/HTTP via awaited non-blocking clients.**
- **Thin handlers; services hold domain logic.**
- **`AsyncHTTPTestCase` for tests; process-scoped loops for deploy.**
- **Static/WS + WebSockets handled by the framework's primitives.**

---

## Quick-Start Checklist

- [ ] Handlers as `async def` verbs; routing explicit
- [ ] No blocking calls in handlers; DB/HTTP awaited
- [ ] `IOLoop` lifecycle managed; periodic via `call_later`
- [ ] Large I/O via streaming; webSocket heartbeats
- [ ] `AsyncHTTPTestCase` coverage for endpoints
- [ ] Version pinned; CI tests run on the tornado loop
