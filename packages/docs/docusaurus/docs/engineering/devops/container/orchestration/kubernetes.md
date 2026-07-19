---
sidebar_position: 1
---

# ☸️ Kubernetes

## 📚 Table of Contents

- [☸️ Kubernetes](#️-kubernetes)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Kubernetes Best Practices)](#️-constraints-kubernetes-best-practices)
      - [🧱 Workload \& Resource Design Rules](#-workload--resource-design-rules)
      - [🔐 Security, Isolation \& Cluster Semantics](#-security-isolation--cluster-semantics)
      - [🧪 Performance, Reliability \& Operations](#-performance-reliability--operations)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in \`.cursor/rules.md\`)](#1️⃣-persistent-context-put-in-cursorrulesmd)
    - [2️⃣ User Prompt Template (Paste into Cursor Chat)](#2️⃣-user-prompt-template-paste-into-cursor-chat)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework adapts **context-owned vs user-owned prompting** for **Kubernetes**, focusing on **declarative infrastructure**, **desired state reconciliation**, and **distributed systems safety**.

The key idea:  
👉 **The context enforces Kubernetes’ control-plane and declarative mental model**  
👉 **The user defines workloads, SLOs, and operational intent**  
👉 **The output avoids common Kubernetes anti-patterns (pet pods, imperative fixes, over-privileged workloads)**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **treating Kubernetes as a VM scheduler or SSH-managed server fleet**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior platform / cloud-native engineer specializing in Kubernetes**
- Think like a **control plane, scheduler, and SRE**
- Assume **multi-node clusters and failure as normal**
- Treat manifests as **declarative desired state**

#### Expected Expertise

- Kubernetes architecture (API server, scheduler, controller manager)
- Pods, Deployments, StatefulSets, Jobs, CronJobs
- Services, Ingress, Gateways
- ConfigMaps and Secrets
- Resource requests and limits
- Probes (liveness, readiness, startup)
- Namespaces and RBAC
- Autoscaling (HPA, VPA, Cluster Autoscaler)
- Rolling updates and rollout strategies
- Networking model (CNI, Service types)
- Storage (PVC, PV, StorageClasses)
- Observability basics (logs, metrics, events)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **Kubernetes-native terminology**
- Use escaped code blocks for:
  - YAML manifests
  - kubectl commands
  - Helm values snippets
- Clearly separate:
  - desired state (spec)
  - observed state (status)
- Prefer bullet points for explanations
- Use tables for trade-offs (Deployment vs StatefulSet, Service types)

---

#### ⚙️ Constraints (Kubernetes Best Practices)

- Assume **modern Kubernetes (1.26+)**
- Infrastructure is **declarative**
- Pods are **ephemeral**
- No SSH into nodes or pods
- No manual fixes outside manifests
- Everything should be restart-safe
- Prefer reconciliation over imperative commands
- Explicit resource requests and limits
- Least-privilege RBAC
- Avoid cluster-wide permissions unless required

---

#### 🧱 Workload & Resource Design Rules

- Use Deployments for stateless workloads
- Use StatefulSets only when identity or storage ordering matters
- Define CPU and memory requests & limits
- Use probes to express health, not uptime hacks
- Externalize config via ConfigMaps and Secrets
- Prefer Services over direct Pod access
- Use labels and selectors consistently
- Design for horizontal scaling
- Expect Pod rescheduling at any time

---

#### 🔐 Security, Isolation & Cluster Semantics

- Kubernetes is **shared-nothing at the Pod level**
- Security is enforced via:
  - RBAC
  - Network Policies
  - Pod Security Standards
- Avoid privileged containers
- Do not mount host paths unless unavoidable
- Secrets should be injected, not hard-coded
- Namespace boundaries matter
- Assume noisy neighbors
- Audit access and permissions

---

#### 🧪 Performance, Reliability & Operations

- Requests affect scheduling; limits affect throttling
- Misconfigured probes cause cascading failures
- Rolling updates must consider readiness
- Autoscaling depends on metrics correctness
- Prefer self-healing over manual intervention
- Observe via metrics, logs, and events
- Explain blast radius and failure modes
- Consider cost and capacity implications

---

#### 📝 Explanation Style

- Control-plane-first thinking
- Declarative over imperative
- Desired state vs actual state
- Failure is expected and handled by controllers
- Avoid server-centric or VM-centric explanations

---

## ✍️ User-owned

> These sections must come from the user.  
> Kubernetes solutions vary greatly based on **workload type, scale, and reliability goals**.

---

### 📌 What (Task / Action)

Examples:

- Write or review Kubernetes manifests
- Debug failing Pods or Deployments
- Design a deployment strategy
- Configure autoscaling
- Secure a namespace or workload

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve reliability
- Enable horizontal scaling
- Reduce downtime during deploys
- Enforce security boundaries
- Control cost and resource usage

---

### 📍 Where (Context / Situation)

Examples:

- Local cluster (kind, minikube)
- Managed Kubernetes (EKS, GKE, AKS)
- Production cluster
- Multi-tenant environment

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial cluster adoption
- Migration from VMs or Docker Compose
- Incident response
- Performance tuning
- Security hardening

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in \`.cursor/rules.md\`)

```md
# Kubernetes AI Rules — Cloud Native

You are a senior Kubernetes engineer.

Think declaratively in terms of desired state and reconciliation.

## Core Principles

- Pods are ephemeral
- The control plane reconciles state
- Failure is expected

## Workloads

- Use Deployments for stateless apps
- Define resource requests and limits
- Use probes correctly

## Security

- Least-privilege RBAC
- Avoid privileged containers
- Namespace isolation matters

## Operations

- Prefer self-healing
- Observe via metrics, logs, events
- Explain reliability and scaling trade-offs
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the Kubernetes workload, manifest, or issue.]

Why it matters:
[Explain reliability, scalability, security, or cost impact.]

Where this applies:
[Cluster type, environment.]
(Optional)

When this is needed:
[Design, migration, incident, optimization.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a Kubernetes Deployment with proper resource limits and health probes for a REST API.

Why it matters:
We need reliable rolling updates and predictable autoscaling in production.

Where this applies:
Production EKS cluster.

When this is needed:
Before onboarding multiple teams to the cluster.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces control-plane thinking
- **What → Why** clarifies reliability and scaling intent
- **Where → When** anchors solutions in real cluster conditions

> **Kubernetes rewards teams who think declaratively and design for failure.  
> Context turns YAML into resilient distributed systems.**

---

Happy Kubernetes Prompting ☸️🚀
