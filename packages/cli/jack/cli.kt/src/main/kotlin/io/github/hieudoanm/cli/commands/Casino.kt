package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.arguments.multiple
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import kotlin.random.Random
import kotlin.math.*

class CasinoCommand : CliktCommand(name = "casino", help = "Casino games") {
    init {
        subcommands(CasinoCoin(), CasinoDice(), CasinoRoulette(), CasinoSlots(), CasinoBaccarat(), CasinoBlackjack(), CasinoPoker())
    }
    override fun run() = Unit
}

// -- Coin ------------------------------------------------------------------

class CasinoCoin : CliktCommand(name = "coin", help = "Flip a coin") {
    private val count by option("--count", "-n", help = "Number of flips").int().default(1)
    override fun run() {
        val c = maxOf(1, count)
        val results = (1..c).map { if (Random.nextBoolean()) "Heads" else "Tails" }
        if (c == 1) {
            echo(results[0])
        } else {
            val heads = results.count { it == "Heads" }
            val tails = c - heads
            results.forEachIndexed { i, r -> echo("%2d. %s".format(i + 1, r)) }
            echo()
            echo("Heads: $heads (${heads * 100 / c}%), Tails: $tails (${tails * 100 / c}%)")
        }
    }
}

// -- Dice ------------------------------------------------------------------

class CasinoDice : CliktCommand(name = "dice", help = "Roll dice") {
    private val count by option("--count", "-n", help = "Number of dice").int().default(1)
    private val sides by option("--sides", "-s", help = "Sides per die").int().default(6)
    override fun run() {
        val c = maxOf(1, count)
        val results = (1..c).map { Random.nextInt(sides) + 1 }
        if (c == 1) {
            echo("${results[0]}")
        } else {
            echo("Rolling ${c}d${sides}:")
            results.forEachIndexed { i, r -> echo("  Die ${i + 1}: $r") }
            echo()
            echo("Total: ${results.sum()}")
        }
    }
}

// -- Roulette --------------------------------------------------------------

class CasinoRoulette : CliktCommand(name = "roulette", help = "Spin the roulette wheel") {
    private val spins by option("--spins", "-n", help = "Number of spins").int().default(1)
    override fun run() {
        val numbers = listOf(0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36,
            11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9,
            22, 18, 29, 7, 28, 12, 35, 3, 26)
        val n = maxOf(1, spins)
        for (i in 0 until n) {
            val num = numbers[Random.nextInt(numbers.size)]
            val color = if (num == 0) "Green" else if (num % 2 == 0) "Red" else "Black"
            val parity = if (num == 0) "Neither" else if (num % 2 == 0) "Even" else "Odd"
            val half = if (num == 0 || num <= 18) "1-18" else "19-36"
            if (n == 1) {
                echo("$num ($color, $parity, $half)")
            } else {
                echo("  ${i + 1}. $num ($color, $parity, $half)")
            }
        }
    }
}

// -- Slots -----------------------------------------------------------------

class CasinoSlots : CliktCommand(name = "slots", help = "Play a slot machine") {
    private val bet by option("--bet", "-b", help = "Bet amount").int().default(25)
    init { subcommands(CasinoSlotsPlay()) }
    override fun run() { echo("See 'slots play'") }
}

class CasinoSlotsPlay : CliktCommand(name = "play", help = "Play the slot machine") {
    private val bet by option("--bet", "-b", help = "Bet amount").int().default(25)
    override fun run() {
        val symbols = listOf("Cherry", "Lemon", "Bell", "Diamond", "7", "BAR")
        val reels = (1..3).map { symbols[Random.nextInt(symbols.size)] }
        val win = reels.distinct().size == 1
        val payout = if (win) bet * 10 else 0
        echo("${reels.joinToString(" | ")}")
        if (win) {
            echo("Jackpot! You won $payout!")
        } else {
            echo("No win. You lost $bet.")
        }
    }
}

// -- Baccarat --------------------------------------------------------------

class CasinoBaccarat : CliktCommand(name = "baccarat", help = "Baccarat games") {
    init { subcommands(CasinoBaccaratPlay(), CasinoBaccaratStrategy()) }
    override fun run() = Unit
}

