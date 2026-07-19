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

    @Test
    fun testPortScan() {
        val cmd = PortCommand()
        val result = cmd.test("scan --host localhost --ports 1,2 --timeout 1")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testPortScanJson() {
        val cmd = PortCommand()
        val result = cmd.test("scan --host localhost --ports 3 --timeout 1 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "host")
        assertContains(result.stdout, "ports")
    }

    @Test
    fun testPortScanRange() {
        val cmd = PortCommand()
        val result = cmd.test("scan --host localhost --ports 4-5 --timeout 1")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testPortScanAllCommon() {
        val cmd = PortCommand()
        val result = cmd.test("scan --host 127.0.0.1 --timeout 1")
        assertEquals(0, result.statusCode)
    }
}
