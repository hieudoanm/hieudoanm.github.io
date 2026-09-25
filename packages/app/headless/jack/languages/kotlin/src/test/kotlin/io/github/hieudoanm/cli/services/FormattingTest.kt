package io.github.hieudoanm.cli.services

import kotlin.test.Test
import kotlin.test.assertEquals

class FormattingTest {
    @Test
    fun testComma() {
        assertEquals("1,000", comma(1000))
        assertEquals("1,000,000", comma(1000000))
        assertEquals("1,234.56", comma(1234.56))
        assertEquals("0", comma(0))
    }
}
