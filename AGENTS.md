# 🤖 Agents

## 📑 Table of Contents

- [🤖 Agents](#-agents)
  - [📑 Table of Contents](#-table-of-contents)
  - [📐 Coding Convention](#-coding-convention)
    - [🐚 Bash](#-bash)
    - [🔷 Go](#-go)
      - [🦾 cobra.go](#-cobrago)
    - [🟣 Kotlin](#-kotlin)
      - [⌨️ cli.kt](#️-clikt)
      - [⚡ Ktor](#-ktor)
    - [🐍 Python](#-python)
      - [🐼 pandas](#-pandas)
    - [🦀 Rust](#-rust)
      - [📋 clap.rs](#-claprs)
      - [🌐 axum](#-axum)
    - [🕊️ Swift](#️-swift)
      - [🏗️ Swift Argument Parser](#️-swift-argument-parser)
    - [🔵 TypeScript](#-typescript)
      - [🧪 Jest](#-jest)
      - [⚛️ React](#️-react)
      - [▲ Next.js](#-nextjs)
      - [🎭 Playwright](#-playwright)
      - [🦖 Docusaurus](#-docusaurus)
  - [📦 Projects](#-projects)

## 📐 Coding Convention

1. `Explicit types > Implicit` — TypeScript types, Rust type annotations, Python type hints. AI agents rely heavily on type information to understand what values flow where. A function signature tells us more than 100 lines of body.
2. `Flat over deeply nested` — Shallow directory trees, short functions, minimal indentation. Deeply nested code (callback hell, 5-level if pyramids) exceeds context windows faster and is harder to trace.
3. `Self-documenting identifiers` — `getUserById(id)` needs no comment; `processData(x)` needs one. Names that describe what and why (not how) are best.
4. `Don't repeat yourself (DRY)` — When the same pattern appears 15 times across files, an AI will sometimes handle 14 of them and miss the 15th. Centralizing logic prevents that.
5. `Small, focused files` — A file with one clear responsibility is easier to read fully, edit precisely, and reason about within context limits.
   - **Functions**: ≤ 30 lines. An AI's effective reasoning degrades past ~2000 tokens (~60 lines). A 30-line cap halves that, keeping the full function visible in context alongside its callers. If you need to scroll to see the whole function, it's too long.
   - **Files**: ≤ 200 lines. Files longer than 200 lines force the AI to work at the edge of its attention window, making it harder to trace data flow between distant sections. If you need to search within a file to find where a variable is defined, the file is too long.
6. `Explicit error handling` — `if (err) return Err(...)` rather than letting failures silently propagate. AI agents need to see error paths to handle them correctly
7. `Test names as documentation` — `test("returns 404 when user not found")` tells us the expected behavior faster than reading the implementation.
8. `Consistent import/module structure` — Group imports by origin (stdlib, third-party, internal). AI agents infer dependency graphs from import blocks without scanning `require`/`import` calls scattered across files.
9. `Prefer pure functions with explicit dependencies` — Accept all inputs as parameters and return all outputs. AI agents reason about data flow without tracking hidden state or global mutation.
   - **No global/singleton state**: Dependencies passed explicitly are visible at the call site. AI agents trace wiring without searching `init()` or service locators.
   - **Return values over side effects**: Functions that mutate arguments or globals hide their impact. AI agents trust return values as the single source of truth.
10. `Use conventional project layouts` — Follow community-standard directory structures (`src/`, `cmd/`, `internal/`, `tests/`). AI agents locate files by convention rather than scanning build configs.

[Back to Table of Contents](#-table-of-contents)

---

### 🐚 [Bash][bash]

1. Use `set -euo pipefail` at the start of every script — Catches errors early, undefined variables, and pipe failures. AI agents see the safety contract from the first line instead of guessing error handling.
2. Prefer `[[ ]]` over `[ ]` for conditionals — `[[ ]]` avoids word splitting and has fewer surprises. AI agents parse the more reliable syntax without reasoning about edge cases.
3. Use `$(...)` over backticks for command substitution — Backticks nest poorly and are visually ambiguous. AI agents see the intent clearly from the `$()` delimiters.
4. Quote all variable expansions — `"$var"` and `"${array[@]}"` prevent word splitting and globbing. AI agents trust that filenames with spaces won't break the logic.
5. Use `local` in function-scoped variables — Prevents leaking state between functions. AI agents reason about variable scope from the declaration keyword.
6. Prefer `printf` over `echo` — `printf` is consistent across platforms and supports format strings. AI agents see the exact output format without scanning for `echo` flags.
7. Use `read -r` for parsing input — `-r` prevents backslash interpretation. AI agents trust that input won't be accidentally mangled.
8. Handle errors with `trap` — `trap cleanup EXIT ERR` ensures cleanup on failure. AI agents see teardown logic in one place rather than checking exit points.
9. Prefer `mapfile` / `readarray` for reading files into arrays — Avoids `while read` subshell pitfalls. AI agents see the full data captured without tracking pipeline scoping.
10. Use `shellcheck` as a lint gate — Run `shellcheck` in CI with `--severity=style`. AI agents produce fewer shellcheck warnings when rules are standardised.

[Back to Table of Contents](#-table-of-contents)

---

### 🔷 [Go][go]

1. Use `error` as the last return value — Functions that can fail should return `error` as the final return value. AI agents infer failure paths from signatures.
2. Handle errors explicitly, never ignore — Check every error return. Use `if err != nil { return ... }` rather than `\_ =`. Never use `must`-style panics outside `init`/`main`.
3. Prefer `var` zero-initialization over `:=` for zero values — `var s string` is clearer than `s := ""`. Use `:=` only when the value is non-zero or the type is inferred from a non-trivial expression.
4. Use `context.Context` as the first parameter — Pass `ctx` as the first arg in functions that do I/O, blocking calls, or propagate deadlines/cancellation.
5. Avoid global state — Pass dependencies explicitly via struct fields or function parameters rather than using `init()` or package-level vars. Makes testing and reasoning easier.
6. Favour `go fmt` compliance — Always run `go fmt` before committing. Consistent formatting reduces noise for AI agents reading diffs.
7. Prefer table-driven tests — Use `tests []struct{...}` slices with `t.Run` for testing multiple cases. Improves readability and coverage visibility.
8. Use `net/http` middleware pattern — Compose handlers with `func(next http.Handler) http.Handler` for clean separation of concerns (logging, auth, tracing).
9. Prefer `sync` primitives over channels for state — Use `sync.Mutex`/`sync.RWMutex` for protecting shared state; use channels for communication/coordination.
10. Return early, avoid deep nesting — Guard clauses (`if err != nil { return }`) keep the happy path flat and readable.

[Back to Table of Content](#-table-of-contents)

---

#### 🦾 [cobra.go][cobra.go]

1. Use `RunE` over `Run` for commands — `RunE` returns an error that Cobra prints and exits with code 1. AI agents see failure paths in the signature instead of guessing from `Run`'s void return.
2. Nest subcommands via `AddCommand` — `rootCmd.AddCommand(subCmd)` builds a parent-child tree. AI agents infer CLI structure from command registration without parsing help strings.
3. Use persistent flags for shared options — `rootCmd.PersistentFlags().StringVarP(...)` propagates to all subcommands. Avoid duplicating flag definitions across commands that share them.
4. Prefer required args over manual checks — Use `Args: cobra.ExactArgs(1)` instead of `if len(args) == 0 { ... }`. AI agents see the contract from the struct field rather than scanning for runtime guards.
5. Keep `RunE` functions thin — Delegate to business logic in a separate function/service. A `RunE` body over ~10 lines is a sign the command has too much responsibility.
6. Use `ValidArgs` + `Args: cobra.OnlyValidArgs` for closed sets — Provides shell completion and validation in one place. AI agents see valid inputs as data, not conditional logic.
7. Register `completion` command in `init()` — `rootCmd.AddCommand(cmd.GenCompletionCmd("completion", true))` ships shell completion. AI agents can discover the command tree programmatically.
8. Use `PreRunE` for shared setup — Validate flags or establish connections in `PreRunE` before `RunE` executes. AI agents trace lifecycle phases by name instead of scanning for setup blocks.
9. Favour `StringVarP` / `IntVarP` with short flags — `--verbose, -v` binds a flag to a variable at init time. AI agents see both long and short forms in one call instead of separate declarations.
10. Group commands with `cmd.Groups` in v2 — Organize subcommands into logical groups for `--help` output. AI agents parse the group structure to understand command relationships.

[Back to Table of Content](#-table-of-contents)

---

### 🟣 [Kotlin][kotlin]

1. Prefer `val` over `var` — Use immutable `val` by default; only use `var` when mutation is necessary. Immutability makes data flow easier for AI agents to trace.
2. Use `data class` for model objects — They get `equals()`, `hashCode()`, `toString()`, `copy()`, and destructuring for free, which reduces boilerplate and improves clarity.
3. Use `sealed class` / `sealed interface` for restricted hierarchies — Encodes exhaustive when-branches at compile time. AI agents can reason about all possible states without scanning runtime checks.
4. Prefer extension functions over utility classes — `fun String.isEmail(): Boolean` is discoverable and composable. Avoid static-heavy `StringUtils`-style helpers.
5. Use `Flow` for reactive streams, not `Channel` — `Flow` is cold, structured-concurrent, and testable with `kotlinx.coroutines.test`. Use `Channel` only for hot streams or bridging callback-based APIs.
6. Favour `when` over nested `if/else` — `when` is exhaustive (with sealed classes), reads linearly, and has no accidental fall-through. AI agents parse it more reliably than deeply nested conditionals.
7. Use `require()` and `check()` for preconditions — `require(amount > 0)` at function entry signals invariants explicitly. AI agents see the contract without reading test code.
8. Prefer constructor injection with `by` delegation — `class Service(repo: Repository by RepoImpl())` makes dependencies explicit while delegating implementation. Avoid reflection-heavy DI frameworks where possible.
9. Keep coroutine scopes explicit — Pass `coroutineScope` or `viewModelScope` rather than using `GlobalScope`. Structured concurrency lets AI agents reason about lifecycle and cancellation.
10. Use `buildList`, `buildMap`, `buildString` builders — They optimize memory and make construction intent obvious. Prefer them over mutable accumulators that scatter reads/writes.

[Back to Table of Content](#-table-of-contents)

---

#### ⌨️ [cli.kt][cli.kt]

1. Use `data class` for command arguments — `data class Config(val name: String by argument())` bundles CLI parameters into typed objects. AI agents see the full input schema without parsing help text.
2. Prefer `subcommands` over manual dispatch — `subcommands(Start, Stop)` registers a subcommand tree. AI agents infer command hierarchy from the declaration instead of scanning `when` blocks.
3. Use `option()` with `--help` descriptions — `val verbose by option("--verbose", help = "Enable verbose output")`. Self-documenting options let AI agents understand intent without reading downstream usage.
4. Use `int()`, `long()`, `double()`for typed options — `val port by int().default(8080)` enforces types at the boundary. AI agents infer the expected type from the parser chain.
5. Prefer `group()` for mutually exclusive options — `group { "format" { "json" } "yaml" }` encodes exclusivity in the DSL. AI agents see the constraint without tracing runtime validation.
6. Use `require()` for preconditions — `require(name.isNotBlank())` in `run` fails fast with user-friendly messages. AI agents see invariants as assertions, not buried logic.
7. Keep `run` thin — Delegate to business logic after parsing. A `run` body over ~10 lines suggests the command mixes parsing with domain logic.
8. Use `envvar` for sensitive defaults — `val token by option().envvar("API_TOKEN")` reads from environment. AI agents see the config source without guessing fallback chains.
9. Prefer `confirmation()` for destructive actions — `confirmation("Are you sure?")` adds a safety prompt. AI agents infer which commands are destructive from the confirmation call.
10. Use `VersionOption` for version flags — `versionOption("1.0.0")` generates `--version` consistently. AI agents discover the version contract from a single call instead of scanning for println.

[Back to Table of Content](#-table-of-contents)

---

#### ⚡ [Ktor][ktor]

1. Use `install` for plugins — `install(ContentNegotiation)` registers serialization, compression, auth, etc. AI agents infer feature configuration from `install` calls without tracing plugin internals.
2. Prefer `routed` server over `embeddedServer` with raw handlers — `routed { get("/") { ... } }` creates a structured routing tree. AI agents parse endpoint hierarchy from route declarations.
3. Use `StatusPages` for error handling — `install(StatusPages) { exception { ... } }` centralizes error responses. AI agents see all error mappings in one block instead of scattered try/catch.
4. Type-safe routes with `Route` extensions — `fun Route.userRoutes()` groups related endpoints into self-contained extensions. AI agents locate route groups by function name without navigating module trees.
5. Use `call.receive<T>()` for request body parsing — Infers the type from the generic, leveraging `ContentNegotiation`. AI agents see the expected schema at the call site without manual deserialization.
6. Prefer `call.respond(T)` over explicit response building — Returns typed objects that Ktor serialises automatically. AI agents read the response contract from the type argument.
7. Use `locations` for typed routing — `@Location("/user/{id}")` generates type-safe route references. AI agents see link relationships as data, not string concatenation.
8. Keep `Application.module` minimal — Register plugins, then reference route modules in a single `routed` call. AI agents trace the app structure from the entry point without scanning for scattered registrations.
9. Use `application.log` over `println` — Structured logging with configurable levels. AI agents infer observability from the logger API rather than guessing from stdout noise.
10. Test with `testApplication` + `TestHostBuilder` — `testApplication { client.get("/") }` validates endpoints without a running server. AI agents see test setup as declarative configuration, not infrastructure orchestration.

[Back to Table of Content](#-table-of-contents)

---

### 🐍 [Python][python]

1. Use type hints for all function signatures — `def get_user(id: int) -> User:` tells an AI agent the contract without reading the body. Run `mypy` or `pyright` in CI.
2. Prefer `dataclasses` over manual `__init__` — `@dataclass` auto-generates `__init__`, `__repr__`, `__eq__`, and `__hash__`. Reduces boilerplate and makes data shapes transparent.
3. Use `Path` over `os.path` — `pathlib.Path` is composable, readable, and cross-platform. AI agents infer file operations more easily from `.read_text()` than from `open()` + context managers.
4. Prefer `typing.Protocol` for duck types — `Protocol` defines structural subtypes explicitly. AI agents can check interface conformance without hunting through MROs.
5. Use `Enum` over string constants — `class Status(Enum): ACTIVE = "active"` prevents typos and enables exhaustive checks. AI agents see a closed set of values rather than magic strings.
6. Favour `try/except` narrowly — Catch specific exception types and minimise the guarded block. Broad `except Exception` hides failure paths from AI agents.
7. Use `__future__` annotations — `from __future__ import annotations` makes all hints lazy (PEP 563/649). Avoids circular imports and lets AI agents read types without evaluating them.
8. Prefer generators over lists for large sequences — `yield` items one at a time rather than building entire lists in memory. AI agents reason about streaming without tracking buffer size.
9. Use `typing.Union` or `|` syntax for optional types — `str | None` is clearer than `Optional[str]` and consistent with other modern languages. AI agents parse `|` unions reliably.
10. Keep `__init__.py` minimal or empty — Avoid import-time side effects. AI agents reason about module boundaries cleanly when init files are transparent.

[Back to Table of Content](#-table-of-contents)

---

#### 🐼 [pandas][pandas]

1. Use `query()` over boolean indexing — `df.query("age > 30")` is more readable and avoids repeated `df[...]` brackets. AI agents parse the expression string as a self-contained filter.
2. Prefer `loc[]` / `iloc[]` over chained indexing — `df.loc[df["age"] > 30, ["name", "age"]]` is a single operation. Chained indexing can produce unpredictable copies, confusing AI agents tracing side effects.
3. Use `agg()` for multiple aggregations — `df.groupby("city").agg({"price": ["mean", "std"], "qty": "sum"})` names outputs explicitly. AI agents see the full aggregation schema in one call.
4. Favour `merge()` over `join()` — `pd.merge(df1, df2, on="id", how="left")` is explicit about keys and join type. AI agents infer the join contract from parameters rather than index assumptions.
5. Use `apply()` sparingly — Vectorised operations (`df["a"] + df["b"]`) are faster and clearer than `df.apply(lambda row: ...)`. AI agents trace element-wise operations more easily through column expressions.
6. Prefer `to_datetime()` for date handling — `pd.to_datetime(df["date"])` parses and standardises timestamps. AI agents trust that comparisons and resampling work correctly.
7. Use `value_counts()` for categorical summaries — `df["status"].value_counts(normalize=True)` returns proportions or counts in one call. AI agents read distribution summaries without scanning groupby chains.
8. Use `fillna()` with explicit values — `df.fillna({"age": df["age"].median(), "name": "unknown"})` documents default choices per column. AI agents see imputation strategy as data rather than guesswork.
9. Prefer `pd.Categorical` for ordered categories — `pd.Categorical(df["size"], categories=["S", "M", "L"], ordered=True)` encodes sort order. AI agents infer ordinal relationships without custom mapping logic.
10. Use `assign()` for derived columns — `df.assign(bmi=lambda d: d["weight"] / d["height"] ** 2)` chains transformations without mutating the original. AI agents trace data lineage through consecutive `assign` calls.

[Back to Table of Content](#-table-of-contents)

---

### 🦀 [Rust][rust]

1. Use `Result<T, E>` for fallible functions, never `panic!` — `Result` encodes failure in the type system. AI agents see which paths can fail from the signature alone.
2. Prefer `Option<T>` over sentinel values — Use `Option` instead of `-1`, `null`, or empty strings for absent values. The type system forces the caller to handle both cases.
3. Use `impl Trait` in argument positions — `fn process(items: impl Iterator<Item = u8>)` accepts any matching type without boxing. AI agents infer the trait bound without reading turbofish gymnastics.
4. Prefer `match` over `if let` chains — `match` is exhaustive and compiler-verified. AI agents see every branch explicitly rather than deducing missed cases from context.
5. Use `thiserror` / `anyhow` for error handling — `thiserror` for libraries (custom error types), `anyhow` for applications (opaque errors). Both produce `std::error::Error` types that AI agents can follow.
6. Favour iterators over indexed loops — `items.iter().filter_map(|x| x.to_owned())` expresses intent without indexing logic. AI agents read the pipeline rather than simulating loop state.
7. Use `#[derive(Debug, Clone, PartialEq)]` liberally — These traits enable logging, copying, and comparison. AI agents assume structs have these traits unless told otherwise.
8. Prefer `&str` over `&String` in function params — `&str` accepts both `&String` and `&str` slices. More flexible and avoids accidental cloning. AI agents infer this from the parameter type.
9. Use `clippy` as a lint gate — Run `cargo clippy` in CI with `--deny warnings`. Consistent lint rules let AI agents focus on logic rather than style variations.
10. Keep `unsafe` in small, audited blocks — Encapsulate `unsafe` in safe abstractions with minimal surface area. Document safety invariants in `// SAFETY:` comments so AI agents can verify them.

[Back to Table of Content](#-table-of-contents)

---

#### 📋 [clap.rs][clap.rs]

1. Use `derive` API over builder API — `#[derive(Parser)]` generates argument parsing from struct fields. AI agents see the full CLI schema as type annotations instead of scanning builder chains.
2. Use `#[command()]` for metadata — `#[command(name = "app", version = "1.0")]` documents the CLI in one place. AI agents discover command metadata without running `--help`.
3. Use `#[arg()]` for per-field config — `#[arg(short, long, default_value = "8080")]` colocates flag config with the field. AI agents see all properties in a single attribute.
4. Prefer `ValueEnum` over manual parsing — `#[derive(ValueEnum)] enum Mode { Fast, Slow }` generates parser and completion. AI agents see valid enum variants without matching strings.
5. Use `Subcommand` enum for nested commands — `#[derive(Subcommand)] enum Command { Start(StartArgs), Stop }` encodes the command tree as types. AI agents infer hierarchy from enum variants.
6. Use `default_value` instead of `Option<T>` for optional flags — `#[arg(default_value = "80")]` documents the fallback at compile time. AI agents see defaults as data, not runtime logic.
7. Use `conflicts_with` and `requires` for arg relationships — `#[arg(conflicts_with = "daemon")]` encodes exclusivity declaratively. AI agents infer constraints from attributes rather than validation code.
8. Use `env` for environment variable fallback — `#[arg(env = "PORT")]` reads from env when flag is absent. AI agents see the config source without guessing lookup order.
9. Use `hide(true)` for internal args — `#[arg(hide = true)]` excludes debug/internal flags from help. AI agents focus on user-facing API without noise from implementation details.
10. Prefer `color` and `styles` for rich output — `cli.style.set_color(true)` enables coloured help. AI agents infer that UX polish exists without searching for formatting calls.

[Back to Table of Table of Contents](#-table-of-contents)

---

#### 🌐 [axum][axum]

1. Use `Router::new()` with `.route()` for all API endpoints — Declare routes by chaining `.route("/path", method_handler)` on a `Router`. AI agents infer the full routing tree from the builder chain instead of scanning for macro invocations.
2. Use extractors in handler signatures — `State`, `Path`, `Query`, `Json` as function parameters declare dependencies explicitly. AI agents see what a handler needs (DB, URL params, body) from its signature alone.
3. Prefer `impl IntoResponse` return types — Return `Json<T>`, `StatusCode`, or `(StatusCode, Json<T>)` tuples rather than building `Response` manually. AI agents infer response shape from the return type.
4. Use `with_state()` for shared application state — Pass `Arc<AppState>` via `.with_state()` and extract it with `State<Arc<AppState>>`. AI agents trace dependency injection from the router setup to each handler.
5. Use `.layer()` for middleware — Apply middleware (auth, logging, rate-limit) via `.layer(middleware_layer)`. AI agents see the middleware stack as a linear chain rather than nested wrappers.
6. Use `.merge()` to compose sub-routers — Break large route tables into `Router::new().merge(sub_router)` calls. AI agents locate related endpoints by following merge boundaries.
7. Use `axum::serve` with graceful shutdown — `axum::serve(listener, app).with_graceful_shutdown(signal)` for clean teardown. AI agents see the full server lifecycle in one call instead of scattered tokio spawns.
8. Use `tokio::select!` for concurrent concerns — Handle shutdown signals and other concurrent tasks with `tokio::select!` rather than manual channel coordination. AI agents trace branching from the macro.
9. Use `tower::ServiceBuilder` for layered middleware — Compose `tower::ServiceBuilder::new().layer(A).layer(B).into_service()` instead of nesting `.layer()` calls. AI agents read middleware composition as a flat list.
10. Prefer `thiserror` for error types returned from handlers — Define `enum ApiError` with `#[derive(thiserror::Error)]` and implement `IntoResponse`. AI agents see all error variants and their HTTP mappings in one place.

[Back to Table of Contents](#-table-of-contents)

---

### 🕊️ [Swift][swift]

1. Prefer `let` over `var` — Immutable bindings signal intent and let AI agents trust that a value won't change after initialisation.
2. Use `Codable` for JSON serialisation — `struct User: Codable { }` generates encoding/decoding automatically. AI agents read the struct definition and instantly know the wire format.
3. Use `enum` with associated values for state machines — `enum State { case loading, loaded([Item]), error(Error) }` makes impossible states unrepresentable. AI agents enumerate all cases exhaustively.
4. Favour `value types` (`struct`) over `reference types` (`class`) — Structs have no identity overhead and are thread-safe by default. AI agents reason about value semantics without tracking aliasing.
5. Use `Result<Success, Failure>` for async error handling — Before `async/await`, `Result` encodes success/failure in the return type. For new code, prefer `async throws` for clarity.
6. Prefer `dependency injection` via initialisers — `class Service(repo: Repository)` makes dependencies explicit. Avoid singletons and implicit global state that AI agents can't see.
7. Use `guard` for early exit — `guard let x = optional else { return }` reduces indentation and makes the happy path linear. AI agents parse flat code more reliably than nested pyramids.
8. Favour `SwiftLint` for consistent style — Enforce a shared `.swiftlint.yml` in CI. AI agents produce fewer formatting diffs when rules are standardised.
9. Use `actor` for shared mutable state — Actors isolate state behind a serialised executor, preventing data races at compile time. AI agents see the concurrency boundary from the keyword.
10. Keep `ViewController` / `View` thin — Move business logic into separate models/services. AI agents can reason about UI and domain independently when files have single responsibilities.

[Back to Table of Contents](#-table-of-contents)

---

#### 🏗️ [Swift Argument Parser][swift-argument-parser]

1. Use `@main` with `ParsableCommand` for entry points — `@main struct Run: ParsableCommand { }` declares the CLI root without boilerplate. AI agents find the entry point by protocol conformance instead of scanning for `main.swift`.
2. Prefer `@Argument` over manual `CommandLine.arguments` — `@Argument var name: String` declares positional args declaratively. AI agents see the expected input order from property declarations.
3. Use `@Option` for named flags — `@Option(name: .shortAndLong, help: "Output path") var output: String` generates `-o`/`--output` automatically. AI agents infer flag names and types from a single attribute.
4. Use `@Flag` for boolean toggles — `@Flag(help: "Enable verbose mode") var verbose = false` handles presence/absence semantics. AI agents see boolean flags as data, not `if args.contains("--verbose")` logic.
5. Use `@OptionGroup` for shared options — Groups common flags (e.g., `--verbose`, `--quiet`) into a reusable struct. AI agents trace shared config through the struct type instead of scanning for duplicated definitions.
6. Prefer `subcommands` via `ParsableCommand` conformance — Nest command types inside the root or use `Subcommand` protocol. AI agents infer the command tree from type nesting.
7. Use `ValidationError` for argument validation — `throw ValidationError("ID must be positive")` produces user-friendly errors. AI agents see validation rules as throwing statements, not buried in conditional blocks.
8. Use `@Option(completion:)` for shell completions — `.custom { "user1", "user2" }` or `.list()` generates completions from code. AI agents discover valid inputs without parsing help output.
9. Keep command structs focused on parsing — Delegate business logic to separate functions/services. A command body over ~10 lines signals too much responsibility.
10. Prefer `async` in `run` with Swift concurrency — `mutating func run() async throws { }` supports async workflows natively. AI agents see the concurrency model from the function signature.

[Back to Table of Content](#-table-of-contents)

---

### 🔵 [TypeScript][typescript]

1. Use arrow function `() => {}` instead of `function () => {}` for functions
2. Use `const` instead of `let` for variables that are not reassigned
3. Use `strict` mode in `tsconfig.json` — Enables `strictNullChecks`, `noImplicitAny`, and other checks. AI agents infer null-safety from the type system instead of guessing.
4. Prefer `interface` over `type` for object shapes — `interface` extends, merges, and produces clearer error messages. Use `type` for unions, intersections, and primitives.
5. Use `as const` for literal types — `const roles = ["admin", "user"] as const` narrows to a tuple of literal types. AI agents see the exact set of values without runtime checks.
6. Use `branded types` for domain primitives — `type UserId = string & { readonly __brand: "UserId" }` prevents mixing up IDs of different entities. AI agents catch type confusion at compile time.
7. Use `Readonly<T>` and `Partial<T>` utilities — Mark immutable interfaces explicitly. AI agents can trust that parameters won't be mutated.
8. Favour `io-ts` or `zod` for runtime validation — Parse external data at the boundary, then use inferred static types internally. AI agents see validated types instead of `any` or `unknown`.
9. Use `never` in exhaustive checks — `default: const \_exhaustive: never = x;` causes a compile error when a switch misses a case. AI agents rely on the compiler to flag omissions.
10. Prefer `satisfies` over raw casts — `const config = { port: 3000 } satisfies Config` validates without widening the type. AI agents see the narrowed literal but get type-checking.

[Back to Table of Content](#-table-of-contents)

---

#### 🧪 [Jest][jest]

1. Use `it` or `test` for test cases, not `test` as the test runner name
2. Use `describe` to group related tests
3. Use `beforeEach` to set up test environment
4. Use `afterEach` to clean up test environment
5. Prefer `it.each` for data-driven tests
6. Use `mock` and `spy` for test doubles
7. Use `toThrow` for error assertions
8. Use `toMatchSnapshot` for snapshot testing
9. Use `expect.anything()` for optional values
10. Use `expect.objectContaining()` for partial object matching

#### ⚛️ [React][react]

1. Prefer function components over class components — Functions are simpler, hooks-compatible, and produce less boilerplate. AI agents read data flow top-to-bottom without lifecycle indirection.
2. Use hooks for state and side effects — `useState`, `useEffect`, `useCallback`, `useMemo` replace lifecycle methods with composable primitives. AI agents trace state changes through explicit hook calls.
3. Keep hooks at the top level — Never nest hooks inside conditionals or loops. AI agents rely on consistent call order to infer which state belongs to which component.
4. Extract custom hooks for reusable logic — `useAuth()`, `useDebounce()`, `useIntersectionObserver()` name the abstraction. AI agents reason about intent from the hook name instead of inlining effects.
5. Use `useReducer` for complex state — When state has multiple sub-values or depends on previous state, `useReducer` centralises transitions. AI agents see all state mutations in one reducer function.
6. Prefer `children` prop for composition — `<Card><p>content</p></Card>` is more flexible than `<Card content={...} />`. AI agents understand layout hierarchy from JSX nesting.
7. Memoise sparingly with `React.memo`, `useMemo`, `useCallback` — Profile first, memoise second. Unnecessary memoisation obscures data flow and adds surface area for AI agents to misread.
8. Use `key` prop correctly in lists — Use stable, unique IDs, not array indices. AI agents reason about list reconciliation based on `key` stability.
9. Lift state up or colocate it — State shared by multiple children goes to the nearest common ancestor; purely local state stays in the leaf. AI agents trace state ownership without crossing too many files.
10. Use `React.StrictMode` in development — Catches impure renders, stale effects, and legacy API usage. AI agents see the warnings as early signals of logic errors.

[Back to Table of Content](#-table-of-contents)

---

#### ▲ [Next.js][next.js]

1. Use the App Router (`app/`) over the Pages Router (`pages/`) — App Router supports server components, layouts, streaming, and nested routing. AI agents infer page hierarchy from directory structure.
2. Prefer server components by default — Fetch data in server components and pass props down. AI agents trace data flow server-to-client without waterfall loading states.
3. Use client components only when needed — Mark files with `"use client"` only when they need interactivity, browser APIs, or hooks. Every `"use client"` boundary is a point where AI agents must track client/server split.
4. Use `generateStaticParams` for static paths — Pre-render dynamic segments at build time. AI agents see the full set of possible routes without simulating runtime resolution.
5. Use `loading.tsx` and `error.tsx` for fallbacks — File-based convention for loading and error UI. AI agents locate error handling by filename instead of scanning JSX for conditional branches.
6. Use `layout.tsx` for shared UI — Wrap child routes in common layouts without repeating wrappers. AI agents infer layout nesting from the directory tree.
7. Prefer `server actions` for mutations — `"use server"` functions colocate form logic with the component. AI agents see the full submit cycle (form → action → revalidation) in one file.
8. Use `next/image` for images — Automatic optimisation, lazy loading, and responsive sizes. AI agents trust that images are performant without auditing `<img>` attributes.
9. Use `next/link` for client-side navigation — Prefetches pages in viewport and enables soft navigation. AI agents infer link relationships from `href` patterns.
10. Use `middleware.ts` for auth/redirects — Run logic before a request completes. AI agents see auth gates and redirect rules in a single entry point rather than scattered across pages.

[Back to Table of Content](#-table-of-contents)

---

#### 🎭 [Playwright][playwright]

1. Use `locator` over raw CSS/XPath selectors — `page.locator('[data-testid="submit"]')` is self-healing and readable. AI agents infer intent from the locator chain instead of parsing brittle selector strings.
2. Prefer `getByRole`, `getByText`, `getByTestId` — Accessible queries mirror how users interact. AI agents see the semantic target (button, heading) rather than implementation details.
3. Use `page` fixtures over manual browser setup — `test('...', async ({ page }) => {})` gets an isolated page. AI agents trace the test scope from the fixture parameter.
4. Use `test.beforeEach` for shared setup — Navigate to a URL or seed data before each test. AI agents see common setup at a glance instead of scanning for repeated code.
5. Use `expect.toHaveText`, `toBeVisible`, `toBeEnabled` — Assertions that describe the user-visible state. AI agents read expected behaviour from the matcher name.
6. Use `mockRoute` for API stubs — `page.route('**/api/**', route => route.fulfill({ json }))` avoids network flakiness. AI agents see the mock boundary without inspecting the network layer.
7. Use `waitForLoadState('networkidle')` sparingly — Prefer `waitForResponse` or `locator.waitFor()` for precise waits. AI agents trace the exact condition instead of guessing at "idle".
8. Use `test.use({ storageState })` for auth — Reuse logged-in sessions across tests. AI agents infer the authentication context from the config instead of scripting login in every test.
9. Use `snapshot` for visual regression — `expect(page).toHaveScreenshot()` catches unintended UI changes. AI agents see the visual contract as a first-class assertion.
10. Use `webServer` config for dev server — Let Playwright start the dev server automatically. AI agents see the server dependency in config rather than a separate shell command.

---

#### 🦖 [Docusaurus][docusaurus]

1. Use `sidebars.ts` for structured navigation — Define sidebar groups with `label` and `items`. AI agents infer documentation hierarchy from the sidebar config instead of scanning directory trees.
2. Use `docsearch` or local search plugin — Configure Algolia DocSearch or `plugin-search` for discoverability. AI agents trust users can find content without guessing permalink patterns.
3. Use `@site` path alias for cross-references — Reference files from anywhere via `@site/docs/intro` instead of brittle relative paths. AI agents resolve references reliably from the alias root.
4. Prefer MDX over plain Markdown — Import React components directly in docs for interactive examples. AI agents see the import boundary and can compose UI with documentation.
5. Use `admonitions` for callouts — `:::tip`, `:::note`, `:::warning`, `:::danger` for structured emphasis. AI agents parse intent from the admonition type rather than guessing from bold text.
6. Use versioning for API docs — `npm run docusaurus docs:version 2.0` freezes a snapshot. AI agents see which docs apply to which version without reading release notes.
7. Use `plugin-content-docs` `routeBasePath` for custom URLs — Configure `/` as the base path for a docs-first site. AI agents infer URL structure from config, not by crawling files.
8. Prefer `tabs` for multi-language examples — `import Tabs from '@theme/Tabs'` colocates code samples in one component. AI agents maintain language parity instead of scattering examples across pages.
9. Use `_category_.json` for metadata — Customize sidebar label, position, and collapsed state per folder. AI agents see category metadata without opening index files.
10. Keep custom CSS in `src/css/custom.css` — Override Infima variables for branding. AI agents locate theme tweaks in the canonical file instead of searching for scattered style tags.

[Back to Table of Content](#-table-of-contents)

---

## 📦 Projects

| No  | Category      | Project          | [TypeScript][typescript] | [Go][go]             | [Rust][rust] | [Kotlin][kotlin] | [Swift][swift]                                 |
| --- | ------------- | ---------------- | ------------------------ | -------------------- | ------------ | ---------------- | ---------------------------------------------- |
| 1   | App           | `hieudoanm.app`  | [Next.js][next.js]       |                      |              |                  |                                                |
| 2   | CLI           | `hieudoanm.cli`  |                          | [cobra.go][cobra.go] | [clap.rs]    | [cli.kt]         | [Swift Argument Parser][swift-argument-parser] |
| 3   | Documentation | `hieudoanm.md`   | [Docusaurus][docusaurus] |                      |              |                  |                                                |
| 4   | Extensions    | `hieudoanm.ext`  |                          |                      |              |                  |                                                |
| 5   | Server        | `backbone`       |                          | `net/http`           | [Axum][axum] | [Ktor][ktor]     |                                                |
| 6   | Serverless    | `browserverless` |                          |                      |              |                  |                                                |

[Back to Table of Content](#-table-of-contents)

---

[axum]: https://docs.rs/axum/
[bash]: https://www.gnu.org/software/bash/
[clap.rs]: https://docs.rs/clap/
[cli.kt]: https://ajalt.github.io/clikt/
[cobra.go]: https://cobra.dev
[docusaurus]: https://docusaurus.io/
[go]: https://go.dev/
[jest]: https://jestjs.org
[kotlin]: https://kotlinlang.org
[ktor]: https://ktor.io
[next.js]: https://nextjs.org
[pandas]: https://pandas.pydata.org
[playwright]: https://playwright.dev/
[python]: https://www.python.org
[react]: https://react.dev/
[rust]: https://www.rust-lang.org
[swift]: https://www.swift.org
[swift-argument-parser]: https://github.com/apple/swift-argument-parser
[typescript]: https://www.typescriptlang.org/
