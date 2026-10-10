# Implementation notes

Focused reference for **cpp-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
