import Foundation
import ArgumentParser

struct GhCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "gh",
        abstract: "GitHub tools",
        subcommands: [GhCoc.self, GhIgnore.self, GhLanguages.self, GhLicense.self, GhOG.self]
    )

    mutating func run() {}
}

private let apiBase = "https://api.github.com"

// MARK: - Languages

struct GhLanguages: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "languages", abstract: "Language breakdown of a GitHub repo")

    @Argument(help: "Repository in owner/repo format")
    var repo: String

    @Flag(name: .long, help: "JSON output")
    var json = false

    mutating func run() async throws {
        let data = try await Requests.fetch("\(apiBase)/repos/\(repo)/languages", headers: ["Accept": "application/vnd.github.v3+json"])
        guard let jsonObj = try JSONSerialization.jsonObject(with: data.data) as? [String: Int] else {
            print("Could not parse languages for \(repo)")
            return
        }

        let total = jsonObj.values.reduce(0, +)
        let sorted = jsonObj.sorted { $0.value > $1.value }

        if json {
            struct LangEntry: Encodable {
                let language: String
                let bytes: Int
                let percentage: Double
            }
            let enc = JSONEncoder()
            enc.outputFormatting = .prettyPrinted
            let entries = sorted.map { LangEntry(language: $0.key, bytes: $0.value, percentage: Double($0.value) / Double(total) * 100) }
            let out = try enc.encode(entries)
            print(String(data: out, encoding: .utf8) ?? "[]")
        } else {
            let maxWidth = 40
            for (lang, bytes) in sorted {
                let pct = Double(bytes) / Double(total) * 100
                let barWidth = Int(pct / 100 * Double(maxWidth))
                let bar = String(repeating: "█", count: barWidth)
                print("\(bar) \(lang): \(String(format: "%.1f", pct))% (\(NumberFormat.formatBytes(UInt64(bytes))))")
            }
        }
    }
}

// MARK: - License

struct GhLicense: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "license", abstract: "Fetch license for a GitHub repo")

    @Argument(help: "Repository in owner/repo format")
    var repo: String

    mutating func run() async throws {
        let data = try await Requests.fetch("\(apiBase)/repos/\(repo)/license", headers: ["Accept": "application/vnd.github.v3+json"])
        guard let json = try JSONSerialization.jsonObject(with: data.data) as? [String: Any],
              let license = json["license"] as? [String: Any],
              let name = license["name"] as? String else {
            print("No license found for \(repo)")
            return
        }

        print("License: \(name)")
        if let desc = license["description"] as? String {
            print("Description: \(desc)")
        }
        if let url = license["url"] as? String {
            print("URL: \(url)")
        }
        if let content = json["content"] as? String,
           let decoded = Data(base64Encoded: content.replacingOccurrences(of: "\n", with: "")),
           let body = String(data: decoded, encoding: .utf8) {
            print("\n--- License Content ---")
            print(body)
        }
    }
}

// MARK: - Code of Conduct

struct GhCoc: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "coc", abstract: "Fetch Code of Conduct for a GitHub repo")

    @Argument(help: "Repository in owner/repo format")
    var repo: String

    mutating func run() async throws {
        let data = try await Requests.fetch("\(apiBase)/repos/\(repo)/community/code_of_conduct", headers: ["Accept": "application/vnd.github.v3+json"])
        guard let json = try JSONSerialization.jsonObject(with: data.data) as? [String: Any],
              let body = json["body"] as? String else {
            print("No Code of Conduct found for \(repo)")
            return
        }
        if let name = json["name"] as? String { print("\(name)\n") }
        print(body)
    }
}

// MARK: - Gitignore

