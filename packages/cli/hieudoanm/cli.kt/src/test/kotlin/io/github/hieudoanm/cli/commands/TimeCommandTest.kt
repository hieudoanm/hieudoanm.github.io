package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

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

    @Test
    fun testTimeClockNow() {
        val cmd = TimeCommand()
        val result = cmd.test("clock now")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testTimeClockNowJson() {
        val cmd = TimeCommand()
        val result = cmd.test("clock now --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"date\"")
        assertContains(result.stdout, "\"time\"")
        assertContains(result.stdout, "\"unix\"")
    }

    @Test
    fun testTimeClockNowTimezone() {
        val cmd = TimeCommand()
        val result = cmd.test("clock now --timezone UTC")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "UTC")
    }

    @Test
    fun testTimeClockNowCustomFormat() {
        val cmd = TimeCommand()
        val result = cmd.test("clock now --format 'yyyy/MM/dd'")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testTimeWorld() {
        val cmd = TimeCommand()
        val result = cmd.test("world")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testTimeAgeFuture() {
        val cmd = TimeCommand()
        val result = cmd.test("age -d 2099-01-01")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "cannot be in the future")
    }

    @Test
    fun testTimeAgeJson() {
        val cmd = TimeCommand()
        val result = cmd.test("age -d 2000-01-01 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"birthdate\"")
        assertContains(result.stdout, "\"years\"")
    }

    @Test
    fun testTimeCron() {
        val cmd = TimeCommand()
        val result = cmd.test("cron --expression '0 9 * * 1-5' --next 3")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Expression:")
        assertContains(result.stdout, "Next")
    }

    @Test
    fun testTimeCronJson() {
        val cmd = TimeCommand()
        val result = cmd.test("cron --expression '0 9 * * 1-5' --next 2 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"expression\"")
        assertContains(result.stdout, "\"next_runs\"")
    }

    @Test
    fun testTimeUntil() {
        val cmd = TimeCommand()
        val result = cmd.test("until --time 2030-01-01")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.contains("d") && result.stdout.contains("h"))
    }

    @Test
    fun testTimeUntilPast() {
        val cmd = TimeCommand()
        val result = cmd.test("until --time 2000-01-01")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "has already passed")
    }

    @Test
    fun testTimeEpochNoArg() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testTimeEpochNoArgJson() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"epoch\"")
    }

    @Test
    fun testTimeEpochWithFrom() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch --from '2021-01-01'")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.trim().all { it.isDigit() })
    }

    @Test
    fun testTimeEpochWithFromJson() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch --from '2021-01-01' --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"epoch\"")
    }

    @Test
    fun testTimeEpochUnix() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch 1609459200 --unix")
        assertEquals(0, result.statusCode)
        assertEquals("1609459200", result.stdout.trim())
    }

    @Test
    fun testTimeEpochWithFormat() {
        val cmd = TimeCommand()
        val result = cmd.test("epoch 1609459200 --format 'yyyy/MM/dd'")
        assertEquals(0, result.statusCode)
        assertEquals("2021/01/01", result.stdout.trim())
    }

    @Test
    fun testTimeWorldCustom() {
        val cmd = TimeCommand()
        val result = cmd.test("world UTC")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "UTC")
    }

    @Test
    fun testTimeWorldUnknown() {
        val cmd = TimeCommand()
        val result = cmd.test("world unknownzone")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "unknown timezone")
    }
}
