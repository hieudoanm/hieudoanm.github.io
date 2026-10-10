# Overview

Focused reference for **clikt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Clikt Best Practices

Clikt turns a command-line interface into a tree of Kotlin classes: each command is a `CliktCommand` subclass that declares its own parameters and does its work in `run()`. Best practice here is **one class per command, parameters as delegated properties, parsing separated from side effects, and errors as typed values** — so the same command object can be constructed in a test with a fake side-effect sink and asserted without touching the filesystem or the network.

This document is written against **Kotlin 2.4+ / Clikt 5.1+** and includes concrete values you can drop straight into code.

---

## 1. Core Stack & Gradle Setup

Clikt 5 is split into artifacts, and the split is not cosmetic. Add the **umbrella** coordinate unless you have a reason not to:

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    testImplementation(kotlin("test"))
}

application { mainClass.set("io.example.cli.MainKt") }
```

| Coordinate                          | Ships                                  | Missing if you only need core                    |
| ----------------------------------- | -------------------------------------- | ------------------------------------------------ |
| `com.github.ajalt.clikt:clikt`      | core + Mordant-backed help + `testing` | — (recommended)                                  |
| `com.github.ajalt.clikt:clikt-core` | parsing, types, groups                 | no `com.github.ajalt.clikt.testing`, no `prompt` |

**Verified:** `test()` and `prompt()` live in the full `clikt-jvm` artifact, _not_ in `clikt-core-jvm`. Depending on `clikt-core` alone compiles your production code and then fails the moment you add a test.

Clikt's help formatter is Mordant-powered, so Clikt drags Mordant in transitively. It requests **Mordant 3.0.2**, which loses conflict resolution against any Mordant version you declare yourself. If the app also uses Mordant directly, pin it explicitly so the graph has exactly one Mordant version:

```kotlin
dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    implementation("com.github.ajalt.mordant:mordant:3.1.0") // wins over Clikt's transitive 3.0.2
}
```

Check for a split brain with `./gradlew dependencies --configuration runtimeClasspath | grep mordant`. Two different `mordant-core-jvm` versions in one graph is a latent `NoSuchMethodError`, not a style nit.

## 2. Command Hierarchies

Every command is a class. The root owns nothing but structure, so give it a no-op body:

```kotlin
import com.github.ajalt.clikt.core.NoOpCliktCommand
import com.github.ajalt.clikt.core.main
import com.github.ajalt.clikt.core.subcommands

class Kevin : NoOpCliktCommand(name = "kevin")

class Version : NoOpCliktCommand(name = "version") {
    override fun run() = echo("kevin 1.0.0")
}

fun main(args: Array<String>) = Kevin().subcommands(Version(), ServeCommand()).main(args)
```

`NoOpCliktCommand` is exactly `CliktCommand` with an empty `run()`. Writing `override fun run() = Unit` by hand works but is noise — reach for the no-op base instead. Use `CliktCommand` only when the root itself does work.

`main` and `subcommands` are **extension functions** in `com.github.ajalt.clikt.core`, not members. Forget the import and Kotlin reports "unresolved reference" even though the class has the method in the bytecode.

| Base class                   | Use for                                                   |
| ---------------------------- | --------------------------------------------------------- |
| `CliktCommand`               | normal commands; you implement `run()`                    |
| `NoOpCliktCommand`           | root/grouping command; no `run()` needed                  |
| `SuspendingCliktCommand`     | `run()` is a `suspend` function                           |
| `SuspendingNoOpCliktCommand` | no-op root that is `suspend`                              |
| `ChainedCliktCommand<T>`     | a root whose subcommands share a type or a parent context |

Two structural rules that pay off immediately:
