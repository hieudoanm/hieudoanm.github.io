import XCTest
@testable import hieudoanm

final class EnglishTests: XCTestCase {
    func testCommandConfig() {
        XCTAssertEqual(EnglishCommand.configuration.commandName, "english")
        XCTAssertEqual(DefineCommand.configuration.commandName, "define")
    }
}
