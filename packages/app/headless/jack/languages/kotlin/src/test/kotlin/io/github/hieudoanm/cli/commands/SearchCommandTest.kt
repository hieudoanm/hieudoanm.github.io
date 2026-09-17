package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
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
    fun testSearchFilesHidden() {
        val dir = "/tmp/test-search-files-hidden"
        File("$dir/.hidden.txt").also { it.parentFile.mkdirs(); it.writeText("hidden") }
        File("$dir/visible.txt").writeText("visible")
        val cmd = SearchCommand()
        val result = cmd.test("files --pattern '*' --dir $dir --hidden")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, ".hidden")
    }

    @Test
    fun testSearchFilesTypeFile() {
        val dir = "/tmp/test-search-files-type"
        File("$dir/a.txt").also { it.parentFile.mkdirs(); it.writeText("a") }
        File("$dir/sub").mkdir()
        File("$dir/sub/b.txt").writeText("b")
        val cmd = SearchCommand()
        val result = cmd.test("files --pattern '*' --dir $dir --type f")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "a.txt")
    }

    @Test
    fun testSearchFilesGlobstar() {
        val dir = "/tmp/test-search-files-star"
        File("$dir/a/b/c.txt").also { it.parentFile.mkdirs(); it.writeText("c") }
        val cmd = SearchCommand()
        val result = cmd.test("files --pattern '**' --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "c.txt")
    }

    @Test
    fun testSearchFilesNoMatch() {
        val cmd = SearchCommand()
        val result = cmd.test("files --pattern 'zzz_no_match_xxx' --dir /tmp --max-depth 1")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no files found)")
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
    fun testSearchTextIgnoreCase() {
        val f = File("/tmp/test-search-icase.txt")
        f.writeText("HELLO world")
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern hello --path /tmp/test-search-icase.txt --ignore-case")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "HELLO")
    }

    @Test
    fun testSearchTextIncludeFilter() {
        val dir = "/tmp/test-search-include"
        File("$dir/data.txt").also { it.parentFile.mkdirs(); it.writeText("hello world") }
        File("$dir/data.log").writeText("hello log")
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern hello --path $dir --include *.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello world")
    }

    @Test
    fun testSearchTextRecursive() {
        val dir = "/tmp/test-search-recurse"
        File("$dir/sub/deep.txt").also { it.parentFile.mkdirs(); it.writeText("deep hello") }
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern hello --path $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "deep")
    }

    @Test
    fun testSearchTextBinaryFile() {
        val f = File("/tmp/test-search-binary.txt")
        f.writeBytes(byteArrayOf(0x68, 0x65, 0x6C, 0x6C, 0x6F, 0x00, 0x77, 0x6F, 0x72, 0x6C, 0x64))
        val cmd = SearchCommand()
        val result = cmd.test("text --pattern hello --path /tmp/test-search-binary.txt")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no matches)")
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

    @Test
    fun testSearchCodePython() {
        val dir = "/tmp/test-search-code-py"
        File("$dir/test.py").also { it.parentFile.mkdirs() }.writeText("def hello():\n    pass\nclass Greeter:\n    pass")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello")
        assertContains(result.stdout, "function")
    }

    @Test
    fun testSearchCodeTypescript() {
        val dir = "/tmp/test-search-code-ts"
        File("$dir/app.ts").also { it.parentFile.mkdirs() }.writeText("export function hello() {}\nexport class Greeter {}")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello")
        assertContains(result.stdout, "function")
    }

    @Test
    fun testSearchCodeRust() {
        val dir = "/tmp/test-search-code-rs"
        File("$dir/lib.rs").also { it.parentFile.mkdirs() }.writeText("pub fn hello() {}\npub struct Foo {}")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "hello")
        assertContains(result.stdout, "function")
    }

    @Test
    fun testSearchCodeKindFilter() {
        val dir = "/tmp/test-search-code-kind"
        File("$dir/main.go").also { it.parentFile.mkdirs() }.writeText("func hello() {}\ntype Foo struct {}")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir --kind function")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "function")
    }

    @Test
    fun testSearchCodeKindFilterNoMatch() {
        val dir = "/tmp/test-search-code-kind-nomatch"
        File("$dir/main.go").also { it.parentFile.mkdirs() }.writeText("func hello() {}")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir --kind type")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no symbols found)")
    }

    @Test
    fun testSearchCodeJson() {
        val dir = "/tmp/test-search-code-json"
        File("$dir/main.go").also { it.parentFile.mkdirs() }.writeText("func hello() {}")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir --json")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "symbol")
        assertContains(result.stdout, "results")
    }

    @Test
    fun testSearchCodeMaxResults() {
        val dir = "/tmp/test-search-code-max"
        File("$dir/main.go").also { it.parentFile.mkdirs() }.writeText("func aaa() {}\nfunc bbb() {}\nfunc ccc() {}")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol aaa|bbb|ccc --dir $dir --max-results 2")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "2 symbols found")
    }

    @Test
    fun testSearchCodeLangFilter() {
        val dir = "/tmp/test-search-code-lang"
        File("$dir/test.go").also { it.parentFile.mkdirs() }.writeText("func hello() {}")
        File("$dir/test.py").writeText("def hello(): pass")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir --lang go")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, ".go")
    }

    @Test
    fun testSearchCodeUnknownExt() {
        val dir = "/tmp/test-search-code-unknown"
        File("$dir/data.txt").also { it.parentFile.mkdirs() }.writeText("hello world")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol hello --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no symbols found)")
    }

    @Test
    fun testSearchCodeNoMatch() {
        val dir = "/tmp/test-search-code-nosym"
        File("$dir/test.go").also { it.parentFile.mkdirs() }.writeText("package main")
        val cmd = SearchCommand()
        val result = cmd.test("code --symbol nonexistent --dir $dir")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "(no symbols found)")
    }

    @Test
    fun testCodePatternDataClass() {
        val pattern = CodePattern(regex = java.util.regex.Pattern.compile("fun\\s+(\\w+)"), nameGroup = 1, kind = "function")
        assertTrue(pattern.regex.matcher("fun hello()").find())
        assertEquals("function", pattern.kind)
    }

    @Test
    fun testSymbolMatchDataClass() {
        val m = SymbolMatch(file = "/path/to/file.kt", line = 42, symbol = "myFunc", kind = "function", language = "Kotlin")
        assertEquals("/path/to/file.kt", m.file)
        assertEquals(42, m.line)
        assertEquals("myFunc", m.symbol)
        assertEquals("function", m.kind)
        assertEquals("Kotlin", m.language)
    }

    @Test
    fun testTextMatchDataClass() {
        val m = TextMatch(file = "file.txt", line = 10, content = "hello world")
        assertEquals("file.txt", m.file)
        assertEquals(10, m.line)
        assertEquals("hello world", m.content)
    }

    @Test
    fun testWebResultDataClass() {
        val r = WebResult(title = "Example", url = "https://example.com", snippet = "An example site")
        assertEquals("Example", r.title)
        assertEquals("https://example.com", r.url)
        assertEquals("An example site", r.snippet)
    }

    @Test
    fun testWebResultDefaults() {
        val r = WebResult()
        assertEquals("", r.title)
        assertEquals("", r.url)
        assertEquals("", r.snippet)
    }
}
