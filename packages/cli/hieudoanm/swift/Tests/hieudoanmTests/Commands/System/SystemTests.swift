import XCTest
@testable import hieudoanm

final class SystemTests: XCTestCase {
    func testCommandConfig() {
        XCTAssertEqual(SystemCommand.configuration.commandName, "system")
        XCTAssertEqual(SystemInfo.configuration.commandName, "info")
        XCTAssertEqual(SystemEnv.configuration.commandName, "env")
        XCTAssertEqual(SystemPath.configuration.commandName, "path")
        XCTAssertEqual(SystemDisk.configuration.commandName, "disk")
        XCTAssertEqual(SystemBattery.configuration.commandName, "battery")
        XCTAssertEqual(SystemMonitor.configuration.commandName, "monitor")
        XCTAssertEqual(SystemClipboard.configuration.commandName, "clipboard")
    }
}
