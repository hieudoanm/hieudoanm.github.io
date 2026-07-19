# Scala Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Domain `Either[E, A]`/`EitherT` for expected outcomes; exceptions for genuine failures** — "not found", "invalid" are not exceptions:
- **`Try[A]` at interop/fini boundaries (Java calls, parse); convert once to your domain type.**
- **Custom exception types** (extend `Exception`/`RuntimeException`) + `NotImplementedError`-style obviousness for true invariants.
- **`handleError`/`recover`/`fold` for outcome conversion; never `.get` on an `Either`/`Try`.**
- **No `assert`-less silent catch** — narrow, convert with context, or rethrow; an empty `catch` is a bug.

## Example

```scala
def divide(a: Int, b: Int): Either[String, Int] =
  if (b == 0) Left("division by zero") else Right(a / b)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for scala-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
