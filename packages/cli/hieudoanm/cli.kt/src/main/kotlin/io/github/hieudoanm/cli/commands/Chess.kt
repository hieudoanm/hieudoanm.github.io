package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.default
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.required
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.double
import io.github.hieudoanm.cli.services.Requests
import com.google.gson.Gson
import java.io.File
import kotlin.math.roundToInt
import kotlin.random.Random
import kotlin.math.*

class ChessCommand : CliktCommand(name = "chess", help = "Chess tools and utilities") {
    init {
        subcommands(ChessCom(), ChessElo(), ChessFenEval(), ChessFenSvg(), ChessPgn(), ChessPlay(), ChessRandom(), ChessSetup())
    }
    override fun run() = Unit
}

class ChessCom : CliktCommand(name = "com", help = "Chess.com integration") {
    init { subcommands(ChessComPlayerCmd(), ChessComLeaderboards(), ChessComTitled()) }
    override fun run() = Unit
}

class ChessComPlayerCmd : CliktCommand(name = "player", help = "Show Chess.com player profile and stats") {
    private val username by option("--username", "-u", help = "Chess.com username").required()
    override fun run() {
        val u = username.lowercase()
        val profileResult = Requests.get("https://api.chess.com/pub/player/$u")
        val statsResult = Requests.get("https://api.chess.com/pub/player/$u/stats")

        profileResult.onSuccess { profileBody ->
            statsResult.onSuccess { statsBody ->
                val gson = Gson()
                val profile = gson.fromJson(profileBody, ChessComPlayerProfile::class.java)
                val stats = gson.fromJson(statsBody, ChessComPlayerStats::class.java)

                echo()
                echo("${profile.username.uppercase()}")
                echo("---------------------------------------------------------------")
                if (profile.name != null) echo("Name      : ${profile.name}")
                if (profile.title != null) echo("Title     : ${profile.title}")
                val countryCode = profile.country?.split("/")?.lastOrNull()?.uppercase() ?: "-"
                echo("Country   : $countryCode")
                if (profile.fide > 0) echo("FIDE      : ${profile.fide}")
                echo("Followers : ${profile.followers}")
                echo()
                echo("Ratings")
                echo()
                echo("%-8s | %8s | %8s | %8s | %8s | %8s".format("Mode", "Best", "Last", "Win", "Draw", "Loss"))
                echo("%-8s | %8s | %8s | %8s | %8s | %8s".format("-".repeat(8), "-".repeat(8), "-".repeat(8), "-".repeat(8), "-".repeat(8), "-".repeat(8)))
                fun printRating(label: String, r: ChessComRating?) {
                    if (r != null) {
                        echo("%-8s | %8s | %8s | %8s | %8s | %8s".format(label, r.best.rating, r.last.rating, r.record.win, r.record.draw, r.record.loss))
                    }
                }
                printRating("Bullet", stats.chessBullet)
                printRating("Blitz", stats.chessBlitz)
                printRating("Rapid", stats.chessRapid)
            }
        }
    }
}

data class ChessComPlayerProfile(val username: String, val name: String?, val title: String?, val country: String?, val fide: Int, val followers: Int)
data class ChessComRatingLast(val rating: Int, val date: Int, val rd: Int)
data class ChessComRatingBest(val rating: Int, val date: Int, val game: String?)
data class ChessComRecord(val win: Int, val draw: Int, val loss: Int)
data class ChessComRating(val last: ChessComRatingLast, val best: ChessComRatingBest, val record: ChessComRecord)
data class ChessComPlayerStats(val chessBullet: ChessComRating?, val chessBlitz: ChessComRating?, val chessRapid: ChessComRating?)

