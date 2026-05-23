import Foundation
import ArgumentParser

struct SearchCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "search",
        abstract: "Search tools",
        subcommands: [SearchFiles.self, SearchText.self, SearchCode.self, SearchWeb.self]
    )

    mutating func run() {}
}

struct SearchFiles: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "files", abstract: "Glob pattern file search")

    @Argument(help: "Glob pattern (e.g. \"**/*.swift\")")
    var pattern: String

    @Option(name: .shortAndLong, help: "Search directory")
    var directory: String = "."

    @Flag(name: .long, help: "Include hidden files")
    var hidden = false

    mutating func run() {
        let fm = FileManager.default
        let baseURL = URL(fileURLWithPath: directory).standardized
        let enumerator = fm.enumerator(
            at: baseURL,
            includingPropertiesForKeys: [.isRegularFileKey],
            options: hidden ? [] : [.skipsHiddenFiles]
        )

        var matches: [String] = []
        while let fileURL = enumerator?.nextObject() as? URL {
            let path = fileURL.path
            if fm.matchesGlob(pattern: pattern, path: path) {
                matches.append(String(path.dropFirst(baseURL.path.count).trimmingCharacters(in: CharacterSet(charactersIn: "/"))))
            }
        }

        matches.sort()
        for match in matches {
            print("./\(match)")
        }

        if matches.isEmpty {
            print("No files matching pattern: \(pattern)")
        }
    }
}

struct SearchText: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "text", abstract: "Regex content search in files")

    @Argument(help: "Regex pattern")
    var pattern: String

    @Option(name: .shortAndLong, help: "Search directory")
    var directory: String = "."

    @Option(name: .long, help: "File glob pattern (e.g. \"*.swift\")")
    var include: String?

    @Flag(name: .long, help: "Case insensitive")
    var ignoreCase = false

    @Flag(name: .long, help: "Show line numbers only")
    var count = false

    mutating func run() {
        let fm = FileManager.default
        let baseURL = URL(fileURLWithPath: directory).standardized
        let enumerator = fm.enumerator(
            at: baseURL,
            includingPropertiesForKeys: [.isRegularFileKey],
            options: [.skipsHiddenFiles]
        )

        let regexOptions: NSRegularExpression.Options = ignoreCase ? [.caseInsensitive] : []
        guard let regex = try? NSRegularExpression(pattern: pattern, options: regexOptions) else {
            print("Invalid regex pattern")
            return
        }

        var totalMatches = 0
        var fileCount = 0

        while let fileURL = enumerator?.nextObject() as? URL {
            guard let isFile = try? fileURL.resourceValues(forKeys: [.isRegularFileKey]).isRegularFile, isFile else { continue }

            if let include = include {
                let ext = include.hasPrefix("*.") ? String(include.dropFirst(1)) : include
                if !fileURL.lastPathComponent.hasSuffix(ext.hasPrefix(".") ? ext : ".\(ext)"),
                   !fm.matchesGlob(pattern: include, path: fileURL.path) {
                    continue
                }
            }

            guard let content = try? String(contentsOf: fileURL, encoding: .utf8) else { continue }
            let range = NSRange(content.startIndex..<content.endIndex, in: content)
            let matches = regex.matches(in: content, options: [], range: range)

            if !matches.isEmpty {
                fileCount += 1
                totalMatches += matches.count
                let relativePath = fileURL.path.dropFirst(baseURL.path.count).trimmingCharacters(in: CharacterSet(charactersIn: "/"))

                if count {
                    print("\(relativePath): \(matches.count)")
                } else {
                    for match in matches {
                        guard let swiftRange = Range(match.range, in: content) else { continue }
                        let lineNumber = content[..<swiftRange.lowerBound].components(separatedBy: .newlines).count
                        let lineRange = content.lineRange(for: swiftRange)
                        let lineContent = String(content[lineRange]).trimmingCharacters(in: .newlines)
                        print("\(cyan(relativePath)):\(yellow("\(lineNumber)")):\(dim(lineContent))")
                    }
                }
            }
        }

        if totalMatches > 0 {
            print("\n\(totalMatches) matches in \(fileCount) files")
        } else {
            print("No matches found")
        }
    }
}

