---
sidebar_position: 1
---

# 🌙 Insomnia

## 📚 Table of Contents

- [🌙 Insomnia](#-insomnia)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Insomnia Best-Practice Rules)](#️-constraints-insomnia-best-practice-rules)
      - [🧱 Workspaces, Environments \& Architecture](#-workspaces-environments--architecture)
      - [⚡ Debugging, Automation \& Focused Workflows](#-debugging-automation--focused-workflows)
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

This framework is **Insomnia-first** and optimized for **fast API exploration, debugging, and individual developer flow**:
low ceremony, clear request history, and environment-driven configuration.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **Insomnia is a lightweight API client, not a testing platform**  
👉 **Workspaces organize intent, environments provide context**  
👉 **Speed and clarity beat ceremony**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They ensure **clean, fast, distraction-free Insomnia usage**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **backend or full-stack engineer**
- You debug APIs frequently during development
- You value **speed, clarity, and low overhead**
- You prefer tools that stay out of your way

#### Expected Expertise

- HTTP fundamentals (methods, headers, status codes)
- REST and/or GraphQL APIs
- Insomnia Workspaces
- Environment variables & templating
- Auth patterns (API keys, OAuth2, JWT)
- cURL-level understanding of requests
- Manual API debugging workflows

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer:
  - Simple, readable requests
  - Environment-based configuration
- Show:
  - One request = one intention
- Explain:
  - _what_ the request does
  - _what_ response is expected
- Use:
  - Folders to group related endpoints
  - Descriptions sparingly but clearly

---

#### ⚙️ Constraints (Insomnia Best-Practice Rules)

- One workspace per API or bounded context
- Never hardcode:
  - base URLs
  - tokens
  - secrets
- Use environments for:
  - hosts
  - auth tokens
  - flags
- Avoid over-scripting
- Optimize for **manual clarity**, not test coverage

---

#### 🧱 Workspaces, Environments & Architecture

- **Workspace**
  - Represents one API or service
- **Folder**
  - Groups related endpoints or flows
- **Request**
  - Single HTTP interaction
- **Environment**
  - Hierarchical configuration (base → env-specific)

Clear separation:

- Workspace = scope
- Environment = configuration
- Request = behavior

---

#### ⚡ Debugging, Automation & Focused Workflows

- Use Insomnia primarily for:
  - request exploration
  - debugging headers / payloads
  - validating auth flows
- Limited scripting is acceptable for:
  - token reuse
  - dynamic headers
- Prefer external tools for:
  - large test suites
  - CI automation

Insomnia excels at **thinking with requests**.

---

#### 🧪 Reliability, Security & Portability

- Store secrets in:
  - environment variables
  - OS keychain
- Export workspaces for:
  - backup
  - sharing minimal repro cases
- Keep workspaces:
  - environment-agnostic
  - reproducible
- Avoid relying on local-only state
- Document setup assumptions briefly

---

#### 📝 Explanation Style

- HTTP-first language
- Minimal UI references
- Explain intent, not clicks
- Prefer reproducible request logic
- Assume reader understands APIs

---

## ✍️ User-owned

> These sections must come from the user.  
> They define **debugging goals and usage context**.

---

### 📌 What (Task / Action)

Examples:

- Debug an API endpoint
- Explore a new API
- Validate authentication flows
- Reproduce a production issue
- Share a minimal API example

---

### 🎯 Why (Intent / Goal)

Examples:

- Faster debugging
- Understand API behavior
- Verify request/response shape
- Reduce backend guesswork

---

### 📍 Where (Context / Situation)

Examples:

- Local development
- Staging environments
- Third-party APIs
- Internal microservices

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- During feature development
- While debugging incidents
- Early API exploration
- Ad-hoc verification

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in team docs or repo README)

```md
# Insomnia Usage Rules

You are using Insomnia as a fast, manual API client.

## Core Principles

- One workspace per API
- Environments hold all configuration
- Requests are simple and explicit

## Usage

- Optimize for debugging speed
- Avoid unnecessary scripting
- Prefer clarity over automation

## Security

- No secrets committed
- Use environment variables
- Separate environments per stage
```

---

### 2️⃣ User Prompt Template

```text
What I want to do:
[Describe the API or debugging task.]

Why it matters:
[Speed, clarity, correctness.]

Where this applies:
[Local, staging, prod, third-party.]
(Optional)

When this is needed:
[Development, debugging, investigation.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
What I want to do:
Debug a REST endpoint that requires JWT authentication.

Why it matters:
The backend returns inconsistent 401 errors.

Where this applies:
Local and staging environments.

When this is needed:
During feature development.
```

---

## 🧠 Why This Ordering Works

- **Workspace before requests** keeps scope tight
- **Environment before auth** avoids secret sprawl
- **Manual clarity before automation** keeps Insomnia fast

> **Insomnia sharpens understanding.  
> Requests reveal truth.  
> Speed keeps you in flow.**

---

Happy debugging with Insomnia 🌙⚡
