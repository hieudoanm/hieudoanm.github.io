package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class NetCommandTest {
    @Test
    fun testNetStatus() {
        val cmd = NetCommand()
        val result = cmd.test("status")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "GitHub")
    }

    @Test
    fun testNetStatusJson() {
        val cmd = NetCommand()
        val result = cmd.test("status --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "name")
        assertContains(result.stdout, "status")
    }

    @Test
    fun testNetPingLocalhost() {
        val cmd = NetCommand()
        val result = cmd.test("ping --host localhost --port 80 --count 1 --timeout 2")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetDns() {
        val cmd = NetCommand()
        val result = cmd.test("dns --domain example.com --type a")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Domain:")
    }

    @Test
    fun testNetDnsJson() {
        val cmd = NetCommand()
        val result = cmd.test("dns --domain example.com --type a --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "domain")
    }
}
