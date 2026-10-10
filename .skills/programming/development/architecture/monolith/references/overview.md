# Overview

Focused reference for **monolith-architecture**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Monolithic Architecture Best Practices

Monolithic architecture is a traditional software design where the application is built as a single, unified unit. Best practice is to structure monoliths with clear module boundaries, implement proper separation of concerns, and design for eventual evolution into microservices if needed.

---

## 1. Core Principles

- **Single deployment unit** — entire application deployed as one unit
- **Shared database** — typically uses a single database
- **Clear module boundaries** — well-defined interfaces between modules
- **Layered architecture** — presentation, business, and data layers
- **Evolutionary design** — structure for potential future decomposition

---

## 2. Project Structure

```text
my-monolith/
├── src/
│   ├── presentation/       # API/UI layer
│   │   ├── api/
│   │   │   ├── controllers/
│   │   │   ├── dto/
│   │   │   └── middleware/
│   │   └── web/
│   │       └── views/
│   ├── business/          # Business logic layer
│   │   ├── services/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── value-objects/
│   │   │   └── repositories/
│   │   └── use-cases/
│   ├── infrastructure/    # External dependencies
│   │   ├── database/
│   │   ├── external-apis/
│   │   ├── messaging/
│   │   └── caching/
│   └── shared/            # Shared utilities
│       ├── utils/
│       └── config/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── config/
```

- **Layered architecture** — clear separation between layers
- **Domain-driven design** — organize around business domains
- **Dependency rules** — dependencies point inward
- **Module boundaries** — well-defined interfaces between modules

---

## 3. Module Organization

- **Domain modules** — organize by business domain:

```text
business/
├── user/
│   ├── entities/
│   ├── services/
│   ├── repositories/
│   └── dto/
├── order/
│   ├── entities/
│   ├── services/
│   ├── repositories/
│   └── dto/
└── payment/
    ├── entities/
    ├── services/
    ├── repositories/
    └── dto/
```

- **Shared kernel** — common functionality shared across domains
- **Bounded contexts** — clear boundaries between business contexts
- **Interface segregation** — modules depend on abstractions, not implementations
