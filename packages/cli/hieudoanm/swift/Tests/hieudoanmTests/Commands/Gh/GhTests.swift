import XCTest
@testable import hieudoanm

final class GhTests: XCTestCase {
    func testEscXml() {
        XCTAssertEqual(escXml("hello"), "hello")
        XCTAssertEqual(escXml("a&b"), "a&amp;b")
        XCTAssertEqual(escXml("<tag>"), "&lt;tag&gt;")
        XCTAssertEqual(escXml("'quotes'"), "&apos;quotes&apos;")
        XCTAssertEqual(escXml("\"double\""), "&quot;double&quot;")
        XCTAssertEqual(escXml("&<>'\""), "&amp;&lt;&gt;&apos;&quot;")
    }

    func testLanguageColor_known() {
        XCTAssertEqual(languageColor("Swift"), "#F05138")
        XCTAssertEqual(languageColor("Python"), "#3572A5")
        XCTAssertEqual(languageColor("JavaScript"), "#F1E05A")
        XCTAssertEqual(languageColor("TypeScript"), "#3178C6")
        XCTAssertEqual(languageColor("Rust"), "#DEA584")
        XCTAssertEqual(languageColor("Go"), "#00ADD8")
    }

    func testLanguageColor_unknown() {
        XCTAssertEqual(languageColor("Brainfuck"), "#8b949e")
        XCTAssertEqual(languageColor(""), "#8b949e")
    }

    func testCommandConfig() {
        XCTAssertEqual(GhCommand.configuration.commandName, "gh")
        XCTAssertEqual(GhOG.configuration.commandName, "og")
        XCTAssertEqual(GhLanguages.configuration.commandName, "languages")
        XCTAssertEqual(GhLicense.configuration.commandName, "license")
        XCTAssertEqual(GhCoc.configuration.commandName, "coc")
        XCTAssertEqual(GhIgnore.configuration.commandName, "ignore")
    }
}
