package io.github.hieudoanm.landify.studio

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.dp
import io.github.hieudoanm.landify.validate.knownTypes

/**
 * The studio window: a YAML editor on the left, and on the right the problems
 * list above the generated HTML.
 *
 * Compose state is lifted to the caller so the window stays a pure function of
 * [StudioState] and the reducers remain testable without a UI toolkit.
 */
@Composable
fun StudioWindow(state: StudioState, onAction: (StudioAction) -> Unit) {
    MaterialTheme {
        Surface(modifier = Modifier.fillMaxSize()) {
            Column(modifier = Modifier.padding(12.dp)) {
                Toolbar(state, onAction)
                HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                Row(modifier = Modifier.fillMaxSize(), horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    EditorPane(state, onAction, Modifier.weight(1f))
                    OutputPane(state, Modifier.weight(1f))
                }
            }
        }
    }
}

@Composable
private fun Toolbar(state: StudioState, onAction: (StudioAction) -> Unit) {
    Row(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Button(onClick = { onAction(StudioAction.Validate) }) { Text("Validate") }
        Button(onClick = { onAction(StudioAction.Build) }) { Text("Build") }
        OutlinedButton(onClick = { onAction(StudioAction.Save) }) { Text("Save") }
        OutlinedButton(onClick = { onAction(StudioAction.Reload) }) { Text("Reload") }
        TypeMenu(onAction)
        ThemeMenu(onAction)
        Text(
            text = state.message,
            style = MaterialTheme.typography.bodySmall,
            color = if (state.failed) {
                MaterialTheme.colorScheme.error
            } else {
                MaterialTheme.colorScheme.onSurface
            },
        )
    }
}

@Composable
private fun TypeMenu(onAction: (StudioAction) -> Unit) {
    var open by remember { mutableStateOf(false) }
    Row {
        OutlinedButton(onClick = { open = true }) { Text("Type") }
        DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
            knownTypes().forEach { type ->
                DropdownMenuItem(
                    text = { Text(type) },
                    onClick = {
                        open = false
                        onAction(StudioAction.Generate(type))
                    },
                )
            }
        }
    }
}

@Composable
private fun ThemeMenu(onAction: (StudioAction) -> Unit) {
    var open by remember { mutableStateOf(false) }
    Row {
        OutlinedButton(onClick = { open = true }) { Text("Theme") }
        DropdownMenu(expanded = open, onDismissRequest = { open = false }) {
            availableThemes().forEach { name ->
                DropdownMenuItem(
                    text = { Text(name) },
                    onClick = {
                        open = false
                        onAction(StudioAction.UseTheme(name))
                    },
                )
            }
        }
    }
}

@Composable
private fun EditorPane(state: StudioState, onAction: (StudioAction) -> Unit, modifier: Modifier) {
    Column(modifier = modifier) {
        Text("landify.yaml", style = MaterialTheme.typography.titleSmall)
        OutlinedTextField(
            value = state.buffer,
            onValueChange = { onAction(StudioAction.BufferChanged(it)) },
            modifier = Modifier.fillMaxSize(),
            textStyle = MaterialTheme.typography.bodySmall.copy(fontFamily = FontFamily.Monospace),
        )
    }
}

@Composable
private fun OutputPane(state: StudioState, modifier: Modifier) {
    Column(modifier = modifier.verticalScroll(rememberScrollState())) {
        if (state.problems.isNotEmpty()) {
            Text("Problems", style = MaterialTheme.typography.titleSmall, color = MaterialTheme.colorScheme.error)
            state.problems.forEach { Text("• $it", style = MaterialTheme.typography.bodySmall) }
            HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
        }
        Text("index.html", style = MaterialTheme.typography.titleSmall)
        Text(
            text = state.output.ifEmpty { "press Build to render" },
            style = MaterialTheme.typography.bodySmall.copy(fontFamily = FontFamily.Monospace),
            modifier = Modifier.width(400.dp),
        )
    }
}
