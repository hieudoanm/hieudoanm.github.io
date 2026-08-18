import Foundation
import ApplicationServices
import TopCore

public final class WindowPinningService {
    private let accessibilityManager: AccessibilityManager
    private let windowDiscovery: WindowDiscovery
    private let cgsManager = CGSManager.shared

    public init(
        accessibilityManager: AccessibilityManager = .shared,
        windowDiscovery: WindowDiscovery = WindowDiscovery()
    ) {
        self.accessibilityManager = accessibilityManager
        self.windowDiscovery = windowDiscovery
    }

    public func checkPermission() -> Bool {
        accessibilityManager.isPermissionGranted
    }

    public func requestPermission() {
        accessibilityManager.requestPermission()
    }

    public func pinWindow(pid: pid_t, title: String) -> Bool {
        if cgsManager.isAvailable {
            if let windowID = cgsManager.findWindowID(pid: pid, title: title) {
                return cgsManager.setWindowLevel(windowID: windowID, level: 25)
            }
        }
        return false
    }

    public func unpinWindow(pid: pid_t, title: String) -> Bool {
        if cgsManager.isAvailable {
            if let windowID = cgsManager.findWindowID(pid: pid, title: title) {
                return cgsManager.setWindowLevel(windowID: windowID, level: 0)
            }
        }
        return false
    }

    public func pinByAppIdentifier(_ identifier: AppIdentifier) -> Bool {
        let apps = discoverMatchingWindows(identifier)
        guard let match = apps.first else { return false }
        return pinWindow(pid: match.pid, title: match.title)
    }

    public func unpinByAppIdentifier(_ identifier: AppIdentifier) -> Bool {
        let apps = discoverMatchingWindows(identifier)
        guard let match = apps.first else { return false }
        return unpinWindow(pid: match.pid, title: match.title)
    }

    private func discoverMatchingWindows(_ identifier: AppIdentifier) -> [(pid: pid_t, title: String)] {
        let discoveries = windowDiscovery.discoverWindows()
        for discovery in discoveries {
            guard discovery.bundleIdentifier == identifier.bundleIdentifier else { continue }
            let matching = discovery.windows.filter { $0.title == identifier.windowTitle }
            if !matching.isEmpty {
                return matching.map { (pid: discovery.pid, title: $0.title) }
            }
        }
        return []
    }
}