class ChessComLeaderboards : CliktCommand(name = "leaderboards", help = "Show Chess.com leaderboards") {
    private val top by option("--top", help = "Number of top players").int().default(5)
    private val countryFilter by option("--country", help = "Filter by country code").default("")
    override fun run() {
        val result = Requests.get("https://api.chess.com/pub/leaderboards")
        result.onSuccess { body ->
            val gson = Gson()
            val data = gson.fromJson(body, ChessComLeaderboardData::class.java)
            val limit = maxOf(1, top)
            fun countryName(url: String): String {
                val code = url.trimEnd('/').split("/").lastOrNull()?.uppercase() ?: "-"
                return code
            }
            fun filterPlayers(players: List<ChessComPlayer>): List<ChessComPlayer> {
                if (countryFilter.isBlank()) return players
                return players.filter { p ->
                    val code = countryName(p.country)
                    code == countryFilter.uppercase()
                }
            }
            fun printTop(title: String, players: List<ChessComPlayer>) {
                if (players.isEmpty()) return
                val filtered = filterPlayers(players)
                val shown = filtered.take(limit)
                if (shown.isEmpty()) return
                echo()
                echo(title)
                echo()
                echo("%-4s | %-32s | %-24s | %-6s".format("Rank", "Name", "Username", "Score"))
                echo("%-4s | %-32s | %-24s | %-6s".format("-".repeat(4), "-".repeat(32), "-".repeat(24), "-".repeat(6)))
                shown.forEach { p ->
                    val name = if (p.name.isNullOrBlank()) "-" else p.name
                    echo("%-4d | %-32s | %-24s | %-6d".format(p.rank, name, p.username.lowercase(), p.score))
                }
            }
            printTop("Live Bullet", data.liveBullet)
            printTop("Live Blitz", data.liveBlitz)
            printTop("Live Rapid", data.liveRapid)
            printTop("Live Blitz 960", data.liveBlitz960)
        }.onFailure { e -> echo("Error: ${e.message}") }
    }
}

data class ChessComPlayer(val rank: Int, val username: String, val name: String?, val score: Int, val country: String, val winCount: Int, val drawCount: Int, val lossCount: Int)
data class ChessComLeaderboardData(val liveBullet: List<ChessComPlayer>, val liveBlitz: List<ChessComPlayer>, val liveRapid: List<ChessComPlayer>, val liveBlitz960: List<ChessComPlayer>)

class ChessComTitled : CliktCommand(name = "titled", help = "Show Chess.com titled player counts") {
    private val titles = listOf("GM", "IM", "FM", "CM", "NM", "WGM", "WIM", "WFM", "WCM", "WNM")
    override fun run() {
        echo()
        echo("%-6s | %7s".format("Titled", "Players"))
        echo("%-6s | %7s".format("-".repeat(6), "-".repeat(7)))
        for (title in titles) {
            val result = Requests.get("https://api.chess.com/pub/titled/$title")
            result.onSuccess { body ->
                val resp = Gson().fromJson(body, ChessComTitledResponse::class.java)
                echo("%-6s | %7d".format(title, resp.players.size))
            }.onFailure { e ->
                echo("Failed to fetch $title: ${e.message}")
            }
        }
        echo()
    }
}

data class ChessComTitledResponse(val players: List<String>)

class ChessElo : CliktCommand(name = "elo", help = "Calculate new Elo rating after a game") {
    private val myRating by option("--rating", "-r", help = "Your rating").int().required()
    private val opponentRating by option("--opponent", "-o", help = "Opponent's rating").int().required()
    private val score by option("--score", "-s", help = "Result (1=win, 0.5=draw, 0=loss)").double().required()
    private val kFactor by option("--k", "-k", help = "K-factor").int().default(20)
    override fun run() {
        val expected = 1.0 / (1.0 + 10.0.pow((opponentRating - myRating) / 400.0))
        val newRating = myRating + kFactor * (score - expected)
        echo("Your new rating: ${"%.0f".format(newRating)}")
    }
}

class ChessFenEval : CliktCommand(name = "fen-eval", help = "Evaluate a FEN position using Lichess cloud eval") {
    private val fen by option("--fen", "-f", help = "FEN string").required()
    private val multipv by option("--multipv", help = "Number of principal variations").int().default(3)
    override fun run() {
        val url = "https://lichess.org/api/cloud-eval?fen=${java.net.URLEncoder.encode(fen, "UTF-8")}&multiPv=$multipv&variant=standard"
        val result = Requests.get(url)
        result.onSuccess { body ->
            val gson = Gson()
            val eval = gson.fromJson(body, CloudEvalResponse::class.java)
            echo()
            echo("lichess.org Cloud Evaluation")
            echo("------------------------------------------------")
            echo("Depth : ${eval.depth}")
            echo("Nodes : ${eval.knodes}")
            echo()
            eval.pvs.forEachIndexed { i, pv ->
                val cp = if (pv.cp != null) "${"%.2f".format(pv.cp / 100.0)}" else if (pv.mate != null) "#${pv.mate}" else "?"
                echo("#${i + 1}  $cp  ${pv.moves}")
            }
        }.onFailure { e -> echo("Failed to fetch evaluation: ${e.message}") }
    }
}

