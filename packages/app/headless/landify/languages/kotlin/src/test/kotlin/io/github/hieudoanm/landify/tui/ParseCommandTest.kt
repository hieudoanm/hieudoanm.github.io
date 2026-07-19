package io.github.hieudoanm.landify.tui

import kotlin.test.Test
import kotlin.test.assertEquals

class ParseCommandTest {
    @Test
    fun `each documented command parses`() {
        assertEquals(TuiAction.Save, parseCommand("save"))
        assertEquals(TuiAction.Reload, parseCommand("reload"))
        assertEquals(TuiAction.Validate, parseCommand("validate"))
        assertEquals(TuiAction.Build, parseCommand("build"))
        assertEquals(TuiAction.Help, parseCommand("help"))
        assertEquals(TuiAction.Quit, parseCommand("quit"))
    }

    @Test
    fun `short aliases parse to the same command`() {
        assertEquals(TuiAction.Save, parseCommand("w"))
        assertEquals(TuiAction.Reload, parseCommand("e"))
        assertEquals(TuiAction.Validate, parseCommand("check"))
        assertEquals(TuiAction.Help, parseCommand("h"))
        assertEquals(TuiAction.Quit, parseCommand("q"))
    }

    @Test
    fun `matching is case-insensitive`() {
        assertEquals(TuiAction.Build, parseCommand("BUILD"))
        assertEquals(TuiAction.Generate("faq"), parseCommand("Generate faq"))
    }

    @Test
    fun `argument-taking commands carry their argument`() {
        assertEquals(TuiAction.Generate("portfolio"), parseCommand("generate portfolio"))
        assertEquals(TuiAction.Theme("midnight"), parseCommand("theme midnight"))
        assertEquals(TuiAction.Generate("team"), parseCommand("new team"))
    }

    @Test
    fun `whitespace around the command is ignored`() {
        assertEquals(TuiAction.Save, parseCommand("   save   "))
        assertEquals(TuiAction.Theme("ocean"), parseCommand("\ttheme   ocean\n"))
    }

    @Test
    fun `a missing argument is unknown, not a broken action`() {
        assertEquals(TuiAction.Unknown, parseCommand("generate"))
        assertEquals(TuiAction.Unknown, parseCommand("theme"))
    }

    @Test
    fun `an unrecognised or empty line is unknown`() {
        assertEquals(TuiAction.Unknown, parseCommand("frobnicate"))
        assertEquals(TuiAction.Unknown, parseCommand(""))
    }

    @Test
    fun `extra words are ignored`() {
        assertEquals(TuiAction.Theme("ocean"), parseCommand("theme ocean extra"))
    }
}
