import Foundation
import ArgumentParser

@main
struct Hieudoanm: AsyncParsableCommand {
    static var globalDebug = false

    static let configuration = CommandConfiguration(
        commandName: "hieudoanm",
        version: "\(Version.number) (\(Version.commit), \(Version.date))",
        subcommands: [
            Blackjack.self, Braille.self, Chess.self, Clipboard.self,
            Clock.self, Colors.self, Docsify.self, Doi.self,
            English.self, Frankfurter.self, Instagram.self, IP.self,
            Morse.self, OpenAPI.self, OpenRouter.self, QRCode.self,
            Shopify.self, Snapshot.self, Status.self, StringCmd.self,
            System.self, Tax.self, Telegram.self, UUID.self,
            VersionCmd.self, WiFi.self, YouTube.self,
        ]
    )

    @Flag(name: .long, help: "Enable debug mode")
    var debug = false

    mutating func run() async throws {
        Self.globalDebug = debug
    }
}

enum Version {
    static let number = BuildInfo.fullVersion
    static let commit = BuildInfo.gitCommit
    static let date = BuildInfo.buildDate
}

struct VersionCmd: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "version", abstract: "Display version")
    mutating func run() { print("hieudoanm version \(Version.number) (\(Version.commit), \(Version.date))") }
}
