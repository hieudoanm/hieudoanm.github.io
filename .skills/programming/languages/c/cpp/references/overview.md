# Overview

Focused reference for **cpp-best-practices**, excerpted from [SKILL.md](../../SKILL.md). The skill file remains the canonical guide.

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
