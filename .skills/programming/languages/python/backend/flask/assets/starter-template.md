# Flask Best Practices: Starter Template

A reusable starting point derived from the **2. Configuration** section of [Flask Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
class ProdConfig:
    SECRET_KEY = os.environ["FLASK_SECRET_KEY"]
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
