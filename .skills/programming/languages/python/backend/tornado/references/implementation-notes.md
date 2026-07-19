# Implementation notes

Focused reference for **tornado-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
