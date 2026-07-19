package io.github.hieudoanm.backbone.models

import kotlinx.serialization.json.Json
import kotlin.test.Test
import kotlin.test.assertEquals

class ModelsTest {
    private val json = Json { ignoreUnknownKeys = true }

    @Test
    fun `valid log levels`() {
        assertEquals(setOf("debug", "info", "warn", "error"), validLogLevels)
    }

    @Test
    fun `valid notification types`() {
        assertEquals(setOf("info", "success", "warning", "error"), validNotificationTypes)
    }

    @Test
    fun `LogRequest serialization`() {
        val request = LogRequest(level = "info", message = "test", meta = "{}")
        val encoded = json.encodeToString(LogRequest.serializer(), request)
        val decoded = json.decodeFromString(LogRequest.serializer(), encoded)
        assertEquals(request, decoded)
    }

    @Test
    fun `NotificationRequest serialization`() {
        val request = NotificationRequest(title = "Hello", body = "World", type = "info")
        val encoded = json.encodeToString(NotificationRequest.serializer(), request)
        val decoded = json.decodeFromString(NotificationRequest.serializer(), encoded)
        assertEquals(request, decoded)
    }
}
