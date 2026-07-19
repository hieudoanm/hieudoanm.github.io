import XCTest

final class StringCmdTests: XCTestCase {
    func testCapitalise() {
        XCTAssertEqual("hello world".capitalized, "Hello World")
        XCTAssertEqual("HELLO".capitalized, "Hello")
        XCTAssertEqual("".capitalized, "")
    }

    func testDeburr() {
        let text = "café"
        let result = text.folding(options: .diacriticInsensitive, locale: nil)
        XCTAssertEqual(result, "cafe")

        let text2 = "voilà"
        let result2 = text2.folding(options: .diacriticInsensitive, locale: nil)
        XCTAssertEqual(result2, "voila")

        let text3 = "München"
        let result3 = text3.folding(options: .diacriticInsensitive, locale: nil)
        XCTAssertEqual(result3, "Munchen")

        let text4 = "résumé"
        let result4 = text4.folding(options: .diacriticInsensitive, locale: nil)
        XCTAssertEqual(result4, "resume")
    }

    func testKebabCase() {
        func kebab(_ s: String) -> String { s.lowercased().replacingOccurrences(of: " ", with: "-") }
        XCTAssertEqual(kebab("hello world"), "hello-world")
        XCTAssertEqual(kebab("Hello World"), "hello-world")
        XCTAssertEqual(kebab("HELLO"), "hello")
        XCTAssertEqual(kebab("hello  world"), "hello--world")
        XCTAssertEqual(kebab(""), "")
    }

    func testSnakeCase() {
        func snake(_ s: String) -> String { s.lowercased().replacingOccurrences(of: " ", with: "_") }
        XCTAssertEqual(snake("hello world"), "hello_world")
        XCTAssertEqual(snake("Hello World"), "hello_world")
        XCTAssertEqual(snake("HELLO"), "hello")
        XCTAssertEqual(snake(""), "")
    }

    func testLowerCase() {
        XCTAssertEqual("Hello World".lowercased(), "hello world")
        XCTAssertEqual("HELLO".lowercased(), "hello")
        XCTAssertEqual("hello".lowercased(), "hello")
        XCTAssertEqual("".lowercased(), "")
    }

    func testUpperCase() {
        XCTAssertEqual("Hello World".uppercased(), "HELLO WORLD")
        XCTAssertEqual("hello".uppercased(), "HELLO")
        XCTAssertEqual("HELLO".uppercased(), "HELLO")
        XCTAssertEqual("".uppercased(), "")
    }
}
