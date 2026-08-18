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
        let visibleFrame = screen.visibleFrame
        return CGRect(
            x: visibleFrame.origin.x + (normalized.x * visibleFrame.width),
            y: visibleFrame.origin.y + ((1.0 - normalized.y - normalized.height) * visibleFrame.height),
            width: normalized.width * visibleFrame.width,
            height: normalized.height * visibleFrame.height
        )
    }

    func toNormalizedCoordinates(
        absolute: CGRect,
        screen: ScreenInfo
    ) -> NormalizedRect {
        let visibleFrame = screen.visibleFrame
        return NormalizedRect(
            x: (absolute.origin.x - visibleFrame.origin.x) / visibleFrame.width,
            y: 1.0 - ((absolute.origin.y - visibleFrame.origin.y) / visibleFrame.height) - (absolute.height / visibleFrame.height),
            width: absolute.width / visibleFrame.width,
            height: absolute.height / visibleFrame.height
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
