package io.github.hieudoanm.landify.studio

import io.github.hieudoanm.landify.config.dumpYaml
import io.github.hieudoanm.landify.config.loadYaml
import io.github.hieudoanm.landify.render.buildFile
import io.github.hieudoanm.landify.render.placeholder
import io.github.hieudoanm.landify.themes.themeByName
import io.github.hieudoanm.landify.themes.themeNames
import io.github.hieudoanm.landify.validate.errors
import java.nio.file.Path
import kotlin.io.path.readText
import kotlin.io.path.writeText

/** Everything the studio window renders from. Immutable, so Compose diffs it. */
data class StudioState(
    val path: Path,
    val buffer: String,
    val saved: String,
    val problems: List<String> = emptyList(),
    val output: String = "",
    val message: String = "ready",
    val failed: Boolean = false,
) {
    val dirty: Boolean get() = buffer != saved
}

/** An edit in the YAML pane. */
fun StudioState.edited(text: String): StudioState =
    copy(buffer = text, message = "unsaved changes", failed = false)

/**
 * Runs a studio action and returns the next state.
 *
 * Every action is total: a malformed buffer produces problems in the panel
 * rather than an exception, so the window never closes on a typo.
 */
fun reduce(state: StudioState, action: StudioAction): StudioState = when (action) {
    is StudioAction.Generate -> replaceBuffer(
        state = state,
        name = action.type,
        produce = { type -> placeholder(type) },
        describe = { "loaded the $it scaffold" },
    )

    is StudioAction.UseTheme -> replaceBuffer(
        state = state,
        name = action.name,
        produce = { name -> dumpYaml(loadYaml(state.buffer).copy(theme = themeByName(name)!!)) },
        describe = { "applied the $it preset" },
    )

    StudioAction.Save -> save(state)
    StudioAction.Validate -> validate(state)
    StudioAction.Build -> build(state)
    StudioAction.Reload -> reload(state)
    is StudioAction.BufferChanged -> state.edited(action.text)
}

/** A studio toolbar or menu action. */
sealed interface StudioAction {
    data class BufferChanged(val text: String) : StudioAction
    data object Save : StudioAction
    data object Validate : StudioAction
    data object Build : StudioAction
    data object Reload : StudioAction
    data class Generate(val type: String) : StudioAction
    data class UseTheme(val name: String) : StudioAction
}

private fun save(state: StudioState): StudioState = attempt(state, "saved") {
    state.path.writeText(state.buffer)
    state.copy(saved = state.buffer)
}

private fun reload(state: StudioState): StudioState = attempt(state, "reloaded") {
    val text = state.path.readText()
    state.copy(buffer = text, saved = text, problems = emptyList())
}

private fun validate(state: StudioState): StudioState = attempt(state, "validated") {
    val found = errors(loadYaml(state.buffer))
    state.copy(
        problems = found,
        message = if (found.isEmpty()) "valid" else "${found.size} problem(s)",
        failed = found.isNotEmpty(),
    )
}

private fun build(state: StudioState): StudioState = attempt(state, "built") {
    state.path.writeText(state.buffer)
    val result = buildFile(state.path, Path.of("index.html"))
    state.copy(
        problems = emptyList(),
        output = result.html,
        saved = state.buffer,
        message = "wrote ${result.output} (${result.html.length} bytes)",
    )
}

/** Swaps the buffer for freshly generated YAML, reporting failures in place. */
private fun replaceBuffer(
    state: StudioState,
    name: String,
    produce: (String) -> String,
    describe: (String) -> String,
): StudioState = attempt(state, describe(name)) {
    state.copy(buffer = produce(name), problems = emptyList())
}

private fun attempt(state: StudioState, success: String, block: () -> StudioState): StudioState =
    runCatching(block).getOrElse { failure ->
        state.copy(message = failure.message ?: "unexpected error", failed = true)
    }

/** The starting state, scaffolding a blank product page when no file exists. */
fun initialState(path: Path): StudioState {
    val text = runCatching { path.readText() }
        .getOrElse { runCatching { placeholder("product") }.getOrElse { "" } }
    return StudioState(path = path, buffer = text, saved = text)
}

/** Exposed so the window can offer the preset list without importing themes. */
fun availableThemes(): List<String> = themeNames()
