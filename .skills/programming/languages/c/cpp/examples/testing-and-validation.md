# C++ Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test the contract at the boundary** — valid/invalid/boundary/empty/error cases, table-driven:
- **Deterministic tests** — seeded RNGs, no wall-clock dependence, no ambient locale/env surprises.
- **Run the suite under sanitizers** — a passing test without ASan is not a memory-safety pass.
- **Fuzz/property-style cases** for parsers and binary boundaries; keep the seed corpus checked in.
- **Name tests as behavior** — `Method_WhenCondition_ThenResult` or `Given_X_Expect_Y`.

## Example

```cpp
TEST_CASE("User_ValidName_Parses") {
    auto u = parse_user("ada@x.io");
    REQUIRE(u.has_value());
    CHECK(u->name == "ada");
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for cpp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
