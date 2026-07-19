package io.github.hieudoanm.backbone.ratelimit

import kotlin.test.Test
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class RateLimiterTest {
    @Test
    fun `check returns true within capacity`() {
        val limiter = RateLimiter(capacity = 10, refillRate = 100.0)
        for (i in 1..10) {
            assertTrue(limiter.check("test-key"), "Request $i should be allowed")
        }
    }

    @Test
    fun `check returns false when exceeded`() {
        val limiter = RateLimiter(capacity = 5, refillRate = 100.0)
        for (i in 1..5) {
            assertTrue(limiter.check("test-key"))
        }
        assertFalse(limiter.check("test-key"))
    }

    @Test
    fun `different keys have independent buckets`() {
        val limiter = RateLimiter(capacity = 2, refillRate = 100.0)
        assertTrue(limiter.check("key-a"))
        assertTrue(limiter.check("key-a"))
        assertFalse(limiter.check("key-a"))
        assertTrue(limiter.check("key-b"))
    }
}
