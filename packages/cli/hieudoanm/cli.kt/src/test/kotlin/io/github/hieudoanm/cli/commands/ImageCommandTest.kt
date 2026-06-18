package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import java.io.File
import javax.imageio.ImageIO
import java.awt.image.BufferedImage

class ImageCommandTest {
    private val testPng = "/tmp/test-image.png"

    private fun ensureTestImage() {
        if (!File(testPng).exists()) {
            val img = BufferedImage(10, 10, BufferedImage.TYPE_INT_RGB)
            ImageIO.write(img, "png", File(testPng))
        }
    }

    @Test
    fun testImageInfo() {
        ensureTestImage()
        val cmd = ImageCommand()
        val result = cmd.test("info --file $testPng")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Format")
        assertContains(result.stdout, "Width")
        assertContains(result.stdout, "Height")
    }

    @Test
    fun testImageInfoJson() {
        ensureTestImage()
        val cmd = ImageCommand()
        val result = cmd.test("info --file $testPng --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "format")
        assertContains(result.stdout, "width")
        assertContains(result.stdout, "height")
    }

    @Test
    fun testImageConvert() {
        ensureTestImage()
        val out = "/tmp/test-image-converted.jpg"
        val cmd = ImageCommand()
        val result = cmd.test("convert --file $testPng --format jpg --output $out")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Converted")
        assertTrue(File(out).exists())
    }

    @Test
    fun testImageDominant() {
        ensureTestImage()
        val cmd = ImageCommand()
        val result = cmd.test("dominant --file $testPng")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Dominant")
    }

    @Test
    fun testColorEntryDataClass() {
        val entry = ColorEntry(hex = "#FF6600", percentage = 45.5)
        assertEquals("#FF6600", entry.hex)
        assertEquals(45.5, entry.percentage, 0.001)
    }
}
