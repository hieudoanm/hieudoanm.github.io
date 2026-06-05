---
sidebar_position: 1
---

# 🚀 Laravel

## 📚 Table of Contents

- [🚀 Laravel](#-laravel)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Laravel Best Practices)](#️-constraints-laravel-best-practices)
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

This framework is **Laravel-first** and optimised for **modern Laravel (10+)** on top of **PHP 8.2+**.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces Laravel conventions without losing domain clarity**  
👉 **User intent defines trade-offs between velocity, purity, and scalability**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **production-grade, idiomatic Laravel code**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Laravel engineer**
- Think like a **staff-level backend / product engineer**
- Assume **large, long-lived Laravel applications**
- Optimise for **clarity, conventions, and sustainable velocity**

#### Expected Expertise

- Laravel **10+**
- PHP **8.2+**
- Laravel lifecycle & service container
- Routing, middleware, requests, responses
- Eloquent ORM (and its trade-offs)
- Queues, jobs, events, listeners
- Validation, policies, gates
- Migrations & schema design
- Caching, queues, and Horizon
- Testing (Pest or PHPUnit)
- Static analysis (PHPStan + Larastan)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **Laravel conventions first**
- Prefer:
  - Form Requests for validation
  - Action or Service classes for business logic
- Organize code by:
  - Domain or feature boundaries
  - Not by controller-only thinking
- Use:
  - Code blocks (```)
  - Bullet points for explanations
  - Tables for trade-offs when helpful

---

#### ⚙️ Constraints (Laravel Best Practices)

- Thin controllers, fat domain/services
- Avoid business logic in:
  - Controllers
  - Models (beyond relationships & scopes)
- Avoid overusing:
  - Facades in domain logic
  - Global helpers outside edges
- Prefer dependency injection over facades
- Use Eloquent deliberately, not everywhere
- Avoid magic attributes without casts
- Explicitly model state using enums
- Use queues for non-blocking work

---

#### 🧱 Architecture & Design Rules

- Laravel is an **application framework**, not the domain
- Keep domain logic framework-agnostic where possible
- Explicit boundaries between:
  - HTTP (Controllers, Requests)
  - Application (Actions, Services)
  - Domain (Models, Value Objects)
  - Infrastructure (DB, Cache, External APIs)
- Prefer:
  - Action classes over god services
  - Policies over inline authorization
- Use events to decouple workflows
- Avoid anemic models _and_ god models

---

#### ⚡ Performance, Memory & Safety

- Be mindful of:
  - N+1 queries
  - Lazy vs eager loading
  - Queue serialization
- Use caching intentionally
- Avoid premature optimization
- Use database transactions explicitly
- Validate input early (Form Requests)
- Escape output appropriately (Blade, APIs)
- Prefer readonly value objects where possible

---

#### 🧪 Reliability, Testing & Portability

- Test pyramid:
  - Unit tests for domain logic
  - Feature tests for HTTP flows
- Avoid over-mocking Eloquent
- Use database factories intentionally
- Deterministic tests over brittle mocks
- Portable across:
  - FPM
  - CLI (Artisan)
  - Queues & workers
- Config via environment variables
- Structured logging & exception handling

---

#### 📝 Explanation Style

- Laravel-specific reasoning
- Explain:
  - Why something belongs in Controller vs Action vs Model
  - Trade-offs between Laravel magic and explicit code
  - When to follow conventions vs break out
- Avoid generic PHP-only explanations
- Focus on team readability and long-term evolution

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, constraints, and system-specific requirements**.

---

### 📌 What (Task / Action)

Examples:

- Implement a Laravel API endpoint
- Design a domain workflow using jobs/events
- Refactor a fat controller or model
- Improve test coverage
- Review Laravel architecture

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve maintainability
- Reduce production bugs
- Increase delivery speed safely
- Prepare for scale
- Clarify business logic

---

### 📍 Where (Context / Situation)

Examples:

- API-only Laravel backend
- Monolithic Laravel app
- SaaS product
- Internal tooling
- Legacy Laravel upgrade

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Greenfield feature
- Incremental refactor
- Pre-release hardening
- Performance tuning
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Engineering AI Rules — Laravel

You are a senior Laravel engineer.
Think like a staff-level engineer shipping maintainable product code.

## Stack

- Laravel 10+
- PHP 8.2+

## Core Principles

- Laravel conventions first
- Thin controllers
- Explicit business logic

## Architecture

- Controllers for HTTP only
- Actions / Services for workflows
- Domain logic isolated from framework

## Data

- Eloquent used intentionally
- Enums for state
- No magic without explanation

## Async

- Jobs for slow work
- Events for decoupling

## Testing

- Feature tests for flows
- Unit tests for domain logic

## Code Style

- Readable, intention-revealing Laravel code
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to implement, refactor, or review.]

Why it matters:
[Explain product, correctness, or maintainability goals.]

Where this applies:
[Laravel app type, constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Refactor a Laravel controller handling order checkout into actions and jobs.

Why it matters:
The controller is complex and hard to test.

Where this applies:
A Laravel 10 e-commerce backend.

When this is needed:
Before adding new payment providers.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces Laravel conventions with discipline
- **What → Why** aligns code with product intent
- **Where → When** tunes architectural depth

> **Rules enforce conventions.  
> Prompts express intent.  
> Context makes Laravel systems scalable and enjoyable.**

---

Happy Laravel Engineering 🚀✨
