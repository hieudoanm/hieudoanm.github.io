package io.github.hieudoanm.backbone.cache

import io.github.hieudoanm.backbone.core.AppConfig
import io.github.hieudoanm.backbone.database.Database
import io.github.hieudoanm.backbone.database.toList
import kotlinx.coroutines.*
import java.util.concurrent.ConcurrentHashMap

class CacheStore(private val config: AppConfig, private val db: Database) {
    private data class Entry(
        val value: String,
        val ttl: Long,
        val expiresAt: Long,
    )

    private val store = ConcurrentHashMap<String, Entry>()
    private var scope: CoroutineScope? = null

    fun startEviction(scope: CoroutineScope) {
        this.scope = scope
        scope.launch {
            while (isActive) {
                delay(30_000)
                val now = System.currentTimeMillis()
                store.entries.removeIf { (_, e) -> e.ttl > 0 && e.expiresAt <= now }
            }
        }
        loadFromDb()
    }

    private fun loadFromDb() {
        db.connection().use { conn ->
            val rows = conn.createStatement().executeQuery("SELECT * FROM _cache").toList()
            for (row in rows) {
                val key = row["key"] as String
                val value = row["value"] as String
                val ttl = (row["ttl"] as? Number)?.toLong() ?: 0L
                val expiresAtStr = row["expires_at"] as? String ?: ""
                val expiresAt = if (expiresAtStr.isNotBlank()) {
                    try {
                        java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(expiresAtStr).time
                    } catch (_: Exception) { 0L }
                } else 0L
                if (ttl > 0 && expiresAt <= System.currentTimeMillis()) continue
                store[key] = Entry(value, ttl, expiresAt)
            }
        }
    }

    fun get(key: String): Map<String, Any?>? {
        val entry = store[key] ?: return null
        if (entry.ttl > 0 && entry.expiresAt <= System.currentTimeMillis()) {
            store.remove(key)
            return null
        }
        return mapOf("key" to key, "value" to entry.value, "ttl" to entry.ttl)
    }

    fun set(key: String, value: String, ttlSeconds: Long = 0) {
        val expiresAt = if (ttlSeconds > 0) System.currentTimeMillis() + ttlSeconds * 1000 else 0L
        store[key] = Entry(value, ttlSeconds, expiresAt)
        val expiresAtStr = if (ttlSeconds > 0) {
            java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(java.util.Date(expiresAt))
        } else ""
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("""
                INSERT OR REPLACE INTO _cache (key, value, ttl, expires_at, created_at, updated_at)
                VALUES ('${key.replace("'", "''")}', '${value.replace("'", "''")}',
                        $ttlSeconds, '$expiresAtStr', datetime('now'), datetime('now'))
            """)
        }
    }

    fun delete(key: String): Boolean {
        val removed = store.remove(key)
        db.connection().use { conn ->
            conn.createStatement().executeUpdate(
                "DELETE FROM _cache WHERE key = '${key.replace("'", "''")}'"
            )
        }
        return removed != null
    }

    fun flush() {
        store.clear()
        db.connection().use { conn ->
            conn.createStatement().executeUpdate("DELETE FROM _cache")
        }
    }

    fun list(): List<Map<String, Any?>> {
        val now = System.currentTimeMillis()
        return store.entries.map { (key, entry) ->
            val valid = entry.ttl <= 0 || entry.expiresAt > now
            val expiresAtStr = if (entry.expiresAt > 0) {
                java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(java.util.Date(entry.expiresAt))
            } else ""
            mapOf(
                "key" to key,
                "value" to (if (valid) entry.value else "(expired)"),
                "ttl" to entry.ttl,
                "expires_at" to expiresAtStr,
            )
        }
    }

    fun stats(): Map<String, Any> {
        val now = System.currentTimeMillis()
        val total = store.size
        val expired = store.values.count { it.ttl > 0 && it.expiresAt <= now }
        return mapOf("total_entries" to total, "expired_entries" to expired)
    }
}
