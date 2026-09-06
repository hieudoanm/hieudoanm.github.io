import Foundation
import ArgumentParser

struct TimeCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "time",
        abstract: "Time tools",
        subcommands: [
            TimeClock.self,
            TimeCron.self,
            TimeEpoch.self,
            TimePomodoro.self,
            TimeTimer.self,
            TimeUntil.self,
            TimeWorld.self,
            TimeAge.self,
            TimeStopwatch.self,
        ]
    )
}

struct TimeClock: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "clock",
        abstract: "Clock commands",
        subcommands: [TimeClockNow.self]
    )
}

struct TimeClockNow: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "now", abstract: "Display current date/time")

    @Option(name: .shortAndLong, help: "Output format (e.g., yyyy-MM-dd HH:mm:ss)")
    var format: String?

    @Option(name: .long, help: "Time zone (e.g., America/New_York)")
    var timezone: String?

    mutating func run() {
        var calendar = Calendar.current
        if let tz = timezone, let tzObj = TimeZone(identifier: tz) {
            calendar.timeZone = tzObj
        }
        let fmt = format ?? "yyyy-MM-dd HH:mm:ss"
        let formatter = DateFormatter()
        formatter.dateFormat = fmt
        formatter.timeZone = calendar.timeZone
        print(formatter.string(from: Date()))
    }
}

struct TimeCron: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cron", abstract: "Describe cron expression and show next execution times")

    @Argument(help: "Cron expression (e.g., '*/5 * * * *')")
    var expression: String

    @Option(name: .shortAndLong, help: "Number of next times to show")
    var count: Int = 5

    mutating func run() {
        let parts = expression.split(separator: " ", maxSplits: 4).map(String.init)
        guard parts.count == 5 else {
            print("Invalid cron expression. Use: minute hour day month weekday")
            return
        }
        let labels = ["minute", "hour", "day", "month", "weekday"]
        print("Cron: \(expression)")
        for (i, part) in parts.enumerated() {
            print("  \(labels[i]): \(part)")
        }
        print("\nNext \(count) execution times:")
        var date = Date()
        var found = 0
        let cal = Calendar.current
        while found < count {
            date = cal.date(byAdding: .minute, value: 1, to: date) ?? date.addingTimeInterval(60)
            if cronMatches(parts, date: date) {
                let formatter = DateFormatter()
                formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
                print("  \(formatter.string(from: date))")
                found += 1
            }
        }
    }
}

func cronMatches(_ parts: [String], date: Date) -> Bool {
    let cal = Calendar.current
    let minute = cal.component(.minute, from: date)
    let hour = cal.component(.hour, from: date)
    let day = cal.component(.day, from: date)
    let month = cal.component(.month, from: date)
    let weekday = cal.component(.weekday, from: date)
    let values = [minute, hour, day, month, weekday]
    for (i, part) in parts.enumerated() {
        if part == "*" { continue }
        if part.hasPrefix("*/") {
            let interval = Int(part.dropFirst(2)) ?? 1
            if values[i] % interval != 0 { return false }
        } else if part.contains(",") {
            let set = Set(part.split(separator: ",").compactMap { Int($0) })
            if !set.contains(values[i]) { return false }
        } else if part.contains("-") {
            let range = part.split(separator: "-").compactMap { Int($0) }
            if range.count == 2, values[i] < range[0] || values[i] > range[1] { return false }
        } else if let v = Int(part) {
            if values[i] != v { return false }
        }
    }
    return true
}

struct TimeEpoch: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "epoch", abstract: "Convert epoch timestamp to human-readable, or current time to epoch")

    @Argument(help: "Epoch timestamp (omit for current time)")
    var timestamp: Int?

    @Flag(name: .long, help: "Output in milliseconds")
    var milliseconds = false

    mutating func run() {
        if let ts = timestamp {
            let interval = TimeInterval(milliseconds ? ts / 1000 : ts)
            let date = Date(timeIntervalSince1970: interval)
            let formatter = DateFormatter()
            formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
            formatter.timeZone = TimeZone.current
            print(formatter.string(from: date))
        } else {
            let now = Date().timeIntervalSince1970
            if milliseconds {
                print("\(Int(now * 1000))")
            } else {
                print("\(Int(now))")
            }
        }
    }
}

struct TimePomodoro: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "pomodoro", abstract: "25-minute focus timer with cycles")

    @Option(name: .shortAndLong, help: "Focus duration in minutes")
    var focus: Int = 25

    @Option(name: .shortAndLong, help: "Break duration in minutes")
    var breakDuration: Int = 5

    @Option(name: .long, help: "Number of cycles")
    var cycles: Int = 4

    mutating func run() {
        for cycle in 1...cycles {
            print("Cycle \(cycle)/\(cycles): Focus for \(focus) minutes")
            countdown(seconds: focus * 60)
            if cycle < cycles {
                print("Break for \(breakDuration) minutes")
                countdown(seconds: breakDuration * 60)
            }
        }
        print("Pomodoro complete!")
    }
}

