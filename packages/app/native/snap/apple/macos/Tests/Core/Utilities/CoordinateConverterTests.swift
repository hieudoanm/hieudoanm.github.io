import Testing
import CoreGraphics
@testable import SnapCore

@Suite("CoordinateConverter")
struct CoordinateConverterTests {

    private let screen1080p = CGRect(x: 0, y: 25, width: 1920, height: 1055)

    @Test("left half maps to left 50% of screen")
    func leftHalf() {
        let absolute = CoordinateConverter.toAbsoluteCoordinates(
            normalized: .leftHalf,
            visibleFrame: screen1080p
        )
        #expect(absolute.origin.x == 0)
        #expect(absolute.width == 960)
        #expect(absolute.height == 1055)
    }

    @Test("right half maps to right 50% of screen")
    func rightHalf() {
        let absolute = CoordinateConverter.toAbsoluteCoordinates(
            normalized: .rightHalf,
            visibleFrame: screen1080p
        )
        #expect(absolute.origin.x == 960)
        #expect(absolute.width == 960)
    }

    @Test("maximized fills visible area")
    func maximized() {
        let absolute = CoordinateConverter.toAbsoluteCoordinates(
            normalized: .maximized,
            visibleFrame: screen1080p
        )
        #expect(absolute.origin.x == screen1080p.origin.x)
        #expect(absolute.origin.y == screen1080p.origin.y)
        #expect(absolute.width == screen1080p.width)
        #expect(absolute.height == screen1080p.height)
    }

    @Test("roundtrip: absolute -> normalized -> absolute")
    func roundtrip() {
        let original = CGRect(x: 100, y: 200, width: 800, height: 600)
        let normalized = CoordinateConverter.toNormalizedCoordinates(
            absolute: original,
            visibleFrame: screen1080p
        )
        let restored = CoordinateConverter.toAbsoluteCoordinates(
            normalized: normalized,
            visibleFrame: screen1080p
        )
        #expect(abs(restored.origin.x - original.origin.x) < 0.01)
        #expect(abs(restored.origin.y - original.origin.y) < 0.01)
        #expect(abs(restored.width - original.width) < 0.01)
        #expect(abs(restored.height - original.height) < 0.01)
    }

    @Test("roundtrip: normalized -> absolute -> normalized")
    func roundtripFromNormalized() {
        let original = NormalizedRect(x: 0.25, y: 0.1, width: 0.5, height: 0.8)
        let absolute = CoordinateConverter.toAbsoluteCoordinates(
            normalized: original,
            visibleFrame: screen1080p
        )
        let restored = CoordinateConverter.toNormalizedCoordinates(
            absolute: absolute,
            visibleFrame: screen1080p
        )
        #expect(abs(restored.x - original.x) < 0.001)
        #expect(abs(restored.y - original.y) < 0.001)
        #expect(abs(restored.width - original.width) < 0.001)
        #expect(abs(restored.height - original.height) < 0.001)
    }

    @Test("off-screen origin is handled")
    func offscreenOrigin() {
        let dualMonitorFrame = CGRect(x: -1920, y: 25, width: 1920, height: 1055)
        let absolute = CoordinateConverter.toAbsoluteCoordinates(
            normalized: .leftHalf,
            visibleFrame: dualMonitorFrame
        )
        #expect(absolute.origin.x == -1920)
        #expect(absolute.width == 960)
    }

    @Test("top left corner is 0,0 in normalized space")
    func topLeftNormalized() {
        let point = CGPoint(x: screen1080p.origin.x, y: screen1080p.origin.y + screen1080p.height)
        let rect = CGRect(origin: point, size: CGSize(width: 1, height: 1))
        let normalized = CoordinateConverter.toNormalizedCoordinates(
            absolute: rect,
            visibleFrame: screen1080p
        )
        #expect(abs(normalized.x) < 0.001)
        #expect(abs(normalized.y) < 0.001)
    }
}
