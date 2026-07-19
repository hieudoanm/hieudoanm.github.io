# Flutter Best Practices: Workflow Checklist

A practical run sheet for applying [Flutter Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Widget Composition: **Compose small widgets over big ones** — extract const-capable leaves; a build() under ~40 lines with a single responsibility:
- [ ] 1. Widget Composition: **Prefer StatelessWidget default; StatefulWidget only when state truly lives in the view** — hoist domain state out
- [ ] 2. State Management: **Pick scope by need** — local ephemeral (setState), shareable (ChangeNotifier/Provider/Riverpod), app-level (scoped providers), server state (repos + streams):
- [ ] 2. State Management: **Own the lifecycle precisely** — ListenableBuilder/context.watch<T> subscribe; avoid leaking subscriptions with addListener without removeListener
- [ ] 3. Layout: **Column/Row/Stack compose the 90% case** — alignment and spacing declared, no hardcoded offsets:
- [ ] 3. Layout: **Expanded/Flexible fill space; Spacer/SizedBox for gap discipline** — never Container(margin:) everywhere for spacing
- [ ] 4. Lists & Navigation: **ListView.builder (lazy) over ListView(children: [...]) for any non-trivial list**; itemCount + delegate:
- [ ] 4. Lists & Navigation: **Navigator.push with named routes or go_router for deep links** — MaterialPageRoute for transactional screens, go_router for URL-mappable navigation
- [ ] 5. Theming & Styling: **All design tokens live in ThemeData/ColorScheme/TextTheme** — components reference themes, never raw color constants:
- [ ] 5. Theming & Styling: **ColorScheme/Material 3 as the baseline; dark mode via ThemeData(brightness: ...)** — automatic with ThemeMode.system

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
