package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ColorsCommandTest {
    @Test
    fun testColorsConvertHex() {
        val cmd = ColorsCommand()
        val result = cmd.test("convert-hex '#FF6600'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "RGB")
        assertContains(result.stdout, "HSL")
        assertContains(result.stdout, "OKLCH")
        assertContains(result.stdout, "CMYK")
    }

    @Test
    fun testColorsConvertRgb() {
        val cmd = ColorsCommand()
        val result = cmd.test("convert-rgb 255 102 0")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "#FF6600")
    }

    @Test
    fun testColorsConvertHcl() {
        val cmd = ColorsCommand()
        val result = cmd.test("convert-hcl 200 30 60")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "HEX")
        assertContains(result.stdout, "RGB")
        assertContains(result.stdout, "HSL")
    }

    @Test
    fun testColorsConvertOklch() {
        val cmd = ColorsCommand()
        val result = cmd.test("convert-oklch 0.6 0.15 250")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "HEX")
        assertContains(result.stdout, "RGB")
        assertContains(result.stdout, "HSL")
    }

    @Test
    fun testColorsRandom() {
        val cmd = ColorsCommand()
        val result = cmd.test("random --max 3")
        assertEquals(0, result.statusCode)
        val lines = result.stdout.trim().lines()
        assertEquals(3, lines.size)
        lines.forEach { line -> assertContains(line, "rgb") }
    }

    @Test
    fun testColorsRandomSingle() {
        val cmd = ColorsCommand()
        val result = cmd.test("random")
        assertEquals(0, result.statusCode)
        val lines = result.stdout.trim().lines()
        assertEquals(1, lines.size)
        assertContains(lines[0], "rgb")
    }

    @Test
    fun testColorsRgbConstructor() {
        val c = ColorsRgb(r = 255, g = 102, b = 0)
        assertEquals(255, c.r)
        assertEquals(102, c.g)
        assertEquals(0, c.b)
    }

    @Test
    fun testColorsRgbIsValid() {
        assertTrue(ColorsRgb(0, 0, 0).isValid())
        assertTrue(ColorsRgb(255, 255, 255).isValid())
        assertTrue(ColorsRgb(128, 128, 128).isValid())
    }

    @Test
    fun testColorsRgbIsValidOutOfRange() {
        assertEquals(false, ColorsRgb(-1, 0, 0).isValid())
        assertEquals(false, ColorsRgb(0, 256, 0).isValid())
        assertEquals(false, ColorsRgb(0, 0, 300).isValid())
    }

    @Test
    fun testColorsRgbToHex() {
        assertEquals("#FF6600", ColorsRgb(255, 102, 0).toHex())
        assertEquals("#000000", ColorsRgb(0, 0, 0).toHex())
        assertEquals("#FFFFFF", ColorsRgb(255, 255, 255).toHex())
        assertEquals("#FF0000", ColorsRgb(255, 0, 0).toHex())
        assertEquals("#00FF00", ColorsRgb(0, 255, 0).toHex())
        assertEquals("#0000FF", ColorsRgb(0, 0, 255).toHex())
    }

    @Test
    fun testColorsRgbToHsl() {
        val (h, s, l) = ColorsRgb(255, 0, 0).toHsl()
        assertEquals(0.0, h, 0.1)
        assertEquals(100.0, s, 0.1)
        assertEquals(50.0, l, 0.1)
    }

    @Test
    fun testColorsRgbToHslGray() {
        val (h, s, l) = ColorsRgb(128, 128, 128).toHsl()
        assertEquals(0.0, h, 0.1)
        assertEquals(0.0, s, 0.1)
    }

    @Test
    fun testColorsRgbToHcl() {
        val (h, c, l) = ColorsRgb(255, 0, 0).toHcl()
        assertTrue(l > 0)
        assertTrue(c > 0)
    }

    @Test
    fun testColorsRgbToOklch() {
        val (L, C, H) = ColorsRgb(0, 255, 0).toOklch()
        assertTrue(L > 0)
        assertTrue(C >= 0)
        assertTrue(H >= 0)
    }

    @Test
    fun testColorsRgbToCmyk() {
        val cmyk = ColorsRgb(255, 0, 0).toCmyk()
        assertEquals(4, cmyk.size)
        assertEquals(0.0, cmyk[0], 0.1) // cyan
        assertEquals(100.0, cmyk[1], 0.1) // magenta
        assertEquals(100.0, cmyk[2], 0.1) // yellow
        assertEquals(0.0, cmyk[3], 0.1) // key
    }

    @Test
    fun testColorsRgbToCmykBlack() {
        val cmyk = ColorsRgb(0, 0, 0).toCmyk()
        assertEquals(0.0, cmyk[0], 0.1)
        assertEquals(0.0, cmyk[1], 0.1)
        assertEquals(0.0, cmyk[2], 0.1)
        assertEquals(100.0, cmyk[3], 0.1)
    }
}
