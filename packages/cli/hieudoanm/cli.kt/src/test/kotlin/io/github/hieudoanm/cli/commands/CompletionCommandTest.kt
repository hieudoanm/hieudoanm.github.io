package io.github.hieudoanm.cli.commands

import com.github.ajalt.clikt.testing.test
import io.github.hieudoanm.cli.HieuDoanm
import kotlin.test.Test
import kotlin.test.assertContains
import kotlin.test.assertEquals

class CompletionCommandTest {
    @Test
    fun testCompletionBash() {
        val cmd = HieuDoanm()
        val result = cmd.test("completion --shell bash")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "complete -F _hieudoanm hieudoanm")
    }

    @Test
    fun testCompletionDefaultShell() {
        val cmd = HieuDoanm()
        val result = cmd.test("completion")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "complete -F _hieudoanm hieudoanm")
    }

    @Test
    fun testCompletionFish() {
        val cmd = HieuDoanm()
        val result = cmd.test("completion --shell fish")
        assertEquals(0, result.statusCode)
        assertContains(result.stdout, "complete -c hieudoanm")
    }
}
