import Testing
import Foundation
@testable import MixerCore

@Suite("AudioApplication")
struct AudioApplicationTests {

    @Test("id is processID-name")
    func idFormat() {
        let app = AudioApplication(processID: 1234, name: "Spotify")
        #expect(app.id == "1234-Spotify")
    }

    @Test("init with defaults")
    func initWithDefaults() {
        let app = AudioApplication(processID: 1, name: "Chrome")
        #expect(app.processID == 1)
        #expect(app.name == "Chrome")
        #expect(app.bundleIdentifier == nil)
        #expect(app.volume == 1.0)
        #expect(app.isMuted == false)
        #expect(app.isPlaying == false)
    }

    @Test("init with all values")
    func initWithAll() {
        let app = AudioApplication(
            processID: 42,
            bundleIdentifier: "com.spotify.client",
            name: "Spotify",
            volume: 0.6,
            isMuted: true,
            isPlaying: true
        )
        #expect(app.bundleIdentifier == "com.spotify.client")
        #expect(app.volume == 0.6)
        #expect(app.isMuted == true)
        #expect(app.isPlaying == true)
    }

    @Test("equality by id")
    func equality() {
        let a = AudioApplication(processID: 100, name: "App")
        let b = AudioApplication(processID: 100, name: "App")
        #expect(a == b)
    }

    @Test("inequality when processID differs")
    func inequalityProcessID() {
        let a = AudioApplication(processID: 1, name: "App")
        let b = AudioApplication(processID: 2, name: "App")
        #expect(a != b)
    }

    @Test("inequality when name differs")
    func inequalityName() {
        let a = AudioApplication(processID: 1, name: "A")
        let b = AudioApplication(processID: 1, name: "B")
        #expect(a != b)
    }

    @Test("hashable: equal apps have same hash")
    func hashing() {
        let a = AudioApplication(processID: 10, name: "Test")
        let b = AudioApplication(processID: 10, name: "Test")
        #expect(a.hashValue == b.hashValue)
    }

    @Test("different processID produces different id")
    func differentPID() {
        let a = AudioApplication(processID: 1, name: "App")
        let b = AudioApplication(processID: 2, name: "App")
        #expect(a.id != b.id)
        #expect(a != b)
    }
}
