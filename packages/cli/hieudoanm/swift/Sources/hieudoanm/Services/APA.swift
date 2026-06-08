import Foundation

struct APAResult: Codable {
    let author: String
    let title: String
    let journal: String
    let volume: String?
    let issue: String?
    let pages: String?
    let year: Int?
}

func fetchAPAData(doi: String) async throws -> APAResult {
    let url = "https://api.crossref.org/works/\(doi)"
    let data = try await requestsFetch(method: "GET", url: url)
    let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
    let message = json?["message"] as? [String: Any]

    func extractAuthor(_ msg: [String: Any]) -> String {
        guard let authors = msg["author"] as? [[String: Any]], !authors.isEmpty else { return "Unknown" }
        let names = authors.map { a -> String in
            let family = a["family"] as? String ?? ""
            let given = a["given"] as? String ?? ""
            let initials = given.split(separator: " ").compactMap { $0.first }.map { "\($0)." }.joined(separator: " ")
            return "\(family), \(initials)"
        }
        if names.count == 1 { return names[0] }
        if names.count == 2 { return "\(names[0]) & \(names[1])" }
        return "\(names[0]), et al."
    }

    let author = message.map(extractAuthor) ?? "Unknown"
    let title = (message?["title"] as? [String])?.first ?? "Unknown"
    let journal = message?["container-title"] as? [String] ?? ["Unknown"]
    let volume = message?["volume"] as? String
    let issue = message?["issue"] as? String
    let pages = message?["page"] as? String
    let dateParts = (message?["published-print"] as? [String: Any])?["date-parts"] as? [[Int]]
    let year = dateParts?.first?.first

    return APAResult(
        author: author, title: title, journal: journal.first ?? "Unknown",
        volume: volume, issue: issue, pages: pages, year: year
    )
}

func printAPACitation(doi: String) async throws {
    let data = try await fetchAPAData(doi: doi)
    let citation = "\(data.author) (\(data.year ?? 0)). \(data.title). \(data.journal)"
    print(citation)
}

func printAPARef(doi: String) async throws {
    let data = try await fetchAPAData(doi: doi)
    var ref = "\(data.author) (\(data.year ?? 0)). \(data.title). "
    ref += data.journal
    if let vol = data.volume { ref += ", \(vol)" }
    if let issue = data.issue { ref += "(\(issue))" }
    if let pages = data.pages { ref += ", \(pages)" }
    ref += ". https://doi.org/\(doi)"
    print(ref)
}
