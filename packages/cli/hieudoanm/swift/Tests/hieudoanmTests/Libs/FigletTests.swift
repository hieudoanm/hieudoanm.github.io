import XCTest
@testable import hieudoanm

final class FigletTests: XCTestCase {
    func testRender_singleLetter() {
        let result = Figlet.render("A")
        let lines = result.split(separator: "\n")
        XCTAssertEqual(lines.count, 5)
        XCTAssertTrue(lines[0].contains("█████"))
    }

    func testRender_hello() {
        let result = Figlet.render("HELLO")
        let lines = result.split(separator: "\n")
        XCTAssertEqual(lines.count, 5)
    }

    func testRender_lowercase() {
        let result = Figlet.render("hello")
        let lines = result.split(separator: "\n")
        XCTAssertEqual(lines.count, 5)
    }

    func testRender_empty() {
        let result = Figlet.render("")
        XCTAssertEqual(result, "\n\n\n\n")
    }

    func testRender_unknownCharacter() {
        let result = Figlet.render("~")
        let lines = result.split(separator: "\n")
        XCTAssertEqual(lines.count, 5)
        for line in lines {
            XCTAssertEqual(line.trimmingCharacters(in: .whitespaces), "")
        }
    }

    func testRender_mixed() {
        let result = Figlet.render("A B")
        let lines = result.split(separator: "\n")
        XCTAssertEqual(lines.count, 5)
    }
}
