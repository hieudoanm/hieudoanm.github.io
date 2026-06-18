package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class DoiCommandTest {
    @Test
    fun testDoiValidateValid() {
        val cmd = DoiCommand()
        val result = cmd.test("validate 10.1038/nphys1170")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "is a valid DOI")
    }

    @Test
    fun testDoiValidateInvalid() {
        val cmd = DoiCommand()
        val result = cmd.test("validate not-a-doi")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "is not a valid DOI format")
    }

    @Test
    fun testDoiCiteNetworkError() {
        val cmd = DoiCommand()
        val result = cmd.test("cite 10.1038/nphys1170")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testDoiFetchNetworkError() {
        val cmd = DoiCommand()
        val result = cmd.test("fetch 10.1038/nphys1170")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testDoiRefNetworkError() {
        val cmd = DoiCommand()
        val result = cmd.test("ref 10.1038/nphys1170")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testDoiHelp() {
        val cmd = DoiCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "cite")
        assertContains(result.stdout, "fetch")
        assertContains(result.stdout, "ref")
        assertContains(result.stdout, "validate")
    }
}
