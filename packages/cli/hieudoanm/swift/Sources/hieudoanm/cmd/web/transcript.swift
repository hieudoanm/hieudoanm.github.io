import Foundation

struct CaptionTrack: Codable {
    let baseUrl: String
    let name: CaptionTrackName
    let languageCode: String
}

struct CaptionTrackName: Codable {
    let simpleText: String
}

struct TranscriptLine {
    let text: String
    let duration: Double
    let offset: Double
}

struct Transcript {
    let lines: [TranscriptLine]
}

func fetchTranscript(videoID: String, language: String = "en") async throws -> Transcript {
    let html = try await Requests.fetchString("https://www.youtube.com/watch?v=\(videoID)", headers: [
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.5",
    ])

    guard let captionData = extractCaptionJson(from: html) else {
        throw TranscriptError.noCaptions
    }

    let captionJson = try JSONSerialization.jsonObject(with: captionData) as? [String: Any]
    let tracks = captionJson?["captionTracks"] as? [[String: Any]] ?? []

    guard let selectedTrack = selectTrack(tracks: tracks, language: language) else {
        throw TranscriptError.languageNotFound
    }

    let xml = try await Requests.fetchString(selectedTrack)
    return try parseTimedText(xml)
}

private func extractCaptionJson(from html: String) -> Data? {
    guard let range = html.range(of: "captionTracks") else { return nil }
    let start = html[range.lowerBound...]
    guard let openBrace = start.range(of: "[") else { return nil }
    var depth = 0
    var jsonStr = "["
    for c in start[openBrace.upperBound...] {
        jsonStr.append(c)
        if c == "[" { depth += 1 }
        else if c == "]" {
            depth -= 1
            if depth < 0 { break }
        }
    }
    return jsonStr.data(using: .utf8)
}

private func selectTrack(tracks: [[String: Any]], language: String) -> String? {
    for track in tracks {
        if let lang = (track["languageCode"] as? String)?.lowercased(),
           lang == language.lowercased() || lang.hasPrefix(language.lowercased()) {
            return track["baseUrl"] as? String
        }
        if let name = (track["name"] as? [String: Any])?["simpleText"] as? String,
           name.lowercased().contains(language.lowercased()) {
            return track["baseUrl"] as? String
        }
    }
    return tracks.first?["baseUrl"] as? String
}

private func parseTimedText(_ xml: String) throws -> Transcript {
    var lines: [TranscriptLine] = []
    let textPattern = try NSRegularExpression(pattern: "<text[^>]*start=\"([^\"]+)\"(?:[^>]*dur=\"([^\"]+)\")?[^>]*>([^<]*)</text>", options: [])
    let nsRange = NSRange(xml.startIndex..<xml.endIndex, in: xml)
    let matches = textPattern.matches(in: xml, options: [], range: nsRange)
    for match in matches {
        let startStr = Range(match.range(at: 1), in: xml).map { String(xml[$0]) } ?? "0"
        let durStr = Range(match.range(at: 2), in: xml).map { String(xml[$0]) } ?? "0"
        let text = Range(match.range(at: 3), in: xml).map { String(xml[$0]) } ?? ""
        let start = Double(startStr) ?? 0
        let dur = Double(durStr) ?? 0
        let decodedText = decodeHTML(text)
        lines.append(TranscriptLine(text: decodedText, duration: dur, offset: start))
    }
    return Transcript(lines: lines)
}

private func decodeHTML(_ s: String) -> String {
    var result = s
    let replacements: [(String, String)] = [
        ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"),
        ("&quot;", "\""), ("&#39;", "'"), ("&#x27;", "'"),
        ("\n", " "), ("  ", " "),
    ]
    for (from, to) in replacements {
        result = result.replacingOccurrences(of: from, with: to)
    }
    return result.trimmingCharacters(in: .whitespaces)
}

enum TranscriptError: LocalizedError {
    case noCaptions
    case languageNotFound

    var errorDescription: String? {
        switch self {
        case .noCaptions: return "no captions found"
        case .languageNotFound: return "language not found"
        }
    }
}
