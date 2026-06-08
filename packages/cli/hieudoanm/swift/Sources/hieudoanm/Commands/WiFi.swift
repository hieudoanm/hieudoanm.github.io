import Foundation
import ArgumentParser

struct WiFi: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "wifi",
        abstract: "Scan WiFi networks"
    )

    mutating func run() {
        #if os(macOS)
        let task = Process()
        task.executableURL = URL(fileURLWithPath: "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport")
        task.arguments = ["-s"]

        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = Pipe()

        do {
            try task.run()
            task.waitUntilExit()
            let data = pipe.fileHandleForReading.readDataToEndOfFile()
            print(String(data: data, encoding: .utf8) ?? "No networks found")
        } catch {
            print("Error scanning WiFi: \(error)")
        }
        #else
        print("WiFi scanning not supported on this platform")
        #endif
    }
}
