package io.github.hieudoanm.kevin.gui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.WindowPosition
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import io.github.hieudoanm.kevin.db.Db
import kotlinx.coroutines.delay

private const val POLL_MILLIS = 250L
private val INITIAL_SIZE = DpSize(900.dp, 600.dp)

/**
 * Opens the key/value manager GUI backed by [kv] and blocks until the window is
 * closed. The TCP server is expected to run concurrently on the same [kv].
 */
fun run(kv: Db) = application {
    val state = remember { mutableStateOf(GuiState().render(kv)) }
    Window(
        onCloseRequest = ::exitApplication,
        state = rememberWindowState(size = INITIAL_SIZE, position = WindowPosition(Alignment.Center)),
        title = state.value.title,
    ) {
        Manager(kv, state)
    }
}

/**
 * Owns the polling job for keys written by TCP clients. `LaunchedEffect` scopes
 * the coroutine to the composition, so closing the window cancels the loop.
 */
@Composable
private fun Manager(kv: Db, state: MutableState<GuiState>) {
    LaunchedEffect(Unit) {
        while (true) {
            delay(POLL_MILLIS)
            val current = state.value
            val refreshed = current.render(kv)
            if (refreshed.hasNewData(current)) state.value = refreshed
        }
    }
    KevinTheme {
        KevinContent(state.value, kv) { state.value = it }
    }
}

/**
 * Reports whether a poll found a change worth recomposing. Comparing the data
 * rather than the whole state keeps the poll from re-rendering every tick.
 */
private fun GuiState.hasNewData(other: GuiState): Boolean =
    rows != other.rows || values != other.values || count != other.count
