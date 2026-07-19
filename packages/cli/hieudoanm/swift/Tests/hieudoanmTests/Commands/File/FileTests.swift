import XCTest
@testable import hieudoanm

final class FileTests: XCTestCase {
    func testStringSplitByCharacterSet() {
        let result = "hello world foo bar".split(by: .whitespacesAndNewlines)
        XCTAssertEqual(result, ["hello", "world", "foo", "bar"])
    }

    func testStringSplit_emptyResult() {
        let result = "".split(by: .whitespacesAndNewlines)
        XCTAssertEqual(result, [])
    }

    func testStringSplit_consecutiveSpaces() {
        let result = "a  b".split(by: .whitespaces)
        XCTAssertEqual(result, ["a", "b"])
    }
}
