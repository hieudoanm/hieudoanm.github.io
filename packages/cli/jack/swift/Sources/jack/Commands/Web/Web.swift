import Foundation
import ArgumentParser
import SwiftSoup

struct WebCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "web",
        abstract: "Web services",
        subcommands: [
            WebInstagram.self,
            WebShopify.self,
            WebSimplify.self,
            WebSnapshot.self,
            WebWeather.self,
            WebYoutube.self,
        ]
    )
}

struct WebSimplify: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "simplify",
        abstract: "Extract and convert web content",
        subcommands: [WebSimplifyCsv.self, WebSimplifyMd.self]
    )
}

struct WebSimplifyCsv: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "csv", abstract: "Extract HTML tables to CSV")

    @Option(name: .shortAndLong, help: "URL to fetch")
    var url: String

    @Option(name: .shortAndLong, help: "Output directory")
    var output: String = "."

    mutating func run() async throws {
        let resp = try await Requests.fetch(url)
        let html = String(data: resp.data, encoding: .utf8) ?? ""
        let doc = try SwiftSoup.parse(html)
        let tables: Elements = try doc.select("table")
        guard !tables.isEmpty() else {
            print("no tables found")
            return
        }
        let host = extractHost(url)
        try FileManager.default.createDirectory(atPath: output, withIntermediateDirectories: true)
        for (i, table) in tables.enumerated() {
            let filename = tables.count == 1 ? "\(host).csv" : "\(host)-table-\(i + 1).csv"
            let path = "\(output)/\(filename)"
            var csvLines: [String] = []
            let rows = try table.select("tr")
            for row in rows.array() {
                var cells: [String] = []
                for cell in try row.select("td, th").array() {
                    let text = try cell.text().trimmingCharacters(in: .whitespacesAndNewlines)
                    cells.append("\"\(text.replacingOccurrences(of: "\"", with: "\"\""))\"")
                }
                if !cells.isEmpty {
                    csvLines.append(cells.joined(separator: ","))
                }
            }
            try csvLines.joined(separator: "\n").write(toFile: path, atomically: true, encoding: .utf8)
            print(URL(fileURLWithPath: path).path)
        }
    }
}

struct WebSimplifyMd: AsyncParsableCommand {
    static let configuration = CommandConfiguration(commandName: "md", abstract: "Convert webpage to markdown")

    @Option(name: .shortAndLong, help: "URL to fetch")
    var url: String

    @Option(name: .shortAndLong, help: "Output directory")
    var output: String = "."

    mutating func run() async throws {
        let resp = try await Requests.fetch(url)
        let html = String(data: resp.data, encoding: .utf8) ?? ""
        let doc: Document = try SwiftSoup.parse(html)
        try doc.select("script, style, nav, footer, header, aside, .sidebar, .menu, .nav, .footer, .header, .ad, .ads, .advertisement").remove()
        let title = try doc.title()
        let host = extractHost(url)
        try FileManager.default.createDirectory(atPath: output, withIntermediateDirectories: true)
        let md = htmlToMarkdown(doc)
        let content = title.isEmpty ? md : "# \(title)\n\n\(md)"
        let path = "\(output)/\(host).md"
        try content.write(toFile: path, atomically: true, encoding: .utf8)
        print(URL(fileURLWithPath: path).path)
    }
}

private func extractHost(_ raw: String) -> String {
    guard let url = URL(string: raw), let host = url.host else { return "output" }
    return host.replacingOccurrences(of: "www.", with: "").replacingOccurrences(of: ".", with: "_")
}

private func htmlToMarkdown(_ doc: Document) -> String {
    var result = ""
    if let body = doc.body() {
        result = convertNode(body, indent: 0)
    }
    return result.trimmingCharacters(in: .whitespacesAndNewlines)
}

private func convertNode(_ node: Element, indent: Int) -> String {
    var output = ""
    for child in node.children() {
        switch child.tagName() {
        case "h1", "h2", "h3", "h4", "h5", "h6":
            let level = Int(String(child.tagName().dropFirst())) ?? 1
            let prefix = String(repeating: "#", count: level)
            let text = (try? child.text()) ?? ""
            output += "\(prefix) \(text)\n\n"
        case "p":
            let text = (try? child.text()) ?? ""
            if !text.isEmpty { output += "\(text)\n\n" }
        case "hr":
            output += "---\n\n"
        case "blockquote":
            let text = (try? child.text()) ?? ""
            for line in text.components(separatedBy: "\n") {
                output += "> \(line.trimmingCharacters(in: .whitespaces))\n"
            }
            output += "\n"
        case "ul":
            for li in child.children() {
                let text = (try? li.text()) ?? ""
                if !text.isEmpty { output += "- \(text)\n" }
            }
            output += "\n"
        case "ol":
            for (i, li) in child.children().enumerated() {
                let text = (try? li.text()) ?? ""
                if !text.isEmpty { output += "\(i + 1). \(text)\n" }
            }
            output += "\n"
        case "pre":
            let code = (try? child.text()) ?? ""
            output += "```\n\(code)\n```\n\n"
        case "code":
            let text = (try? child.text()) ?? ""
            output += "`\(text)` "
        case "a":
            let href = try? child.attr("href")
            let text = (try? child.text()) ?? ""
            if let h = href, !h.isEmpty, !text.isEmpty {
                output += "[\(text)](\(h)) "
            } else {
                output += "\(text) "
            }
        case "img":
            let src = try? child.attr("src")
            let alt = try? child.attr("alt")
            output += "![\(alt ?? "")](\(src ?? "")) "
        case "br":
            output += "\n"
        case "table":
            output += convertTable(child)
        default:
            output += convertNode(child, indent: indent)
        }
    }
    return output
}

