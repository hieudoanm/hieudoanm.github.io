import AppKit
import Foundation

/// Tracks whether the MenuBarExtra panel window is currently on screen so that
/// background sampling (ports, network, running apps) can pause while the
/// popover is closed instead of running forever.
///
/// State is only mutated by observers posted on the main queue and read on the
/// main thread by the view models; it is deliberately not actor-isolated so the
/// non-isolated `MemoryViewModel` can observe it without extra hoisting.
final class PanelVisibilityMonitor {
    static let shared = PanelVisibilityMonitor()
    static let didChangeNotification = Notification.Name("MacOSX.panelVisibilityDidChange")

    private static let visibleKey = "isVisible"

    private(set) var isPanelVisible = false {
        didSet {
            guard oldValue != isPanelVisible else { return }
            NotificationCenter.default.post(
                name: Self.didChangeNotification,
                object: self,
                userInfo: [Self.visibleKey: isPanelVisible]
            )
        }
    }

    private weak var cachedPanel: NSWindow?
    private var isStarted = false
    private var observations: [NSObjectProtocol] = []

    private init() {}

    func start() {
        guard !isStarted else { return }
        isStarted = true
        let center = NotificationCenter.default
        observations.append(center.addObserver(
            forName: NSWindow.didBecomeKeyNotification,
            object: nil,
            queue: .main
        ) { [weak self] notification in
            self?.handleBecameKey(notification)
        })
        observations.append(center.addObserver(
            forName: NSWindow.didResignKeyNotification,
            object: nil,
            queue: .main
        ) { [weak self] notification in
            self?.handleResignedKey(notification)
        })
    }

    func observeVisibilityChange(_ handler: @escaping (Bool) -> Void) -> NSObjectProtocol {
        NotificationCenter.default.addObserver(
            forName: Self.didChangeNotification,
            object: self,
            queue: .main
        ) { note in
            let visible = (note.userInfo?[Self.visibleKey] as? Bool) ?? false
            handler(visible)
        }
    }

    private func handleBecameKey(_ notification: Notification) {
        guard let window = notification.object as? NSWindow,
              isMenuBarPanel(window) else { return }
        cachedPanel = window
        isPanelVisible = true
    }

    private func handleResignedKey(_ notification: Notification) {
        guard let window = notification.object as? NSWindow,
              isMenuBarPanel(window) else { return }
        isPanelVisible = false
    }

    private func isMenuBarPanel(_ window: NSWindow) -> Bool {
        if let cachedPanel, cachedPanel === window {
            return true
        }
        // MenuBarExtra's `.window` style is backed by a floating panel; it is
        // the only NSPanel this app owns. The Settings scene is a plain window.
        guard window is NSPanel else { return false }
        cachedPanel = window
        return true
    }

    deinit {
        for observation in observations {
            NotificationCenter.default.removeObserver(observation)
        }
    }
}