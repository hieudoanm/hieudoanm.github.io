package io.github.hieudoanm.backbone.crypto

import java.security.SecureRandom
import java.util.UUID
import javax.crypto.Cipher
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec

private const val GCM_TAG_LENGTH = 128

fun aesEncrypt(key: ByteArray, plaintext: String): String {
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    val nonce = ByteArray(12).also { SecureRandom().nextBytes(it) }
    cipher.init(Cipher.ENCRYPT_MODE, SecretKeySpec(key, "AES"), GCMParameterSpec(GCM_TAG_LENGTH, nonce))
    val ciphertext = cipher.doFinal(plaintext.toByteArray())
    return "${nonce.joinToString("") { "%02x".format(it) }}:${ciphertext.joinToString("") { "%02x".format(it) }}"
}

fun aesDecrypt(key: ByteArray, encrypted: String): String {
    val parts = encrypted.split(":", limit = 2)
    val nonce = ByteArray(12) { parts[0].substring(it * 2, it * 2 + 2).toInt(16).toByte() }
    val ciphertext = ByteArray((parts[1].length) / 2) { parts[1].substring(it * 2, it * 2 + 2).toInt(16).toByte() }
    val cipher = Cipher.getInstance("AES/GCM/NoPadding")
    cipher.init(Cipher.DECRYPT_MODE, SecretKeySpec(key, "AES"), GCMParameterSpec(GCM_TAG_LENGTH, nonce))
    return String(cipher.doFinal(ciphertext))
}

fun uuid(): String = UUID.randomUUID().toString().replace("-", "")
