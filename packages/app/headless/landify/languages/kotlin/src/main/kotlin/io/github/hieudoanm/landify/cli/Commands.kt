package io.github.hieudoanm.landify.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.path
import io.github.hieudoanm.landify.render.buildFile
import io.github.hieudoanm.landify.render.validateFile
import io.github.hieudoanm.landify.render.writePlaceholder
import io.github.hieudoanm.landify.validate.knownTypes
import java.nio.file.Path

/** `landify new` — writes an annotated scaffold for a page type. */
class NewCommand : CliktCommand(name = "new") {
    private val file: Path by fileOption()

    private val type: String by option(
        "--type", "-t",
        help = "page type to scaffold: ${knownTypes().joinToString(" | ")}",
    ).default("product")

    private val force: Boolean by option(
        "--force", "-F",
        help = "overwrite an existing file",
    ).flag()

    override fun help(context: Context): String = """
        Create a landify.yaml with placeholder content.

        Writes the annotated example for the chosen page layout. Refuses to
        overwrite an existing file unless --force is given.
    """.trimIndent()

    override fun run() = reporting {
        writePlaceholder(file, type, force)
        echo("Created $file")
        echo("Next: landify validate")
        echo("then: landify build")
    }
}

/** `landify validate` — strict parse plus the per-type required-field report. */
class ValidateCommand : CliktCommand(name = "validate") {
    private val file: Path by fileOption()

    override fun help(context: Context): String = """
        Validate the schema of landify.yaml.

        Parses strictly — unknown fields and typos are rejected — and reports
        every missing required field. Exits non-zero when the file is invalid.
    """.trimIndent()

    override fun run() = reporting {
        validateFile(file)
        echo("$file is valid")
    }
}

/** `landify build` — the main pipeline: load, validate, render, write. */
class BuildCommand : CliktCommand(name = "build") {
    private val file: Path by fileOption()

    private val output: Path by option(
        "--output", "-o",
        help = "path to write the generated page",
    ).path(mustExist = false, canBeDir = false).default(Path.of("index.html"))

    private val theme: String by option(
        "--theme", "-t",
        help = "built-in theme preset overriding the YAML theme (see \"landify themes\")",
    ).default("")

    override fun help(context: Context): String = """
        Build index.html from landify.yaml.

        Reads the YAML file, validates its schema, renders the landing page
        template, and writes the result to index.html by default.
    """.trimIndent()

    override fun run() = reporting {
        buildFile(file, output, theme)
        echo("Built $output from $file")
    }
}