struct SearchCode: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "code", abstract: "Symbol search in source code")

    @Argument(help: "Symbol name to search (supports partial match)")
    var symbol: String

    @Option(name: .shortAndLong, help: "Search directory")
    var directory: String = "."

    @Option(name: .long, help: "Language filter: go, typescript, python, rust (default: all)")
    var language: String?

    mutating func run() {
        let handlers: [(String, [String], SearchHandler)] = [
            ("Go", ["go"], goSearch),
            ("TypeScript", ["ts", "tsx", "js", "jsx"], tsSearch),
            ("Python", ["py"], pythonSearch),
            ("Rust", ["rs"], rustSearch),
        ]

        let extensions: [String]
        if let lang = language {
            extensions = handlers.first(where: { $0.0.lowercased() == lang.lowercased() })?.1 ?? []
        } else {
            extensions = handlers.flatMap(\.1)
        }

        let fm = FileManager.default
        let baseURL = URL(fileURLWithPath: directory).standardized
        let enumerator = fm.enumerator(
            at: baseURL,
            includingPropertiesForKeys: [.isRegularFileKey],
            options: [.skipsHiddenFiles]
        )

        var totalMatches = 0

        while let fileURL = enumerator?.nextObject() as? URL {
            guard let isFile = try? fileURL.resourceValues(forKeys: [.isRegularFileKey]).isRegularFile, isFile else { continue }

            let ext = fileURL.pathExtension
            guard extensions.contains(ext) else { continue }

            guard let content = try? String(contentsOf: fileURL, encoding: .utf8) else { continue }
            let relativePath = String(fileURL.path.dropFirst(baseURL.path.count).trimmingCharacters(in: CharacterSet(charactersIn: "/")))

            for (langName, exts, handler) in handlers {
                guard exts.contains(ext), (language == nil || langName.lowercased() == language?.lowercased()) else { continue }

                let matches = handler(content, symbol)
                for match in matches {
                    print("\(cyan(relativePath)):\(yellow("\(match.line)"))  \(dim("[\(langName)]")) \(match.lineContent.trimmingCharacters(in: .whitespaces))")
                    totalMatches += 1
                }
            }
        }

        if totalMatches == 0 {
            print("No symbols found matching \"\(symbol)\"")
        }
    }
}

struct SymbolMatch {
    let line: Int
    let lineContent: String
}

private typealias SearchHandler = (String, String) -> [SymbolMatch]

private let goSearch: SearchHandler = { content, symbol in
    let pattern = "(?:^|\\n)\\s*(?:func|type|struct|interface|var|const|type\\s+\\w+\\s+struct|type\\s+\\w+\\s+interface)\\s+[^\\n{]*\(NSRegularExpression.escapedPattern(for: symbol))[^\\n{]*"
    return findMatches(content: content, pattern: pattern)
}

private let tsSearch: SearchHandler = { content, symbol in
    let patterns = [
        "(?:^|\\n)\\s*(?:export\\s+)?(?:function|class|interface|type|enum|const|let|var|abstract\\s+class)\\s+[^\\n{;(]*\(NSRegularExpression.escapedPattern(for: symbol))[^\\n{;(]*",
        "(?:^|\\n)\\s*(?:export\\s+)?(?:default\\s+)?(?:function|class|interface|type|enum)\\s+[^\\n{;(]*\(NSRegularExpression.escapedPattern(for: symbol))[^\\n{;(]*",
    ]
    return patterns.flatMap { findMatches(content: content, pattern: $0) }
}

private let pythonSearch: SearchHandler = { content, symbol in
    let patterns = [
        "(?:^|\\n)\\s*(?:def|class|async\\s+def)\\s+[^\\n(]*\(NSRegularExpression.escapedPattern(for: symbol))[^\\n(]*",
        "(?:^|\\n)\\s*(?:@\\w+\\s*\\n)?\\s*(?:def|class|async\\s+def)\\s+[^\\n(]*\(NSRegularExpression.escapedPattern(for: symbol))[^\\n(]*",
    ]
    return patterns.flatMap { findMatches(content: content, pattern: $0) }
}

private let rustSearch: SearchHandler = { content, symbol in
    let patterns = [
        "(?:^|\\n)\\s*(?:pub\\s+)?(?:fn|struct|enum|trait|impl|type|const|macro_rules!|unsafe\\s+fn)\\s+[^\\n{;]*\(NSRegularExpression.escapedPattern(for: symbol))[^\\n{;]*",
        "(?:^|\\n)\\s*(?:pub\\s+)?(?:fn|struct|enum|trait|impl|type|const)\\s+[^\\n{;]*\(NSRegularExpression.escapedPattern(for: symbol))[^\\n{;]*",
    ]
    return patterns.flatMap { findMatches(content: content, pattern: $0) }
}