private func convertTable(_ table: Element) -> String {
    var out = ""
    let rows = (try? table.select("tr").array()) ?? []
    guard !rows.isEmpty else { return out }

    var allRows: [[String]] = []
    for row in rows {
        var cells: [String] = []
        if let td = try? row.select("td, th") {
            for cell in td.array() {
                cells.append((try? cell.text()) ?? "")
            }
        }
        if !cells.isEmpty { allRows.append(cells) }
    }
    guard !allRows.isEmpty else { return out }

    let colCount = allRows.map(\.count).max() ?? 0
    out += "|"
    for cell in allRows[0] { out += " \(cell) |" }
    out += "\n|"
    for _ in 0..<colCount { out += " --- |" }
    out += "\n"
    for row in allRows.dropFirst() {
        out += "|"
        for cell in row { out += " \(cell) |" }
        out += "\n"
    }
    out += "\n"
    return out
}

struct WebInstagram: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "instagram", abstract: "Download Instagram media from shortcode")

    @Argument(help: "Instagram URL or shortcode")
    var input: String

    @Option(name: .shortAndLong, help: "Output directory")
    var output: String = "."

    mutating func run() async throws {
        let shortcode: String
        if input.contains("/") {
            guard let sc = extractInstagramShortcode(from: input) else {
                print("Invalid Instagram URL")
                return
            }
            shortcode = sc
        } else {
            shortcode = input
        }

        let apiURL = "https://www.instagram.com/p/\(shortcode)/?__a=1"
        var imgURL: String?

        let resp = try? await Requests.fetch(apiURL, headers: ["User-Agent": "Mozilla/5.0", "Accept": "application/json"])
        if let data = resp?.data {
            let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
            let items = (json?["items"] as? [[String: Any]]) ?? (json?["graphql"] as? [String: Any]).map { [$0] } ?? []
            if let item = items.first {
                imgURL = item["display_url"] as? String
                    ?? ((item["image_versions2"] as? [String: Any])?["candidates"] as? [[String: Any]])?.first?["url"] as? String
            }
        }

        if imgURL == nil {
            let htmlResp = try? await Requests.fetch("https://www.instagram.com/p/\(shortcode)/", headers: ["User-Agent": "Mozilla/5.0"])
            if let htmlData = htmlResp?.data, let htmlStr = String(data: htmlData, encoding: .utf8) {
                if let ogRange = htmlStr.range(of: "og:image"),
                   let contentStart = htmlStr[ogRange.upperBound...].range(of: "content=\""),
                   let end = htmlStr[contentStart.upperBound...].range(of: "\"") {
                    imgURL = String(htmlStr[contentStart.upperBound..<end.lowerBound])
                }
            }
        }

        guard let url = imgURL, !url.isEmpty else {
            print("Could not extract image URL")
            return
        }
        let imgResp = try await Requests.fetch(url)
        let filename = "\(output)/instagram_\(shortcode).jpg"
        try imgResp.data.write(to: URL(fileURLWithPath: filename))
        print("Downloaded to \(filename)")
    }
}

func extractInstagramShortcode(from url: String) -> String? {
    let patterns = [
        try! NSRegularExpression(pattern: "instagram\\.com/p/([^/?]+)", options: []),
        try! NSRegularExpression(pattern: "instagram\\.com/reel/([^/?]+)", options: []),
        try! NSRegularExpression(pattern: "instagr\\.am/p/([^/?]+)", options: []),
        try! NSRegularExpression(pattern: "instagr\\.am/reel/([^/?]+)", options: []),
    ]
    let nsRange = NSRange(url.startIndex..<url.endIndex, in: url)
    for pattern in patterns {
        if let match = pattern.firstMatch(in: url, options: [], range: nsRange),
           let range = Range(match.range(at: 1), in: url) {
            return String(url[range])
        }
    }
    return nil
}

struct WebShopify: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "shopify", abstract: "Detect if a URL is a Shopify store")

    @Argument(help: "URL to check")
    var url: String

    mutating func run() async throws {
        let result = try await detectShopify(url: url)
        if result.isShopify {
            print("\(url) is using Shopify\(result.isPlus ? " Plus" : "")")
            print("Detected via: \(result.via)")
        } else {
            print("\(url) does not appear to be using Shopify")
        }
    }
}

struct ShopifyResult {
    let isShopify: Bool
    let isPlus: Bool
    let storeName: String?
    let via: String
}

