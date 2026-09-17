# Scala Best Practices: Starter Template

A reusable starting point derived from the **3. ADTs & Exhaustive Matching** section of [Scala Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```scala
enum PaymentStatus:
  case Pending, Authorized, Failed(reason: String), Refunded

def describe(s: PaymentStatus): String = s match
  case Pending            => "waiting"
  case Authorized         => "confirmed"
  case Failed(reason)     => s"failed: $reason"
  case Refunded           => "refunded"
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