func findMatches(content: String, pattern: String) -> [SymbolMatch] {
    guard let regex = try? NSRegularExpression(pattern: pattern, options: []) else { return [] }
    let range = NSRange(content.startIndex..<content.endIndex, in: content)
    let matches = regex.matches(in: content, options: [], range: range)
    return matches.compactMap { match in
        guard let swiftRange = Range(match.range, in: content) else { return nil }
        let lineNumber = content[..<swiftRange.lowerBound].components(separatedBy: .newlines).count
        let lineRange = content.lineRange(for: swiftRange)
        let lineContent = String(content[lineRange]).trimmingCharacters(in: .newlines)
        return SymbolMatch(line: lineNumber, lineContent: lineContent)
    }
}

struct SearchWeb: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "web", abstract: "Search DuckDuckGo and return results")

    @Argument(help: "Search query")
    var query: String

    @Option(name: .shortAndLong, help: "Number of results")
    var count: Int = 5

    mutating func run() async throws {
        let encoded = query.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? query
        let url = "https://lite.duckduckgo.com/lite/?q=\(encoded)"

        let resp = try await Requests.fetch(url, headers: ["User-Agent": "Mozilla/5.0"])
        guard let html = String(data: resp.data, encoding: .utf8) else {
            print("Could not decode response")
            return
        }

        let results = parseDuckDuckGoResults(html)
        if results.isEmpty {
            print("No results found")
            return
        }

        for (i, result) in results.prefix(count).enumerated() {
            print("\(i + 1). \(result.title)")
            print("   \(dim(result.url))")
            if !result.snippet.isEmpty {
                print("   \(result.snippet)")
            }
            print()
        }
    }
}

struct SearchResult {
    let title: String
    let url: String
    let snippet: String
}

func parseDuckDuckGoResults(_ html: String) -> [SearchResult] {
    var results: [SearchResult] = []

    let lines = html.components(separatedBy: .newlines)
    var currentTitle = ""
    var currentURL = ""
    var currentSnippet = ""
    var inResult = false

    for line in lines {
        let trimmed = line.trimmingCharacters(in: .whitespaces)

        if trimmed.contains("class=\"result-link\"") || trimmed.contains("class=\"result__a\"") {
            if let titleMatch = try? NSRegularExpression(pattern: "<a[^>]*href=\"([^\"]+)\"[^>]*>(.*?)</a>", options: [.dotMatchesLineSeparators]),
               let match = titleMatch.firstMatch(in: trimmed, options: [], range: NSRange(trimmed.startIndex..<trimmed.endIndex, in: trimmed)),
               match.numberOfRanges >= 3 {
                currentURL = String(trimmed[Range(match.range(at: 1), in: trimmed)!])
                    .replacingOccurrences(of: "&amp;", with: "&")
                currentTitle = String(trimmed[Range(match.range(at: 2), in: trimmed)!])
                    .replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
                    .trimmingCharacters(in: .whitespaces)
                inResult = true
                currentSnippet = ""
            }
        }

        if inResult && (trimmed.contains("class=\"result-snippet\"") || trimmed.contains("class=\"result__snippet\"")) {
            let snippet = trimmed.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
                .trimmingCharacters(in: .whitespaces)
            currentSnippet = snippet
        }

        if inResult && !currentTitle.isEmpty && !currentURL.isEmpty {
            results.append(SearchResult(title: currentTitle, url: currentURL, snippet: currentSnippet))
            currentTitle = ""
            currentURL = ""
            currentSnippet = ""
            inResult = false
        }
    }

    return results
}


private extension FileManager {
    func matchesGlob(pattern: String, path: String) -> Bool {
        let patterns = pattern.components(separatedBy: "/")
        let pathComponents = path.components(separatedBy: "/")
        return matchGlobComponents(patterns: patterns, pathComponents: pathComponents)
    }

    private func matchGlobComponents(patterns: [String], pathComponents: [String]) -> Bool {
        if patterns.isEmpty { return pathComponents.isEmpty }
        if patterns.first == "**" {
            if patterns.count == 1 { return true }
            for i in 0...pathComponents.count {
                if matchGlobComponents(patterns: Array(patterns.dropFirst()), pathComponents: Array(pathComponents.dropFirst(i))) {
                    return true
                }
            }
            return false
        }
        guard !pathComponents.isEmpty else { return false }
        guard fnmatch(patterns.first!, pathComponents.first!, 0) == 0 else { return false }
        return matchGlobComponents(patterns: Array(patterns.dropFirst()), pathComponents: Array(pathComponents.dropFirst()))
    }
}
