import XCTest
@testable import hieudoanm

final class SearchTests: XCTestCase {
    func testFindMatches_basic() {
        let content = "func hello() {\n    print(\"world\")\n}"
        let matches = findMatches(content: content, pattern: "func hello")
        XCTAssertEqual(matches.count, 1)
        XCTAssertEqual(matches[0].line, 1)
        XCTAssertTrue(matches[0].lineContent.contains("func hello()"))
    }

    func testFindMatches_noMatch() {
        let content = "just some text"
        let matches = findMatches(content: content, pattern: "func")
        XCTAssertTrue(matches.isEmpty)
    }

    func testFindMatches_multiple() {
        let content = "func foo() {}\nfunc bar() {}\nfunc baz() {}"
        let matches = findMatches(content: content, pattern: "func \\w+")
        XCTAssertEqual(matches.count, 3)
    }

    func testFindMatches_invalidPattern() {
        let matches = findMatches(content: "hello", pattern: "[invalid")
        XCTAssertTrue(matches.isEmpty)
    }

    func testParseDuckDuckGoResults_empty() {
        let results = parseDuckDuckGoResults("<html></html>")
        XCTAssertTrue(results.isEmpty)
    }

    func testParseDuckDuckGoResults_noResults() {
        let html = "<html><body>nothing here</body></html>"
        let results = parseDuckDuckGoResults(html)
        XCTAssertTrue(results.isEmpty)
    }

    func testParseDuckDuckGoResults_withResult() {
        let html = """
        <div class="result-link"><a href="https://example.com">Example</a></div>
        <div class="result-snippet">A sample site</div>
        """
        let results = parseDuckDuckGoResults(html)
        XCTAssertEqual(results.count, 1)
        XCTAssertEqual(results[0].title, "Example")
        XCTAssertEqual(results[0].url, "https://example.com")
    }

    func testCommandConfig() {
        XCTAssertEqual(SearchCommand.configuration.commandName, "search")
        XCTAssertEqual(SearchFiles.configuration.commandName, "files")
        XCTAssertEqual(SearchText.configuration.commandName, "text")
        XCTAssertEqual(SearchCode.configuration.commandName, "code")
        XCTAssertEqual(SearchWeb.configuration.commandName, "web")
    }
}
