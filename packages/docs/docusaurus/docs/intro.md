---
sidebar_position: 1
---

# 💬 Promptly

- [💬 Promptly](#-promptly)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
  - [✍️ User-owned](#️-user-owned)
    - [📌 What (Task / Action)](#-what-task--action)
    - [🎯 Why (Intent / Goal)](#-why-intent--goal)
    - [📍 Where (Context / Situation)](#-where-context--situation)
    - [⏰ When (Time / Phase / Lifecycle)](#-when-time--phase--lifecycle)
  - [🔗 Final Prompt Template (Recommended Order)](#-final-prompt-template-recommended-order)
  - [🧠 Why This Ordering Works](#-why-this-ordering-works)

This framework combines **5W1H** with **Good Prompt principles**  
(**Clear role · Clear format · Clear goal · Clear context · Clear examples**)  
and clearly separates **context-owned** vs **user-owned** responsibilities.

The key idea:  
👉 **The context controls quality and consistency**  
👉 **The user controls intent, meaning, and context**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They should always exist to guarantee **predictable, high-quality outputs**.

---

### 👤 Who (Role / Persona)

> Who should the AI act as?

- Role / Persona
  - “You are an experienced digital strategist”
  - “Act as a senior backend engineer”
  - “Think like a hiring manager”
  - “Respond as a technical architect”

✅ Sets **perspective, expertise, and bias**  
✅ Strongly influences reasoning depth and tone  
⚠️ Should always be present (a default can be provided)

---

### 🛠️ How (Format / Constraints / Style)

> How should the response be delivered?

- Format / Output
  - Table, bullets, steps, code, checklist
- Constraints
  - Word count
  - Tone (formal, concise, neutral)
  - Depth (high-level vs detailed)
- Style
  - Naming conventions
  - Explanation level
  - Use of examples

Example:

- “Respond in a table with pros and cons”
- “Under 200 words, concise and neutral”
- “Include one concrete example”

✅ Controls **usability, clarity, and consistency**  
✅ Makes prompts reusable across users and teams  
📝 Users may override specifics, but the structure remains context-owned

---

## ✍️ User-owned

> These sections must come from the user.  
> They represent **intent, goals, and real-world context** that cannot be guessed.

---

### 📌 What (Task / Action)

> What do you want the AI to do?

- Task / Action
  - Write frontend code
  - Review backend architecture
  - Compare technologies
  - Explain a concept
  - Generate ideas

✅ Defines the **core action**  
❌ Cannot be inferred by the context  
👉 Always required from the user

---

### 🎯 Why (Intent / Goal)

> Why are you asking? What’s the desired outcome?

- Purpose
- Goal
- Success criteria
- Decision support

Example:

- “To decide between two architectures”
- “So a non-technical stakeholder can understand”
- “To reduce onboarding time”

✅ Improves **relevance and prioritization**  
❌ Only the user knows the true motivation

---

### 📍 Where (Context / Situation)

> In what context does this apply?

- Background information
- Input data
- Environmental constraints
- Target audience
- Usage scenario

Example:

- “In a startup MVP context…”
- “Given the following API response…”
- “For a production Kubernetes environment…”

✅ Grounds the response in **real constraints**  
⚠️ Optional, but highly impactful

---

### ⏰ When (Time / Phase / Lifecycle)

> When is this being used or decided?

- Timeline
- Project phase
- Urgency
- Lifecycle stage

Example:

- “During early design exploration”
- “Before a stakeholder presentation”
- “For immediate production debugging”

✅ Helps tune **depth, urgency, and risk tolerance**  
⚠️ Optional, but useful for prioritization

---

## 🔗 Final Prompt Template (Recommended Order)

```text
Act as [WHO]. ← 🏗️ Context-owned

How to respond: ← 🏗️ Context-owned

- Format: [FORMAT]
- Style: [STYLE]
- Constraints: [LIMITS]
- Examples: [YES / NO]

Task: [WHAT]. ← ✍️ User-owned
Why it matters: [WHY]. ← ✍️ User-owned
Where this applies: [WHERE]. ← ✍️ User-owned (optional)
When this is needed: [WHEN]. ← ✍️ User-owned (optional)
```

---

## 🧠 Why This Ordering Works

- **Who → How** sets _thinking mode_ and _output contract_
- **What → Why** defines intent and direction
- **Where → When** fine-tunes relevance and urgency

> **The template enforces clarity.  
> The user provides meaning.  
> Context makes the answer useful.**

---

Happy prompting 🚀
