# Bruno: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Bruno. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Collection committed in a dedicated folder, one folder per resource
- [ ] Environment templates committed; populated environments gitignored
- [ ] No token or secret in any committed file
- [ ] Variable scoping narrow: environment over collection over request
- [ ] Auth header reused via the environment, not repeated per file
- [ ] Every request asserts status, content type, and schema
- [ ] Negative cases present in each resource folder

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
