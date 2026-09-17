package io.github.hieudoanm.kevin.mcp

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/**
 * The KeVIN tool catalogue.
 *
 * Each tool reports a failure as an errored [ToolResult] rather than a
 * JSON-RPC error, so the model can read the reason and react to it.
 */
internal object Tools {

    /** Registers every KeVIN tool against [store]. */
    fun register(server: McpServer, store: Store) {
        server.register(ToolHandler(ToolSchemas.ping()) { ping(store) })
        server.register(ToolHandler(ToolSchemas.set()) { set(store, it) })
        server.register(ToolHandler(ToolSchemas.get()) { get(store, it) })
        server.register(ToolHandler(ToolSchemas.del()) { del(store, it) })
        server.register(ToolHandler(ToolSchemas.exists()) { exists(store, it) })
        server.register(ToolHandler(ToolSchemas.keys()) { keys(store) })
        server.register(ToolHandler(ToolSchemas.len()) { len(store) })
        server.register(ToolHandler(ToolSchemas.ttl()) { ttl(store, it) })
        server.register(ToolHandler(ToolSchemas.expire()) { expire(store, it) })
        server.register(ToolHandler(ToolSchemas.flush()) { flush(store, it) })
    }

    private fun ping(store: Store): ToolResult = report {
        store.ping()
        buildJsonObject { put("pong", true) }
    }

    private fun set(store: Store, args: JsonObject?): ToolResult {
        val key = Args.string(args, "key")
        val value = Args.string(args, "value")
        requireKey(key)?.let { return failureResult(it) }
        if (value.isEmpty()) return failureResult("value is required and must not be empty")
        return report {
            store.set(key, value, Args.integer(args, "ttl_seconds"))
            buildJsonObject { put("ok", true) }
        }
    }

    private fun get(store: Store, args: JsonObject?): ToolResult {
        val key = Args.string(args, "key")
        requireKey(key)?.let { return failureResult(it) }
        return report {
            val (value, found) = store.get(key)
            buildJsonObject {
                put("found", found)
                put("value", if (found) JsonPrimitive(value) else JsonPrimitive(null))
            }
        }
    }

    private fun del(store: Store, args: JsonObject?): ToolResult {
        val keys = Args.stringList(args, "keys")
        if (keys.isEmpty()) {
            return failureResult("keys is required and must contain at least one key")
        }
        return report {
            buildJsonObject { put("deleted", store.del(keys)) }
        }
    }

    private fun exists(store: Store, args: JsonObject?): ToolResult {
        val key = Args.string(args, "key")
        requireKey(key)?.let { return failureResult(it) }
        return report { buildJsonObject { put("exists", store.exists(key)) } }
    }

    private fun keys(store: Store): ToolResult = report {
        val keys = store.keys()
        buildJsonObject {
            put("keys", JsonArray(keys.map(::JsonPrimitive)))
            put("count", keys.size)
        }
    }

    private fun len(store: Store): ToolResult = report {
        buildJsonObject { put("count", store.len()) }
    }

    private fun ttl(store: Store, args: JsonObject?): ToolResult {
        val key = Args.string(args, "key")
        requireKey(key)?.let { return failureResult(it) }
        return report {
            val (seconds, state) = store.ttl(key)
            buildJsonObject {
                put("key", key)
                put("seconds", state.signedSeconds(seconds))
                put("state", state.wire)
            }
        }
    }

    private fun expire(store: Store, args: JsonObject?): ToolResult {
        val key = Args.string(args, "key")
        val seconds = Args.integer(args, "seconds")
        requireKey(key)?.let { return failureResult(it) }
        if (seconds <= 0) return failureResult("seconds is required and must be greater than 0")
        return report { buildJsonObject { put("ok", store.expire(key, seconds)) } }
    }

    private fun flush(store: Store, args: JsonObject?): ToolResult {
        if (!Args.boolean(args, "confirm")) {
            return failureResult("confirm must be true to remove every key")
        }
        return report { buildJsonObject { put("deleted", store.flush()) } }
    }

    /** Runs [body], turning a store failure into an errored result. */
    private inline fun report(body: () -> JsonElement): ToolResult = try {
        textResult(body())
    } catch (error: StoreException) {
        failureResult(error.message ?: "store call failed")
    }
}
