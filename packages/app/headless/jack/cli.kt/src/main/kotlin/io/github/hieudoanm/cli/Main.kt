package io.github.hieudoanm.cli

import com.github.ajalt.clikt.completion.completionOption
import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import com.github.ajalt.clikt.core.Context
import com.github.ajalt.clikt.core.main
import io.github.hieudoanm.cli.commands.*
fun main(args: Array<String>) = Jack().main(args)

class Jack : CliktCommand(name = "jack") {
    override fun help(context: Context) = "Hieu Doan's personal CLI toolbox"
    init {
        completionOption()
        subcommands(
            CalcCommand(),
            CasinoCommand(),
            CompletionCommand(),
            ChessCommand(),
            ColorsCommand(),
            ConvertCommand(),
            CryptoCommand(),
            DataCommand(),
            DocsifyCommand(),
            DoiCommand(),
            EnglishCommand(),
            FileCommand(),
            GeminiCommand(),
            GhCommand(),
            HistoryCommand(),
            ImageCommand(),
            McpCommand(),
            NetCommand(),
            OpenapiCommand(),
            OpenrouterCommand(),
            PortCommand(),
            SearchCommand(),
            SemverCommand(),
            SystemCommand(),
            TelegramCommand(),
            TimeCommand(),
            VersionCommand(),
            WebCommand(),
        )
    }

    override fun run() = Unit
}
