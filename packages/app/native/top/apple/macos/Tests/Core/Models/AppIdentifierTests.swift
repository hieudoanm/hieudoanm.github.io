import Testing
import Foundation
@testable import TopCore

@Suite("AppIdentifier")
struct AppIdentifierTests {

    @Test("init stores values")
    func initValues() {
        let id = AppIdentifier(bundleIdentifier: "com.apple.Safari", windowTitle: "Google")
        #expect(id.bundleIdentifier == "com.apple.Safari")
        #expect(id.windowTitle == "Google")
    }

    @Test("equality")
    func equality() {
        let a = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "Title")
        let b = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "Title")
        #expect(a == b)
    }

    @Test("inequality on bundleIdentifier")
    func inequalityBundle() {
        let a = AppIdentifier(bundleIdentifier: "com.a", windowTitle: "Title")
        let b = AppIdentifier(bundleIdentifier: "com.b", windowTitle: "Title")
        #expect(a != b)
    }

    @Test("inequality on windowTitle")
    func inequalityTitle() {
        let a = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "A")
        let b = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "B")
        #expect(a != b)
    }

    @Test("hashable")
    func hashable() {
        let a = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        let b = AppIdentifier(bundleIdentifier: "com.test", windowTitle: "T")
        #expect(a.hashValue == b.hashValue)
    }

    @Test("Codable roundtrip")
    func codable() throws {
        let original = AppIdentifier(bundleIdentifier: "com.spotify.client", windowTitle: "Spotify Free")
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(AppIdentifier.self, from: data)
        #expect(decoded == original)
    }

    @Test("displayTitle formats nicely")
    func displayTitle() {
        let id = AppIdentifier(bundleIdentifier: "com.google.Chrome", windowTitle: "New Tab")
        #expect(id.displayTitle.contains("Chrome"))
        #expect(id.displayTitle.contains("New Tab"))
    }
}