data class CloudEvalPV(val moves: String, val cp: Int?, val mate: Int?)
data class CloudEvalResponse(val fen: String, val depth: Int, val knodes: Int, val pvs: List<CloudEvalPV>)

class ChessFenSvg : CliktCommand(name = "fen-svg", help = "Render a FEN position as an SVG board image") {
    private val fen by option("--fen", "-f", help = "FEN string").required()
    private val out by option("--out", "-o", help = "Output SVG file").default("board.svg")
    override fun run() {
        val svg = renderSvgFromFen(fen)
        File(out).writeText(svg)
        echo("SVG saved to $out")
    }
}

private fun renderSvgFromFen(fen: String): String {
    val pieceMap = mapOf(
        'K' to "\u2654", 'Q' to "\u2655", 'R' to "\u2656", 'B' to "\u2657", 'N' to "\u2658", 'P' to "\u2659",
        'k' to "\u265A", 'q' to "\u265B", 'r' to "\u265C", 'b' to "\u265D", 'n' to "\u265E", 'p' to "\u265F"
    )
    val boardPart = fen.split(" ").first()
    val ranks = boardPart.split("/")
    val squareSize = 60
    val boardSize = squareSize * 8
    val sb = StringBuilder()
    sb.appendLine("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"$boardSize\" height=\"$boardSize\">")
    for (rank in 0 until 8) {
        for (file in 0 until 8) {
            val x = file * squareSize
            val y = (7 - rank) * squareSize
            val color = if ((rank + file) % 2 == 1) "#f0d9b5" else "#b58863"
            sb.appendLine("<rect x=\"$x\" y=\"$y\" width=\"$squareSize\" height=\"$squareSize\" fill=\"$color\"/>")
        }
    }
    for (rank in 0 until 8) {
        var file = 0
        for (ch in ranks.getOrElse(rank) { "" }) {
            if (ch.isDigit()) {
                file += ch - '0'
            } else {
                val x = file * squareSize
                val y = (7 - rank) * squareSize
                val p = pieceMap[ch] ?: ch.toString()
                sb.appendLine("<text x=\"${x + squareSize / 2}\" y=\"${y + squareSize * 0.75}\" text-anchor=\"middle\" font-size=\"${squareSize * 0.75}\">$p</text>")
                file++
            }
        }
    }
    sb.appendLine("</svg>")
    return sb.toString()
}

class ChessPgn : CliktCommand(name = "pgn", help = "PGN chess game analysis tools") {
    init { subcommands(ChessPgnFen(), ChessPgnUci()) }
    override fun run() = Unit
}

class ChessPgnFen : CliktCommand(name = "fen", help = "Convert PGN to FEN per move") {
    private val pgnFile by option("--pgn-file", help = "Path to PGN file").default("")
    private val pgn by option("--pgn", help = "Raw PGN string").default("")
    override fun run() {
        val pgnStr = when {
            pgnFile.isNotBlank() -> File(pgnFile).readText()
            pgn.isNotBlank() -> pgn
            else -> throw Exception("provide --pgn-file or --pgn")
        }
        val moves = pgnStr.replace(Regex("""\d+\."""), "").replace(Regex("""[\[\].\n\r]+"""), " ").trim()
            .split(Regex("\\s+")).filter { it.isNotBlank() && !it.contains("?") && !it.contains("!") }
        echo("%-4s | %-6s | %-72s".format("Move", "SAN", "FEN"))
        echo("%-4s | %-6s | %-72s".format("-".repeat(4), "-".repeat(6), "-".repeat(72)))
        moves.forEachIndexed { i, m ->
            val moveNum = i / 2 + 1
            val side = if (i % 2 == 0) "White" else "Black"
            echo("%-4d | %-6s | %-72s".format(moveNum, m, "-"))
        }
    }
}

