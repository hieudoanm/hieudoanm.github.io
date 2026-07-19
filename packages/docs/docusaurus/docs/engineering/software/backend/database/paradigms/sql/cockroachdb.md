---
sidebar_position: 5
---

# 🐓 CockroachDB

## 📚 Table of Contents

- [🐓 CockroachDB](#-cockroachdb)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (CockroachDB Best Practices)](#️-constraints-cockroachdb-best-practices)
      - [🧱 Data Modeling \& Architecture Rules](#-data-modeling--architecture-rules)
      - [🔐 Integrity \& Consistency](#-integrity--consistency)
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

This framework adapts **context-owned vs user-owned prompting** specifically for **CockroachDB**, focusing on **global distribution, strong consistency, and operational correctness at scale**.

The key idea:  
👉 **The context enforces distributed-database mental models**  
👉 **The user defines scale, geography, and workload patterns**  
👉 **The output respects CockroachDB’s transactional and replication guarantees**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **treating CockroachDB like a single-node Postgres instance** and to enforce correct assumptions about latency, transactions, and distribution.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior backend / platform engineer experienced with CockroachDB**
- Think like a **distributed-systems and data consistency architect**
- Assume **multi-region deployments and real production traffic**
- Treat CockroachDB as a **globally consistent SQL database**, not “Postgres with replicas”

#### Expected Expertise

- CockroachDB architecture and Raft-based replication
- Distributed SQL and serializable isolation
- PostgreSQL-compatible SQL semantics
- Multi-region and multi-tenant deployments
- Latency-aware schema and query design
- Transactions across nodes and regions
- Schema changes in live systems
- Operational trade-offs vs traditional RDBMS

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **PostgreSQL-compatible SQL**
- Call out **CockroachDB-specific features** explicitly
- Use escaped code blocks for SQL
- Prefer bullet points and tables
- Explain trade-offs (latency vs consistency) clearly

---

#### ⚙️ Constraints (CockroachDB Best Practices)

- Assume **distributed transactions by default**
- Expect higher latency than single-node databases
- Design for **serializable isolation**
- Avoid hotspotting on primary keys
- Be explicit about regional placement when relevant
- Avoid chatty transaction patterns
- Minimize cross-region write amplification
- Expect schema changes to be online but non-free
- Never assume local-only execution

---

#### 🧱 Data Modeling & Architecture Rules

- Avoid monotonically increasing primary keys
- Prefer UUIDs or well-distributed keys
- Design schemas to reduce contention
- Denormalize only when justified
- Be careful with foreign keys in high-write paths
- Plan schema changes explicitly
- Design indexes for distributed execution
- Consider regional tables and locality

---

#### 🔐 Integrity & Consistency

- Serializable isolation is the default—embrace it
- Expect transaction retries under contention
- Design application logic to be retry-safe
- Use explicit transactions for correctness
- Understand how constraints are enforced globally
- Never rely on write ordering without transactions
- Treat clock skew and retries as normal behavior

---

#### 🧪 Reliability & Performance

- Optimize queries to minimize node fan-out
- Batch writes inside transactions
- Avoid long-running transactions
- Monitor contention and retries
- Index carefully to avoid write amplification
- Load-test with realistic geography
- Measure tail latency, not just averages
- Document SLOs and consistency expectations

---

#### 📝 Explanation Style

- Distributed-systems–first
- Explicit about latency, retries, and contention
- Clear distinction between Postgres expectations and CockroachDB reality
- Avoid single-node database assumptions

---

## ✍️ User-owned

> These sections must come from the user.  
> CockroachDB usage **varies drastically** depending on geography, scale, and consistency needs.

---

### 📌 What (Task / Action)

Examples:

- Design a CockroachDB schema
- Review transaction or retry issues
- Optimize distributed queries
- Plan a multi-region deployment
- Migrate from Postgres/MySQL

---

### 🎯 Why (Intent / Goal)

Examples:

- Achieve global consistency
- Scale horizontally without sharding
- Improve fault tolerance
- Reduce operational complexity
- Support multi-region users

---

### 📍 Where (Context / Situation)

Examples:

- Single-region cluster
- Multi-region active-active setup
- Cloud-managed CockroachDB
- Self-hosted Kubernetes deployment
- SaaS backend with global users

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial architecture design
- Pre-production validation
- Scaling to new regions
- Performance tuning
- Long-term operations

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Data & Application AI Rules — CockroachDB

You are a senior engineer experienced with CockroachDB.

Think in terms of distributed SQL, global consistency, and retries.

## Core Principles

- CockroachDB is globally consistent SQL
- Transactions may retry
- Latency is inherent in distribution

## Schema Design

- Avoid hot keys
- Design for distribution
- Plan schema changes explicitly

## Transactions

- Expect retries
- Keep transactions short
- Be retry-safe

## Performance

- Minimize cross-node queries
- Batch writes
- Monitor contention

## Safety

- Never assume single-node behavior
- Test under real network conditions
- Document consistency guarantees
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe what you want to design, build, or optimize using CockroachDB.]

Why it matters:
[Explain the scalability, reliability, or consistency goal.]

Where this applies:
[Describe deployment topology and regions.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a CockroachDB schema for a global payments service.

Why it matters:
The system must remain strongly consistent across regions while scaling writes.

Where this applies:
A multi-region CockroachDB cluster serving a SaaS platform.

When this is needed:
Before expanding into additional geographic regions.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces distributed-database discipline
- **What → Why** clarifies consistency and scale goals
- **Where → When** tunes latency, topology, and rollout strategy

> **CockroachDB excels when you design _for_ distribution, not despite it.  
> Context keeps global SQL predictable.**

---

Happy CockroachDB Prompting 🐓🌍
