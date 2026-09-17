package io.github.hieudoanm.landify.color

import io.github.hieudoanm.landify.config.Theme

/** One derived CSS custom property. */
typealias Token = Pair<String, String>

/**
 * Expands a [Theme] into every `:root` custom property, sorted by token name so
 * the generated CSS is stable across runs. Only the authored colors are inputs;
 * the rest are derived:
 *
 * - `base` → `base-100`, and `base-200`/`base-300` via tint/shade
 * - `neutral` → `neutral-faint`, `border`, `border-soft` (tints on base)
 * - every `*-content` by WCAG contrast
 * - `info`/`warning`/`success`/`error`/`radius` passed through
 *
 * @throws IllegalArgumentException when any authored color is not `#RRGGBB`.
 */
fun tokens(theme: Theme): List<Token> {
    val base = parseHex(theme.base)
    val primary = parseHex(theme.primary)
    val secondary = parseHex(theme.secondary)
    val neutral = parseHex(theme.neutral)
    listOf(theme.info, theme.warning, theme.success, theme.error).forEach(::parseHex)

    val derived = derivedTokens(theme, base, primary, secondary, neutral)
    return derived.sortedBy { it.first }
}

private fun derivedTokens(
    theme: Theme,
    base: Rgb,
    primary: Rgb,
    secondary: Rgb,
    neutral: Rgb,
): List<Token> {
    val baseLum = luminance(base)
    val strength = if (baseLum < 0.35) DarkBase else LightBase
    return listOf(
        "base-100" to theme.base,
        "base-200" to hex(tint(base.r, 255, strength.two), tint(base.g, 255, strength.two), tint(base.b, 255, strength.two)),
        "base-300" to hex(shade(base.r, strength.three), shade(base.g, strength.three), shade(base.b, strength.three)),
        "base-content" to contrastingText(base),
        "primary" to theme.primary,
        "primary-dark" to hex(shade(primary.r, 0.15), shade(primary.g, 0.15), shade(primary.b, 0.15)),
        "primary-soft" to hex(tint(primary.r, base.r, 0.88), tint(primary.g, base.g, 0.88), tint(primary.b, base.b, 0.88)),
        "primary-content" to contrastingText(primary),
        "secondary" to theme.secondary,
        "secondary-content" to contrastingText(secondary),
        "neutral" to theme.neutral,
        "neutral-faint" to hex(tint(neutral.r, base.r, 0.45), tint(neutral.g, base.g, 0.45), tint(neutral.b, base.b, 0.45)),
        "border" to theme.neutral,
        "border-soft" to hex(tint(neutral.r, base.r, 0.60), tint(neutral.g, base.g, 0.60), tint(neutral.b, base.b, 0.60)),
        "info" to theme.info,
        "warning" to theme.warning,
        "success" to theme.success,
        "error" to theme.error,
        "radius" to theme.radius,
    )
}

/** Blend strengths for the two surface ramps: light canvases and dark ones. */
private data class BaseRamp(val two: Double, val three: Double)

private val LightBase = BaseRamp(0.85, 0.03)
private val DarkBase = BaseRamp(0.10, 0.08)

/** Moves [c] toward [base] (255 for a white target) by [strength]. */
private fun tint(c: Int, base: Int, strength: Double): Int = roundHalfUp(c + (base - c) * strength)

/** Darkens [c] by [strength]. */
private fun shade(c: Int, strength: Double): Int = roundHalfUp(c * (1 - strength))

/**
 * Renders tokens as `--name: value;` declarations, eight-space indented to sit
 * inside a template's `<style> :root { ... }` block.
 */
fun themeCss(tokens: List<Token>): String = buildString {
    tokens.forEach { (name, value) -> append("        --$name: $value;\n") }
}
