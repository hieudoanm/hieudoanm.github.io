package io.github.hieudoanm.landify.template

/**
 * Recursive-descent parser for the Jinja subset the Landify templates use.
 *
 * The whole grammar, verified against `assets/templates` and
 * `assets/partials`:
 *
 * ```
 * list    := (text | expr | tag)*
 * expr    := '{{' path '}}'
 * tag     := if | for | include | endif | endfor
 * if      := '{%' 'if' cond '%}' list '{%' 'endif' '%}'
 * for     := '{%' 'for' NAME 'in' path '%}' list '{%' 'endfor' '%}'
 * include := '{%' 'include' QUOTED '%}'
 * cond    := path (('and' | 'or') path)*
 * ```
 *
 * There is no `else`, `elif`, `not`, filter, macro, block, or raw syntax, and
 * no whitespace trim markers (`{{-`, `-}}`): the templates rely on literal
 * whitespace, so the parser preserves every byte outside a tag.
 *
 * `{% include %}` is inlined at parse time by [resolveInclude] and spliced into
 * the parent list, which keeps rendering a single pass with no runtime lookup.
 */
class TemplateParser(
    private val source: String,
    private val resolveInclude: (String) -> String,
    private val origin: String = "<template>",
) {
    private var pos = 0

    /** Parses the template into a node list. */
    fun parse(): List<Node> = parseNodes(emptySet())

    private fun parseNodes(terminators: Set<String>): List<Node> {
        val nodes = mutableListOf<Node>()
        while (true) {
            val start = nextTag()
            if (start < 0) {
                if (terminators.isNotEmpty()) fail("unclosed ${terminators.first()}")
                nodes += Node.Text(source.substring(pos))
                pos = source.length
                return nodes
            }
            if (start > pos) nodes += Node.Text(source.substring(pos, start))
            val produced = readTag(start, terminators) ?: run {
                pos = start
                return nodes
            }
            nodes += produced
        }
    }

    /**
     * Consumes one tag at [start] and returns the nodes it contributes, or
     * null when the tag is a terminator belonging to the caller.
     */
    private fun readTag(start: Int, terminators: Set<String>): List<Node>? {
        val isExpr = source.startsWith("{{", start)
        val close = if (isExpr) "}}" else "%}"
        val end = source.indexOf(close, start + 2)
        if (end < 0) fail("unterminated ${if (isExpr) "{{" else "{%"}")
        val inner = source.substring(start + 2, end).trim()
        pos = end + 2
        if (isExpr) return listOf(Node.Expr(inner))
        val head = inner.substringBefore(' ').trim()
        if (head in terminators) return null
        val args = inner.removePrefix(head).trim()
        return when (head) {
            "if" -> listOf(parseIf(args))
            "for" -> listOf(parseFor(args))
            "include" -> parseInclude(args)
            else -> fail("unknown tag '$head'")
        }
    }

    private fun parseIf(args: String): Node {
        val body = parseNodes(setOf("endif"))
        expectEndTag("endif")
        return Node.If(parseCondition(args), body)
    }

    private fun parseFor(args: String): Node {
        val parts = args.split(WHITESPACE).filter { it.isNotEmpty() }
        if (parts.size != 3 || parts[1] != "in") fail("malformed for: '$args'")
        val body = parseNodes(setOf("endfor"))
        expectEndTag("endfor")
        return Node.For(parts[0], parts[2], body)
    }

    /** Parses the included template and returns its nodes for splicing. */
    private fun parseInclude(args: String): List<Node> {
        val name = args.trim().trim('"', '\'')
        if (name.isEmpty()) fail("malformed include: '$args'")
        return TemplateParser(resolveInclude(name), resolveInclude, name).parse()
    }

    /** Consumes the terminator tag that [parseNodes] stopped at. */
    private fun expectEndTag(expected: String) {
        val start = nextTag()
        if (start < 0) fail("unclosed $expected")
        val end = source.indexOf("%}", start)
        if (end < 0) fail("unterminated {%")
        val inner = source.substring(start + 2, end).trim()
        if (inner != expected) fail("expected {% $expected %}, got '$inner'")
        pos = end + 2
    }

    private fun parseCondition(text: String): Cond {
        val tokens = text.split(WHITESPACE).filter { it.isNotEmpty() }
        if (tokens.isEmpty()) fail("empty if condition")
        var node: Cond = Cond.Test(tokens[0])
        var i = 1
        while (i < tokens.size) {
            val op = tokens[i]
            if (op != "and" && op != "or") fail("unexpected '$op' in if condition")
            val right = tokens.getOrNull(i + 1) ?: fail("dangling '$op' in if condition")
            node = if (op == "and") Cond.And(node, Cond.Test(right)) else Cond.Or(node, Cond.Test(right))
            i += 2
        }
        return node
    }

    private fun nextTag(): Int {
        val expr = source.indexOf("{{", pos)
        val tag = source.indexOf("{%", pos)
        return when {
            expr < 0 -> tag
            tag < 0 -> expr
            else -> minOf(expr, tag)
        }
    }

    private fun fail(message: String): Nothing =
        throw IllegalArgumentException("$origin: $message")

    private companion object {
        val WHITESPACE = Regex("\\s+")
    }
}
