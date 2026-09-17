# Braintree Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Braintree Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
// server generates a token for the client; client never handles card numbers directly
const gateway = braintree.connect({ environment, merchantId, publicKey, privateKey });
const { clientToken } = await gateway.clientToken.generate({});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
