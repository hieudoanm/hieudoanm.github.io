package io.github.hieudoanm.block.navigation

import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class NavGraphTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun `AppNavGraph renders without crash`() {
        composeTestRule.setContent {
            AppNavGraph()
        }
        composeTestRule.waitForIdle()
    }

    @Test
    fun `Routes constants are defined`() {
        assert(org.junit.Assert.assertEquals("home", Routes.HOME))
        assert(org.junit.Assert.assertEquals("app_list", Routes.APP_LIST))
        assert(org.junit.Assert.assertEquals("settings", Routes.SETTINGS))
    }
}
