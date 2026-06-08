import Foundation
import ArgumentParser

struct Doi: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "doi",
        abstract: "DOI citation commands",
        subcommands: [DoiCite.self, DoiRef.self]
    )

    mutating func run() {}
}

struct DoiCite: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cite", abstract: "Generate APA in-text citation from DOI")
    @Argument(help: "DOI identifier") var doi: String
    mutating func run() async throws { try await printAPACitation(doi: doi) }
}

struct DoiRef: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "ref", abstract: "Generate APA full reference from DOI")
    @Argument(help: "DOI identifier") var doi: String
    mutating func run() async throws { try await printAPARef(doi: doi) }
}
