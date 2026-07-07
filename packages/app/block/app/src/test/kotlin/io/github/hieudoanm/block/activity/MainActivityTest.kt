package io.github.hieudoanm.block.activity

import androidx.test.core.app.ActivityScenario
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.android.controller.ActivityController
import kotlin.test.assertNotNull

@RunWith(RobolectricTestRunner::class)
class MainActivityTest {
    @Test
    fun `activity can be launched`() {
        val controller = ActivityController.of(MainActivity::class.java)
        val activity = controller.create().get()
        assertNotNull(activity)
        controller.destroy()
    }

    @Test
    fun `activity lifecycle create and resume`() {
        val controller = ActivityController.of(MainActivity::class.java)
        val activity = controller.create().start().resume().get()
        assertNotNull(activity)
        controller.pause().stop().destroy()
    }
}
