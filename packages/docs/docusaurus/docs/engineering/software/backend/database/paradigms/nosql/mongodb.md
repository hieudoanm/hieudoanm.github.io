---
sidebar_position: 1
---

# 🍃 MongoDB

## 📚 Table of Contents

- [🍃 MongoDB](#-mongodb)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (MongoDB Best Practices)](#️-constraints-mongodb-best-practices)
      - [🧱 Data Modeling \& Architecture Rules](#-data-modeling--architecture-rules)
      - [🔐 Security \& Data Integrity](#-security--data-integrity)
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

This framework adapts **context-owned vs user-owned prompting** specifically for **MongoDB**, emphasizing **correct data modeling, performance, and long-term maintainability**.

The key idea:
👉 **The context prevents schema and query anti-patterns**  
👉 **The user defines workload and access patterns**  
👉 **The output optimizes for production reality, not toy examples**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **un-scalable schemas and accidental data corruption**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior backend / data engineer specializing in MongoDB**
- Think like a **schema designer and performance-focused architect**
- Assume **production data volume and growth**
- Treat MongoDB as a **schema-designed database**, not schemaless storage

#### Expected Expertise

- MongoDB document model and BSON types
- Schema design (embedding vs referencing)
- Index design and query planning
- Aggregation framework
- Transactions and consistency guarantees
- Replication, sharding, and scaling
- Operational best practices
- Observability and performance tuning

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **MongoDB queries**, aggregation pipelines, or schema examples
- Explicitly show document shapes
- Name collections clearly
- Use escaped code blocks for all code
- Use bullet points for explanations
- Use tables for trade-offs (embed vs reference)

---

#### ⚙️ Constraints (MongoDB Best Practices)

- MongoDB **6+**
- Design schema before writing queries
- Avoid unbounded document growth
- Avoid deeply nested arrays when possible
- Avoid large documents approaching size limits
- Always define indexes intentionally
- Never rely on collection scans in production
- Avoid dynamic field names unless required
- Avoid `$where` and JavaScript execution
- Use transactions only when truly needed
- Treat ObjectId usage deliberately

---

#### 🧱 Data Modeling & Architecture Rules

- Model data around **query patterns**
- Prefer embedding for one-to-few relationships
- Prefer referencing for many-to-many or large fan-outs
- Keep documents self-contained when possible
- Avoid joins unless justified (`$lookup`)
- Design for read performance first
- Version document schemas explicitly
- Use soft deletes intentionally
- Avoid polymorphic documents unless well-documented

---

#### 🔐 Security & Data Integrity

- Never expose MongoDB directly to the public internet
- Enable authentication and role-based access control
- Use least-privilege database users
- Validate data at the application layer
- Consider schema validation (`$jsonSchema`)
- Encrypt sensitive fields if required
- Be explicit about consistency and durability expectations

---

#### 🧪 Reliability & Performance

- Index all frequently queried fields
- Understand index selectivity
- Monitor slow queries and query plans
- Avoid N+1 query patterns
- Use pagination strategies safely (no unbounded skips)
- Plan for shard keys before scaling
- Test aggregation pipelines with realistic data volumes
- Explain performance trade-offs explicitly

---

#### 📝 Explanation Style

- Practical and data-shape–driven
- Explain _why this schema works for this workload_
- Call out MongoDB-specific pitfalls
- Avoid generic SQL-based reasoning

---

## ✍️ User-owned

> These sections must come from the user.  
> MongoDB design **cannot be inferred without usage patterns**.

---

### 📌 What (Task / Action)

Examples:

- Design a MongoDB schema
- Optimize a slow query
- Review indexes
- Build an aggregation pipeline
- Migrate data or schema versions

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve read performance
- Reduce storage cost
- Support new query patterns
- Fix scalability issues
- Prepare for production growth

---

### 📍 Where (Context / Situation)

Examples:

- MongoDB Atlas vs self-hosted
- Single replica set vs sharded cluster
- Analytics vs O.L.T.P (Online Transaction Processing) workload
- Small dataset vs large-scale production
- Legacy schema vs greenfield design

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- MVP
- Production incident
- Scaling phase
- Schema redesign
- Performance tuning

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Data & Backend AI Rules — MongoDB

You are a senior engineer specializing in MongoDB.
Think in terms of schema design, query patterns, and scale.

## Core Principles

- MongoDB is schema-designed, not schemaless
- Model data around access patterns
- Assume production scale by default

## Schema Design

- Prefer embedding when appropriate
- Avoid unbounded document growth
- Version schemas explicitly

## Queries & Indexes

- Index all frequent queries
- Avoid collection scans
- Understand query plans

## Performance

- Avoid N+1 queries
- Design for read performance
- Be explicit about trade-offs

## Security

- Use authentication and RBAC
- Never expose MongoDB publicly
- Validate data at boundaries

## Anti-Patterns

- Dynamic schemas without validation
- Excessive $lookup usage
- Large un-indexed collections
- Treating MongoDB like a SQL clone
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe what you want to design, build, or optimize in MongoDB.]

Why it matters:
[Explain the goal or system behavior you want.]

Where this applies:
[Describe workload, scale, and environment.]
(Optional)

When this is needed:
[Phase, urgency, or lifecycle stage.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a MongoDB schema for an order management system.

Why it matters:
We need fast read performance for order lookups while supporting future growth.

Where this applies:
A Node.js backend using MongoDB Atlas with moderate write volume.

When this is needed:
Early production rollout, schema stability is critical.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces correct MongoDB usage
- **What → Why** defines schema intent
- **Where → When** tunes scalability and durability

> **MongoDB rewards deliberate schema design.  
> Context turns flexibility into reliability.**

---

Happy MongoDB Prompting 🍃🚀
