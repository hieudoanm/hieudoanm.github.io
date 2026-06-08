import Foundation
import ArgumentParser

struct StringCmd: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "string",
        abstract: "String transformation commands",
        subcommands: [
            Capitalise.self, Deburr.self, KebabCase.self,
            LowerCase.self, SnakeCase.self, UpperCase.self,
        ]
    )

    mutating func run() {}
}

struct Capitalise: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "capitalise", abstract: "Capitalise first letter of each word")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.capitalized) }
}

struct Deburr: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "deburr", abstract: "Remove diacritical marks")
    @Argument(help: "Text") var text: String
    mutating func run() {
        print(text.folding(options: .diacriticInsensitive, locale: nil))
    }
}

struct KebabCase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "kebabcase", abstract: "Convert to kebab-case")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.lowercased().replacingOccurrences(of: " ", with: "-")) }
}

struct LowerCase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "lowercase", abstract: "Convert to lowercase")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.lowercased()) }
}

struct SnakeCase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "snakecase", abstract: "Convert to snake_case")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.lowercased().replacingOccurrences(of: " ", with: "_")) }
}

struct UpperCase: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "uppercase", abstract: "Convert to UPPERCASE")
    @Argument(help: "Text") var text: String
    mutating func run() { print(text.uppercased()) }
}
