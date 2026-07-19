# Overview

Focused reference for **swift-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Swift Best Practices

Swift is a multi-paradigm language built around value semantics and protocol-oriented design. Most of the classic Objective-C pain (nil-heavy code, unguarded state, shared mutable classes) is designed _out_ — the best practices here are about leaning into value types, `Codable`, `enum`-based state machines, and structured concurrency so whole classes of bugs become unrepresentable.

---

## 1. Project Structure

Swift Package Manager is the default for libraries and CLI tools; Xcode projects for app targets:

```txt
MyPackage/
├── Package.swift
├── Sources/
│   └── MyPackage/
│       ├── MyPackage.swift
│       ├── Models/
│       ├── Services/
│       └── Extensions/
├── Tests/
│   └── MyPackageTests/
└── .swiftlint.yml
```

- **SwiftPM for anything reusable** — one `Package.swift` per module layout; keep a binary/library split (`Sources/MyLibrary` + a thin `Sources/mycli/main.swift`) so logic is testable.
- One top-level type per file, named after the file — a file is a unit of discoverability, not just of code.
- Use subdirectories inside `Sources/<Target>/` for large tops (Models, Services, Views), matching module boundaries.
- Keep **extensions in dedicated files** (`String+Validation.swift`) or co-located with the type they extend — never scatter them randomly.

---

## 2. Value Types vs Reference Types

- **`struct` by default.** Value types give you `let`-immutability, no aliasing surprises, and value semantics that snapshot predictably:

```swift
struct Point { var x: Double; var y: Double }

var a = Point(x: 1, y: 2)
var b = a
b.x = 9            // a.x stays 1 — no shared state
```

- **`class` only when identity or shared mutable state is genuinely required** — a `UIViewController`, a cache, a connection pool. Mark such classes `final` unless you actually design for subclassing.
- **`protocol` over inheritance** — composition and protocol conformance beat class hierarchies for reuse; a type can conform to many protocols but inherit from one class.
- **Prefer `let` over `var`** — an immutable binding is a guarantee with no runtime cost; treat every `var` as something to justify.
- **`enum` with associated values for state machines** (see below) rather than `Bool` flags scattered across a class.

---

## 3. Optionals & Flow Control

- **Model absence explicitly with `Optional`** — the compiler forces you to handle "could be nil" at every use site; prefer `if let`/`guard let` over `!` force-unwrapping.
- **`guard` for early exit** on preconditions — keeps the happy path flat and left-aligned:
