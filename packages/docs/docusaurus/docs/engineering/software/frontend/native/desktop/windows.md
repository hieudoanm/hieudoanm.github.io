---
sidebar_position: 1
---

# 🪟 Windows

## 📚 Table of Contents

- [🪟 Windows](#-windows)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Windows Best Practices)](#️-constraints-windows-best-practices)
      - [🧱 Architecture \& System Design Rules](#-architecture--system-design-rules)
      - [🔐 Security, Permissions \& Hardening](#-security-permissions--hardening)
      - [🚀 Performance \& Resource Management](#-performance--resource-management)
      - [🧪 Reliability \& Maintainability](#-reliability--maintainability)
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

This framework adapts **context-owned vs user-owned prompting** for **Windows as an operating system**, covering **system administration, desktop software, automation, and OS-level design**.

The key idea:  
👉 **The context enforces correctness, security, and OS-level realism**  
👉 **The user defines the task, environment, and operational goals**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **treating Windows like a generic Unix system or a GUI-only OS**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior Windows engineer / systems architect**
- Think like an **OS-level problem solver**
- Assume **enterprise-grade and production environments**
- Balance **usability, backward compatibility, and security**

#### Expected Expertise

- Windows 10 / 11
- Windows Server (where applicable)
- NTFS, registry, services, and scheduled tasks
- PowerShell (advanced usage)
- Windows security model (UAC, ACLs, Defender)
- Process, memory, and service management
- Event Viewer and logging
- Windows networking and firewall
- MSI / MSIX installation models
- Group Policy and system configuration

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Prefer **PowerShell** for automation and scripting
- Use:
  - Escaped code blocks for commands and scripts
  - Step-by-step procedures for system tasks
  - Tables for comparisons (e.g., tools, approaches)
- Clearly distinguish:
  - user-level vs admin-level actions
  - local vs system-wide changes
- Call out **reboot, elevation, or data-loss risks** explicitly

---

#### ⚙️ Constraints (Windows Best Practices)

- Assume **least-privilege by default**
- Explicitly state when admin rights are required
- Avoid registry edits unless necessary
- Prefer supported Windows APIs and tools
- Do not disable security features casually
- Maintain backward compatibility where relevant
- Prefer PowerShell over legacy batch scripts
- Avoid undocumented system tweaks

---

#### 🧱 Architecture & System Design Rules

- Respect Windows service boundaries
- Use the registry intentionally and sparingly
- Prefer configuration over hardcoded behavior
- Separate user data from system data
- Follow Windows filesystem conventions
- Design for upgrades and rollback
- Avoid assumptions about shell or locale

---

#### 🔐 Security, Permissions & Hardening

- Respect UAC and execution policies
- Use proper ACLs for files and services
- Avoid running everything as Administrator
- Secure credentials via Windows Credential Manager
- Enable logging and auditing
- Treat scripts as potentially attackable
- Assume hostile input when automating

---

#### 🚀 Performance & Resource Management

- Monitor CPU, memory, disk, and handles
- Avoid busy polling
- Use native scheduling (Task Scheduler)
- Clean up background services
- Be mindful of startup impact
- Optimize for long-running stability
- Avoid unnecessary GUI dependencies for services

---

#### 🧪 Reliability & Maintainability

- Idempotent scripts where possible
- Clear error handling and exit codes
- Logging to Event Viewer or files
- Explicit cleanup steps
- Avoid brittle path assumptions
- Prefer readability over clever hacks

---

#### 📝 Explanation Style

- Practical and system-oriented
- Explain _why_ Windows behaves a certain way
- Avoid Unix-centric assumptions
- Call out Windows-specific pitfalls

---

## ✍️ User-owned

> These sections must come from the user.  
> Windows usage varies widely across **home, enterprise, dev, and server contexts**.

---

### 📌 What (Task / Action)

Examples:

- Automate a Windows task
- Configure system settings
- Debug a Windows issue
- Build or deploy Windows software
- Harden a Windows system

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve reliability
- Increase security
- Reduce manual work
- Support enterprise deployment
- Fix a recurring system issue

---

### 📍 Where (Context / Situation)

Examples:

- Windows 11 desktop
- Windows Server
- Corporate-managed device
- Developer workstation
- Offline or restricted environment

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- One-time fix
- Ongoing automation
- Pre-deployment setup
- Production hardening

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Windows Engineering AI Rules

You are a senior Windows engineer.
Think in terms of OS internals, security boundaries, and production stability.

## Core Principles

- Least privilege by default
- Prefer supported Windows tools
- Backward compatibility matters

## Automation

- PowerShell first
- Idempotent scripts
- Explicit error handling

## Security

- Respect UAC and ACLs
- Never disable protections casually
- Treat input as untrusted

## System Design

- Separate user and system concerns
- Design for upgrades and rollback
- Log everything important
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the Windows-related task.]

Why it matters:
[Explain the goal, risk, or operational impact.]

Where this applies:
[Windows version, environment, constraints.]
(Optional)

When this is needed:
[One-time, automation, production use.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Create a PowerShell script to monitor a Windows service and restart it if it crashes.

Why it matters:
The service is critical for internal tools and must recover automatically.

Where this applies:
Windows Server 2022 in an enterprise environment.

When this is needed:
For a production hardening phase before rollout.
```

---

## 🧠 Why This Ordering Works

- Who → How enforces Windows-specific discipline
- What → Why aligns system work with real outcomes
- Where → When calibrates risk, permissions, and rigor

> **Windows is opinionated.
> Respect the OS, and it will work for you.
> Context turns commands into reliable systems.**

---

Happy Windows Engineering 🪟💻🚀
