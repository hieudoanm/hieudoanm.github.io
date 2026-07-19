import XCTest
@testable import hieudoanm

final class ChatTests: XCTestCase {
    func testChatMessage_codable() throws {
        let message = ChatMessage(role: "user", content: "hello")
        let data = try JSONEncoder().encode(message)
        let decoded = try JSONDecoder().decode(ChatMessage.self, from: data)
        XCTAssertEqual(decoded.role, "user")
        XCTAssertEqual(decoded.content, "hello")
    }

    func testChatMessage_json() throws {
        let message = ChatMessage(role: "assistant", content: "Hi there!")
        let data = try JSONEncoder().encode(message)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: String]
        XCTAssertEqual(json?["role"], "assistant")
        XCTAssertEqual(json?["content"], "Hi there!")
    }

    func testChatConfig_default() {
        let config = ChatConfig.default
        XCTAssertEqual(config.model, "openai/gpt-4o-mini")
        XCTAssertEqual(config.temperature, 0.7)
        XCTAssertEqual(config.maxTokens, 4096)
    }

    func testChatConfig_custom() {
        let config = ChatConfig(
            apiKey: "test-key",
            model: "custom/model",
            temperature: 0.5,
            maxTokens: 1024
        )
        XCTAssertEqual(config.apiKey, "test-key")
        XCTAssertEqual(config.model, "custom/model")
        XCTAssertEqual(config.temperature, 0.5)
        XCTAssertEqual(config.maxTokens, 1024)
    }

    func testChatEngine_init() {
        let engine = ChatEngine(config: ChatConfig(apiKey: "", model: "test", temperature: 0, maxTokens: 1))
        XCTAssertNotNil(engine)
    }
}
