package io.github.hieudoanm.landify.tui

import io.github.hieudoanm.landify.config.dumpYaml
import io.github.hieudoanm.landify.config.loadYaml
import io.github.hieudoanm.landify.render.LandifyException
import io.github.hieudoanm.landify.render.buildFile
import io.github.hieudoanm.landify.render.placeholder
import io.github.hieudoanm.landify.themes.themeByName
import io.github.hieudoanm.landify.themes.themeNames
import io.github.hieudoanm.landify.validate.errors
import java.nio.file.Path
import kotlin.io.path.readText
import kotlin.io.path.writeText

/** The file every build command writes to. */
private val DEFAULT_OUTPUT: Path = Path.of("index.html")

/**
 * Runs a command against the editor's buffer and file.
 *
 * Every failure path is reported as a message plus a tone rather than thrown, so
 * the editor never dies on a typo in a config. Commands that change the buffer
 * return it in [Outcome.text]; commands that do not leave it empty.
 */
fun execute(state: EditorState, action: TuiAction): Outcome = when (action) {
    TuiAction.Save -> save(state)
    TuiAction.Reload -> reload(state)
    TuiAction.Validate -> validate(state)
    TuiAction.Build -> build(state)
    is TuiAction.Generate -> generate(action)
    is TuiAction.Theme -> applyTheme(state, action)
    TuiAction.Help -> Outcome(action, HELP_TEXT, Tone.INFO)
    TuiAction.Quit -> Outcome(action, "bye", Tone.INFO)
    TuiAction.Unknown -> Outcome(action, "unknown command — try help", Tone.ERROR)
}

private fun save(state: EditorState): Outcome = guarded(TuiAction.Save) {
    state.path.writeText(state.buffer)
    Outcome(TuiAction.Save, "saved ${state.path.fileName}", Tone.SUCCESS, state.buffer)
}

private fun reload(state: EditorState): Outcome = guarded(TuiAction.Reload) {
    val text = state.path.readText()
    Outcome(TuiAction.Reload, "reloaded ${state.path.fileName}", Tone.SUCCESS, text)
}

private fun validate(state: EditorState): Outcome = guarded(TuiAction.Validate) {
    val problems = errors(loadYaml(state.buffer))
    if (problems.isEmpty()) {
        Outcome(TuiAction.Validate, "valid", Tone.SUCCESS)
    } else {
        Outcome(TuiAction.Validate, problems.joinToString("; "), Tone.ERROR)
    }
}

private fun build(state: EditorState): Outcome = guarded(TuiAction.Build) {
    state.path.writeText(state.buffer)
    val result = buildFile(state.path, DEFAULT_OUTPUT)
    Outcome(TuiAction.Build, "built ${result.output}", Tone.SUCCESS, state.buffer)
}

private fun generate(action: TuiAction.Generate): Outcome = guarded(action) {
    Outcome(action, "generated ${action.type}", Tone.SUCCESS, placeholder(action.type))
}

private fun applyTheme(state: EditorState, action: TuiAction.Theme): Outcome {
    val theme = themeByName(action.name)
        ?: return Outcome(
            action,
            "unknown theme \"${action.name}\" (${themeNames().take(5).joinToString(", ")}, …)",
            Tone.ERROR,
        )
    return guarded(action) {
        val updated = loadYaml(state.buffer).copy(theme = theme)
        Outcome(action, "applied ${action.name}", Tone.SUCCESS, dumpYaml(updated))
    }
}

/** Runs [block], converting any throw into a red [Outcome] for [action]. */
private inline fun guarded(action: TuiAction, block: () -> Outcome): Outcome =
    runCatching(block).getOrElse { error ->
        Outcome(action, error.describe(), Tone.ERROR)
    }

/** The user-facing text for a failure, unwrapping the domain's own messages. */
private fun Throwable.describe(): String = when (this) {
    is LandifyException -> message ?: "invalid configuration"
    else -> message ?: this::class.simpleName ?: "unexpected error"
}