struct GhIgnore: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "ignore", abstract: "Fetch .gitignore template")

    @Argument(help: "Language (e.g. Swift, Python, Go)")
    var language: String

    mutating func run() async throws {
        let data = try await Requests.fetch("\(apiBase)/gitignore/templates/\(language)", headers: ["Accept": "application/vnd.github.v3+json"])
        guard let json = try JSONSerialization.jsonObject(with: data.data) as? [String: Any],
              let source = json["source"] as? String else {
            print("No gitignore template found for \(language)")
            return
        }
        print(source)
    }
}

// MARK: - OG Image

struct GhOG: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "og", abstract: "Generate GitHub-style OG image as SVG")

    @Argument(help: "Repository in owner/repo format")
    var repo: String

    @Option(name: .long, help: "Output file (default: stdout)")
    var output: String?

    mutating func run() async throws {
        let data = try await Requests.fetch("\(apiBase)/repos/\(repo)", headers: ["Accept": "application/vnd.github.v3+json"])
        guard let json = try JSONSerialization.jsonObject(with: data.data) as? [String: Any] else {
            print("Could not fetch repo info for \(repo)")
            return
        }

        let name = json["full_name"] as? String ?? repo
        let desc = json["description"] as? String ?? ""
        let lang = json["language"] as? String ?? "Unknown"
        let stars = json["stargazers_count"] as? Int ?? 0
        let forks = json["forks_count"] as? Int ?? 0
        let color = languageColor(lang)

        let lines = desc.split(separator: "\n").map(String.init)
        let descLine = lines.first ?? desc
        let truncatedDesc = descLine.count > 80 ? String(descLine.prefix(77)) + "..." : descLine

        let svg = """
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="600" viewBox="0 0 1200 600">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0d1117"/>
              <stop offset="100%" style="stop-color:#161b22"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#bg)" rx="10"/>
          <text x="60" y="200" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="48" font-weight="bold" fill="#f0f6fc">\(escXml(name))</text>
          <text x="60" y="270" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" fill="#8b949e">\(escXml(truncatedDesc))</text>
          <circle cx="60" cy="350" r="12" fill="\(color)"/>
          <text x="85" y="358" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" fill="#f0f6fc">\(escXml(lang))</text>
          <text x="220" y="358" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" fill="#8b949e">★ \(stars)</text>
          <text x="370" y="358" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" fill="#8b949e">⑂ \(forks)</text>
          <text x="60" y="500" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="20" fill="#484f58">github.com/\(escXml(name))</text>
        </svg>
        """

        if let output = output {
            try svg.write(to: URL(fileURLWithPath: output), atomically: true, encoding: .utf8)
            print("OG image saved to \(output)")
        } else {
            print(svg)
        }
    }
}

private func escXml(_ s: String) -> String {
    s.replacingOccurrences(of: "&", with: "&amp;")
     .replacingOccurrences(of: "<", with: "&lt;")
     .replacingOccurrences(of: ">", with: "&gt;")
     .replacingOccurrences(of: "'", with: "&apos;")
     .replacingOccurrences(of: "\"", with: "&quot;")
}

private func languageColor(_ lang: String) -> String {
    let colors: [String: String] = [
        "Swift": "#F05138", "Python": "#3572A5", "JavaScript": "#F1E05A",
        "TypeScript": "#3178C6", "Go": "#00ADD8", "Rust": "#DEA584",
        "Ruby": "#701516", "Kotlin": "#A97BFF", "Java": "#B07219",
        "C": "#555555", "C++": "#F34B7D", "C#": "#178600",
        "Shell": "#89E051", "HTML": "#E34C26", "CSS": "#563D7C",
        "Scala": "#C22D40", "Dart": "#00B4AB", "Elixir": "#6E4A7E",
        "Haskell": "#5E5086", "Lua": "#000080", "Perl": "#0298C3",
        "PHP": "#4F5D95", "R": "#198CE7", "Objective-C": "#438EFF",
        "Vue": "#41B883", "Zig": "#EC915C", "Solidity": "#AA6746",
    ]
    return colors[lang] ?? "#8b949e"
}
