import Foundation
import ArgumentParser

struct Tax: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "tax",
        abstract: "Vietnamese PIT tax calculator"
    )

    mutating func run() {
        print("Tax calculator TUI not available in Swift version.")
        print("Run the Go binary for the interactive tax calculator experience.")
    }
}
