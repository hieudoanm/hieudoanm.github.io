package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.default as argumentDefault
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.required
import com.google.gson.GsonBuilder
import com.google.gson.JsonParser
import org.apache.commons.codec.binary.Base32
import java.io.File
import java.security.KeyPairGenerator
import java.security.MessageDigest
import java.security.SecureRandom
import java.time.Instant
import java.util.Base64
import java.util.UUID
import javax.crypto.Cipher
import javax.crypto.Mac
import javax.crypto.spec.GCMParameterSpec
import javax.crypto.spec.SecretKeySpec

class CryptoCommand : CliktCommand(name = "crypto", help = "Cryptographic and security tools") {
    init {
        subcommands(CryptoHash(), CryptoJwt(), CryptoKeygen(), CryptoPasswd(),
            CryptoUuid(), CryptoQrcode(), CryptoEncrypt(), CryptoDecrypt(), CryptoTotp())
    }
    override fun run() = Unit
}

class CryptoHash : CliktCommand(name = "hash", help = "Compute hashes of text or files") {
    private val algorithm by option("--algo", "-a").default("sha256")
    private val text by option("--text", "-t").default("")
    private val key by option("--key", "-k").default("")
    private val check by option("--check").flag()
    private val json by option("--json").flag()
    private val filePath by argument().argumentDefault("")

    override fun run() {
        val input: ByteArray
        when {
            text.isNotEmpty() -> input = text.toByteArray()
            filePath.isNotEmpty() -> input = File(filePath).readBytes()
            else -> input = System.`in`.readBytes()
        }

        if (check) {
            val content = input.decodeToString().trim()
            val parts = content.split(" ", limit = 2)
            if (parts.size != 2) {
                echo("invalid --check format: expected 'hash filename'")
                return
            }
            val expectedHash = parts[0]
            val filename = parts[1]
            val fileContent = File(filename).readBytes()
            val actualHash = computeHash(fileContent, algorithm)
            val status = actualHash == expectedHash
            if (json) {
                val g = GsonBuilder().setPrettyPrinting().create()
                echo(g.toJson(mapOf("filename" to filename, "algorithm" to algorithm, "expected" to expectedHash, "actual" to actualHash, "status" to status)))
            } else {
                echo("$filename: ${if (status) "OK" else "FAILED"}")
            }
            return
        }

        if (key.isNotEmpty()) {
            val macAlgo = when (algorithm.lowercase()) {
                "md5" -> "HmacMD5"
                "sha1" -> "HmacSHA1"
                "sha256" -> "HmacSHA256"
                "sha512" -> "HmacSHA512"
                else -> {
                    echo("unknown algorithm: $algorithm")
                    return
                }
            }
            val mac = Mac.getInstance(macAlgo)
            mac.init(SecretKeySpec(key.toByteArray(), macAlgo))
            val result = mac.doFinal(input).joinToString("") { "%02x".format(it) }
            if (json) {
                val g = GsonBuilder().setPrettyPrinting().create()
                echo(g.toJson(mapOf("algorithm" to algorithm, "mode" to "hmac", "hash" to result)))
            } else {
                echo(result)
            }
        } else {
            val result = computeHash(input, algorithm)
            if (json) {
                val g = GsonBuilder().setPrettyPrinting().create()
                echo(g.toJson(mapOf("algorithm" to algorithm, "hash" to result)))
            } else {
                echo(result)
            }
        }
    }

    private fun computeHash(input: ByteArray, algo: String): String {
        val md = MessageDigest.getInstance(
            when (algo.lowercase()) {
                "md5" -> "MD5"
                "sha1" -> "SHA-1"
                "sha256" -> "SHA-256"
                "sha512" -> "SHA-512"
                else -> {
                    echo("unknown algorithm: $algo")
                    return ""
                }
            }
        )
        return md.digest(input).joinToString("") { "%02x".format(it) }
    }
}

class CryptoJwt : CliktCommand(name = "jwt", help = "Encode and decode JWTs") {
    init {
        subcommands(CryptoJwtEncode(), CryptoJwtDecode())
    }
    override fun run() = Unit
}

class CryptoJwtEncode : CliktCommand(name = "encode", help = "Encode and sign a JWT token") {
    private val algorithm by option("--algorithm", "-a").default("HS256")
    private val key by option("--key", "-k").required()
    private val claims by option("--claims", "-c").required()

    override fun run() {
        val parsedClaims = JsonParser.parseString(claims).asJsonObject
        val header = """{"alg":"$algorithm","typ":"JWT"}"""
        val b64header = Base64.getUrlEncoder().withoutPadding().encodeToString(header.toByteArray())
        val b64payload = Base64.getUrlEncoder().withoutPadding().encodeToString(parsedClaims.toString().toByteArray())
        val signingInput = "$b64header.$b64payload"

        val macAlgo = when (algorithm) {
            "HS256" -> "HmacSHA256"
            "HS384" -> "HmacSHA384"
            "HS512" -> "HmacSHA512"
            else -> {
                echo("unsupported algorithm: $algorithm (use HS256, HS384, HS512)")
                return
            }
        }
        val mac = Mac.getInstance(macAlgo)
        mac.init(SecretKeySpec(key.toByteArray(), macAlgo))
        val sig = Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(signingInput.toByteArray()))
        echo("$signingInput.$sig")
    }
}

