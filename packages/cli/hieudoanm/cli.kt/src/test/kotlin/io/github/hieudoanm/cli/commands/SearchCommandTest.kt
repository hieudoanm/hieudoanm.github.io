package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import java.io.File

class SearchCommandTest {
    @Test
    fun testSearchFiles() {
        val cmd = SearchCommand()
        val result = cmd.test("files --pattern '*.kt' --dir /tmp --max-depth 1")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testSearchFilesJson() {
        val cmd = SearchCommand()
        val result = cmd.test("files --pattern '*.kt' --dir /tmp --max-depth 1 --json")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testSearchText() {
        val f = File("/tmp/test-search-text.txt")
        f.writeText("hello world\nfoo bar\nbaz qux")
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern hello --path /tmp/test-search-text.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello")
    }

    @Test
    fun testSearchTextNoMatch() {
        val f = File("/tmp/test-search-nomatch.txt")
        f.writeText("hello world")
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern xyzabc --path /tmp/test-search-nomatch.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no matches)")
    }

    @Test
    fun testSearchTextJson() {
        val f = File("/tmp/test-search-json.txt")
        f.writeText("hello world")
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern hello --path /tmp/test-search-json.txt --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "pattern")
        assertContains(result.stdout, "matches")
    }

    @Test
    fun testSearchTextMaxCount() {
        val f = File("/tmp/test-search-max.txt")
        f.writeText((1..100).joinToString("\n") { "item $it" })
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern item --path /tmp/test-search-max.txt --max-count 5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "5 matches")
    }

    @Test
    fun testSearchCode() {
        val dir = "/tmp/test-search-code"
        val f = File("$dir/test.go")
        f.parentFile.mkdirs()
        f.writeText("package main\nfunc hello() {}\nfunc main() {}")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello")
        assertContains(result.stdout, "function")
    }
}
