# Workflow notes

Focused reference for **scala-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
