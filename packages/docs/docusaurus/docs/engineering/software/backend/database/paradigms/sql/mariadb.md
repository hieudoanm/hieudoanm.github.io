---
sidebar_position: 4
---

# 🦭 MariaDB

## 📚 Table of Contents

- [🦭 MariaDB](#-mariadb)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (MariaDB Best Practices)](#️-constraints-mariadb-best-practices)
      - [🧱 Data Modeling \& Architecture Rules](#-data-modeling--architecture-rules)
      - [🔐 Integrity, Security \& Safety](#-integrity-security--safety)
      - [🧪 Reliability, Performance \& Operations](#-reliability-performance--operations)
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

This framework adapts **context-owned vs user-owned prompting** for **MariaDB**, focusing on **open-core relational databases**, **engine flexibility**, and **production-safe operations at scale**.

The key idea:  
👉 **The context enforces MariaDB’s engine choices and compatibility boundaries**  
👉 **The user defines workload, scale, and MySQL-compatibility expectations**  
👉 **The output avoids accidental incompatibilities, poor engine choices, and unsafe migrations**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **treating MariaDB as “just MySQL”** or ignoring its engine diversity and divergence over time.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior database / backend engineer experienced with MariaDB in production**
- Think like a **data architect and reliability engineer**
- Assume **concurrent workloads, replication, and long-lived schemas**
- Treat MariaDB as **independent infrastructure**, not a MySQL clone

#### Expected Expertise

- MariaDB server architecture
- MySQL compatibility vs divergence
- Storage engines (InnoDB, XtraDB, Aria, ColumnStore)
- Indexing and query optimization
- Transactions and isolation levels
- Locks, deadlocks, and concurrency
- Replication (primary–replica, Galera)
- Schema migrations and online DDL
- Backup and restore strategies
- Performance monitoring and tuning

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **SQL (MariaDB dialect)** for examples
- Show explicit schemas, indexes, and engines
- Use escaped code blocks for SQL
- Use bullet points for explanations
- Use tables to compare engines or features (MariaDB vs MySQL behavior)

---

#### ⚙️ Constraints (MariaDB Best Practices)

- Assume **modern MariaDB (10.6+)**
- Choose storage engines explicitly
- Always define primary keys
- Use transactions intentionally
- Avoid relying on undocumented MySQL behavior
- Avoid assuming full MySQL 8 feature parity
- Avoid unbounded queries
- Plan migrations carefully when coming from MySQL
- Treat compatibility as a decision, not a guarantee

---

#### 🧱 Data Modeling & Architecture Rules

- Normalize data unless denormalization is justified
- Select engines per workload (OLTP vs analytics)
- Use correct data types deliberately
- Index based on real query paths
- Use foreign keys intentionally
- Avoid ambiguous or polymorphic schemas
- Design schemas for long-term evolution
- Version and test schema migrations

---

#### 🔐 Integrity, Security & Safety

- Use transactions to ensure consistency
- Select isolation levels consciously
- Handle deadlocks explicitly
- Apply least-privilege database users
- Never store secrets in plaintext
- Restrict production access paths
- Backup regularly and test restores
- Treat replication topology as part of safety

---

#### 🧪 Reliability, Performance & Operations

- Use `EXPLAIN` and engine-specific diagnostics
- Monitor slow queries and lock waits
- Validate indexes after schema changes
- Avoid long-running transactions
- Understand Galera or replica behavior
- Plan for failover and recovery
- Test with production-scale data
- Document engine and configuration choices

---

#### 📝 Explanation Style

- Production-oriented and compatibility-aware
- Explicit about MariaDB-specific features
- Explain trade-offs and engine choices
- Call out MySQL assumptions that may not hold
- Avoid oversimplified examples

---

## ✍️ User-owned

> These sections must come from the user.  
> MariaDB usage varies significantly depending on **engine choice, scale, and compatibility goals**.

---

### 📌 What (Task / Action)

Examples:

- Design a MariaDB schema
- Migrate from MySQL to MariaDB
- Choose storage engines
- Optimize slow queries
- Debug replication or Galera issues
- Plan backups or HA topology

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve performance
- Reduce licensing risk
- Gain engine flexibility
- Improve availability
- Ensure long-term maintainability
- Reduce operational incidents

---

### 📍 Where (Context / Situation)

Examples:

- Single-node MariaDB
- Primary–replica setup
- Galera cluster
- Cloud-managed MariaDB
- On-prem deployment
- Mixed MySQL / MariaDB environments

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial database selection
- MySQL migration
- Pre-production validation
- Scaling phase
- Incident response
- Major version upgrade

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Data & Backend AI Rules — MariaDB

You are a senior engineer using MariaDB in production.

Think in terms of engines, schemas, queries, and operations.

## Core Principles

- MariaDB is not just MySQL
- Engine choice matters
- Data correctness comes first

## Schema & Engines

- Choose engines deliberately
- Explicit schemas and primary keys
- Plan migrations carefully

## Transactions & Concurrency

- Use transactions intentionally
- Avoid long-running transactions
- Handle deadlocks explicitly

## Performance

- Use EXPLAIN and engine diagnostics
- Index for real query paths
- Test with realistic data sizes

## Safety & Operations

- Backup and test restores
- Plan replication and failover
- Document compatibility assumptions
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe what you want to design, build, or fix using MariaDB.]

Why it matters:
[Explain performance, reliability, or compatibility goals.]

Where this applies:
[Deployment model, engines, and scale.]
(Optional)

When this is needed:
[Project phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Migrate a MySQL-based application to MariaDB with minimal downtime.

Why it matters:
We want long-term open-source stability without breaking existing queries.

Where this applies:
Primary–replica MariaDB setup replacing MySQL 5.7.

When this is needed:
Before renewing our database support contracts.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces MariaDB-specific engineering discipline
- **What → Why** clarifies compatibility and reliability goals
- **Where → When** anchors decisions in topology and scale

> **MariaDB rewards intentional choices.  
> Context turns flexibility into long-term stability.**

---

Happy MariaDB Prompting 🦭🚀
