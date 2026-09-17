package io.github.hieudoanm.kevin.mcp

import io.github.hieudoanm.kevin.db.Db
import io.github.hieudoanm.kevin.db.Ttl
import kotlin.time.Duration
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.seconds

/** Expiry status of a key, normalised so tools never see a sentinel duration. */
internal enum class TtlState(val wire: String) {
    /** The key does not exist or has already expired. */
    Missing("missing"),

    /** The key exists and never expires. */
    NoExpiry("no-expiry"),

    /** The key exists; the paired count is the remaining seconds, rounded up. */
    Expiring("expiring"),
    ;

    /**
     * The signed second count the inline protocol uses for `TTL`: -2 for a
     * missing key, -1 for a key with no expiry, else the remaining seconds.
     */
    fun signedSeconds(remaining: Int): Int = when (this) {
        Missing -> -2
        NoExpiry -> -1
        Expiring -> remaining
    }
}

/** Raised when a store cannot satisfy a call. */
internal class StoreException(message: String, cause: Throwable? = null) : Exception(message, cause)

/**
 * The key/value surface the MCP tools operate on.
 *
 * Every call may throw [StoreException]; tool handlers turn that into an errored
 * result so the model can read it.
 */
internal interface Store : AutoCloseable {
    /** Verifies the store is reachable. */
    fun ping()

    /** Returns the value stored under [key] and whether it was present. */
    fun get(key: String): Pair<String, Boolean>

    /** Stores [value] under [key], optionally expiring it after [ttlSeconds]. */
    fun set(key: String, value: String, ttlSeconds: Int)

    /** Removes every key in [keys] and returns how many were present. */
    fun del(keys: List<String>): Int

    /** Reports whether [key] is present and unexpired. */
    fun exists(key: String): Boolean

    /** Returns every present, unexpired key. */
    fun keys(): List<String>

    /** Returns the number of present, unexpired keys. */
    fun len(): Int

    /** Removes every key and returns how many were removed. */
    fun flush(): Int

    /** Returns the remaining whole seconds of [key] and its expiry state. */
    fun ttl(key: String): Pair<Int, TtlState>

    /** Sets an expiry on [key] and reports whether it existed. */
    fun expire(key: String, seconds: Int): Boolean

    /** Releases any resource the store holds. */
    override fun close() = Unit
}

/** Adapts the in-process [Db] to [Store]. */
internal class DbStore(private val kv: Db) : Store {
    override fun ping() = Unit

    override fun get(key: String): Pair<String, Boolean> =
        kv.get(key)?.let { it to true } ?: ("" to false)

    override fun set(key: String, value: String, ttlSeconds: Int) {
        if (ttlSeconds > 0) kv.setWithTtl(key, value, ttlSeconds.seconds) else kv.set(key, value)
    }

    override fun del(keys: List<String>): Int = kv.delMultiple(keys)

    override fun exists(key: String): Boolean = kv.exists(key)

    override fun keys(): List<String> = kv.keys()

    override fun len(): Int = kv.len()

    override fun flush(): Int = kv.flush()

    override fun ttl(key: String): Pair<Int, TtlState> {
        val ttl = kv.ttl(key)
        if (ttl.hasExpiry) return ceilSeconds(ttl.remaining) to TtlState.Expiring
        val missing = ttl.remaining == Ttl.MISSING
        val state = if (missing) TtlState.Missing else TtlState.NoExpiry
        return state.signedSeconds(0) to state
    }

    override fun expire(key: String, seconds: Int): Boolean = kv.expire(key, seconds.seconds)
}

/** Rounds a live lifetime up, so a key with 300ms left reports one second. */
internal fun ceilSeconds(duration: Duration): Int = (duration + 999.milliseconds).inWholeSeconds.toInt()
