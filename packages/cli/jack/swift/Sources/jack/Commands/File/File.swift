import Foundation
import ArgumentParser
import CryptoKit
import UniformTypeIdentifiers

struct FileCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "file",
        abstract: "File operations",
        subcommands: [
            FileChecksum.self, FileChmod.self, FileCount.self,
            FileDuplicates.self, FileEdit.self, FileGrep.self,
            FileHead.self, FileRead.self, FileSize.self,
            FileStats.self, FileTail.self, FileType.self, FileWrite.self,
        ]
    )

    mutating func run() {}
}

// MARK: - Read

struct FileRead: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "read", abstract: "Read file with line numbers")

    @Argument(help: "File path")
    var path: String

    @Option(name: .shortAndLong, help: "Start at line")
    var start: Int?

    @Option(name: .shortAndLong, help: "End at line")
    var end: Int?

    @Option(name: .long, help: "Show first N lines")
    var head: Int?

    @Option(name: .long, help: "Show last N lines")
    var tail: Int?

    @Flag(name: .long, help: "Show line numbers")
    var numbers = false

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() async throws {
        let url = URL(fileURLWithPath: path)
        let content = try String(contentsOf: url, encoding: .utf8)
        var lines = content.components(separatedBy: .newlines)

        if let head = head, head < lines.count { lines = Array(lines.prefix(head)) }
        if let tail = tail, tail < lines.count { lines = Array(lines.suffix(tail)) }
        if let start = start, start > 0 {
            let s = max(0, start - 1)
            if let end = end { lines = Array(lines[s..<min(end, lines.count)]) }
            else { lines = Array(lines[s...]) }
        }

        if json {
            let output: [String: Any] = [
                "file": path,
                "total": lines.count,
                "lines": lines,
            ]
            let data = try JSONSerialization.data(withJSONObject: output, options: .prettyPrinted)
            print(String(data: data, encoding: .utf8) ?? "{}")
        } else {
            for (i, line) in lines.enumerated() {
                if numbers {
                    let lineNum = (start ?? 1) + i
                    print("\(String(format: "%4d", lineNum))  \(line)")
                } else {
                    print(line)
                }
            }
        }
    }
}

// MARK: - Write

struct FileWrite: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "write", abstract: "Write or append to file")

    @Argument(help: "File path")
    var path: String

    @Option(name: .shortAndLong, help: "Content to write (omit to read from stdin)")
    var content: String?

    @Flag(name: .shortAndLong, help: "Append instead of overwrite")
    var append = false

    @Option(name: .long, help: "File mode (e.g. 644)")
    var mode: String?

    mutating func run() async throws {
        var text: String
        if let content = content {
            text = content
        } else {
            text = ""
            while let line = readLine(strippingNewline: false) {
                text += line
            }
        }

        let url = URL(fileURLWithPath: path)
        if append {
            let handle = try FileHandle(forWritingTo: url)
            handle.seekToEndOfFile()
            if let data = text.data(using: .utf8) { handle.write(data) }
            handle.closeFile()
        } else {
            try text.write(to: url, atomically: true, encoding: .utf8)
        }

        if let mode = mode {
            let fm = FileManager.default
            var attrs = try fm.attributesOfItem(atPath: path)
            if let perm = Int(mode, radix: 8) {
                attrs[.posixPermissions] = perm
                try fm.setAttributes(attrs, ofItemAtPath: path)
            }
        }

        let size = try FileManager.default.attributesOfItem(atPath: path)[.size] as? UInt64 ?? 0
        print("Wrote \(NumberFormat.formatBytes(size)) to \(path)")
    }
}

// MARK: - Edit

struct FileEdit: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "edit", abstract: "Find and replace with regex")

    @Argument(help: "File path")
    var path: String

    @Option(name: .shortAndLong, help: "Search pattern (regex)")
    var pattern: String

    @Option(name: .shortAndLong, help: "Replacement text")
    var replacement: String = ""

    @Flag(name: .long, help: "Preview changes without modifying")
    var preview = false

    @Flag(name: .shortAndLong, help: "Case insensitive")
    var ignoreCase = false

    mutating func run() throws {
        let url = URL(fileURLWithPath: path)
        let content = try String(contentsOf: url, encoding: .utf8)

        let options: NSRegularExpression.Options = ignoreCase ? .caseInsensitive : []
        let regex = try NSRegularExpression(pattern: pattern, options: options)
        let range = NSRange(content.startIndex..<content.endIndex, in: content)
        let modified = regex.stringByReplacingMatches(in: content, range: range, withTemplate: replacement)

        if preview {
            let originalLines = content.components(separatedBy: .newlines)
            let newLines = modified.components(separatedBy: .newlines)
            for (i, (old, new)) in zip(originalLines, newLines).enumerated() where old != new {
                print(gray("L\(i + 1):"))
                print(red("- \(old)"))
                print(green("+ \(new)"))
                print()
            }
            if originalLines == newLines { print("No changes") }
        } else {
            try modified.write(to: url, atomically: true, encoding: .utf8)
            print("Updated \(path)")
        }
    }
}

