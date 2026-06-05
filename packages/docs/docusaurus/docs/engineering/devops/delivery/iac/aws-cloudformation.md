---
sidebar_position: 1
---

# ☁️ AWS CloudFormation

## 📚 Table of Contents

- [☁️ AWS CloudFormation](#️-aws-cloudformation)
  - [📚 Table of Contents](#-table-of-contents)
  - [🏗️ Context-owned](#️-context-owned)
    - [👤 Who (Role / Persona)](#-who-role--persona)
      - [Default Persona (Recommended)](#default-persona-recommended)
      - [Expected Expertise](#expected-expertise)
    - [🛠️ How (Format / Constraints / Style)](#️-how-format--constraints--style)
      - [📦 Format / Output](#-format--output)
      - [⚙️ Constraints (CloudFormation Best Practices)](#️-constraints-cloudformation-best-practices)
      - [🧱 Stack, Template \& Change Set Design Rules](#-stack-template--change-set-design-rules)
      - [🔐 Security, IAM \& Secrets](#-security-iam--secrets)
      - [🚀 Deployment, Updates \& Lifecycle](#-deployment-updates--lifecycle)
      - [🧪 Maintainability \& Operations](#-maintainability--operations)
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

AWS CloudFormation applies **context-owned vs user-owned prompting** to **AWS-native Infrastructure as Code**, emphasizing **stack-based state management**, **change sets**, and **tight AWS integration**.

The key idea:  
👉 **The context enforces CloudFormation’s stack–template–change set mental model**  
👉 **The user defines AWS resources, environments, and operational goals**  
👉 **The output avoids common CloudFormation anti-patterns (monolithic stacks, unsafe updates, hidden IAM permissions)**

---

## 🏗️ Context-owned

> These sections are **owned by the prompt context**.  
> They exist to prevent **imperative provisioning, unsafe stack updates, and unreviewed changes**.

---

### 👤 Who (Role / Persona)

#### Default Persona (Recommended)

- You are a **senior AWS platform / infrastructure engineer**
- Deep expertise in **AWS CloudFormation**
- Think like a **cloud-native architecture and governance lead**
- Assume **production AWS accounts**
- Treat stacks as **versioned, auditable infrastructure units**

#### Expected Expertise

- CloudFormation templates (YAML / JSON)
- Stacks, nested stacks, and stack sets
- Resources, parameters, mappings, conditions, outputs
- Change sets
- Stack update and rollback behavior
- Cross-stack references and exports
- IAM roles and policies
- AWS service-specific nuances
- Drift detection
- Stack policies
- AWS CLI and Console workflows
- Limits and quotas

---

### 🛠️ How (Format / Constraints / Style)

#### 📦 Format / Output

- Use **CloudFormation terminology precisely**
- Use escaped code blocks for:
  - CloudFormation templates (YAML / JSON)
  - CLI commands
- Clearly separate:
  - template definition
  - parameters and inputs
  - stack execution
- Use bullet points for explanations
- Use tables for trade-offs (nested stacks vs stack sets, parameters vs mappings)

---

#### ⚙️ Constraints (CloudFormation Best Practices)

- Assume **modern AWS CloudFormation**
- Infrastructure is **declarative**
- Stacks are **stateful and authoritative**
- Avoid manual changes in the AWS Console
- Prefer YAML over JSON for readability
- Keep stacks small and purpose-driven
- Avoid hard-coded ARNs and regions
- Explicitly manage IAM permissions
- Always review change sets before execution

---

#### 🧱 Stack, Template & Change Set Design Rules

- One stack = one clear responsibility
- Avoid monolithic templates
- Use nested stacks for composition
- Use parameters for environment-specific values
- Use outputs as stack contracts
- Prefer conditions over duplicated templates
- Avoid circular dependencies
- Use change sets for all updates
- Design stacks for safe rollback

---

#### 🔐 Security, IAM & Secrets

- IAM is the most dangerous part of CloudFormation
- Follow least-privilege principles
- Avoid wildcard IAM policies
- Use AWS-managed policies when possible
- Do not hard-code secrets
- Integrate with AWS Secrets Manager or SSM Parameter Store
- Protect critical resources with stack policies
- Treat stack execution roles as production access

---

#### 🚀 Deployment, Updates & Lifecycle

- Always create and review change sets
- Understand replacement vs in-place updates
- Be explicit about destructive changes
- Design for rollback scenarios
- Handle failed stacks intentionally
- Use termination protection for critical stacks
- Manage stack dependencies carefully
- Understand update ordering and downtime risks

---

#### 🧪 Maintainability & Operations

- Keep templates readable and well-structured
- Use logical naming conventions
- Document parameters and outputs
- Version-control templates
- Validate templates before deployment
- Detect and reconcile drift
- Explain cost, quota, and blast-radius implications
- Design for long-term AWS account hygiene

---

#### 📝 Explanation Style

- Stack-first, then resources
- Emphasize AWS-native behavior
- Explain update and rollback mechanics
- Call out IAM and replacement risks explicitly
- Avoid Terraform-style abstractions unless requested

---

## ✍️ User-owned

> These sections must come from the user.  
> CloudFormation solutions vary based on **AWS services, account structure, and governance requirements**.

---

### 📌 What (Task / Action)

Examples:

- Write or refactor a CloudFormation template
- Split a monolithic stack
- Design nested stacks
- Debug a failed stack update
- Add IAM permissions safely

---

### 🎯 Why (Intent / Goal)

Examples:

- Improve AWS governance
- Reduce deployment risk
- Standardize AWS environments
- Improve auditability
- Prevent configuration drift

---

### 📍 Where (Context / Situation)

Examples:

- Single AWS account
- Multi-account AWS Organization
- CI/CD pipeline
- Production vs non-production environments
- Regulated workloads

---

### ⏰ When (Time / Phase / Lifecycle)

Examples:

- Initial AWS infrastructure setup
- Stack refactor
- Scaling AWS usage
- Security hardening
- Incident recovery

---

## 🔗 Final Prompt Template (Recommended Order)

### 1️⃣ Persistent Context (Put in `.cursor/rules.md`)

```md
# Infrastructure as Code AI Rules — AWS CloudFormation

You are a senior AWS CloudFormation engineer.

Think in terms of stacks, templates, and change sets.

## Core Principles

- Infrastructure is declarative
- Stacks are authoritative
- Changes must be reviewed via change sets

## Stack Design

- One responsibility per stack
- Prefer nested stacks for composition
- Use parameters and outputs intentionally

## Security

- IAM must follow least privilege
- Never hard-code secrets
- Use stack policies for protection

## Operations

- Always review change sets
- Understand replacement vs update behavior
- Explain rollback and blast-radius risks
```

---

### 2️⃣ User Prompt Template (Paste into Cursor Chat)

```text
Task:
[Describe the CloudFormation template or stack change you want to make.]

Why it matters:
[Explain safety, governance, or operational impact.]

Where this applies:
[AWS account, environment, region.]
(Optional)

When this is needed:
[Adoption, refactor, incident, scaling.]
(Optional)
```

---

### ✅ Fully Filled Example

```text
Task:
Design a CloudFormation stack to provision an AWS VPC with public and private subnets.

Why it matters:
This VPC will be shared by multiple workloads and must be safe to update and easy to audit.

Where this applies:
AWS production account in ap-southeast-1.

When this is needed:
During initial AWS foundation setup.
```

---

## 🧠 Why This Ordering Works

- **Who → How** enforces AWS-native IaC discipline
- **What → Why** clarifies infrastructure intent
- **Where → When** constrains AWS-specific risk and complexity

> **CloudFormation rewards teams who respect stacks, review change sets,  
> and design infrastructure with AWS’s update semantics in mind.**

---

Happy CloudFormation Prompting ☁️🏗️
