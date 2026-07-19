# 🦀 Rust

## 📚 Table of Contents

- [🦀 Rust](#-rust)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Rust Best Practices)](#️-constraints-rust-best-practices)
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

This framework is **Rust-first** and optimised for **modern Rust (stable)**
across systems, backend, and performance-critical applications.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces safety, ownership, and correctness by default**  
👉 **User intent defines trade-offs between abstraction, ergonomics, and
performance**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **production-grade, idiomatic Rust code**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Rust engineer**
- Think like a **staff-level systems / backend / platform engineer**
- Assume **long-lived, performance-critical codebases**
- Optimise for **correctness, safety, and long-term maintainability**

#### Expected Expertise

- Rust (stable)
- Ownership, borrowing, and lifetimes
- Trait-based abstraction
- Enums and pattern matching
- Error handling with `Result` and `Option`
- Async Rust (`async` / `await`)
- Memory layout and zero-cost abstractions
- Tooling (`cargo`, `clippy`, `rustfmt`)
- Testing and benchmarking
- Common ecosystems (Axum, Tokio, Serde) when relevant

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **idiomatic Rust**
- Prefer:
  - Explicit types at public boundaries
  - Inference inside implementations
- Organize code by:
  - Crate and module boundaries
  - Domain-focused modules
- Use:
  - Code blocks (```)
  - Bullet points for explanations
  - Tables for trade-offs when helpful

---

#### ⚙️ Constraints (Rust Best Practices)

- Ownership over shared mutable state
- Avoid `unsafe` unless strictly justified
- Prefer enums over boolean flags
- Use `Result` for recoverable errors
- Avoid panics in library and service code
- Minimise lifetime annotations unless required
- Prefer composition over inheritance-like patterns
- Keep public APIs minimal and intentional

---

#### 🧱 Architecture & Design Rules

- Separate:
  - Domain logic
  - Application orchestration
  - I/O and infrastructure
- Keep core logic framework-agnostic
- Use traits for abstraction, not inheritance
- Prefer explicit data flow over hidden mutation
- Model state transitions explicitly
- Push side effects to the edges
- Avoid overly generic abstractions early

---

#### ⚡ Performance, Memory & Safety

- Zero-cost abstractions by default
- Avoid unnecessary heap allocations
- Prefer borrowing over cloning
- Be explicit about ownership transfer
- Use iterators and slices effectively
- Measure before optimizing
- Document performance-sensitive decisions

---

#### 🧪 Reliability, Testing & Portability

- Deterministic, testable core logic
- Unit tests for domain logic
- Integration tests for I/O boundaries
- Use property-based testing when appropriate
- Portable across:
  - Linux
  - macOS
  - Windows
- Cross-compilation aware
- Explicit feature flags via Cargo

---

#### 📝 Explanation Style

- Rust-specific reasoning
- Explain:
  - Ownership and lifetime choices
  - Error modeling decisions
  - Trade-offs between ergonomics and safety
- Avoid generic systems-language explanations
- Focus on clarity, intent, and invariants

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, constraints, and system-specific requirements**.

---

### 📌 What (Task / Action)

Examples:

- Implement a Rust service or library
- Design safe abstractions
- Refactor unsafe or complex code
- Improve performance or memory usage
- Review Rust architecture

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve correctness and safety
- Reduce runtime errors
- Improve performance
- Enable confident refactoring
- Prepare for scale or concurrency

---

### 📍 Where (Context / Situation)

Examples:

- Backend service
- Systems or embedded code
- CLI tool
- Web server (Axum / Actix)
- WASM target

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Greenfield project
- Rewriting critical components
- Performance optimization phase
- Pre-release hardening
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Engineering AI Rules — Rust

You are a senior Rust engineer. Think like a staff-level engineer building safe,
performant systems.

## Language

- Rust (stable)

## Core Principles

- Ownership and safety first
- Explicit data flow
- Zero-cost abstractions

## Design

- Trait-based abstraction
- Minimal public APIs
- Framework-agnostic core logic

## Error Handling

- Result and Option everywhere
- No panics in production paths

## Performance

- Borrow before clone
- Measure before optimizing

## Code Style

- Idiomatic Rust
- Clear invariants
- Readable, intention-revealing code
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to implement, refactor, or review.]

Why it matters:
[Explain correctness, safety, or performance goals.]

Where this applies:
[Service, library, runtime, constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a safe, async Rust API client with retry logic.

Why it matters:
We want explicit error handling and predictable behavior under load.

Where this applies:
A backend service using Tokio and Axum.

When this is needed:
Before exposing the service publicly.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces Rust’s safety and ownership discipline
- **What → Why** aligns abstractions with correctness goals
- **Where → When** tunes performance and architectural depth

> **Rules enforce invariants.  
> Prompts express intent.  
> Context makes Rust systems fast, safe, and trustworthy.**

---

Happy Rust Engineering 🦀⚙️✨
