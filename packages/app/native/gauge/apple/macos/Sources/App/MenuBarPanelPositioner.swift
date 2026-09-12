import AppKit
import CoreGraphics
import Foundation

/// Horizontally centers the MenuBarExtra panel on its menu-bar icon.
///
/// SwiftUI's `MenuBarExtra` offers no alignment API for its `.window` style,
/// so the panel is re-centered whenever it is shown or moved by the system.
@MainActor
final class MenuBarPanelPositioner {
    static let shared = MenuBarPanelPositioner()

    private var observations: [NSObjectProtocol] = []
    private var isStarted = false

    private init() {}

    func start() {
        guard !isStarted else { return }
        isStarted = true
        let center = NotificationCenter.default
        observations.append(center.addObserver(
            forName: NSWindow.didBecomeKeyNotification,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor in self?.recenter() }
        })
        observations.append(center.addObserver(
            forName: NSWindow.didMoveNotification,
            object: nil,
            queue: .main
        ) { [weak self] _ in
            Task { @MainActor in self?.recenter() }
        })
    }

    private func recenter() {
        guard let panel = menuBarPanel(),
              let itemCenterX = statusItemCenterX() else { return }
        let targetX = itemCenterX - panel.frame.width / 2
        let clampedX = clamp(targetX, forWidth: panel.frame.width, screen: panel.screen)
        guard abs(panel.frame.origin.x - clampedX) > 1 else { return }
        panel.setFrameOrigin(CGPoint(x: clampedX, y: panel.frame.origin.y))
    }

    private func menuBarPanel() -> NSPanel? {
        NSApp.windows.first { window in
            window is NSPanel && window.isVisible
        } as? NSPanel
    }

    private func statusItemCenterX() -> CGFloat? {
        guard let info = CGWindowListCopyWindowInfo(.optionOnScreenOnly, kCGNullWindowID)
            as? [[String: Any]] else { return nil }
        for window in info {
            guard let layer = window[kCGWindowLayer as String] as? NSNumber,
                  layer.intValue == kCGStatusWindowLevel,
                  let ownerPID = window[kCGWindowOwnerPID as String] as? NSNumber,
                  ownerPID.intValue == getpid(),
                  let bounds = window[kCGWindowBounds as String] as? [String: Any],
                  let xNumber = bounds["X"] as? NSNumber,
                  let widthNumber = bounds["Width"] as? NSNumber,
                  widthNumber.doubleValue > 0 else { continue }
            return CGFloat(xNumber.doubleValue) + CGFloat(widthNumber.doubleValue) / 2
        }
        return nil
    }

    private func clamp(_ x: CGFloat, forWidth width: CGFloat, screen: NSScreen?) -> CGFloat {
        guard let screen else { return x }
        let minX = screen.visibleFrame.minX
        let maxX = screen.visibleFrame.maxX - width
        guard maxX >= minX else { return minX }
        return min(max(x, minX), maxX)
    }
}