# Flutter Best Practices: 9. Performance

## Source guidance

This example applies the **9. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Profile before optimizing** — `flutter run --profile` + DevTools; most "performance" is constraint/scroll/rebuild fixes first.
- **`const` reducer discipline + `ListView.builder`** avoid rebuild storms — the two biggest wins.
- **`RepaintBoundary` for expensive isolated paints**; never for the whole screen.
- **Image handling** — `cachedNetworkImage`, decode at rendered size, `ResizeImage` for in-memory savings.
- **`AnimatedBuilder` over whole-tree animations**; scope rebuilds to the animating subtree.

## Example

A team applying **9. Performance** to a Flutter Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****Profile before optimizing** — `flutter run --profile` + DevTools; most "performance" is constraint/scroll/rebuild fixes first.**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for flutter-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
