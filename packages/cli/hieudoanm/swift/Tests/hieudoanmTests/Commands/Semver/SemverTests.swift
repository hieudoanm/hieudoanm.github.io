import XCTest
@testable import hieudoanm

final class SemverTests: XCTestCase {
    // MARK: - Parse

    func testParse_valid() {
        XCTAssertNotNil(SemVer.parse("1.2.3"))
        XCTAssertNotNil(SemVer.parse("0.0.0"))
        XCTAssertNotNil(SemVer.parse("10.20.30"))
        XCTAssertNotNil(SemVer.parse("1.0.0-alpha"))
        XCTAssertNotNil(SemVer.parse("1.0.0+build"))
        XCTAssertNotNil(SemVer.parse("1.0.0-alpha+build"))
        XCTAssertNotNil(SemVer.parse("1.0.0-alpha.1.beta"))
    }

    func testParse_invalid() {
        XCTAssertNil(SemVer.parse(""))
        XCTAssertNil(SemVer.parse("1"))
        XCTAssertNil(SemVer.parse("1.2"))
        XCTAssertNil(SemVer.parse("01.2.3"))
        XCTAssertNil(SemVer.parse("1.02.3"))
        XCTAssertNil(SemVer.parse("1.2.03"))
        XCTAssertNil(SemVer.parse("a.b.c"))
        XCTAssertNil(SemVer.parse("1.2.3."))
    }

    // MARK: - Compare

    func testCompare_equal() {
        let a = SemVer.parse("1.2.3")!
        let b = SemVer.parse("1.2.3")!
        XCTAssertEqual(a.compare(b), .equal)
    }

    func testCompare_major() {
        let a = SemVer.parse("2.0.0")!
        let b = SemVer.parse("1.0.0")!
        XCTAssertEqual(a.compare(b), .greater)
        XCTAssertEqual(b.compare(a), .less)
    }

    func testCompare_minor() {
        let a = SemVer.parse("1.2.0")!
        let b = SemVer.parse("1.1.0")!
        XCTAssertEqual(a.compare(b), .greater)
        XCTAssertEqual(b.compare(a), .less)
    }

    func testCompare_patch() {
        let a = SemVer.parse("1.0.3")!
        let b = SemVer.parse("1.0.2")!
        XCTAssertEqual(a.compare(b), .greater)
        XCTAssertEqual(b.compare(a), .less)
    }

    func testCompare_prerelease() {
        let base = SemVer.parse("1.0.0")!
        let pre = SemVer.parse("1.0.0-alpha")!
        XCTAssertEqual(base.compare(pre), .greater)
        XCTAssertEqual(pre.compare(base), .less)
    }

    func testCompare_prereleaseNumeric() {
        let a = SemVer.parse("1.0.0-2")!
        let b = SemVer.parse("1.0.0-10")!
        XCTAssertEqual(a.compare(b), .less)
        XCTAssertEqual(b.compare(a), .greater)
    }

    func testCompare_prereleaseString() {
        let a = SemVer.parse("1.0.0-alpha")!
        let b = SemVer.parse("1.0.0-beta")!
        XCTAssertEqual(a.compare(b), .less)
        XCTAssertEqual(b.compare(a), .greater)
    }

    // MARK: - Operators

    func testOperators() {
        let v1 = SemVer.parse("1.0.0")!
        let v2 = SemVer.parse("2.0.0")!
        XCTAssertTrue(v1 < v2)
        XCTAssertTrue(v2 > v1)
        XCTAssertTrue(v1 <= v2)
        XCTAssertTrue(v2 >= v1)
        XCTAssertTrue(v1 == SemVer.parse("1.0.0")!)
    }

    // MARK: - Description

    func testDescription() {
        XCTAssertEqual(SemVer.parse("1.2.3")!.description, "1.2.3")
        XCTAssertEqual(SemVer.parse("1.0.0-alpha")!.description, "1.0.0-alpha")
        XCTAssertEqual(SemVer.parse("1.0.0+build")!.description, "1.0.0+build")
        XCTAssertEqual(SemVer.parse("1.0.0-alpha+build")!.description, "1.0.0-alpha+build")
    }

    // MARK: - CheckRange

    func testCheckRange_caret() {
        let v = SemVer.parse("1.3.0")!
        XCTAssertTrue(checkRange(v, range: "^1.2.3"))
        XCTAssertFalse(checkRange(v, range: "^2.0.0"))
    }

    func testCheckRange_tilde() {
        let v = SemVer.parse("1.2.5")!
        XCTAssertTrue(checkRange(v, range: "~1.2.3"))
        XCTAssertFalse(checkRange(v, range: "~1.3.0"))
    }

    func testCheckRange_exact() {
        let v = SemVer.parse("1.2.3")!
        XCTAssertTrue(checkRange(v, range: "1.2.3"))
        XCTAssertFalse(checkRange(v, range: "1.2.4"))
    }

    func testCheckRange_compound() {
        let v = SemVer.parse("1.5.0")!
        XCTAssertTrue(checkRange(v, range: ">=1.0.0 <2.0.0"))
        XCTAssertFalse(checkRange(v, range: ">=2.0.0 <3.0.0"))
    }

    func testCheckRange_greaterThanOrEqual() {
        let v = SemVer.parse("2.0.0")!
        XCTAssertTrue(checkRange(v, range: ">=1.0.0"))
        XCTAssertTrue(checkRange(v, range: ">=2.0.0"))
        XCTAssertFalse(checkRange(v, range: ">=3.0.0"))
    }

    func testCheckRange_lessThan() {
        let v = SemVer.parse("1.5.0")!
        XCTAssertTrue(checkRange(v, range: "<2.0.0"))
        XCTAssertFalse(checkRange(v, range: "<1.5.0"))
    }
}
