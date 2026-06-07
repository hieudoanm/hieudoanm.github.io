package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import java.io.File
import java.net.URLDecoder
import java.net.URLEncoder
import java.text.Normalizer

class ConvertCommand : CliktCommand(name = "convert", help = "Text conversion tools") {
    init {
        subcommands(
            ConvertBase64(), ConvertBraille(), ConvertCamelcase(), ConvertCapitalise(),
            ConvertCount(), ConvertDeburr(), ConvertKebabcase(), ConvertLowercase(),
            ConvertMorse(), ConvertPascalcase(), ConvertSlug(), ConvertSnakecase(),
            ConvertUppercase(), ConvertUrl()
        )
    }
    override fun run() = Unit
}

class ConvertBase64 : CliktCommand(name = "base64", help = "Base64 encode/decode") {
    init {
        subcommands(ConvertBase64Encode(), ConvertBase64Decode())
    }
    override fun run() = Unit
}

class ConvertBase64Encode : CliktCommand(name = "encode", help = "Encode text/file to base64") {
    private val text by argument()
    private val file by option("--file", "-f", help = "File to encode (reads raw bytes → base64)")
    private val output by option("--output", "-o", help = "Write output to file instead of stdout")

    override fun run() {
        val input: ByteArray = if (file != null) {
            File(file!!).readBytes()
        } else {
            text.toByteArray()
        }
        val encoded = java.util.Base64.getEncoder().encodeToString(input)
        if (output != null) {
            File(output).writeText(encoded)
        } else {
            echo(encoded)
        }
    }
}

class ConvertBase64Decode : CliktCommand(name = "decode", help = "Decode base64 to text/file") {
    private val text by argument()
    private val file by option("--file", "-f", help = "File containing base64 to decode")
    private val output by option("--output", "-o", help = "Write decoded output to file instead of stdout")

    override fun run() {
        val input: ByteArray = if (file != null) {
            File(file!!).readBytes()
        } else {
            text.toByteArray()
        }
        val raw = String(input).trim().replace("\n", "")
        val cleaned = if (raw.contains("base64,")) raw.substringAfter("base64,") else raw
        val decoded = java.util.Base64.getDecoder().decode(cleaned)
        if (output != null) {
            File(output).writeBytes(decoded)
        } else {
            echo(String(decoded))
        }
    }
}

class ConvertBraille : CliktCommand(name = "braille", help = "Convert text to Braille") {
    private val text by argument()

    private val brailleMap = mapOf(
        'a' to "\u2801", 'b' to "\u2803", 'c' to "\u2809", 'd' to "\u2819", 'e' to "\u2811",
        'f' to "\u280B", 'g' to "\u281B", 'h' to "\u2813", 'i' to "\u280A", 'j' to "\u281A",
        'k' to "\u2805", 'l' to "\u2807", 'm' to "\u280D", 'n' to "\u281D", 'o' to "\u2815",
        'p' to "\u280F", 'q' to "\u281F", 'r' to "\u2817", 's' to "\u280E", 't' to "\u281E",
        'u' to "\u2825", 'v' to "\u2827", 'w' to "\u283A", 'x' to "\u282D", 'y' to "\u283D",
        'z' to "\u2835",
        '.' to "\u2832", ',' to "\u2802", ';' to "\u2806", ':' to "\u2812", '!' to "\u2816",
        '?' to "\u2826", '\'' to "\u2804", '-' to "\u2824", '(' to "\u2823", ')' to "\u283C",
        '"' to "\u2838"
    )

    override fun run() {
        val result = text.lowercase().map { ch -> brailleMap[ch] ?: ch.toString() }.joinToString("")
        echo(result)
    }
}

class ConvertCamelcase : CliktCommand(name = "camelcase", help = "Convert a string to camelCase") {
    private val text by argument()
    override fun run() {
        val words = text.split(Regex("[\\s_-]+"))
        val result = words.mapIndexed { i, w ->
            if (i == 0) w.lowercase() else w.replaceFirstChar { it.uppercase() }
        }.joinToString("")
        echo(result)
    }
}

class ConvertCapitalise : CliktCommand(name = "capitalise", help = "Capitalise the first letter of each word") {
    private val text by argument()
    override fun run() {
        val result = text.split(" ").joinToString(" ") { word ->
            if (word.isNotEmpty()) word.first().uppercase() + word.substring(1).lowercase() else word
        }
        echo(result)
    }
}

