# Scala Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`munit`/`scalatest`/`zio-test` on behavior** — table-driven cases for the contract:
- **Property tests (`ScalaCheck`/`munit` + `Check`)** for parsers, binary boundaries, and round-trips:
- **Fakes/`IO`-layered tests at effect seams** — pure functions need no mocks; test the interpreter separately.
- **Deterministic** — seeded RNG, overrides for clocks, no ambient environment.

## Example

```scala
class PaymentSpec extends munit.FunSuite:
  test("authorized maps to confirmed"):
    assertEquals(describe(PaymentStatus.Authorized), "confirmed")
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for scala-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
