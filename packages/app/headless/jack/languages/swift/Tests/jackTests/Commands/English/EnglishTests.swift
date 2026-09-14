import XCTest
@testable import jack

final class EnglishTests: XCTestCase {
    func testCommandConfig() {
        XCTAssertEqual(EnglishCommand.configuration.commandName, "english")
        XCTAssertEqual(DefineCommand.configuration.commandName, "define")
    }
}
