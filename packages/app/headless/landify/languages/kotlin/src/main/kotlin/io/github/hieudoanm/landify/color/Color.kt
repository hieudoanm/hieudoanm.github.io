package io.github.hieudoanm.landify.color

import kotlin.math.pow

/** An sRGB color with 8-bit channels. */
data class Rgb(val r: Int, val g: Int, val b: Int)

/**
 * Parses a `#RRGGBB` color (the `#` is optional) into channels.
 *
 * @throws IllegalArgumentException when the value is not six hex digits.
 */
fun parseHex(value: String): Rgb {
    val s = value.trim().removePrefix("#")
    require(s.length == 6) { "parse \"$s\": want #RRGGBB" }
    val n = s.toLongOrNull(16) ?: throw IllegalArgumentException("parse \"$s\": not a hex color")
    return Rgb((n shr 16).toInt(), ((n shr 8) and 0xff).toInt(), (n and 0xff).toInt())
}

/** Formats channels as a lowercase `#rrggbb` string. */
fun hex(r: Int, g: Int, b: Int): String = "#%02x%02x%02x".format(r, g, b)

/** Formats an [Rgb] as a lowercase `#rrggbb` string. */
fun Rgb.hex(): String = hex(r, g, b)

/**
 * Picks the readable foreground for a background: near-black on light
 * backgrounds, white on dark ones, using WCAG relative luminance.
 */
fun contrastingText(c: Rgb): String = if (luminance(c) >= 0.5) "#181d25" else "#ffffff"

/** The WCAG relative luminance of an sRGB color. */
fun luminance(c: Rgb): Double = 0.2126 * linear(c.r) + 0.7152 * linear(c.g) + 0.0722 * linear(c.b)

private fun linear(channel: Int): Double {
    val v = channel / 255.0
    return if (v <= 0.04045) v / 12.92 else ((v + 0.055) / 1.055).pow(2.4)
}

/**
 * Rounds half away from zero, matching Go's `math.Round`.
 *
 * `kotlin.math.round` rounds halves to even, which would diverge from the Go
 * original on exact `.5` channel values and shift a derived hex token.
 */
internal fun roundHalfUp(value: Double): Int = kotlin.math.floor(value + 0.5).toInt()
