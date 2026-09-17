# Implementation notes

Focused reference for **flutter-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