class CryptoJwtDecode : CliktCommand(name = "decode", help = "Decode a JWT token without signature verification") {
    private val token by option("--token", "-t").required()
    private val json by option("--json").flag()

    override fun run() {
        val parts = token.split(".")
        if (parts.size < 2) {
            echo("invalid JWT format")
            return
        }
        val headerJson = String(Base64.getUrlDecoder().decode(parts[0]))
        val payloadJson = String(Base64.getUrlDecoder().decode(parts[1]))
        val g = GsonBuilder().setPrettyPrinting().create()
        val header = JsonParser.parseString(headerJson)
        val payload = JsonParser.parseString(payloadJson)

        if (json) {
            echo(g.toJson(mapOf("header" to header, "payload" to payload)))
        } else {
            echo("Header:\n$headerJson\n")
            echo("Payload:")
            val obj = payload.asJsonObject
            obj.keySet().forEach { key ->
                echo("  $key: ${obj.get(key)}")
            }
        }
    }
}

class CryptoKeygen : CliktCommand(name = "keygen", help = "Generate a new SSH keypair") {
    private val algorithm by option("--algo", "-a").default("ed25519")
    private val bits by option("--bits", "-b").default("256")
    private val output by option("--output", "-o").default("id_rsa")

    override fun run() {
        val outFile = File(output)
        val keyPair = when (algorithm) {
            "rsa" -> {
                val kg = KeyPairGenerator.getInstance("RSA")
                kg.initialize(bits.toInt(), SecureRandom())
                kg.generateKeyPair()
            }
            "ecdsa" -> {
                val kg = KeyPairGenerator.getInstance("EC")
                kg.initialize(bits.toInt(), SecureRandom())
                kg.generateKeyPair()
            }
            "ed25519" -> {
                val kg = KeyPairGenerator.getInstance("Ed25519")
                kg.generateKeyPair()
            }
            else -> {
                echo("unsupported algorithm: $algorithm (use rsa, ecdsa, or ed25519)")
                return
            }
        }

        val privKeyBytes = keyPair.private.encoded
        val pubKeyBytes = keyPair.public.encoded
        val privPem = buildPem("PRIVATE KEY", privKeyBytes)
        val pubPem = buildPem("PUBLIC KEY", pubKeyBytes)

        outFile.parentFile?.mkdirs()
        outFile.writeText(privPem)
        outFile.setReadable(true, true)
        outFile.setWritable(true, true)

        val pubFile = File("${output}.pub")
        pubFile.writeText(pubPem)

        echo("Wrote ${outFile.absolutePath}")
        echo("Wrote ${pubFile.absolutePath}")
    }

    private fun buildPem(type: String, bytes: ByteArray): String {
        val b64 = Base64.getMimeEncoder(64, "\n".toByteArray()).encodeToString(bytes)
        return "-----BEGIN $type-----\n$b64\n-----END $type-----\n"
    }
}

class CryptoPasswd : CliktCommand(name = "passwd", help = "Generate secure random passwords") {
    private val length by option("--length", "-l").default("16")
    private val count by option("--count", "-n").default("1")
    private val digits by option("--digits", "-d").flag()
    private val symbols by option("--symbols", "-s").flag()
    private val noUpper by option("--no-upper").flag()
    private val pin by option("--pin").flag()
    private val pronounceable by option("--pronounceable").flag()
    private val json by option("--json").flag()

    private val lower = "abcdefghijklmnopqrstuvwxyz"
    private val upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    private val digitChars = "0123456789"
    private val symbolChars = "!@#\$%^&*()-_=+[]{}<>?|~"
    private val vowels = "aeiou"
    private val consonants = "bcdfghjklmnpqrstvwxyz"
    private val rng = SecureRandom()

    override fun run() {
        val passwords = (1..count.toInt()).map { genPassword() }
        if (json) {
            val g = GsonBuilder().setPrettyPrinting().create()
            echo(g.toJson(mapOf(
                "passwords" to passwords,
                "count" to count.toInt(),
                "length" to length.toInt(),
                "type" to when {
                    pin -> "pin"
                    pronounceable -> "pronounceable"
                    else -> "random"
                }
            )))
        } else {
            passwords.forEach { echo(it) }
        }
    }

