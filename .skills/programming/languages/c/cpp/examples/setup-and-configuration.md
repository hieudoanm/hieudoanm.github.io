# C++ Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Exceptions for failures and a deliberate no-exceptions policy** — pick one per project (embedded/lifetime-critical may go `-fno-exceptions`), write it down, apply it consistently:
- **Expected-domain outcomes use `std::optional`/`std::expected`/`std::variant`**, not exceptions for "not found".
- **Throw the right type** — `std::out_of_range`, `std::invalid_argument`, custom domain errors with a message and a category.
- **Catch narrowly, rethrow correctly** — `catch (const SqlError&)` at the DB boundary, `catch (...) { std::rethrow_exception(...); }` (never `throw ex;`) in wrappers.

## Example

```cpp
std::optional<User> find(uint64_t id);          // expected miss: no throw
void save(const User& u);                       // failure: throws domain error
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for cpp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
