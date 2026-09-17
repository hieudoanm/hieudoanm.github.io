# Apache Kafka Best Practices: Basic Usage

Best practices for event streaming with Apache Kafka. Use when designing topics and schemas, building producers/consumers, choosing delivery semantics, debugging consumer lag, or planning streaming pipelines — treats Kafka as an event log and streaming backbone, not a queue or database.

## Scenario

Use this example as a starting point when applying **apache-kafka** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```sh
# topic config
kafka-topics.sh --create --topic order.events \
  --partitions 12 --replication-factor 3 \
  --config retention.ms=604800000 --config cleanup.policy=delete
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
