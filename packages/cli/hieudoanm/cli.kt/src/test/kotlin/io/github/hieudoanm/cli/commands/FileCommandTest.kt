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
    fun testFileReadOffset() {
        val f = File("/tmp/test-file-read-offset.txt")
        f.writeText("a\nb\nc\nd\ne")
        val cmd = FileCommand()
        val result = cmd.test("read --file /tmp/test-file-read-offset.txt --lines 2 --offset 2")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "3 | c")
        assertContains(result.stdout, "4 | d")
    }

    @Test
    fun testFileReadJson() {
        val f = File("/tmp/test-file-read-json.txt")
        f.writeText("hello file")
        val cmd = FileCommand()
        val result = cmd.test("read --file /tmp/test-file-read-json.txt --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "content")
        assertContains(result.stdout, "totalLines")
    }

    @Test
    fun testFileReadNoNumbers() {
        val f = File("/tmp/test-file-read-nonum.txt")
        f.writeText("hello\nworld")
        val cmd = FileCommand()
        val result = cmd.test("read --file /tmp/test-file-read-nonum.txt --no-numbers")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello")
        assertContains(result.stdout, "──")  // the path separator
    }

    @Test
    fun testFileReadNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("read --file /tmp/test-file-nonexistent.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "file not found")
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
    fun testFileWriteJson() {
        val path = "/tmp/test-file-write-json.txt"
        val cmd = FileCommand()
        val result = cmd.test("write --file $path --content 'data' --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "bytes")
        assertContains(result.stdout, "file")
    }

    @Test
    fun testFileWriteMkdir() {
        val path = "/tmp/test-file-write-dir/sub/file.txt"
        val cmd = FileCommand()
        val result = cmd.test("write --file $path --content 'nested' --mkdir")
        assertEquals(0, result.statusCode)
        assertTrue(File(path).exists())
        assertEquals("nested", File(path).readText().trim())
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
    fun testFileEditRegex() {
        val path = "/tmp/test-file-edit-regex.txt"
        File(path).writeText("hello foo bar\nhello baz qux")
        val cmd = FileCommand()
        val result = cmd.test("edit --file $path --old hello --new hi --regex")
        assertEquals(0, result.statusCode)
        val content = File(path).readText().trim()
        assertContains(content, "hi foo")
        assertContains(content, "hi baz")
    }

    @Test
    fun testFileEditCount() {
        val path = "/tmp/test-file-edit-count.txt"
        File(path).writeText("foo foo foo foo")
        val cmd = FileCommand()
        val result = cmd.test("edit --file $path --old foo --new bar --count 2")
        assertEquals(0, result.statusCode)
        assertEquals("bar bar bar bar", File(path).readText().trim())
    }

    @Test
    fun testFileEditJson() {
        val path = "/tmp/test-file-edit-json.txt"
        File(path).writeText("foo")
        val cmd = FileCommand()
        val result = cmd.test("edit --file $path --old foo --new bar --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "matches")
    }

    @Test
    fun testFileEditNoMatch() {
        val path = "/tmp/test-file-edit-nomatch.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("edit --file $path --old nonexistent --new bar")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "No matches found")
    }

    @Test
    fun testFileEditNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("edit --file /tmp/test-file-nonexistent.txt --old x --new y")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "file not found")
    }

    @Test
    fun testFileEditIsDirectory() {
        val cmd = FileCommand()
        val result = cmd.test("edit --file /tmp --old x --new y")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "is a directory")
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
    fun testFileGrepJson() {
        val path = "/tmp/test-file-grep-json.txt"
        File(path).writeText("apple\nbanana")
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern apple --path $path --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "pattern")
        assertContains(result.stdout, "matches")
    }

    @Test
    fun testFileGrepNoMatch() {
        val path = "/tmp/test-file-grep-nomatch.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern xyz --path $path")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no matches)")
    }

    @Test
    fun testFileGrepFixed() {
        val path = "/tmp/test-file-grep-fixed.txt"
        File(path).writeText("foo.bar\nfooxbar")
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern 'foo.bar' --path $path --fixed")
        assertEquals(0, result.statusCode)
        assertEquals(1, result.stdout.trim().lines().size)
    }

    @Test
    fun testFileGrepIgnoreCase() {
        val path = "/tmp/test-file-grep-icase.txt"
        File(path).writeText("HELLO world")
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern hello --path $path --ignore-case")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "HELLO")
    }

    @Test
    fun testFileGrepContext() {
        val path = "/tmp/test-file-grep-context.txt"
        File(path).writeText("before1\nbefore2\nmatch\nafter1\nafter2")
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern match --path $path --context 1")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "before2")
        assertContains(result.stdout, "after1")
    }

    @Test
    fun testFileGrepIncludeFilter() {
        val dir = "/tmp/test-file-grep-include"
        File("$dir/data.go").also { it.parentFile.mkdirs(); it.writeText("package main") }
        File("$dir/data.txt").writeText("package main")
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern package --path $dir/data.go")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "package main")
    }

    @Test
    fun testFileGrepRecursive() {
        val dir = "/tmp/test-file-grep-recurse"
        File("$dir/sub/file.txt").also { it.parentFile.mkdirs(); it.writeText("deep match") }
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern deep --path $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "deep match")
    }

    @Test
    fun testFileGrepDirectoryNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("grep --pattern hello --path /tmp/test-file-grep-notfounddir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no matches)")
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
    fun testFileChecksumMd5() {
        val path = "/tmp/test-file-checksum-md5.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("checksum --file $path --algorithm md5")
        assertEquals(0, result.statusCode)
        assertEquals("5d41402abc4b2a76b9719d911017c592  $path", result.stdout.trim())
    }

    @Test
    fun testFileChecksumSha1() {
        val path = "/tmp/test-file-checksum-sha1.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("checksum --file $path --algorithm sha1")
        assertEquals(0, result.statusCode)
        assertEquals("aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d  $path", result.stdout.trim())
    }

    @Test
    fun testFileChecksumSha512() {
        val path = "/tmp/test-file-checksum-sha512.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("checksum --file $path --algorithm sha512")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, path)
    }

    @Test
    fun testFileChecksumJson() {
        val path = "/tmp/test-file-checksum-json.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("checksum --file $path --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hash")
        assertContains(result.stdout, "algorithm")
    }

    @Test
    fun testFileChecksumNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("checksum --file /tmp/test-file-nonexistent.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "file not found")
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
    fun testFileHeadNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("head --file /tmp/test-file-head-nonexistent.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "file not found")
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
    fun testFileTailNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("tail --file /tmp/test-file-tail-nonexistent.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "file not found")
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
    fun testFileCountJson() {
        val path = "/tmp/test-file-count-json.txt"
        File(path).writeText("hello world\nfoo bar")
        val cmd = FileCommand()
        val result = cmd.test("count --file $path --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "lines")
        assertContains(result.stdout, "words")
        assertContains(result.stdout, "bytes")
    }

    @Test
    fun testFileCountNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("count --file /tmp/test-file-count-nonexistent.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "file not found")
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
    fun testFileTypeJson() {
        val path = "/tmp/test-file-type-json.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("type --file $path --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "mime")
        assertContains(result.stdout, "size")
    }

    @Test
    fun testFileTypeNotFound() {
        val cmd = FileCommand()
        val result = cmd.test("type --file /tmp/test-file-type-nonexistent.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "file not found")
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

    @Test
    fun testFileSizeJson() {
        val path = "/tmp/test-file-size-json.txt"
        File(path).writeText("hello")
        val cmd = FileCommand()
        val result = cmd.test("size --path $path --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "size")
        assertContains(result.stdout, "path")
    }

    @Test
    fun testFileSizeDirectory() {
        val dir = "/tmp/test-file-size-dir"
        File("$dir/a.txt").also { it.parentFile.mkdirs(); it.writeText("hello") }
        File("$dir/b.txt").writeText("world")
        val cmd = FileCommand()
        val result = cmd.test("size --path $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "10 B")
    }

    @Test
    fun testFileDuplicates() {
        val dir = "/tmp/test-file-dups"
        File("$dir/a.txt").also { it.parentFile.mkdirs(); it.writeText("same content") }
        File("$dir/b.txt").writeText("same content")
        File("$dir/c.txt").writeText("different")
        val cmd = FileCommand()
        val result = cmd.test("duplicates --dir $dir --min-size 1")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Duplicates")
        assertContains(result.stdout, "a.txt")
        assertContains(result.stdout, "b.txt")
    }

    @Test
    fun testFileDuplicatesNoDups() {
        val dir = "/tmp/test-file-dups-none"
        File("$dir/a.txt").also { it.parentFile.mkdirs(); it.writeText("aaa") }
        File("$dir/b.txt").writeText("bbb")
        val cmd = FileCommand()
        val result = cmd.test("duplicates --dir $dir --min-size 1")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "No duplicates found")
    }

    @Test
    fun testFileDuplicatesJson() {
        val dir = "/tmp/test-file-dups-json"
        File("$dir/a.txt").also { it.parentFile.mkdirs(); it.writeText("dup") }
        File("$dir/b.txt").writeText("dup")
        val cmd = FileCommand()
        val result = cmd.test("duplicates --dir $dir --min-size 1 --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "files")
        assertContains(result.stdout, "size")
    }

    @Test
    fun testFileStats() {
        val dir = "/tmp/test-file-stats"
        File("$dir/a.txt").also { it.parentFile.mkdirs(); it.writeText("hello") }
        File("$dir/b.txt").writeText("world!")
        File("$dir/c.go").writeText("package main")
        val cmd = FileCommand()
        val result = cmd.test("stats --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Total files")
        assertContains(result.stdout, "txt")
        assertContains(result.stdout, "go")
    }

    @Test
    fun testFileStatsJson() {
        val dir = "/tmp/test-file-stats-json"
        File("$dir/a.txt").also { it.parentFile.mkdirs(); it.writeText("hello") }
        val cmd = FileCommand()
        val result = cmd.test("stats --dir $dir --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "totalFiles")
        assertContains(result.stdout, "byExtension")
    }

    @Test
    fun testFileChmod() {
        val path = "/tmp/test-file-chmod.txt"
        File(path).writeText("test")
        val cmd = FileCommand()
        val result = cmd.test("chmod --mode 644 --file $path")
        assertEquals(0, result.statusCode)
        assertTrue(File(path).canRead())
    }
}
