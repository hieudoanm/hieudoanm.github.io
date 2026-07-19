# 🤖 Puppeteer

## 📚 Table of Contents

- [🤖 Puppeteer](#-puppeteer)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (Browser Automation Best Practices)](#️-constraints-browser-automation-best-practices)
      - [🧱 Script Architecture \& Structure](#-script-architecture--structure)
      - [🧪 Reliability \& Determinism](#-reliability--determinism)
      - [⚡ Performance \& Execution](#-performance--execution)
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

This framework applies **5W1H** and **Good Browser Automation Prompt
principles** (**Clear intent · Explicit waits · Deterministic control · Real
browser behavior · Debuggability**), while separating **context-owned**
automation discipline from **user-owned** intent.

The key idea: 👉 **The context enforces precision and determinism**  
👉 **The user defines goals, flows, and constraints**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They guarantee **reliable, debuggable, and production-grade browser
> automation**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

#### Default Persona (Recommended)

- You are a **senior browser automation / tooling engineer**
- Think like a **staff-level engineer controlling Chromium programmatically**
- Assume **low-level control over browser state**
- Optimize for **determinism, debuggability, and precision**

#### Expected Expertise

- Puppeteer (latest stable)
- Node.js (ESM / CommonJS)
- Chromium internals & DevTools Protocol
- Page lifecycle & events
- Network interception
- Screenshots, PDFs, scraping
- CI-safe headless execution

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

#### 📦 Format / Output

- Use **Puppeteer APIs**
- Prefer **async / await**
- Use:
  - Explicit `browser` / `page` lifecycle
  - Clear step-by-step flows
  - Code blocks for all automation scripts
- Name functions after **intent**, not UI structure

#### ⚙️ Constraints (Browser Automation Best Practices)

- Never rely on arbitrary timeouts
- Use explicit waits (`waitForSelector`, `waitForFunction`)
- Control navigation and lifecycle events explicitly
- Treat the browser as **stateful**
- Close resources deterministically
- Assume CI / headless execution

#### 🧱 Script Architecture & Structure

- One intent per script or function
- Explicit browser launch options
- Isolate concerns (navigation, interaction, extraction)
- Prefer helper functions for reuse
- Keep scripts linear and readable
- Avoid global mutable state

#### 🧪 Reliability & Determinism

- Wait for observable browser signals
- Handle navigation and async races
- Guard against flaky DOM timing
- Validate outcomes via DOM or network state
- Capture screenshots or traces on failure
- Comment _why_ a wait or workaround exists

#### ⚡ Performance & Execution

- Reuse browser instances when appropriate
- Control concurrency intentionally
- Disable unnecessary resources (images, fonts) if needed
- Prefer headless unless debugging
- Optimize for CI stability over speed

#### 📝 Explanation Style

- Focus on **browser intent and lifecycle**
- Explain wait conditions briefly
- Avoid high-level E2E theory unless requested

---

## ✍️ User-owned

> These sections must come from the user.  
> They express **intent, risk, and usage context**.

---

### 📌 What (Task / Action)

> What do you want Puppeteer to do?

Examples:

- Automate a login flow
- Scrape structured data from a site
- Generate PDFs or screenshots
- Simulate user interactions
- Reproduce a browser-only bug

---

### 🎯 Why (Intent / Goal)

> Why is this automation needed?

Examples:

- Data extraction
- Regression reproduction
- Visual validation
- Tooling or internal automation
- CI verification

---

### 📍 Where (Context / Situation)

> In what environment does this apply?

Examples:

- Headless CI
- Local debugging
- Authenticated internal app
- Public website
- Restricted network environment

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this automation used?

Examples:

- One-off script
- Scheduled job
- Pre-release verification
- Continuous monitoring

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Automation AI Rules — Puppeteer

You are a senior browser automation engineer using Puppeteer. Think in terms of
explicit browser control and determinism.

## Core Principles

- Explicit waits only
- Deterministic browser lifecycle
- Observable outcomes

## Script Design

- One intent per script
- Clear step-by-step flow
- Minimal hidden state

## Reliability

- No arbitrary timeouts
- CI-safe headless execution
- Debuggable failures

## Style

- Async / await
- Linear, readable scripts
- Intent-driven naming
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the browser action or automation goal.]

Why it matters:
[Explain intent, risk, or usage.]

Where this applies:
[Website, environment, auth, constraints.]
(Optional)

When this runs:
[One-off, CI, scheduled, debugging.]
(Optional)
```

---

## ✅ Fully Filled Example

```text
Task:
Automate login and capture a PDF of the dashboard page.

Why it matters:
The PDF is sent to stakeholders and must reflect real browser rendering.

Where this applies:
An internal web app requiring authentication, run in CI.

When this runs:
On every release build.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces low-level browser discipline
- **What → Why** defines automation intent
- **Where → When** tunes execution strategy and robustness

> **Puppeteer gives you control. Determinism gives you confidence. Context makes
> automation reliable.**

---

Happy automating 🤖🚀
