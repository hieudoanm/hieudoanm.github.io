# Tornado Best Practices: Basic Usage

Best practices for building web services with Tornado — the asynchronous Python web framework / non-blocking server conventions. Use when writing, structuring, or reviewing Tornado — covers coroutines, handlers, async clients, ioloop, and deployment.

## Scenario

Use this example as a starting point when applying **tornado-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Handlers & Routing** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
