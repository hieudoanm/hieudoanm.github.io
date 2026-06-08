import Foundation
import ArgumentParser

struct Clock: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "clock",
        abstract: "Clock commands",
        subcommands: [ClockNow.self, ClockPomodoro.self]
    )

    mutating func run() {}
}

struct ClockNow: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "now", abstract: "Display current time")

    @Option(name: .long, help: "Time zone (e.g., Asia/Ho_Chi_Minh)")
    var timezone: String?

    @Option(name: .long, help: "Output format")
    var format: String?

    @Flag(name: .long, help: "Unix timestamp")
    var unix = false

    mutating func run() {
        var calendar = Calendar.current
        if let tz = timezone, let timeZone = TimeZone(identifier: tz) {
            calendar.timeZone = timeZone
        }

        let now = Date()

        if unix {
            print("\(Int(now.timeIntervalSince1970))")
            return
        }

        let fmt = format ?? "yyyy-MM-dd HH:mm:ss"
        let formatter = DateFormatter()
        formatter.dateFormat = fmt
        formatter.timeZone = calendar.timeZone

        print(formatter.string(from: now))
    }
}

struct ClockPomodoro: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "pomodoro", abstract: "Pomodoro timer")

    mutating func run() {
        print("Pomodoro timer TUI not available in Swift version.")
        print("Run the Go binary for the interactive pomodoro experience.")
    }
}
