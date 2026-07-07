package io.github.hieudoanm.block.ui.settings

import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

@RunWith(RobolectricTestRunner::class)
class SettingsScreenTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun `displays settings title`() {
        composeTestRule.setContent {
            SettingsScreen(
                onNavigateBack = {},
                viewModel = SettingsViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Settings").assertExists()
    }

    @Test
    fun `displays enable blocker toggle`() {
        composeTestRule.setContent {
            SettingsScreen(
                onNavigateBack = {},
                viewModel = SettingsViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Enable Blocker").assertExists()
    }

    @Test
    fun `displays launch on boot toggle`() {
        composeTestRule.setContent {
            SettingsScreen(
                onNavigateBack = {},
                viewModel = SettingsViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Launch on Boot").assertExists()
    }

    @Test
    fun `displays dark mode toggle`() {
        composeTestRule.setContent {
            SettingsScreen(
                onNavigateBack = {},
                viewModel = SettingsViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Dark Mode").assertExists()
    }

    @Test
    fun `displays ignore system apps toggle`() {
        composeTestRule.setContent {
            SettingsScreen(
                onNavigateBack = {},
                viewModel = SettingsViewModel(io.mockk.mockk(relaxed = true)),
            )
        }
        composeTestRule.onNodeWithText("Ignore System Apps").assertExists()
    }
}
