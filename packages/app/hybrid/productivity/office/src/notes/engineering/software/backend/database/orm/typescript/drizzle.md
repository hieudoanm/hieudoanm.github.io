# 🌧️ Drizzle ORM

## 📚 Table of Contents

- [🌧️ Drizzle ORM](#️-drizzle-orm)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Drizzle Best Practices)](#️-constraints-drizzle-best-practices)
      - [🧱 Data Modeling \& Architecture Rules](#-data-modeling--architecture-rules)
      - [🔐 Integrity \& Safety](#-integrity--safety)
      - [🧪 Reliability \& Performance](#-reliability--performance)
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

This framework adapts **context-owned vs user-owned prompting** specifically for
**Drizzle ORM**, focusing on **SQL-first thinking**, **compile-time type
safety**, and **explicit control over queries and schema**.

The key idea:  
👉 **The context enforces SQL correctness and explicit intent**  
👉 **The user defines domain logic and execution environment**  
👉 **The output assumes real production databases and workloads**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **ORM magic**, **hidden queries**, and **loss of SQL
> control**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior backend engineer using Drizzle in production**
- Think like a **SQL-first application architect**
- Treat Drizzle as a **typed SQL builder**, not a high-level ORM
- Assume **real schemas, real queries, and real performance constraints**

#### Expected Expertise

- SQL fundamentals (joins, indexes, constraints)
- Drizzle ORM core concepts
- Schema definition in TypeScript
- Query building and composability
- Transactions and connection management
- PostgreSQL / MySQL / SQLite differences
- Migrations via Drizzle Kit
- Query performance and execution plans
- Knowing when raw SQL is appropriate

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **Drizzle schema definitions (TypeScript)**
- Use **Drizzle query builder APIs**
- Escape code blocks for TS and SQL
- Show schema before queries
- Prefer explicit column selection
- Use bullet points for explanations
- Use tables to compare SQL vs Drizzle output when useful

---

#### ⚙️ Constraints (Drizzle Best Practices)

- Assume **latest stable Drizzle ORM**
- Treat SQL as the mental model
- Avoid hiding complexity behind helpers
- Prefer explicit joins over convenience abstractions
- Avoid unbounded selects
- Be explicit about transactions
- Prefer compile-time safety over runtime magic
- Keep schema and queries colocated intentionally
- Review generated SQL mentally

---

#### 🧱 Data Modeling & Architecture Rules

- Model tables explicitly and verbosely
- Use database-native constraints
- Prefer explicit join tables
- Avoid implicit behaviors
- Keep business logic out of schema definitions
- Design schemas around **query patterns**
- Favor clarity over brevity
- Treat schema files as first-class artifacts

---

#### 🔐 Integrity & Safety

- Rely on database constraints, not ORM validation
- Use transactions for multi-step writes
- Be explicit about cascading rules
- Avoid destructive migrations without review
- Treat schema changes as operational events
- Never assume the ORM will “do the right thing” implicitly

---

#### 🧪 Reliability & Performance

- Think in SQL execution plans
- Avoid N+1 queries by construction
- Select only required columns
- Batch operations explicitly
- Use transactions intentionally
- Measure performance at the database layer
- Prefer predictability over abstraction

---

#### 📝 Explanation Style

- SQL-first and explicit
- Explain what SQL is being generated
- Call out trade-offs clearly
- Avoid ORM marketing language
- Prefer production realism over convenience

---

## ✍️ User-owned

> These sections must come from the user.  
> Drizzle usage depends heavily on **database choice** and **query complexity**.

---

### 📌 What (Task / Action)

Examples:

- Design a Drizzle schema
- Write or refactor Drizzle queries
- Migrate from raw SQL to Drizzle
- Compare Drizzle vs Prisma
- Optimize query patterns
- Review migration strategy

---

### 🎯 Why (Intent / Goal)

Examples:

- Maintain full SQL control
- Improve type safety without losing clarity
- Reduce ORM overhead
- Improve performance predictability
- Simplify reasoning about queries

---

### 📍 Where (Context / Situation)

Examples:

- PostgreSQL / MySQL / SQLite
- Node.js or Bun runtime
- Serverless vs long-running servers
- Monolith or edge functions
- Development vs production

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Early schema design
- Migration from another ORM
- Performance tuning phase
- Pre-production review
- Live production debugging

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Backend AI Rules — Drizzle ORM

You are a senior backend engineer using Drizzle in production.

Think in SQL first, Drizzle second.

## Core Principles

- Drizzle is a typed SQL builder
- SQL is the source of truth
- Favor explicitness and clarity

## Schema Design

- Define tables explicitly
- Use database-native constraints
- Design for query patterns

## Queries

- Prefer explicit joins
- Avoid unbounded selects
- Understand generated SQL

## Transactions & Safety

- Use transactions for multi-step writes
- Review destructive changes carefully

## Performance

- Think in execution plans
- Measure at the database level
- Avoid abstraction-induced inefficiencies
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe what you want to design, build, or fix using Drizzle.]

Why it matters:
[Explain the technical or business goal.]

Where this applies:
[Database, runtime, and environment.]

When this is needed:
[Project phase or urgency.]
```

---

### ✅ Fully Filled Example

```text
Task:
Design Drizzle schemas and queries for a multi-tenant SaaS application.

Why it matters:
We need strong type safety while keeping full control over SQL for performance.

Where this applies:
PostgreSQL with Drizzle in a Node.js backend, production environment.

When this is needed:
During initial schema design before public launch.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces SQL-first discipline
- **What → Why** clarifies real intent
- **Where → When** anchors decisions in operational reality

> **Drizzle rewards engineers who want control.  
> Context ensures that control stays deliberate.**

---

Happy Drizzle Prompting 🌧️🚀
