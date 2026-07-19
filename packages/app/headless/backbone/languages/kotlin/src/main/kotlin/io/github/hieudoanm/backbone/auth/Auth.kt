package io.github.hieudoanm.backbone.auth

import at.favre.lib.crypto.bcrypt.BCrypt
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jws
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import java.util.*

fun hashPassword(password: String): String =
    BCrypt.withDefaults().hashToString(12, password.toCharArray())

fun verifyPassword(password: String, hash: String): Boolean =
    BCrypt.verifyer().verify(password.toCharArray(), hash).verified

fun generateToken(secret: String, userId: String, email: String): String {
    val key = Keys.hmacShaKeyFor(secret.toByteArray())
    val now = Date()
    return Jwts.builder()
        .claim("user_id", userId)
        .claim("email", email)
        .issuedAt(now)
        .expiration(Date(now.time + 72 * 60 * 60 * 1000))
        .signWith(key)
        .compact()
}

fun validateToken(secret: String, token: String): Claims? {
    return try {
        val key = Keys.hmacShaKeyFor(secret.toByteArray())
        Jwts.parser().verifyWith(key).build()
            .parseSignedClaims(token)
            .payload
    } catch (_: Exception) {
        null
    }
}
