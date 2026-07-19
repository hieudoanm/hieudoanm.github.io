plugins {
    kotlin("jvm") version "2.4.20"
    kotlin("plugin.compose") version "2.4.20"
    kotlin("plugin.serialization") version "2.4.20"
    id("org.jetbrains.compose") version "1.12.1"
    application
    jacoco
}

group = "io.github.hieudoanm.kevin"
version = "0.0.1"

dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    implementation("com.github.ajalt.mordant:mordant:3.1.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.11.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
    implementation(compose.desktop.currentOs)
    implementation(compose.material3)
    implementation(compose.foundation)
    // The Compose Gradle plugin exposes no icons accessor, so the AndroidX
    // coordinate is declared directly. material-icons-core is the small curated
    // set (848K); material-icons-extended is 37MB for every glyph.
    //
    // Two caveats, both verified: AndroidX froze the icon artifacts at 1.7.8, so
    // this trails material3 1.9.0; and 1.7.8 depends on compose-ui 1.6.0, which
    // would ship a second, older androidx.compose.ui stack next to the 1.12.1
    // JetBrains artifacts. The glyphs only need ImageVector, which is already
    // on the classpath, so that transitive tree is excluded.
    implementation("androidx.compose.material:material-icons-core-desktop:1.7.8") {
        exclude(group = "androidx.compose.ui")
    }
    testImplementation(kotlin("test"))
}

application {
    mainClass.set("io.github.hieudoanm.kevin.MainKt")
}

// The Compose plugin and the application plugin both contribute the desktop
// runtime, so the distribution copy sees each jar twice.
tasks.installDist {
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}

tasks.test {
    useJUnitPlatform()
    finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
    dependsOn(tasks.test)
    reports {
        xml.required.set(true)
        html.required.set(true)
    }
}

tasks.jar {
    manifest {
        attributes("Main-Class" to "io.github.hieudoanm.kevin.MainKt")
    }
}