    private fun genPassword(): String {
        if (pin) {
            return (1..length.toInt()).map { digitChars[rng.nextInt(digitChars.length)] }.joinToString("")
        }
        if (pronounceable) {
            val sb = StringBuilder()
            while (sb.length < length.toInt()) {
                sb.append(consonants[rng.nextInt(consonants.length)])
                sb.append(vowels[rng.nextInt(vowels.length)])
            }
            return sb.substring(0, length.toInt())
        }
        var charset = lower
        if (!noUpper) charset += upper
        if (digits) charset += digitChars
        if (symbols) charset += symbolChars
        return (1..length.toInt()).map { charset[rng.nextInt(charset.length)] }.joinToString("")
    }
}

class CryptoUuid : CliktCommand(name = "uuid", help = "Generate UUID v4 identifiers") {
    private val count by option("--count", "-n").default("1")
    private val json by option("--json").flag()
    override fun run() {
        val uuids = (1..count.toInt()).map { UUID.randomUUID().toString() }
        if (json) {
            val g = GsonBuilder().setPrettyPrinting().create()
            echo(g.toJson(mapOf("uuids" to uuids, "count" to count.toInt())))
        } else {
            uuids.forEach { echo(it) }
        }
    }
}

class CryptoQrcode : CliktCommand(name = "qrcode", help = "Generate a QR code in the terminal") {
    private val data by option("--data", "-d").default("")
    override fun run() {
        echo("QR code generation not available in this build")
    }
}

class CryptoEncrypt : CliktCommand(name = "encrypt", help = "Encrypt a file with AES-256-GCM") {
    private val file by option("--file", "-f").default("")
    private val password by option("--password", "-p").required()
    private val output by option("--output", "-o").default("")

    override fun run() {
        val plaintext = File(file).readBytes()
        val key = MessageDigest.getInstance("SHA-256").digest(password.toByteArray())
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        val spec = SecretKeySpec(key, "AES")
        cipher.init(Cipher.ENCRYPT_MODE, spec)
        val ciphertext = cipher.doFinal(plaintext)
        val outPath = if (output.isNotEmpty()) output else "$file.enc"
        File(outPath).writeBytes(cipher.iv + ciphertext)
        echo(outPath)
    }
}

class CryptoDecrypt : CliktCommand(name = "decrypt", help = "Decrypt a file encrypted with AES-256-GCM") {
    private val file by option("--file", "-f").default("")
    private val password by option("--password", "-p").required()
    private val output by option("--output", "-o").default("")

    override fun run() {
        val data = File(file).readBytes()
        val key = MessageDigest.getInstance("SHA-256").digest(password.toByteArray())
        val cipher = Cipher.getInstance("AES/GCM/NoPadding")
        val gcmSpec = GCMParameterSpec(128, data.copyOfRange(0, 12))
        val spec = SecretKeySpec(key, "AES")
        cipher.init(Cipher.DECRYPT_MODE, spec, gcmSpec)
        val plaintext = cipher.doFinal(data.copyOfRange(12, data.size))
        val outPath = when {
            output.isNotEmpty() -> output
            file.endsWith(".enc") -> file.removeSuffix(".enc")
            else -> "$file.dec"
        }
        File(outPath).writeBytes(plaintext)
        echo(outPath)
    }
}

class CryptoTotp : CliktCommand(name = "totp", help = "Generate a TOTP code from a Base32 secret") {
    private val secret by option("--secret", "-s").default("")
    private val step by option("--step").default("30")
    private val digits by option("--digits").default("6")
    private val timeStr by option("--time").default("")
    private val json by option("--json").flag()

    override fun run() {
        var secretKey = secret.uppercase().replace(" ", "")
        val padding = (8 - secretKey.length % 8) % 8
        if (padding > 0) secretKey += "=".repeat(padding)

        val keyBytes = Base32().decode(secretKey)
        val time = if (timeStr.isNotEmpty()) java.time.Instant.parse(timeStr) else Instant.now()
        var counter = time.epochSecond / step.toLong()

        val counterBytes = ByteArray(8)
        for (i in 7 downTo 0) {
            counterBytes[i] = (counter and 0xFF).toByte()
            counter = counter shr 8
        }

        val mac = Mac.getInstance("HmacSHA1")
        mac.init(SecretKeySpec(keyBytes, "HmacSHA1"))
        val hash = mac.doFinal(counterBytes)

        val offset = hash[hash.size - 1].toInt() and 0x0F
        val code = ((hash[offset].toInt() and 0x7F) shl 24) or
                ((hash[offset + 1].toInt() and 0xFF) shl 16) or
                ((hash[offset + 2].toInt() and 0xFF) shl 8) or
                (hash[offset + 3].toInt() and 0xFF)
        val truncated = code % Math.pow(10.0, digits.toDouble()).toInt()
        val codeStr = "%0${digits}d".format(truncated)
        val remaining = step.toLong() - (time.epochSecond % step.toLong())

        if (json) {
            val g = GsonBuilder().setPrettyPrinting().create()
            echo(g.toJson(mapOf("code" to codeStr, "step" to step.toInt(), "remaining" to remaining, "time" to time.toString())))
        } else {
            echo(codeStr)
        }
    }
}
