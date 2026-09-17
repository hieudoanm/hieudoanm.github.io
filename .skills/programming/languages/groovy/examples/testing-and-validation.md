# Groovy Best Practices: 6. Testing & Tooling

## Source guidance

This example applies the **6. Testing & Tooling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Spock (Groovy's native BDD) or JUnit — Spock for expressive `where:` tables:**
- **Gradle `test` task wired; coverage (JaCoCo) gate for the pipeline.**
- **Formatting/static analysis (`codenarc`/`spotbugs`) in CI for the Groovy sources.**

## Example

```groovy
def "sums correctly"() {
  expect:  add(2, 3) == 5
  where:   a = 2; b = 3
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for groovy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
