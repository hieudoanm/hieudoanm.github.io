package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import java.io.File

class CryptoCommandTest {
    @Test
    fun testHashSha256() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824", result.stdout.trim())
    }

    @Test
    fun testHashMd5() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --algo md5 --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("5d41402abc4b2a76b9719d911017c592", result.stdout.trim())
    }

    @Test
    fun testHashSha1() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --algo sha1 --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d", result.stdout.trim())
    }

    @Test
    fun testHashSha512() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --algo sha512 --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043", result.stdout.trim())
    }

    @Test
    fun testHashJson() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --json --text 'hello'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "algorithm")
        assertContains(result.stdout, "hash")
    }

    @Test
    fun testHashUnknownAlgo() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --algo unknown --text 'test'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "unknown algorithm")
    }

    @Test
    fun testHashHmac() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --key 'secret' --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("88aab3ede8d3adf94d26ab90d3bafd4a2083070c3bcce9c014ee04a443847c0b", result.stdout.trim())
    }

    @Test
    fun testHashHmacSha1() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --algo sha1 --key 'secret' --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("5112055c05f944f85755efc5cd8970e194e9f45b", result.stdout.trim())
    }

    @Test
    fun testHashHmacSha512() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --algo sha512 --key 'secret' --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("db1595ae88a62fd151ec1cba81b98c39df82daae7b4cb9820f446d5bf02f1dcfca6683d88cab3e273f5963ab8ec469a746b5b19086371239f67d1e5f99a79440", result.stdout.trim())
    }

    @Test
    fun testHashHmacMd5() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --algo md5 --key 'secret' --text 'hello'")
        assertEquals(0, result.statusCode)
        assertEquals("bade63863c61ed0b3165806ecd6acefc", result.stdout.trim())
    }

    @Test
    fun testHashHmacJson() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --key 'secret' --text 'hello' --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hmac")
    }

    @Test
    fun testHashHmacUnknownAlgo() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --key secret --algo unknown --text 'hello'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "unknown algorithm")
    }

    @Test
    fun testHashCheck() {
        val filePath = "/tmp/test-crypto-check-ok.txt"
        File(filePath).writeText("test data")
        val hashCmd = CryptoCommand()
        val hashResult = hashCmd.test("hash --algo sha256 --text 'test data'")
        val expectedHash = hashResult.stdout.trim()
        val cmd = CryptoCommand()
        val result = cmd.test("hash --check --text '$expectedHash $filePath'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "OK")
    }

    @Test
    fun testHashCheckFail() {
        val filePath = "/tmp/test-crypto-check-fail.txt"
        File(filePath).writeText("test data")
        val cmd = CryptoCommand()
        val result = cmd.test("hash --check --text '0000000000000000000000000000000000000000000000000000000000000000 $filePath'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "FAILED")
    }

    @Test
    fun testHashCheckJson() {
        val filePath = "/tmp/test-crypto-check-json.txt"
        File(filePath).writeText("test data")
        val hashCmd = CryptoCommand()
        val hashResult = hashCmd.test("hash --algo sha256 --text 'test data'")
        val expectedHash = hashResult.stdout.trim()
        val cmd = CryptoCommand()
        val result = cmd.test("hash --check --json --text '$expectedHash $filePath'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "status")
        assertContains(result.stdout, "actual")
    }

    @Test
    fun testHashCheckInvalidFormat() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --check --text 'invalid'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "invalid --check format")
    }

    @Test
    fun testUuid() {
        val cmd = CryptoCommand()
        val result = cmd.test("uuid")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.trim().length == 36 || result.stdout.trim().length == 37)
    }

    @Test
    fun testUuidCount() {
        val cmd = CryptoCommand()
        val result = cmd.test("uuid --count 3")
        assertEquals(0, result.statusCode)
        assertEquals(3, result.stdout.trim().lines().size)
    }

    @Test
    fun testUuidJson() {
        val cmd = CryptoCommand()
        val result = cmd.test("uuid --count 2 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "uuids")
    }

    @Test
    fun testPasswdDefault() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.trim().length == 16)
    }

    @Test
    fun testPasswdWithSymbols() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --length 20 --symbols --digits")
        assertEquals(0, result.statusCode)
        assertEquals(20, result.stdout.trim().length)
    }

    @Test
    fun testPasswdPin() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --pin --length 6")
        assertEquals(0, result.statusCode)
        assertEquals(6, result.stdout.trim().length)
        assertTrue(result.stdout.trim().all { it.isDigit() })
    }

    @Test
    fun testPasswdNoUpper() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --no-upper --length 20")
        assertEquals(0, result.statusCode)
        assertEquals(20, result.stdout.trim().length)
        assertTrue(result.stdout.trim().all { it.isLowerCase() || it.isDigit() })
    }

    @Test
    fun testPasswdPronounceable() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --pronounceable --length 10")
        assertEquals(0, result.statusCode)
        assertEquals(10, result.stdout.trim().length)
    }

    @Test
    fun testPasswdCount() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --count 3 --length 8")
        assertEquals(0, result.statusCode)
        assertEquals(3, result.stdout.trim().lines().size)
    }

    @Test
    fun testPasswdJson() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "passwords")
    }

    @Test
    fun testPasswdJsonPin() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --json --pin --length 8")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "pin")
    }

    @Test
    fun testPasswdJsonPronounceable() {
        val cmd = CryptoCommand()
        val result = cmd.test("passwd --json --pronounceable --length 8")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "pronounceable")
    }

    @Test
    fun testJwtEncode() {
        val cmd = CryptoCommand()
        val result = cmd.test("jwt encode --key secret --claims '{\"sub\":\"123\"}'")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.trim().count { it == '.' } == 2)
    }

    @Test
    fun testJwtEncodeHs384() {
        val cmd = CryptoCommand()
        val result = cmd.test("jwt encode --algorithm HS384 --key secret --claims '{\"sub\":\"123\"}'")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.trim().count { it == '.' } == 2)
    }

    @Test
    fun testJwtEncodeUnsupportedAlgo() {
        val cmd = CryptoCommand()
        val result = cmd.test("jwt encode --algorithm RS256 --key secret --claims '{\"sub\":\"123\"}'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "unsupported algorithm")
    }

    @Test
    fun testJwtDecode() {
        val cmd = CryptoCommand()
        val token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.fake"
        val result = cmd.test("jwt decode --token $token")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "sub")
        assertContains(result.stdout, "alg")
    }

    @Test
    fun testJwtDecodeJson() {
        val cmd = CryptoCommand()
        val token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMifQ.fake"
        val result = cmd.test("jwt decode --token $token --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "header")
        assertContains(result.stdout, "payload")
    }

    @Test
    fun testJwtDecodeInvalid() {
        val cmd = CryptoCommand()
        val result = cmd.test("jwt decode --token invalidtoken")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "invalid JWT format")
    }

    @Test
    fun testTotp() {
        val cmd = CryptoCommand()
        val result = cmd.test("totp --secret GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ --time '1970-01-01T00:00:59Z' --digits 8")
        assertEquals(0, result.statusCode)
        assertEquals("94287082", result.stdout.trim())
    }

    @Test
    fun testTotpJson() {
        val cmd = CryptoCommand()
        val result = cmd.test("totp --secret GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ --time '1970-01-01T00:00:59Z' --digits 8 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "code")
        assertContains(result.stdout, "step")
    }

    @Test
    fun testTotpDefaultDigits() {
        val cmd = CryptoCommand()
        val result = cmd.test("totp --secret GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ --time '1970-01-01T00:00:59Z'")
        assertEquals(0, result.statusCode)
        assertEquals(6, result.stdout.trim().length)
        assertTrue(result.stdout.trim().all { it.isDigit() })
    }

    @Test
    fun testKeygen() {
        val out = "/tmp/test-crypto-keygen"
        val cmd = CryptoCommand()
        val result = cmd.test("keygen --algo rsa --bits 1024 --output $out")
        assertEquals(0, result.statusCode)
        assertTrue(File(out).exists())
        assertTrue(File("$out.pub").exists())
        assertContains(result.stdout, "Wrote")
    }

    @Test
    fun testKeygenEd25519() {
        val out = "/tmp/test-crypto-keygen-ed"
        val cmd = CryptoCommand()
        val result = cmd.test("keygen --algo ed25519 --output $out")
        assertEquals(0, result.statusCode)
        assertTrue(File(out).exists())
        assertTrue(File("$out.pub").exists())
    }

    @Test
    fun testKeygenEcdsa() {
        val out = "/tmp/test-crypto-keygen-ec"
        val cmd = CryptoCommand()
        val result = cmd.test("keygen --algo ecdsa --bits 256 --output $out")
        assertEquals(0, result.statusCode)
        assertTrue(File(out).exists())
        assertTrue(File("$out.pub").exists())
    }

    @Test
    fun testKeygenUnsupportedAlgo() {
        val cmd = CryptoCommand()
        val result = cmd.test("keygen --algo dsa --output /tmp/test-crypto-bad")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "unsupported algorithm")
    }
}
