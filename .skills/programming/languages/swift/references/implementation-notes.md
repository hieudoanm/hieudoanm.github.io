# Implementation notes

Focused reference for **swift-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Concurrency & Actors

- **`async`/`await` over callbacks** — modern Swift concurrency is the default; write `async` functions instead of nesting completion-handler closures.
- **Actors isolate shared mutable state** — `actor` guarantees serialized access at compile time, replacing hand-rolled locks:

```swift
actor Counter {
    private var value = 0
    func increment() { value += 1 }
}
```

- **Mark sendable boundaries with `Sendable`** and prefer value types (`struct`/`enum`) at those boundaries so sharing across tasks is safe by construction.
- **Structured concurrency: `async let`, `TaskGroup`** — children complete before the scope does; cancellation propagates automatically. Avoid unstructured fire-and-forget `Task { }` unless the lifetime is explicit (view-model, service worker).
- **Keep the main actor for UI; `await` moving work** — `Task.detached`/`Task { }` on the right executor for CPU-bound or blocking work, don't block the main thread.
- **Prefer dependency injection via initialisers** (`init(service: Service)`) — the concurrency-safe, testable way to wire dependencies instead of singletons.

---

## 7. Protocols & Extensions

- **Protocols define capabilities; extensions provide implementations** — protocol-oriented programming keeps concrete types small:

```swift
protocol Validating { var isValid: Bool { get } }
extension String: Validating { var isValid: Bool { !isEmpty } }
```

- **Default implementations in `extension Protocol { }`** for shared behaviour; keep required members minimal so conformance is cheap.
- **Prefer `extension` to refine/group members** — conformance, helpers, and test-only API live in separate extensions by purpose.
- **`some Protocol` (opaque return) over `any Protocol` (existential) by default** for return types — better performance and fewer type-erasure surprises; reach for `any` when heterogeneous collections or dynamic dispatch are actually needed.
- **Name protocols for the capability or role** (`Sendable`, `Codable`, `PersistenceControlling`), not the concrete implementer.

---

## 8. Codable & Serialization

- **`Codable` for JSON and encoding** — adopt it on your models and get encode/decode (from)-free:

```swift
struct User: Codable {
    let id: Int
    let name: String
}
let user = try JSONDecoder().decode(User.self, from: data)
```

- **Custom `CodingKeys` for snake_case/different-key wire formats** rather than mirroring back-end naming; use `.convertFromSnakeCase` where the API is consistently snake_case.
- **Make `Codable` models immutable (`let`)** and decode in a failable/`throws` context, not over force-`try!` on untrusted JSON.
- **`Codable` conforms only when the round-trip is actually stable** — for ad-hoc transforms (dates, enums with raw values) write explicit `init(from:)`/`encode(to:)`.

---
