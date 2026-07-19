package io.github.hieudoanm.landify.template

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonNull
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.longOrNull

/**
 * The value scope a template renders against.
 *
 * A scope is a chain of JSON objects: index 0 is the root (which holds
 * `config`), and each nested scope adds the `{% for %}` variables in scope.
 * Lookup walks the chain from the innermost scope outwards, so an inner loop
 * variable shadows an outer one and `tier.perks` still resolves inside a
 * `for perk` body.
 *
 * Paths are dot-separated and resolve to [JsonNull] when any segment is
 * missing, which is what makes `{% if config.demo.video.poster %}` false rather
 * than an error.
 */
class RenderContext internal constructor(
    private val scopes: List<JsonObject>,
) {
    /** Creates a root context exposing `config` to the template. */
    constructor(config: JsonElement) : this(listOf(JsonObject(mapOf(ROOT to config))))

    /** Returns a context with one more scope frame holding [bindings]. */
    fun push(bindings: Map<String, JsonElement>): RenderContext =
        RenderContext(scopes + JsonObject(bindings))

    fun resolve(path: String): JsonElement {
        val parts = path.split('.')
        for (scope in scopes.asReversed()) {
            val head = scope[parts.first()] ?: continue
            return descend(head, parts.drop(1))
        }
        return JsonNull
    }

    private fun descend(value: JsonElement, rest: List<String>): JsonElement {
        var current = value
        for (segment in rest) {
            current = (current as? JsonObject)?.get(segment) ?: return JsonNull
        }
        return current
    }

    /**
     * Go's template truthiness: empty strings, zero, `null`, and empty
     * lists/objects are false. A non-empty string is true, which is what the
     * templates rely on for their `{% if config.hero.badge %}` guards.
     */
    fun isTruthy(element: JsonElement): Boolean = when (element) {
        is JsonNull -> false
        is JsonPrimitive -> when {
            element.booleanOrNull != null -> element.booleanOrNull == true
            element.longOrNull != null -> element.longOrNull != 0L
            else -> element.content.isNotEmpty()
        }
        is JsonArray -> element.isNotEmpty()
        is JsonObject -> element.isNotEmpty()
    }

    /**
     * The unescaped text of a value. Strings lose their JSON quoting; numbers
     * and booleans use their literal form. Arrays and objects have no
     * representation in these templates and fall back to compact JSON.
     */
    fun textOf(element: JsonElement): String = when (element) {
        is JsonNull -> ""
        is JsonPrimitive -> element.content
        else -> element.toString()
    }

    private companion object {
        const val ROOT = "config"
    }
}
