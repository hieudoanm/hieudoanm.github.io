# Overview

Focused reference for **scala-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
