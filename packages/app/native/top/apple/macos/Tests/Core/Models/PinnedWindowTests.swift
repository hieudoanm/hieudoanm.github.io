import Testing
import Foundation
@testable import TopCore

@Suite("PinnedWindow")
struct PinnedWindowTests {

    @Test("init creates with id and date")
    func initValues() {
        let id = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        let pinned = PinnedWindow(appIdentifier: id)
        #expect(pinned.appIdentifier == id)
        #expect(pinned.pinnedAt.timeIntervalSince1970 > 0)
    }

    @Test("equality by id")
    func equality() {
        let id = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        let a = PinnedWindow(appIdentifier: id)
        let b = PinnedWindow(appIdentifier: id)
        #expect(a != b) // different UUIDs
    }

    @Test("Codable roundtrip")
    func codable() throws {
        let id = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        let original = PinnedWindow(appIdentifier: id)
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(PinnedWindow.self, from: data)
        #expect(decoded.appIdentifier == original.appIdentifier)
    }
}
