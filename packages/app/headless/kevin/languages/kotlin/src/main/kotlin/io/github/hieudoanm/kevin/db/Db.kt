package io.github.hieudoanm.kevin.db

import java.util.concurrent.locks.ReentrantReadWriteLock
import kotlin.concurrent.read
import kotlin.concurrent.write
import kotlin.time.Duration
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.seconds

/**
 * Result of a TTL lookup.
 *
 * [remaining] is [MISSING] when the key is absent or already expired, [PERSISTENT]
 * when the key never expires, and the remaining lifetime otherwise.
 */
data class Ttl(val remaining: Duration, val hasExpiry: Boolean) {
    companion object {
        val MISSING: Duration = (-2).seconds
        val PERSISTENT: Duration = (-1).seconds
    }
}

/**
 * A concurrency-safe in-memory key/value store with per-key expiry.
 *
 * [now] is injected so tests can control expiry without sleeping.
 */
class Db(private val now: () -> Long = System::currentTimeMillis) {
    private val lock = ReentrantReadWriteLock()
    private val data = LinkedHashMap<String, String>()
    private val expires = LinkedHashMap<String, Long>()

    /** Stores [value] under [key] with no expiry, dropping any existing expiry. */
    fun set(key: String, value: String) = lock.write {
        data[key] = value
        expires.remove(key)
    }

    /** Stores [value] under [key], expiring it [ttl] from now. */
    fun setWithTtl(key: String, value: String, ttl: Duration) = lock.write {
        data[key] = value
        expires[key] = now() + ttl.inWholeMilliseconds
    }

    /** Returns the value under [key], or null when absent or expired. */
    fun get(key: String): String? {
        lock.read {
            val value = data[key]
            if (value != null && !isExpired(key)) return value
        }
        remove(key)
        return null
    }

    /** Removes [key], reporting whether it was present. */
    fun del(key: String): Boolean = lock.write {
        if (!data.containsKey(key)) return@write false
        removeLocked(key)
        true
    }

    /** Removes every key in [keys], returning how many were present. */
    fun delMultiple(keys: List<String>): Int = lock.write {
        var deleted = 0
        for (key in keys) {
            if (data.containsKey(key)) {
                removeLocked(key)
                deleted++
            }
        }
        deleted
    }

    /** Reports whether [key] is present and not expired. */
    fun exists(key: String): Boolean {
        lock.read {
            if (data.containsKey(key) && !isExpired(key)) return true
        }
        remove(key)
        return false
    }

    /** Returns the number of present, unexpired keys. */
    fun len(): Int = lock.read { data.keys.count { !isExpired(it) } }

    /** Returns the present, unexpired keys in insertion order. */
    fun keys(): List<String> = lock.read { data.keys.filter { !isExpired(it) } }

    /** Sets an expiry on an existing [key], replacing any previous one. */
    fun expire(key: String, ttl: Duration): Boolean = lock.write {
        if (!data.containsKey(key)) return@write false
        expires[key] = now() + ttl.inWholeMilliseconds
        true
    }

    /** Returns the remaining lifetime of [key] and whether an expiry is set. */
    fun ttl(key: String): Ttl = lock.write {
        if (!data.containsKey(key)) return@write Ttl(Ttl.MISSING, false)
        val expiry = expires[key] ?: return@write Ttl(Ttl.PERSISTENT, false)
        val remaining = expiry - now()
        if (remaining <= 0) {
            removeLocked(key)
            return@write Ttl(Ttl.MISSING, false)
        }
        Ttl(remaining.milliseconds, true)
    }

    /** Removes all keys, returning how many were removed. */
    fun flush(): Int = lock.write {
        val removed = data.size
        data.clear()
        expires.clear()
        removed
    }

    internal fun snapshotData(): Map<String, String> = lock.read { LinkedHashMap(data) }

    internal fun snapshotExpires(): Map<String, Long> = lock.read { LinkedHashMap(expires) }

    internal fun replaceAll(values: Map<String, String>, expiries: Map<String, Long>) = lock.write {
        data.clear()
        data.putAll(values)
        expires.clear()
        expires.putAll(expiries)
        data.keys.filter { isExpired(it) }.forEach(::removeLocked)
    }

    private fun isExpired(key: String): Boolean {
        val expiry = expires[key] ?: return false
        return expiry <= now()
    }

    private fun removeLocked(key: String) {
        data.remove(key)
        expires.remove(key)
    }

    private fun remove(key: String) = lock.write { removeLocked(key) }
}
