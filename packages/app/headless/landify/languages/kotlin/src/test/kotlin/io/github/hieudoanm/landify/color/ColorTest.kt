package io.github.hieudoanm.landify.color

import io.github.hieudoanm.landify.config.Theme
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

private const val TOLERANCE = 1e-9

class ColorTest {
    @Test
    fun `a hex colour parses to its channels`() {
        assertEquals(Rgb(0x0d, 0x94, 0x88), parseHex("#0d9488"))
    }

    @Test
    fun `the hash is optional, as in the upstream parser`() {
        assertEquals(Rgb(0x0d, 0x94, 0x88), parseHex("0d9488"))
    }

    @Test
    fun `a malformed colour is rejected`() {
        for (bad in listOf("", "#fff", "not-a-color", "#0d9488ff", "#gggggg")) {
            assertFailsWith<IllegalArgumentException>("expected '$bad' to be rejected") { parseHex(bad) }
        }
    }

    @Test
    fun `channels round-trip back to hex`() {
        assertEquals("#0d9488", hex(0x0d, 0x94, 0x88))
        assertEquals("#0d9488", parseHex("#0d9488").hex())
    }

    @Test
    fun `luminance follows the WCAG sRGB weights`() {
        assertEquals(0.0, luminance(Rgb(0, 0, 0)), TOLERANCE)
        assertEquals(1.0, luminance(Rgb(255, 255, 255)), TOLERANCE)
        assertTrue(luminance(Rgb(255, 255, 255)) > luminance(Rgb(0x0d, 0x94, 0x88)))
    }

    @Test
    fun `contrasting text picks dark ink on light backgrounds`() {
        assertEquals("#181d25", contrastingText(Rgb(255, 255, 255)))
        assertEquals("#ffffff", contrastingText(Rgb(0x0d, 0x94, 0x88)))
    }

    @Test
    fun `rounding is half-up, not bankers rounding`() {
        assertEquals(1, roundHalfUp(0.5))
        assertEquals(2, roundHalfUp(1.5))
        assertEquals(3, roundHalfUp(2.5))
        assertEquals(0, roundHalfUp(0.4))
    }

    @Test
    fun `tokens are sorted so the generated CSS is stable`() {
        val names = tokens(Theme()).map { it.first }
        assertEquals(names.sorted(), names, "tokens must be emitted in a stable order")
    }

    @Test
    fun `theme css renders one declaration per token`() {
        val css = themeCss(tokens(Theme()))
        assertTrue(css.contains("--primary: #0d9488;"), css)
        assertTrue(css.contains("--radius: 10px;"), css)
    }

    @Test
    fun `an invalid theme colour fails loudly rather than rendering garbage`() {
        assertFailsWith<IllegalArgumentException> { tokens(Theme(primary = "not-a-color")) }
    }
}
