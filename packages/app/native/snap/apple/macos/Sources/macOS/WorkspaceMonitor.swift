import SnapCore
import AppKit
import CoreGraphics

protocol WorkspaceMonitorDelegate: AnyObject {
    func workspaceMonitor(_ monitor: WorkspaceMonitor, didDetectScreenChange screens: [ScreenInfo])
}

final class WorkspaceMonitor {
    static let shared = WorkspaceMonitor()

    weak var delegate: WorkspaceMonitorDelegate?

    private var previousScreens: [ScreenInfo] = []

    func start() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(screensDidChange),
            name: NSApplication.didChangeScreenParametersNotification,
            object: nil
        )
        previousScreens = ScreenManager.shared.screens
    }

    func stop() {
        NotificationCenter.default.removeObserver(self)
    }

    @objc private func screensDidChange() {
        let currentScreens = ScreenManager.shared.screens
        guard screensChanged(from: previousScreens, to: currentScreens) else {
            return
        }
        previousScreens = currentScreens
        delegate?.workspaceMonitor(self, didDetectScreenChange: currentScreens)
    }

    private func screensChanged(from old: [ScreenInfo], to new: [ScreenInfo]) -> Bool {
        guard old.count == new.count else { return true }
        let oldIDs = Set(old.map(\.id))
        let newIDs = Set(new.map(\.id))
        return oldIDs != newIDs
    }
}
