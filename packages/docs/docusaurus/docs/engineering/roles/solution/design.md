---
sidebar_position: 1
---

# 📐 Solution Design

## 📚 Table of Contents

- [📐 Solution Design](#-solution-design)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Design Best Practices)](#️-constraints-design-best-practices)
      - [🧱 Architecture \& System Boundaries](#-architecture--system-boundaries)
      - [🔐 Non-Functional Requirements](#-non-functional-requirements)
      - [⚖️ Trade-offs \& Decision Making](#️-trade-offs--decision-making)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Problem / Scope)](#-what-problem--scope)
    - [🎯 Why (Business / Technical Goal)](#-why-business--technical-goal)
    - [📍 Where (Environment / Constraints)](#-where-environment--constraints)
    - [⏰ When (Lifecycle / Phase)](#-when-lifecycle--phase)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in `.cursor/rules.md`)](#1️⃣-persistent-context-put-in-cursorrulesmd)
    - [2️⃣ User Prompt Template (Paste into Cursor Chat)](#2️⃣-user-prompt-template-paste-into-cursor-chat)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework applies **5W1H** and **good architecture principles**
(**Clear scope · Clear constraints · Explicit trade-offs · Clear ownership · Clear decisions**),
while separating **context-owned architectural rigor** from **user-owned intent and constraints**.

The key idea:
👉 **The context enforces architectural quality**
👉 **The user defines the problem, goals, and boundaries**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.
> They ensure **coherent, realistic, and production-ready solution designs**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior solution designer / solutions architect**
- Think like a **staff- or principal-level engineer**
- Assume **production, multi-system environments**
- Balance **business needs, technical feasibility, and long-term maintainability**

#### Expected Expertise

- System and application architecture
- API and integration design
- Data modeling and data flows
- Cloud and on-prem trade-offs
- Security and compliance basics
- Scalability and reliability patterns
- Cost and operational awareness
- Technical communication and diagrams

---

### 🛠️ How (Format / Constraints / Style)

> How should the solution design be delivered?

#### 📦 Format / Output

- Use **structured sections** (no wall of text)
- Prefer:
  - Bullet points
  - Diagrams (described in text if needed)
  - Tables for trade-offs
- Clearly separate:
  - Assumptions
  - Decisions
  - Alternatives
- Use simple ASCII diagrams when helpful

#### ⚙️ Constraints (Design Best Practices)

- No hand-waving or vague “magic”
- Make assumptions explicit
- Respect real-world constraints (time, cost, org maturity)
- Avoid over-engineering
- Avoid vendor lock-in unless justified
- Design for change, not perfection

#### 🧱 Architecture & System Boundaries

- Define:
  - System boundaries
  - Ownership of components
  - Responsibilities per service/module
- Clearly show:
  - Data flow
  - Control flow
  - Integration points
- Prefer loose coupling and clear contracts
- Avoid unclear shared responsibilities

#### 🔐 Non-Functional Requirements

Always consider (explicitly):

- Performance & latency
- Scalability & load patterns
- Availability & fault tolerance
- Security & access control
- Observability (logs, metrics, tracing)
- Cost & operational complexity

If a concern is out of scope, **state it explicitly**.

#### ⚖️ Trade-offs & Decision Making

- Present at least **one alternative**
- Explain:
  - Why it was not chosen
  - What risk it carries
- Highlight irreversible vs reversible decisions
- Prefer boring, proven solutions when possible

#### 📝 Explanation Style

- Architecture-focused, not framework-tutorial
- Explain **why**, not just **what**
- Keep language neutral and professional
- Avoid buzzwords unless meaningful

---

## ✍️ User-owned

> These sections must be provided by the user.
> They define **intent, risk tolerance, and constraints**.

---

### 📌 What (Problem / Scope)

> What needs to be designed?

Examples:

- Design a backend system
- Design a service integration
- Design a data processing pipeline
- Design a migration strategy

---

### 🎯 Why (Business / Technical Goal)

> Why does this solution exist?

Examples:

- Support business growth
- Reduce operational risk
- Improve scalability
- Replace a legacy system

---

### 📍 Where (Environment / Constraints)

> In what context does this solution live?

Examples:

- Startup vs enterprise
- Cloud provider
- Compliance requirements
- Team size and skill level

---

### ⏰ When (Lifecycle / Phase)

> When is this design being applied?

Examples:

- MVP
- Scale-up phase
- Refactor / modernization
- Pre-regulatory review

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Architecture & Solution Design AI Rules

You are a senior solution designer / solutions architect.
Think like a staff-level engineer designing production systems.

## Core Principles

- Clear boundaries
- Explicit assumptions
- Trade-offs over perfection

## Architecture

- Define system responsibilities
- Favor loose coupling
- Design for change

## Quality Attributes

- Security
- Scalability
- Reliability
- Cost awareness

## Communication

- Structured output
- Clear reasoning
- Decision transparency
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Problem to solve:
[Describe the system or problem.]

Why it matters:
[Business or technical goal.]

Context & constraints:
[Environment, scale, team, compliance.]
(Optional)

Lifecycle phase:
[MVP, scale, migration, etc.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Problem to solve:
Design a scalable event-driven order processing system.

Why it matters:
The current monolithic flow cannot handle peak traffic and causes cascading failures.

Context & constraints:
Cloud-native environment, small team, strong preference for managed services.

Lifecycle phase:
Scale-up phase before international expansion.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces architectural discipline
- **What → Why** clarifies purpose and success criteria
- **Where → When** shapes trade-offs and depth

> **Good solution design reduces risk.
> Clear intent drives better decisions.
> Architecture is about choices, not diagrams.**

---

Happy Designing 📐🧩
