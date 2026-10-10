# Review checklist

Focused reference for **flutter-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