class ConvertCount : CliktCommand(name = "count", help = "Count characters, words, and lines in text") {
    private val text by argument()
    private val json by option("--json").flag()
    override fun run() {
        val chars = text.length
        val words = if (text.isBlank()) 0 else text.split(Regex("\\s+")).size
        val lines = if (text.isEmpty()) 0 else text.lines().size
        if (json) {
            echo("""{"characters":$chars,"words":$words,"lines":$lines}""")
        } else {
            echo("%8d %8d %8d".format(lines, words, chars))
        }
    }
}

class ConvertDeburr : CliktCommand(name = "deburr", help = "Remove diacritical marks (accents) from letters") {
    private val text by argument()
    override fun run() {
        val normalized = Normalizer.normalize(text, Normalizer.Form.NFD)
        val result = normalized.replace(Regex("\\p{M}"), "")
        echo(result)
    }
}

class ConvertKebabcase : CliktCommand(name = "kebabcase", help = "Convert a string to kebab-case") {
    private val text by argument()
    override fun run() {
        val kebab = text
            .replace(Regex("([a-z0-9])([A-Z])"), "$1-$2")
            .replace(" ", "-").replace("_", "-")
            .lowercase()
        echo(kebab)
    }
}

class ConvertLowercase : CliktCommand(name = "lowercase", help = "Convert a string to lowercase") {
    private val text by argument()
    override fun run() {
        echo(text.lowercase())
    }
}

class ConvertMorse : CliktCommand(name = "morse", help = "Convert text to Morse code") {
    private val text by argument()

    private val morseMap = mapOf(
        'a' to ".-", 'b' to "-...", 'c' to "-.-.", 'd' to "-..", 'e' to ".",
        'f' to "..-.", 'g' to "--.", 'h' to "....", 'i' to "..", 'j' to ".---",
        'k' to "-.-", 'l' to ".-..", 'm' to "--", 'n' to "-.", 'o' to "---",
        'p' to ".--.", 'q' to "--.-", 'r' to ".-.", 's' to "...", 't' to "-",
        'u' to "..-", 'v' to "...-", 'w' to ".--", 'x' to "-..-", 'y' to "-.--", 'z' to "--..",
        '1' to ".----", '2' to "..---", '3' to "...--", '4' to "....-", '5' to ".....",
        '6' to "-....", '7' to "--...", '8' to "---..", '9' to "----.", '0' to "-----",
        '.' to ".-.-.-", ',' to "--..--", ';' to "-.-.-.", ':' to "---...",
        '!' to "-.-.--", '?' to "..--..", '\'' to ".----.", '-' to "-....-",
        '(' to "-.--.", ')' to "-.--.-", '"' to ".-..-.", '/' to "-..-."
    )

    override fun run() {
        val result = text.lowercase().map { ch -> morseMap[ch] ?: ch.toString() }.joinToString(" ")
        echo(result)
    }
}

class ConvertPascalcase : CliktCommand(name = "pascalcase", help = "Convert a string to PascalCase") {
    private val text by argument()
    override fun run() {
        val result = text.split(Regex("[\\s_-]+"))
            .joinToString("") { w -> w.replaceFirstChar { it.uppercase() } }
        echo(result)
    }
}

class ConvertSlug : CliktCommand(name = "slug", help = "Generate a URL-friendly slug") {
    private val text by argument()
    override fun run() {
        val slug = text.lowercase()
            .replace(" ", "-")
            .replace(Regex("[^a-z0-9-]"), "")
            .replace(Regex("-+"), "-")
            .trim('-')
        echo(slug)
    }
}

class ConvertSnakecase : CliktCommand(name = "snakecase", help = "Convert a string to snake_case") {
    private val text by argument()
    override fun run() {
        val snake = text
            .replace(Regex("([a-z0-9])([A-Z])"), "$1_$2")
            .replace(" ", "_").replace("-", "_")
            .lowercase()
        echo(snake)
    }
}

class ConvertUppercase : CliktCommand(name = "uppercase", help = "Convert a string to uppercase") {
    private val text by argument()
    override fun run() {
        echo(text.uppercase())
    }
}

class ConvertUrl : CliktCommand(name = "url", help = "Encode or decode a URL") {
    private val text by argument()
    private val decode by option("--decode", "-d").flag()
    override fun run() {
        val result = if (decode) {
            URLDecoder.decode(text, "UTF-8")
        } else {
            URLEncoder.encode(text, "UTF-8")
        }
        echo(result)
    }
}
