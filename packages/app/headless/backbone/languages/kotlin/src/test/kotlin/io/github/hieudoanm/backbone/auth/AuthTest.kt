package io.github.hieudoanm.backbone.auth

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class AuthTest {
    private val secret = "test-secret-at-least-32-characters-long!!"

    @Test
    fun `hash and verify password`() {
        val password = "test-password-123"
        val hash = hashPassword(password)
        assertTrue(hash.startsWith("$2a$") || hash.startsWith("$2b$"))
        assertTrue(verifyPassword(password, hash))
    }

    @Test
    fun `verify rejects wrong password`() {
        val hash = hashPassword("correct-password")
        assertTrue(!verifyPassword("wrong-password", hash))
    }

    @Test
    fun `generate and validate JWT token`() {
        val userId = "user-123"
        val email = "test@example.com"
        val token = generateToken(secret, userId, email)
        val claims = validateToken(secret, token)
        assertNotNull(claims)
        assertEquals(userId, claims["user_id"])
        assertEquals(email, claims["email"])
    }

    @Test
    fun `validate returns null for malformed token`() {
        val claims = validateToken(secret, "invalid.token.here")
        assertEquals(null, claims)
    }

    @Test
    fun `validate returns null for token with different secret`() {
        val token = generateToken(secret, "u1", "a@b.com")
        val claims = validateToken("different-secret-at-least-32-chars-long!!", token)
        assertEquals(null, claims)
    }
}
