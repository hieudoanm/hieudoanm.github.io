package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import java.io.File

class ChessCommandTest {
    @Test
    fun testChessElo() {
        val cmd = ChessCommand()
        val result = cmd.test("elo --rating 1500 --opponent 1500 --score 0.5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "1500")
    }

    @Test
    fun testChessEloWin() {
        val cmd = ChessCommand()
        val result = cmd.test("elo --rating 1500 --opponent 1500 --score 1.0")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.contains("1510") || result.stdout.contains("151"))
    }

    @Test
    fun testChessRandom() {
        val cmd = ChessCommand()
        val result = cmd.test("random")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Position")
        assertContains(result.stdout, "FEN:")
    }

    @Test
    fun testChessSetup() {
        val cmd = ChessCommand()
        val result = cmd.test("setup 518")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Position 518")
        assertContains(result.stdout, "FEN:")
    }

    @Test
    fun testChessFenSvg() {
        val cmd = ChessCommand()
        val out = "/tmp/test-board.svg"
        val result = cmd.test("fen-svg --fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR --out $out")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "SVG saved")
        val svg = File(out).readText()
        assertContains(svg, "<svg")
        assertContains(svg, "#f0d9b5")
        assertContains(svg, "#b58863")
    }
}