// MARK: - Grep

struct FileGrep: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "grep", abstract: "Recursive regex search in files")

    @Argument(help: "Search pattern (regex)")
    var pattern: String

    @Argument(help: "Directory to search")
    var directory: String = "."

    @Option(name: .shortAndLong, help: "Context lines")
    var context: Int = 0

    @Option(name: .long, help: "Include file pattern (glob)")
    var include: String?

    @Option(name: .long, help: "Exclude file pattern (glob)")
    var exclude: String?

    @Flag(name: .long, help: "JSON output")
    var json = false

    @Flag(name: .shortAndLong, help: "Case insensitive")
    var ignoreCase = false

    mutating func run() throws {
        let regexOptions: NSRegularExpression.Options = ignoreCase ? .caseInsensitive : []
        let regex = try NSRegularExpression(pattern: pattern, options: regexOptions)
        let fm = FileManager.default
        let baseURL = URL(fileURLWithPath: directory)
        var results: [[String: Any]] = []

        guard let enumerator = fm.enumerator(at: baseURL, includingPropertiesForKeys: [.isRegularFileKey]) else {
            print("Invalid directory: \(directory)")
            return
        }

        for case let fileURL as URL in enumerator {
            let resourceValues = try fileURL.resourceValues(forKeys: [.isRegularFileKey])
            guard resourceValues.isRegularFile == true else { continue }

            if let include = include {
                let ext = fileURL.pathExtension
                let inclPattern = include.replacingOccurrences(of: "*", with: ".*")
                guard ext.range(of: inclPattern, options: .regularExpression) != nil ||
                      fileURL.lastPathComponent.range(of: inclPattern, options: .regularExpression) != nil else { continue }
            }
            if let exclude = exclude {
                let ext = fileURL.pathExtension
                let exclPattern = exclude.replacingOccurrences(of: "*", with: ".*")
                guard !(ext.range(of: exclPattern, options: .regularExpression) != nil ||
                        fileURL.lastPathComponent.range(of: exclPattern, options: .regularExpression) != nil) else { continue }
            }

            do {
                let content = try String(contentsOf: fileURL, encoding: .utf8)
                let lines = content.components(separatedBy: .newlines)
                var fileMatches: [[String: Any]] = []

                for (i, line) in lines.enumerated() {
                    let range = NSRange(line.startIndex..<line.endIndex, in: line)
                    if regex.firstMatch(in: line, range: range) != nil {
                        var match: [String: Any] = ["line": i + 1, "content": line]
                        if context > 0 {
                            let startCtx = max(0, i - context)
                            let endCtx = min(lines.count, i + context + 1)
                            match["context"] = Array(lines[startCtx..<endCtx])
                        }
                        fileMatches.append(match)
                    }
                }

                if !fileMatches.isEmpty {
                    results.append(["file": fileURL.path, "matches": fileMatches])
                }
            } catch {}
        }

        if json {
            let data = try JSONSerialization.data(withJSONObject: results, options: .prettyPrinted)
            print(String(data: data, encoding: .utf8) ?? "[]")
        } else {
            for result in results {
                let file = result["file"] as! String
                if let matches = result["matches"] as? [[String: Any]] {
                    for match in matches {
                        let line = match["line"] as! Int
                        let content = match["content"] as! String
                        print("\(cyan(file)):\(line):\(content)")
                        if let ctx = match["context"] as? [String] {
                            for ctxLine in ctx {
                                print("  \(gray(ctxLine))")
                            }
                        }
                    }
                }
            }
        }
    }
}

// MARK: - Checksum

struct FileChecksum: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "checksum", abstract: "Compute file checksums")

    @Argument(help: "File path")
    var path: String

    @Option(name: .shortAndLong, help: "Algorithm (md5, sha1, sha256, sha512)")
    var algorithm: String = "sha256"

    mutating func run() throws {
        let url = URL(fileURLWithPath: path)
        let data = try Data(contentsOf: url)

        let hash: String
        switch algorithm.lowercased() {
        case "md5":
            let digest = Insecure.MD5.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        case "sha1":
            let digest = Insecure.SHA1.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        case "sha256":
            let digest = SHA256.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        case "sha512":
            let digest = SHA512.hash(data: data)
            hash = digest.map { String(format: "%02x", $0) }.joined()
        default:
            print("Unknown algorithm: \(algorithm). Use: md5, sha1, sha256, sha512")
            return
        }

        print("\(hash)  \(path)")
    }
}

