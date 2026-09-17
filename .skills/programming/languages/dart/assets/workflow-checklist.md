# Dart Best Practices: Workflow Checklist

A practical run sheet for applying [Dart Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Null Safety: **Non-nullable is the default** — a String promises it isn't null; only String? can be null:
- [ ] 1. Null Safety: **Handle null at the boundary, promote inside** — use if (x != null) or ?./??, and trust promotion:
- [ ] 2. Sound Types & Inference: **Prefer explicit types at boundaries, inference inside functions** — public signatures always annotated:
- [ ] 2. Sound Types & Inference: **dynamic is a leak** — it disables every prompt check; prefer Object? + a switch/patterns to narrow, or generics
- [ ] 3. Immutability & Construction: **final fields by default; const for compile-time-known values**:
- [ ] 3. Immutability & Construction: **const constructor + identical-favored instances for shared immutable data** — caching and comparison get cheaper
- [ ] 4. Collections: **Expose read-only views at boundaries** — List.unmodifiable, Map.unmodifiable, or expose Iterable<T> not the backing List<T>:
- [ ] 4. Collections: **Collection literals beat manual loops** — spreads, for-in literals, and collection if compose declaratively:
- [ ] 5. Async & Streams: **async/await down, not up** — never .then chains where await reads; never unawaited a Future whose error matters:
- [ ] 5. Async & Streams: **Future.wait/Stream batch for independent work** instead of awaiting sequentially

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
