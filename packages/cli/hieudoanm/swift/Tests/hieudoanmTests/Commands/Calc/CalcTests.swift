import XCTest
@testable import hieudoanm

final class CalcTests: XCTestCase {
    func testCalcGcd() {
        XCTAssertEqual(calcGcd(12, 8), 4)
        XCTAssertEqual(calcGcd(17, 5), 1)
        XCTAssertEqual(calcGcd(0, 5), 5)
        XCTAssertEqual(calcGcd(12, 0), 12)
        XCTAssertEqual(calcGcd(-12, 8), 4)
        XCTAssertEqual(calcGcd(0, 0), 0)
    }

    func testCalcLcm() {
        XCTAssertEqual(calcLcm(4, 6), 12)
        XCTAssertEqual(calcLcm(3, 5), 15)
        XCTAssertEqual(calcLcm(0, 5), 0)
        XCTAssertEqual(calcLcm(0, 0), 0)
    }

    func testCalcErrorDescription() {
        XCTAssertEqual(CalcError.conversionFailed.description, "Currency conversion failed")
    }
}
