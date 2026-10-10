# Swift Best Practices: 6. Concurrency & Actors

## Source guidance

This example applies the **6. Concurrency & Actors** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`async`/`await` over callbacks** — modern Swift concurrency is the default; write `async` functions instead of nesting completion-handler closures.
- **Actors isolate shared mutable state** — `actor` guarantees serialized access at compile time, replacing hand-rolled locks:
- **Mark sendable boundaries with `Sendable`** and prefer value types (`struct`/`enum`) at those boundaries so sharing across tasks is safe by construction.

## Example

```swift
actor Counter {
    private var value = 0
    func increment() { value += 1 }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for swift-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
