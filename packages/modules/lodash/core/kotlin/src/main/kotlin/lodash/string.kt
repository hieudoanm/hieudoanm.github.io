package lodash

/**
 * Converts string to camel case.
 */
fun camelCase(str: String?): String {
    if (str == null) return ""
    val wordList = words(str)
    return wordList.mapIndexed { index, word ->
        if (index == 0) word.lowercase()
        else word.lowercase().replaceFirstChar { it.uppercase() }
    }.joinToString("")
}

/**
 * Converts the first character of string to upper case and the remaining to lower case.
 */
fun capitalize(str: String?): String {
    if (str == null) return ""
    return str.lowercase().replaceFirstChar { it.uppercase() }
}

/**
 * Checks if string ends with the given target string.
 */
fun endsWith(str: String?, target: String?, position: Int? = null): Boolean {
    if (str == null || target == null) return false
    val pos = position ?: str.length
    val sub = str.substring(0, pos.coerceIn(0, str.length))
    return sub.endsWith(target)
}

/**
 * Converts the characters "&", "<", ">", '"', and "'" in string to their corresponding HTML entities.
 */
fun escape(str: String?): String {
    if (str == null) return ""
    return str.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\"", "&quot;")
        .replace("'", "&#39;")
}

/**
 * Converts string to kebab case.
 */
fun kebabCase(str: String?): String {
    if (str == null) return ""
    return words(str).joinToString("-") { it.lowercase() }
}

/**
 * Converts the first character of string to lower case.
 */
fun lowerFirst(str: String?): String {
    if (str == null) return ""
    return str.replaceFirstChar { it.lowercase() }
}

/**
 * Pads string on the left and right sides if it's shorter than length.
 * Padding characters are truncated if they can't be evenly divided by length.
 */
fun pad(str: String?, length: Int, chars: String = " "): String {
    if (str == null) return ""
    if (str.length >= length) return str
    val totalPad = length - str.length
    val leftPad = totalPad / 2
    return padStart(str, str.length + leftPad, chars).let { padEnd(it, length, chars) }
}

/**
 * Pads string on the right side if it's shorter than length.
 */
fun padEnd(str: String?, length: Int, chars: String = " "): String {
    if (str == null) return ""
    if (str.length >= length) return str
    val padContent = chars.repeat((length - str.length) / chars.length + 1).take(length - str.length)
    return str + padContent
}

/**
 * Pads string on the left side if it's shorter than length.
 */
fun padStart(str: String?, length: Int, chars: String = " "): String {
    if (str == null) return ""
    if (str.length >= length) return str
    val padContent = chars.repeat((length - str.length) / chars.length + 1).take(length - str.length)
    return padContent + str
}

/**
 * Repeats the given string n times.
 */
fun repeat(str: String?, n: Int = 1): String {
    if (str == null) return ""
    if (n <= 0) return ""
    return str.repeat(n)
}

/**
 * Replaces matches for pattern in string with replacement.
 */
fun replace(str: String?, pattern: String, replacement: String): String {
    if (str == null) return ""
    return str.replace(pattern, replacement)
}

/**
 * Converts string to snake case.
 */
fun snakeCase(str: String?): String {
    if (str == null) return ""
    return words(str).joinToString("_") { it.lowercase() }
}

/**
 * Splits string by separator.
 */
fun split(str: String?, separator: String?, limit: Int? = null): List<String> {
    if (str == null) return emptyList()
    if (separator == null) return listOf(str)
    val parts = str.split(separator)
    return if (limit != null) parts.take(limit) else parts
}

/**
 * Converts string to start case.
 */
fun startCase(str: String?): String {
    if (str == null) return ""
    return words(str).joinToString(" ") { it.lowercase().replaceFirstChar { c -> c.uppercase() } }
}

/**
 * Checks if string starts with the given target string.
 */
fun startsWith(str: String?, target: String?, position: Int = 0): Boolean {
    if (str == null || target == null) return false
    if (position < 0) return str.startsWith(target)
    if (position >= str.length) return false
    return str.substring(position).startsWith(target)
}

/**
 * Converts string to lower case.
 */
fun toLower(str: String?): String = str?.lowercase() ?: ""

/**
 * Converts string to upper case.
 */
fun toUpper(str: String?): String = str?.uppercase() ?: ""

/**
 * Truncates string if it's longer than the given maximum string length.
 */
fun truncate(str: String?, length: Int = 30, omission: String = "..."): String {
    if (str == null) return ""
    if (str.length <= length) return str
    return str.take(length - omission.length) + omission
}

/**
 * The inverse of _.escape; this method converts the HTML entities &amp;, &lt;, &gt;, &quot;, and &#39; in string to their corresponding characters.
 */
fun unescape(str: String?): String {
    if (str == null) return ""
    return str.replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", "\"")
        .replace("&#39;", "'")
}

/**
 * Converts the first character of string to upper case.
 */
fun upperFirst(str: String?): String {
    if (str == null) return ""
    return str.replaceFirstChar { it.uppercase() }
}

/**
 * Splits string into an array of its words.
 */
fun words(str: String?): List<String> {
    if (str == null) return emptyList()
    // Matches sequences of alphanumeric characters.
    return Regex("[a-zA-Z0-9]+").findAll(str).map { it.value }.toList()
}
