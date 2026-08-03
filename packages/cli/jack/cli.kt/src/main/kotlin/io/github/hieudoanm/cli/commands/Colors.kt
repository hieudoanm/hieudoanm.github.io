package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.types.int
import kotlin.random.Random
import kotlin.math.*

class ColorsCommand : CliktCommand(name = "colors", help = "Color conversion and palette generation tools") {
    init {
        subcommands(ColorsConvertHcl(), ColorsConvertHex(), ColorsConvertOklch(), ColorsConvertRgb(), ColorsPalette(), ColorsRandom())
    }
    override fun run() = Unit
}

data class ColorsRgb(val r: Int, val g: Int, val b: Int) {
    fun isValid() = r in 0..255 && g in 0..255 && b in 0..255
    fun toHex(): String {
        require(isValid()) { "invalid RGB" }
        return "#%02X%02X%02X".format(r, g, b)
    }
    fun toHsl(): Triple<Double, Double, Double> {
        val rf = r / 255.0; val gf = g / 255.0; val bf = b / 255.0
        val mx = maxOf(rf, gf, bf); val mn = minOf(rf, gf, bf)
        var h = 0.0; var s = 0.0; val l = (mx + mn) / 2
        if (mx != mn) {
            val d = mx - mn
            s = if (l > 0.5) d / (2 - mx - mn) else d / (mx + mn)
            h = when (mx) {
                rf -> (gf - bf) / d + if (gf < bf) 6.0 else 0.0
                gf -> (bf - rf) / d + 2.0
                else -> (rf - gf) / d + 4.0
            }
            h *= 60
        }
        return Triple(h, s * 100, l * 100)
    }
    fun toHcl(): Triple<Double, Double, Double> {
        fun linearize(v: Double) = if (v <= 0.04045) v / 12.92 else ((v + 0.055) / 1.055).pow(2.4)
        val R = linearize(r / 255.0); val G = linearize(g / 255.0); val B = linearize(b / 255.0)
        val X = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B
        val Y = 0.2126729 * R + 0.7151522 * G + 0.0721750 * B
        val Z = 0.0193339 * R + 0.1191920 * G + 0.9503041 * B
        val refX = 0.95047; val refY = 1.00000; val refZ = 1.08883
        fun f(t: Double) = if (t > 0.008856) t.pow(1.0 / 3) else 7.787 * t + 16.0 / 116
        val fx = f(X / refX); val fy = f(Y / refY); val fz = f(Z / refZ)
        val L = 116 * fy - 16
        val a = 500 * (fx - fy); val bb = 200 * (fy - fz)
        val c = sqrt(a * a + bb * bb)
        var hh = atan2(bb, a) * 180 / PI
        if (hh < 0) hh += 360
        return Triple(hh, c, L)
    }
    fun toOklch(): Triple<Double, Double, Double> {
        fun toLinear(v: Double) = if (v <= 0.04045) v / 12.92 else ((v + 0.055) / 1.055).pow(2.4)
        val R = toLinear(r / 255.0); val G = toLinear(g / 255.0); val B = toLinear(b / 255.0)
        val l_ = 0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B
        val m_ = 0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B
        val s_ = 0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B
        val cL = 0.2104542553 * l_.pow(1.0 / 3) + 0.7936177850 * m_.pow(1.0 / 3) - 0.0040720468 * s_.pow(1.0 / 3)
        val A = 1.9779984951 * l_.pow(1.0 / 3) - 2.4285922050 * m_.pow(1.0 / 3) + 0.4505937099 * s_.pow(1.0 / 3)
        val Bb = 0.0259040371 * l_.pow(1.0 / 3) + 0.7827717662 * m_.pow(1.0 / 3) - 0.8086757660 * s_.pow(1.0 / 3)
        val C = sqrt(A * A + Bb * Bb)
        var H = atan2(Bb, A) * 180 / PI
        if (H < 0) H += 360
        return Triple(cL, C, H)
    }
    fun toCmyk(): List<Double> {
        val rf = r / 255.0; val gf = g / 255.0; val bf = b / 255.0
        val k = 1 - maxOf(rf, gf, bf)
        if (k == 1.0) return listOf(0.0, 0.0, 0.0, 100.0)
        val c = (1 - rf - k) / (1 - k) * 100
        val m = (1 - gf - k) / (1 - k) * 100
        val y = (1 - bf - k) / (1 - k) * 100
        return listOf(c, m, y, k * 100)
    }
}

