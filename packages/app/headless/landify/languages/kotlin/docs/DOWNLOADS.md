# Downloads (Kotlin)

> There is no prebuilt release artifact for this port. Build it from source —
> it takes a JDK and about a minute.

## Requirements

- **JDK 21 or newer** on the `PATH` (or `JAVA_HOME`)

The Gradle wrapper downloads the Kotlin toolchain and every dependency, so
nothing else needs to be installed.

## Build from source

```bash
cd packages/app/headless/landify/languages/kotlin
make build
```

That produces:

```txt
dist/
├── bin/landify      # the launcher
└── lib/*.jar        # runtime dependencies + landify.jar
```

Run it:

```bash
./dist/bin/landify new        # scaffold landify.yaml
./dist/bin/landify build      # write index.html
./dist/bin/landify serve      # preview on http://127.0.0.1:8080
```

## Install into `~/bin`

```bash
make install
```

Copies the distribution to `~/.landify` and symlinks
`~/bin/landify` → `~/.landify/bin/landify`. Make sure `~/bin` is on your
`PATH`.

## Use it without installing

`dist/bin/landify` works from anywhere, but note that its `lib/` directory must
travel with it — the launcher resolves its classpath as `$APP_HOME/lib`. Copy
the whole `dist/` directory, not just the script.

## Other Landify ports

This is the JVM port. The Go and Rust implementations in sibling directories
ship prebuilt static binaries and are the reference for output parity. All
three render byte-identical HTML from the same YAML.
