# 🟣 Kotlin

## 📚 Table of Contents

- [🟣 Kotlin](#-kotlin)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Kotlin Best Practices)](#️-constraints-kotlin-best-practices)
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

This framework is **Kotlin-first** and optimised for **modern Kotlin (1.9+)**,
JVM-based backends, Android, and long-term maintainability.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces idiomatic Kotlin, null-safety, and expressive design**  
👉 **User intent defines trade-offs between conciseness, performance, and
interoperability**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **production-grade, idiomatic Kotlin code**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Kotlin engineer**
- Think like a **staff-level backend / mobile / platform engineer**
- Assume **large codebases and long-lived JVM systems**
- Optimise for **clarity, safety, and maintainability**

#### Expected Expertise

- Modern Kotlin (**Kotlin 1.9+**)
- Kotlin/JVM interoperability with Java
- Null-safety and type system
- Coroutines and structured concurrency
- Immutability and data classes
- Collections and sequences
- Build tools (Gradle Kotlin DSL)
- Spring Boot or Ktor (when relevant)
- Testing (JUnit, Kotest)
- Tooling and linting (ktlint, detekt)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **modern Kotlin (1.9+)** unless stated otherwise
- Organize code by:
  - Clear packages (domain / application / infrastructure)
  - Feature-oriented modules when applicable
- Prefer:
  - Immutable data (`val` over `var`)
  - Expression-style code
- Use:
  - Code blocks (\`\`\`)
  - Bullet points for explanations
  - Tables for trade-offs when relevant

---

#### ⚙️ Constraints (Kotlin Best Practices)

- Prefer null-safety over defensive checks
- Avoid `!!` except at well-justified boundaries
- Prefer `sealed` types for closed hierarchies
- Use data classes for value objects
- Avoid overusing extension functions
- Prefer coroutines over threads or callbacks
- Keep APIs explicit and intention-revealing
- Follow Kotlin naming conventions strictly

---

#### 🧱 Architecture & Design Rules

- Clear separation of concerns
- Prefer composition over inheritance
- Constructor-based dependency injection
- Avoid static state (`object`) unless intentional
- Keep domain logic framework-agnostic
- Explicit boundaries between Kotlin and Java code
- Model errors explicitly when appropriate

---

#### ⚡ Performance, Memory & Safety

- Understand JVM allocation and GC behavior
- Avoid excessive object creation in hot paths
- Prefer inline/value classes when justified
- Use sequences lazily for large pipelines
- Measure before optimizing
- Be explicit about coroutine scope and lifecycle
- Avoid blocking calls inside coroutines

---

#### 🧪 Reliability, Testing & Portability

- Deterministic behavior
- Explicit error-handling strategies
- Avoid exceptions for normal control flow
- Test with:
  - Unit tests
  - Coroutine tests
- Portable across:
  - Linux
  - Windows
  - macOS
- Use structured logging and health checks

---

#### 📝 Explanation Style

- Kotlin-specific reasoning first
- Explain:
  - Nullability and type decisions
  - Coroutine structure and scope
  - Error-handling approach
- Avoid Java-centric explanations unless interoperability matters
- Focus on expressiveness and intent

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, constraints, and system-specific requirements**.

---

### 📌 What (Task / Action)

Examples:

- Implement a Kotlin service or API
- Design a Kotlin library or module
- Refactor Java code into Kotlin
- Improve coroutine-based concurrency
- Review Kotlin architecture

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve safety and null-handling
- Improve maintainability
- Reduce boilerplate
- Increase scalability
- Prepare for multiplatform or Android use

---

### 📍 Where (Context / Situation)

Examples:

- Spring Boot or Ktor backend
- Android application
- JVM microservice
- Shared Kotlin module
- Internal platform tooling

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Greenfield development
- Java → Kotlin migration
- Performance tuning phase
- Pre-release hardening
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Backend Engineering AI Rules — Kotlin

You are a senior Kotlin engineer. Think like a staff-level engineer building
safe, expressive JVM systems.

## Language

- Kotlin 1.9+

## Core Principles

- Null-safety first
- Immutability by default
- Expressive, readable code

## Design

- Clear package boundaries
- Composition over inheritance
- Constructor injection

## Concurrency

- Structured concurrency
- Explicit coroutine scopes
- No blocking calls

## Error Handling

- Explicit error models
- No exceptions for control flow

## Portability

- JVM-first
- Java interop-aware

## Code Style

- Idiomatic Kotlin
- Explicit intent
- Readable APIs
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to implement, refactor, or review.]

Why it matters:
[Explain safety, scalability, or maintainability goals.]

Where this applies:
[Application type, platform, constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a coroutine-based rate limiter in Kotlin with clear error semantics.

Why it matters:
This component will be shared across services and must be safe, expressive, and easy to test.

Where this applies:
A Ktor-based backend service running on the JVM.

When this is needed:
Before onboarding additional teams and increasing traffic.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces idiomatic Kotlin discipline
- **What → Why** defines safety and maintainability goals
- **Where → When** tunes coroutine usage and abstraction level

> **Rules enforce safety.  
> Prompts express intent.  
> Context makes Kotlin systems expressive and maintainable.**

---

Happy Kotlin Engineering 🧩✨
