package io.github.hieudoanm.cli.services

import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertTrue

class RequestsTest {
    @Test
    fun testGetInvalidUrl() {
        val result = Requests.get("http://invalid-nonexistent-url-12345.com")
        assertTrue(result.isFailure)
    }

    @Test
    fun testGetInvalidProtocol() {
        val result = Requests.get("ftp://example.com")
        assertTrue(result.isFailure)
    }

    @Test
    fun testPostInvalidUrl() {
        val result = Requests.post("http://invalid-nonexistent-url-12345.com", """{"key":"value"}""")
        assertTrue(result.isFailure)
    }
}
