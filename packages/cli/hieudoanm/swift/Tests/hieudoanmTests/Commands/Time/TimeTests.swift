import XCTest
@testable import hieudoanm

final class TimeTests: XCTestCase {
    // MARK: - Cron Matching

    func testCronMatches_everyMinute() {
        let parts = ["*", "*", "*", "*", "*"]
        let date = Date()
        XCTAssertTrue(cronMatches(parts, date: date))
    }

    func testCronMatches_exactMinute() {
        let parts = ["30", "*", "*", "*", "*"]
        var cal = Calendar.current
        // Create a date at minute 30
        let date = cal.date(bySetting: .minute, value: 30, of: Date())!
        XCTAssertTrue(cronMatches(parts, date: date))
    }

    func testCronMatches_wrongMinute() {
        let parts = ["0", "*", "*", "*", "*"]
        var cal = Calendar.current
        let date = cal.date(bySetting: .minute, value: 15, of: Date())!
        XCTAssertFalse(cronMatches(parts, date: date))
    }

    func testCronMatches_stepMinute() {
        let parts = ["*/5", "*", "*", "*", "*"]
        var cal = Calendar.current
        let date = cal.date(bySetting: .minute, value: 10, of: Date())!
        XCTAssertTrue(cronMatches(parts, date: date))
    }

    func testCronMatches_stepMinute_notMatch() {
        let parts = ["*/5", "*", "*", "*", "*"]
        var cal = Calendar.current
        let date = cal.date(bySetting: .minute, value: 7, of: Date())!
        XCTAssertFalse(cronMatches(parts, date: date))
    }

    func testCronMatches_list() {
        let parts = ["5,10,15", "*", "*", "*", "*"]
        var cal = Calendar.current
        let date = cal.date(bySetting: .minute, value: 10, of: Date())!
        XCTAssertTrue(cronMatches(parts, date: date))
    }

    func testCronMatches_list_notMatch() {
        let parts = ["5,10,15", "*", "*", "*", "*"]
        var cal = Calendar.current
        let date = cal.date(bySetting: .minute, value: 7, of: Date())!
        XCTAssertFalse(cronMatches(parts, date: date))
    }

    func testCronMatches_range() {
        let parts = ["10-20", "*", "*", "*", "*"]
        var cal = Calendar.current
        let date = cal.date(bySetting: .minute, value: 15, of: Date())!
        XCTAssertTrue(cronMatches(parts, date: date))
    }

    func testCronMatches_range_outside() {
        let parts = ["10-20", "*", "*", "*", "*"]
        var cal = Calendar.current
        let date = cal.date(bySetting: .minute, value: 25, of: Date())!
        XCTAssertFalse(cronMatches(parts, date: date))
    }

    func testCronMatches_specificHour() {
        let parts = ["0", "9", "*", "*", "*"]
        var cal = Calendar.current
        var date = cal.date(bySetting: .minute, value: 0, of: Date())!
        date = cal.date(bySetting: .hour, value: 9, of: date)!
        XCTAssertTrue(cronMatches(parts, date: date))
    }

    func testCronMatches_wrongHour() {
        let parts = ["0", "9", "*", "*", "*"]
        var cal = Calendar.current
        var date = cal.date(bySetting: .minute, value: 0, of: Date())!
        date = cal.date(bySetting: .hour, value: 10, of: date)!
        XCTAssertFalse(cronMatches(parts, date: date))
    }

    // MARK: - Duration Parsing

    func testParseDuration_seconds() {
        XCTAssertEqual(parseDuration("30s"), 30)
        XCTAssertEqual(parseDuration("0s"), 0)
    }

    func testParseDuration_minutes() {
        XCTAssertEqual(parseDuration("5m"), 300)
        XCTAssertEqual(parseDuration("1m"), 60)
    }

    func testParseDuration_hours() {
        XCTAssertEqual(parseDuration("2h"), 7200)
        XCTAssertEqual(parseDuration("1h"), 3600)
    }

    func testParseDuration_plainNumber() {
        XCTAssertEqual(parseDuration("90"), 90)
    }

    func testParseDuration_invalidReturnsZero() {
        XCTAssertEqual(parseDuration("abc"), 0)
    }

    func testParseDuration_caseInsensitive() {
        XCTAssertEqual(parseDuration("5M"), 300)
        XCTAssertEqual(parseDuration("1H"), 3600)
    }

    func testParseDuration_empty() {
        XCTAssertEqual(parseDuration(""), 0)
    }
}
