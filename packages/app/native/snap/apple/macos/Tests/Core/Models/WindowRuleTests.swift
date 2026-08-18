import Testing
import Foundation
@testable import SnapCore

@Suite("WindowRule")
struct WindowRuleTests {

    @Test("init with defaults")
    func initWithDefaults() {
        let rule = WindowRule(bundleIdentifier: "com.test.app", zone: .leftHalf)
        #expect(rule.bundleIdentifier == "com.test.app")
        #expect(rule.title == nil)
        #expect(rule.zone == NormalizedRect.leftHalf)
    }

    @Test("init with title")
    func initWithTitle() {
        let rule = WindowRule(
            bundleIdentifier: "com.apple.Terminal",
            title: "bash",
            zone: .bottomRight
        )
        #expect(rule.title == "bash")
    }

    @Test("equality by all fields")
    func equality() {
        let id = UUID()
        let a = WindowRule(id: id, bundleIdentifier: "com.test", zone: .maximized)
        let b = WindowRule(id: id, bundleIdentifier: "com.test", zone: .maximized)
        #expect(a == b)
    }

    @Test("inequality when bundleIdentifier differs")
    func inequalityBundle() {
        let id = UUID()
        let a = WindowRule(id: id, bundleIdentifier: "com.a", zone: .leftHalf)
        let b = WindowRule(id: id, bundleIdentifier: "com.b", zone: .leftHalf)
        #expect(a != b)
    }

    @Test("inequality when zone differs")
    func inequalityZone() {
        let id = UUID()
        let a = WindowRule(id: id, bundleIdentifier: "com.test", zone: .leftHalf)
        let b = WindowRule(id: id, bundleIdentifier: "com.test", zone: .rightHalf)
        #expect(a != b)
    }

    @Test("Codable roundtrip with nil title")
    func codableNilTitle() throws {
        let original = WindowRule(bundleIdentifier: "com.test", zone: .centered)
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(WindowRule.self, from: data)
        #expect(decoded.bundleIdentifier == original.bundleIdentifier)
        #expect(decoded.title == nil)
        #expect(decoded.zone == original.zone)
    }

    @Test("Codable roundtrip with title")
    func codableWithTitle() throws {
        let original = WindowRule(
            bundleIdentifier: "com.google.Chrome",
            title: "Google",
            zone: .rightHalf
        )
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(WindowRule.self, from: data)
        #expect(decoded.title == "Google")
    }
}
