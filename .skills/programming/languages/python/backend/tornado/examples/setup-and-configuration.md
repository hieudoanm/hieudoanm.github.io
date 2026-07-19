# Tornado Best Practices: 2. Async Discipline

## Source guidance

This example applies the **2. Async Discipline** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Nothing blocking on the event loop — DB/HTTP/disk via awaited tools:**
- **`async_fetch` + `concurrent.run_on_executor` for CPU-bound work off the loop.**
- **No `time.sleep`/synchronous DB in handlers — that's the cardinal sin.**

## Example

```python
from tornado.httpclient import AsyncHTTPClient

async def fetch_upstream(url):
    client = AsyncHTTPClient()
    return await client.fetch(url)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tornado-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
