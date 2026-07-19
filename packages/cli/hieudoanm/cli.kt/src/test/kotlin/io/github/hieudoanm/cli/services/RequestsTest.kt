package io.github.hieudoanm.cli.services

import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import okhttp3.mockwebserver.MockResponse
import okhttp3.mockwebserver.MockWebServer

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

    @Test
    fun testGetSuccess() {
        val server = MockWebServer()
        server.enqueue(MockResponse().setBody("""{"status":"ok"}""").setResponseCode(200))
        server.start()
        val url = server.url("/test").toString()
        val result = Requests.get(url)
        assertTrue(result.isSuccess)
        assertEquals("""{"status":"ok"}""", result.getOrNull())
        server.shutdown()
    }

    @Test
    fun testGetWithHeaders() {
        val server = MockWebServer()
        server.enqueue(MockResponse().setBody("done").setResponseCode(200))
        server.start()
        val url = server.url("/auth").toString()
        val result = Requests.get(url, mapOf("Authorization" to "Bearer token123"))
        assertTrue(result.isSuccess)
        val recorded = server.takeRequest()
        assertEquals("Bearer token123", recorded.getHeader("Authorization"))
        server.shutdown()
    }

    @Test
    fun testGetServerError() {
        val server = MockWebServer()
        server.enqueue(MockResponse().setBody("not found").setResponseCode(404))
        server.start()
        val url = server.url("/missing").toString()
        val result = Requests.get(url)
        assertTrue(result.isFailure)
        assertTrue(result.exceptionOrNull()?.message?.contains("404") == true)
        server.shutdown()
    }

    @Test
    fun testPostSuccess() {
        val server = MockWebServer()
        server.enqueue(MockResponse().setBody("""{"result":"created"}""").setResponseCode(201))
        server.start()
        val url = server.url("/data").toString()
        val result = Requests.post(url, """{"name":"test"}""")
        assertTrue(result.isSuccess)
        assertEquals("""{"result":"created"}""", result.getOrNull())
        val recorded = server.takeRequest()
        assertEquals("POST", recorded.method)
        assertEquals("""{"name":"test"}""", recorded.body.readUtf8())
        server.shutdown()
    }

    @Test
    fun testPostWithHeaders() {
        val server = MockWebServer()
        server.enqueue(MockResponse().setBody("ok").setResponseCode(200))
        server.start()
        val url = server.url("/api").toString()
        val result = Requests.post(url, """{}""", mapOf("X-Custom" to "value"))
        assertTrue(result.isSuccess)
        val recorded = server.takeRequest()
        assertEquals("value", recorded.getHeader("X-Custom"))
        assertEquals("POST", recorded.method)
        server.shutdown()
    }

    @Test
    fun testPostServerError() {
        val server = MockWebServer()
        server.enqueue(MockResponse().setBody("bad request").setResponseCode(400))
        server.start()
        val url = server.url("/bad").toString()
        val result = Requests.post(url, """{"x":"y"}""")
        assertTrue(result.isFailure)
        assertTrue(result.exceptionOrNull()?.message?.contains("400") == true)
        server.shutdown()
    }

}
