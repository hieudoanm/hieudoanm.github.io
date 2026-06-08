import Foundation
import ArgumentParser

struct Instagram: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "instagram",
        abstract: "Instagram tools",
        subcommands: [InstagramDownload.self]
    )

    mutating func run() {}
}

struct InstagramDownload: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "download",
        abstract: "Download Instagram post/reel images"
    )

    @Argument(help: "Instagram URL")
    var url: String

    @Option(name: .shortAndLong, help: "Output directory")
    var output: String = "."

    mutating func run() async throws {
        guard let shortcode = extractShortcode(from: url) else {
            print("Invalid Instagram URL")
            return
        }

        let apiURL = "https://www.instagram.com/p/\(shortcode)/?__a=1"
        do {
            var opts = RequestsOptions()
            opts.headers["User-Agent"] = "Mozilla/5.0"
            opts.headers["Accept"] = "application/json"
            let data = try await requestsFetch(method: "GET", url: apiURL, options: opts)
            let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
            let items = (json?["items"] as? [[String: Any]]) ?? (json?["graphql"] as? [String: Any]).map { [$0] } ?? []

            var imgURL: String?
            if let item = items.first {
                imgURL = item["display_url"] as? String
                    ?? ((item["image_versions2"] as? [String: Any])?["candidates"] as? [[String: Any]])?.first?["url"] as? String
            } else {
                let html = try await requestsFetch(method: "GET", url: "https://www.instagram.com/p/\(shortcode)/", options: opts)
                let htmlStr = String(data: html, encoding: .utf8) ?? ""
                if let ogRange = htmlStr.range(of: "og:image"),
                   let contentStart = htmlStr[ogRange.upperBound...].range(of: "content=\""),
                   let end = htmlStr[contentStart.upperBound...].range(of: "\"") {
                    imgURL = String(htmlStr[contentStart.upperBound..<end.lowerBound])
                }
            }

            if let imgURL = imgURL, !imgURL.isEmpty {
                let imgData = try await requestsFetch(method: "GET", url: imgURL)
                let filename = "\(output)/instagram_\(shortcode).jpg"
                try imgData.write(to: URL(fileURLWithPath: filename))
                print("Downloaded to \(filename)")
            } else {
                print("Could not extract image URL")
            }
        } catch {
            print("Error downloading: \(error)")
        }
    }
}

private func extractShortcode(from url: String) -> String? {
    let patterns = [
        try! NSRegularExpression(pattern: "instagram\\.com/p/([^/?]+)", options: []),
        try! NSRegularExpression(pattern: "instagram\\.com/reel/([^/?]+)", options: []),
        try! NSRegularExpression(pattern: "instagr\\.am/p/([^/?]+)", options: []),
        try! NSRegularExpression(pattern: "instagr\\.am/reel/([^/?]+)", options: []),
    ]
    let nsRange = NSRange(url.startIndex..<url.endIndex, in: url)
    for pattern in patterns {
        if let match = pattern.firstMatch(in: url, options: [], range: nsRange) {
            if let range = Range(match.range(at: 1), in: url) {
                return String(url[range])
            }
        }
    }
    return nil
}
