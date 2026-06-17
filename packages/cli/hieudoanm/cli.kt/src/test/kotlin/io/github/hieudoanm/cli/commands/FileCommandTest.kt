package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import java.io.File

class FileCommandTest {
    @Test
    fun testFileRead() {
        val f = File("/tmp/test-file-read.txt")
        f.writeText("hello\nworld")
        val cmd = FileCommand()
        val result = cmd.test("read --file /tmp/test-file-read.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello")
        assertContains(result.stdout, "world")
    }

    @Test
    fun testFileReadLines() {
        val f = File("/tmp/test-file-read-lines.txt")
        f.writeText("line1\nline2\nline3\nline4\nline5")
        val cmd = FileCommand()
        val result = cmd.test("read --file /tmp/test-file-read-lines.txt --lines 2")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "1 | line1")
        assertContains(result.stdout, "2 | line2")
    }

    @Test
    fun testFileWrite() {
        val path = "/tmp/test-file-write.txt"
        val cmd = FileCommand()
        val result = cmd.test("write --file $path --content 'test content'")
        assertEquals(0, result.statusCode)
        assertEquals("test content", File(path).readText().trim())
    }

    @Test
    fun testFileWriteAppend() {
        val path = "/tmp/test-file-append.txt"
        File(path).writeText("original\n")
        val cmd = FileCommand()
        cmd.test("write --file $path --content 'appended' --append")
        val content = File(path).readText().trim()
        assertContains(content, "original")
        assertContains(content, "appended")
    }

    @Test
    fun testFileEdit() {
        val path = "/tmp/test-file-edit.txt"
        File(path).writeText("hello foo world")
        val cmd = FileCommand()
        val result = cmd.test("edit --file $path --old foo --new bar")
        assertEquals(0, result.statusCode)
        assertEquals("hello bar world", File(path).readText().trim())
    }

    @Test
    fun testFileEditPreview() {
        val path = "/tmp/test-file-edit-preview.txt"
        File(path).writeText("hello foo world")
        val cmd = FileCommand()
        val result = cmd.test("edit --file $path --old foo --new bar --preview")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello bar world")
        assertEquals("hello foo world", File(path).readText().trim())
    }

    @Test
    fun testFileGrep() {
        val path = "/tmp/test-file-grep.txt"
        File(path).writeText("apple\nbanana\ncherry\napple pie")
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern apple --path $path")
        assertEquals(0, result.statusCode)
        val lines = result.stdout.trim().lines()
        assertEquals(2, lines.size)
    }

    @Test
    fun testFileChecksum() {
        val path = "/tmp/test-file-checksum.txt"
        File(path).writeText("test data")
        val cmd = FileCommand()
        val result = cmd.test("checksum --file $path")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, path)
    }

    @Test
    fun testFileHead() {
        val path = "/tmp/test-file-head.txt"
        File(path).writeText((1..20).joinToString("\n") { "line$it" })
        val cmd = FileCommand()
        val result = cmd.test("head --file $path --lines 3")
        assertEquals(0, result.statusCode)
        assertEquals(3, result.stdout.trim().lines().size)
    }

    @Test
    fun testFileTail() {
        val path = "/tmp/test-file-tail.txt"
        File(path).writeText((1..20).joinToString("\n") { "line$it" })
        val cmd = FileCommand()
        val result = cmd.test("tail --file $path --lines 3")
        assertEquals(0, result.statusCode)
        assertEquals(3, result.stdout.trim().lines().size)
        assertContains(result.stdout, "line18")
        assertContains(result.stdout, "line20")
    }

    @Test
    fun testFileCount() {
        val path = "/tmp/test-file-count.txt"
        File(path).writeText((1..10).joinToString("\n") { "line$it" })
        val cmd = FileCommand()
        val result = cmd.test("count --file $path")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "10")
    }

    @Test
    fun testFileType() {
        val path = "/tmp/test-file-type.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("type --file $path")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "text")
    }

    @Test
    fun testFileSize() {
        val path = "/tmp/test-file-size.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("size --path $path")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "5 B")
    }
}