class CasinoBaccaratPlay : CliktCommand(name = "play", help = "Play a simplified baccarat hand") {
    private val bet by option("--bet", "-b", help = "Bet amount").int().default(25)
    override fun run() {
        val deck = shuffledDeck().toMutableList()
        val player = listOf(deck.removeAt(0), deck.removeAt(0))
        val banker = listOf(deck.removeAt(0), deck.removeAt(0))
        val (pv, bv) = simBaccaratHand(player.toMutableList(), banker.toMutableList(), deck)
        echo("Player: ${player.joinToString(", ")} = $pv")
        echo("Banker: ${banker.joinToString(", ")} = $bv")
        val result = when { pv > bv -> "Player"; bv > pv -> "Banker"; else -> "Tie" }
        echo("Result: $result")
        when (result) {
            "Player" -> echo("You won $bet!")
            "Banker" -> echo("Banker wins. You lost $bet.")
            else -> echo("Tie. Push.")
        }
    }
}

class CasinoBaccaratStrategy : CliktCommand(name = "strategy", help = "Baccarat strategy analysis via simulation") {
    private val sims by option("--simulations", "-n", help = "Number of simulations").int().default(100000)
    override fun run() {
        val n = maxOf(1, sims)
        var pWins = 0; var bWins = 0; var ties = 0
        repeat(n) {
            val deck = shuffledDeck().toMutableList()
            val player = listOf(deck.removeAt(0), deck.removeAt(0))
            val banker = listOf(deck.removeAt(0), deck.removeAt(0))
            val (pv, bv) = simBaccaratHand(player.toMutableList(), banker.toMutableList(), deck)
            when { pv > bv -> pWins++; bv > pv -> bWins++; else -> ties++ }
        }
        val total = n.toDouble()
        val pPct = pWins / total * 100
        val bPct = bWins / total * 100
        val tPct = ties / total * 100
        echo("  Baccarat Strategy Analysis")
        echo("  ${"-".repeat(38)}")
        echo("  %-10s %6.2f%%   %-6s   %+.2f%%".format("Player", pPct, "1:1", 2 * pPct + tPct - 100))
        echo("  %-10s %6.2f%%   %-6s   %+.2f%%".format("Banker", bPct, "0.95:1", 1.95 * bPct + tPct - 100))
        echo("  %-10s %6.2f%%   %-6s   %+.2f%%".format("Tie", tPct, "8:1", 9 * tPct - 100))
        echo("  ${"-".repeat(38)}")
        echo("  Simulations: $n")
        echo()
        echo("  Optimal strategy: bet Banker (lowest house edge)")
        echo("  Avoid Tie bet (high house edge ~14%)")
        echo("  Banker bets pay 1:1 minus 5% commission")
    }
}

// -- Blackjack -------------------------------------------------------------

class CasinoBlackjack : CliktCommand(name = "blackjack", help = "Blackjack games") {
    init { subcommands(CasinoBlackjackPlay(), CasinoBlackjackCount()) }
    override fun run() = Unit
}

class CasinoBlackjackPlay : CliktCommand(name = "play", help = "Play a blackjack hand") {
    private val s17 by option("--s17", help = "Dealer stands on soft 17").flag()
    override fun run() {
        val deck = shuffledDeck().toMutableList()
        var player = listOf(deck.removeAt(0), deck.removeAt(0))
        var dealer = listOf(deck.removeAt(0), deck.removeAt(0))
        echo("Your hand: ${player.joinToString(", ")} = ${blackjackValue(player)}")
        echo("Dealer shows: ${dealer[0]}")
        while (blackjackValue(player) < 17) {
            player = player + deck.removeAt(0)
            val hv = blackjackValue(player)
            echo("Hit: ${player.last()} = $hv")
            if (hv > 21) { echo("Bust! You lose."); return }
        }
        val pv = blackjackValue(player)
        echo("Your final: $pv")
        while (true) {
            val dv = blackjackValue(dealer)
            val shouldHit = if (s17 && dealer.contains(PCard(12, 0).copy()) && dv == 17) false else dv < 17
            if (!shouldHit) break
            dealer = dealer + deck.removeAt(0)
        }
        val bv = blackjackValue(dealer)
        echo("Dealer hand: ${dealer.joinToString(", ")} = $bv")
        when { bv > 21 || pv > bv -> echo("You win!"); pv < bv -> echo("You lose."); else -> echo("Push.") }
    }
}

