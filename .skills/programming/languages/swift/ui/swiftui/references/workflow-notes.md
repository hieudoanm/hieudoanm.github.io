# Workflow notes

Focused reference for **swiftui-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
