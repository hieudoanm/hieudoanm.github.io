# ActiveMQ Best Practices: Basic Usage

Best practices for JMS-compliant messaging and enterprise integration with ActiveMQ (Classic or Artemis). Use when designing queues/topics, choosing acknowledgement modes, configuring redelivery and DLQs, transactions, or tuning broker operations — treats ActiveMQ as message-oriented middleware, not a stream.

## Scenario

Use this example as a starting point when applying **activemq** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Reliability, Transactions & Delivery Semantics** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
session = connection.createSession(true, Session.SESSION_TRANSACTED); // transactional
producer.send(message);
session.commit();      // batch of sends committed atomically
// on failure: session.rollback();
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
