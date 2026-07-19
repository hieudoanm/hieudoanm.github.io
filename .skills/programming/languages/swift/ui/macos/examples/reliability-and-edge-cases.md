# macOS Development: 9. Performance & Concurrency

## Scenario

A project is working on **9. performance & concurrency** for macOS Development. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Mark the app and UI models `@MainActor`.** SwiftUI bodies are main-actor isolated; annotating them explicitly avoids isolation churn.
- **Move I/O, parsing, and file walks off the main actor** into an actor or a detached task with `Sendable` inputs.
- **Long lists in a resizable window must be lazy**, and images downsampled to display size — a Mac display makes the memory bug far more visible than a phone.
- **Profile with Instruments on real hardware.** A Mac app runs on the user's fastest machine, so jank reads as unpolished rather than fatal.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **9. Performance & Concurrency** section of [SKILL.md](../SKILL.md).
