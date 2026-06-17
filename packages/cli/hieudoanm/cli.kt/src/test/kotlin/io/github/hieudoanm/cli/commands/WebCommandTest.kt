package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class WebCommandTest {
    @Test
    fun testWebWeather() {
        val cmd = WebCommand()
        val result = cmd.test("weather London")
        assertEquals(0, result.statusCode)
    }
}
