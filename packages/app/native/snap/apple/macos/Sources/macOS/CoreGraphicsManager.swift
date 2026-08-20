import SnapCore
import CoreGraphics
import AppKit

struct WindowInfo {
    let windowID: CGWindowID
    let pid: pid_t
    let ownerName: String
    let bundleIdentifier: String?
    let title: String?
    let bounds: CGRect
    let layer: Int
    let isOnScreen: Bool
}

final class CoreGraphicsManager {
    static let shared = CoreGraphicsManager()

    func getAllWindows() -> [WindowInfo] {
        guard let windowList = CGWindowListCopyWindowInfo(
            [.optionAll],
            kCGNullWindowID
        ) as? [[String: Any]] else {
            return []
        }

        return windowList.compactMap { info in
            guard let windowID = info[kCGWindowNumber as String] as? CGWindowID,
                  let pid = info[kCGWindowOwnerPID as String] as? pid_t,
                  let ownerName = info[kCGWindowOwnerName as String] as? String,
                  let boundsDict = info[kCGWindowBounds as String] as? [String: CGFloat],
                  let layer = info[kCGWindowLayer as String] as? Int else {
                return nil
            }

            let bounds = CGRect(
                x: boundsDict["X"] ?? 0,
                y: boundsDict["Y"] ?? 0,
                width: boundsDict["Width"] ?? 0,
                height: boundsDict["Height"] ?? 0
            )

            let bundleIdentifier = getBundleIdentifier(pid: pid)
            let title = info[kCGWindowName as String] as? String
            let isOnScreen = info[kCGWindowIsOnscreen as String] as? Bool ?? false

            return WindowInfo(
                windowID: windowID,
                pid: pid,
                ownerName: ownerName,
                bundleIdentifier: bundleIdentifier,
                title: title,
                bounds: bounds,
                layer: layer,
                isOnScreen: isOnScreen
            )
        }
    }

    func getApplicationWindows(pid: pid_t) -> [WindowInfo] {
        getAllWindows().filter { $0.pid == pid }
    }

    func getBundleIdentifier(pid: pid_t) -> String? {
        NSRunningApplication(processIdentifier: pid)?.bundleIdentifier
    }
}
