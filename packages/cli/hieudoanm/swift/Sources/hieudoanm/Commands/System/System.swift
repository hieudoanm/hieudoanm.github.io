import Foundation
import ArgumentParser

struct SystemCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "system",
        abstract: "System utilities",
        subcommands: [
            SystemMonitor.self,
            SystemClipboard.self,
            SystemInfo.self,
            SystemEnv.self,
            SystemPath.self,
            SystemDisk.self,
            SystemBattery.self,
        ]
    )
}

struct SystemMonitor: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "monitor", abstract: "Show CPU, RAM, uptime, processes")

    mutating func run() {
        let cpu = shell("sysctl -n hw.ncpu") ?? "?"
        let cpuBrand = shell("sysctl -n machdep.cpu.brand_string") ?? "?"
        let uptimeStr = shell("uptime") ?? "?"
        let memStats = shell("vm_stat") ?? "?"
        let processes = (try? String(contentsOfFile: "/proc/uptime")) ?? shell("ps -eo pid,comm,%cpu,%mem --sort=-%cpu | head -20") ?? "?"

        print("CPU: \(cpuBrand) (\(cpu) cores)")
        print("Uptime: \(uptimeStr.trimmingCharacters(in: .whitespacesAndNewlines))")
        print("\n--- Memory ---")
        for line in memStats.components(separatedBy: "\n").prefix(10) {
            print(line)
        }
        print("\n--- Top Processes ---")
        let ps = shell("ps -eo pid,comm,%cpu,%mem -r | head -20") ?? "N/A"
        print(ps)
    }
}

struct SystemClipboard: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "clipboard", abstract: "Watch macOS clipboard and store to SQLite")

    @Option(name: .long, help: "Watch interval in seconds")
    var interval: Double = 2

    mutating func run() {
        let dbPath = FileManager.default.homeDirectoryForCurrentUser.appendingPathComponent(".hieudoanm/hieudoanm.db").path
        let dir = (dbPath as NSString).deletingLastPathComponent
        try? FileManager.default.createDirectory(atPath: dir, withIntermediateDirectories: true)

        var lastContent = ""
        print("Watching clipboard... (interval: \(interval)s)")
        while true {
            if let content = shell("pbpaste") {
                let trimmed = content.trimmingCharacters(in: .whitespacesAndNewlines)
                if !trimmed.isEmpty && trimmed != lastContent {
                    lastContent = trimmed
                    let escaped = trimmed.replacingOccurrences(of: "'", with: "''")
                    let sql = "INSERT INTO clipboard (content) VALUES ('\(escaped)');"
                    _ = shell("sqlite3 \"\(dbPath)\" \"CREATE TABLE IF NOT EXISTS clipboard (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);\"")
                    _ = shell("sqlite3 \"\(dbPath)\" \"\(sql)\"")
                    print("[\(Date())] Copied: \(trimmed.prefix(80))")
                }
            }
            Thread.sleep(forTimeInterval: interval)
        }
    }
}

struct SystemInfo: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "info", abstract: "Show system information")

    mutating func run() {
        let os = shell("sw_vers -productName") ?? "?"
        let osVer = shell("sw_vers -productVersion") ?? "?"
        let kernel = shell("uname -r") ?? "?"
        let hostname = shell("hostname") ?? "?"
        let uptime = shell("uptime") ?? "?"

        print("OS: \(os) \(osVer)")
        print("Kernel: \(kernel)")
        print("Hostname: \(hostname.trimmingCharacters(in: .whitespacesAndNewlines))")
        print("Uptime: \(uptime.trimmingCharacters(in: .whitespacesAndNewlines))")
    }
}

struct SystemEnv: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "env", abstract: "Show environment variables")

    @Option(name: .shortAndLong, help: "Filter by name prefix")
    var filter: String?

    mutating func run() {
        let env = ProcessInfo.processInfo.environment
        let sorted = env.keys.sorted()
        for key in sorted {
            if let f = filter, !key.hasPrefix(f) { continue }
            print("\(key)=\(env[key] ?? "")")
        }
    }
}

struct SystemPath: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "path", abstract: "Show PATH entries")

    @Flag(name: .long, help: "Show numbered list")
    var numbered = false

    mutating func run() {
        let paths = ProcessInfo.processInfo.environment["PATH"]?.components(separatedBy: ":") ?? []
        for (i, p) in paths.enumerated() {
            if numbered {
                print("\(i + 1). \(p)")
            } else {
                print(p)
            }
        }
    }
}

struct SystemDisk: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "disk", abstract: "Show disk usage")

    mutating func run() {
        let df = shell("df -h") ?? "N/A"
        print(df)
    }
}

struct SystemBattery: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "battery", abstract: "Show battery status")

    mutating func run() {
        let batt = shell("pmset -g batt") ?? "N/A"
        print(batt)
    }
}

private func shell(_ cmd: String) -> String? {
    let process = Process()
    process.executableURL = URL(fileURLWithPath: "/bin/zsh")
    process.arguments = ["-c", cmd]
    let pipe = Pipe()
    process.standardOutput = pipe
    process.standardError = pipe
    do {
        try process.run()
        process.waitUntilExit()
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        return String(data: data, encoding: .utf8)
    } catch {
        return nil
    }
}
