import Foundation
import ArgumentParser

struct HistoryCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "history",
        abstract: "Command execution history",
        subcommands: [
            HistoryList.self,
            HistorySearch.self,
            HistoryClear.self,
            HistoryStatsCmd.self,
        ]
    )
}

struct HistoryList: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "list", abstract: "List recent history entries")

    @Option(name: .shortAndLong, help: "Max entries to show")
    var limit: Int = 20

    mutating func run() {
        let entries = HistoryService.list(limit)
        if entries.isEmpty {
            print("no history entries")
            return
        }
        for e in entries {
            var line = "\(e.timestamp)  \(e.command)"
            if let err = e.error {
                line += "  [\(err)]"
            }
            print(line)
        }
    }
}

struct HistorySearch: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "search", abstract: "Search history entries")

    @Argument(help: "Search query")
    var query: String

    @Option(name: .shortAndLong, help: "Max entries to show")
    var limit: Int = 20

    mutating func run() {
        let entries = HistoryService.search(query, limit: limit)
        if entries.isEmpty {
            print("no matching entries")
            return
        }
        for e in entries {
            var line = "\(e.timestamp)  \(e.command)"
            if let err = e.error {
                line += "  [\(err)]"
            }
            print(line)
        }
    }
}

struct HistoryClear: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "clear", abstract: "Clear all history")

    mutating func run() {
        HistoryService.clear()
        print("history cleared")
    }
}

struct HistoryStatsCmd: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "stats", abstract: "Show history statistics")

    mutating func run() {
        let stats = HistoryService.computeStats()
        print("CLI commands:   \(stats.totalCLI)")
        print("MCP tool calls: \(stats.totalMCP)")
        print()
        if !stats.topCommands.isEmpty {
            print("Top commands:")
            for cc in stats.topCommands {
                print(String(format: "  %5d  %@", cc.count, cc.name))
            }
        }
        if !stats.topErrors.isEmpty {
            print()
            print("Top errors:")
            for cc in stats.topErrors {
                print(String(format: "  %5d  %@", cc.count, cc.name))
            }
        }
    }
}
