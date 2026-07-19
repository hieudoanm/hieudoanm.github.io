package io.github.hieudoanm.backbone.openapi

import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class OpenApiTest {
    @Test
    fun `spec has openapi version`() {
        assertEquals("3.0.3", openApiSpec["openapi"])
    }

    @Test
    fun `spec has info section with title and version`() {
        val info = openApiSpec["info"] as Map<*, *>
        assertEquals("BackboneServer API", info["title"])
        assertEquals("0.0.1", info["version"])
    }

    @Test
    fun `spec has servers section`() {
        val servers = openApiSpec["servers"] as List<*>
        assertTrue(servers.isNotEmpty())
    }

    @Test
    fun `spec has path entries for all endpoints`() {
        val paths = openApiSpec["paths"] as Map<*, *>
        assertTrue(paths.containsKey("/api/health"))
        assertTrue(paths.containsKey("/api/auth/register"))
        assertTrue(paths.containsKey("/api/auth/login"))
        assertTrue(paths.containsKey("/api/collections"))
        assertTrue(paths.containsKey("/api/buckets"))
    }

    @Test
    fun `spec has correct server url`() {
        val servers = openApiSpec["servers"] as List<*>
        val first = servers.first() as Map<*, *>
        assertEquals("/", first["url"])
    }
}
