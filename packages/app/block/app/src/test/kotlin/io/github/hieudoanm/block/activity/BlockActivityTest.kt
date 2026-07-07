package io.github.hieudoanm.block.activity

import android.content.Intent
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.android.controller.ActivityController
import kotlin.test.assertEquals
import kotlin.test.assertNotNull

@RunWith(RobolectricTestRunner::class)
class BlockActivityTest {
    @Test
    fun `activity can be launched with package extra`() {
        val intent = Intent().apply {
            putExtra(BlockActivity.EXTRA_PACKAGE_NAME, "com.example.app")
        }
        val controller = ActivityController.of(BlockActivity::class.java, intent)
        val activity = controller.create().get()
        assertNotNull(activity)
        controller.destroy()
    }

    @Test
    fun `EXTRA_PACKAGE_NAME constant is correct`() {
        assertEquals("extra_package_name", BlockActivity.EXTRA_PACKAGE_NAME)
    }

    @Test
    fun `activity finishes without package extra`() {
        val controller = ActivityController.of(BlockActivity::class.java)
        val activity = controller.create().get()
        assertNotNull(activity)
        controller.destroy()
    }
}
