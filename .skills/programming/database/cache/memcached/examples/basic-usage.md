# Memcached Best Practices: Basic Usage

Best practices for using Memcached as a simple, non-persistent cache. Use when designing cache-aside strategies, choosing keys/TTLs, tuning slab/memory usage, or deciding between Memcached and Redis — covers eviction, consistent hashing, and cache-loss-tolerant design.

## Scenario

Use this example as a starting point when applying **memcached** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
set user:42:profile 0 300 "<serialized payload>" 0
get user:42:profile
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
