import XCTest
@testable import hieudoanm

final class BrailleTests: XCTestCase {
    func testConvertToBraille_lowercase() {
        XCTAssertEqual(convertToBraille("a"), "⠁")
        XCTAssertEqual(convertToBraille("z"), "⠵")
        XCTAssertEqual(convertToBraille("hello"), "⠓⠑⠇⠇⠕")
    }

    func testConvertToBraille_uppercase() {
        XCTAssertEqual(convertToBraille("A"), "⠠⠁")
        XCTAssertEqual(convertToBraille("Z"), "⠠⠵")
        XCTAssertEqual(convertToBraille("Hello"), "⠠⠓⠑⠇⠇⠕")
    }

    func testConvertToBraille_digits() {
        XCTAssertEqual(convertToBraille("1"), "⠼⠁")
        XCTAssertEqual(convertToBraille("9"), "⠼⠊")
        XCTAssertEqual(convertToBraille("0"), "⠼⠚")
    }

    func testConvertToBraille_space() {
        XCTAssertEqual(convertToBraille("a b"), "⠁ ⠃")
    }

    func testConvertToBraille_unknownCharacters() {
        XCTAssertEqual(convertToBraille("!"), "!")
        XCTAssertEqual(convertToBraille("?"), "?")
    }

    func testConvertToBraille_mixed() {
        XCTAssertEqual(convertToBraille("Hi1"), "⠠⠓⠊⠼⠁")
    }

    func testConvertToBraille_empty() {
        XCTAssertEqual(convertToBraille(""), "")
    }
}

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
