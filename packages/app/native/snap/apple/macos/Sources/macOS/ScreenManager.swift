import SnapCore
import AppKit
import CoreGraphics

final class ScreenManager {
    static let shared = ScreenManager()

    var screens: [ScreenInfo] {
        NSScreen.screens.map { screen in
            ScreenInfo(
                id: screen.displayID,
                name: screen.localizedName,
                frame: screen.frame,
                visibleFrame: screen.visibleFrame,
                scaleFactor: screen.backingScaleFactor
            )
        }
    }

    var primaryScreen: ScreenInfo? {
        guard let screen = NSScreen.main else { return nil }
        return ScreenInfo(
            id: screen.displayID,
            name: screen.localizedName,
            frame: screen.frame,
            visibleFrame: screen.visibleFrame,
            scaleFactor: screen.backingScaleFactor
        )
    }

    func screenContaining(point: CGPoint) -> ScreenInfo? {
        screens.first { $0.frame.contains(point) }
    }

    func screenContaining(rect: CGRect) -> ScreenInfo? {
        let center = CGPoint(
            x: rect.midX,
            y: rect.midY
        )
        return screenContaining(point: center)
    }

    func screen(forID id: CGDirectDisplayID) -> ScreenInfo? {
        screens.first { $0.id == id }
    }

    func toAbsoluteCoordinates(
        normalized: NormalizedRect,
        screen: ScreenInfo
    ) -> CGRect {
        CoordinateConverter.toAbsoluteCoordinates(
            normalized: normalized,
            visibleFrame: screen.visibleFrame
        )
    }

    func toNormalizedCoordinates(
        absolute: CGRect,
        screen: ScreenInfo
    ) -> NormalizedRect {
        CoordinateConverter.toNormalizedCoordinates(
            absolute: absolute,
            visibleFrame: screen.visibleFrame
        )
    }
}

private extension NSScreen {
    var displayID: CGDirectDisplayID {
        cgDisplayID
    }

    var localizedName: String {
        if let name = ScreenManager.displayName(for: cgDisplayID) {
            return name
        }
        return "Display \(cgDisplayID)"
    }

    private var cgDisplayID: CGDirectDisplayID {
        self.deviceDescription[NSDeviceDescriptionKey("NSScreenNumber")] as? CGDirectDisplayID ?? 0
    }
}

private extension ScreenManager {
    static func displayName(for displayID: CGDirectDisplayID) -> String? {
        return CGDisplayCopyDisplayMode(displayID) != nil ? "Display \(displayID)" : nil
    }
}
