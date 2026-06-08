import XCTest
@testable import hieudoanm

final class EnglishTests: XCTestCase {
    func testNumberToEnglish_zero() {
        XCTAssertEqual(numberToEnglish(0), "zero")
    }

    func testNumberToEnglish_ones() {
        XCTAssertEqual(numberToEnglish(1), "one")
        XCTAssertEqual(numberToEnglish(9), "nine")
    }

    func testNumberToEnglish_teens() {
        XCTAssertEqual(numberToEnglish(10), "ten")
        XCTAssertEqual(numberToEnglish(11), "eleven")
        XCTAssertEqual(numberToEnglish(19), "nineteen")
    }

    func testNumberToEnglish_tens() {
        XCTAssertEqual(numberToEnglish(20), "twenty")
        XCTAssertEqual(numberToEnglish(21), "twenty-one")
        XCTAssertEqual(numberToEnglish(99), "ninety-nine")
    }

    func testNumberToEnglish_hundreds() {
        XCTAssertEqual(numberToEnglish(100), "one hundred")
        XCTAssertEqual(numberToEnglish(101), "one hundred one")
        XCTAssertEqual(numberToEnglish(110), "one hundred ten")
        XCTAssertEqual(numberToEnglish(111), "one hundred eleven")
        XCTAssertEqual(numberToEnglish(120), "one hundred twenty")
        XCTAssertEqual(numberToEnglish(999), "nine hundred ninety-nine")
    }

    func testNumberToEnglish_thousands() {
        XCTAssertEqual(numberToEnglish(1000), "one thousand")
        XCTAssertEqual(numberToEnglish(1001), "one thousand one")
        XCTAssertEqual(numberToEnglish(1100), "one thousand one hundred")
        XCTAssertEqual(numberToEnglish(9999), "nine thousand nine hundred ninety-nine")
    }

    func testNumberToEnglish_millions() {
        XCTAssertEqual(numberToEnglish(1000000), "one million")
        XCTAssertEqual(numberToEnglish(1000001), "one million one")
        XCTAssertEqual(numberToEnglish(1234567), "one million two hundred thirty-four thousand five hundred sixty-seven")
    }

    func testNumberToEnglish_billions() {
        XCTAssertEqual(numberToEnglish(1000000000), "one billion")
        XCTAssertEqual(numberToEnglish(1234567890), "one billion two hundred thirty-four million five hundred sixty-seven thousand eight hundred ninety")
    }

    func testNumberToEnglish_negative() {
        XCTAssertEqual(numberToEnglish(-1), "negative one")
        XCTAssertEqual(numberToEnglish(-100), "negative one hundred")
        XCTAssertEqual(numberToEnglish(-1234567), "negative one million two hundred thirty-four thousand five hundred sixty-seven")
    }

    func testConvertChunk() {
        let ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
                     "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
                     "seventeen", "eighteen", "nineteen"]
        let tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

        XCTAssertEqual(convertChunk(0, ones: ones, tens: tens), "")
        XCTAssertEqual(convertChunk(5, ones: ones, tens: tens), "five")
        XCTAssertEqual(convertChunk(15, ones: ones, tens: tens), "fifteen")
        XCTAssertEqual(convertChunk(50, ones: ones, tens: tens), "fifty")
        XCTAssertEqual(convertChunk(55, ones: ones, tens: tens), "fifty-five")
        XCTAssertEqual(convertChunk(100, ones: ones, tens: tens), "one hundred")
        XCTAssertEqual(convertChunk(115, ones: ones, tens: tens), "one hundred fifteen")
        XCTAssertEqual(convertChunk(350, ones: ones, tens: tens), "three hundred fifty")
        XCTAssertEqual(convertChunk(999, ones: ones, tens: tens), "nine hundred ninety-nine")
    }
}