class CasinoBlackjackCount : CliktCommand(name = "count", help = "Practice card counting (Hi-Lo)") {
    private val hands by option("--hands", "-n", help = "Number of hands").int().default(10)
    override fun run() {
        val n = maxOf(1, hands)
        val deck = shuffledDeck().toMutableList()
        var runningCount = 0
        repeat(n) { i ->
            if (deck.size < 15) {
                deck.clear(); deck.addAll(shuffledDeck())
                runningCount = 0
                echo("-- Deck reshuffled --")
            }
            val player = listOf(deck.removeAt(0), deck.removeAt(0))
            val dealer = listOf(deck.removeAt(0), deck.removeAt(0))
            for (c in player + dealer) { runningCount += hiLoValue(c) }
            val pv = blackjackValue(player)
            val bv = blackjackValue(dealer)
            val trueCount = runningCount * 52.0 / maxOf(1, deck.size)
            echo("Hand ${i + 1}: Player $pv vs Dealer $bv | Running: ${if (runningCount >= 0) "+" else ""}$runningCount | True: ${"%.1f".format(trueCount)}")
        }
    }
}

// -- Poker -----------------------------------------------------------------

class CasinoPoker : CliktCommand(name = "poker", help = "Poker odds calculator") {
    init { subcommands(CasinoPokerOdds()) }
    override fun run() = Unit
}

class CasinoPokerOdds : CliktCommand(name = "odds", help = "Texas Hold'em odds via Monte Carlo simulation") {
    private val hand by argument(help = "Hole cards (e.g. \"Ah Kh\")").multiple()
    private val board by option("--board", "-b", help = "Community cards (e.g. \"2h 7s Tc\")").default("")
    private val opponents by option("--opponents", "-o", help = "Number of opponents").int().default(1)
    private val sims by option("--simulations", "-n", help = "Number of simulations").int().default(10000)
    override fun run() {
        if (hand.size < 2) throw IllegalArgumentException("hand requires at least 2 cards, got $hand")
        val hole = parseCards(hand.joinToString(" "))
        if (hole.size != 2) throw IllegalArgumentException("exactly 2 hole cards required, got ${hole.size}")
        val community = if (board.isBlank()) emptyList() else parseCards(board)
        if (community.size > 5) throw IllegalArgumentException("board can have at most 5 cards, got ${community.size}")
        val allCards = hole + community
        if (allCards.size != allCards.distinct().size) throw IllegalArgumentException("duplicate cards in hand and board")
        val opp = maxOf(1, opponents)
        val n = maxOf(100, sims)
        val result = simulatePokerOdds(hole, community, opp, n)
        echo("${"\u2500".repeat(48)}")
        echo("  Your hand:      ${hole.joinToString(" ")}")
        if (community.isNotEmpty()) echo("  Board:          ${community.joinToString(" ")}")
        echo("  Opponents:      $opp")
        echo("  Simulations:    $n")
        echo("${"\u2500".repeat(48)}")
        echo("  Win:   %5.1f%%".format(result.first))
        echo("  Tie:   %5.1f%%".format(result.second))
        echo("  Lose:  %5.1f%%".format(result.third))
        echo("${"\u2500".repeat(48)}")
    }
}

// -- Shared helpers --------------------------------------------------------

private data class PCard(val rank: Int, val suit: Int) {
    override fun toString() = "${"23456789TJQKA"[rank]}${"cdhs"[suit]}"
}

private fun shuffledDeck() = (0..51).map { i -> PCard(i / 4, i % 4) }.shuffled()

private fun hiLoValue(c: PCard): Int = when (c.rank) {
    in 0..3 -> 1
    in 4..7 -> 0
    else -> -1
}

private fun blackjackValue(hand: List<PCard>): Int {
    var v = hand.sumOf { c -> when (c.rank) { 12 -> 11; 8, 9, 10, 11 -> 10; else -> c.rank + 2 } }
    var aces = hand.count { it.rank == 12 }
    while (v > 21 && aces > 0) { v -= 10; aces-- }
    return v
}

private fun baccaratValue(c: PCard) = if (c.rank >= 10) 0 else c.rank + 2
private fun baccaratSum(cards: List<PCard>) = cards.sumOf { baccaratValue(it) } % 10
private fun baccaratShouldDraw(cards: List<PCard>) = baccaratSum(cards) <= 5
private fun baccaratDrawForThird(cards: List<PCard>, playerThird: Int): Boolean {
    val v = baccaratSum(cards)
    return when {
        v <= 2 -> true
        v == 3 -> playerThird != 8
        v == 4 -> playerThird in 2..7
        v == 5 -> playerThird in 4..7
        v == 6 -> playerThird == 6 || playerThird == 7
        else -> false
    }
}

private fun simBaccaratHand(player: MutableList<PCard>, banker: MutableList<PCard>, deck: MutableList<PCard>): Pair<Int, Int> {
    var pv = baccaratSum(player)
    var bv = baccaratSum(banker)
    if (pv >= 8 || bv >= 8) return pv to bv
    if (baccaratShouldDraw(player)) {
        player.add(deck.removeAt(0))
        val pc = player[2]
        if (baccaratDrawForThird(banker, baccaratValue(pc))) {
            banker.add(deck.removeAt(0))
        }
    } else if (baccaratShouldDraw(banker)) {
        banker.add(deck.removeAt(0))
    }
    return baccaratSum(player) to baccaratSum(banker)
}

