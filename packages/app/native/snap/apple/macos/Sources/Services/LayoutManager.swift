import SnapCore
import Foundation
import AppKit
import ApplicationServices

final class LayoutManager {
    static let shared = LayoutManager()

    private let windowDiscovery = WindowDiscovery.shared
    private let screenManager = ScreenManager.shared
    private let accessibilityManager = AccessibilityManager.shared

    func captureCurrentLayout(name: String) -> SnapLayout {
        let windows = windowDiscovery.discoverAllWindows()
        let rules: [WindowRule] = windows.compactMap { window in
            guard let bundleID = window.bundleIdentifier,
                  let screen = screenManager.screenContaining(rect: window.bounds) else {
                return nil
            }
            let normalized = screenManager.toNormalizedCoordinates(
                absolute: window.bounds,
                screen: screen
            )
            return WindowRule(
                bundleIdentifier: bundleID,
                title: window.title,
                zone: normalized
            )
        }
        return SnapLayout(name: name, windows: rules)
    }

    func restoreLayout(_ layout: SnapLayout) {
        let screens = screenManager.screens
        guard let primaryScreen = screens.first else { return }

        for rule in layout.windows {
            let appManager = ApplicationManager.shared
            guard appManager.isApplicationRunning(bundleIdentifier: rule.bundleIdentifier) else {
                continue
            }
            let pid = appManager.findApplication(bundleIdentifier: rule.bundleIdentifier)?.pid
            guard let pid = pid else { continue }
            let windows = accessibilityManager.getWindowList(pid: pid)
            guard let window = windows.first else { continue }
            let screen = primaryScreen
            let _ = WindowManager.shared.moveWindowToZone(
                window: window,
                zone: rule.zone,
                screen: screen
            )
        }
    }
}
