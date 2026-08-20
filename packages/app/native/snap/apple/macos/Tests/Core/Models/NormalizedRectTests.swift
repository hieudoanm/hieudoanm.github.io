import Testing
import Foundation
@testable import SnapCore

@Suite("NormalizedRect")
struct NormalizedRectTests {

    @Test("init stores all values")
    func initValues() {
        let rect = NormalizedRect(x: 0.1, y: 0.2, width: 0.3, height: 0.4)
        #expect(rect.x == 0.1)
        #expect(rect.y == 0.2)
        #expect(rect.width == 0.3)
        #expect(rect.height == 0.4)
    }

    @Test("leftHalf covers left 50%")
    func leftHalf() {
        let r = NormalizedRect.leftHalf
        #expect(r.x == 0)
        #expect(r.y == 0)
        #expect(r.width == 0.5)
        #expect(r.height == 1.0)
    }

    @Test("rightHalf covers right 50%")
    func rightHalf() {
        let r = NormalizedRect.rightHalf
        #expect(r.x == 0.5)
        #expect(r.width == 0.5)
    }

    @Test("topHalf covers top 50%")
    func topHalf() {
        let r = NormalizedRect.topHalf
        #expect(r.x == 0)
        #expect(r.y == 0)
        #expect(r.width == 1.0)
        #expect(r.height == 0.5)
    }

    @Test("bottomHalf covers bottom 50%")
    func bottomHalf() {
        let r = NormalizedRect.bottomHalf
        #expect(r.y == 0.5)
        #expect(r.height == 0.5)
    }

    @Test("quarter zones each cover 25%")
    func quarterZones() {
        let quarters: [NormalizedRect] = [
            .topLeft, .topRight, .bottomLeft, .bottomRight
        ]
        for q in quarters {
            #expect(q.width == 0.5)
            #expect(q.height == 0.5)
        }
        #expect(NormalizedRect.topLeft.x == 0)
        #expect(NormalizedRect.topLeft.y == 0)
        #expect(NormalizedRect.topRight.x == 0.5)
        #expect(NormalizedRect.topRight.y == 0)
        #expect(NormalizedRect.bottomLeft.x == 0)
        #expect(NormalizedRect.bottomLeft.y == 0.5)
        #expect(NormalizedRect.bottomRight.x == 0.5)
        #expect(NormalizedRect.bottomRight.y == 0.5)
    }

    @Test("maximized covers entire screen")
    func maximized() {
        let r = NormalizedRect.maximized
        #expect(r.x == 0)
        #expect(r.y == 0)
        #expect(r.width == 1.0)
        #expect(r.height == 1.0)
    }

    @Test("centered has 70% size with 15% inset")
    func centered() {
        let r = NormalizedRect.centered
        #expect(r.x == 0.15)
        #expect(r.y == 0.15)
        #expect(r.width == 0.7)
        #expect(r.height == 0.7)
    }

    @Test("equal rects are equal")
    func equality() {
        let a = NormalizedRect(x: 0, y: 0, width: 0.5, height: 1.0)
        let b = NormalizedRect(x: 0, y: 0, width: 0.5, height: 1.0)
        #expect(a == b)
    }

    @Test("different rects are not equal")
    func inequality() {
        let a = NormalizedRect.leftHalf
        let b = NormalizedRect.rightHalf
        #expect(a != b)
    }

    @Test("hashable: equal rects have same hash")
    func hashing() {
        let a = NormalizedRect(x: 0.25, y: 0.25, width: 0.5, height: 0.5)
        let b = NormalizedRect(x: 0.25, y: 0.25, width: 0.5, height: 0.5)
        #expect(a.hashValue == b.hashValue)
    }

    @Test("Codable roundtrip preserves all values")
    func codableRoundtrip() throws {
        let original = NormalizedRect(x: 0.1, y: 0.2, width: 0.3, height: 0.4)
        let data = try JSONEncoder().encode(original)
        let decoded = try JSONDecoder().decode(NormalizedRect.self, from: data)
        #expect(decoded == original)
    }

    @Test("Codable roundtrip for static presets")
    func codablePresets() throws {
        let presets: [NormalizedRect] = [
            .leftHalf, .rightHalf, .topHalf, .bottomHalf,
            .topLeft, .topRight, .bottomLeft, .bottomRight,
            .maximized, .centered
        ]
        for preset in presets {
            let data = try JSONEncoder().encode(preset)
            let decoded = try JSONDecoder().decode(NormalizedRect.self, from: data)
            #expect(decoded == preset)
        }
    }
}
