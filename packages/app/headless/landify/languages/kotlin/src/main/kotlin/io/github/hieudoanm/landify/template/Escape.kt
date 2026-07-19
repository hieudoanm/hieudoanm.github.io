package io.github.hieudoanm.landify.template

/**
 * HTML-escapes text exactly as Go's `html/template` does in text and quoted
 * attribute contexts.
 *
 * Go's `htmlReplacementTable` covers seven characters, including `+` and `=`,
 * which most hand-rolled escapers miss:
 *
 * | in | out |
 * | --- | --- |
 * | `"` | `&#34;` |
 * | `&` | `&amp;` |
 * | `'` | `&#39;` |
 * | `+` | `&#43;` |
 * | `<` | `&lt;` |
 * | `=` | `&#61;` |
 * | `>` | `&gt;` |
 *
 * Note that `/` is **not** escaped. Go leaves it alone, which is why the Rust
 * port had to rewrite minijinja's `&#x2f;` back to `/` after rendering; here
 * the bytes are correct on the first pass.
 */
fun escapeHtml(text: String): String {
    if (text.none { it in ESCAPED }) return text
    return buildString(text.length + 16) {
        text.forEach { c ->
            when (c) {
                '"' -> append("&#34;")
                '&' -> append("&amp;")
                '\'' -> append("&#39;")
                '+' -> append("&#43;")
                '<' -> append("&lt;")
                '=' -> append("&#61;")
                '>' -> append("&gt;")
                else -> append(c)
            }
        }
    }
}

private const val ESCAPED = "\"'&+=<"
