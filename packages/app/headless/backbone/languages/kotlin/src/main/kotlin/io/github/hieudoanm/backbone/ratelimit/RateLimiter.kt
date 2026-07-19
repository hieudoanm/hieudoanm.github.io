package io.github.hieudoanm.backbone.ratelimit

import kotlinx.coroutines.*
import java.util.concurrent.ConcurrentHashMap

class RateLimiter(
    private val capacity: Int = 200,
    private val refillRate: Double = 100.0,
) {
    private data class Bucket(var tokens: Double, var lastRefill: Long)

    private val buckets = ConcurrentHashMap<String, Bucket>()
    private var scope: CoroutineScope? = null

    fun startCleanup(scope: CoroutineScope) {
        this.scope = scope
        scope.launch {
            while (isActive) {
                delay(60_000)
                val now = System.nanoTime()
                buckets.entries.removeIf { (_, b) ->
                    b.tokens >= capacity && (now - b.lastRefill) > 60_000_000_000L
                }
            }
        }
    }

    fun check(key: String): Boolean {
        val now = System.nanoTime()
        val bucket = buckets.computeIfAbsent(key) { Bucket(capacity.toDouble(), now) }
        synchronized(bucket) {
            val elapsed = (now - bucket.lastRefill) / 1_000_000_000.0
            bucket.tokens = minOf(capacity.toDouble(), bucket.tokens + elapsed * refillRate)
            bucket.lastRefill = now
            if (bucket.tokens >= 1.0) {
                bucket.tokens -= 1.0
                return true
            }
            return false
        }
    }
}
