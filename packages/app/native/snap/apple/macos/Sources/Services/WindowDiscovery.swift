import CoreGraphics

struct DiscoveredWindow {
    let windowID: CGWindowID
    let pid: pid_t
    let bundleIdentifier: String?
    let title: String?
    let bounds: CGRect
    let screenID: CGDirectDisplayID?
    let isVisible: Bool
}

final class WindowDiscovery {
    static let shared = WindowDiscovery()

    private let cgManager = CoreGraphicsManager.shared
    private let screenManager = ScreenManager.shared

    func discoverAllWindows() -> [DiscoveredWindow] {
        let windows = cgManager.getAllWindows()
        return windows.compactMap { windowInfo in
            guard let bundleID = windowInfo.bundleIdentifier,
                  windowInfo.layer == 0 else {
                return nil
            }
            let screen = screenManager.screenContaining(
                point: CGPoint(
                    x: windowInfo.bounds.midX,
                    y: windowInfo.bounds.midY
                )
            )
            return DiscoveredWindow(
                windowID: windowInfo.windowID,
                pid: windowInfo.pid,
                bundleIdentifier: bundleID,
                title: windowInfo.title,
                bounds: windowInfo.bounds,
                screenID: screen?.id,
                isVisible: windowInfo.isOnScreen
            )
        }
    }

    func discoverWindows(for bundleIdentifier: String) -> [DiscoveredWindow] {
        discoverAllWindows().filter { $0.bundleIdentifier == bundleIdentifier }
    }

    func discoverWindows(for pid: pid_t) -> [DiscoveredWindow] {
        discoverAllWindows().filter { $0.pid == pid }
    }
}
