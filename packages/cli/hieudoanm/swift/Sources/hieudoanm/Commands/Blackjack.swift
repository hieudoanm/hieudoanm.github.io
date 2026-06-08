import Foundation
import ArgumentParser

struct Blackjack: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "blackjack",
        abstract: "Card counting practice"
    )

    mutating func run() {
        print("Blackjack TUI not available in Swift version.")
        print("Run the Go binary for the interactive card counting experience.")
    }
}
