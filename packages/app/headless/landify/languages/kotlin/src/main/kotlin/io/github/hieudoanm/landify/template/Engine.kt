package io.github.hieudoanm.landify.template

import kotlinx.serialization.json.JsonArray

/**
 * Renders the Jinja subset described by [TemplateParser].
 *
 * A template is parsed once and cached; `{% include %}` was already inlined by
 * the parser, so rendering is a single pass over the node tree.
 *
 * Every `{{ path }}` is HTML-escaped with [escapeHtml], which reproduces Go's
 * `html/template` byte for byte. No template places an expression inside
 * `<script>` or `<style>`, so no context-sensitive escaper is needed.
 */
class TemplateEngine(sources: Map<String, String>) {
    private val sources = sources
    private val cache = HashMap<String, List<Node>>()

    /** The parsed node tree for [name], parsed on first use. */
    fun nodes(name: String): List<Node> = cache.getOrPut(name) {
        val source = sources[name] ?: throw IllegalArgumentException("unknown template '$name'")
        TemplateParser(source, ::source, name).parse()
    }

    /** Renders [name] against [context] to a string. */
    fun render(name: String, context: RenderContext): String =
        buildString { renderNodes(nodes(name), context, this) }

    /** Drops parsed templates; useful when sources are reloaded. */
    fun invalidate() = cache.clear()

    private fun source(name: String): String =
        sources[name] ?: throw IllegalArgumentException("unknown template '$name'")

    private fun renderNodes(nodes: List<Node>, context: RenderContext, out: StringBuilder) {
        nodes.forEach { renderNode(it, context, out) }
    }

    private fun renderNode(node: Node, context: RenderContext, out: StringBuilder) {
        when (node) {
            is Node.Text -> out.append(node.text)
            is Node.Expr -> out.append(escapeHtml(context.textOf(context.resolve(node.path))))
            is Node.If -> if (evaluate(node.condition, context)) renderNodes(node.body, context, out)
            is Node.For -> renderLoop(node, context, out)
        }
    }

    /** An unresolvable or non-list loop path renders nothing, like Go's nil. */
    private fun renderLoop(node: Node.For, context: RenderContext, out: StringBuilder) {
        val items = context.resolve(node.path) as? JsonArray ?: return
        items.forEach { item ->
            renderNodes(node.body, context.push(mapOf(node.variable to item)), out)
        }
    }

    private fun evaluate(condition: Cond, context: RenderContext): Boolean = when (condition) {
        is Cond.Test -> context.isTruthy(context.resolve(condition.path))
        is Cond.And -> evaluate(condition.left, context) && evaluate(condition.right, context)
        is Cond.Or -> evaluate(condition.left, context) || evaluate(condition.right, context)
    }
}
