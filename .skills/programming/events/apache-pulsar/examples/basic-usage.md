# Apache Pulsar Best Practices: Basic Usage

Best practices for event streaming with Apache Pulsar. Use when designing tenants/namespaces/topics, choosing subscription types, configuring schemas and retention, planning geo-replication, or debugging backlog/latency — treats Pulsar as a distributed log with cursor-based consumption, not an ephemeral queue.

## Scenario

Use this example as a starting point when applying **apache-pulsar** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sh
# tenant / namespace
pulsar-admin tenants create me
pulsar-admin namespaces create me/orders --clusters primary
pulsar-admin topics create-persistent-topic persistent://me/orders/order-events
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
