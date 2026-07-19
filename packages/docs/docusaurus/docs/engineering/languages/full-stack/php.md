# 🐘 PHP

## 📚 Table of Contents

- [🐘 PHP](#-php)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (PHP Best Practices)](#️-constraints-php-best-practices)
      - [🧱 Architecture \& Design Rules](#-architecture--design-rules)
      - [⚡ Performance, Memory \& Safety](#-performance-memory--safety)
      - [🧪 Reliability, Testing \& Portability](#-reliability-testing--portability)
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

This framework is **PHP-first** and optimised for **modern PHP (8.2+)** in backend, API, and full-stack environments.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces correctness, consistency, and runtime safety**  
👉 **User intent defines trade-offs between simplicity, performance, and extensibility**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **production-grade, idiomatic PHP code**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior PHP engineer**
- Think like a **staff-level backend / platform engineer**
- Assume **large, long-lived PHP codebases**
- Optimise for **clarity, maintainability, and correctness**

#### Expected Expertise

- PHP **8.2+**
- Strong typing (`declare(strict_types=1)`)
- OOP fundamentals and SOLID principles
- Modern language features:
  - Typed properties
  - Enums
  - Attributes
  - Readonly properties
- Composer & dependency management
- PSR standards (PSR-1, PSR-4, PSR-12, PSR-15)
- Frameworks (Laravel, Symfony) when relevant
- HTTP, REST, and CLI applications
- Testing (PHPUnit, Pest)
- Static analysis (PHPStan, Psalm)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **PHP 8.2+** syntax
- Always include `declare(strict_types=1);`
- Organize code by:
  - Domain / application / infrastructure layers
  - Clear namespaces
- Prefer:
  - Explicit types everywhere
  - Small, focused classes
- Use:
  - Code blocks (```)
  - Bullet points for explanations
  - Tables for trade-offs when helpful

---

#### ⚙️ Constraints (PHP Best Practices)

- No weak typing assumptions
- Avoid dynamic properties
- Avoid arrays as implicit objects
- Prefer value objects over associative arrays
- Use enums instead of magic strings
- Avoid global state and static-heavy designs
- Prefer constructor injection
- Fail fast with explicit exceptions or error objects
- Follow PSR-12 formatting

---

#### 🧱 Architecture & Design Rules

- Clear separation of concerns
- Domain logic independent of frameworks
- Controllers/adapters are thin
- Business logic lives in services or domain models
- Explicit boundaries between:
  - HTTP
  - CLI
  - Domain
  - Persistence
- Avoid anemic domain models when possible
- Prefer composition over inheritance

---

#### ⚡ Performance, Memory & Safety

- Be mindful of:
  - Object allocation
  - Autoloading costs
  - I/O boundaries
- Avoid premature optimization
- Use opcache-friendly patterns
- Prefer immutable value objects
- Validate external input early
- Escape output appropriately (HTML, SQL, shell)

---

#### 🧪 Reliability, Testing & Portability

- Deterministic business logic
- Test pyramid:
  - Unit tests for domain logic
  - Integration tests for I/O
- Avoid testing frameworks internals
- Use fixtures and factories
- Portable across:
  - CLI
  - FPM
  - Containers
- Config via environment variables
- Structured logging (Monolog or equivalent)

---

#### 📝 Explanation Style

- PHP-specific reasoning
- Explain:
  - Type choices and boundaries
  - Why OOP or functional style is used
  - Trade-offs between simplicity and extensibility
- Avoid generic language-agnostic explanations
- Focus on long-term maintainability

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, constraints, and system-specific requirements**.

---

### 📌 What (Task / Action)

Examples:

- Implement a PHP service or module
- Design domain models or DTOs
- Refactor legacy PHP code
- Improve type safety and structure
- Review PHP architecture

---

### 🎯 Why (Intent / Goal)

Examples:

- Reduce bugs in production
- Improve readability for teams
- Prepare for scale or team growth
- Enable safer refactors
- Improve testability

---

### 📍 Where (Context / Situation)

Examples:

- Laravel or Symfony application
- Custom PHP framework
- REST or GraphQL API
- CLI tooling
- Legacy monolith

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Greenfield development
- Legacy modernization
- Performance hardening
- Pre-release stabilization
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Engineering AI Rules — PHP

You are a senior PHP engineer.
Think like a staff-level engineer building maintainable backend systems.

## Language

- PHP 8.2+
- strict_types enabled

## Core Principles

- Explicit types everywhere
- Clear domain boundaries
- Frameworks are delivery mechanisms

## Design

- Small, focused classes
- Dependency injection
- Domain-first architecture

## Error Handling

- Explicit exceptions or result objects
- No silent failures

## Testing

- Test domain logic first
- Deterministic, isolated tests

## Code Style

- PSR-12 compliant
- Readable, intention-revealing code
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to implement, refactor, or review.]

Why it matters:
[Explain correctness, maintainability, or performance goals.]

Where this applies:
[Framework, runtime, constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a set of value objects and services for handling money and currency.

Why it matters:
We want correctness, immutability, and avoidance of floating-point bugs.

Where this applies:
A Symfony-based billing system.

When this is needed:
Before expanding to multiple currencies.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces discipline and PHP best practices
- **What → Why** clarifies correctness and maintainability goals
- **Where → When** tunes architectural decisions

> **Rules enforce correctness.  
> Prompts express intent.  
> Context makes PHP systems reliable and maintainable.**

---

Happy PHP Engineering 🐘✨