private func countdown(seconds: Int) {
    for remaining in stride(from: seconds, through: 0, by: -1) {
        let mins = remaining / 60
        let secs = remaining % 60
        print("\r\(String(format: "%02d:%02d", mins, secs)) remaining...", terminator: "")
        fflush(stdout)
        Thread.sleep(forTimeInterval: 1)
    }
    print("\rDone!              ")
}

struct TimeTimer: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "timer", abstract: "Countdown timer")

    @Argument(help: "Duration (e.g., 90s, 5m, 1h)")
    var duration: String

    mutating func run() {
        let total = parseDuration(duration)
        countdown(seconds: total)
        print("Timer finished!")
        _ = shell("say -v Karen 'Timer finished'")
    }
}

func parseDuration(_ s: String) -> Int {
    let s = s.lowercased()
    if s.hasSuffix("h") { return (Int(s.dropLast()) ?? 0) * 3600 }
    if s.hasSuffix("m") { return (Int(s.dropLast()) ?? 0) * 60 }
    if s.hasSuffix("s") { return Int(s.dropLast()) ?? 0 }
    return Int(s) ?? 0
}

struct TimeUntil: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "until", abstract: "Time until a given date/time")

    @Argument(help: "Target date/time (e.g., '2025-12-25 09:00:00')")
    var target: String

    @Option(name: .shortAndLong, help: "Input format (default: yyyy-MM-dd HH:mm:ss)")
    var format: String = "yyyy-MM-dd HH:mm:ss"

    mutating func run() {
        let formatter = DateFormatter()
        formatter.dateFormat = format
        guard let targetDate = formatter.date(from: target) else {
            print("Invalid date format. Use format: \(format)")
            return
        }
        let interval = targetDate.timeIntervalSince(Date())
        if interval < 0 {
            print("Target date is in the past")
            return
        }
        let days = Int(interval) / 86400
        let hours = (Int(interval) % 86400) / 3600
        let minutes = (Int(interval) % 3600) / 60
        let seconds = Int(interval) % 60
        print("\(days) days, \(hours) hours, \(minutes) minutes, \(seconds) seconds")
    }
}

struct TimeWorld: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "world", abstract: "Show time in multiple timezones")

    @Option(name: .shortAndLong, help: "Custom timezone (e.g., Asia/Ho_Chi_Minh)")
    var timezone: [String] = []

    mutating func run() {
        let defaultZones = [
            "America/New_York",
            "Europe/London",
            "Europe/Berlin",
            "Asia/Tokyo",
            "Asia/Shanghai",
            "Asia/Ho_Chi_Minh",
            "Australia/Sydney",
            "Pacific/Auckland",
        ]
        let zones = timezone.isEmpty ? defaultZones : timezone
        let now = Date()
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        for tz in zones {
            guard let tzObj = TimeZone(identifier: tz) else {
                print("  \(tz): invalid timezone")
                continue
            }
            formatter.timeZone = tzObj
            print("  \(tz): \(formatter.string(from: now))")
        }
    }
}

struct TimeAge: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "age", abstract: "Calculate age from birthdate")

    @Argument(help: "Birthdate (e.g., 1990-01-15)")
    var birthdate: String

    mutating func run() {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        guard let birth = formatter.date(from: birthdate) else {
            print("Invalid date. Use yyyy-MM-dd format")
            return
        }
        let now = Date()
        let cal = Calendar.current
        let years = cal.dateComponents([.year], from: birth, to: now).year ?? 0
        let months = cal.dateComponents([.month], from: birth, to: now).month ?? 0
        let days = cal.dateComponents([.day], from: birth, to: now).day ?? 0
        print("Age: \(years) years, \(months % 12) months, \(days % 30) days")
    }
}

struct TimeStopwatch: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "stopwatch", abstract: "Simple stopwatch")

    mutating func run() {
        print("Stopwatch started. Press Ctrl+C to stop.")
        let start = Date()
        var last = start
        while true {
            let now = Date()
            let elapsed = now.timeIntervalSince(start)
            let interval = now.timeIntervalSince(last)
            let mins = Int(elapsed) / 60
            let secs = Int(elapsed) % 60
            let ms = Int(elapsed * 100) % 100
            print("\r\(String(format: "%02d:%02d.%02d", mins, secs, ms)) (+\(String(format: "%.1f", interval))s)", terminator: "")
            fflush(stdout)
            last = now
            Thread.sleep(forTimeInterval: 0.1)
        }
    }
}

private func shell(_ cmd: String) -> String? {
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/bin/zsh")
    process.arguments = ["-c", cmd]
    let pipe = Pipe()
    process.standardOutput = pipe
    do {
        try process.run()
        process.waitUntilExit()
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        return String(data: data, encoding: .utf8)
    } catch {
        return nil
    }
}
