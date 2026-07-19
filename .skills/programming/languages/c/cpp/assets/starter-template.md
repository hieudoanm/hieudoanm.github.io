# C++ Best Practices: Starter Template

A reusable starting point derived from the **10. Testing** section of [C++ Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```cpp
TEST_CASE("User_ValidName_Parses") {
    auto u = parse_user("ada@x.io");
    REQUIRE(u.has_value());
    CHECK(u->name == "ada");
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