// MARK: - Chmod

struct FileChmod: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "chmod", abstract: "Change file permissions")

    @Argument(help: "Permission mode (e.g. 644)")
    var mode: String

    @Argument(help: "File or directory path")
    var path: String

    @Flag(name: .shortAndLong, help: "Recursive")
    var recursive = false

    mutating func run() throws {
        guard let perm = Int(mode, radix: 8) else {
            print("Invalid mode: \(mode)")
            return
        }
        let fm = FileManager.default
        if recursive {
            guard let enumerator = fm.enumerator(at: URL(fileURLWithPath: path), includingPropertiesForKeys: [.isRegularFileKey, .isDirectoryKey]) else {
                print("Invalid path: \(path)")
                return
            }
            for case let fileURL as URL in enumerator {
                try fm.setAttributes([.posixPermissions: perm], ofItemAtPath: fileURL.path)
            }
        } else {
            try fm.setAttributes([.posixPermissions: perm], ofItemAtPath: path)
        }
        print("Changed mode of \(path) to \(mode)")
    }
}

// MARK: - Count

struct FileCount: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "count", abstract: "Count lines, words, bytes in file")

    @Argument(help: "File path")
    var path: String

    mutating func run() throws {
        let url = URL(fileURLWithPath: path)
        let content = try String(contentsOf: url, encoding: .utf8)
        let data = try Data(contentsOf: url)

        let lines = content.components(separatedBy: .newlines).count - 1
        let words = content.split(by: .whitespacesAndNewlines).count
        let bytes = data.count

        print("\(lines) \(words) \(bytes) \(path)")
    }
}

extension String {
    func split(by characterSet: CharacterSet) -> [String] {
        components(separatedBy: characterSet).filter { !$0.isEmpty }
    }
}

// MARK: - Duplicates

struct FileDuplicates: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "duplicates", abstract: "Find duplicate files")

    @Argument(help: "Directory to search")
    var directory: String = "."

    mutating func run() throws {
        let fm = FileManager.default
        let baseURL = URL(fileURLWithPath: directory)
        var sizeMap: [UInt64: [URL]] = [:]

        guard let enumerator = fm.enumerator(at: baseURL, includingPropertiesForKeys: [.fileSizeKey, .isRegularFileKey]) else {
            print("Invalid directory: \(directory)")
            return
        }

        for case let fileURL as URL in enumerator {
            let values = try fileURL.resourceValues(forKeys: [.isRegularFileKey, .fileSizeKey])
            guard values.isRegularFile == true, let size = values.fileSize, size > 0 else { continue }
            sizeMap[UInt64(size), default: []].append(fileURL)
        }

        let potentialDups = sizeMap.filter { $0.value.count > 1 }
        var found = false

        for (size, files) in potentialDups {
            var hashMap: [String: [URL]] = [:]
            for file in files {
                let data = try Data(contentsOf: file)
                let hash = SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
                hashMap[hash, default: []].append(file)
            }
            for (hash, dupFiles) in hashMap where dupFiles.count > 1 {
                print("\(NumberFormat.formatBytes(size)) (\(hash.prefix(12))...)")
                for dup in dupFiles {
                    print("  \(dup.path)")
                }
                found = true
            }
        }

        if !found { print("No duplicates found") }
    }
}

// MARK: - Size

struct FileSize: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "size", abstract: "Show file or directory sizes")

    @Argument(help: "File or directory path")
    var path: String = "."

    @Flag(name: .shortAndLong, help: "Sort by size (largest first)")
    var sort = false

    mutating func run() throws {
        let fm = FileManager.default
        let url = URL(fileURLWithPath: path)
        var isDir: ObjCBool = false

        guard fm.fileExists(atPath: path, isDirectory: &isDir) else {
            print("Path not found: \(path)")
            return
        }

        if !isDir.boolValue {
            let attrs = try fm.attributesOfItem(atPath: path)
            let size = attrs[.size] as? UInt64 ?? 0
            print("\(NumberFormat.formatBytes(size))\t\(path)")
            return
        }

        var entries: [(String, UInt64)] = []
        if let enumerator = fm.enumerator(at: url, includingPropertiesForKeys: [.fileSizeKey, .isRegularFileKey]) {
            for case let fileURL as URL in enumerator {
                let values = try fileURL.resourceValues(forKeys: [.isRegularFileKey, .fileSizeKey])
                guard values.isRegularFile == true else { continue }
                entries.append((fileURL.path, UInt64(values.fileSize ?? 0)))
            }
        }

        if sort { entries.sort { $0.1 > $1.1 } }
        let total = entries.reduce(0) { $0 + $1.1 }
        for (filePath, size) in entries {
            print("\(NumberFormat.formatBytes(size))\t\(filePath)")
        }
        print("Total: \(NumberFormat.formatBytes(total))")
    }
}

