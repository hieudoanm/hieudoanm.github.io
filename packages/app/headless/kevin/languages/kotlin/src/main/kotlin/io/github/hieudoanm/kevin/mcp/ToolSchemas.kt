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
        description = "Verify the KeVIN key/value store is reachable.",
        schema = objectSchema(emptyMap()),
    )

    fun set(): Tool = tool(
        name = "kevin_set",
        description = "Store value under key, overwriting any existing value. Set ttl_seconds to expire the key automatically.",
        schema = objectSchema(
            properties = mapOf(
                "key" to keyProperty(),
                "value" to stringProperty("Value to store. May contain spaces."),
                "ttl_seconds" to integerProperty("Seconds until the key expires. Omit or use 0 for no expiry."),
            ),
            required = listOf("key", "value"),
        ),
    )

    fun get(): Tool = tool(
        name = "kevin_get",
        description = "Retrieve the value stored under key. Returns found=false when the key is absent or expired.",
        schema = objectSchema(
            properties = mapOf("key" to keyProperty()),
            required = listOf("key"),
        ),
    )

    fun del(): Tool = tool(
        name = "kevin_del",
        description = "Delete one or more keys and report how many were present.",
        schema = objectSchema(
            properties = mapOf("keys" to stringArrayProperty("Keys to delete.")),
            required = listOf("keys"),
        ),
    )

    fun exists(): Tool = tool(
        name = "kevin_exists",
        description = "Check whether key is present and not expired.",
        schema = objectSchema(
            properties = mapOf("key" to keyProperty()),
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
        description = "Report the remaining lifetime of key in whole seconds, rounded up. The state is one of expiring, no-expiry, or missing.",
        schema = objectSchema(
            properties = mapOf("key" to keyProperty()),
            required = listOf("key"),
        ),
    )

    fun expire(): Tool = tool(
        name = "kevin_expire",
        description = "Set an expiry on an existing key, replacing any previous one. Reports ok=false when the key does not exist.",
        schema = objectSchema(
            properties = mapOf(
                "key" to keyProperty(),
                "seconds" to integerProperty("Seconds until the key expires. Must be greater than 0."),
            ),
            required = listOf("key", "seconds"),
        ),
    )

    fun flush(): Tool = tool(
        name = "kevin_flush",
        description = "Remove every key and report how many were removed. Destructive: requires confirm=true.",
        schema = objectSchema(
            properties = mapOf("confirm" to booleanProperty("Must be true. Guards against an accidental flush.")),
            required = listOf("confirm"),
        ),
    )

    private fun tool(name: String, description: String, schema: JsonObject) =
        Tool(name = name, description = description, inputSchema = schema)
}
