# ActiveMQ Best Practices: Starter Template

A reusable starting point derived from the **3. Reliability, Transactions & Delivery Semantics** section of [ActiveMQ Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
session = connection.createSession(true, Session.SESSION_TRANSACTED); // transactional
producer.send(message);
session.commit();      // batch of sends committed atomically
// on failure: session.rollback();
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
