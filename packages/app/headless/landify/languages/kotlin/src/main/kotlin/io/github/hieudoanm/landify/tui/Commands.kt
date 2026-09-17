package io.github.hieudoanm.landify.tui

/** The outcome of running a command: what it did, and what to show the user. */
data class Outcome(
    val action: TuiAction,
    val message: String,
    val tone: Tone = Tone.INFO,
    val text: String = "",
)

/** A command the `:` line can run. */
sealed interface TuiAction {
    data object Save : TuiAction
    data object Reload : TuiAction
    data object Validate : TuiAction
    data object Build : TuiAction
    data class Generate(val type: String) : TuiAction
    data class Theme(val name: String) : TuiAction
    data object Help : TuiAction
    data object Quit : TuiAction
    data object Unknown : TuiAction
}

/** The one-line reminder shown by the `help` command. */
const val HELP_TEXT: String =
    "save · reload · validate · build · generate <type> · theme <name> · help · quit"

/**
 * Parses a `:` command line.
 *
 * Matching is case-insensitive and whitespace-separated, so `Build` and `build`
 * are the same command. An unrecognised command parses to [TuiAction.Unknown],
 * which the caller reports rather than treating as a valid action.
 */
fun parseCommand(input: String): TuiAction {
    val parts = input.trim().split(WHITESPACE).filter { it.isNotEmpty() }
    val name = parts.firstOrNull()?.lowercase() ?: return TuiAction.Unknown
    val argument = parts.getOrNull(1)
    return when (name) {
        "save", "w" -> TuiAction.Save
        "reload", "e" -> TuiAction.Reload
        "validate", "check" -> TuiAction.Validate
        "build" -> TuiAction.Build
        "help", "h" -> TuiAction.Help
        "quit", "q" -> TuiAction.Quit
        "generate", "new" -> withArgument(argument) { TuiAction.Generate(it) }
        "theme" -> withArgument(argument) { TuiAction.Theme(it) }
        else -> TuiAction.Unknown
    }
}

/** Wraps [argument] in an action, or rejects the command when it is missing. */
private inline fun withArgument(argument: String?, build: (String) -> TuiAction): TuiAction =
    if (argument == null) TuiAction.Unknown else build(argument)

private val WHITESPACE = Regex("\\s+")
