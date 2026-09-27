package io.github.hieudoanm.kevin.mcp

import kotlinx.serialization.json.JsonObject

/**
 * The advertised shape of each KeVIN tool.
 *
 * Kept apart from the handlers so the wire contract can be asserted on its own.
 */
internal object ToolSchemas {

    fun ping(): Tool = tool(
        name = "kevin_ping",
        description = "Check that the key/value store is reachable.",
        schema = objectSchema(emptyMap()),
    )

    fun set(): Tool = tool(
        name = "kevin_set",
        description = "Store a value under a key, optionally expiring it.",
        schema = objectSchema(
            properties = mapOf(
                "key" to stringProperty("Key to store the value under."),
                "value" to stringProperty("Value to store."),
                "ttl_seconds" to integerProperty("Seconds until the key expires; omit or 0 to persist."),
            ),
            required = listOf("key", "value"),
        ),
    )

    fun get(): Tool = tool(
        name = "kevin_get",
        description = "Read the value stored under a key.",
        schema = objectSchema(
            properties = mapOf("key" to stringProperty("Key to read.")),
            required = listOf("key"),
        ),
    )

    fun del(): Tool = tool(
        name = "kevin_del",
        description = "Delete one or more keys, reporting how many were present.",
        schema = objectSchema(
            properties = mapOf("keys" to stringArrayProperty("Keys to delete.")),
            required = listOf("keys"),
        ),
    )

    fun exists(): Tool = tool(
        name = "kevin_exists",
        description = "Report whether a key is present and unexpired.",
        schema = objectSchema(
            properties = mapOf("key" to stringProperty("Key to test.")),
            required = listOf("key"),
        ),
    )

    fun keys(): Tool = tool(
        name = "kevin_keys",
        description = "List every present, unexpired key.",
        schema = objectSchema(emptyMap()),
    )

    fun len(): Tool = tool(
        name = "kevin_len",
        description = "Count the present, unexpired keys.",
        schema = objectSchema(emptyMap()),
    )

    fun ttl(): Tool = tool(
        name = "kevin_ttl",
        description = "Report a key's expiry state and its remaining seconds.",
        schema = objectSchema(
            properties = mapOf("key" to stringProperty("Key to inspect.")),
            required = listOf("key"),
        ),
    )

    fun expire(): Tool = tool(
        name = "kevin_expire",
        description = "Set a key's time to live in seconds.",
        schema = objectSchema(
            properties = mapOf(
                "key" to stringProperty("Key to give an expiry."),
                "seconds" to integerProperty("Seconds until the key expires; must be greater than 0."),
            ),
            required = listOf("key", "seconds"),
        ),
    )

    fun flush(): Tool = tool(
        name = "kevin_flush",
        description = "Delete every key. Destructive, so it must be confirmed.",
        schema = objectSchema(
            properties = mapOf("confirm" to booleanProperty("Must be true; guards against an accidental wipe.")),
            required = listOf("confirm"),
        ),
    )

    private fun tool(name: String, description: String, schema: JsonObject) =
        Tool(name = name, description = description, inputSchema = schema)
}
