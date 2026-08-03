import Foundation
import ArgumentParser

// MARK: - Crossref API Types

struct CrossrefResponse: Codable {
    let message: CrossrefMessage?
}

struct CrossrefMessage: Codable {
    let author: [CrossrefAuthor]?
    let title: [String]?
    let containerTitle: [String]?
    let volume: String?
    let issue: String?
    let page: String?
    let publishedOnline: CrossrefDate?
    let publishedPrint: CrossrefDate?
    let publisher: String?
    let type: String?

    enum CodingKeys: String, CodingKey {
        case author, title, volume, issue, page, publisher, type
        case containerTitle = "container-title"
        case publishedOnline = "published-online"
        case publishedPrint = "published-print"
    }
}

struct CrossrefAuthor: Codable {
    let given: String?
    let family: String?
}

struct CrossrefDate: Codable {
    let dateParts: [[Int]]?

    enum CodingKeys: String, CodingKey {
        case dateParts = "date-parts"
    }
}

private func fetchDoiMetadata(doi: String) async throws -> CrossrefMessage {
    let response: CrossrefResponse = try await Requests.fetchJSON(
        "https://api.crossref.org/works/\(doi)",
        headers: ["Accept": "application/json"]
    )
    guard let message = response.message else {
        throw RequestError(message: "No data found for DOI: \(doi)", statusCode: nil)
    }
    return message
}

func formatAuthors(_ authors: [CrossrefAuthor]?) -> String {
    guard let authors = authors, !authors.isEmpty else { return "Unknown" }
    if authors.count == 1 {
        let a = authors[0]
        return "\(a.family ?? "?"), \(String((a.given ?? "?").prefix(1)))."
    } else if authors.count == 2 {
        let a1 = authors[0], a2 = authors[1]
        return "\(a1.family ?? "?") & \(a2.family ?? "?")"
    } else {
        let first = authors[0]
        return "\(first.family ?? "?") et al."
    }
}

func formatAuthorsFull(_ authors: [CrossrefAuthor]?) -> String {
    guard let authors = authors, !authors.isEmpty else { return "Unknown" }
    return authors.map { "\($0.family ?? "?"), \(String(($0.given ?? "?").prefix(1)))." }.joined(separator: ", ")
}

func getYear(_ msg: CrossrefMessage) -> String {
    if let date = msg.publishedOnline ?? msg.publishedPrint,
       let parts = date.dateParts, let first = parts.first, let year = first.first {
        return "\(year)"
    }
    return "n.d."
}

struct DoiCommand: ParsableCommand {
    static let configuration = CommandConfiguration(
        commandName: "doi",
        abstract: "DOI citation tools",
        subcommands: [CiteCommand.self, RefCommand.self, FetchCommand.self, ValidateCommand.self]
    )
    mutating func run() {}
}

// MARK: - Cite

struct CiteCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "cite", abstract: "Generate APA in-text citation from DOI")

    @Argument(help: "DOI identifier")
    var doi: String

    mutating func run() async throws {
        let msg = try await fetchDoiMetadata(doi: doi)
        let authors = formatAuthors(msg.author)
        let year = getYear(msg)
        print("(\(authors), \(year))")
    }
}

// MARK: - Ref

struct RefCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "ref", abstract: "Generate APA reference entry from DOI")

    @Argument(help: "DOI identifier")
    var doi: String

    mutating func run() async throws {
        let msg = try await fetchDoiMetadata(doi: doi)
        let authors = formatAuthorsFull(msg.author)
        let year = getYear(msg)
        let title = msg.title?.first ?? "Untitled"
        let container = msg.containerTitle?.first ?? ""
        let publisher = msg.publisher ?? ""
        let volume = msg.volume != nil ? ", \(msg.volume!)" : ""
        let issue = msg.issue != nil ? "(\(msg.issue!))" : ""
        let pages = msg.page != nil ? ", \(msg.page!)" : ""

        var ref = "\(authors) (\(year)). \(title)."
        if !container.isEmpty {
            ref += " *\(container)*\(volume)\(issue)\(pages)."
        }
        ref += " \(publisher)."
        ref += " https://doi.org/\(doi)"
        print(ref)
    }
}

// MARK: - Fetch

struct FetchCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "fetch", abstract: "Fetch DOI metadata from Crossref API")

    @Argument(help: "DOI identifier")
    var doi: String

    mutating func run() async throws {
        let url = "https://api.crossref.org/works/\(doi)"
        let response = try await Requests.fetch(url)
        let json = try JSONSerialization.jsonObject(with: response.data)
        let pretty = try JSONSerialization.data(withJSONObject: json, options: [.prettyPrinted])
        print(String(data: pretty, encoding: .utf8) ?? "")
    }
}

// MARK: - Validate

struct ValidateCommand: ParsableCommand {
    static let configuration = CommandConfiguration(commandName: "validate", abstract: "Validate DOI format and resolve")

    @Argument(help: "DOI identifier")
    var doi: String

    mutating func run() async throws {
        guard !doi.isEmpty else {
            print("invalid: empty DOI")
            return
        }

        let doiPattern = try NSRegularExpression(pattern: "^10\\.\\d{4,}/\\S+$")
        let range = NSRange(doi.startIndex..., in: doi)
        guard doiPattern.firstMatch(in: doi, range: range) != nil else {
            print("invalid: DOI must match pattern 10.xxxx/xxxxx")
            return
        }

        let url = "https://doi.org/\(doi)"
        do {
            let response = try await Requests.fetch(url)
            if response.statusCode == 200 || response.statusCode == 302 {
                print("valid: resolves to \(url)")
            } else {
                print("invalid: HTTP \(response.statusCode)")
            }
        } catch {
            print("invalid: \(error.localizedDescription)")
        }
    }
}
