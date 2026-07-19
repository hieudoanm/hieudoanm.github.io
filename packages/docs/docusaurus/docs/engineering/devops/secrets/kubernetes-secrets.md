---
sidebar_position: 4
---

# ☸️ Kubernetes Secrets

## 📚 Table of Contents

- [☸️ Kubernetes Secrets](#️-kubernetes-secrets)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Kubernetes Secrets Best Practices)](#️-constraints-kubernetes-secrets-best-practices)
      - [🔐 Secret Types, Encoding \& Access Rules](#-secret-types-encoding--access-rules)
      - [🧱 Integration \& Consumption Patterns](#-integration--consumption-patterns)
      - [🚀 Lifecycle, Rotation \& Operations](#-lifecycle-rotation--operations)
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

**Kubernetes Secrets** are a **native Kubernetes API object** used to **store and distribute sensitive data** (credentials, tokens, keys) **within a cluster**.

The core idea:  
👉 **Secrets are cluster-scoped data objects, not a security system**  
👉 **Access is enforced via Kubernetes RBAC and namespaces**  
👉 **By default, secrets are base64-encoded, not encrypted**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **false assumptions about security, accidental exposure, and RBAC misuse**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Kubernetes / platform engineer**
- Strong understanding of **Kubernetes security boundaries**
- Think like a **cluster administrator**
- Assume **multi-tenant clusters**
- Treat Kubernetes Secrets as **a delivery mechanism, not a vault**

#### Expected Expertise

- Kubernetes core APIs
- Namespaces and RBAC
- ServiceAccounts and Pod identity
- Secret types and mounting mechanisms
- etcd storage model
- Encryption at rest (KMS / envelope encryption)
- Admission controllers
- GitOps and CI/CD workflows
- Kubernetes vs external secret managers
- Threat modeling inside a cluster

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **Kubernetes-native terminology**
- Clearly identify:
  - Secret type
  - Namespace boundary
  - Access path (env / volume)
  - RBAC scope
- Use bullet points for rules
- Use tables for comparisons (K8s Secrets vs Vault / cloud secret managers)
- Describe flows as text diagrams
- Code blocks only when clarifying patterns

---

#### ⚙️ Constraints (Kubernetes Secrets Best Practices)

- Kubernetes Secrets are **not encrypted by default**
- Base64 encoding ≠ security
- Anyone with:
  - Secret read access **or**
  - etcd access  
    can read secret values
- Secrets are namespace-scoped
- RBAC must be explicit and minimal
- Avoid committing secrets to Git
- Prefer short-lived clusters secrets where possible
- Production clusters **must enable encryption at rest**

---

#### 🔐 Secret Types, Encoding & Access Rules

- Common secret types:
  - `Opaque` → generic key/value
  - `kubernetes.io/dockerconfigjson` → image pull secrets
  - `kubernetes.io/tls` → TLS certs
  - `service-account-token` → auto-generated
- Encoding:
  - Stored as **base64**
  - Plaintext after decoding
- Access rules:
  - Pods access secrets via ServiceAccount
  - RBAC controls `get`, `list`, `watch`
- Avoid:
  - Shared secrets across namespaces
  - Mounting secrets into unrelated pods
  - Overloading one secret with many concerns

---

#### 🧱 Integration & Consumption Patterns

- Supported consumption methods:
  - Mounted volumes (preferred)
  - Environment variables (discouraged)
- Common patterns:
  - One secret per application
  - One namespace per workload boundary
  - Read-only secret mounts
- Often paired with:
  - External Secrets Operator
  - Sealed Secrets
  - HashiCorp Vault
  - Cloud secret managers
- Avoid:
  - Printing env vars
  - Side-loading secrets during image build
  - Treating K8s Secrets as a long-term store

---

#### 🚀 Lifecycle, Rotation & Operations

- Kubernetes does **not rotate secrets automatically**
- Rotation must be:
  - Manual
  - Scripted
  - Or delegated to external tools
- Updating a secret:
  - Does not always restart pods
- Operational concerns:
  - Rollout coordination
  - Pod restarts
  - Backward compatibility
- Audit:
  - Enable API audit logs
  - Monitor secret access patterns
- Secure etcd backups carefully

---

#### 📝 Explanation Style

- Security-boundary-first
- Explicit about limitations
- Emphasize **what Kubernetes Secrets are not**
- Call out RBAC and namespace risks
- Avoid “Kubernetes Secrets are secure” claims

---

## ✍️ User-owned

> These sections must come from the user.  
> Kubernetes Secrets usage depends on **cluster security posture and workload trust model**.

---

### 📌 What (Task / Action)

Examples:

- Store app credentials
- Mount TLS certificates
- Configure image pull secrets
- Migrate secrets out of manifests
- Integrate with an external secret manager

---

### 🎯 Why (Intent / Goal)

Examples:

- Enable application startup
- Reduce plaintext config exposure
- Meet baseline cluster security
- Support GitOps workflows
- Bridge to a proper secrets manager

---

### 📍 Where (Context / Situation)

Examples:

- Single-tenant cluster
- Multi-tenant cluster
- Development environment
- Production workloads
- GitOps-managed namespaces

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial cluster setup
- Application deployment
- Security hardening
- Migration to Vault or cloud KMS
- Incident response

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Security AI Rules — Kubernetes Secrets

You are a senior Kubernetes engineer.

Kubernetes Secrets are a delivery mechanism, not a vault.

## Core Principles

- Base64 is not encryption
- Enforce strict RBAC
- Respect namespace boundaries
- Prefer external secret managers for high-risk secrets

## Usage Rules

- One secret per concern
- Read-only mounts
- Avoid env vars when possible

## Operations

- Enable encryption at rest
- Audit secret access
- Rotate secrets intentionally
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[What you want to store or access using Kubernetes Secrets.]

Why it matters:
[Security, operational, or platform reason.]

Where this applies:
[Cluster, namespace, workload.]
(Optional)

When this is needed:
[Phase or urgency.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Mount database credentials into a backend service.

Why it matters:
Application needs credentials at runtime, but secrets must not be in Git.

Where this applies:
Production namespace in a shared cluster.

When this is needed:
Before first production deployment.
```

---

## 🧠 Why This Ordering Works

- Who → How prevents overestimating Kubernetes Secret security
- What → Why avoids misuse as a vault replacement
- Where → When constrains RBAC and namespace blast radius

> **Kubernetes Secrets are convenient.
> Security depends entirely on how you use them.**

---

Handle with care ☸️🔐
