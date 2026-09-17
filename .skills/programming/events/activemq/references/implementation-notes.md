# Implementation notes

Focused reference for **activemq**, excerpted from SKILL.md. The skill file remains the canonical guide.

```java
session = connection.createSession(true, Session.SESSION_TRANSACTED); // transactional
producer.send(message);
session.commit();      // batch of sends committed atomically
// on failure: session.rollback();
```

---

## 4. Performance & Operations

- Monitor: **queue depth, consumer lag, disk usage**
- Tune: **prefetch**, persistence adapters (KahaDB/AMQ for Classic; Artemis journal)
- **Scale consumers horizontally**; avoid hot destinations
- **Test broker restart and failover**
- **Understand Classic vs Artemis operational differences** (they are different brokers)
- Document **operational limits clearly**

---

## 5. General Rules of Thumb
