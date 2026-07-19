# Workflow notes

Focused reference for **flask-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```python
class ProdConfig:
    SECRET_KEY = os.environ["FLASK_SECRET_KEY"]
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]
```

- **Never ship secrets in config; `instance_relative_config`/`.env` for local only.**
- **`DEBUG`/`TESTING` per env; logging configured in the factory.**

---

## 3. Routes & Views

- **Routes thin; `@route` with methods explicit; inputs validated:**

```python
@app.get("/api/orders/<order_id>")
def get_order(order_id: str):
    order = service.get_order(order_id)
    if order is None:
        abort(404)
    return order, 200
```

- **JSON in/out via `app.json`/`flask` tools; responses plain dicts.**
- **Validation at the boundary (request schema checks) before the service call.**

---

## 4. Extensions & ORM

- **Extensions wired in the factory (`db.init_app(app)`), models explicit:**
