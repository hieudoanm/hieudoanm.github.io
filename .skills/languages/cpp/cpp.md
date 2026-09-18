---
name: cpp-best-practices
description: Best practices for writing C++ — the language conventions for modern C++ (C++20/23) code. Use when writing, structuring, or reviewing C++ — covers RAII, ownership, move semantics, const correctness, error handling, templates, STL, concurrency, and tooling.
---

# C++ Best Practices

Modern C++ (C++20/23) is C with type safety, RAII, move semantics, and the STL bolted on — and the discipline is the product. Practical C++ leans on **RAII for every resource, ownership expressed by types** (`unique_ptr`/`shared_ptr`/references), **value semantics with deliberate move paths**, **exceptions for genuine failures (or a single no-exceptions policy)**, and **`const` correctness enforced by the compiler**. The standard library is a toolkit boundary, not a toybox: prefer it over hand-rolled containers and manual loops.

---

## 1. RAII & Resource Ownership

- **Every resource is owned by an object whose destructor releases it** — files (`fstream`, `unique_ptr<FILE>`), mutexes (`std::scoped_lock`), memory (`unique_ptr`):

```cpp
void process(const fs::path& p) {
    std::ifstream in(p);              // RAII: closes on scope exit
    // cannot leak: no manual close, no naked new
}
```

- **No raw `new`/`delete` in application code** — `make_unique`/`make_shared` or stack objects.
- **`unique_ptr` expresses exclusive ownership; `shared_ptr` expresses shared ownership with explicit co-ownership** — raw pointers/references only for non-owning views into someone else's lifetime.
- **Prefer `std::optional`/`std::variant` over heap-allocated fits** — a nullable possession is a bug source.
- **One owner per resource** — transfer via `std::move`; never hand the same ownership to two owners.
- **Containers and algorithms own their memory** — rely on `std::vector`, `std::string` etc. to manage buffers; avoid `malloc`-managed PODs unless a hot C interop boundary demands it.

---

## 2. Move Semantics & Value Types

- **`std::move` = cast to rvalue; use it only to enable move into a new owner** — not to "optimize" a copy that isn't there:

```cpp
std::vector<int> build();
auto v = build();                    // NRVO/move, often zero-copy
std::vector<int> w = std::move(v);   // v is a valid, unspecified state — don't read it
```

- **`&&` (rvalue reference) members are for move-construct/assign**, not a style flourish; define Rule-of-5 compilers or use the defaults.
- **Prefer value parameters + move** over `const&`+copy juggling for by-value wants:

```cpp
void setName(std::string name) { name_ = std::move(name); }
```

- **Return by value, don't return by `out` parameter** — RVO/NRVO makes it cheap and readable.
- **Understand and enable `= default` Rule-of-5** for classes owning resources; or delete the copies (`= delete`) when shared ownership is excluded.

---

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

## 6. STL & Containers

- **Know the container cost model and pick by use** — `vector` (packed, random access), `map`/`set` (ordered node), `unordered_map` (hash) with bench-driven choice:

```cpp
std::vector<double> xs(n);       // contiguous, cache-friendly
std::unordered_map<std::string, int> index;   // only if lookup > iteration
```

- **Prefer `std::span` over `(T*, size_t)` interfaces** — bounded, zero-cost views.
- **`std::ranges` over raw loops where it reads** — `ranges::sort(v, {}, &User::score)` over manual index loops; keep transformers lazy.
- **Reserve before bulk insert** (`reserve`/`shrink_to_fit` deliberately); avoid `emplace` abuse in favor of readable `push_back` where types match.
- **`std::string_view` propagation** — passing views across a function boundary to hold raw memory means documenting the source buffer lifetime.
- **Never hold iterators across reallocation** — iterator invalidation is the most common class of subtle UB; reacquire after insertions.

---

## 7. Templates & Generic Code

- **Concepts over SFINAE for readability** — `requires` documents the interface at the signature:

```cpp
template <typename T>
concept Sortable = requires(T a, T b) { { a < b } -> std::convertible_to<bool>; };

void sort_all(Sortable auto& c) { std::ranges::sort(c); }
```

- **Constrain templates at the interface** — unconstrained `template <typename T> void f(T)` accepts everything and errors inside.
- **Prefer `std::type_traits`/feature detection over `void_t` gymnastics** unless locked to older standards.
- **Compile-time speed-first** — keep templates in headers small; `extern template` explicit instantiation for heavy ones if the TU count warrants.
- **`constexpr` functions for compile-time work** — but validate the result at runtime where correctness matters more than the savings.

---

## 8. Concurrency

- **Threads and tasks via `std::jthread`/`std::async`/`std::thread`**, not hand-rolled OS primitives:

```cpp
std::jthread worker([&]{ /* ... */ });     // joins on scope exit
std::scoped_lock lk(mutex_);               // RAII lock, exception-safe
```

- **Lock with `std::scoped_lock`/`std::unique_lock` only for short critical sections** — never hold a lock across I/O (serializes + invites deadlock).
- **Atomic `std::atomic<T>` for single-word counters/flags**; `std::mutex` for compound state.
- **Communicate with `condition_variable`/channels/queues, never busy-wait** — `std::condition_variable` + predicate, not sleep-loops.
- **`std::optional`-style shared state or immutable data instead of mutable shared globals** — the cheapest thread-safety is not sharing.

---

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
