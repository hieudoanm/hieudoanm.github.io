# Bruno: 3. Tests

## Scenario

A project is working on **3. tests** for Bruno. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Assertions live in the request file's test script,** so each request is self-checking and the suite is the collection.
- **Assert on status, content type, and schema, not just a 200.** A 200 with an error body is the classic false pass, and it is the single most valuable assertion to add first.
- **Use schema validation** so a shape change fails loudly instead of silently passing a `status === 200` check.
- **Chain dependent requests deliberately** — create, read the id, update, delete — and clean up so a failed assertion does not leak data.
- **Include negative cases.** A suite of happy paths is documentation.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Tests** section of [SKILL.md](../SKILL.md).
