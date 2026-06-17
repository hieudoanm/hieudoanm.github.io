package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class SemverCommandTest {
    @Test
    fun testSemverValidate() {
        val cmd = SemverCommand()
        val result = cmd.test("validate --versions 1.2.3")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "valid")
    }

    @Test
    fun testSemverValidateInvalid() {
        val cmd = SemverCommand()
        val result = cmd.test("validate --versions 'not-valid'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "invalid")
    }

    @Test
    fun testSemverValidateJson() {
        val cmd = SemverCommand()
        val result = cmd.test("validate --versions 1.0.0 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "valid")
        assertContains(result.stdout, "1.0.0")
    }

    @Test
    fun testSemverCompare() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 1.0.0 --b 2.0.0")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "<")
    }

    @Test
    fun testSemverCompareEqual() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 1.0.0 --b 1.0.0")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "==")
    }

    @Test
    fun testSemverCompareGreater() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 2.0.0 --b 1.0.0")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, ">")
    }

    @Test
    fun testSemverCompareJson() {
        val cmd = SemverCommand()
        val result = cmd.test("compare --a 1.0.0 --b 1.0.0 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "relation")
    }

    @Test
    fun testSemverBumpPatch() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.2.3 --patch")
        assertEquals(0, result.statusCode)
        assertEquals("1.2.4", result.stdout.trim())
    }

    @Test
    fun testSemverBumpMinor() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.2.3 --minor")
        assertEquals(0, result.statusCode)
        assertEquals("1.3.0", result.stdout.trim())
    }

    @Test
    fun testSemverBumpMajor() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.2.3 --major")
        assertEquals(0, result.statusCode)
        assertEquals("2.0.0", result.stdout.trim())
    }

    @Test
    fun testSemverBumpPrerelease() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.0.0 --minor --pre alpha")
        assertEquals(0, result.statusCode)
        assertEquals("1.1.0-alpha", result.stdout.trim())
    }

    @Test
    fun testSemverBumpJson() {
        val cmd = SemverCommand()
        val result = cmd.test("bump --version 1.0.0 --patch --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "result")
        assertContains(result.stdout, "1.0.1")
    }

    @Test
    fun testSemverSort() {
        val cmd = SemverCommand()
        val result = cmd.test("sort --versions 2.0.0,1.0.0,3.0.0")
        assertEquals(0, result.statusCode)
        val lines = result.stdout.trim().lines()
        assertEquals(3, lines.size)
        assertContains(lines[0], "1.0.0")
        assertContains(lines[2], "3.0.0")
    }

    @Test
    fun testSemverSortJson() {
        val cmd = SemverCommand()
        val result = cmd.test("sort --versions 3.0.0,1.0.0 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "sorted")
    }

    @Test
    fun testSemverRange() {
        val cmd = SemverCommand()
        val result = cmd.test("range --version 1.5.0 --range '>= 1.0.0 < 2.0.0'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "matches")
    }

    @Test
    fun testSemverRangeNoMatch() {
        val cmd = SemverCommand()
        val result = cmd.test("range --version 3.0.0 --range '>= 1.0.0 < 2.0.0'")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "does NOT match")
    }

    @Test
    fun testSemverRangeJson() {
        val cmd = SemverCommand()
        val result = cmd.test("range --version 1.0.0 --range '>= 1.0.0' --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "matches")
    }
}
