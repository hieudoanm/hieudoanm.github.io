package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class TimeCommandTest {
    @Test
    fun testTimeAge() {
        val cmd = TimeCommand()
        // Assuming current date is after 2000-01-01
        val result = cmd.test("age -d 2000-01-01")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "years")
    }

    @Test
    fun testTimeEpoch() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch 1609459200 --iso")
        assertEquals(0, result.statusCode)
        // 1609459200 is 2021-01-01T00:00:00Z
        assertContains(result.stdout, "2021-01-01T00:00:00Z")
    }

    @Test
    fun testTimeEpochFromJson() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch 1609459200 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"epoch\": 1609459200")
        assertContains(result.stdout, "\"rfc3339\": \"2021-01-01T00:00:00Z\"")
    }
}
