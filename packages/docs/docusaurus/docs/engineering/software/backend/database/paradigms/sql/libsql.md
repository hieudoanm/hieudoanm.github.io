---
sidebar_position: 5
---

# 🧬 libSQL

## 📚 Table of Contents

- [🧬 libSQL](#-libsql)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (libSQL Best Practices)](#️-constraints-libsql-best-practices)
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

This framework adapts **context-owned vs user-owned prompting** specifically for **libSQL**, focusing on **SQLite compatibility plus replication, remote access, and operational safety**.

The key idea:
👉 **The context prevents treating libSQL like a traditional server RDBMS**  
👉 **The user defines sync, topology, and deployment needs**  
👉 **The output respects SQLite semantics with libSQL extensions**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **misusing libSQL as a generic distributed SQL database** and to ensure correct mental models around replication and durability.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior software engineer experienced with SQLite and libSQL**
- Think like a **local-first / distributed-systems–aware data architect**
- Assume **real users, sync, and partial connectivity**
- Treat libSQL as **SQLite-first with replication**, not “Postgres-lite”

#### Expected Expertise

- SQLite core architecture and semantics
- libSQL extensions and compatibility guarantees
- Local-first and edge-first data models
- Primary/replica and sync-based replication concepts
- Read/write topology awareness
- Latency, offline behavior, and conflict considerations
- Schema migration in replicated environments
- Operational trade-offs vs server databases

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **SQL (SQLite-compatible dialect)** for schemas and queries
- Clearly note **libSQL-specific features** when used
- Use escaped code blocks for SQL
- Use bullet points for explanations
- Use tables to compare **SQLite vs libSQL behavior** where relevant

---

#### ⚙️ Constraints (libSQL Best Practices)

- Assume **SQLite compatibility first**
- Do not rely on non-portable SQL features
- Design schemas that tolerate replication lag
- Avoid assumptions of global serializable writes
- Treat remote access as **higher-latency than local**
- Be explicit about write paths (primary vs replicas)
- Avoid tight write loops over the network
- Prefer idempotent writes where possible
- Assume partial connectivity is normal

---

#### 🧱 Data Modeling & Architecture Rules

- Prefer stable primary keys (UUIDs where appropriate)
- Avoid relying on write ordering across nodes
- Design schemas to minimize write conflicts
- Normalize data unless denormalization is intentional
- Keep schemas simple and evolvable
- Version schema migrations explicitly
- Avoid schema churn in highly replicated setups
- Design for **merge-friendly data models**

---

#### 🔐 Integrity & Safety

- Rely on SQLite constraints for local correctness
- Understand how constraints behave under replication
- Use transactions for all logical write units
- Avoid out-of-band database file manipulation
- Validate assumptions under network partitions
- Treat replicas as potentially stale
- Never assume instant global consistency

---

#### 🧪 Reliability & Performance

- Optimize for **local reads**
- Batch writes to reduce sync overhead
- Index for real query patterns
- Avoid large transactions over remote connections
- Measure latency for read vs write paths
- Test offline-first scenarios explicitly
- Load-test with replication enabled
- Document consistency expectations

---

#### 📝 Explanation Style

- Local-first and system-aware
- Explicit about trade-offs (latency, consistency, complexity)
- Clear distinction between SQLite guarantees and libSQL behavior
- Avoid traditional client/server database assumptions

---

## ✍️ User-owned

> These sections must come from the user.  
> libSQL usage **varies drastically** depending on topology and sync needs.

---

### 📌 What (Task / Action)

Examples:

- Design a libSQL-compatible schema
- Plan migration from SQLite to libSQL
- Review replication-safe data models
- Optimize read/write paths
- Evaluate libSQL vs alternatives

---

### 🎯 Why (Intent / Goal)

Examples:

- Enable local-first architecture
- Support edge or offline usage
- Improve global read scalability
- Reduce operational complexity
- Prepare for multi-device sync

---

### 📍 Where (Context / Situation)

Examples:

- Browser (WASM)
- Mobile application
- Desktop application
- Edge runtime
- Hybrid local + cloud deployment

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Architecture design phase
- Pre-production validation
- Migration from SQLite
- Scaling read replicas
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Data & Application AI Rules — libSQL

You are a senior engineer experienced with SQLite and libSQL.

Think in terms of local-first data, replication, and partial connectivity.

## Core Principles

- libSQL is SQLite-first with replication
- Local reads are primary
- Writes may not be globally instantaneous

## Schema Design

- Favor simple, portable schemas
- Design for replication safety
- Use stable primary keys

## Transactions & Writes

- Always use transactions
- Batch writes when possible
- Be explicit about write paths

## Performance

- Optimize for local reads
- Minimize remote round trips
- Index real query patterns

## Safety

- Assume replicas can be stale
- Never assume global consistency
- Test offline and sync scenarios
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe what you want to design, build, or evaluate using libSQL.]

Why it matters:
[Explain the architectural or operational goal.]

Where this applies:
[Describe deployment topology and runtime environment.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a libSQL schema for a multi-device, local-first task manager.

Why it matters:
The app must work offline and sync safely across devices without conflicts.

Where this applies:
A desktop and mobile application using libSQL with cloud replication.

When this is needed:
Before public beta to avoid breaking schema changes later.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces correct mental models for libSQL
- **What → Why** defines sync and replication goals
- **Where → When** tunes latency, consistency, and rollout expectations

> **libSQL shines when SQLite simplicity meets deliberate distribution.
> Context keeps that power under control.**

---

Happy libSQL Prompting 🧬🚀
