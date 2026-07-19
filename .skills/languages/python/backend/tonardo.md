---
name: tornado-best-practices
description: Best practices for building web services with Tornado — the asynchronous Python web framework / non-blocking server conventions. Use when writing, structuring, or reviewing Tornado — covers coroutines, handlers, async clients, ioloop, and deployment.
---

# Tornado Best Practices

Tornado is a **non-blocking, async Python web framework and server** — `tornado.web` with `async def get/post` handlers, native coroutine support, and the `IOLoop` at the center. Practical Tornado leans on **async handler methods only (no blocking calls on the loop), `@gen.coroutine`-era discipline now via native `async/await`, non-blocking HTTP clients (`AsyncHTTPClient`) for downstream calls, and explicit `ioloop` lifecycle** — one blocking call freezes every request; the IOLoop is the heartbeat.

---

## 1. Handlers & Routing

- **Handlers subclass `RequestHandler`; verbs as methods:**

```python
import tornado.web

class OrderHandler(tornado.web.RequestHandler):
    async def get(self):
        order = await service.get(self.get_argument("id"))
        self.write(order)

def make_app():
    return tornado.web.Application([
        (r"/api/order", OrderHandler),
    ])
```

- **Routing as tuples; handlers thin (service logic outside).**
- **`get_argument`/`get_json_body` validated at the boundary; `write`/`set_status` intentional.**

---

## 2. Async Discipline

- **Nothing blocking on the event loop — DB/HTTP/disk via awaited tools:**

```python
from tornado.httpclient import AsyncHTTPClient

async def fetch_upstream(url):
    client = AsyncHTTPClient()
    return await client.fetch(url)
```

- **`async_fetch` + `concurrent.run_on_executor` for CPU-bound work off the loop.**
- **No `time.sleep`/synchronous DB in handlers — that's the cardinal sin.**

---

## 3. IOLoop & Lifecycle

- **`asyncio.current_loop` (Tornado runs asyncio by default):**

```python
if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
```

- **Graceful shutdown hooks; periodic tasks via `IOLoop.call_later`, not threads.**
- **`tornado.httpserver` + `listen` vs `handlers`-in-`app.listen` — pick, document.**

---

## 4. Input/Output & Streaming

- **`RequestHandler` I/O direct; streaming for large bodies/`write_chunk`:**
- **`AsyncHTTPClient` timeouts/retries explicit (connect/request timeout).**
- **CORS/headers via built-in `set_header`/`XSRF` — no bespoke middleware piles.**

---

## 5. Static & WebSockets

- **Static serving via `StaticFileHandler`; WebSocket via `WebSocketHandler`:**
- **WebSockets: heartbeat/ping; latency monotonic (the client reconnects on silence).**
- **Concurrency: broadcast via `IOLoop.spawn_callback` — never per-client blocking.**

---

## 6. Testing & Deployment

- **`AsyncHTTPTestCase` for handler tests (async requests):**

```python
class OrderTest(tornado.testing.AsyncHTTPTestCase):
    def get_app(self):
        return make_app()
    async def test_get(self):
        resp = await self.http_client.fetch("/api/order?id=1")
        self.assertEqual(resp.code, 200)
```

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