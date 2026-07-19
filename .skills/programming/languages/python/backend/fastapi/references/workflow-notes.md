# Workflow notes

Focused reference for **fastapi-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Pydantic Models at Every Boundary

- **Request/response models are Pydantic models** — never return ORM entities directly; map to response schemas in the handler/service:

```python
from pydantic import BaseModel, EmailStr, Field

class UserCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    model_config = ConfigDict(from_attributes=True)   # map from ORM row
```

- **`ConfigDict(from_attributes=True)`** lets you return ORM objects Pydantic validates/serializes — the schema is still the contract.
- **Keep schemas at the boundary**, not leaking into domain logic; compose them from parts when payloads share shape.
- **Pydantic v2**: `Field` validators, `model_validator` for cross-field rules, `model_dump(by_alias=True)` for wire output.

---

## 4. Dependency Injection

- **`Depends` is the DI mechanism** — services, config, auth, and DB sessions are dependencies, not globals:

```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users", status_code=201)
def create_user(payload: UserCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return user_service.create(payload)
```

- **Deps express requirements in the signature** — callers of a route can see what it touches without reading the body.
- **Use generator deps for resources** (DB sessions) so teardown is guaranteed; use `Annotated[..., Depends(...)]` for `Repeatable` typing hints.
- **Error-encoding deps** (`Depends(get_current_user)`) centralize auth/authorization at the boundary.

---

## 5. Async & Concurrency

- **`async def` for I/O-bound endpoints** — DB/HTTP calls stay off the event loop.
- **Never block in async routes** — no `time.sleep`, no sync `requests`, no blocking DB drivers; use `asyncpg`/`aiosqlite`/`httpx.AsyncClient`.
- **Mark CPU-bound work `def` (sync)** so FastAPI runs it in a threadpool — an `async def` that does CPU work blocks the loop.
- **`BackgroundTasks` for explicit background work** (emails, webhooks) — declare intent, don't fire-and-forget with raw threads.
- **Keep DB drivers matching the deployment** — sync SQLAlchemy in a sync route is fine; mixing async routes with a sync session is where stalls creep in.

---
