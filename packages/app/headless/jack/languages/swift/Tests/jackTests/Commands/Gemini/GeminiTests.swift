import XCTest
@testable import jack

final class GeminiTests: XCTestCase {
    func testCommandConfig() {
        XCTAssertEqual(GeminiCommand.configuration.commandName, "gemini")
        XCTAssertEqual(GeminiCode.configuration.commandName, "code")
    }
}
