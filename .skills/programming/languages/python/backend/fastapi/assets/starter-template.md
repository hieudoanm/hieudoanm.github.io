# FastAPI Backend Best Practices: Starter Template

A reusable starting point derived from the **4. Dependency Injection** section of [FastAPI Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
