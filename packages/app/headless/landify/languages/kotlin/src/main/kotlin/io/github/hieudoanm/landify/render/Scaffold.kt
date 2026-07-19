package io.github.hieudoanm.landify.render

import io.github.hieudoanm.landify.validate.knownTypes
import io.github.hieudoanm.landify.validate.normalizeType
import java.nio.file.Files
import java.nio.file.Path

/**
 * The annotated `landify.yaml` scaffold for a page type.
 *
 * The scaffold is the embedded example config verbatim, so `landify new` and
 * the example gallery can never drift apart.
 *
 * @throws LandifyException when [type] is not one of [knownTypes].
 */
fun placeholder(type: String): String {
    val kind = normalizeType(type)
    if (kind !in knownTypes()) {
        throw LandifyException(
            "type \"$kind\" is not supported (available: ${knownTypes().joinToString(", ")})",
        )
    }
    return Assets.example(kind)
}

/**
 * Writes the scaffold for [type] to [path], creating parent directories.
 *
 * @throws LandifyException when [path] already exists and [force] is false, or
 *   when the type is unknown.
 */
fun writePlaceholder(path: Path, type: String, force: Boolean = false) {
    if (Files.exists(path) && !force) {
        throw LandifyException("$path already exists (use --force to overwrite)")
    }
    runCatching { path.toFile().writeText(placeholder(type)) }
        .getOrElse { throw LandifyException("write $path: ${it.message}") }
}
