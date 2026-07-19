package io.github.hieudoanm.landify.studio

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import java.nio.file.Path

/**
 * Opens the desktop editor for [path].
 *
 * Blocking: `application` owns the JVM main thread until the last window
 * closes, so the caller must not expect a return value on the normal path.
 */
fun runStudio(path: Path) {
    val initial = initialState(path)
    application {
        Window(
            onCloseRequest = ::exitApplication,
            title = "landify studio — ${path.fileName}",
            state = rememberWindowState(size = DpSize(1280.dp, 800.dp)),
        ) {
            StudioHost(initial)
        }
    }
}

/**
 * Holds the editor state in Compose and folds each action through [reduce], so
 * the window itself stays a pure function of that state.
 */
@Composable
private fun StudioHost(initial: StudioState) {
    var state = remember { initial }
    StudioWindow(state = state, onAction = { state = reduce(state, it) })
}
