# Implementation notes

Focused reference for **swiftui-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
