plugins {
    kotlin("jvm") version "2.4.10"
    application
    jacoco
}

group = "io.github.hieudoanm.cli"
version = "0.0.1"

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.github.ajalt.clikt:clikt:4.4.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
    implementation("com.google.code.gson:gson:2.14.0")
    implementation("com.squareup.okhttp3:okhttp:5.5.0")
    implementation("commons-codec:commons-codec:1.22.1")
    implementation("org.jsoup:jsoup:1.23.1")
    testImplementation(kotlin("test"))
    testImplementation("com.squareup.okhttp3:mockwebserver:5.5.0")
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
    finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
    dependsOn(tasks.test)
    reports {
        html.required.set(true)
        xml.required.set(true)
        csv.required.set(false)
    }
    classDirectories.setFrom(
        files(classDirectories.files.map {
            fileTree(it) {
                exclude("**/*\$*")
            }
        })
    )
}

kotlin {
    jvmToolchain(21)
}
