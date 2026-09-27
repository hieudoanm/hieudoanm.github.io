package io.github.hieudoanm.kevin.mcp

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

/**
 * Argument access shared by the tool handlers. Every getter treats a missing or
 * wrongly typed argument as its default, so a model that omits an optional
 * field gets the documented behaviour instead of a parse failure.
 */
internal object Args {
    /** Reads a string argument, defaulting to empty. */
    fun string(args: JsonObject?, name: String): String {
        val value = args?.get(name) as? JsonPrimitive ?: return ""
        return if (value.isString) value.content else ""
    }

    /** Reads an integer argument, defaulting to zero. */
    fun integer(args: JsonObject?, name: String): Int {
        val value = args?.get(name) as? JsonPrimitive ?: return 0
        return value.content.toIntOrNull() ?: 0
    }

    /** Reads a boolean argument, defaulting to false. */
    fun boolean(args: JsonObject?, name: String): Boolean =
        (args?.get(name) as? JsonPrimitive)?.content?.toBooleanStrictOrNull() ?: false

    /**
     * Reads an array-of-strings argument, defaulting to empty. Non-string
     * entries are dropped rather than failing the whole call.
     */
    fun stringList(args: JsonObject?, name: String): List<String> {
        val items = args?.get(name) as? JsonArray ?: return emptyList()
        return items.mapNotNull { item ->
            (item as? JsonPrimitive)?.takeIf(JsonPrimitive::isString)?.content
        }
    }
}

/**
 * Rejects a missing or blank key. Without this a client that omits the argument
 * would silently operate on the empty key, which is never a key the store holds.
 */
internal fun requireKey(key: String): String? =
    if (key.isBlank()) "key is required and must not be blank" else null
