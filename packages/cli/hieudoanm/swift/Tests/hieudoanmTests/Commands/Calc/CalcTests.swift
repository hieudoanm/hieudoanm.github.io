import XCTest
@testable import hieudoanm

final class CalcTests: XCTestCase {
    func testCalcAge() throws {
        var cmd = try CalcAge.parse(["--year", "1990", "--month", "1", "--day", "15"])
        cmd.run()
    }

    func testCalcAgeJson() throws {
        var cmd = try CalcAge.parse(["--year", "1990", "--month", "1", "--day", "15", "--json"])
        cmd.run()
    }

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
