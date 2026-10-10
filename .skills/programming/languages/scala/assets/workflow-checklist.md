# Scala Best Practices: Workflow Checklist

A practical run sheet for applying [Scala Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Immutability & Values: **val over var; immutable collections by default** (List, Vector, Map, Set from scala.collection.immutable):
- [ ] 1. Immutability & Values: **case class for value types** — structural equality, copy, pattern matching, serialization-friendly:
- [ ] 2. Null Safety & Options: **Option over null-able contracts**; null creeps in only at Java-interop seams:
- [ ] 2. Null Safety & Options: **Flat-map the pipeline** — for-comprehensions / flatMap / map over nested get/getOrElse ladders:
- [ ] 3. ADTs & Exhaustive Matching: **enum with case objects/case classes = algebraic data types** — the closed form of the domain:
- [ ] 3. ADTs & Exhaustive Matching: **Compiler-enforced exhaustiveness** — add a case and the match stops compiling until every branch is covered
- [ ] 4. Error Handling: **Domain Either[E, A]/EitherT for expected outcomes; exceptions for genuine failures** — "not found", "invalid" are not exceptions:
- [ ] 4. Error Handling: **Try[A] at interop/fini boundaries (Java calls, parse); convert once to your domain type.**
- [ ] 5. Functional Pipelines & Collections: **Chain pure functions** — map, filter, flatMap, foldLeft, groupBy, partition over mutable accumulators:
- [ ] 5. Functional Pipelines & Collections: **collect for map-and-filter-in-one; groupMapReduce/groupMap for grouped reductions; scanLeft for running aggregates.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
