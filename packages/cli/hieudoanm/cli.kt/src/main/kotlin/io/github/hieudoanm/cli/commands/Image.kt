package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.google.gson.GsonBuilder
import java.io.File
import javax.imageio.ImageIO
import javax.imageio.ImageReader
import java.util.Locale

class ImageCommand : CliktCommand(name = "image", help = "Image inspection and conversion tools") {
    init {
        subcommands(ImageInfo(), ImageConvert(), ImageDominant())
    }
    override fun run() = Unit
}

class ImageInfo : CliktCommand(name = "info", help = "Show image metadata") {
    private val file: String by option("--file", "-f", help = "Image file").required()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val f = File(file)
        if (!f.exists()) {
            echo("file not found: $file", err = true)
            return
        }
        val input = ImageIO.createImageInputStream(f)
        val readers = ImageIO.getImageReaders(input)
        if (!readers.hasNext()) {
            echo("not a recognized image", err = true)
            return
        }
        val reader = readers.next()
        reader.input = input
        val width = reader.getWidth(0)
        val height = reader.getHeight(0)
        reader.dispose()
        input.close()

        val sizeKB = f.length() / 1024
        val format = reader.formatName

        if (jsonOutput) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            val json = mapOf(
                "file" to file,
                "format" to format,
                "width" to width,
                "height" to height,
                "sizeKB" to sizeKB
            )
            echo(gson.toJson(json))
        } else {
            echo("File     : $file")
            echo("Format   : $format")
            echo("Width    : ${width}px")
            echo("Height   : ${height}px")
            echo("Size     : ${sizeKB}KB")
        }
    }
}

class ImageConvert : CliktCommand(name = "convert", help = "Convert image to another format") {
    private val file: String by option("--file", "-i", help = "Input image file").required()
    private val toFormat: String by option("--format", "-f", help = "Output format (png, jpg, gif)").default("png")
    private val output: String? by option("--output", "-o", help = "Output file path")

    override fun run() {
        val f = File(file)
        if (!f.exists()) {
            echo("file not found: $file", err = true)
            return
        }
        val img = ImageIO.read(f) ?: run {
            echo("decode error: not a recognized image", err = true)
            return
        }

        val outPath = output ?: file.substringBeforeLast(".") + "." + toFormat
        val outFile = File(outPath)

        val formatLower = toFormat.lowercase(Locale.ROOT)
        val written = when (formatLower) {
            "jpg", "jpeg" -> ImageIO.write(img, "jpg", outFile)
            "png" -> ImageIO.write(img, "png", outFile)
            "gif" -> ImageIO.write(img, "gif", outFile)
            "bmp" -> ImageIO.write(img, "bmp", outFile)
            "wbmp" -> ImageIO.write(img, "wbmp", outFile)
            else -> {
                echo("unsupported format: $toFormat (use png, jpg, gif, bmp)", err = true)
                return
            }
        }
        if (!written) {
            echo("encode error: could not write $formatLower", err = true)
            return
        }
        echo("Converted to $outPath")
    }
}

class ImageDominant : CliktCommand(name = "dominant", help = "Extract dominant colors from an image") {
    private val file: String by option("--file", "-f", help = "Image file").required()
    private val jsonOutput: Boolean by option("--json", help = "Output in JSON format").flag()

    override fun run() {
        val f = File(file)
        if (!f.exists()) {
            echo("file not found: $file", err = true)
            return
        }
        val img = ImageIO.read(f) ?: run {
            echo("decode error: not a recognized image", err = true)
            return
        }

        val w = img.width
        val h = img.height
        val totalPixels = w * h
        val step = maxOf(1, totalPixels / 10000)
        val colorCount = mutableMapOf<String, Int>()

        var count = 0
        for (y in 0 until h) {
            for (x in 0 until w) {
                count++
                if (count % step != 0) continue
                val rgb = img.getRGB(x, y)
                val r = (rgb shr 16) and 0xFF
                val g = (rgb shr 8) and 0xFF
                val b = rgb and 0xFF
                val key = "#%02x%02x%02x".format(r, g, b)
                colorCount[key] = (colorCount[key] ?: 0) + 1
            }
        }

        val sampled = maxOf(1, count / step)
        val entries = colorCount.entries
            .sortedByDescending { it.value }
            .take(5)
            .map { (hex, c) ->
                val pct = c.toDouble() * 100.0 / sampled
                ColorEntry(hex, pct)
            }

        if (jsonOutput) {
            val gson = GsonBuilder().setPrettyPrinting().create()
            echo(gson.toJson(entries))
        } else {
            echo("Dominant colors for $file:\n")
            for (e in entries) {
                echo("  ${e.hex}  ${"%.1f".format(e.percentage)}%")
            }
        }
    }
}

data class ColorEntry(val hex: String, val percentage: Double)