// MARK: - Stats

struct FileStats: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "stats", abstract: "Show file statistics")

    @Argument(help: "Directory to analyze")
    var directory: String = "."

    @Flag(name: .long, help: "Detect MIME types (slower)")
    var mime = false

    mutating func run() throws {
        let fm = FileManager.default
        let baseURL = URL(fileURLWithPath: directory)
        var extCount: [String: Int] = [:]
        var extSize: [String: UInt64] = [:]
        var totalFiles = 0
        var totalSize: UInt64 = 0

        guard let enumerator = fm.enumerator(at: baseURL, includingPropertiesForKeys: [.fileSizeKey, .isRegularFileKey]) else {
            print("Invalid directory: \(directory)")
            return
        }

        for case let fileURL as URL in enumerator {
            let values = try fileURL.resourceValues(forKeys: [.isRegularFileKey, .fileSizeKey])
            guard values.isRegularFile == true else { continue }
            let ext = fileURL.pathExtension.isEmpty ? "(no extension)" : fileURL.pathExtension.lowercased()
            let size = UInt64(values.fileSize ?? 0)

            if mime {
                if let utType = UTType(filenameExtension: ext) {
                    let mimeType = utType.preferredMIMEType ?? ext
                    extCount[mimeType, default: 0] += 1
                    extSize[mimeType, default: 0] += size
                } else {
                    extCount[ext, default: 0] += 1
                    extSize[ext, default: 0] += size
                }
            } else {
                extCount[ext, default: 0] += 1
                extSize[ext, default: 0] += size
            }
            totalFiles += 1
            totalSize += size
        }

        print("Total files: \(totalFiles)")
        print("Total size:  \(NumberFormat.formatBytes(totalSize))")
        print("\nBy extension:")
        for ext in extCount.keys.sorted() {
            let count = extCount[ext]!
            let size = extSize[ext]!
            let pct = Double(count) / Double(totalFiles) * 100
            let bar = String(repeating: "█", count: Int(pct / 5))
            print("  \(bar) \(ext): \(count) files (\(NumberFormat.formatBytes(size)))")
        }
    }
}

// MARK: - Head

struct FileHead: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "head", abstract: "Show first N lines of file")

    @Argument(help: "File path")
    var path: String

    @Option(name: .shortAndLong, help: "Number of lines")
    var lines: Int = 10

    mutating func run() throws {
        let url = URL(fileURLWithPath: path)
        let content = try String(contentsOf: url, encoding: .utf8)
        let allLines = content.components(separatedBy: .newlines)
        for line in allLines.prefix(lines) {
            print(line)
        }
    }
}

// MARK: - Tail

struct FileTail: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "tail", abstract: "Show last N lines of file")

    @Argument(help: "File path")
    var path: String

    @Option(name: .shortAndLong, help: "Number of lines")
    var lines: Int = 10

    mutating func run() throws {
        let url = URL(fileURLWithPath: path)
        let content = try String(contentsOf: url, encoding: .utf8)
        let allLines = content.components(separatedBy: .newlines)
        for line in allLines.suffix(lines) {
            print(line)
        }
    }
}

// MARK: - Type

struct FileType: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "type", abstract: "Detect MIME type of file")

    @Argument(help: "File path")
    var path: String

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() throws {
        let url = URL(fileURLWithPath: path)
        let ext = url.pathExtension

        var mimeType = "application/octet-stream"
        if let utType = UTType(filenameExtension: ext) {
            mimeType = utType.preferredMIMEType ?? mimeType
        }

        if json {
            let output: [String: String] = ["file": path, "mime": mimeType, "extension": ext]
            let data = try JSONSerialization.data(withJSONObject: output, options: .prettyPrinted)
            print(String(data: data, encoding: .utf8) ?? "{}")
        } else {
            print("\(path): \(mimeType)")
        }
    }
}
