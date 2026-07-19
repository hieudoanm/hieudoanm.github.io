# Emotion: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Install and configure Emotion (`@emotion/react`/`@emotion/styled` + optional babel plugin).
- [ ] Build components with `styled`/`css`.
- [ ] Add `<Global>` for base styles when needed.
- [ ] Wire `<ThemeProvider>` + theme object.
- [ ] Set up SSR extraction or verify runtime-injection approach.
- [ ] Verify SSR/hydration stability.

## Example

A team applying **Quick-Start Checklist** to a Emotion project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Install and configure Emotion (`@emotion/react`/`@emotion/styled` + optional babel plugin).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for emotion.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
