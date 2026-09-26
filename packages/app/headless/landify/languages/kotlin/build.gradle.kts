plugins {
    kotlin("jvm") version "2.4.20"
    kotlin("plugin.compose") version "2.4.20"
    kotlin("plugin.serialization") version "2.4.20"
    id("org.jetbrains.compose") version "1.12.1"
    application
    jacoco
}

group = "io.github.hieudoanm.landify"

// Single source of truth for the version: Gradle names the jar and writes the
// generated Version.kt that `landify --version` reads, so the two can never drift.
val landifyVersion = providers.gradleProperty("landify.version").get()
version = landifyVersion

val generatedSourceDir = layout.buildDirectory.dir("generated/source/version")
val generateVersion = tasks.register("generateVersion") {
    val outputDir = generatedSourceDir
    val value = landifyVersion
    inputs.property("version", value)
    outputs.dir(outputDir)
    doLast {
        val pkg = outputDir.get().asFile.resolve("io/github/hieudoanm/landify")
        pkg.mkdirs()
        pkg.resolve("Version.kt").writeText(
            """
            package io.github.hieudoanm.landify

            /** The single reported version, generated from `landify.version` in gradle.properties. */
            const val VERSION: String = "$value"

            """.trimIndent() + "\n"
        )
    }
}

dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    implementation("com.github.ajalt.mordant:mordant:3.1.0")
    // Strict YAML: kaml rejects unknown keys by default, matching the Go
    // original's yaml.Decoder.KnownFields(true).
    implementation("com.charleskorn.kaml:kaml:0.104.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
    // The desktop bundle supplies the ui/runtime artifacts; material3 and
    // foundation are declared directly because the studio imports them.
    implementation(compose.desktop.currentOs)
    implementation("org.jetbrains.compose.material3:material3:1.9.0")
    implementation("org.jetbrains.compose.foundation:foundation:1.12.1")
    testImplementation(kotlin("test"))
}

sourceSets.main {
    kotlin.srcDir(generateVersion)
}

application {
    mainClass.set("io.github.hieudoanm.landify.MainKt")
}

// The Compose plugin and the application plugin both contribute the desktop
// runtime, so the distribution copy sees each jar twice.
tasks.installDist {
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

// `make test` reports coverage, so the report runs after the suite. Only
// `finalizedBy` is needed: the report task already depends on the test task's
// execution data, and declaring both directions makes Gradle's graph cyclic.
tasks.test {
    useJUnitPlatform()
    finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
    reports {
        xml.required.set(true)
        html.required.set(true)
    }
}

tasks.jar {
    manifest {
        attributes("Main-Class" to "io.github.hieudoanm.landify.MainKt")
    }
}
