package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.parameters.arguments.argument
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.types.int
import kotlin.random.Random
import kotlin.math.*

class CasinoCommand : CliktCommand(name = "casino", help = "Casino games") {
    init {
        subcommands(CasinoCoin(), CasinoDice(), CasinoRoulette(), CasinoSlots(), CasinoBaccarat(), CasinoBlackjack(), CasinoPoker())
    }
    override fun run() = Unit
}

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

class CasinoSlots : CliktCommand(name = "slots", help = "Play a slot machine") {
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

class CasinoBaccarat : CliktCommand(name = "baccarat", help = "Simplified baccarat") {
    private val bet by option("--bet", "-b", help = "Bet amount").int().default(25)
    override fun run() {
        fun cardValue(c: Int) = minOf(c, 10)
        fun handValue(vararg cards: Int) = cards.sumOf { cardValue(it) } % 10

        val deck = (1..13).flatMap { rank -> (1..4).map { rank } }.shuffled()
        val player = listOf(deck[0], deck[1])
        val banker = listOf(deck[2], deck[3])
        val pv = handValue(player[0], player[1])
        val bv = handValue(banker[0], banker[1])

        val result = when {
            pv > bv -> "Player"
            bv > pv -> "Banker"
            else -> "Tie"
        }

        echo("Player: ${player.joinToString(", ")} = $pv")
        echo("Banker: ${banker.joinToString(", ")} = $bv")
        echo("Result: $result")
        if (result == "Player") echo("You won $bet!")
        else if (result == "Banker") echo("Banker wins. You lost $bet.")
        else echo("Tie. Push.")
    }
}

class CasinoBlackjack : CliktCommand(name = "blackjack", help = "Blackjack simulation") {
    private val s17 by option("--s17", help = "Dealer stands on soft 17").flag()
    override fun run() {
        fun cardValue(c: Int) = when (c) { 1 -> 11; 11, 12, 13 -> 10; else -> c }
        fun handValue(hand: List<Int>): Int {
            var v = hand.sumOf { cardValue(it) }
            var aces = hand.count { it == 1 }
            while (v > 21 && aces > 0) { v -= 10; aces-- }
            return v
        }

        val deck = (1..13).flatMap { rank -> (1..4).map { rank } }.shuffled().toMutableList()
        var player = listOf(deck.removeAt(0), deck.removeAt(0))
        var dealer = listOf(deck.removeAt(0), deck.removeAt(0))

        echo("Your hand: ${player.joinToString(", ")} = ${handValue(player)}")
        echo("Dealer shows: ${dealer[0]}")

        while (handValue(player) < 17) {
            player = player + deck.removeAt(0)
            val hv = handValue(player)
            echo("Hit: ${player.last()} = $hv")
            if (hv > 21) { echo("Bust! You lose."); return }
        }

        val pv = handValue(player)
        echo("Your final: $pv")

        while (true) {
            val dv = handValue(dealer)
            val shouldHit = if (s17 && dealer.contains(1) && dv == 17) false else dv < 17
            if (!shouldHit) break
            dealer = dealer + deck.removeAt(0)
        }

        val bv = handValue(dealer)
        echo("Dealer hand: ${dealer.joinToString(", ")} = $bv")
        when {
            bv > 21 || pv > bv -> echo("You win!")
            pv < bv -> echo("You lose.")
            else -> echo("Push.")
        }
    }
}

class CasinoPoker : CliktCommand(name = "poker", help = "Poker hand evaluation") {
    private val hand by argument("hole cards, e.g. Ah Kh")
    private val sims by option("--sims", "-n", help = "Number of simulations").int().default(10000)
    private val opponents by option("--opponents", "-o", help = "Number of opponents").int().default(1)
    override fun run() {
        data class Card(val rank: Int, val suit: Int) {
            override fun toString() = "${"23456789TJQKA"[rank]}${"shdc"[suit]}"
        }

        fun parseCard(s: String): Card {
            val rank = "23456789TJQKA".indexOf(s[0])
            val suit = "shdc".indexOf(s[1])
            return Card(rank, suit)
        }

        val cards = hand.split(" ").map { parseCard(it.trim()) }
        if (cards.size != 2) throw Exception("exactly 2 hole cards required")

        fun rankHand(h: List<Card>): Int {
            val ranks = h.map { it.rank }.sorted()
            val suits = h.map { it.suit }
            val flush = suits.distinct().size == 1
            val straight = ranks.zipWithNext().all { (a, b) -> b - a == 1 } ||
                (ranks == listOf(0, 1, 2, 3, 12))
            val groups = ranks.groupBy { it }.mapValues { it.value.size }

            return when {
                flush && straight && ranks.last() == 12 -> 9
                flush && straight -> 8
                groups.any { it.value == 4 } -> 7
                groups.any { it.value == 3 } && groups.any { it.value == 2 } -> 6
                flush -> 5
                straight -> 4
                groups.any { it.value == 3 } -> 3
                groups.count { it.value == 2 } == 2 -> 2
                groups.any { it.value == 2 } -> 1
                else -> 0
            }
        }

        val allCards = (0..12).flatMap { r -> (0..3).map { s -> Card(r, s) } }
        val used = cards.toSet()
        val remaining = allCards - used
        var wins = 0; var ties = 0; var losses = 0

        for (sim in 0 until sims) {
            val shuffled = remaining.shuffled()
            var board = shuffled.take(5)
            val myHand = rankHand(cards + board)

            var bestOpp = 0
            var oppIdx = 0
            var usedCards = mutableSetOf<Card>()
            usedCards.addAll(cards)
            usedCards.addAll(board)

            for (op in 0 until opponents) {
                val oppCards = shuffled.subList(5 + op * 2, 7 + op * 2)
                val oppRank = rankHand(oppCards + board)
                if (oppRank > bestOpp) bestOpp = oppRank
            }

            when {
                myHand > bestOpp -> wins++
                myHand == bestOpp -> ties++
                else -> losses++
            }
        }

        val total = sims.toDouble()
        echo("Win:  ${"%.1f".format(wins / total * 100)}%")
        echo("Tie:  ${"%.1f".format(ties / total * 100)}%")
        echo("Lose: ${"%.1f".format(losses / total * 100)}%")
    }
}
