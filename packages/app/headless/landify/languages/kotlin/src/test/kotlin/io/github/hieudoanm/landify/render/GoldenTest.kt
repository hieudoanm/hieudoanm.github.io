package io.github.hieudoanm.landify.render

import java.nio.file.Files
import java.nio.file.Path
import kotlin.test.Test
import kotlin.test.assertEquals

/**
 * Golden parity: the rendered page for every type must byte-match the Go
 * binary's output, including the two themed variants.
 */
class GoldenTest {
    @Test
    fun `product matches the golden byte for byte`() = assertParity("product", "", "product.html")

    @Test
    fun `product with the midnight preset matches the golden`() =
        assertParity("product", "midnight", "product-midnight.html")

    @Test
    fun `linktree matches the golden byte for byte`() = assertParity("linktree", "", "linktree.html")

    @Test
    fun `linktree with the abyss preset matches the golden`() =
        assertParity("linktree", "abyss", "linktree-abyss.html")

    @Test
    fun `app matches the golden byte for byte`() = assertParity("app", "", "app.html")

    @Test
    fun `docs matches the golden byte for byte`() = assertParity("docs", "", "docs.html")

    @Test
    fun `download matches the golden byte for byte`() = assertParity("download", "", "download.html")

    @Test
    fun `event matches the golden byte for byte`() = assertParity("event", "", "event.html")

    @Test
    fun `faq matches the golden byte for byte`() = assertParity("faq", "", "faq.html")

    @Test
    fun `portfolio matches the golden byte for byte`() = assertParity("portfolio", "", "portfolio.html")

    @Test
    fun `pricing matches the golden byte for byte`() = assertParity("pricing", "", "pricing.html")

    @Test
    fun `status matches the golden byte for byte`() = assertParity("status", "", "status.html")

    @Test
    fun `team matches the golden byte for byte`() = assertParity("team", "", "team.html")

    @Test
    fun `waitlist matches the golden byte for byte`() = assertParity("waitlist", "", "waitlist.html")
}

/** Builds `example-<type>.yaml` and compares the output with `golden/<golden>`. */
private fun assertParity(type: String, theme: String, golden: String) {
    val input = examplePath(type)
    val output = Files.createTempFile("landify-$type", ".html")
    try {
        buildFile(input, output, theme)
        val expected = resourceBytes("golden/$golden")
        assertContentEquals(expected, Files.readAllBytes(output), "$type (theme: '$theme')")
    } finally {
        Files.deleteIfExists(output)
    }
}

/** Compares two byte arrays, reporting the first divergence rather than a hash. */
private fun assertContentEquals(expected: ByteArray, actual: ByteArray, label: String) {
    if (expected.contentEquals(actual)) return
    val at = expected.zip(actual).indexOfFirst { (want, got) -> want != got }
        .let { if (it < 0) minOf(expected.size, actual.size) else it }
    val context = 40
    val from = (at - context).coerceAtLeast(0)
    assertEquals(
        expected.size,
        actual.size,
        "$label: length differs; first difference at byte $at\n" +
            "  expected: ${String(expected.copyOfRange(from, minOf(expected.size, at + context)))}\n" +
            "  actual:   ${String(actual.copyOfRange(from, minOf(actual.size, at + context)))}",
    )
}

/** Reads a classpath resource, failing the test when it is missing. */
internal fun resourceBytes(name: String): ByteArray =
    checkNotNull(GoldenTest::class.java.classLoader.getResourceAsStream(name)) {
        "missing resource $name"
    }.use { it.readBytes() }

/** Writes a classpath resource to a temporary file and returns its path. */
internal fun examplePath(type: String): Path {
    val bytes = resourceBytes("assets/examples/example-$type.yaml")
    val file = Files.createTempFile("landify-$type", ".yaml")
    Files.write(file, bytes)
    file.toFile().deleteOnExit()
    return file
}
