import Testing
import CoreGraphics
@testable import SnapCore

@Suite("ScreenInfo")
struct ScreenInfoTests {

    private func makeScreen(
        id: CGDirectDisplayID = 1,
        name: String = "Display 1",
        width: CGFloat = 1920,
        height: CGFloat = 1080
    ) -> ScreenInfo {
        ScreenInfo(
            id: id,
            name: name,
            frame: CGRect(x: 0, y: 0, width: width, height: height),
            visibleFrame: CGRect(x: 0, y: 25, width: width, height: height - 25),
            scaleFactor: 2.0
        )
    }

    @Test("computed width and height")
    func computedDimensions() {
        let s = makeScreen(width: 2560, height: 1440)
        #expect(s.width == 2560.0)
        #expect(s.height == 1440.0)
    }

    @Test("equality by id only")
    func equalityById() {
        let a = makeScreen(id: 42, name: "A")
        let b = makeScreen(id: 42, name: "B")
        #expect(a == b)
    }

    @Test("inequality when id differs")
    func inequalityById() {
        let a = makeScreen(id: 1)
        let b = makeScreen(id: 2)
        #expect(a != b)
    }

    @Test("hashable: equal ids produce same hash")
    func hashing() {
        let a = makeScreen(id: 99)
        let b = makeScreen(id: 99)
        #expect(a.hashValue == b.hashValue)
    }

    @Test("different ids produce different hashes (probabilistic)")
    func hashDistribution() {
        let ids: [CGDirectDisplayID] = [1, 2, 3, 4, 5]
        let hashes = ids.map { makeScreen(id: $0).hashValue }
        let unique = Set(hashes)
        #expect(unique.count == ids.count)
    }
}
