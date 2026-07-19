import XCTest
@testable import hieudoanm

final class VersionTests: XCTestCase {
    func testCommandConfig() {
        XCTAssertEqual(VersionCommand.configuration.commandName, "version")
    }
}
