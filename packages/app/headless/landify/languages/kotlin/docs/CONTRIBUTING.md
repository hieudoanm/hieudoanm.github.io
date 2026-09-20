# Contributing

## Setup

```bash
cd packages/app/headless/landify/languages/kotlin
make build      # or: ./gradlew installDist
```

Requires JDK 21+. The Gradle wrapper fetches the toolchain and all
dependencies.

## Commands

```bash
make lint       # compileKotlin + compileTestKotlin (the lint pass)
make test       # ./gradlew test
make build      # dist/bin/landify + dist/lib
make all        # test + build
make install    # install to ~/bin/landify
make coverage   # build/reports/jacoco/test/html/index.html
make clean      # remove build artifacts
```

There is no separate format task — the sources are kept formatted by hand/IDE.
`make lint` is a compile pass: the build is warning-clean and
`-Werror`-style regressions should stay visible.

## Conventions

- **File size:** every source file stays under 200 lines. When a class grows
  past that, split it by responsibility — this is why the theme presets live
  in `Presets1.kt` … `Presets7.kt` and the validation requirements live in
  `RequirementsA.kt` / `RequirementsB.kt`.
- **Function size:** keep functions under ~30 lines.
- **State:** editors are immutable data classes with pure `reduce(action)`
  reducers (`StudioState`, `EditorState`). Keep it that way — it is what makes
  them testable without a terminal or a display.
- **Imports:** explicit imports, no wildcard, no `java.util.*` style catch-alls.
- **Comments:** prefer a name that says it over a comment that explains it.
- **Error handling:** surface a `LandifyException` with a user-facing message;
  `Main.kt` turns it into a clean `Error: …` line and a non-zero exit, never a
  stack trace.

## Adding a page type

1. Add the model in `config/` and include it as a nullable field on `Config`.
2. Add its required-field checks in `validate/`, and its name to `knownTypes()`.
3. Add `assets/templates/template-<type>.j2` and
   `assets/examples/example-<type>.yaml`.
4. Add the golden output to `src/test/resources/golden/<type>.html`.
5. Add the case to `GoldenTest`.

## Changing a template or a theme

**Byte-for-byte parity is the contract.** Before you touch a template, a
partial, an escaping rule, the token order or a preset value:

```bash
make test    # GoldenTest compares all 14 outputs byte-for-byte
```

If a change is intentional, regenerate the affected goldens in the same commit
and say why in the message. Whitespace matters down to the trailing newline —
`partials/header.j2` and `partials/footer.j2` intentionally have none.

## Tests

- `Fixtures.kt` — shared builders and the canonical valid document
- `ConfigTest` — defaults, theme merge, unknown-field rejection, YAML round-trip
- `ThemesTest` — exactly 64 presets, unique names, gallery order, lookup
- `ColorTest` — hex math, contrast, light/dark token sets
- `TemplateEngineTest` — the Jinja subset: if/else/for, dotted paths, escaping
- `RenderTest` — token splice, media frame, escaping in output
- `ValidateTest` — per-type requirements, global fields, theme hexes
- `ScaffoldTest` — the 12 scaffolds, unknown type, overwrite refusal
- `GoldenTest` — the 14 parity cases
- `ParseCommandTest`, `EditorStateTest` — the TUI command line and editor
  transitions
- `StaticServerTest` — 200s, content types, 404s, traversal refusal, port `0`

Add a test next to the behaviour you change. The suite runs on the JUnit
Platform via `kotlin.test`, so `@Test` and `assertEquals` are enough.

## Code of conduct

Be direct, be kind, review the change and not the author.
