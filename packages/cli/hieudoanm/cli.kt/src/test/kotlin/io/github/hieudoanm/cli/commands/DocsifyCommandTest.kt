package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
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

    @Test
    fun testDocsifyScan() {
        val tmpDir = createTempDir()
        File(tmpDir, "test.kt").writeText("""
            package test
            fun hello() {
                println("Hello")
            }
        """.trimIndent())
        val out = "/tmp/test-scan.graphml"
        val cmd = DocsifyCommand()
        val result = cmd.test("scan --dir ${tmpDir.absolutePath} --out $out")
        assertEquals(0, result.statusCode)
        val content = File(out).readText()
        assertContains(content, "<?xml")
        assertContains(content, "<graphml")
        assertContains(content, "<node")
    }

    @Test
    fun testDocsifyObsidianDot() {
        val tmpDir = createTempDir()
        File(tmpDir, "file1.md").writeText("Link to [[file2]]")
        File(tmpDir, "file2.md").writeText("Link to [[file1]]")
        val cmd = DocsifyCommand()
        val result = cmd.test("obsidian --dir ${tmpDir.absolutePath} --format dot")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "digraph obsidian")
        assertContains(result.stdout, "file1")
        assertContains(result.stdout, "file2")
    }

    @Test
    fun testDocsifyObsidianJson() {
        val tmpDir = createTempDir()
        File(tmpDir, "file1.md").writeText("Link to [[file2]]")
        File(tmpDir, "file2.md").writeText("Link to [[file1]]")
        val cmd = DocsifyCommand()
        val result = cmd.test("obsidian --dir ${tmpDir.absolutePath} --format json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "\"nodes\"")
        assertContains(result.stdout, "\"edges\"")
    }

    @Test
    fun testDocsifyObsidianText() {
        val tmpDir = createTempDir()
        File(tmpDir, "file1.md").writeText("Link to [[file2]]")
        File(tmpDir, "file2.md").writeText("Link to [[file1]]")
        val cmd = DocsifyCommand()
        val result = cmd.test("obsidian --dir ${tmpDir.absolutePath}")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "->")
    }

    @Test
    fun testDocsifyObsidianToFile() {
        val tmpDir = createTempDir()
        File(tmpDir, "file1.md").writeText("Link to [[file2]]")
        File(tmpDir, "file2.md").writeText("Link to [[file1]]")
        val out = "/tmp/test-obsidian-out.txt"
        val cmd = DocsifyCommand()
        val result = cmd.test("obsidian --dir ${tmpDir.absolutePath} --out $out")
        assertEquals(0, result.statusCode)
        val outputFile = File(out)
        assertTrue(outputFile.exists())
        val content = outputFile.readText()
        assertContains(content, "file1")
    }

}
