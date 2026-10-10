# Implementation notes

Focused reference for **flask-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
```

- **Flask-SQLAlchemy + migrations (Alembic/Flask-Migrate) — never hand-altering schema.**
- **Session/transaction scoped per request; `db.session` patterns documented.**

---

## 5. Resilience & Middleware

- **Error handlers (`@app.errorhandler(404)`/files) + request logging once:**

```python
@app.errorhandler(404)
def not_found(e):
    return {"error": "not found"}, 404
```

- **CORS/security via Flask-CORS/`after_request` headers only where justified.**
- **Rate-limit (Flask-Limiter) at the API seam; secrets via env.**

---

## 6. Testing & Deployment

- **Tests under `pytest` with an app factory fixture + test DB:**
