import Foundation
import ArgumentParser

struct VersionCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "version",
        abstract: "Display version information"
    )

    @Flag(name: .shortAndLong, help: "JSON output")
    var json = false

    mutating func run() {
        let info: [String: String] = [
            "version": "0.1.0",
            "buildDate": buildDate(),
            "commitHash": commitHash(),
        ]
        if json {
            if let data = try? JSONSerialization.data(withJSONObject: info, options: .prettyPrinted),
               let str = String(data: data, encoding: .utf8) {
                print(str)
            }
        } else {
            print("hieudoanm version \(info["version"] ?? "?")")
            print("build date: \(info["buildDate"] ?? "?")")
            print("commit: \(info["commitHash"] ?? "?")")
        }
    }
}

private func buildDate() -> String {
    if let date = Bundle.main.object(forInfoDictionaryKey: "BuildDate") as? String {
        return date
    }
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
    return formatter.string(from: Date())
}

private func commitHash() -> String {
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/usr/bin/git")
    process.arguments = ["rev-parse", "--short", "HEAD"]
    let pipe = Pipe()
    process.standardOutput = pipe
    process.standardError = Pipe()
    do {
        try process.run()
        process.waitUntilExit()
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        let hash = String(data: data, encoding: .utf8)?.trimmingCharacters(in: .whitespacesAndNewlines) ?? "unknown"
        return hash.isEmpty ? "unknown" : hash
    } catch {
        return "unknown"
    }
}
