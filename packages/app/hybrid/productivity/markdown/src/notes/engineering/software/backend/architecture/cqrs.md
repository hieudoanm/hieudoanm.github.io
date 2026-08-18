# 🔀 CQRS (Command Query Responsibility Segregation)

## 📚 Table of Contents

- [🔀 CQRS (Command Query Responsibility Segregation)](#-cqrs-command-query-responsibility-segregation)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (CQRS Best Practices)](#️-constraints-cqrs-best-practices)
      - [🔀 Architecture \& Design Rules](#-architecture--design-rules)
      - [🔐 Consistency \& Validation](#-consistency--validation)
      - [🧪 Reliability \& Evolution](#-reliability--evolution)
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

**CQRS** is an architectural pattern that **separates write models (Commands)**
from **read models (Queries)**.

The key idea: 👉 **Reads and writes have different responsibilities**  
👉 **Optimizing both with one model creates accidental complexity**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They prevent overengineering and misuse of CQRS.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior software architect**
- Deep experience with **CQRS and event-driven systems**
- Bias toward **simplicity before separation**
- Strong understanding of **domain modeling**

#### Expected Expertise

- CQRS fundamentals and trade-offs
- Command vs Query modeling
- Event-driven architectures (optional)
- Eventual consistency
- Read-model projection strategies
- Schema evolution
- Knowing _when not_ to use CQRS

✅ Sets architectural restraint and judgment  
⚠️ Must remain consistent across prompts

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Clearly distinguish **Command** and **Query** paths
- Show read/write flow explicitly
- Describe projections in text when relevant
- Use:
  - Bullet points for rules
  - Tables for trade-offs
  - Code blocks only to clarify separation

---

#### ⚙️ Constraints (CQRS Best Practices)

- Commands mutate state, never return data
- Queries return data, never mutate state
- Read and write models are independent
- Do not share domain models between read/write
- Eventual consistency is explicit
- CQRS is optional, not mandatory
- Avoid CQRS for simple CRUD systems
- Prefer incremental adoption

---

#### 🔀 Architecture & Design Rules

- Commands represent **intent**, not actions
- Commands validate business rules
- Queries are optimized for consumers
- Read models may be denormalized
- Write models prioritize consistency
- Separate scaling concerns for reads and writes
- Infrastructure should not leak into domain logic

---

#### 🔐 Consistency & Validation

- Validate commands aggressively
- Fail fast on invalid intent
- Accept stale reads explicitly
- Never fake strong consistency
- Make consistency boundaries visible
- Avoid hidden coupling between projections

---

#### 🧪 Reliability & Evolution

- Projections must be rebuildable
- Events (if used) are immutable
- Schema evolution must be planned
- Backward compatibility matters
- Monitoring lag between write and read models
- Prefer boring rebuild strategies

---

#### 📝 Explanation Style

- Precise and example-driven
- Explain _why CQRS is justified_
- Call out complexity honestly
- Avoid CQRS evangelism

---

## ✍️ User-owned

> These sections define **intent and constraints**.  
> CQRS is never automatic.

---

### 📌 What (Task / Action)

> What do you want to do?

Examples:

- Decide whether CQRS is appropriate
- Design a CQRS-based system
- Introduce CQRS incrementally
- Review an existing CQRS implementation

---

### 🎯 Why (Intent / Goal)

> Why does this matter?

Examples:

- High read/write asymmetry
- Complex business rules
- Scalability bottlenecks
- Need for optimized read models

---

### 📍 Where (Context / Situation)

> Technical context.

Examples:

- Monolith vs microservices
- Event-driven system
- High-traffic read workloads
- Regulatory or audit requirements

---

### ⏰ When (Time / Phase / Lifecycle)

> Project phase.

Examples:

- Early design exploration
- Post-MVP scaling
- Performance refactor
- Legacy system evolution

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Architecture AI Rules — CQRS

You are a senior architect experienced with CQRS.

## Core Principles

- Separate reads from writes
- Optimize models independently
- Accept eventual consistency

## Commands

- Represent intent
- Validate business rules
- Mutate state only

## Queries

- Never mutate state
- Optimized for consumers
- May be denormalized

## Evolution

- Projections are rebuildable
- Avoid CQRS unless justified
- Complexity must pay for itself
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[What you want to design or evaluate.]

Why it matters:
[Why CQRS might be needed.]

Where this applies:
[System type, scale, constraints.]
(Optional)

When this is needed:
[Lifecycle phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Evaluate whether CQRS fits our order management system.

Why it matters:
Reads are high-volume and writes involve complex validation.

Where this applies:
A modular monolith with PostgreSQL and Kafka.

When this is needed:
Before scaling to 10x traffic.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces architectural restraint
- **What → Why** justifies complexity
- **Where → When** tunes consistency and cost

> **CQRS is a scalpel, not a hammer.  
> Use it only when pain justifies precision.**

---

Happy CQRS-ing 🔀
