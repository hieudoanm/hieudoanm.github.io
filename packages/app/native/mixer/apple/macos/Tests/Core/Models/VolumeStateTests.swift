import Testing
import Foundation
@testable import MixerCore

@Suite("VolumeState")
struct VolumeStateTests {

    @Test("init stores values")
    func initValues() {
        let state = VolumeState(
            bundleIdentifier: "com.spotify.client",
            volume: 0.7,
            isMuted: false
        )
        #expect(state.bundleIdentifier == "com.spotify.client")
        #expect(state.volume == 0.7)
        #expect(state.isMuted == false)
    }

    @Test("init with default isMuted")
    func initDefaultMuted() {
        let state = VolumeState(bundleIdentifier: "com.test", volume: 1.0)
        #expect(state.isMuted == false)
    }

    @Test("Codable roundtrip")
    func codableRoundtrip() throws {
        let original = VolumeState(
            bundleIdentifier: "com.google.Chrome",
            volume: 0.8,
            isMuted: true
        )
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(VolumeState.self, from: data)
        #expect(decoded.bundleIdentifier == original.bundleIdentifier)
        #expect(decoded.volume == original.volume)
        #expect(decoded.isMuted == original.isMuted)
    }

    @Test("Codable with false isMuted")
    func codableNotMuted() throws {
        let original = VolumeState(bundleIdentifier: "com.test", volume: 0.5, isMuted: false)
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(VolumeState.self, from: data)
        #expect(decoded.isMuted == false)
    }
}
