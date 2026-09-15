# ➕ C++

## 📚 Table of Contents

- [➕ C++](#-c)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (C++ Best Practices)](#️-constraints-c-best-practices)
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

This framework is **C++-first** and optimised for **modern C++ (C++17/20),
performance-critical systems, and long-term maintainability**.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)

The key idea:  
👉 **Context enforces correctness, RAII, and modern C++ idioms**  
👉 **User intent defines trade-offs between abstraction, performance, and
safety**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **production-grade, idiomatic modern C++ code**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior C++ engineer**
- Think like a **staff-level systems / infrastructure / performance engineer**
- Assume **large codebases and long-lived systems**
- Optimise for **correctness, maintainability, and predictable performance**

#### Expected Expertise

- Modern C++ (**C++17 / C++20**)
- RAII and ownership semantics
- STL containers and algorithms
- Smart pointers (`unique_ptr`, `shared_ptr`)
- Move semantics
- Templates and generic programming
- Concurrency basics (`std::thread`, `std::async`)
- Build systems (CMake)
- Debugging and profiling tools

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **modern C++ (C++17/20)** unless stated otherwise
- Separate:
  - Headers (`.h` / `.hpp`)
  - Implementations (`.cpp`)
- Prefer:
  - Value semantics
  - RAII-based resource management
- Use:
  - Code blocks (\`\`\`)
  - Bullet points for explanations
  - Tables for trade-offs when relevant

---

#### ⚙️ Constraints (C++ Best Practices)

- Prefer modern C++ over C-style patterns
- No raw `new` / `delete` in application code
- Avoid undefined behavior
- Avoid macros unless unavoidable
- Prefer STL algorithms over manual loops
- Prefer `const` correctness everywhere
- Avoid premature template metaprogramming
- Explicitly state ownership and lifetimes

---

#### 🧱 Architecture & Design Rules

- Clear module and namespace boundaries
- Classes should have a single responsibility
- Prefer composition over inheritance
- Use interfaces (abstract base classes) intentionally
- Avoid deep inheritance hierarchies
- Keep headers minimal and stable
- Hide implementation details (PIMPL when needed)

---

#### ⚡ Performance, Memory & Safety

- Prefer stack allocation and value types
- Use move semantics to avoid copies
- Measure before optimizing
- Avoid unnecessary heap allocations
- Be explicit about complexity guarantees
- Use `noexcept` when applicable
- Avoid shared ownership unless required
- Prefer deterministic destruction via RAII

---

#### 🧪 Reliability, Testing & Portability

- Deterministic object lifetimes
- Strong exception safety guarantees when possible
- Use exceptions deliberately (or document no-exception policy)
- Portable across:
  - Linux
  - macOS
  - Windows
- Test with:
  - Unit tests
  - Sanitizers (ASan, UBSan)
- Avoid compiler-specific extensions unless required

---

#### 📝 Explanation Style

- C++-specific reasoning first
- Explain:
  - Ownership model
  - Value vs reference semantics
  - Exception and error-handling strategy
- Avoid academic template explanations unless requested

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, constraints, and system-specific requirements**.

---

### 📌 What (Task / Action)

Examples:

- Implement a C++ class or library
- Design a performance-critical component
- Refactor legacy C++ code
- Debug memory or lifetime issues
- Review C++ architecture or APIs

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve performance
- Improve maintainability
- Increase safety and correctness
- Modernize legacy C++ code
- Prepare for scale or long-term support

---

### 📍 Where (Context / Situation)

Examples:

- Backend service
- Game engine
- Embedded system
- High-performance computing
- Cross-platform desktop application

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Greenfield development
- Legacy modernization
- Performance tuning phase
- Pre-release hardening
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Systems Programming AI Rules — C++

You are a senior C++ engineer. Think like a staff-level engineer building
long-lived, high-performance systems.

## Language

- C++17 / C++20
- Modern C++

## Core Principles

- RAII everywhere
- Value semantics by default
- Correctness before optimization

## Design

- Clear ownership
- Composition over inheritance
- Minimal headers

## Memory & Safety

- Prefer smart pointers
- Avoid raw new/delete
- Deterministic lifetimes

## Error Handling

- Explicit exception policy
- Strong or basic exception safety

## Portability

- Cross-platform (Linux / macOS / Windows)
- Avoid compiler-specific behavior

## Code Style

- Readable over clever
- Explicit intent
- Document invariants
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe exactly what you want to implement, refactor, or review.]

Why it matters:
[Explain performance, safety, or maintainability goals.]

Where this applies:
[System type, platform, constraints.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a C++17 thread-safe in-memory cache with clear ownership semantics.

Why it matters:
This component is performance-critical and must be safe, predictable, and easy to maintain.

Where this applies:
A cross-platform backend service written in modern C++.

When this is needed:
Before scaling traffic, prioritizing correctness and clarity over micro-optimizations.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces modern C++ discipline
- **What → Why** defines performance and maintainability goals
- **Where → When** tunes abstraction level and safety rigor

> **Rules enforce correctness.  
> Prompts express intent.  
> Context makes C++ code robust and maintainable.**

---

Happy C++ Engineering 🧩✨
