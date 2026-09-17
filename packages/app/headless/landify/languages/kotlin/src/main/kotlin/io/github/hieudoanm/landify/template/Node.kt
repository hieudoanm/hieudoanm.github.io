package io.github.hieudoanm.landify.template

/** A parsed template: a flat list of nodes rendered in order. */
sealed interface Node {
    /** Literal output, copied through byte for byte. */
    data class Text(val text: String) : Node

    /** `{{ path }}` — the resolved value, HTML-escaped. */
    data class Expr(val path: String) : Node

    /** `{% if cond %}...{% endif %}` with no `else` branch. */
    data class If(val condition: Cond, val body: List<Node>) : Node

    /** `{% for name in path %}...{% endfor %}`. */
    data class For(val variable: String, val path: String, val body: List<Node>) : Node
}

/**
 * An `{% if %}` condition. The templates only use a bare path or two paths
 * joined by `and`/`or`; `and` and `or` share one precedence level and associate
 * to the left, which is what Go's `text/template` does.
 */
sealed interface Cond {
    data class Test(val path: String) : Cond
    data class And(val left: Cond, val right: Cond) : Cond
    data class Or(val left: Cond, val right: Cond) : Cond
}
