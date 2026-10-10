# Insomnia: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Insomnia. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Git sync enabled at the workspace level, pointing at a committed folder
- [ ] Environment files committed with placeholders; secrets excluded
- [ ] No token or secret in any committed environment or request
- [ ] Design resources created for a greenfield API, or OpenAPI imported
- [ ] Generated requests not hand-edited without updating the design
- [ ] Mock definitions committed if a consumer depends on them
- [ ] Every request asserts status, content type, and schema

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
