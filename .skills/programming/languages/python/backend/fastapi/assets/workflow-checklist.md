# FastAPI Backend Best Practices: Workflow Checklist

A practical run sheet for applying [FastAPI Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: **Python 3.10+**; FastAPI (latest stable); Pydantic **v2**
- [ ] 1. Core Stack: SQLAlchemy (or async driver) for persistence; python-dotenv/pydantic-settings for config
- [ ] 2. Project Structure & Routing: **Organize by responsibility, not all in one file** — api/routers, schemas, services, repositories/db:
- [ ] 2. Project Structure & Routing: **RESTful resource naming** (/users, /orders/{id}); **version explicitly** (/api/v1/...)
- [ ] 3. Pydantic Models at Every Boundary: **Request/response models are Pydantic models** — never return ORM entities directly; map to response schemas in the handler/service:
- [ ] 3. Pydantic Models at Every Boundary: **ConfigDict(from_attributes=True)** lets you return ORM objects Pydantic validates/serializes — the schema is still the contract
- [ ] 4. Dependency Injection: **Depends is the DI mechanism** — services, config, auth, and DB sessions are dependencies, not globals:
- [ ] 4. Dependency Injection: **Deps express requirements in the signature** — callers of a route can see what it touches without reading the body
- [ ] 5. Async & Concurrency: **async def for I/O-bound endpoints** — DB/HTTP calls stay off the event loop
- [ ] 5. Async & Concurrency: **Never block in async routes** — no time.sleep, no sync requests, no blocking DB drivers; use asyncpg/aiosqlite/httpx.AsyncClient

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
