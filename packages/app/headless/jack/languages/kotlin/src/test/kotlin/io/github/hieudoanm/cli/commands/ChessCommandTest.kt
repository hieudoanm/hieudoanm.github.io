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

    @Test
    fun testChessComPlayerProfile() {
        val p = ChessComPlayerProfile(username = "hikaru", name = "Hikaru Nakamura", title = "GM", country = "https://api.chess.com/pub/country/US", fide = 1234, followers = 100000)
        assertEquals("hikaru", p.username)
        assertEquals("Hikaru Nakamura", p.name)
        assertEquals("GM", p.title)
        assertEquals(1234, p.fide)
        assertEquals(100000, p.followers)
    }

    @Test
    fun testChessComPlayerProfileNullables() {
        val p = ChessComPlayerProfile(username = "test", name = null, title = null, country = null, fide = 0, followers = 0)
        assertEquals("test", p.username)
        assertEquals(null, p.name)
        assertEquals(null, p.title)
        assertEquals(null, p.country)
    }

    @Test
    fun testChessComRatingLast() {
        val r = ChessComRatingLast(rating = 2000, date = 20240101, rd = 50)
        assertEquals(2000, r.rating)
        assertEquals(20240101, r.date)
        assertEquals(50, r.rd)
    }

    @Test
    fun testChessComRatingBest() {
        val r = ChessComRatingBest(rating = 2500, date = 20230101, game = "https://chess.com/game/123")
        assertEquals(2500, r.rating)
        assertEquals(20230101, r.date)
        assertEquals("https://chess.com/game/123", r.game)
    }

    @Test
    fun testChessComRatingBestNullGame() {
        val r = ChessComRatingBest(rating = 2400, date = 20220101, game = null)
        assertEquals(2400, r.rating)
        assertEquals(null, r.game)
    }

    @Test
    fun testChessComRecord() {
        val r = ChessComRecord(win = 10, draw = 5, loss = 3)
        assertEquals(10, r.win)
        assertEquals(5, r.draw)
        assertEquals(3, r.loss)
    }

    @Test
    fun testChessComRating() {
        val last = ChessComRatingLast(rating = 2000, date = 20240101, rd = 50)
        val best = ChessComRatingBest(rating = 2500, date = 20230101, game = null)
        val record = ChessComRecord(win = 10, draw = 5, loss = 3)
        val rating = ChessComRating(last = last, best = best, record = record)
        assertEquals(2000, rating.last.rating)
        assertEquals(2500, rating.best.rating)
        assertEquals(10, rating.record.win)
    }

    @Test
    fun testChessComPlayerStats() {
        val bullet = ChessComRating(ChessComRatingLast(1800, 20240101, 40), ChessComRatingBest(2000, 20230101, null), ChessComRecord(5, 2, 1))
        val stats = ChessComPlayerStats(chessBullet = bullet, chessBlitz = null, chessRapid = null)
        assertEquals(1800, stats.chessBullet?.last?.rating)
        assertEquals(null, stats.chessBlitz)
    }

    @Test
    fun testChessComPlayer() {
        val p = ChessComPlayer(rank = 1, username = "magnus", name = "Magnus Carlsen", score = 2800, country = "https://api.chess.com/pub/country/NO", winCount = 100, drawCount = 50, lossCount = 20)
        assertEquals(1, p.rank)
        assertEquals("magnus", p.username)
        assertEquals("Magnus Carlsen", p.name)
        assertEquals(2800, p.score)
        assertEquals(100, p.winCount)
    }

    @Test
    fun testChessComPlayerNullName() {
        val p = ChessComPlayer(rank = 2, username = "no_name", name = null, score = 2500, country = "US", winCount = 0, drawCount = 0, lossCount = 0)
        assertEquals(null, p.name)
    }

    @Test
    fun testChessComLeaderboardData() {
        val p = ChessComPlayer(rank = 1, username = "player1", name = null, score = 2800, country = "US", winCount = 10, drawCount = 5, lossCount = 3)
        val data = ChessComLeaderboardData(liveBullet = listOf(p), liveBlitz = emptyList(), liveRapid = emptyList(), liveBlitz960 = emptyList())
        assertEquals(1, data.liveBullet.size)
        assertEquals("player1", data.liveBullet[0].username)
        assertEquals(0, data.liveBlitz.size)
    }

    @Test
    fun testChessComTitledResponse() {
        val resp = ChessComTitledResponse(players = listOf("hikaru", "magnus"))
        assertEquals(2, resp.players.size)
        assertContains(resp.players, "magnus")
    }

    @Test
    fun testCloudEvalPV() {
        val pv = CloudEvalPV(moves = "e4 e5 Nf3 Nc6", cp = 25, mate = null)
        assertEquals("e4 e5 Nf3 Nc6", pv.moves)
        assertEquals(25, pv.cp)
        assertEquals(null, pv.mate)
    }

    @Test
    fun testCloudEvalPVMate() {
        val pv = CloudEvalPV(moves = "Qh7#", cp = null, mate = 1)
        assertEquals(1, pv.mate)
        assertEquals(null, pv.cp)
    }

    @Test
    fun testCloudEvalResponse() {
        val pv = CloudEvalPV(moves = "e4", cp = 20, mate = null)
        val resp = CloudEvalResponse(fen = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1", depth = 20, knodes = 500, pvs = listOf(pv))
        assertEquals(20, resp.depth)
        assertEquals(500, resp.knodes)
        assertEquals(1, resp.pvs.size)
        assertContains(resp.fen, "rnbqkbnr")
    }
}
