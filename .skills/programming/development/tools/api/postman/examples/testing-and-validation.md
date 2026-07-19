# Postman: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Postman. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Collection exported to JSON and committed, one per bounded context
- [ ] Environment templates committed; real values gitignored
- [ ] No token or secret in any committed environment file
- [ ] Variable scopes reviewed; no shadowed names
- [ ] Token-refresh pre-request script defined once, not per request
- [ ] Every request asserts status, content type, and JSON schema
- [ ] Negative cases present in each resource folder

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
