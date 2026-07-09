package io.github.hieudoanm.block

import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import kotlin.test.assertNotNull

@RunWith(RobolectricTestRunner::class)
class FocusBlockAppTest {
    @Test
    fun `application class can be instantiated`() {
        val app = FocusBlockApp()
        assertNotNull(app)
    }
}
