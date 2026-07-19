package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class CasinoCommandTest {
    @Test
    fun testCasinoCoinHeadsTails1() {
        val cmd = CasinoCommand()
        val result = cmd.test("coin --count 1")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.trim() in listOf("Heads", "Tails"))
    }

    @Test
    fun testCasinoCoinMultiple() {
        val cmd = CasinoCommand()
        val result = cmd.test("coin --count 5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Heads:")
        assertContains(result.stdout, "Tails:")
    }

    @Test
    fun testCasinoDiceSingle() {
        val cmd = CasinoCommand()
        val result = cmd.test("dice --count 1 --sides 6")
        assertEquals(0, result.statusCode)
        val n = result.stdout.trim().toIntOrNull()
        assertTrue(n != null && n in 1..6)
    }

    @Test
    fun testCasinoDiceMultiple() {
        val cmd = CasinoCommand()
        val result = cmd.test("dice --count 3 --sides 20")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Total:")
    }

    @Test
    fun testCasinoRouletteSingle() {
        val cmd = CasinoCommand()
        val result = cmd.test("roulette --spins 1")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testCasinoSlotsPlay() {
        val cmd = CasinoCommand()
        val result = cmd.test("slots play --bet 10")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testCasinoBaccaratPlay() {
        val cmd = CasinoCommand()
        val result = cmd.test("baccarat play --bet 50")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Player:")
        assertContains(result.stdout, "Banker:")
        assertContains(result.stdout, "Result:")
    }

    @Test
    fun testCasinoBaccaratStrategy() {
        val cmd = CasinoCommand()
        val result = cmd.test("baccarat strategy --simulations 100")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Baccarat Strategy Analysis")
        assertContains(result.stdout, "Player")
        assertContains(result.stdout, "Banker")
        assertContains(result.stdout, "Tie")
    }

    @Test
    fun testCasinoBlackjackPlay() {
        val cmd = CasinoCommand()
        val result = cmd.test("blackjack play")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Your hand:")
    }

    @Test
    fun testCasinoBlackjackCount() {
        val cmd = CasinoCommand()
        val result = cmd.test("blackjack count --hands 3")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.contains("Hand "))
    }

    @Test
    fun testCasinoPokerOdds() {
        val cmd = CasinoCommand()
        val result = cmd.test("poker odds Ah Kh --simulations 500")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Your hand:")
        assertContains(result.stdout, "Win:")
        assertContains(result.stdout, "Tie:")
        assertContains(result.stdout, "Lose:")
    }
}
