package io.github.hieudoanm.cli

import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.core.subcommands
import io.github.hieudoanm.cli.commands.*
fun main(args: Array<String>) = HieuDoanm().main(args)

class HieuDoanm : CliktCommand(
    name = "hieudoanm",
    help = "Hieu Doan's personal CLI toolbox"
) {
    init {
        subcommands(
            CalcCommand(),
            CasinoCommand(),
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
