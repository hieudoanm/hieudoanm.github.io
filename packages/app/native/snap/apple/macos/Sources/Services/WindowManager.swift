import AppKit
import ApplicationServices

final class WindowManager {
    static let shared = WindowManager()

    private let accessibilityManager = AccessibilityManager.shared

    func moveWindowToZone(
        window: AXUIElement,
        zone: NormalizedRect,
        screen: ScreenInfo
    ) -> Bool {
        let targetRect = ScreenManager.shared.toAbsoluteCoordinates(
            normalized: zone,
            screen: screen
        )
        let positionSuccess = accessibilityManager.setWindowPosition(
            window,
            to: CGPoint(x: targetRect.origin.x, y: targetRect.origin.y)
        )
        let sizeSuccess = accessibilityManager.setWindowSize(
            window,
            to: CGSize(width: targetRect.width, height: targetRect.height)
        )
        return positionSuccess && sizeSuccess
    }

    func snapCurrentWindow(_ zone: NormalizedRect) -> Bool {
        guard let frontApp = NSWorkspace.shared.frontmostApplication else {
            return false
        }
        let pid = frontApp.processIdentifier
        let windows = accessibilityManager.getWindowList(pid: pid)
        guard let window = windows.first else {
            return false
        }
        guard let currentPos = accessibilityManager.getWindowPosition(window),
              let currentSize = accessibilityManager.getWindowSize(window) else {
            return false
        }
        let currentRect = CGRect(origin: currentPos, size: currentSize)
        guard let screen = ScreenManager.shared.screenContaining(rect: currentRect) else {
            return false
        }
        return moveWindowToZone(window: window, zone: zone, screen: screen)
    }

    func moveWindowToNextScreen(_ window: AXUIElement) -> Bool {
        guard let currentPos = accessibilityManager.getWindowPosition(window),
              let currentSize = accessibilityManager.getWindowSize(window) else {
            return false
        }
        let currentRect = CGRect(origin: currentPos, size: currentSize)
        let screens = ScreenManager.shared.screens
        guard screens.count > 1,
              let currentScreen = ScreenManager.shared.screenContaining(rect: currentRect),
              let nextScreen = screens.first(where: { $0.id != currentScreen.id }) else {
            return false
        }
        let normalized = ScreenManager.shared.toNormalizedCoordinates(
            absolute: currentRect,
            screen: currentScreen
        )
        return moveWindowToZone(window: window, zone: normalized, screen: nextScreen)
    }
}
