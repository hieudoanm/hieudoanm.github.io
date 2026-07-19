# Packaging

> Landify (Kotlin) ships as a launcher script plus a `lib/` directory of jars.
> There is no container image.

## Distribution

`make build` runs Gradle's `installDist` and copies the result to `dist/`:

```bash
cd packages/app/headless/landify/languages/kotlin
make build    # → dist/bin/landify + dist/lib/*.jar
```

```txt
dist/
├── bin/
│   ├── landify       # launcher script (also landify.bat on Windows)
│   └── landify.bat
└── lib/              # every runtime dependency + landify-<version>.jar
```

The layout is not arbitrary. The Gradle-generated launcher resolves its
classpath as `$APP_HOME/lib` and derives `APP_HOME` by stepping out of a `bin/`
subdirectory, so the launcher **must** live in a `bin/` directory beside
`lib/`. Flattening it to `dist/landify` makes the launcher fail with
`ClassNotFoundException`.

Everything is on the classpath — templates, partials and examples are
resources inside `landify-<version>.jar` — so the distribution is
self-contained and needs no asset files next to it. The TUI and the Compose
studio ship in the same artifact; there is no separate GUI build and no build
tag to flip.

Requirements at runtime: a JVM 21+ on the `PATH` (or `JAVA_HOME`). Nothing
else.

## Cross-platform

The distribution is platform-agnostic at the jar level, but the Compose studio
needs the Skiko native library for the host platform, which the Gradle
dependency resolves automatically per platform. The TUI, CLI and
`serve` are pure JVM and run anywhere a JVM does.

To build a self-contained executable instead of a launcher + `lib/`, add a
tool like `jpackage` or GraalVM `native-image`; the `installDist` output is the
input for both.

## Install

```bash
make install
```

This copies the distribution to `~/.landify` and symlinks
`~/.landify/bin/landify` into `~/bin/landify`. Re-running it replaces the
previous copy atomically.

## Version

The version lives in exactly one place: `landify.version` in
`gradle.properties`. Gradle names the jar from it and generates
`Version.kt` (into `build/generated/`), which `Main.kt` passes to Clikt's
`versionOption`. Changing the property changes the jar name, the reported
version and the manifest together, so they cannot drift.

## Verification before publishing

```bash
make lint     # compileKotlin + compileTestKotlin
make test     # includes the 14 byte-for-byte golden comparisons
make build
```

`make test` is the release gate: `GoldenTest` fails if any generated page
differs by a single byte from the reference output.
