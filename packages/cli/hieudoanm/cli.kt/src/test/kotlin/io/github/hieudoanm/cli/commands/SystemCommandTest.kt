package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class SystemCommandTest {
    @Test
    fun testSystemInfo() {
        val cmd = SystemCommand()
        val result = cmd.test("info")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "OS:")
        assertContains(result.stdout, "Arch:")
        assertContains(result.stdout, "CPU:")
    }

    @Test
    fun testSystemInfoJson() {
        val cmd = SystemCommand()
        val result = cmd.test("info --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "os")
        assertContains(result.stdout, "arch")
    }

    @Test
    fun testSystemEnv() {
        val cmd = SystemCommand()
        val result = cmd.test("env")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testSystemEnvFilter() {
        val cmd = SystemCommand()
        val result = cmd.test("env PATH")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "PATH=")
    }

    @Test
    fun testSystemEnvJson() {
        val cmd = SystemCommand()
        val result = cmd.test("env --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "key")
        assertContains(result.stdout, "value")
    }

    @Test
    fun testSystemPath() {
        val cmd = SystemCommand()
        val result = cmd.test("path")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testSystemPathLookup() {
        val cmd = SystemCommand()
        val result = cmd.test("path ls")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testSystemPathJson() {
        val cmd = SystemCommand()
        val result = cmd.test("path --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "index")
    }

    @Test
    fun testSystemDisk() {
        val cmd = SystemCommand()
        val result = cmd.test("disk")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Filesystem")
        assertContains(result.stdout, "Size")
    }

    @Test
    fun testSystemDiskJson() {
        val cmd = SystemCommand()
        val result = cmd.test("disk --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "filesystem")
        assertContains(result.stdout, "size")
    }

    @Test
    fun testSystemMonitor() {
        val cmd = SystemCommand()
        val result = cmd.test("monitor")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "CPU:")
        assertContains(result.stdout, "RAM:")
        assertContains(result.stdout, "Disk:")
    }

    @Test
    fun testSystemMonitorJson() {
        val cmd = SystemCommand()
        val result = cmd.test("monitor --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "cpu_percent")
        assertContains(result.stdout, "ram_percent")
    }
}
