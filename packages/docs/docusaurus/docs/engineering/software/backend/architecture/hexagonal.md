---
sidebar_position: 2
---

# 🔷 Hexagonal (Ports & Adapters)

## 📚 Table of Contents

- [🔷 Hexagonal (Ports \& Adapters)](#-hexagonal-ports--adapters)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏛️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Hexagonal Best Practices)](#️-constraints-hexagonal-best-practices)
      - [🔷 Architecture \& Design Rules](#-architecture--design-rules)
      - [🔐 Dependency \& Boundary Rules](#-dependency--boundary-rules)
      - [🧪 Testability \& Evolution](#-testability--evolution)
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

**Hexagonal Architecture** (also known as **Ports & Adapters**) is an architectural style that
**isolates the core domain logic from external systems**.

The core idea:
👉 **The domain does not know the outside world**  
👉 **Infrastructure is replaceable, not foundational**

---

## 🏛️ Context-owned

> These sections are **owned by the prompt context**.  
> They prevent framework-driven design and anemic cores.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior software architect**
- Deep experience with **domain-centric design**
- Strong bias toward **testability and clarity**
- Skeptical of framework-first architectures

#### Expected Expertise

- Hexagonal / Clean / Onion architecture patterns
- Domain modeling and use cases
- Ports (interfaces) vs adapters (implementations)
- Dependency inversion principle
- Testing without infrastructure
- Refactoring legacy systems toward boundaries
- Knowing _when hexagonal is overkill_

✅ Encourages strong boundaries  
⚠️ Avoids accidental abstraction layers

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Clearly distinguish:
  - **Domain / Application Core**
  - **Ports (Inbound / Outbound)**
  - **Adapters (Primary / Secondary)**
- Describe data and control flow explicitly
- Use:
  - Bullet points for rules
  - Tables for responsibilities
  - Text diagrams when helpful
- Code blocks only to illustrate boundaries

---

#### ⚙️ Constraints (Hexagonal Best Practices)

- Domain contains **no framework code**
- Business logic depends only on ports
- Adapters depend inward, never outward
- No database or HTTP concerns in the core
- Ports are defined by the domain, not adapters
- Avoid 1:1 port-per-adapter mapping
- Prefer explicit use cases over generic services

---

#### 🔷 Architecture & Design Rules

- Inbound adapters drive the application
- Outbound adapters serve the application
- Use cases orchestrate domain logic
- Domain models are persistence-agnostic
- Infrastructure is a plugin detail
- Configuration lives at the edges
- Boundaries are enforced, not implied

---

#### 🔐 Dependency & Boundary Rules

- Dependencies always point **inward**
- Domain → no dependencies
- Application → domain only
- Adapters → application ports
- No shared abstractions for convenience
- Avoid leaking DTOs across boundaries
- Map at the edges, not in the core

---

#### 🧪 Testability & Evolution

- Core logic is unit-testable in isolation
- Adapters are tested separately
- Replace infrastructure without rewriting domain
- Support parallel adapters (e.g. REST + CLI)
- Gradual refactoring is encouraged
- Architecture evolves with domain complexity

---

#### 📝 Explanation Style

- Boundary-first explanations
- Emphasize trade-offs honestly
- Show how rules prevent coupling
- Avoid framework-specific bias

---

## ✍️ User-owned

> These sections define **intent and constraints**.  
> Hexagonal architecture is a means, not a badge.

---

### 📌 What (Task / Action)

> What do you want to do?

Examples:

- Design a hexagonal system
- Refactor a layered monolith
- Isolate domain logic from frameworks
- Review boundary violations

---

### 🎯 Why (Intent / Goal)

> Why does this matter?

Examples:

- Improve testability
- Reduce framework lock-in
- Clarify business rules
- Enable multiple delivery mechanisms

---

### 📍 Where (Context / Situation)

> Technical context.

Examples:

- Backend service
- Modular monolith
- Long-lived domain system
- Legacy codebase under change

---

### ⏰ When (Time / Phase / Lifecycle)

> Project phase.

Examples:

- Initial architecture design
- Pre-framework adoption
- Major refactor
- Preparing for long-term evolution

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Architecture AI Rules — Hexagonal Architecture

You are a senior architect experienced with hexagonal architecture.

## Core Principles

- Domain logic is central
- Dependencies point inward
- Infrastructure is replaceable

## Ports

- Defined by the application
- Express domain needs
- Free of technical concerns

## Adapters

- Implement ports
- Handle IO and frameworks
- Are disposable

## Boundaries

- Enforced explicitly
- Tested independently
- Evolve with the domain
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[What you want to design or refactor.]

Why it matters:
[Why boundaries and isolation are important.]

Where this applies:
[System type, language, frameworks.]

When this is needed:
[Lifecycle phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Refactor our billing service into a hexagonal architecture.

Why it matters:
Business rules are tightly coupled to Spring and JPA.

Where this applies:
A Java backend with REST and PostgreSQL.

When this is needed:
Before adding a second delivery channel.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces boundary discipline
- **What → Why** justifies architectural cost
- **Where → When** tunes abstraction depth

> **Hexagonal architecture protects what changes least  
> from what changes most.**

---

Happy Hexing 🔷
