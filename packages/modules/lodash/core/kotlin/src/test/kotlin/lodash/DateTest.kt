package lodash.test

import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class DateTest {

    @Test
    fun now() {
        val t1 = lodash.now()
        val t2 = lodash.now()
        assertTrue(t2 >= t1)
        assertTrue(t1 > 1_700_000_000_000L)
    }
}
