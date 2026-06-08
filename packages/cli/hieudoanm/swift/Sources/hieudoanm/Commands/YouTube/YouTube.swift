import Foundation
import ArgumentParser

struct YouTube: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "youtube",
        abstract: "YouTube tools",
        subcommands: [YouTubeThumbnails.self, YouTubeTranscript.self]
    )

    mutating func run() {}
}

struct YouTubeThumbnails: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "thumbnails", abstract: "Download YouTube thumbnails")

    @Argument(help: "YouTube video URL or ID")
    var video: String

    @Option(name: .shortAndLong, help: "Output directory")
    var output: String = "."

    @Flag(name: .long, help: "Download all qualities")
    var all = false

    @Option(name: .long, help: "Specific quality (maxresdefault, hqdefault, mqdefault, sddefault, default, 0-3)")
    var quality: String?

    @Flag(name: .long, help: "List available qualities")
    var list = false

    mutating func run() async throws {
        let videoID = extractVideoID(video)

        let qualities = [
            "maxresdefault", "hqdefault", "mqdefault", "sddefault", "default",
            "0", "1", "2", "3",
        ]

        if list {
            print("Available qualities for video \(videoID):")
            for q in qualities {
                let url = "https://img.youtube.com/vi/\(videoID)/\(q).jpg"
                print("  \(q): \(url)")
            }
            return
        }

        if let q = quality {
            let url = "https://img.youtube.com/vi/\(videoID)/\(q).jpg"
            let data = try await requestsFetch(method: "GET", url: url)
            let filename = "\(output)/\(videoID)_\(q).jpg"
            try data.write(to: URL(fileURLWithPath: filename))
            print("Downloaded \(filename)")
        } else {
            for q in all ? qualities : ["maxresdefault"] {
                let url = "https://img.youtube.com/vi/\(videoID)/\(q).jpg"
                do {
                    let data = try await requestsFetch(method: "GET", url: url)
                    let filename = "\(output)/\(videoID)_\(q).jpg"
                    try data.write(to: URL(fileURLWithPath: filename))
                    print("Downloaded \(filename)")
                } catch {
                    if all { print("  \(q): not available") }
                }
            }
        }
    }
}

struct YouTubeTranscript: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "transcript", abstract: "Fetch YouTube transcript")

    @Argument(help: "YouTube video URL or ID")
    var video: String

    @Option(name: .shortAndLong, help: "Language code (default: en)")
    var language: String = "en"

    @Flag(name: .long, help: "JSON output with timestamps")
    var json = false

    mutating func run() async throws {
        let videoID = extractVideoID(video)
        let transcript = try await fetchTranscript(videoID: videoID, language: language)

        if json {
            let encoder = JSONEncoder()
            encoder.outputFormatting = .prettyPrinted
            let lines = transcript.lines.map { l in
                ["text": l.text, "offset": l.offset, "duration": l.duration] as [String: Any]
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
