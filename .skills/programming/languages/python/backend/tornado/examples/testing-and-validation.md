# Tornado Best Practices: 6. Testing & Deployment

## Source guidance

This example applies the **6. Testing & Deployment** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`AsyncHTTPTestCase` for handler tests (async requests):**
- **Deploy: one tornado server (or proxy + workers) — loops = process-bound; no async-death.**
- **Pin version; CI test with asyncio loop (`tornado.testing`); health endpoints.**

## Example

```python
class OrderTest(tornado.testing.AsyncHTTPTestCase):
    def get_app(self):
        return make_app()
    async def test_get(self):
        resp = await self.http_client.fetch("/api/order?id=1")
        self.assertEqual(resp.code, 200)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for tornado-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
