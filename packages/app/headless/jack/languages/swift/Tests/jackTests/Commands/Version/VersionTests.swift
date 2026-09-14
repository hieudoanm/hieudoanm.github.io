import XCTest
@testable import jack

final class VersionTests: XCTestCase {
    func testCommandConfig() {
        XCTAssertEqual(VersionCommand.configuration.commandName, "version")
    }
}
