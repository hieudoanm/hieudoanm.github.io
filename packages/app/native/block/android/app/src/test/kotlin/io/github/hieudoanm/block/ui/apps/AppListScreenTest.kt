package io.github.hieudoanm.block.ui.apps

import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(sdk = [34])
class AppListScreenTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun `displays blocked apps title`() {
        composeTestRule.setContent {
            AppListScreen(
                onNavigateBack = {},
                viewModel = AppListViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Blocked Apps").assertExists()
    }

    @Test
    fun `displays search placeholder`() {
        composeTestRule.setContent {
            AppListScreen(
                onNavigateBack = {},
                viewModel = AppListViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Search apps\u2026").assertExists()
    }
}
