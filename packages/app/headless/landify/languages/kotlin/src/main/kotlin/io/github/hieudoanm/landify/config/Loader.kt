package io.github.hieudoanm.landify.config

import com.charleskorn.kaml.Yaml
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import java.nio.file.Path
import kotlin.io.path.readText

/**
 * Decodes `landify.yaml` into a [Config].
 *
 * kaml's default configuration has `strictMode = true`, which rejects unknown
 * properties. That is the same contract as the Go original's
 * `yaml.Decoder.KnownFields(true)`, so a typo'd key is a parse error rather
 * than a silently ignored field.
 *
 * @throws com.charleskorn.kaml.YamlException when the YAML is malformed, has
 *   an unknown key, or a value of the wrong shape.
 */
fun loadYaml(text: String): Config {
    val parsed = Yaml.default.decodeFromString<Config>(text)
    return parsed.copy(theme = parsed.theme.merged())
}

/** Reads and decodes [path], merging empty theme fields from the defaults. */
fun loadYamlFile(path: Path): Config = loadYaml(path.readText())

/**
 * Encodes [config] back to YAML.
 *
 * Used by the terminal editor's `theme` command, which rewrites the buffer with
 * a preset applied. Because kaml writes defaults, the result is fully expanded
 * rather than preserving the author's comments.
 */
fun dumpYaml(config: Config): String = Yaml.default.encodeToString(config)
