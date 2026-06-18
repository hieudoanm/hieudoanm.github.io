package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

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

    @Test
    fun testNetHelp() {
        val cmd = NetCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "status")
        assertContains(result.stdout, "ping")
        assertContains(result.stdout, "dns")
        assertContains(result.stdout, "http")
        assertContains(result.stdout, "ip")
        assertContains(result.stdout, "cert")
        assertContains(result.stdout, "whois")
        assertContains(result.stdout, "serve")
        assertContains(result.stdout, "wifi")
    }

    @Test
    fun testNetWhois() {
        val cmd = NetCommand()
        val result = cmd.test("whois --domain example.com")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetWhoisServer() {
        val cmd = NetCommand()
        val result = cmd.test("whois --domain example.com --server whois.verisign-grs.com")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetHttpHelp() {
        val cmd = NetCommand()
        val result = cmd.test("http --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetIpHelp() {
        val cmd = NetCommand()
        val result = cmd.test("ip --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetCertHelp() {
        val cmd = NetCommand()
        val result = cmd.test("cert --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetCertInfoHelp() {
        val cmd = NetCommand()
        val result = cmd.test("cert info --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetCertCheckHelp() {
        val cmd = NetCommand()
        val result = cmd.test("cert check --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetServeHelp() {
        val cmd = NetCommand()
        val result = cmd.test("serve --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetWifiHelp() {
        val cmd = NetCommand()
        val result = cmd.test("wifi --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testNetPingJson() {
        val cmd = NetCommand()
        val result = cmd.test("ping --host localhost --port 80 --count 1 --timeout 2 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "host")
        assertContains(result.stdout, "port")
        assertContains(result.stdout, "sent")
        assertContains(result.stdout, "successes")
        assertContains(result.stdout, "failures")
    }

    @Test
    fun testNetPingFailure() {
        val cmd = NetCommand()
        val result = cmd.test("ping --host 192.0.2.1 --port 99 --count 1 --timeout 1")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.contains("error", ignoreCase = true))
    }

    @Test
    fun testIPInfoDataClass() {
        val info = IPInfo(
            ip = "8.8.8.8", version = "IPv4", city = "Mountain View",
            region = "California", countryName = "United States", countryCode = "US",
            postal = "94043", latitude = "37.386", longitude = "-122.0838",
            timezone = "America/Los_Angeles", org = "Google LLC", asn = "AS15169"
        )
        assertEquals("8.8.8.8", info.ip)
        assertEquals("Mountain View", info.city)
    }

    @Test
    fun testDnsResultDataClass() {
        val dns = DnsResult(domain = "example.com", a = listOf("93.184.216.34"), cname = "")
        assertEquals("example.com", dns.domain)
        assertContains(dns.a.toString(), "93.184.216.34")
    }
}
