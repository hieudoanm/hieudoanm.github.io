import XCTest
@testable import hieudoanm

final class MorseTests: XCTestCase {
    func testConvertToMorse_lowercase() {
        XCTAssertEqual(convertToMorse("a"), ".-")
        XCTAssertEqual(convertToMorse("z"), "--..")
        XCTAssertEqual(convertToMorse("sos"), "... --- ...")
    }

    func testConvertToMorse_caseInsensitivity() {
        XCTAssertEqual(convertToMorse("A"), ".-")
        XCTAssertEqual(convertToMorse("SOS"), "... --- ...")
    }

    func testConvertToMorse_digits() {
        XCTAssertEqual(convertToMorse("0"), "-----")
        XCTAssertEqual(convertToMorse("9"), "----.")
    }

    func testConvertToMorse_punctuation() {
        XCTAssertEqual(convertToMorse("."), ".-.-.-")
        XCTAssertEqual(convertToMorse(","), "--..--")
        XCTAssertEqual(convertToMorse("?"), "..--..")
        XCTAssertEqual(convertToMorse("!"), "-.-.--")
    }

    func testConvertToMorse_phrase() {
        XCTAssertEqual(convertToMorse("hello world"), ".... . .-.. .-.. ---   .-- --- .-. .-.. -..")
    }

    func testConvertToMorse_empty() {
        XCTAssertEqual(convertToMorse(""), "")
    }

    func testConvertToMorse_unknownCharacters() {
        XCTAssertEqual(convertToMorse("~"), "~")
    }
}
