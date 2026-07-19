# Workflow notes

Focused reference for **flutter-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`Column`/`Row`/`Stack` compose the 90% case** — alignment and spacing declared, no hardcoded offsets:

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [Text(title), Row(children: [Icon, Expanded(child: text)])],
)
```

- **`Expanded`/`Flexible` fill space; `Spacer`/`SizedBox` for gap discipline** — never `Container(margin:)` everywhere for spacing.
- **Scrollable, not overflow**: use `ListView`/`SingleChildScrollView` and `shrinkWrap: true` in nested scroll contexts.
- **Responsive via `LayoutBuilder`/`MediaQuery`/`GridView` breakpoints** — not fixed pixel assumptions.
- **Custom layout via `CustomMultiChildLayout`/`Stack` with `Positioned` only when the box model falls short.**

---

## 4. Lists & Navigation

- **`ListView.builder` (lazy) over `ListView(children: [...])` for any non-trivial list**; `itemCount` + delegate:

```dart
ListView.builder(
  itemCount: users.length,
  itemBuilder: (context, i) => UserCard(user: users[i]),
)
```

- **`Navigator.push` with named routes or `go_router` for deep links** — `MaterialPageRoute` for transactional screens, `go_router` for URL-mappable navigation.
- **Route state via the router's path** (`go_router` states), not opaque pops — deep-linkable, restorable.
- **`Hero`/transitions sparingly and centrally** — animations that fight are worse than none.
- **Key by stable identity** — `key: ValueKey(user.id)` in lists; it is the reconciliation contract.

---

## 5. Theming & Styling

- **All design tokens live in `ThemeData`/`ColorScheme`/`TextTheme`** — components reference themes, never raw color constants:

```dart
Theme.of(context).colorScheme.primary
Theme.of(context).textTheme.titleMedium
```

- **`ColorScheme`/`Material 3` as the baseline; dark mode via `ThemeData(brightness: ...)`** — automatic with `ThemeMode.system`.
- **`ThemeExtension` for brand tokens that aren't Material primitives** (`spacing`, `radii`).
- **`MediaQuery`/`SystemUi` respected for insets/status bar**; keyboard avoidance defaults handled by scaffolds.

---
