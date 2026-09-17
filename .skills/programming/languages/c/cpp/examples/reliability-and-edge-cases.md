# C++ Best Practices: 8. Concurrency

## Source guidance

This example applies the **8. Concurrency** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Threads and tasks via `std::jthread`/`std::async`/`std::thread`**, not hand-rolled OS primitives:
- **Lock with `std::scoped_lock`/`std::unique_lock` only for short critical sections** — never hold a lock across I/O (serializes + invites deadlock).
- **Atomic `std::atomic<T>` for single-word counters/flags**; `std::mutex` for compound state.
- **Communicate with `condition_variable`/channels/queues, never busy-wait** — `std::condition_variable` + predicate, not sleep-loops.
- **`std::optional`-style shared state or immutable data instead of mutable shared globals** — the cheapest thread-safety is not sharing.

## Example

```cpp
std::jthread worker([&]{ /* ... */ });     // joins on scope exit
std::scoped_lock lk(mutex_);               // RAII lock, exception-safe
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for cpp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
