package io.github.hieudoanm.landify.render

import io.github.hieudoanm.landify.validate.knownTypes

/**
 * Loads the embedded page templates and partials.
 *
 * The Go original embeds `static/` with `//go:embed` and globs it; a JVM jar
 * has no equivalent of a resource-directory glob, so the fixed set of names is
 * listed here instead. That keeps asset lookup deterministic and works from
 * inside a packaged jar, which is how the launcher runs.
 */
object Assets {
    private const val TEMPLATE_DIR = "assets/templates"
    private const val PARTIAL_DIR = "assets/partials"
    private const val EXAMPLE_DIR = "assets/examples"

    /** The 12 page templates plus the 3 partials, keyed by file name. */
    fun sources(): Map<String, String> = buildMap {
        knownTypes().forEach { type -> put("template-$type.j2", template(type)) }
        listOf("base-css", "footer", "header").forEach { name -> put("$name.j2", partial(name)) }
    }

    /** The page template for a page type, e.g. `template-product.j2`. */
    fun template(type: String): String = read("$TEMPLATE_DIR/template-$type.j2")

    /** A shared partial, e.g. `header.j2`. */
    fun partial(name: String): String = read("$PARTIAL_DIR/$name.j2")

    /** The example configuration for a page type, used by `landify new`. */
    fun example(type: String): String = read("$EXAMPLE_DIR/example-$type.yaml")

    private fun read(path: String): String =
        Assets::class.java.classLoader.getResourceAsStream(path)
            ?.use { it.readBytes().toString(Charsets.UTF_8) }
            ?: throw IllegalStateException("missing embedded asset: $path")
}
