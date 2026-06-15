package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

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
        // Gross income 20M, 0 dependents, no insurance
        // Taxable = 20M - 11M = 9M
        // Bracket 1: 5M * 5% = 250k
        // Bracket 2: 4M * 10% = 400k
        // Total Tax = 650k
        val result = cmd.test("tax 20000000")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "Taxable income:   9,000,000")
        assertContains(result.stdout, "Total tax:        650,000")
    }
}
