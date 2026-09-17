# Example: Third-Party Provider

**Illustrative resilience plan.**

A product depends on an external verification provider. The adapter isolates provider-specific schemas, applies bounded timeouts and retries only safe operations, and maps provider failures to stable internal error categories.

The design states fallback behavior, reconciliation, rate limits, credential rotation, data-sharing terms, and provider status monitoring. It avoids presenting a fallback as equivalent if it changes assurance or user outcomes.
