import XCTest
@testable import hieudoanm

final class TerminalColorsTests: XCTestCase {
    // In non-TTY environments (test runner), colorize returns plain text
    func testGreen() {
        let result = green("hello")
        XCTAssertEqual(result, "hello")
    }

    func testRed() {
        let result = red("world")
        XCTAssertEqual(result, "world")
    }

    func testYellow() {
        let result = yellow("test")
        XCTAssertEqual(result, "test")
    }

    func testCyan() {
        let result = cyan("test")
        XCTAssertEqual(result, "test")
    }

    func testDim() {
        let result = dim("test")
        XCTAssertEqual(result, "test")
    }

    func testBlue() {
        let result = blue("test")
        XCTAssertEqual(result, "test")
    }

    func testGray() {
        let result = gray("test")
        XCTAssertEqual(result, "test")
    }

    func testColorize_plainInNonTTY() {
        let result = colorize("31", "error")
        XCTAssertEqual(result, "error")
    }

    func testColorize_preservesText() {
        let texts = ["hello", "world", "test", ""]
        for text in texts {
            XCTAssertEqual(green(text), text)
            XCTAssertEqual(red(text), text)
            XCTAssertEqual(colorize("42", text), text)
        }
    }
}
