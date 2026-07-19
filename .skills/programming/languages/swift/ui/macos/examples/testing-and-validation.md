# macOS Development: 10. Testing

## Scenario

A project is working on **10. testing** for macOS Development. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Unit-test models and services** with fakes for file and network seams; keep it off the main actor.
- **Use XCUITest for menus, commands, and window lifecycle** — menu enablement and `openWindow` behavior cannot be verified any other way.
- **Test the sandbox path**, not just the unsandboxed one: bookmark creation, entitlement-gated folders, and cancel-on-panel.
- **Test keyboard-only flows** end to end; it is the primary input on this platform.
- **Previews still work** via `#Preview`, and a `Settings` scene deserves its own preview since it is easy to break.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **10. Testing** section of [SKILL.md](../SKILL.md).
