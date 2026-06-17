package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import java.io.File

class DocsifyCommandTest {
    @Test
    fun testDocsifyCobra() {
        val cmd = DocsifyCommand()
        val result = cmd.test("cobra")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "calc")
        assertContains(result.stdout, "casino")
        assertContains(result.stdout, "docsify")
        assertContains(result.stdout, "web")
    }

    @Test
    fun testDocsifyCobraToFile() {
        val out = "/tmp/test-cobra.md"
        val cmd = DocsifyCommand()
        val result = cmd.test("cobra --output $out")
        assertEquals(0, result.statusCode)
        assertContains(java.io.File(out).readText(), "calc")
    }

    @Test
    fun testDocsifyTree() {
        val out = "/tmp/test-docsify-tree.md"
        val cmd = DocsifyCommand()
        val dir = "/Users/hieudoan/git/github.com/hieudoanm/hieudoanm.github.io/packages/cli/hieudoanm/cli.kt/src/test"
        val result = cmd.test("tree --dir $dir --out $out")
        assertEquals(0, result.statusCode)
        val content = File(out).readText()
        assertContains(content, "# TREE")
        assertContains(content, "```text")
        assertContains(content, "directories")
    }
}
