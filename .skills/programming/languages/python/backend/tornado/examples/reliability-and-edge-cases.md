# Tornado Best Practices: 3. IOLoop & Lifecycle

## Source guidance

This example applies the **3. IOLoop & Lifecycle** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`asyncio.current_loop` (Tornado runs asyncio by default):**
- **Graceful shutdown hooks; periodic tasks via `IOLoop.call_later`, not threads.**
- **`tornado.httpserver` + `listen` vs `handlers`-in-`app.listen` — pick, document.**

## Example

```python
if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for tornado-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
