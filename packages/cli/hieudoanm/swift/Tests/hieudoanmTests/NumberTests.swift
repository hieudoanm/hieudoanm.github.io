import XCTest
@testable import hieudoanm

final class NumberTests: XCTestCase {
    func testAddZero() {
        XCTAssertEqual(addZero(n: 0), "00")
        XCTAssertEqual(addZero(n: 1), "01")
        XCTAssertEqual(addZero(n: 9), "09")
    }

    func testAddZero_outOfRange() {
        XCTAssertEqual(addZero(n: 10), "10")
        XCTAssertEqual(addZero(n: 100), "100")
        XCTAssertEqual(addZero(n: -1), "-1")
    }

    func testComma() {
        XCTAssertEqual(comma(n: 0), "0")
        XCTAssertEqual(comma(n: 1), "1")
        XCTAssertEqual(comma(n: 1000), "1,000")
        XCTAssertEqual(comma(n: 1000000), "1,000,000")
        XCTAssertEqual(comma(n: 1234567), "1,234,567")
    }

    func testComma_negative() {
        XCTAssertEqual(comma(n: -1000), "-1,000")
        XCTAssertEqual(comma(n: -1234567), "-1,234,567")
    }
}
