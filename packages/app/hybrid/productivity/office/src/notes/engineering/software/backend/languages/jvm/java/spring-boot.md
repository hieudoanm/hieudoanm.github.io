# 🌱 Spring Boot

## 📚 Table of Contents

- [🌱 Spring Boot](#-spring-boot)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Spring Boot Best Practices)](#️-constraints-spring-boot-best-practices)
      - [🧱 Architecture \& Design Rules](#-architecture--design-rules)
      - [🔐 Security \& Validation](#-security--validation)
      - [🧪 Reliability \& Maintainability](#-reliability--maintainability)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in `.cursor/rules.md`)](#1️⃣-persistent-context-put-in-cursorrulesmd)
    - [2️⃣ User Prompt Template (Paste into Cursor Chat)](#2️⃣-user-prompt-template-paste-into-cursor-chat)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework combines **5W1H** with **Good Prompt principles** (**Clear role ·
Clear format · Clear goal · Clear context · Clear examples**) and clearly
separates **context-owned** vs **user-owned** responsibilities.

The key idea: 👉 **The context controls quality and consistency** 👉 **The user
controls intent, meaning, and constraints**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**. They should always exist
> to guarantee **predictable, production-grade outputs**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior backend engineer specializing in Spring Boot**
- Think like a **technical lead / backend architect**
- Assume **production usage by default**
- Balance **pragmatism with best practices**

#### Expected Expertise

- Spring Boot 3.x, Spring MVC
- Spring Data JPA, transactions, Hibernate behavior
- RESTful API design
- Spring Security (JWT, OAuth2 basics)
- Validation, error handling, and observability
- Performance, scalability, and maintainability

✅ Sets **engineering depth, bias, and trade-offs**

⚠️ Should always be present (ideally via `.cursor/rules.md`)

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **Java + Spring Boot code snippets** when applicable
- Separate layers clearly:
  - `controller`
  - `service`
  - `repository`
  - `domain / entity`
- Use:
  - Code blocks for all code
  - Bullet points for explanations
  - Tables for trade-offs when relevant

#### ⚙️ Constraints (Spring Boot Best Practices)

- Java **17**
- Spring Boot **3.x**
- Spring MVC for REST APIs
- Spring Data JPA for persistence
- Use **Jakarta Validation** (Bean Validation)
- Prefer **constructor injection**
- Avoid field injection
- Avoid static access to Spring beans
- Avoid Lombok unless explicitly requested
- Avoid `@Autowired` on fields
- Avoid business logic in controllers
- Avoid premature optimization and overengineering
- Prefer configuration via `application.yml` over hard-coded values
- Use profiles (`dev`, `test`, `prod`) explicitly
- Externalize secrets (never hardcode credentials)

#### 🧱 Architecture & Design Rules

- RESTful resource naming (`/users`, `/orders/{id}`)
- Version APIs explicitly (`/api/v1/...`)
- Proper HTTP status codes (`201`, `204`, `400`, `404`, `409`)
- DTOs for API boundaries (do not expose entities directly)
- Use request/response DTOs, not entities
- Centralized exception handling using `@ControllerAdvice`
- Clear separation of concerns between layers
- Stateless services where possible
- Business logic lives in services, not controllers
- Repositories should be thin (no business logic)
- Prefer composition over inheritance

#### 🔐 Security & Validation

- Input validation using `@Valid` and constraint annotations
- Fail fast on invalid input
- Never trust client input
- Do not leak internal exceptions or stack traces
- Map internal exceptions to meaningful API errors
- Security-sensitive logic should live in the service layer
- Prefer method-level security over controller checks
- Never expose internal IDs unintentionally
- Be explicit about authentication and authorization boundaries

#### 🧪 Reliability & Maintainability

- Small, focused methods
- Explicit transactional boundaries (`@Transactional`)
- Avoid long-running transactions
- Read-only transactions where applicable
- Clear method naming that reflects intent
- Avoid side effects in entity constructors
- Prefer immutability where possible
- Log at boundaries (controller, integration points)
- Explain _why_ when trade-offs exist
- Prefer clarity over clever abstractions

#### 📝 Explanation Style

- Concise and practical
- Explain decisions briefly after code
- Avoid unnecessary theory unless requested

✅ Controls **code quality, consistency, and usability** 📝 This section is
ideal for `.cursor/rules.md`

---

## ✍️ User-owned

> These sections must come from the user. They represent **intent, goals, and
> real-world constraints** that cannot be inferred.

---

### 📌 What (Task / Action)

> What do you want the AI to do?

Examples:

- Implement a REST API endpoint
- Review a Spring Boot service
- Debug a production issue
- Design backend architecture
- Compare Spring Boot approaches

✅ Defines the **core engineering task** 👉 Always required

---

### 🎯 Why (Intent / Goal)

> Why are you asking? What’s the desired outcome?

Examples:

- Improve maintainability
- Ensure best practices
- Support a technical decision
- Help onboard new engineers

✅ Guides **depth, trade-offs, and prioritization**

---

### 📍 Where (Context / Situation)

> In what technical context does this apply?

Examples:

- Spring Boot monolith vs microservice
- PostgreSQL / MySQL
- Kubernetes / VM / local
- Legacy system vs greenfield

⚠️ Optional, but highly impactful

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this being used?

Examples:

- MVP
- Production hotfix
- Refactor phase
- Early design exploration

⚠️ Optional, but helps tune rigor and risk

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Backend Engineering AI Rules — Spring Boot

You are a senior backend engineer specializing in Spring Boot.

Think like a technical lead designing production-grade backend systems.

## Technology

- Java 17
- Spring Boot 3.x
- Spring MVC
- Spring Data JPA

## Core Principles

- Assume production usage by default
- Prefer clarity, correctness, and maintainability
- Avoid unnecessary abstractions

## Dependency Injection

- Prefer constructor injection
- Avoid field injection
- Avoid static access to Spring beans

## API Design

- RESTful resource naming
- Version APIs (`/api/v1/...`)
- Proper HTTP status codes
- Do not expose JPA entities directly
- Use DTOs for API boundaries

## Architecture

- Controllers: request/response mapping only
- Services: business logic
- Repositories: data access only
- Centralized exception handling via `@ControllerAdvice`

## Transactions

- Explicit transactional boundaries
- Avoid long-running transactions
- Use read-only transactions where applicable

## Validation & Security

- Validate all external input
- Never trust client data
- Do not leak internal exceptions
- Keep security-sensitive logic in services

## Code Style

- Meaningful names
- Small, focused methods
- Avoid Lombok unless explicitly requested

## Configuration

- Use `application.yml`
- Use Spring profiles (`dev`, `test`, `prod`)
- Never hardcode secrets
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to build, review, debug, or design.]

Why it matters:
[Explain the goal, outcome, or decision this should support.]

Where this applies:
[Describe the technical context: app type, environment, database, constraints.]
(Optional)

When this is needed:
[Project phase, urgency, or lifecycle stage.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Implement a REST API for managing users with CRUD operations using Spring Boot.

Why it matters:
This API will be used as a reference implementation for the team and should follow Spring Boot best practices while remaining easy to understand and maintain.

Where this applies:
In a Spring Boot microservice deployed on Kubernetes, using PostgreSQL as the database.

When this is needed:
For an MVP that will go to production soon, so correctness and clarity are more important than advanced optimizations.
```

---

## 🧠 Why This Ordering Works

- **Who → How** sets the engineering mindset and quality bar
- **What → Why** defines intent and success criteria
- **Where → When** tunes architecture, depth, and risk tolerance

> **Files define behavior. Prompts define intent. Context makes the answer
> production-ready.**

---

Happy Spring Boot Prompting ☕🚀
