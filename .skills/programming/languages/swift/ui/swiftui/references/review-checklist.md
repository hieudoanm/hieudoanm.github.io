# Review checklist

Focused reference for **swiftui-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
