# Scala Best Practices: 1. Immutability & Values

## Source guidance

This example applies the **1. Immutability & Values** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`val` over `var`; immutable collections by default** (`List`, `Vector`, `Map`, `Set` from `scala.collection.immutable`):
- **`case class` for value types** — structural equality, copy, pattern matching, serialization-friendly:
- **Name the shape, not the filler** — `User`, `Address`, `Amount` over bare `(Long, String)` tuples in signatures.
- **`opaque type` for distinct-but-same-representation values** (IDs, units) where a full class is overkill:
- **Return updated copies, not mutation** — a method that mutates its argument (`mutable.*`) is a glaring smell in signature review.

## Example

```scala
val ids: List[Int] = List(1, 2, 3)
val doubled = ids.map(_ * 2)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for scala-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
