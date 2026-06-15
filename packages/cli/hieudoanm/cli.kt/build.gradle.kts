plugins {
    kotlin("jvm") version "1.9.25"
    application
}

group = "io.github.hieudoanm.cli"
version = "0.0.1"

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.github.ajalt.clikt:clikt:4.2.2")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.1")
    implementation("com.google.code.gson:gson:2.10.1")
    implementation("com.squareup.okhttp3:okhttp:4.12.0")
    implementation("commons-codec:commons-codec:1.16.0")
    testImplementation(kotlin("test"))
}

application {
    mainClass.set("io.github.hieudoanm.cli.MainKt")
}

tasks.jar {
    manifest {
        attributes(
            "Main-Class" to "io.github.hieudoanm.cli.MainKt",
            "Class-Path" to configurations.runtimeClasspath.get().joinToString(" ") { it.name }
        )
    }
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(21)
}
