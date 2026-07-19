# Workflow notes

Focused reference for **cpp-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

## 3. Const Correctness

- **`const` on anything you don't mutate** — parameter, variable, member function (`std::string_view` params over `const std::string&` where a subscription of a sequence):

```cpp
size_t count() const noexcept;                 // member promise: no mutation
std::string slash_join(std::string_view a, std::string_view b);
```

- **`const` reference/member means "I won't mutate"—let the compiler guarantee it.**
- **Return `const`-qualified references to members, or copies, never non-const member refs** (aliasing escape).
- **Use `const` iterators/`std::as_const` at read-only paths**; let `-Werror` + `-Wconversion` treat violations as failures.
- **`constexpr`/`constinit` for compile-time-known data** — prefer over mutable globals.

---

## 4. Error Handling

- **Exceptions for failures and a deliberate no-exceptions policy** — pick one per project (embedded/lifetime-critical may go `-fno-exceptions`), write it down, apply it consistently:

```cpp
std::optional<User> find(uint64_t id);          // expected miss: no throw
void save(const User& u);                       // failure: throws domain error
```

- **Expected-domain outcomes use `std::optional`/`std::expected`/`std::variant`**, not exceptions for "not found".
- **Throw the right type** — `std::out_of_range`, `std::invalid_argument`, custom domain errors with a message and a category.
- **Catch narrowly, rethrow correctly** — `catch (const SqlError&)` at the DB boundary, `catch (...) { std::rethrow_exception(...); }` (never `throw ex;`) in wrappers.
- **No exception-swallowing** — an empty catch is a production bug; log and rethrow or convert with the cause attached.
- **RAII + exceptions compose** — resource release is exception-safe by construction; keep critical-section/transaction lifetimes in scoped guards so unwinding cleans up.

---

## 5. Types & Interfaces

- **Prefer strong types over bare primitives** for units and IDs — a `UserId`, `Amount`, `Temperature` (with `operator` semantics) is a contract:

```cpp
struct UserId { uint64_t value; };              // not raw uint64_t everywhere
explicit operator uint64_t() const;
```

- **`std::string_view` over `const std::string&` for read-only views** (cheap substring, accepts literals); mind lifetime and null-termination across API boundaries.
- **`auto` where the type is obvious, explicit where it isn't** — never `auto` a brace-init list (`auto x = {1,2,3};`) or a `.data()` result that changes meaning.
- **`struct`/`class` distinction by intent** — a `struct` with public fields for POD/aggregate; `class` for invariants with private state.
- **Non-member functions for operators/algos** (`free operator<`, `std::sort` with comparator) over class-embedded everything.
- **`[[nodiscard]]` on fallible/valuable signatures** — the compiler guards ignored results.

---