private fun parseCards(s: String): List<PCard> {
    val parts = s.split(" ")
    return parts.map { p ->
        val rank = when (p[0]) {
            '2' -> 0; '3' -> 1; '4' -> 2; '5' -> 3; '6' -> 4; '7' -> 5; '8' -> 6; '9' -> 7
            'T' -> 8; 'J' -> 9; 'Q' -> 10; 'K' -> 11; 'A' -> 12
            else -> throw IllegalArgumentException("invalid rank: ${p[0]}")
        }
        val suit = when (p[1]) {
            'c' -> 0; 'd' -> 1; 'h' -> 2; 's' -> 3
            else -> throw IllegalArgumentException("invalid suit: ${p[1]}")
        }
        PCard(rank, suit)
    }.sortedByDescending { it.rank }
}

private fun pokerRank(cards: List<PCard>): Pair<Int, Int> {
    val ranks = cards.map { it.rank }.sorted()
    val suits = cards.map { it.suit }
    val flush = suits.distinct().size == 1
    val straight = ranks.zipWithNext().all { (a, b) -> b - a == 1 } || (ranks == listOf(0, 1, 2, 3, 12))
    val groups = ranks.groupBy { it }.mapValues { it.value.size }
    val score = cards.sortedByDescending { it.rank }.fold(0) { acc, c -> acc * 100 + c.rank }
    return when {
        flush && straight && ranks.last() == 12 -> 9 to 12
        flush && straight -> 8 to ranks.last()
        groups.any { it.value == 4 } -> 7 to groups.filter { it.value == 4 }.keys.first()
        groups.any { it.value == 3 } && groups.any { it.value == 2 } -> 6 to (groups.filter { it.value == 3 }.keys.first() * 100 + groups.filter { it.value == 2 }.keys.first())
        flush -> 5 to score
        straight -> 4 to ranks.last()
        groups.any { it.value == 3 } -> 3 to groups.filter { it.value == 3 }.keys.first()
        groups.count { it.value == 2 } == 2 -> 2 to groups.filter { it.value == 2 }.keys.sortedDescending().let { it[0] * 100 + it[1] }
        groups.any { it.value == 2 } -> 1 to groups.filter { it.value == 2 }.keys.first()
        else -> 0 to score
    }
}

private fun bestPokerHand(cards: List<PCard>): Pair<Int, Int> {
    if (cards.size < 5) return pokerRank(cards)
    var best = -1 to -1
    val indices = IntArray(5) { it }
    while (true) {
        val five = indices.map { cards[it] }
        val r = pokerRank(five)
        if (r.first > best.first || (r.first == best.first && r.second > best.second)) best = r
        var i = 4
        while (i >= 0 && indices[i] == i + cards.size - 5) i--
        if (i < 0) break
        indices[i]++
        for (j in i + 1 until 5) indices[j] = indices[j - 1] + 1
    }
    return best
}

private fun simulatePokerOdds(hole: List<PCard>, board: List<PCard>, opponents: Int, simulations: Int): Triple<Double, Double, Double> {
    val allCards = (0..51).map { i -> PCard(i / 4, i % 4) }
    val used = (hole + board).toSet()
    val remaining = allCards - used
    var wins = 0; var ties = 0
    repeat(simulations) {
        val shuffled = remaining.shuffled()
        val fullBoard = (board + shuffled.take(5 - board.size))
        val hero = bestPokerHand(hole + fullBoard)
        var best = -1 to -1
        var bestCnt = 0
        for (op in 0 until opponents) {
            val oppHand = bestPokerHand(shuffled.subList(5 + op * 2, 7 + op * 2) + fullBoard)
            val cmp = compareValuesBy(oppHand, best) { it.first }.let { if (it != 0) it else compareValuesBy(oppHand, best) { it.second } }
            if (cmp > 0) { best = oppHand; bestCnt = 1 }
            else if (cmp == 0) bestCnt++
        }
        val hcmp = compareValuesBy(hero, best) { it.first }.let { if (it != 0) it else compareValuesBy(hero, best) { it.second } }
        if (hcmp > 0) wins++
        else if (hcmp == 0) ties++
    }
    val t = simulations.toDouble()
    return Triple(wins / t * 100, ties / t * 100, (simulations - wins - ties) / t * 100)
}
