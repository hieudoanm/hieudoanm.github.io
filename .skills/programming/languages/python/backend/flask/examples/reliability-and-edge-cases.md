# Flask Best Practices: 4. Extensions & ORM

## Source guidance

This example applies the **4. Extensions & ORM** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Extensions wired in the factory (`db.init_app(app)`), models explicit:**
- **Flask-SQLAlchemy + migrations (Alembic/Flask-Migrate) — never hand-altering schema.**
- **Session/transaction scoped per request; `db.session` patterns documented.**

## Example

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for flask-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
