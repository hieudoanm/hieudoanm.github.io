package io.github.hieudoanm.backbone.http

import kotlin.test.Test

class HttpClientTest {
    @Test
    fun `createHttpClient returns a working client`() {
        val client = createHttpClient()
        client.close()
    }
}
