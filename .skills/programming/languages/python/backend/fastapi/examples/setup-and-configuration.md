# FastAPI Backend Best Practices: 3. Pydantic Models at Every Boundary

## Source guidance

This example applies the **3. Pydantic Models at Every Boundary** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Request/response models are Pydantic models** — never return ORM entities directly; map to response schemas in the handler/service:
- **`ConfigDict(from_attributes=True)`** lets you return ORM objects Pydantic validates/serializes — the schema is still the contract.
- **Keep schemas at the boundary**, not leaking into domain logic; compose them from parts when payloads share shape.
- **Pydantic v2**: `Field` validators, `model_validator` for cross-field rules, `model_dump(by_alias=True)` for wire output.

## Example

This excerpt is from the cited **3. Pydantic Models at Every Boundary** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for fastapi-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
