import Testing
import Foundation
@testable import SnapCore

@Suite("AppSettings")
struct AppSettingsTests {

    @Test("default has all false")
    func defaults() {
        let s = AppSettings.default
        #expect(s.launchAtLogin == false)
        #expect(s.showInDock == false)
        #expect(s.restoreOnMonitorChange == false)
    }

    @Test("init with custom values")
    func initWithCustom() {
        let s = AppSettings(
            launchAtLogin: true,
            showInDock: true,
            restoreOnMonitorChange: true
        )
        #expect(s.launchAtLogin == true)
        #expect(s.showInDock == true)
        #expect(s.restoreOnMonitorChange == true)
    }

    @Test("Equatable")
    func equatable() {
        let a = AppSettings(launchAtLogin: true)
        let b = AppSettings(launchAtLogin: true)
        let c = AppSettings(launchAtLogin: false)
        #expect(a == b)
        #expect(a != c)
    }

    @Test("Codable roundtrip")
    func codableRoundtrip() throws {
        let original = AppSettings(
            launchAtLogin: true,
            showInDock: false,
            restoreOnMonitorChange: true
        )
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(AppSettings.self, from: data)
        #expect(decoded == original)
    }

    @Test("Codable roundtrip for defaults")
    func codableDefaults() throws {
        let data = try JSONEncoder().encode(AppSettings.default)
        let decoded = try JSONDecoder().decode(AppSettings.self, from: data)
        #expect(decoded == AppSettings.default)
    }
}
