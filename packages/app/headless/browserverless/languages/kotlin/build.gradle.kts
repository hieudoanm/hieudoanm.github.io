plugins {
    kotlin("jvm") version "2.4.21"
    kotlin("plugin.serialization") version "2.4.21"
    application
    jacoco
}

group = "io.github.hieudoanm.browserverless"

// Single source of truth for the version: Gradle names the jar and writes the
// generated Version.kt that `browserverless --version` and the MCP version tool
// read, so the two can never drift.
val browserverlessVersion = providers.gradleProperty("browserverless.version").get()
version = browserverlessVersion

val generatedSourceDir = layout.buildDirectory.dir("generated/source/version")
val generateVersion = tasks.register("generateVersion") {
    val outputDir = generatedSourceDir
    val value = browserverlessVersion
    inputs.property("version", value)
    outputs.dir(outputDir)
    doLast {
        val pkg = outputDir.get().asFile.resolve("io/github/hieudoanm/browserverless")
        pkg.mkdirs()
        pkg.resolve("Version.kt").writeText(
            """
            package io.github.hieudoanm.browserverless

            /** The single reported version, generated from `browserverless.version` in gradle.properties. */
            const val VERSION: String = "$value"

            """.trimIndent() + "\n"
        )
        // The MCP server reports the same version, so it reads the same constant
        // rather than keeping a second copy that could drift.
        pkg.resolve("McpVersion.kt").writeText(
            """
            package io.github.hieudoanm.browserverless.mcp

            /** The version the MCP server identifies as. */
            val MCP_VERSION: String get() = io.github.hieudoanm.browserverless.VERSION

            """.trimIndent() + "\n"
        )
    }
}

dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    implementation("com.github.ajalt.mordant:mordant:3.1.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0")
    testImplementation(kotlin("test"))
}

sourceSets.main {
    kotlin.srcDir(generateVersion)
}

application {
    mainClass.set("io.github.hieudoanm.browserverless.MainKt")
}

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
        attributes("Main-Class" to "io.github.hieudoanm.browserverless.MainKt")
    }
}
