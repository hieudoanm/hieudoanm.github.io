# Garph: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `npm i garph graphql` (and `graphql-yoga` for the server).
- [ ] Define schema via `g.type()`/`g.input()`/`g.enum()` with nullability.
- [ ] Build resolver map aligned with the schema structure.
- [ ] Execute with `g.resolve(schema, resolvers)` → pass to Yoga.
- [ ] Run `tsc --noEmit` to check inferred resolver types.
- [ ] Add Yoga plugins: context/auth, error handling, subscriptions.

## Example

A team applying **Quick-Start Checklist** to a Garph project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `npm i garph graphql` (and `graphql-yoga` for the server).**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for garph.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