private func detectShopify(url: String) async throws -> ShopifyResult {
    let resp = try await Requests.fetch(url, headers: ["User-Agent": "Mozilla/5.0"])
    let body = String(data: resp.data, encoding: .utf8) ?? ""
    if body.contains("x-shopify-plus") || body.contains("cdn.shopify.com") {
        return ShopifyResult(isShopify: true, isPlus: body.contains("x-shopify-plus"), storeName: nil, via: "html")
    }
    if body.contains("shopify-section") || body.contains("shopify-digital-wallet") {
        return ShopifyResult(isShopify: true, isPlus: body.contains("shopify-plus"), storeName: nil, via: "html")
    }
    return ShopifyResult(isShopify: false, isPlus: false, storeName: nil, via: "none")
}

struct WebSnapshot: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "snapshot", abstract: "Web page screenshot (opens in Safari)")

    @Argument(help: "URL to capture")
    var url: String

    @Option(name: .shortAndLong, help: "Output file")
    var output: String = "snapshot.png"

    mutating func run() async throws {
        try await Browser.screenshot(url: url, output: output)
    }
}

struct WebWeather: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "weather", abstract: "Show weather for a location")

    @Argument(help: "Location (city name or coordinates)")
    var location: String

    @Option(name: .shortAndLong, help: "Format: 1-4 (see wttr.in)")
    var format: Int = 1

    mutating func run() async throws {
        let query = location.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? location
        let url = "https://wttr.in/\(query)?format=\(format)"
        let resp = try await Requests.fetch(url, headers: ["User-Agent": "curl/7.68.0"])
        print(String(data: resp.data, encoding: .utf8) ?? "No data")
    }
}

struct WebYoutube: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "youtube",
        abstract: "YouTube tools",
        subcommands: [WebYoutubeThumbnails.self, WebYoutubeTranscript.self]
    )
}

struct WebYoutubeThumbnails: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "thumbnails", abstract: "Download YouTube thumbnails")

    @Argument(help: "YouTube video URL or ID")
    var video: String

    @Option(name: .shortAndLong, help: "Output directory")
    var output: String = "."

    @Option(name: .long, help: "Quality (maxresdefault, hqdefault, mqdefault, sddefault, default)")
    var quality: String?

    @Flag(name: .long, help: "Download all qualities")
    var all = false

    mutating func run() async throws {
        let videoID = extractVideoID(video)
        let qualities = ["maxresdefault", "hqdefault", "mqdefault", "sddefault", "default"]
        let selected = quality.map { [$0] } ?? (all ? qualities : ["maxresdefault"])
        for q in selected {
            let url = "https://img.youtube.com/vi/\(videoID)/\(q).jpg"
            do {
                let resp = try await Requests.fetch(url)
                let filename = "\(output)/\(videoID)_\(q).jpg"
                try resp.data.write(to: URL(fileURLWithPath: filename))
                print("Downloaded \(filename)")
            } catch {
                print("  \(q): not available")
            }
        }
    }
}

struct WebYoutubeTranscript: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "transcript", abstract: "Fetch YouTube transcript")

    @Argument(help: "YouTube video URL or ID")
    var video: String

    @Option(name: .shortAndLong, help: "Language code")
    var language: String = "en"

    @Flag(name: .long, help: "JSON output with timestamps")
    var json = false

    mutating func run() async throws {
        let videoID = extractVideoID(video)
        let transcript = try await fetchTranscript(videoID: videoID, language: language)
        if json {
            let lines = transcript.lines.map { l -> [String: Any] in
                ["text": l.text, "offset": l.offset, "duration": l.duration]
            }
            let data = try JSONSerialization.data(withJSONObject: ["transcript": lines], options: .prettyPrinted)
            print(String(data: data, encoding: .utf8) ?? "")
        } else {
            for line in transcript.lines {
                let timestamp = formatTime(line.offset)
                print("[\(timestamp)] \(line.text)")
            }
        }
    }
}

func extractVideoID(_ input: String) -> String {
    if input.count == 11 && !input.contains("/") && !input.contains(".") {
        return input
    }
    let patterns = [
        try! NSRegularExpression(pattern: "(?:youtube\\.com/watch\\?v=|youtu\\.be/)([a-zA-Z0-9_-]{11})", options: []),
        try! NSRegularExpression(pattern: "youtube\\.com/embed/([a-zA-Z0-9_-]{11})", options: []),
    ]
    let nsRange = NSRange(input.startIndex..<input.endIndex, in: input)
    for pattern in patterns {
        if let match = pattern.firstMatch(in: input, options: [], range: nsRange),
           let range = Range(match.range(at: 1), in: input) {
            return String(input[range])
        }
    }
    return input
}

func formatTime(_ seconds: Double) -> String {
    let total = Int(seconds)
    let h = total / 3600
    let m = (total % 3600) / 60
    let s = total % 60
    if h > 0 {
        return String(format: "%d:%02d:%02d", h, m, s)
    }
    return String(format: "%d:%02d", m, s)
}
