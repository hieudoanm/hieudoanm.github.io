# Apollo Client Best Practices: 4. Fragments & Schemas

## Source guidance

This example applies the **4. Fragments & Schemas** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Reusable `gql` fragments colocated with the component; shared shape contract:**
- **Parts reused across query/mutation — no duplicated inline fragments.**
- **`PossibleTypes`/schema introspection for cache policy (`typePolicies` on id/simple fields).**

## Example

```graphql
fragment OrderFields on Order {
  id
  amount
  status
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apollo-client-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
