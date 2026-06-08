import Foundation
import ArgumentParser

struct Status: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "status",
        abstract: "Display service status"
    )

    mutating func run() async throws {
        let data = try await requestsFetch(method: "GET", url: "https://status.hieudoanm.com")
        print(String(data: data, encoding: .utf8) ?? "No status data")
    }
}