private fun hexToRgb(hex: String): ColorsRgb {
    var h = hex.trimStart('#')
    if (h.length == 3) h = h.map { "$it$it" }.joinToString("")
    require(h.length == 6) { "invalid hex length" }
    return ColorsRgb(h.substring(0, 2).toInt(16), h.substring(2, 4).toInt(16), h.substring(4, 6).toInt(16))
}

private fun isValidHex(hex: String): Boolean {
    val h = hex.trimStart('#')
    return (h.length == 6 || h.length == 3) && h.all { it in '0'..'9' || it in 'a'..'f' || it in 'A'..'F' }
}

private fun hslToHex(h: Double, s: Double, l: Double): String {
    val ss = s / 100; val ll = l / 100
    val c = (1 - abs(2 * ll - 1)) * ss
    val x = c * (1 - abs((h / 60).let { if (it >= 4.0) it - 4 else if (it >= 2.0) it - 2 else it } - 1))
    val m = ll - c / 2
    val (r, g, b) = when {
        h < 60 -> Triple(c, x, 0.0); h < 120 -> Triple(x, c, 0.0); h < 180 -> Triple(0.0, c, x)
        h < 240 -> Triple(0.0, x, c); h < 300 -> Triple(x, 0.0, c); else -> Triple(c, 0.0, x)
    }
    fun clamp(v: Double) = round((v + m) * 255).toInt().coerceIn(0, 255)
    return "#%02x%02x%02x".format(clamp(r), clamp(g), clamp(b))
}

private fun rgbFromHcl(h: Double, c: Double, l: Double): ColorsRgb {
    val hRad = h * PI / 180
    val a = c * cos(hRad); val bb = c * sin(hRad)
    val fY = (l + 16) / 116; val fX = a / 500 + fY; val fZ = fY - bb / 200
    fun finv(t: Double) = if (t * t * t > 0.008856) t * t * t else (t - 16.0 / 116) / 7.787
    val X = 0.95047 * finv(fX); val Y = 1.00000 * finv(fY); val Z = 1.08883 * finv(fZ)
    val Rlin = 3.2404542 * X - 1.5371385 * Y - 0.4985314 * Z
    val Glin = -0.9692660 * X + 1.8760108 * Y + 0.0415560 * Z
    val Blin = 0.0556434 * X - 0.2040259 * Y + 1.0572252 * Z
    fun toSRGB(u: Double): Int {
        val v = when {
            u <= 0 -> 0.0; u >= 1 -> 1.0; u <= 0.0031308 -> 12.92 * u
            else -> 1.055 * u.pow(1 / 2.4) - 0.055
        }
        return round(v * 255).toInt().coerceIn(0, 255)
    }
    return ColorsRgb(toSRGB(Rlin), toSRGB(Glin), toSRGB(Blin))
}

private fun rgbFromOklch(L: Double, C: Double, H: Double): ColorsRgb {
    val hRad = H * PI / 180
    val a = C * cos(hRad); val bb = C * sin(hRad)
    val l_ = L + 0.3963377774 * a + 0.2158037573 * bb
    val m_ = L - 0.1055613458 * a - 0.0638541728 * bb
    val s_ = L - 0.0894841775 * a - 1.2914855480 * bb
    val Rlin = 4.0767416621 * l_.pow(1.0 / 3) - 3.3077115913 * m_.pow(1.0 / 3) + 0.2309699292 * s_.pow(1.0 / 3)
    val Glin = -1.2684380046 * l_.pow(1.0 / 3) + 2.6097574011 * m_.pow(1.0 / 3) - 0.3413193965 * s_.pow(1.0 / 3)
    val Blin = -0.0041960863 * l_.pow(1.0 / 3) - 0.7034186147 * m_.pow(1.0 / 3) + 1.7076147010 * s_.pow(1.0 / 3)
    fun toSRGB(u: Double): Int {
        val v = when {
            u <= 0 -> 0.0; u >= 1 -> 1.0; u <= 0.0031308 -> 12.92 * u
            else -> 1.055 * u.pow(1 / 2.4) - 0.055
        }
        return round(v * 255).toInt().coerceIn(0, 255)
    }
    return ColorsRgb(toSRGB(Rlin), toSRGB(Glin), toSRGB(Blin))
}

