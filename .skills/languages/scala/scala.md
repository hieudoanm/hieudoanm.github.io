---
name: scala-best-practices
description: Best practices for writing Scala — the language conventions for Scala 3 applications and libraries. Use when writing, structuring, or reviewing Scala — covers immutability, case classes, null safety, pattern matching, error handling, typed design, futures/concurrency, and tooling.
---

# Scala Best Practices

Scala (3) is a statically-typed, expressive language on the JVM that threads functional and object-oriented style. Practical Scala leans on **immutability as the default, ADTs (`enum`/case classes) for domain models, exhaustive pattern matching via the compiler**, and **`Option`/`Either`/`Try` over null-and-throw**. The toolchain is opinionated — `scalafmt` + `scalac` warnings + a test suite are the review gates, and the compiler is your loudest reviewer.

---

## 1. Immutability & Values

- **`val` over `var`; immutable collections by default** (`List`, `Vector`, `Map`, `Set` from `scala.collection.immutable`):

```scala
val ids: List[Int] = List(1, 2, 3)
val doubled = ids.map(_ * 2)
```

- **`case class` for value types** — structural equality, copy, pattern matching, serialization-friendly:

```scala
case class User(id: Long, name: String, email: Option[String] = None)
```

- **Name the shape, not the filler** — `User`, `Address`, `Amount` over bare `(Long, String)` tuples in signatures.
- **`opaque type` for distinct-but-same-representation values** (IDs, units) where a full class is overkill:

```scala
opaque type UserId = Long
object UserId { def apply(value: Long): UserId = value }
```

- **Return updated copies, not mutation** — a method that mutates its argument (`mutable.*`) is a glaring smell in signature review.

---

## 2. Null Safety & Options

- **`Option` over `null`-able contracts**; `null` creeps in only at Java-interop seams:

```scala
val maybeUser: Option[User] = repo.find(id)
val name = maybeUser.map(_.name).getOrElse("anonymous")
```

- **Flat-map the pipeline** — `for`-comprehensions / `flatMap` / `map` over nested `get`/`getOrElse` ladders:

```scala
for {
  user     <- repo.find(id)
  settings <- user.settings
} yield render(user, settings)
```

- **`getOrElse`/`getOrElseThrow` with explicit fallbacks; never bare `get` on a value you didn't just construct.**
- **Pattern-match `Option` for the exhaustive shape; `collect`/`collectFirst` for selected cases.**
- **`null` literacy at boundaries** — sanitize at the interop point (`Option.apply(javaValue)`), never in domain code.

---

## 3. ADTs & Exhaustive Matching

- **`enum` with case objects/case classes = algebraic data types** — the closed form of the domain:

```scala
enum PaymentStatus:
  case Pending, Authorized, Failed(reason: String), Refunded

def describe(s: PaymentStatus): String = s match
  case Pending            => "waiting"
  case Authorized         => "confirmed"
  case Failed(reason)     => s"failed: $reason"
  case Refunded           => "refunded"
```

- **Compiler-enforced exhaustiveness** — add a case and the `match` stops compiling until every branch is covered.
- **`sealed trait` (Scala 2) vs `enum` (Scala 3)** — prefer `enum`; `sealed` for legacy/library code.
- **Pattern matching over `if/else` chains and `.asInstanceOf` casts; use guards sparingly with deliberate precedent order.**
- **Match on the whole input once; destructure nested shapes with one expression.**

---

## 4. Error Handling

- **Domain `Either[E, A]`/`EitherT` for expected outcomes; exceptions for genuine failures** — "not found", "invalid" are not exceptions:

```scala
def divide(a: Int, b: Int): Either[String, Int] =
  if (b == 0) Left("division by zero") else Right(a / b)
```

- **`Try[A]` at interop/fini boundaries (Java calls, parse); convert once to your domain type.**
- **Custom exception types** (extend `Exception`/`RuntimeException`) + `NotImplementedError`-style obviousness for true invariants.
- **`handleError`/`recover`/`fold` for outcome conversion; never `.get` on an `Either`/`Try`.**
- **No `assert`-less silent catch** — narrow, convert with context, or rethrow; an empty `catch` is a bug.

---

## 5. Functional Pipelines & Collections

- **Chain pure functions** — `map`, `filter`, `flatMap`, `foldLeft`, `groupBy`, `partition` over mutable accumulators:

```scala
val activeNames: List[String] =
  users
    .filter(_.active)
    .sortBy(_.name)
    .map(_.name)
```

- **`collect` for map-and-filter-in-one; `groupMapReduce`/`groupMap` for grouped reductions; `scanLeft` for running aggregates.**
- **`view` for lazy chains over big data** — materialize at the boundary, don't hold intermediate full copies.
- **Use the right structure** — `Vector` for random access, `List` for prefix ops, `Map`/`Set` for membership by identity.
- **Keep pipelines at a readable length** — a chain beyond ~6 transformations is an intermediate named value in disguise.

---

## 6. Effect Systems & Concurrency

- **`Future` (with an ExecutionContext) for the SIMPLE parallel case; `cats-effect`/`ZIO` for disciplined effect stacks**:

```scala
import scala.concurrent.Future
val both: Future[(Int, Int)] = Future(a).zip(Future(b))   // parallel

for
  x <- both
yield x._1 + x._2
```

- **`Future` recovery**: `.recover`/`.recoverWith`/`.map(_.sequence)` — the completed value is the truth, not the side effect.
- **Thread pools/execution contexts explicit** — an implicit `ExecutionContext.global` for everything is a starvation bug waiting for load.
- **`AtomicReference`/`Ref` (cats-effect) for shared mutable cell discipline; `Lock` only at blessed seams.**
- **Structured concurrency first** (`async` in Scala 3, `IO` fork-join in CE) over raw thread spawning.

---

## 7. Style & Tooling

- **`scalafmt` as the enforced formatter; compile warnings as errors**:

```bash
scalafmt --check
scalacOptions ++= Seq("-Werror", "-Wunused:all", "-deprecation")
```

- **Explicit types on public APIs; inference inside blocks** — a signature says what the code promises:

```scala
def render(user: User): String = ...
```

- **Semantic names (verbs for methods, nouns for types); predicate `def isActive: Boolean`; unit-returning methods named in prose.**
- **Single responsibility per object/file; keep methods small and total (total = every input yields a result).**
- **Tab-indentation default scalafmt style; one name per concept — no `user`/`userObj`/`u`.

---

## 8. Testing

- **`munit`/`scalatest`/`zio-test` on behavior** — table-driven cases for the contract:

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