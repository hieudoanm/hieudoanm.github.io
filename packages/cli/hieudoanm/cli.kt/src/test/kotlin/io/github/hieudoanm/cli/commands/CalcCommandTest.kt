package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class CalcCommandTest {
    @Test
    fun testCalcBmi() {
        val cmd = CalcCommand()
        val result = cmd.test("bmi 70 175")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "BMI:           22.9")
        assertContains(result.stdout, "Category:      Normal")
    }

    @Test
    fun testCalcTax() {
        val cmd = CalcCommand()
        val result = cmd.test("tax 20000000")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Taxable income:   9,000,000")
        assertContains(result.stdout, "Total tax:        650,000")
    }

    @Test
    fun testCalcUnitLength() {
        val cmd = CalcCommand()
        val result = cmd.test("unit 1 m cm")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "1 m = 100 cm")
    }

    @Test
    fun testCalcUnitWeight() {
        val cmd = CalcCommand()
        val result = cmd.test("unit 1 kg g")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "1 kg = 1000 g")
    }

    @Test
    fun testCalcUnitTemperature() {
        val cmd = CalcCommand()
        val result = cmd.test("unit 0 c f")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "0 c = 32 f")
    }

    @Test
    fun testCalcUnitSpeed() {
        val cmd = CalcCommand()
        val result = cmd.test("unit 1 m/s km/h")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "1 m/s = 3.6 km/h")
    }

    @Test
    fun testCalcCompound() {
        val cmd = CalcCommand()
        val result = cmd.test("compound 1000 5 10")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Compound Interest Calculator")
        assertContains(result.stdout, "Total")
    }

    @Test
    fun testCalcCompoundWithContribution() {
        val cmd = CalcCommand()
        val result = cmd.test("compound 1000 5 10 --contribute 100")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Contribution")
    }

    @Test
    fun testCalcLoan() {
        val cmd = CalcCommand()
        val result = cmd.test("loan 10000 5 5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Loan Amortization")
    }

    @Test
    fun testCalcLoanZeroRate() {
        val cmd = CalcCommand()
        val result = cmd.test("loan 10000 0 5")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testCalcDiscount() {
        val cmd = CalcCommand()
        val result = cmd.test("discount 100 20")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Final price")
        assertContains(result.stdout, "20.00")
    }

    @Test
    fun testCalcTip() {
        val cmd = CalcCommand()
        val result = cmd.test("tip 50")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Tip Calculator")
        assertContains(result.stdout, "Tip amount")
    }

    @Test
    fun testCalcTipWithSplit() {
        val cmd = CalcCommand()
        val result = cmd.test("tip 100 --split 4")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Per person")
        assertContains(result.stdout, "4")
    }

    @Test
    fun testCalcBase() {
        val cmd = CalcCommand()
        val result = cmd.test("base 255 dec hex")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "ff")
    }

    @Test
    fun testCalcPercent() {
        val cmd = CalcCommand()
        val result = cmd.test("percent 25 200")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "12.50%")
    }

    @Test
    fun testCalcMortgage() {
        val cmd = CalcCommand()
        val result = cmd.test("mortgage 200000 6.5 30")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Mortgage Calculator")
    }

    @Test
    fun testCalcMortgageZeroRate() {
        val cmd = CalcCommand()
        val result = cmd.test("mortgage 100000 0 15")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testCalcDate() {
        val cmd = CalcCommand()
        val result = cmd.test("date 2024-01-15 10")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "2024-01-25")
    }

    @Test
    fun testCalcDateToday() {
        val cmd = CalcCommand()
        val result = cmd.test("date")
        assertEquals(0, result.statusCode)
        assertTrue(result.stdout.isNotBlank())
    }

    @Test
    fun testCalcEval() {
        val cmd = CalcCommand()
        val result = cmd.test("eval 2+2")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "4.0")
    }

    @Test
    fun testCalcEvalAdvanced() {
        val cmd = CalcCommand()
        val result = cmd.test("eval sqrt(16)+3")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "7.0")
    }

    @Test
    fun testCalcStats() {
        val cmd = CalcCommand()
        val result = cmd.test("stats \"1 2 3 4 5\"")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "mean:")
        assertContains(result.stdout, "median:")
    }

    @Test
    fun testCalcFactorial() {
        val cmd = CalcCommand()
        val result = cmd.test("factorial 5")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "120")
    }

    @Test
    fun testCalcRandom() {
        val cmd = CalcCommand()
        val result = cmd.test("random 1 10")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testCalcPrime() {
        val cmd = CalcCommand()
        val result = cmd.test("prime 17")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "is prime")
    }

    @Test
    fun testCalcPrimeNotPrime() {
        val cmd = CalcCommand()
        val result = cmd.test("prime 15")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "is not prime")
    }

    @Test
    fun testCalcPrimeList() {
        val cmd = CalcCommand()
        val result = cmd.test("prime 10 --list")
        assertEquals(0, result.statusCode)
    }

    @Test
    fun testCalcGcd() {
        val cmd = CalcCommand()
        val result = cmd.test("gcd 12 8")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "4")
    }

    @Test
    fun testCalcLcm() {
        val cmd = CalcCommand()
        val result = cmd.test("lcm 12 8")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "24")
    }

    @Test
    fun testFrankfurterResponseDataClass() {
        val resp = FrankfurterResponse(amount = 1.0, base = "EUR", date = "2024-01-01", rates = mapOf("USD" to 1.1))
        assertEquals(1.0, resp.amount)
        assertEquals("EUR", resp.base)
        assertTrue(resp.rates.containsKey("USD"))
    }
}
