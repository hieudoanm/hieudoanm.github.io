import Foundation
import AppKit

public final class WindowDiscovery {
    public init() {}

    public func discoverWindows() -> [(pid: pid_t, appName: String, bundleIdentifier: String, windows: [(title: String, axWindow: AXUIElement)])] {
        let allApps = NSWorkspace.shared.runningApplications
        let regularApps = allApps.filter { $0.activationPolicy == .regular }

        NSLog("[Top] All apps: \(allApps.count), Regular apps: \(regularApps.count)")

        var results: [(pid: pid_t, appName: String, bundleIdentifier: String, windows: [(title: String, axWindow: AXUIElement)])] = []

        for app in regularApps {
            guard let bundleID = app.bundleIdentifier else { continue }
            let pid = app.processIdentifier
            let axWindows = AccessibilityManager.shared.getWindows(for: pid)

            NSLog("[Top] App: \(app.localizedName ?? "?") pid=\(pid) axWindows=\(axWindows.count)")

            let windowData: [(title: String, axWindow: AXUIElement)] = axWindows.compactMap { axWindow in
                guard let title = AccessibilityManager.shared.getWindowTitle(axWindow),
                      !title.isEmpty else { return nil }
                return (title: title, axWindow: axWindow)
            }

            NSLog("[Top]   → windows with title: \(windowData.count)")

            if !windowData.isEmpty {
                results.append((
                    pid: pid,
                    appName: app.localizedName ?? bundleID,
                    bundleIdentifier: bundleID,
                    windows: windowData
                ))
            }
        }

        NSLog("[Top] Total discoverable windows: \(results.count)")
        return results.sorted { $0.appName.localizedCaseInsensitiveCompare($1.appName) == .orderedAscending }
    }
}
