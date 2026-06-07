import Foundation

struct HistoryEntry: Codable {
    let timestamp: String
    let source: String
    let command: String
    let cwd: String?
    let durationMs: Int64?
    let error: String?
}

struct CommandCount: Codable {
    let name: String
    let count: Int
}

struct HistoryStats: Codable {
    let totalCLI: Int
    let totalMCP: Int
    let topCommands: [CommandCount]
    let topErrors: [CommandCount]
}

enum HistoryError: Error {
    case noHomeDir
}

enum HistoryService {
    private static let lock = NSLock()

    private static func storagePath() throws -> URL {
        guard let home = FileManager.default.homeDirectoryForCurrentUser as URL? else {
            throw HistoryError.noHomeDir
        }
        let dir = home.appendingPathComponent(".hieudoanm")
        try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        return dir.appendingPathComponent("history.jsonl")
    }

    static func append(_ entry: HistoryEntry) {
        lock.lock()
        defer { lock.unlock() }
        guard let path = try? storagePath(),
              let data = (try? JSONEncoder().encode(entry)).flatMap({ String(data: $0, encoding: .utf8) })
        else { return }
        let line = data + "\n"
        if FileManager.default.fileExists(atPath: path.path) {
            if let handle = try? FileHandle(forWritingTo: path) {
                handle.seekToEndOfFile()
                handle.write(line.data(using: .utf8)!)
                handle.closeFile()
            }
        } else {
            try? line.write(to: path, atomically: true, encoding: .utf8)
        }
    }

    private static func readAll() -> [HistoryEntry] {
        guard let path = try? storagePath(),
              FileManager.default.fileExists(atPath: path.path),
              let content = try? String(contentsOf: path, encoding: .utf8)
        else { return [] }
        return content
            .components(separatedBy: "\n")
            .map { $0.trimmingCharacters(in: .whitespaces) }
            .filter { !$0.isEmpty }
            .compactMap { try? JSONDecoder().decode(HistoryEntry.self, from: $0.data(using: .utf8)!) }
    }

    static func list(_ count: Int) -> [HistoryEntry] {
        let entries = readAll()
        let n = count <= 0 || count > entries.count ? entries.count : count
        return Array(entries.suffix(n))
    }

    static func search(_ query: String, limit: Int) -> [HistoryEntry] {
        let entries = readAll()
        let q = query.lowercased()
        var results: [HistoryEntry] = []
        for e in entries.reversed() {
            if e.command.lowercased().contains(q) {
                results.append(e)
                if limit > 0 && results.count >= limit { break }
            }
        }
        return results
    }

    static func clear() {
        guard let path = try? storagePath() else { return }
        try? FileManager.default.removeItem(at: path)
    }

    static func computeStats() -> HistoryStats {
        let entries = readAll()
        var totalCLI = 0
        var totalMCP = 0
        var cmdCount: [String: Int] = [:]
        var errCount: [String: Int] = [:]

        for e in entries {
            if e.source == "cli" { totalCLI += 1 } else { totalMCP += 1 }
            cmdCount[e.command, default: 0] += 1
            if e.error != nil { errCount[e.command, default: 0] += 1 }
        }

        return HistoryStats(
            totalCLI: totalCLI,
            totalMCP: totalMCP,
            topCommands: topN(cmdCount, 10),
            topErrors: topN(errCount, 10)
        )
    }

    private static func topN(_ counts: [String: Int], _ n: Int) -> [CommandCount] {
        return counts
            .map { CommandCount(name: $0.key, count: $0.value) }
            .sorted { $0.count > $1.count }
            .prefix(n)
            .map { $0 }
    }
}
