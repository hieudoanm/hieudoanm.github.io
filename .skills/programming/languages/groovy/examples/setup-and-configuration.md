# Groovy Best Practices: 2. Closures & Collections

## Source guidance

This example applies the **2. Closures & Collections** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Closures as first-class behavior — maps/lists sugar over verbose Java:**
- **GDK iteration (`each`/`collect`/`findAll`/`groupBy`) over index loops.**
- **`it` is implicit param — name it for clarity in big closures (`{ user -> ... }`).**
- **Be cautious with `==` (Groovy equals) vs `is()/toString()` semantics when interfacing Java.**

## Example

```groovy
def names = ["ada", "grace"].collect { it.capitalize() }
def byRole = [ "admin": 1, "user": 2 ]
byRole.each { k, v -> println "$k -> $v" }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for groovy-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
