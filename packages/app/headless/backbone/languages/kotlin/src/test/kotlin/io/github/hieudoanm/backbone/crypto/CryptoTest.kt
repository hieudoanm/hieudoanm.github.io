package io.github.hieudoanm.backbone.crypto

import java.security.SecureRandom
import kotlin.test.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals
import kotlin.test.assertNotEquals
import kotlin.test.assertTrue

class CryptoTest {
    private val key = ByteArray(32).also { SecureRandom().nextBytes(it) }

    @Test
    fun `aes encrypt and decrypt round trip`() {
        val original = "Hello, World! This is a secret message."
        val encrypted = aesEncrypt(key, original)
        assertNotEquals(original, encrypted)
        val decrypted = aesDecrypt(key, encrypted)
        assertEquals(original, decrypted)
    }

    @Test
    fun `aes encryption produces different ciphertext each time`() {
        val message = "same message"
        val encrypted1 = aesEncrypt(key, message)
        val encrypted2 = aesEncrypt(key, message)
        assertNotEquals(encrypted1, encrypted2)
    }

    @Test
    fun `uuid generates 32 character hex string`() {
        val id = uuid()
        assertEquals(32, id.length)
        assertTrue(id.matches(Regex("[0-9a-f]{32}")))
    }

    @Test
    fun `uuid generates unique values`() {
        val ids = (1..100).map { uuid() }
        assertEquals(ids.toSet().size, ids.size)
    }
}
