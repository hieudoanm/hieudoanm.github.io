package io.github.hieudoanm.kevin.server

/**
 * Returns the first space-delimited token of [s] and everything after it, with
 * leading separator spaces preserved, mirroring the C reference's splitting on
 * single spaces.
 */
internal fun splitToken(s: String): Pair<String, String> {
    val start = s.indexOfFirst { it != ' ' }.let { if (it < 0) s.length else it }
    var end = start
    while (end < s.length && s[end] != ' ') end++
    return s.substring(start, end) to s.substring(end)
}

/** Returns every space-delimited token of [s]. */
internal fun splitAll(s: String): List<String> {
    val tokens = mutableListOf<String>()
    var rest = s
    while (true) {
        val (token, tail) = splitToken(rest)
        if (token.isEmpty()) break
        tokens += token
        rest = tail
    }
    return tokens
}

/** Consumes exactly two tokens from [s], reporting whether both were present. */
internal fun splitTwo(s: String): Triple<String, String, Boolean> {
    val (first, rest) = splitToken(s)
    if (first.isEmpty()) return Triple("", "", false)
    val (second, tail) = splitToken(rest)
    if (second.isEmpty() || tail.isNotBlank()) return Triple("", "", false)
    return Triple(first, second, true)
}
