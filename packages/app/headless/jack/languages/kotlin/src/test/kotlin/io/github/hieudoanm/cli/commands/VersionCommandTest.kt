package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class VersionCommandTest {
    @Test
    fun testVersion() {
        val result = VersionCommand().test()
        assertEquals(0, result.statusCode)
        assertEquals("Version: $APP_VERSION\n", result.stdout)
    }

    @Test
    fun testVersionJson() {
        val result = VersionCommand().test("--json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"version\": \"$APP_VERSION\"")
    }
}
