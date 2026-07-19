# Jasmine Best Practices: 4. Setup & Teardown

## Source guidance

This example applies the **4. Setup & Teardown** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`beforeEach` builds fresh state per `it`; `afterEach` resets/restores:**
- **`beforeAll` only for truly shared heavy setup** — shared mutable state causes test orderings.
- **`jasmine.clock()` for time-based logic (`install`, `tick`, `uninstall`).**

## Example

```js
beforeEach(() => { subject = new Cart(seedItems()); });
afterEach(() => { jasmine.clock().uninstall(); });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for jasmine-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
