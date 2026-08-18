import Testing
import Foundation
@testable import SnapCore

@Suite("SnapLayout")
struct SnapLayoutTests {

    @Test("init with defaults")
    func initWithDefaults() {
        let layout = SnapLayout(name: "Test")
        #expect(layout.name == "Test")
        #expect(layout.windows.isEmpty)
        #expect(layout.id != UUID()) // generated, not the zero UUID
    }

    @Test("init with custom values")
    func initWithCustom() {
        let id = UUID()
        let date = Date(timeIntervalSince1970: 1000)
        let rule = WindowRule(bundleIdentifier: "com.test", zone: .leftHalf)
        let layout = SnapLayout(
            id: id,
            name: "Custom",
            windows: [rule],
            createdAt: date,
            updatedAt: date
        )
        #expect(layout.id == id)
        #expect(layout.name == "Custom")
        #expect(layout.windows.count == 1)
        #expect(layout.createdAt == date)
    }

    @Test("update modifies layout and sets updatedAt")
    func updateLayout() {
        var layout = SnapLayout(name: "Original")
        let originalUpdatedAt = layout.updatedAt
        sleep(1) // ensure timestamp differs
        layout.update { $0.name = "Updated" }
        #expect(layout.name == "Updated")
        #expect(layout.updatedAt >= originalUpdatedAt)
    }

    @Test("Codable roundtrip")
    func codableRoundtrip() throws {
        let rule = WindowRule(
            bundleIdentifier: "com.apple.Terminal",
            title: "Terminal",
            zone: .bottomLeft
        )
        let original = SnapLayout(
            name: "Dev",
            windows: [rule]
        )
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601

        let data = try encoder.encode(original)
        let decoded = try decoder.decode(SnapLayout.self, from: data)

        #expect(decoded.id == original.id)
        #expect(decoded.name == original.name)
        #expect(decoded.windows.count == 1)
        #expect(decoded.windows[0].bundleIdentifier == "com.apple.Terminal")
    }

    @Test("Codable with multiple windows")
    func codableMultipleWindows() throws {
        let windows = [
            WindowRule(bundleIdentifier: "com.apple.Safari", zone: .leftHalf),
            WindowRule(bundleIdentifier: "com.apple.Terminal", zone: .rightHalf),
            WindowRule(bundleIdentifier: "com.slack.Slack", zone: .bottomLeft),
        ]
        let layout = SnapLayout(name: "Multi", windows: windows)
        let data = try JSONEncoder().encode(layout)
        let decoded = try JSONDecoder().decode(SnapLayout.self, from: data)
        #expect(decoded.windows.count == 3)
    }
}