class ChessPgnUci : CliktCommand(name = "uci", help = "Convert PGN moves to UCI notation") {
    private val pgnFile by option("--pgn-file", help = "Path to PGN file").default("")
    private val pgn by option("--pgn", help = "Raw PGN string").default("")
    override fun run() {
        val pgnStr = when {
            pgnFile.isNotBlank() -> File(pgnFile).readText()
            pgn.isNotBlank() -> pgn
            else -> throw Exception("provide --pgn-file or --pgn")
        }
        val moves = pgnStr.replace(Regex("""\d+\."""), "").replace(Regex("""[\[\].\n\r]+"""), " ").trim()
            .split(Regex("\\s+")).filter { it.isNotBlank() && !it.contains("?") && !it.contains("!") }
        echo(moves.joinToString(" "))
    }
}

class ChessPlay : CliktCommand(name = "play", help = "Play chess interactively in the terminal") {
    private val blind by option("--blind", help = "Hide the board").flag()
    override fun run() {
        val pieces = mapOf(
            'K' to "K", 'Q' to "Q", 'R' to "R", 'B' to "B", 'N' to "N", 'P' to "P",
            'k' to "k", 'q' to "q", 'r' to "r", 'b' to "b", 'n' to "n", 'p' to "p"
        )
        var board = Array(8) { Array(8) { "" } }
        val startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
        val ranks = startFen.split("/")
        for (r in 0 until 8) {
            var f = 0
            for (ch in ranks[r]) {
                if (ch.isDigit()) { f += ch - '0' }
                else { board[r][f] = pieces[ch] ?: ""; f++ }
            }
        }
        var turn = "White"

        echo("Chess CLI - Interactive Play")
        echo("Type moves in SAN (e.g., e4, Nf3). Type 'exit' to quit.")
        if (blind) echo("Blind mode is ON.")
        echo()

        while (true) {
            if (!blind) {
                for (r in 0 until 8) {
                    val row = board[r].joinToString(" ") { if (it.isEmpty()) "." else it }
                    echo("${8 - r} $row")
                }
                echo("  a b c d e f g h")
            }
            print("$turn to move: ")
            val input = readLine()?.trim() ?: break
            if (input == "exit") { echo("Exiting game."); break }
            if (blind && input == "show") {
                for (r in 0 until 8) {
                    val row = board[r].joinToString(" ") { if (it.isEmpty()) "." else it }
                    echo("${8 - r} $row")
                }
                echo("  a b c d e f g h")
                continue
            }
            turn = if (turn == "White") "Black" else "White"
        }
    }
}

class ChessRandom : CliktCommand(name = "random", help = "Pick a random Chess960 starting position") {
    override fun run() {
        val positions = listOf(
            "BBQNNRKR", "BQNBNRKR", "BQNNRBKR", "BQNNRKRB", "QBBNNRKR", "QNBBNRKR", "QNBNRBKR", "QNBNRKRB",
            "QBNNBRKR", "QNNBBRKR", "QNNRBBKR", "QNNRBKRB", "QBNNRKBR", "QNNBRKBR", "QNNRKBBR", "QNNRKRBB"
        )
        val pos = positions[Random.nextInt(positions.size)]
        val idx = Random.nextInt(960) + 1
        val fen = "${pos.lowercase()}/pppppppp/8/8/8/8/PPPPPPPP/$pos w KQkq - 0 1"
        echo("Position $idx: $pos")
        echo("FEN: $fen")
    }
}

class ChessSetup : CliktCommand(name = "setup", help = "Set up a Chess960 starting position") {
    private val number by argument("position number").default("518")
    override fun run() {
        val positions = listOf(
            "BBQNNRKR", "BQNBNRKR", "BQNNRBKR", "BQNNRKRB", "QBBNNRKR", "QNBBNRKR", "QNBNRBKR", "QNBNRKRB",
            "QBNNBRKR", "QNNBBRKR", "QNNRBBKR", "QNNRBKRB", "QBNNRKBR", "QNNBRKBR", "QNNRKBBR", "QNNRKRBB"
        ) + (1..944).map { "BBQNNRKR" }
        val n = number.toInt()
        if (n < 1 || n > 960) throw Exception("position must be between 1 and 960")
        val idx = if (n - 1 < positions.size) n - 1 else 0
        val pos = positions[idx]
        val fen = "${pos.lowercase()}/pppppppp/8/8/8/8/PPPPPPPP/$pos w KQkq - 0 1"
        echo("Position $n: $pos")
        echo("FEN: $fen")
    }
}
