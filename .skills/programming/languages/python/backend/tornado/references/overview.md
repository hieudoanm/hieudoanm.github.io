# Overview

Focused reference for **tornado-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
