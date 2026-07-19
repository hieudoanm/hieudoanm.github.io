# 🐻 Bruno

## 📚 Table of Contents

- [🐻 Bruno](#-bruno)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Bruno Best-Practice Rules)](#️-constraints-bruno-best-practice-rules)
      - [🧱 Collections-as-Files, Environments \& Architecture](#-collections-as-files-environments--architecture)
      - [⚡ Git-first Workflows, Testing \& Automation](#-git-first-workflows-testing--automation)
      - [🧪 Reliability, Security \& Portability](#-reliability-security--portability)
      - [📝 Explanation Style](#-explanation-style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
    - [1️⃣ Persistent Context (Put in repo README)](#1️⃣-persistent-context-put-in-repo-readme)
    - [2️⃣ User Prompt Template](#2️⃣-user-prompt-template)
    - [✅ Fully Filled Example](#-fully-filled-example)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework is **Bruno-first** and optimized for **Git-native, offline-first
API development**: file-based collections, clean diffs, deterministic reviews,
and zero vendor lock-in.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **Bruno is a file-based API client, not a hosted platform**  
👉 **Requests are source code, not UI state**  
👉 **Git is the collaboration layer**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **clean, reviewable, production-grade Bruno usage**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **backend / platform / infra engineer**
- You care about **diffs, reviews, and reproducibility**
- You prefer **local tools over SaaS**
- You treat API requests as **code artifacts**

#### Expected Expertise

- HTTP fundamentals
- REST and/or GraphQL APIs
- Git workflows (PRs, reviews, diffs)
- Bruno collections & request files
- Environment variables & secrets
- Auth patterns (API keys, OAuth2, JWT)
- CLI-driven workflows

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - File-based collections committed to Git
  - One request per file
- Show:
  - Request definition + tests together
- Explain:
  - _why_ a request exists
  - _what_ it guarantees
- Use:
  - Folders to model API structure
  - Naming conventions for clarity

---

#### ⚙️ Constraints (Bruno Best-Practice Rules)

- One repo (or folder) = one API surface
- Requests must be:
  - deterministic
  - reviewable
- Never commit:
  - secrets
  - tokens
- Environments are:
  - local files
  - ignored by Git
- Treat request files as **source of truth**

---

#### 🧱 Collections-as-Files, Environments & Architecture

- **Collection (folder)**
  - Represents an API or bounded context
- **Request file**
  - Single HTTP interaction + assertions
- **Environment**
  - Runtime configuration (local, staging, prod)

Clear separation:

- Files = intent
- Environments = configuration
- Git = collaboration & history

---

#### ⚡ Git-first Workflows, Testing & Automation

- Typical workflow:
  - Add or modify request files
  - Review diffs in PR
  - Run locally or via CLI
- Use tests to:
  - assert status codes
  - validate response shape
- Integrate with CI:
  - run Bruno collections headlessly
- Prefer:
  - text diffs
  - code review
  - reproducibility

Bruno shines where **UI-heavy tools break down**.

---

#### 🧪 Reliability, Security & Portability

- Secrets stored in:
  - environment files
  - CI secret managers
- Collections are:
  - portable
  - offline-capable
- No cloud sync required
- No vendor lock-in
- Easy long-term maintenance

---

#### 📝 Explanation Style

- Code-first language
- Git-centric explanations
- Explain intent and guarantees
- Avoid UI walkthroughs
- Assume reader understands APIs and Git

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **scope, collaboration model, and constraints**.

---

### 📌 What (Task / Action)

Examples:

- Create a Git-tracked API test suite
- Review API behavior via PRs
- Replace Postman with a local tool
- Build deterministic API checks

---

### 🎯 Why (Intent / Goal)

Examples:

- Eliminate vendor lock-in
- Enable clean code reviews
- Improve reproducibility
- Support offline development

---

### 📍 Where (Context / Situation)

Examples:

- Backend repositories
- Platform / infra repos
- OSS projects
- CI pipelines

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- API design phase
- Refactor / migration
- CI hardening
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in repo README)

```md
# Bruno Usage Rules

You are using Bruno as a Git-first, file-based API client.

## Core Principles

- Requests are code
- Git is the collaboration layer
- Environments are never committed

## Structure

- One API per folder
- One request per file
- Clear, stable naming

## Security

- No secrets in Git
- Use env files and CI secrets

## Automation

- Tests live with requests
- Bruno CLI runs in CI
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the API or testing goal.]

Why it matters:
[Reproducibility, reviewability, automation.]

Where this applies:
[Repo, CI, local dev.]
(Optional)

When this is needed:
[Design, migration, maintenance.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Replace Postman collections with a Git-tracked Bruno setup.

Why it matters:
We want clean PR diffs and deterministic API tests.

Where this applies:
Backend monorepo and CI pipeline.

When this is needed:
During API stabilization.
```

---

## 🧠 Why This Ordering Works

- **Files before UI** ensures reviewability
- **Git before collaboration** avoids lock-in
- **Determinism before convenience** scales teams

> **Bruno turns API requests into code.  
> Git turns changes into conversations.  
> Determinism builds trust.**

---

Happy hacking with Bruno 🐻📁
