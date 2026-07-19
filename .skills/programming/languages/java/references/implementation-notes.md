# Implementation notes

Focused reference for **java-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Fail fast with `Objects.requireNonNull`/`require` guards** before doing work; `assert` only for programmer invariants.

---

## 6. Concurrency & Virtual Threads

- **Prefer the executor abstraction over raw `Thread`** — submit work to an executor; never `new Thread(...).start()` in product code.
- **Virtual threads (Java 21) for IO-bound concurrency** — `Executors.newVirtualThreadPerTaskExecutor()` makes thread-per-task scale; virtual threads are cheap, so model work as _per-task_ instead of shared-pool choreography:

```java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> fetch(url1));
    executor.submit(() -> fetch(url2));
}
```

- **Structured Concurrency for scoped fan-out** — `StructuredTaskScope` ties subtask lifetimes to the enclosing scope and propagates cancellation like a coroutine scope:

```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<T> a = scope.fork(::loadUsers);
    Future<T> b = scope.fork(::loadPosts);
    scope.join();
    return combine(a.resultNow(), b.resultNow());
}
```

- **Share state via immutable values and proper visibility** — `volatile` for flags, `Atomic*` for counters, thread-safe collections (`ConcurrentHashMap`) — never hand-rolled `synchronized` blocks around ad-hoc state.
- **Don't hold locks across I/O or long computation** — lock granularity and ordering are the top deadlock sources; prefer per-item concurrent structures.
- **Prefer `CompletableFuture` composition over chained callbacks** (`.thenApply`/`.thenCompose`) where async pipelines are needed; watch that you handle exception paths — `.exceptionally` — explicitly.

---

## 7. Composition over Inheritance

- **`interface` over abstract class for extension points** — an interface defines a capability; a class is a single implementation:

```java
public interface Repository {
    Optional<User> findById(long id);
}
```

- **Prefer composition and delegation** — wrap a collaborator responsibly rather than subclassing to reuse; `decorator`, `adapter`, `facade` over deep class trees.
- **Prefer `final` classes by default; `instanceof` pattern matching now replaces most casts** — inheritance you don't design is inheritance you inherit for free; sealed/generics/DI cover the intended extension points.
- **Avoid mutable static state (static singletons, mutable `static` fields)** — inject via constructor polymorphism; static holders make tests order-dependent and hide dependencies.
- **Generics over raw types** — never raw `List`; `List<String>` everywhere, and `? extends T`/`? super T` only at the boundaries that need them.

---

## 8. Testing
