package io.github.hieudoanm.block.ui.home

import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class HomeScreenTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun `displays focus blocker title`() {
        composeTestRule.setContent {
            HomeScreen(
                onNavigateToAppList = {},
                onNavigateToSettings = {},
                viewModel = HomeViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Focus Blocker").assertExists()
    }

    @Test
    fun `displays manage apps button`() {
        composeTestRule.setContent {
            HomeScreen(
                onNavigateToAppList = {},
                onNavigateToSettings = {},
                viewModel = HomeViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Manage Apps").assertExists()
    }

    @Test
    fun `displays settings button`() {
        composeTestRule.setContent {
            HomeScreen(
                onNavigateToAppList = {},
                onNavigateToSettings = {},
                viewModel = HomeViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Settings").assertExists()
    }

    @Test
    fun `manage apps button triggers callback`() {
        var clicked = false
        composeTestRule.setContent {
            HomeScreen(
                onNavigateToAppList = { clicked = true },
                onNavigateToSettings = {},
                viewModel = HomeViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Manage Apps").performClick()
        assert(clicked)
    }

    @Test
    fun `settings button triggers callback`() {
        var clicked = false
        composeTestRule.setContent {
            HomeScreen(
                onNavigateToAppList = {},
                onNavigateToSettings = { clicked = true },
                viewModel = HomeViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Settings").performClick()
        assert(clicked)
    }
}
