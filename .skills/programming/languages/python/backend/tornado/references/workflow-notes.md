# Workflow notes

Focused reference for **tornado-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
