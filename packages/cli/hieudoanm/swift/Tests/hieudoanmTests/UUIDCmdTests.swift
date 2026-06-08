import XCTest
@testable import hieudoanm

final class UUIDCmdTests: XCTestCase {
    func testUUIDv4_format() {
        let uuid = Foundation.UUID().uuidString
        let pattern = try! NSRegularExpression(pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$", options: [.caseInsensitive])
        let range = NSRange(location: 0, length: uuid.count)
        XCTAssertNotNil(pattern.firstMatch(in: uuid, options: [], range: range))
    }

    func testUUIDv4_uniqueness() {
        let uuids = (0..<100).map { _ in Foundation.UUID().uuidString }
        let unique = Set(uuids)
        XCTAssertEqual(unique.count, 100)
    }

    func testUUIDv7_format() {
        let uuid = generateUUIDv7()
        // UUID v7 format: version nibble is 7
        let pattern = try! NSRegularExpression(pattern: "^[0-9A-F]{8}-[0-9A-F]{4}-7[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$", options: [.caseInsensitive])
        let range = NSRange(location: 0, length: uuid.count)
        XCTAssertNotNil(pattern.firstMatch(in: uuid, options: [], range: range), "UUID v7 format mismatch: \(uuid)")
    }

    func testUUIDv7_uniqueness() {
        let uuids = (0..<100).map { _ in generateUUIDv7() }
        let unique = Set(uuids)
        XCTAssertEqual(unique.count, 100)
    }

    func testUUIDv7_timestampBased() {
        let first = generateUUIDv7()
        let second = generateUUIDv7()
        // UUID v7 embeds ms timestamp; two sequential calls should differ
        XCTAssertNotEqual(first, second)
    }
}