class ColorsConvertHcl : CliktCommand(name = "convert-hcl", help = "Convert HCL values to other color spaces") {
    private val h by argument("hue")
    private val c by argument("chroma")
    private val l by argument("lightness")
    override fun run() {
        val hue = h.toDouble(); val chroma = c.toDouble(); val lightness = l.toDouble()
        val rgb = rgbFromHcl(hue, chroma, lightness)
        echo("HEX    : ${rgb.toHex()}")
        echo("RGB    : rgb(${rgb.r}, ${rgb.g}, ${rgb.b})")
        val (hs, ss, ls) = rgb.toHsl()
        echo("HSL    : h=${"%.2f".format(hs)}°, s=${"%.2f".format(ss)}%, l=${"%.2f".format(ls)}%")
        val (hclH, hclC, hclL) = rgb.toHcl()
        echo("HCL    : h=${"%.2f".format(hclH)}°, c=${"%.2f".format(hclC)}, l=${"%.2f".format(hclL)}")
        val (okL, okC, okH) = rgb.toOklch()
        echo("OKLCH  : L=${"%.3f".format(okL)}, C=${"%.3f".format(okC)}, H=${"%.2f".format(okH)}°")
        val cmyk = rgb.toCmyk()
        echo("CMYK   : C=${"%.3f".format(cmyk[0])}, M=${"%.3f".format(cmyk[1])}, Y=${"%.3f".format(cmyk[2])}, K=${"%.3f".format(cmyk[3])}")
    }
}

class ColorsConvertHex : CliktCommand(name = "convert-hex", help = "Convert a HEX color to other color spaces") {
    private val hex by argument("hex color, e.g. #FF6600")
    override fun run() {
        val rgb = hexToRgb(hex)
        echo("RGB    : rgb(${rgb.r}, ${rgb.g}, ${rgb.b})")
        val (hs, ss, ls) = rgb.toHsl()
        echo("HSL    : h=${"%.2f".format(hs)}°, s=${"%.2f".format(ss)}%, l=${"%.2f".format(ls)}%")
        val (hclH, hclC, hclL) = rgb.toHcl()
        echo("HCL    : h=${"%.2f".format(hclH)}°, c=${"%.2f".format(hclC)}, l=${"%.2f".format(hclL)}")
        val (okL, okC, okH) = rgb.toOklch()
        echo("OKLCH  : L=${"%.3f".format(okL)}, C=${"%.3f".format(okC)}, H=${"%.2f".format(okH)}°")
        val cmyk = rgb.toCmyk()
        echo("CMYK   : C=${"%.3f".format(cmyk[0])}, M=${"%.3f".format(cmyk[1])}, Y=${"%.3f".format(cmyk[2])}, K=${"%.3f".format(cmyk[3])}")
    }
}

