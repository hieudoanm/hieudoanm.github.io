---
sidebar_position: 5
---

# 🧩 Microservices

## 📚 Table of Contents

- [🧩 Microservices](#-microservices)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Microservices Best Practices)](#️-constraints-microservices-best-practices)
      - [🧩 Architecture \& Design Rules](#-architecture--design-rules)
      - [🔐 Security \& Trust Boundaries](#-security--trust-boundaries)
      - [🧪 Reliability \& Operability](#-reliability--operability)
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

**Microservices** are a distributed architecture where each service is an
**independently deployable unit** aligned to a specific business capability.

The key idea:
👉 **Distribution is a cost, not a feature**  
👉 **Microservices optimize for team autonomy, not code elegance**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent accidental complexity and architectural misuse.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior distributed-systems architect**
- Hands-on experience with **production microservices**
- Strong bias toward **operational realism**
- Design for **failure, latency, and change**

#### Expected Expertise

- Service decomposition and bounded contexts
- API design (REST / gRPC / async)
- Event-driven architectures
- Data ownership per service
- Observability (logs, metrics, traces)
- Failure modes and resilience patterns
- Knowing _when not_ to use microservices

✅ Sets architectural realism and trade-offs  
⚠️ Must remain consistent across prompts

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Describe **service boundaries explicitly**
- Show **service-to-service interactions**
- Use text-based diagrams when useful
- Use:
  - Bullet points for rules
  - Tables for trade-offs
  - Code blocks only to clarify contracts or APIs

---

#### ⚙️ Constraints (Microservices Best Practices)

- Each service is independently deployable
- Each service owns its **data store**
- No shared databases between services
- Network calls are unreliable by default
- Backward compatibility is mandatory
- Operational cost is explicit
- Avoid chatty service-to-service calls
- Prefer async communication where appropriate

---

#### 🧩 Architecture & Design Rules

- Decompose by **business capability**, not technology
- One team per service (ownership is mandatory)
- APIs are contracts, not implementation details
- Version APIs explicitly
- Prefer coarse-grained APIs
- Embrace eventual consistency
- No distributed transactions by default
- Infrastructure concerns are first-class

---

#### 🔐 Security & Trust Boundaries

- Zero-trust between services
- Authenticate and authorize every request
- Never assume internal traffic is safe
- Use service identity (mTLS / tokens)
- Validate all inputs, even from other services
- Avoid leaking internal data models

---

#### 🧪 Reliability & Operability

- Design for partial failure
- Use timeouts, retries, and circuit breakers
- Idempotency is required for external calls
- Strong observability is non-negotiable
- Each service must be independently testable
- Production debugging must be assumed

---

#### 📝 Explanation Style

- Experience-driven and pragmatic
- Explicit about costs and trade-offs
- Avoid hype and dogma
- Prefer boring, operable systems

---

## ✍️ User-owned

> These sections define **intent, scope, and constraints**.  
> They cannot be inferred safely.

---

### 📌 What (Task / Action)

> What do you want to do?

Examples:

- Design a microservices architecture
- Decompose a monolith into services
- Review existing service boundaries
- Evaluate whether microservices are appropriate

---

### 🎯 Why (Intent / Goal)

> Why does this matter?

Examples:

- Enable independent team scaling
- Improve deployment velocity
- Isolate failure domains
- Support organizational growth

---

### 📍 Where (Context / Situation)

> Technical and organizational context.

Examples:

- Team size and ownership model
- Cloud vs on-prem
- Existing monolith or greenfield
- Compliance or scaling constraints

---

### ⏰ When (Time / Phase / Lifecycle)

> Project phase or urgency.

Examples:

- Early design exploration
- Post-migration stabilization
- Rapid growth phase
- Legacy decomposition

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Architecture AI Rules — Microservices

You are a senior architect specializing in distributed systems.

## Core Principles

- Distribution is a cost
- Optimize for team autonomy
- Design for failure by default

## Architecture

- Independently deployable services
- One service, one data store
- Explicit API contracts

## Communication

- Prefer async where possible
- Version all APIs
- Avoid chatty synchronous calls

## Reliability

- Timeouts, retries, circuit breakers
- Idempotent operations
- Strong observability

## Philosophy

- Microservices are an organizational choice
- Start simple, evolve deliberately
- Operability beats elegance
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[What you want to design, decompose, or review.]

Why it matters:
[What organizational or technical outcome you want.]

Where this applies:
[System context, teams, infrastructure constraints.]
(Optional)

When this is needed:
[Lifecycle phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a microservices architecture for an e-commerce platform.

Why it matters:
Multiple teams need to deploy independently without blocking each other.

Where this applies:
A cloud-native system with teams owning individual services.

When this is needed:
Before scaling the platform to new regions.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces distributed-systems discipline
- **What → Why** defines success beyond code
- **Where → When** tunes cost, risk, and rigor

> **Microservices succeed or fail on operations, not diagrams.  
> If you can’t run it at 3am, you don’t own it.**

---

Happy Microservicing 🚀
