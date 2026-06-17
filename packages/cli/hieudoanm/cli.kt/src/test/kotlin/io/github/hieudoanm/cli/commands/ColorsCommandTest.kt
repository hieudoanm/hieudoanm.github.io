package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

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
}
