import Foundation
import ArgumentParser

struct WebCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "web",
        abstract: "Web services",
        subcommands: [
            WebInstagram.self,
            WebShopify.self,
            WebSnapshot.self,
            WebWeather.self,
            WebYoutube.self,
        ]
    )
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

private func extractInstagramShortcode(from url: String) -> String? {
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

private func extractVideoID(_ input: String) -> String {
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

private func formatTime(_ seconds: Double) -> String {
    let total = Int(seconds)
    let h = total / 3600
    let m = (total % 3600) / 60
    let s = total % 60
    if h > 0 {
        return String(format: "%d:%02d:%02d", h, m, s)
    }
    return String(format: "%d:%02d", m, s)
}
