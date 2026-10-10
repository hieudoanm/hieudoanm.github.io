# Review checklist

Focused reference for **scala-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```scala
class PaymentSpec extends munit.FunSuite:
  test("authorized maps to confirmed"):
    assertEquals(describe(PaymentStatus.Authorized), "confirmed")
```

- **Property tests (`ScalaCheck`/`munit` + `Check`)** for parsers, binary boundaries, and round-trips:

```scala
property("parse . serialize == identity"):
  forAll { (u: User) => parse(serialize(u)) == u }
```

- **Fakes/`IO`-layered tests at effect seams** — pure functions need no mocks; test the interpreter separately.
- **Deterministic** — seeded RNG, overrides for clocks, no ambient environment.

---

## 9. Performance

- **Profile with the tools** (`-Xprof`/JFR/cat-nap) before optimizing; the usual suspects: allocations in hot loops, `String` building, boxing.
- **`Map`/`Vector` over `List` for indexed/sized access; avoid `++` rebuilds in loops.**

---

## General Rules of Thumb

- **`val`/immutable first; mutation is the exception with a name.**
- **Model the domain as case classes + sealed enums; the compiler exhaustivises your `match`.**
- **`Option`/`Either`/`Try` over null-and-throw; convert at the boundary once.**
- **Pure helpers compose; effects stay at the edges.**
- **`scalafmt` + `-Werror` + property tests are part of "done".**

---

## Quick-Start Checklist

- [ ] `case class`/`enum` ADTs; `opaque type` for distinct values; `val` default
- [ ] `Option`/`Either`/`for`-comprehensions; no bare `.get`; `null` only at interop
- [ ] Exhaustive `match` on sealed forms; guards ordered deliberately
- [ ] `Either[E, A]` for expected outcomes; exceptions for genuine failures
- [ ] Immutable collections + functional pipeline; `view` for lazy chains
- [ ] `Future` with explicit context (or CE/ZIO) for async; recovery on completed value
- [ ] Explicit types on public signatures; predicates named `isX`
- [ ] `scalafmt --check` clean; `-Werror` enabled; deprecations surfaced
- [ ] munit/scalatest contract + property tests; deterministic seeds
