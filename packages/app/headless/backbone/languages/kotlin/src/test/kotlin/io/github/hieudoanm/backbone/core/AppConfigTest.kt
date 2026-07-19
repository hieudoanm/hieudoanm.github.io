package io.github.hieudoanm.backbone.core

import kotlin.test.Test
import kotlin.test.assertEquals

class AppConfigTest {
    @Test
    fun `default port is 8080`() {
        val config = AppConfig(
            port = 0, jwtSecret = "test", backboneData = "/tmp/test", secretsKeyHex = null,
        )
        assertEquals(0, config.port)
        assertEquals("test", config.jwtSecret)
        assertEquals("/tmp/test", config.backboneData)
        assertEquals(null, config.secretsKeyHex)
    }

    @Test
    fun `port defaults work`() {
        val config = AppConfig(
            jwtSecret = "s", backboneData = "/tmp/d", secretsKeyHex = null,
        )
        assertEquals(8080, config.port)
    }
}
