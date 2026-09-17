# Implementation notes

Focused reference for **scala-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
