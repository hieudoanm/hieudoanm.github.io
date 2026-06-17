package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

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
    fun testHashJson() {
        val cmd = CryptoCommand()
        val result = cmd.test("hash --json --text 'hello'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "algorithm")
        assertContains(result.stdout, "hash")
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
    fun testJwtEncode() {
        val cmd = CryptoCommand()
        val result = cmd.test("jwt encode --key secret --claims '{\"sub\":\"123\"}'")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.trim().count { it == '.' } == 2)
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
}
