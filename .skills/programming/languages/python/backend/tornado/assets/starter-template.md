# Tornado Best Practices: Starter Template

A reusable starting point derived from the **1. Handlers & Routing** section of [Tornado Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
