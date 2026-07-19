package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

class EnglishCommandTest {
    @Test
    fun testEnglishHelp() {
        val cmd = EnglishCommand()
        val result = cmd.test("--help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testEnglishDefineHelp() {
        val cmd = EnglishCommand()
        val result = cmd.test("define --help")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testEnglishDefineEmptyWord() {
        val cmd = EnglishCommand()
        val result = cmd.test("define --word ''")
        assertEquals(0, result.statusCode)
        assertContains(result.stderr, "word cannot be empty")
    }

    @Test
    fun testEnglishResultDataClass() {
        val result = EnglishResult(
            definition = "test def",
            partOfSpeech = "noun",
            synonyms = listOf("foo", "bar"),
            anonyms = listOf("baz"),
            usageOf = listOf("use1"),
            typeOf = listOf("type1")
        )
        assertEquals("test def", result.definition)
        assertEquals("noun", result.partOfSpeech)
        assertEquals(listOf("foo", "bar"), result.synonyms)
        assertEquals(listOf("baz"), result.anonyms)
        assertEquals(listOf("use1"), result.usageOf)
        assertEquals(listOf("type1"), result.typeOf)
    }

    @Test
    fun testEnglishResultDefaults() {
        val result = EnglishResult()
        assertEquals("", result.definition)
        assertEquals("", result.partOfSpeech)
        assertEquals(emptyList<String>(), result.synonyms)
        assertEquals(emptyList<String>(), result.anonyms)
    }

    @Test
    fun testEnglishWordDataClass() {
        val results = listOf(EnglishResult(definition = "def1"), EnglishResult(definition = "def2"))
        val word = EnglishWord(word = "hello", results = results)
        assertEquals("hello", word.word)
        assertEquals(2, word.results.size)
        assertEquals("def1", word.results[0].definition)
    }

    @Test
    fun testEnglishWordDefaults() {
        val word = EnglishWord()
        assertEquals("", word.word)
        assertNotNull(word.results)
        assertEquals(0, word.results.size)
    }
}
