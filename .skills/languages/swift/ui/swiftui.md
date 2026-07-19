---
name: swiftui-best-practices
description: Best practices for building SwiftUI apps — the framework conventions for Apple platform UIs. Use when writing, structuring, or reviewing SwiftUI — covers state and data flow, view composition, layout, lists, navigation, theming, previews, testing, and performance.
---

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

## 3. Layout & Modifiers

- **Stacks compose layout**: `HStack`/`VStack`/`ZStack` with alignment and spacing — no hardcoded frame guesswork:

```swift
VStack(alignment: .leading, spacing: 12) {
    Text(title).font(.title2)
    Text(subtitle).font(.body).foregroundStyle(.secondary)
}
```

- **`Spacer`/`Frame`/`GeometryReader` deliberate** — `GeometryReader` as the last resort for proportional chrome.
- **`safeAreaInset`/`.padding()/.frame()` modify the view subtree precisely; avoid whole-screen `.ignoresSafeArea()`.**
- **Modifiers order matters — `.padding().background()` vs `.background().padding()` paint different boxes**; the chain reads left-to-right as applied.
- **`containerRelativeFrame`/`Layout` for custom divide; prefer system layouts over hand-positioning.**

---

## 4. Lists & Scrollable Content

- **`List` for dynamic, selectable content; `ForEach` for item maps** — data-driven, diffable:

```swift
List(users) { user in
    UserCard(user: user)
}
```

- **`LazyVStack`/`LazyVGrid` inside `ScrollView` for custom lazy layouts**; `Section` for grouped headings.
- **Stable equatable identities** — `Identifiable` from a stable `id`, never index position.
- **Swipe actions/modifiers only where gesture-native** (`Button` roles, `destructive`).

---

## 5. Navigation

- **`NavigationStack` + `navigationDestination` by value over `NavigationView`+path string hacks**:

```swift
NavigationStack {
    List { ForEach(users) { user in
        NavigationLink(value: user) { UserCard(user: user) }
    } }
    .navigationDestination(for: User.self) { UserDetailView(user: $0) }
}
```

- **Type-safe destinations** — navigation is driven by model values, not URLs or opaque identifiers.
- **`NavigationPath`-based binding for complex flows; `tabView`/`Sheet` for scope changes.**
- **Back-button/`dismiss` contracts respected** — a screen that traps the user is a UX bug.

---

## 6. Theming & Environment

- **All tokens flow from the environment** — `@Environment(\.colorScheme)`, `@Environment(\.dynamicTypeSize)`, and `Scene`/`App` injections:

```swift
Text("Hello").font(.headline)
    .foregroundStyle(.primary)
```

- **`ColorAssets`/`Assets.xcassets` + semantic names** (`primaryLabel`, `surfaceBackground`) over inline hex literals.
- **Dark mode is default; `UIColor/dynamic` handled by system unless deliberately overridden.**
- **Accessibility first** — `accessibilityLabel`, `accessibilityValue`, `accessibilityAddTraits(.isButton)` on custom composites; never ship an unannounced interactive view.

---

## 7. Async & Side Effects

- **`.task` for lifecycle-bound async work** — it cancels when the view disappears:

```swift
.task {
    await model.load()
}
```

- **`.onAppear` for synchronous setup only; never for network/DB work** (fires multiple times, no cancellation).
- **`@Observable` + `task`/`Task { await ... }` drains the model; UI models don't do raw networking — services/repos do.**
- **Cancellation is part of the contract** — `Task`/`AsyncStream` cleanup in `.onDisappear` where `.task` scope doesn't apply.
- **Loading/error/empty states are first-class views**, driven by state (`.init`, `.loading`, `.loaded`, `.error`) not ad-hoc optionals.

---

## 8. Previews & Iteration

- **`#Preview` everywhere a view changes** — device-variant, dark-mode, and state-driven snapshots:

```swift
#Preview("Light") { UserCard(user: .fixture) }
#Preview("Dark") { UserCard(user: .fixture).preferredColorScheme(.dark) }
```

- **Preview data via fixtures/fakes** — deterministic, small, named (`User.cardFixture`).
- **Preview the state machine**: `.init`, `.loading`, `.loaded`, `.error` each get a preview.
- **Never block a preview on real networking; inject a fake seam.**

---

## 9. Testing

- **Unit-test models/services** (state transitions, validation, error mapping) — the framework's concerns excluded:

```swift
func testSignInFailure() async {
    let model = AuthModel(api: .failing)
    do { try await model.signIn(); XCTFail("expected failure") }
    catch { XCTAssertEqual(model.state, .error) }
}
```

- **`ViewInspector`/`XCTest` UI probes only where interaction logic matters** — keep the bulk of coverage in logic and data transforms.
- **Snapshot/visual regressions only for genuinely fragile chrome** — fast, deterministic, CI-friendly.
- **Deterministic async** — `async`/`await` with injected fakes; no `sleep`.

---

## 10. Performance & App Structure

- **Profile with Instruments before optimizing** — the usual suspects: whole-subtree re-renders, image re-decoding, `ZStack` overdraw.
- **`Equatable` + stable identity reduce re-render churn; `@Bindable`/`@Observable` scoped reads limit invalidation.**
- **Images**: `AsyncImage`/`Kingfisher`-style caching with rendered-size decoding; never unbounded typed-image axis.
- **Keep the App/Scene shell thin** — wiring in `@main`, environment setup and launches in scene/App modifiers only.

---

## General Rules of Thumb

- **State is explicit: `@State`/`@Binding`/`@Observable` — ownership visible from the declaration.**
- **Small view structs, `@ViewBuilder` composition, sub-40-line bodies.**
- **`List`/`ForEach` data-driven; navigation value-driven.**
- **All visual tokens via environment; accessibility is not optional.**
- **`.task` for lifecycle async; loading/error/empty are views.**
- **`#Preview` + unit tests + Instruments are part of "done".**

---

## Quick-Start Checklist

- [ ] `@State`/`@Binding`/`@Observable` ownership correct; no global/singleton state
- [ ] Small `View` structs; `@ViewBuilder`; `some View` returns
- [ ] Stacks with alignment/spacing; modifiers ordered by paint intent
- [ ] `List`+`ForEach` with stable identities; `Lazy*` for custom lazy lists
- [ ] `NavigationStack` + `navigationDestination` by value
- [ ] Semantic color assets; dark mode; accessibility labels/traits
- [ ] `.task` for lifecycle async; states (`loading`/`error`/`empty`) as views
- [ ] `#Preview` for light/dark/state variants with fixture data
- [ ] Unit-tested models/services; deterministic async fakes
- [ ] Instruments-profiled hot paths; cached/resized images; thin App shell