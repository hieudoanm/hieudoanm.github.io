import XCTest
@testable import hieudoanm

final class TelegramTests: XCTestCase {
    func testCommandConfig() {
        XCTAssertEqual(TelegramCommand.configuration.commandName, "telegram")
        XCTAssertEqual(TelegramMessageSend.configuration.commandName, "send")
        XCTAssertEqual(TelegramWebhookSet.configuration.commandName, "set")
        XCTAssertEqual(TelegramWebhookInfo.configuration.commandName, "info")
        XCTAssertEqual(TelegramWebhookDelete.configuration.commandName, "delete")
    }
}
