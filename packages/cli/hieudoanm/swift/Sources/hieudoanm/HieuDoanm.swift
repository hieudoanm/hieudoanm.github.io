import ArgumentParser

@main
struct HieuDoanm: AsyncParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "hieudoanm",
        abstract: "Hieu Doan's personal CLI toolbox",
        version: "0.1.0",
        subcommands: [
            CalcCommand.self,
            CasinoCommand.self,
            ChessCommand.self,
            ColorsCommand.self,
            ConvertCommand.self,
            CryptoCommand.self,
            DataCommand.self,
            DocsifyCommand.self,
            DoiCommand.self,
            EnglishCommand.self,
            FileCommand.self,
            GeminiCommand.self,
            GhCommand.self,
            HistoryCommand.self,
            ImageCommand.self,
            McpCommand.self,
            NetCommand.self,
            OpenapiCommand.self,
            OpenrouterCommand.self,
            PortCommand.self,
            SearchCommand.self,
            SemverCommand.self,
            SystemCommand.self,
            TelegramCommand.self,
            TimeCommand.self,
            VersionCommand.self,
            WebCommand.self,
        ],
        defaultSubcommand: nil
    )
}
