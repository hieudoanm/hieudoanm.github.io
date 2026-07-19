# Klarna Best Practices: Basic Usage

Best practices for integrating Klarna payment and Pay Later services. Use when offering Klarna checkout, affecting order flows with a payment SDK/v2 API, or handling webhooks — covers session creation, authorization, and capture (order management).

## Scenario

Use this example as a starting point when applying **klarna** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```text
Server ──create session──► Klarna ──render iframe──► Client approves
Client ──(order_id)──► Server ──capture──► Klarna
                              └─ webhooks ─► final state / notifications
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
