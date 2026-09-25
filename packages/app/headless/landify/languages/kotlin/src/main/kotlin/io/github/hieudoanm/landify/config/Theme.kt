package io.github.hieudoanm.landify.config

import kotlinx.serialization.Serializable

/**
 * The design input. Only the base colors are authored; every other `:root`
 * token (surfaces, borders, text-on-accent, dark/tint variants) is derived from
 * them by [io.github.hieudoanm.landify.color.tokens]. [radius] is a CSS value,
 * not a color.
 */
@Serializable
data class Theme(
    val base: String = "",
    val primary: String = "",
    val secondary: String = "",
    val neutral: String = "",
    val info: String = "",
    val warning: String = "",
    val success: String = "",
    val error: String = "",
    val radius: String = "",
) {
    companion object {
        /** The fallback palette used for any theme field a YAML leaves empty. */
        fun defaults(): Theme = Theme(
            base = "#f7f8fa",
            primary = "#0d9488",
            secondary = "#7c3aed",
            neutral = "#555f6e",
            info = "#2563eb",
            warning = "#d97706",
            success = "#16a34a",
            error = "#dc2626",
            radius = "10px",
        )
    }
}

/**
 * Fills empty theme fields with their defaults, so a YAML that omits the whole
 * section (or individual colors) still resolves completely.
 */
fun Theme.merged(): Theme {
    val d = Theme.defaults()
    return Theme(
        base = base.ifEmpty { d.base },
        primary = primary.ifEmpty { d.primary },
        secondary = secondary.ifEmpty { d.secondary },
        neutral = neutral.ifEmpty { d.neutral },
        info = info.ifEmpty { d.info },
        warning = warning.ifEmpty { d.warning },
        success = success.ifEmpty { d.success },
        error = error.ifEmpty { d.error },
        radius = radius.ifEmpty { d.radius },
    )
}
