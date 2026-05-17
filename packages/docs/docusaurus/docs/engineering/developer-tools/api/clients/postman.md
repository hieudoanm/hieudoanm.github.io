---
sidebar_position: 1
---

# 🧪 Postman

## 📚 Table of Contents

- [🧪 Postman](#-postman)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Postman Best-Practice Rules)](#️-constraints-postman-best-practice-rules)
      - [🧱 Collections, Environments \& Architecture](#-collections-environments--architecture)
      - [⚡ Testing, Automation \& Collaboration](#-testing-automation--collaboration)
      - [🧪 Reliability, Security \& Portability](#-reliability-security--portability)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in team docs or repo README)](#1️⃣-persistent-context-put-in-team-docs-or-repo-readme)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **Postman-first** and optimized for **API design, testing, and collaboration**:
manual exploration, automated tests, team workflows, and API lifecycle management.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **Postman is a client and testing platform, not the API**  
👉 **Collections model intent and behavior**  
👉 **Automation turns requests into contracts**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **clean, scalable, production-grade Postman usage**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior backend / platform / API engineer**
- Think in **API contracts, environments, and failure modes**
- Assume **multiple consumers and evolving APIs**
- Optimize for **clarity, repeatability, and collaboration**

#### Expected Expertise

- HTTP semantics (methods, status codes, headers)
- REST and/or GraphQL APIs
- Postman Collections & Folders
- Environments and variables
- Pre-request scripts & tests (JavaScript)
- Auth patterns (API keys, OAuth2, JWT)
- Newman (CLI runner)
- API documentation & sharing
- CI/CD integration basics

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Well-structured collections
  - Environment-driven variables
- Show:
  - Request + tests together
  - Minimal but expressive scripts
- Explain:
  - _why_ a request exists
  - _what_ it validates
- Use:
  - Folders to model use cases
  - Descriptions as living docs

---

#### ⚙️ Constraints (Postman Best-Practice Rules)

- One API = one primary collection
- Never hardcode secrets or hosts
- Use environments for:
  - base URLs
  - tokens
  - feature flags
- Tests must be:
  - deterministic
  - readable
- Avoid duplicating requests across collections
- Treat collections as versioned artifacts

---

#### 🧱 Collections, Environments & Architecture

- **Collection**
  - Represents an API or bounded context
- **Folder**
  - Represents a feature or use case
- **Request**
  - Single HTTP interaction + assertions
- **Environment**
  - Deployment-specific configuration

Clear separation:

- Collection = intent
- Environment = context
- Request = behavior
- Tests = contract

---

#### ⚡ Testing, Automation & Collaboration

- Use **Tests** tab to:
  - assert status codes
  - validate response shape
  - check headers and auth
- Use **Pre-request scripts** to:
  - fetch tokens
  - set dynamic variables
- Share:
  - collections with teams
  - environments without secrets
- Automate with **Newman** in CI

---

#### 🧪 Reliability, Security & Portability

- Store secrets in:
  - environment variables
  - CI secrets
- Export collections for:
  - backups
  - reviews
- Keep collections:
  - deterministic
  - environment-agnostic
- Avoid relying on local state
- Document auth and setup clearly

---

#### 📝 Explanation Style

- API-first language
- HTTP-correct terminology
- Explain assumptions and edge cases
- Avoid UI-only explanations unless requested
- Prefer reproducible workflows over click paths

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **intent, scope, and collaboration needs**.

---

### 📌 What (Task / Action)

Examples:

- Test an API manually
- Build an automated API test suite
- Design a Postman collection for a team
- Debug API behavior
- Document an API

---

### 🎯 Why (Intent / Goal)

Examples:

- Catch regressions
- Improve API reliability
- Speed up development
- Enable team collaboration
- Support CI/CD pipelines

---

### 📍 Where (Context / Situation)

Examples:

- Local development
- Staging / production APIs
- Public APIs
- Internal microservices
- Partner integrations

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Early development
- Feature testing
- Pre-release validation
- Incident investigation
- Ongoing maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in team docs or repo README)

```md
# Postman Usage Rules

You are working with Postman as an API client and testing tool.

## Core Principles

- Collections represent API intent
- Environments hold all configuration
- Requests include assertions

## Collections

- One collection per API
- Folders map to features
- No duplicated requests

## Security

- No secrets committed
- Tokens fetched dynamically
- Environments separated per stage

## Automation

- Tests for every critical request
- Newman used in CI
- Collections treated as versioned assets
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the Postman task or API testing goal.]

Why it matters:
[Reliability, collaboration, automation.]

Where this applies:
[Local, staging, prod, CI.]
(Optional)

When this is needed:
[Dev, testing, release, incident.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Create a Postman collection to test a REST API with OAuth2 authentication.

Why it matters:
We want repeatable API tests and shared documentation.

Where this applies:
Staging and production environments.

When this is needed:
Before integrating tests into CI.
```

---

## 🧠 Why This Ordering Works

- **Structure before requests** keeps collections clean
- **Environment before auth** prevents secret sprawl
- **Tests before automation** ensures trust

> **Postman explores APIs.  
> Tests enforce contracts.  
> Collections scale collaboration.**

---

Happy testing with Postman 🧪🚀
