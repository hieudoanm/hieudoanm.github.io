# RabbitMQ Best Practices: Basic Usage

Best practices for message-driven workflows with RabbitMQ. Use when designing exchanges and queues, implementing producers/consumers, adding retries and dead-letter queues, or debugging message loss/backlog — treats RabbitMQ as a message broker for workflows, not an event log or data store.

## Scenario

Use this example as a starting point when applying **rabbitmq** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
// Exchange + queue + binding
channel.exchangeDeclare("orders.direct", "direct", true);
channel.queueDeclare("orders.created", true, false, false, null);
channel.queueBind("orders.created", "orders.direct", "order.created");
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
