# Flutter Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit-test behavior via services/repos** — contracts (success/failure/empty/cancellation) not widget internals.
- **`WidgetTester` for widget tests** — pump, interact, assert rendered state:
- **`IntegrationTest` for critical user journeys on device/CI** — main flows, not every screen.
- **Fakes at injection boundaries** (`Provider` overrides, `Repo` fakes); never mock the framework.
- **Deterministic time** — no real sleeps; pump with explicit durations.

## Example

```dart
testWidgets('shows error on failed load', (tester) async {
  await tester.pumpWidget(App(fakeRepo(fail: true)));
  await tester.pumpAndSettle();
  expect(find.text('error'), findsOneWidget);
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for flutter-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
