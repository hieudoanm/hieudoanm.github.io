# Paddle Best Practices: Basic Usage

Best practices for selling digital products and subscriptions with Paddle. Use when integrating checkout, handling merchant-of-record tax/refunds, or consuming webhooks — covers webhook signatures, product/subscription modeling, and revenue recognition.

## Scenario

Use this example as a starting point when applying **paddle** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
// Classic webhook signature verification
const signature = req.headers["Paddle-Signature"];
// verify HMAC with your Webhook Secret + raw body, then handle event
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
