package io.github.hieudoanm.landify.render

import io.github.hieudoanm.landify.VALID_DOC
import io.github.hieudoanm.landify.config.loadYaml
import java.nio.file.Files
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertFailsWith
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class RenderTest {
    @Test
    fun `render contains the configured content`() {
        val html = render(loadYaml(VALID_DOC))
        for (want in listOf(
            "<title>Landify</title>",
            ">Features</a>",
            "Your headline goes here.",
            "Get started</a>",
            "Zero build step",
            "Make your mark.</h2>",
            "© 2026 Landify",
        )) {
            assertContains(html, want)
        }
    }

    @Test
    fun `the hero always uses an image`() {
        val html = render(loadYaml(VALID_DOC))
        assertContains(html, """<img class="hero-media" src="assets/hero.png"""")
        assertFalse(html.contains("""class="hm-icon""""), "old hero placeholder is still emitted")
    }

    @Test
    fun `the demo uses a video with its poster`() {
        val html = render(loadYaml(VALID_DOC))
        for (want in listOf(
            """<video class="demo-media" controls""",
            """poster="assets/demo.jpg"""",
            """src="assets/demo.mp4"""",
            """type="video/mp4"""",
        )) {
            assertContains(html, want)
        }
    }

    @Test
    fun `an empty poster omits the attribute`() {
        val doc = VALID_DOC.replace("""poster: "assets/demo.jpg"""", """poster: """"")
        val html = render(loadYaml(doc))
        assertFalse(html.contains("""poster="""""), "empty poster attribute was emitted")
    }

    @Test
    fun `the theme override reaches the derived tokens`() {
        val doc = "theme:\n  primary: \"#ff00aa\"\n  radius: \"12px\"\n" + VALID_DOC
        val html = render(loadYaml(doc))
        for (want in listOf(
            "--primary: #ff00aa;",
            "--radius: 12px;",
            "--base-100: #f7f8fa;",
            "--primary-content: #ffffff;",
            "--border:",
            "--primary-soft:",
        )) {
            assertContains(html, want)
        }
        assertFalse(html.contains("color-mix"), "derived tokens should be plain hex")
    }

    @Test
    fun `the configured site mark is rendered`() {
        val doc = VALID_DOC.replace("""mark: "🌄"""", """mark: "🚀"""")
        assertContains(render(loadYaml(doc)), """<span class="mark">🚀</span>""")
    }

    @Test
    fun `an empty site mark omits the span entirely`() {
        val doc = VALID_DOC.replace("""mark: "🌄"""", """mark: """""")
        assertFalse(render(loadYaml(doc)).contains("""class="mark""""), "empty mark span was emitted")
    }

    @Test
    fun `build writes the output file`() {
        val input = examplePath("product")
        val output = Files.createTempFile("landify-build", ".html")
        try {
            buildFile(input, output)
            assertContains(Files.readString(output), "Landify")
        } finally {
            Files.deleteIfExists(output)
        }
    }

    @Test
    fun `build rejects an unknown theme preset`() {
        val error = assertFailsWith<LandifyException> {
            buildFile(examplePath("product"), Files.createTempFile("landify", ".html"), "not-a-theme")
        }
        assertContains(error.message.orEmpty(), "unknown theme")
    }

    @Test
    fun `build applies a theme preset over the document`() {
        val input = examplePath("product")
        val output = Files.createTempFile("landify-theme", ".html")
        try {
            buildFile(input, output, "midnight")
            val html = Files.readString(output)
            assertTrue(html.contains("--primary: #22d3ee;"), "midnight primary not applied")
        } finally {
            Files.deleteIfExists(output)
        }
    }
}
