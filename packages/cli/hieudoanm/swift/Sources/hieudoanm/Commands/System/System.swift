import Foundation
import ArgumentParser

struct System: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "system",
        abstract: "System monitoring tools",
        subcommands: [SystemMonitor.self]
    )

    mutating func run() {}
}

struct SystemMonitor: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "monitor", abstract: "System monitor")

    mutating func run() {
        print("System monitor TUI not available in Swift version.")
        print("Run the Go binary for the interactive system monitor experience.")
    }
}