class ColorsConvertOklch : CliktCommand(name = "convert-oklch", help = "Convert OKLCH values to other color spaces") {
    private val lightness by argument("lightness 0-1")
    private val chroma by argument("chroma")
    private val hue by argument("hue 0-360")
    override fun run() {
        val L = lightness.toDouble(); val C = chroma.toDouble(); val H = hue.toDouble()
        val rgb = rgbFromOklch(L, C, H)
        echo("HEX    : ${rgb.toHex()}")
        echo("RGB    : rgb(${rgb.r}, ${rgb.g}, ${rgb.b})")
        val (hs, ss, ls) = rgb.toHsl()
        echo("HSL    : h=${"%.2f".format(hs)}°, s=${"%.2f".format(ss)}%, l=${"%.2f".format(ls)}%")
        val (hclH, hclC, hclL) = rgb.toHcl()
        echo("HCL    : h=${"%.2f".format(hclH)}°, c=${"%.2f".format(hclC)}, l=${"%.2f".format(hclL)}")
        val (okL, okC, okH) = rgb.toOklch()
        echo("OKLCH  : L=${"%.3f".format(okL)}, C=${"%.3f".format(okC)}, H=${"%.2f".format(okH)}°")
        val cmyk = rgb.toCmyk()
        echo("CMYK   : C=${"%.3f".format(cmyk[0])}, M=${"%.3f".format(cmyk[1])}, Y=${"%.3f".format(cmyk[2])}, K=${"%.3f".format(cmyk[3])}")
    }
}

class ColorsConvertRgb : CliktCommand(name = "convert-rgb", help = "Convert RGB values to other color spaces") {
    private val r by argument("red 0-255")
    private val g by argument("green 0-255")
    private val b by argument("blue 0-255")
    override fun run() {
        val rgb = ColorsRgb(r.toInt(), g.toInt(), b.toInt())
        echo("HEX    : ${rgb.toHex()}")
        val (hs, ss, ls) = rgb.toHsl()
        echo("HSL    : h=${"%.2f".format(hs)}°, s=${"%.2f".format(ss)}%, l=${"%.2f".format(ls)}%")
        val (hclH, hclC, hclL) = rgb.toHcl()
        echo("HCL    : h=${"%.2f".format(hclH)}°, c=${"%.2f".format(hclC)}, l=${"%.2f".format(hclL)}")
        val (okL, okC, okH) = rgb.toOklch()
        echo("OKLCH  : L=${"%.3f".format(okL)}, C=${"%.3f".format(okC)}, H=${"%.2f".format(okH)}°")
        val cmyk = rgb.toCmyk()
        echo("CMYK   : C=${"%.3f".format(cmyk[0])}, M=${"%.3f".format(cmyk[1])}, Y=${"%.3f".format(cmyk[2])}, K=${"%.3f".format(cmyk[3])}")
    }
}

class ColorsPalette : CliktCommand(name = "palette", help = "Generate a color palette from a base HEX color") {
    private val hex by argument("base hex color, e.g. #ff6600")
    override fun run() {
        if (!isValidHex(hex)) throw Exception("Invalid hex color")
        val rgb = hexToRgb(hex)
        val (h, s, l) = rgb.toHsl()
        echo()
        echo("Choose palette style:")
        echo("1. Balanced professional (Triadic)")
        echo("2. High-contrast (Complementary)")
        echo("3. Soft aesthetic (Analogous)")
        echo()
        print("Select (1-3): ")
        val choice = readLine()?.trim() ?: "1"
        val (base, support, accent) = when (choice) {
            "2" -> Triple(h, h + 30, h + 180)
            "3" -> Triple(h, h - 30, h + 30)
            else -> Triple(h, h + 120, h + 240)
        }
        fun norm(v: Double) = ((v % 360) + 360) % 360
        val bn = norm(base); val sn = norm(support); val an = norm(accent)
        val baseHex = hslToHex(bn, s, l)
        val supportHex = hslToHex(sn, s, l)
        val accentHex = hslToHex(an, s, l)
        echo()
        echo("Generated Palette:")
        echo("Base:    $baseHex  (H=${"%.0f".format(bn)})")
        echo("Support: $supportHex  (H=${"%.0f".format(sn)})")
        echo("Accent:  $accentHex  (H=${"%.0f".format(an)})")
        echo()
    }
}

class ColorsRandom : CliktCommand(name = "random", help = "Generate random HEX colors with RGB preview") {
    private val max by option("--max", "-m", help = "Number of random colors").int().default(1)
    override fun run() {
        for (i in 0 until max) {
            val r = Random.nextInt(256); val g = Random.nextInt(256); val b = Random.nextInt(256)
            val hex = "#%02X%02X%02X".format(r, g, b)
            echo("$hex - rgb($r, $g, $b)")
        }
    }
}
