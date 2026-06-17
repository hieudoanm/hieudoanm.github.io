package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class PortCommandTest {
    @Test
    fun testPortFind() {
        val cmd = PortCommand()
        val result = cmd.test("find --start 9000 --end 9005")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Available port:")
    }

    @Test
    fun testPortFindJson() {
        val cmd = PortCommand()
        val result = cmd.test("find --start 9000 --end 9005 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "port")
    }

    @Test
    fun testPortCheck() {
        val cmd = PortCommand()
        val result = cmd.test("check --target localhost:9999 --timeout 1")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testPortCheckJson() {
        val cmd = PortCommand()
        val result = cmd.test("check --target localhost:9999 --timeout 1 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "host")
        assertContains(result.stdout, "port")
        assertContains(result.stdout, "open")
    }
}
