# FastAPI Backend Best Practices: Basic Usage

Best practices for building HTTP APIs with FastAPI (Python). Use when creating, structuring, or reviewing a FastAPI app — covers routing, Pydantic models, dependency injection, async discipline, error handling, and testing.

## Scenario

Use this example as a starting point when applying **fastapi-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Pydantic Models at Every Boundary** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
