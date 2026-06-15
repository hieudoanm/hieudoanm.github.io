import XCTest
@testable import hieudoanm

final class DoiTests: XCTestCase {
    // MARK: - FormatAuthors

    func testFormatAuthors_nil() {
        XCTAssertEqual(formatAuthors(nil), "Unknown")
    }

    func testFormatAuthors_empty() {
        XCTAssertEqual(formatAuthors([]), "Unknown")
    }

    func testFormatAuthors_single() {
        let authors = [CrossrefAuthor(given: "John", family: "Doe")]
        XCTAssertEqual(formatAuthors(authors), "Doe, J.")
    }

    func testFormatAuthors_two() {
        let authors = [
            CrossrefAuthor(given: "John", family: "Doe"),
            CrossrefAuthor(given: "Jane", family: "Smith"),
        ]
        XCTAssertEqual(formatAuthors(authors), "Doe & Smith")
    }

    func testFormatAuthors_three() {
        let authors = [
            CrossrefAuthor(given: "John", family: "Doe"),
            CrossrefAuthor(given: "Jane", family: "Smith"),
            CrossrefAuthor(given: "Bob", family: "Jones"),
        ]
        XCTAssertEqual(formatAuthors(authors), "Doe et al.")
    }

    func testFormatAuthors_missingNames() {
        let authors = [CrossrefAuthor(given: nil, family: nil)]
        XCTAssertEqual(formatAuthors(authors), "?, ?.")
    }

    // MARK: - FormatAuthorsFull

    func testFormatAuthorsFull_nil() {
        XCTAssertEqual(formatAuthorsFull(nil), "Unknown")
    }

    func testFormatAuthorsFull_multiple() {
        let authors = [
            CrossrefAuthor(given: "John", family: "Doe"),
            CrossrefAuthor(given: "Jane", family: "Smith"),
        ]
        XCTAssertEqual(formatAuthorsFull(authors), "Doe, J., Smith, J.")
    }

    // MARK: - GetYear

    func testGetYear_withOnlineDate() {
        let date = CrossrefDate(dateParts: [[2024, 3, 15]])
        let msg = CrossrefMessage(
            author: nil, title: nil, containerTitle: nil,
            volume: nil, issue: nil, page: nil,
            publishedOnline: date, publishedPrint: nil,
            publisher: nil, type: nil
        )
        XCTAssertEqual(getYear(msg), "2024")
    }

    func testGetYear_withPrintDate() {
        let date = CrossrefDate(dateParts: [[2020]])
        let msg = CrossrefMessage(
            author: nil, title: nil, containerTitle: nil,
            volume: nil, issue: nil, page: nil,
            publishedOnline: nil, publishedPrint: date,
            publisher: nil, type: nil
        )
        XCTAssertEqual(getYear(msg), "2020")
    }

    func testGetYear_onlinePreferredOverPrint() {
        let online = CrossrefDate(dateParts: [[2024]])
        let print = CrossrefDate(dateParts: [[2020]])
        let msg = CrossrefMessage(
            author: nil, title: nil, containerTitle: nil,
            volume: nil, issue: nil, page: nil,
            publishedOnline: online, publishedPrint: print,
            publisher: nil, type: nil
        )
        XCTAssertEqual(getYear(msg), "2024")
    }

    func testGetYear_noDate() {
        let msg = CrossrefMessage(
            author: nil, title: nil, containerTitle: nil,
            volume: nil, issue: nil, page: nil,
            publishedOnline: nil, publishedPrint: nil,
            publisher: nil, type: nil
        )
        XCTAssertEqual(getYear(msg), "n.d.")
    }

    // MARK: - CrossrefResponse coding

    func testCrossrefResponse_decoding() throws {
        let json = """
        {
            "message": {
                "author": [{"given": "John", "family": "Doe"}],
                "title": ["Test Title"],
                "container-title": ["Test Journal"],
                "volume": "10",
                "issue": "2",
                "page": "100-110",
                "publisher": "Test Publisher",
                "type": "journal-article",
                "published-online": {"date-parts": [[2024, 3, 15]]}
            }
        }
        """
        let data = try XCTUnwrap(json.data(using: .utf8))
        let response = try JSONDecoder().decode(CrossrefResponse.self, from: data)
        let msg = try XCTUnwrap(response.message)
        XCTAssertEqual(msg.author?.first?.given, "John")
        XCTAssertEqual(msg.author?.first?.family, "Doe")
        XCTAssertEqual(msg.title?.first, "Test Title")
        XCTAssertEqual(msg.containerTitle?.first, "Test Journal")
        XCTAssertEqual(msg.volume, "10")
        XCTAssertEqual(msg.issue, "2")
        XCTAssertEqual(msg.page, "100-110")
        XCTAssertEqual(msg.publisher, "Test Publisher")
        XCTAssertEqual(msg.type, "journal-article")
        XCTAssertEqual(msg.publishedOnline?.dateParts, [[2024, 3, 15]])
    }
}
