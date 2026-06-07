import XCTest
@testable import hieudoanm

final class DataTests: XCTestCase {
    func testParseCSVLine_basic() {
        let result = CsvCommand.parseCSVLine("a,b,c")
        XCTAssertEqual(result, ["a", "b", "c"])
    }

    func testParseCSVLine_withQuotes() {
        let result = CsvCommand.parseCSVLine("\"hello, world\",foo,bar")
        XCTAssertEqual(result, ["hello, world", "foo", "bar"])
    }

    func testParseCSVLine_singleField() {
        let result = CsvCommand.parseCSVLine("onlyone")
        XCTAssertEqual(result, ["onlyone"])
    }

    func testParseCSVLine_emptyField() {
        let result = CsvCommand.parseCSVLine("a,,c")
        XCTAssertEqual(result, ["a", "", "c"])
    }

    func testParseYAMLValue_int() {
        let val = YmlCommand.parseYAMLValue("42")
        XCTAssertEqual(val as? Int, 42)
    }

    func testParseYAMLValue_double() {
        let val = YmlCommand.parseYAMLValue("3.14")
        XCTAssertEqual(val as? Double, 3.14)
    }

    func testParseYAMLValue_boolTrue() {
        XCTAssertEqual(YmlCommand.parseYAMLValue("true") as? Bool, true)
        XCTAssertEqual(YmlCommand.parseYAMLValue("yes") as? Bool, true)
    }

    func testParseYAMLValue_boolFalse() {
        XCTAssertEqual(YmlCommand.parseYAMLValue("false") as? Bool, false)
        XCTAssertEqual(YmlCommand.parseYAMLValue("no") as? Bool, false)
    }

    func testParseYAMLValue_null() {
        XCTAssertTrue(YmlCommand.parseYAMLValue("null") is NSNull)
        XCTAssertTrue(YmlCommand.parseYAMLValue("~") is NSNull)
    }

    func testParseYAMLValue_string() {
        let val = YmlCommand.parseYAMLValue("hello")
        XCTAssertEqual(val as? String, "hello")
    }

    func testDataErrorDescriptions() {
        XCTAssertEqual(DataError.invalidCSV.description, "Invalid CSV format")
        XCTAssertEqual(DataError.invalidJSON.description, "Invalid JSON format")
        XCTAssertEqual(DataError.invalidFilter.description, "Invalid filter expression (use column=value)")
        XCTAssertEqual(DataError.queryNotFound(".foo").description, "Query path not found: .foo")
        XCTAssertEqual(DataError.missingArgument("--with").description, "Missing argument: --with")
    }
}
