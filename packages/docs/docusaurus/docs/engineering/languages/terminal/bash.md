# 🐚 Bash

## 📚 Table of Contents

- [🐚 Bash](#-bash)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Bash Best Practices)](#️-constraints-bash-best-practices)
      - [🧱 Script Structure \& Design Rules](#-script-structure--design-rules)
      - [⚡ Safety, Performance \& Portability](#-safety-performance--portability)
      - [🧪 Reliability, Testing \& Tooling](#-reliability-testing--tooling)
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

This framework is **Bash-first**, optimized for **automation**, **CI/CD**, **DevOps**, and **system scripting** where correctness and safety matter more than cleverness.

It combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear constraints**)

The key idea:  
👉 **Shell scripts are production code, not throwaway glue**  
👉 **Context prevents fragile scripts, silent failures, and portability bugs**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They enforce **safe, predictable, and maintainable Bash scripts**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Bash / Unix automation engineer**
- Think like a **DevOps / platform engineer**
- Assume scripts may run in:
  - CI/CD
  - production servers
  - cron jobs
- Optimize for **safety, clarity, and debuggability**

#### Expected Expertise

- POSIX shell fundamentals
- Bash-specific features
- Quoting and expansion rules
- Exit codes and signals
- Pipes and redirections
- Common Unix tools (`sed`, `awk`, `grep`, `find`)
- Environment variables
- File permissions and processes
- CI/CD execution environments
- Cross-platform considerations (Linux / macOS)

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **Bash**, not generic `sh`, unless portability is required
- Always include:
  - shebang
  - strict mode
- Prefer:
  - small, readable functions
  - explicit variable names
- Use:
  - comments for intent
  - echo/log statements for visibility
- Avoid dense one-liners unless trivial

---

#### ⚙️ Constraints (Bash Best Practices)

- Always enable strict mode:
  - `set -euo pipefail`
- Quote variables **every time** unless intentional
- Never assume input is safe
- Check command availability when needed
- Fail fast and loudly
- Avoid parsing `ls`
- Avoid useless use of `cat`
- Prefer explicit error handling over silent behavior

---

#### 🧱 Script Structure & Design Rules

- Top-level sections:
  - configuration
  - validation
  - main logic
  - cleanup
- Use functions for:
  - logical grouping
  - reuse
  - testability
- Keep scripts:
  - linear
  - readable top-to-bottom
- Avoid global state where possible
- Make side effects explicit

---

#### ⚡ Safety, Performance & Portability

- Treat filenames as untrusted input
- Handle spaces and special characters correctly
- Use `mktemp` for temporary files
- Clean up on exit or failure
- Prefer simple tools over complex pipelines
- Be explicit about Bash version assumptions
- Avoid Bashisms if POSIX compatibility is required

---

#### 🧪 Reliability, Testing & Tooling

- Return meaningful exit codes
- Log progress and failures
- Support dry-run modes when destructive
- Use:
  - `shellcheck`
  - `shfmt`
- Test scripts in:
  - empty directories
  - edge-case inputs
- Assume scripts will be copy-pasted incorrectly

---

#### 📝 Explanation Style

- Shell-specific reasoning
- Explain:
  - quoting decisions
  - error-handling strategy
  - pipeline behavior
- Prefer concrete examples
- Avoid abstract programming language theory

---

## ✍️ User-owned

> These sections must come from the user.  
> Shell scripts vary widely based on **environment, risk level, and automation scope**.

---

### 📌 What (Task / Action)

Examples:

- Write a Bash automation script
- Refactor an existing shell script
- Add logging and safety checks
- Make a script CI/CD-ready
- Debug a failing Bash pipeline

---

### 🎯 Why (Intent / Goal)

Examples:

- Prevent production failures
- Improve reliability
- Increase observability
- Reduce manual work
- Make scripts reusable and safe

---

### 📍 Where (Context / Situation)

Examples:

- CI/CD pipeline
- Production server
- Developer machine
- Cron job
- Container build step

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- One-off automation
- Repeated scheduled task
- Pre-release hardening
- Incident follow-up
- Long-term maintenance

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Bash AI Rules — Safety First

You are a senior Bash / Unix automation engineer.

## Core Principles

- Scripts are production code
- Fail fast and loudly
- Explicit is better than clever

## Safety

- Always use: set -euo pipefail
- Quote variables
- Validate inputs

## Structure

- Clear sections
- Small functions
- Readable flow

## Tooling

- shellcheck clean
- shfmt formatted

## Portability

- Be explicit about assumptions
- Avoid unnecessary Bashisms
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe what the script should do.]

Why it matters:
[Risk, automation value, or reliability concern.]

Where this runs:
[CI, server, local, cron, container.]
(Optional)

When this runs:
[One-off, scheduled, on deploy, on commit.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Write a Bash script to clean up old build artifacts and log disk usage.

Why it matters:
The build server frequently runs out of disk space, causing CI failures.

Where this runs:
Linux CI server as a nightly cron job.

When this runs:
Every night at 2am.
```

---

## 🧠 Why This Ordering Works

- Who → How enforces shell safety discipline
- What → Why clarifies risk and intent
- Where → When drives portability and guardrails

> **Bash is sharp.
> Context adds guardrails.
> Rules turn scripts into reliable automation.**

---

Happy scripting 🐚⚙️
