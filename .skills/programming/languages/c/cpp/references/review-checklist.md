# Review checklist

Focused reference for **cpp-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

## 9. Build, Tooling & Portability

- **Modern standard + strict warnings + sanitizers in CI**:

```bash
c++ -std=c++20 -Wall -Wextra -Wpedantic -Wconversion -Werror \
   -fsanitize=address,undefined -g          # dev/CI
```

- **CMake as the build system of record**; `-DCMAKE_CXX_STANDARD=20` pinned, `-fno-exceptions` only with a documented policy.
- **`clang-tidy`/`cppcheck` as static gates**; keep the run clean (no suppression rash).
- **Test under ASan/UBSan/TSan (separately)** — heap/undefined/thread behavior get separate runs.
- **Keep dependency surface small** — prefer STL over pulling in a big headers for a trivial job; vendored `better-*` only when the STL genuinely lacks it.

---

## 10. Testing

- **Test the contract at the boundary** — valid/invalid/boundary/empty/error cases, table-driven:

```cpp
TEST_CASE("User_ValidName_Parses") {
    auto u = parse_user("ada@x.io");
    REQUIRE(u.has_value());
    CHECK(u->name == "ada");
}
```

- **Deterministic tests** — seeded RNGs, no wall-clock dependence, no ambient locale/env surprises.
- **Run the suite under sanitizers** — a passing test without ASan is not a memory-safety pass.
- **Fuzz/property-style cases** for parsers and binary boundaries; keep the seed corpus checked in.
- **Name tests as behavior** — `Method_WhenCondition_ThenResult` or `Given_X_Expect_Y`.

---

## General Rules of Thumb

- **RAII owns everything** — no naked `new`/`delete`; resources release on scope exit.
- **Ownership is typed** — `unique_ptr` exclusive, `shared_ptr` shared-by-meaning, references/views non-owning.
- **Value semantics first, move deliberately** — copies are a choice, moves are a choice, both documented.
- **`const` by default** — the compiler is the cheapest reviewer.
- **STL over hand-rolled** — containers, algorithms, and ranges from the standard library.
- **Exceptions for failures, `optional`/`expected` for expected outcomes** — one policy per project.
- **Sanitizers + analyzers + `-Werror` are part of "done"** — like the test suite.

---

## Quick-Start Checklist

- [ ] RAII for all resources; no raw `new`/`delete`; `make_unique`/`make_shared`
- [ ] Ownership expressed by types (`unique_ptr`/`shared_ptr`/references/views)
- [ ] Value parameters + `std::move`; Rule-of-5 defaults or `= delete`
- [ ] `const` on parameters/members/methods; `constexpr` for compile-time data
- [ ] Exceptions for failures; `std::optional`/`std::expected` for expected misses
- [ ] `std::string_view`/`std::span` at boundaries; strong types for IDs/units
- [ ] STL containers chosen by cost model; iterators never held across realloc
- [ ] Concepts over SFINAE; constrained templates; `[[nodiscard]]` on valuable returns
- [ ] `std::jthread`/`std::scoped_lock`/`std::atomic`; no locking across I/O
- [ ] `-std=c++20 -Wall -Wextra -Wconversion -Werror` + ASan/UBSan/TSan in CI
- [ ] Contract tests with table-driven cases; deterministic and sanitizer-run
