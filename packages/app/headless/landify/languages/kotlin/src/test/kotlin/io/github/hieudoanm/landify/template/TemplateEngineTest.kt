package io.github.hieudoanm.landify.template

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.JsonObject
import kotlin.test.Test
import kotlin.test.assertEquals

class TemplateEngineTest {
    @Test
    fun `text passes through unchanged`() {
        assertEquals("plain", render("plain"))
    }

    @Test
    fun `an expression is escaped with Go's table`() {
        val json = """{"a": "<b>&\"'+=</b>"}"""
        val want = "&lt;b&gt;&amp;&#34;&#39;&#43;&#61;&lt;/b&gt;"
        assertEquals(want, render("{{ a }}", json))
    }

    @Test
    fun `a slash is not escaped, matching html_template`() {
        assertEquals("a/b", render("{{ a }}", """{"a": "a/b"}"""))
    }

    @Test
    fun `a missing path renders as empty, not an error`() {
        assertEquals("[]", render("[{{ nope.here }}]"))
    }

    @Test
    fun `if skips its body when the value is falsy`() {
        assertEquals("on", render("{% if flag %}on{% endif %}", """{"flag": "yes"}"""))
        assertEquals("", render("{% if flag %}on{% endif %}", """{"flag": ""}"""))
    }

    @Test
    fun `and requires both sides`() {
        val both = "{% if a and b %}y{% endif %}"
        assertEquals("", render(both, """{"a": "1", "b": ""}"""))
        assertEquals("y", render(both, """{"a": "1", "b": "1"}"""))
    }

    @Test
    fun `or requires either side`() {
        assertEquals("y", render("{% if a or b %}y{% endif %}", """{"a": "", "b": "1"}"""))
        assertEquals("", render("{% if a or b %}y{% endif %}", """{"a": "", "b": ""}"""))
    }

    @Test
    fun `for repeats its body over a list`() {
        val source = "{% for item in items %}[{{ item.name }}]{% endfor %}"
        assertEquals("[a][b]", render(source, """{"items": [{"name": "a"}, {"name": "b"}]}"""))
    }

    @Test
    fun `for over a missing path renders nothing`() {
        assertEquals("", render("{% for x in nope %}[{{ x }}]{% endfor %}"))
    }

    @Test
    fun `an inner loop shadows an outer variable`() {
        val source = "{% for g in groups %}{% for g in g.items %}[{{ g }}]{% endfor %}{% endfor %}"
        assertEquals("[x][y][z]", render(source, """{"groups": [{"items": ["x", "y"]}, {"items": ["z"]}]}"""))
    }

    @Test
    fun `an unknown template name is rejected`() {
        val failure = runCatching { TemplateEngine(emptyMap()).render("nope", context("{}")) }.exceptionOrNull()
        assertEquals("unknown template 'nope'", failure?.message)
    }

    @Test
    fun `an include is inlined at parse time`() {
        val engine = TemplateEngine(mapOf("main" to "before {% include 'part' %} after", "part" to "MIDDLE"))
        assertEquals("before MIDDLE after", engine.render("main", context("{}")))
    }

    @Test
    fun `a nested include resolves too`() {
        val engine = TemplateEngine(
            mapOf(
                "main" to "{% include 'outer' %}",
                "outer" to "<{% include 'inner' %}>",
                "inner" to "x",
            ),
        )
        assertEquals("<x>", engine.render("main", context("{}")))
    }

    @Test
    fun `parsing is cached, so rendering twice gives the same bytes`() {
        val engine = TemplateEngine(mapOf("t" to "{{ a }}"))
        val first = engine.render("t", context("""{"a": "x"}"""))
        assertEquals(first, engine.render("t", context("""{"a": "x"}""")))
        engine.invalidate()
        assertEquals(first, engine.render("t", context("""{"a": "x"}""")))
    }
}

/** Renders [source] as a standalone single-file template against [json]. */
private fun render(source: String, json: String = "{}"): String =
    TemplateEngine(mapOf(source to source)).render(source, context(json))

/** Builds a context whose root object is [json]. */
private fun context(json: String): RenderContext =
    RenderContext(Json.parseToJsonElement(json) as JsonObject)
