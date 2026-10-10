# Overview

Focused reference for **swiftui-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# SwiftUI Best Practices

SwiftUI is a declarative UI framework: you describe the view for a given state and the framework reconciles it. Practical SwiftUI leans on **small `View` structs, explicit state ownership through property wrappers (`@State`, `@Binding`, `@Observable`)**, and **`Observable`/`@Environment` flows for shared data — not singletons**. The modifier chain reads as the styling contract, and `#Preview` + `XCTest` gate every iteration.

---

## 1. State & Data Flow

- **`@State` for local ephemeral view state; `@Binding` for child↔parent channels**:

```swift
struct CounterView: View {
    @State private var count = 0
    var body: some View {
        Button("Count = \(count)") { count += 1 }
    }
}
```

- **`@StateObject`/`@ObservedObject` (Combine) or `@State` + `@Observable` (Observation) for model data** — one owner, shared by reference via bindings/`@Environment`:

```swift
@Observable
final class AuthModel {
    var user: User?
    func signIn() async throws { ... }
}
```

- **Lift state to the nearest shared ancestor; colocate local state in the leaf** — a `@State` that floats across screens is a design smell.
- **Prefer `@Observable` + `@Environment`/`@Bindable` on modern OS targets** over Combine `ObservableObject` where possible.
- **Never store view state as globals/singletons** — the environment and explicit models own data, so tests can substitute fakes.

---

## 2. View Composition

- **Small reusable `View` structs over monolithic bodies** — a `body` beyond ~40 lines is a refactor signal; extract `Card`, `Row`, `EmptyState`:

```swift
struct UserCard: View {
    let user: User
    var body: some View {
        HStack(spacing: 8) { Text(user.name).bold(); Spacer(); Text(user.initials) }
    }
}
```

- **`@ViewBuilder` for conditional content; compose with calls, not `switch` storms.**
- **Reuse via environment/scene-level factories** (`@Environment(\.factory)`-style) rather than copy-pasted stacks.
- **`some View` return everywhere; never leak concrete `HStack`/`VStack` types into signatures.**
- **Primary action is a `Button`, navigation is `NavigationLink`** — don't fake interactivity with `onTapGesture`.

---
