---
name: flutter-best-practices
description: Best practices for building Flutter apps — the framework conventions for declarative UIs on iOS/Android/web/desktop. Use when writing, structuring, or reviewing Flutter — covers widgets, state management, layout, navigation, theming, async/data, testing, performance, and tooling.
---

# Flutter Best Practices

Flutter builds UI from **widgets**, and state is the texture of every screen. Practical Flutter leans on **small stateless leaves, predictable state ownership** (`StatefulWidget` + inherited/`Provider`/`Riverpod` scopes), and **`BuildContext`-bounded async** so errors close the UI instead of crash it. The `flutter analyze` gate plus a `flutter test` suite round out the review ritual.

---

## 1. Widget Composition

- **Compose small widgets over big ones** — extract `const`-capable leaves; a `build()` under ~40 lines with a single responsibility:

```dart
class UserAvatar extends StatelessWidget {
  const UserAvatar({super.key, required this.user});
  final User user;
  @override
  Widget build(BuildContext context) => CircleAvatar(child: Text(user.initials));
}
```

- **Prefer `StatelessWidget` default; `StatefulWidget` only when state truly lives in the view** — hoist domain state out.
- **`const` constructors everywhere statically possible** — cheap rebuilds, `identical`-favored comparisons.
- **Extract behaviors into shared widgets** (`Card`, `EmptyState`, `ErrorView`) rather than repeating stacks of primitives.
- **Name widgets by their contract** (`UserCard`, `LoadingState`, `ErrorView`) so the tree reads as a screen map.

---

## 2. State Management

- **Pick scope by need** — local ephemeral (`setState`), shareable (`ChangeNotifier`/`Provider`/`Riverpod`), app-level (scoped providers), server state (repos + streams):

```dart
class Counter extends ChangeNotifier {
  int _value = 0;
  int get value => _value;
  void increment() { _value++; notifyListeners(); }
}
```

- **Own the lifecycle precisely** — `ListenableBuilder`/`context.watch<T>` subscribe; avoid leaking subscriptions with `addListener` without `removeListener`.
- **`BuildContext` reads (`Provider.of`) declared at the top of `build`**, never inside nested callbacks/builders.
- **No global/singleton mutable app state** — explicit provider scopes per feature; tests inject fakes at the boundary.
- **Keep views dumb** — a widget renders state and forwards intent to a controller/repo; business logic lives in services.

---

## 3. Layout

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

## 6. Async, Data & Lifecycle

- **`FutureBuilder`/`StreamBuilder` bounded by the widget lifecycle**; cancel/subscribe correctness over imperatives:

```dart
FutureBuilder<User>(
  future: userFuture,
  builder: (context, snap) => switch (snap) {
    AsyncSnapshot(:final data?) => UserView(user: data),
    AsyncSnapshot(hasError: true) => ErrorView(error: snap.error!),
    _ => const LoadingBar(),
  },
)
```

- **Toast/stream/socket subscriptions cancelled in `dispose()`** — a leaked subscription keeps dead screens alive.
- **Errors render in the subtree that owns them** — `ErrorView` + retry, never crashing the whole tree.
- **`Isolate`/`compute` for parsing/CPU-heavy work** — JSON decoding off the main isolate.
- **`mounted` check before using `BuildContext` after async gaps** — guard every post-await context use. Membership-safe guards on widget state.

---

## 7. Forms & Input

- **`Form` + `TextFormField` + `TextEditingController` with `validator` per field** — validation contracts declared where the field is defined:

```dart
TextFormField(
  controller: email,
  validator: (v) => (v == null || !isEmail(v)) ? 'enter a valid email' : null,
)
```

- **Controllers disposed** (`dispose()` clears `TextEditingController`/`FocusNode`) or leak.
- **`AutovalidateMode` explicit** — `onUserInteraction` after first submit, never constant nagging.
- **Submit semantics** — `textInputAction`, `onFieldSubmitted`, `FormState.validate()` gate the submit path.

---

## 8. Testing

- **Unit-test behavior via services/repos** — contracts (success/failure/empty/cancellation) not widget internals.
- **`WidgetTester` for widget tests** — pump, interact, assert rendered state:

```dart
testWidgets('shows error on failed load', (tester) async {
  await tester.pumpWidget(App(fakeRepo(fail: true)));
  await tester.pumpAndSettle();
  expect(find.text('error'), findsOneWidget);
});
```

- **`IntegrationTest` for critical user journeys on device/CI** — main flows, not every screen.
- **Fakes at injection boundaries** (`Provider` overrides, `Repo` fakes); never mock the framework.
- **Deterministic time** — no real sleeps; pump with explicit durations.

---

## 9. Performance

- **Profile before optimizing** — `flutter run --profile` + DevTools; most "performance" is constraint/scroll/rebuild fixes first.
- **`const` reducer discipline + `ListView.builder`** avoid rebuild storms — the two biggest wins.
- **`RepaintBoundary` for expensive isolated paints**; never for the whole screen.
- **Image handling** — `cachedNetworkImage`, decode at rendered size, `ResizeImage` for in-memory savings.
- **`AnimatedBuilder` over whole-tree animations**; scope rebuilds to the animating subtree.

---

## 10. Tooling & Release

- **`flutter analyze` clean as CI gate; `dart format` enforced.**
- **`flutter test` in CI on the compile benchmarks; integration tests in `integration_test/`.**
- **Pinned Flutter SDK** (`pubspec.yaml` environment + committed lockfile).
- **Platform configs reviewed** — iOS entitlements, Android permissions, macOS sandbox; release builds use `--release` + tree-shaking.
- **Localization (l10n) files centralized** (`flutter gen-l10n`), not inline strings for user-visible text.

---

## General Rules of Thumb

- **Small const leaves compose the screen.**
- **State ownership is explicit and scoped — never global mutable app state.**
- **Async completes and closes: streams cancel, futures bound, `mounted` guarded.**
- **Themes own all visual tokens.**
- **`flutter analyze` + `flutter test` are part of "done".**

---

## Quick-Start Checklist

- [ ] Const small widgets; `StatelessWidget` default; names read as a screen map
- [ ] State scope matches need (setState/Provider/Riverpod); views stay dumb
- [ ] Stack layouts with spacing; `Expanded`/`Flexible`; no default overflows
- [ ] `ListView.builder` for lists; `go_router`/named routes; stable keys
- [ ] All colors/type via `ThemeData`/`ColorScheme`; dark mode supported
- [ ] `FutureBuilder`/`StreamBuilder`; subscriptions cancelled in `dispose()`
- [ ] `mounted` guard after async gaps; errors render in owning subtrees
- [ ] `Form` + validators; controllers disposed
- [ ] Unit/widget/integration tests; provider seams; deterministic pumps
- [ ] `flutter analyze` clean; lazy lists; scoped repaints; profiled images
