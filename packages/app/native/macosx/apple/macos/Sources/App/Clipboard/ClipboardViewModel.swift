import Foundation
import MacOSXCore
import SwiftUI

/// Drives clipboard monitoring and history for the Clipboard tab.
@MainActor
final class ClipboardViewModel: ObservableObject {
    let store: ClipboardStore

    @Published var searchQuery = ""

    @Published var isMonitoring: Bool {
        didSet {
            UserDefaults.standard.set(isMonitoring, forKey: Self.monitorKey)
            updateMonitor()
        }
    }

    @Published var maxHistorySize: Int {
        didSet {
            UserDefaults.standard.set(maxHistorySize, forKey: Self.maxHistoryKey)
            store.maxItems = maxHistorySize
        }
    }

    private let monitor: ClipboardMonitor

    private static let monitorKey = "clipboard.monitorEnabled"
    private static let maxHistoryKey = "clipboard.maxHistorySize"

    init(store: ClipboardStore = ClipboardStore()) {
        self.store = store
        let defaults = UserDefaults.standard
        self.isMonitoring = defaults.object(forKey: Self.monitorKey) as? Bool ?? true
        self.maxHistorySize = defaults.object(forKey: Self.maxHistoryKey) as? Int ?? 500
        self.monitor = ClipboardMonitor(store: store)
        store.maxItems = maxHistorySize
        updateMonitor()
    }

    deinit {
        monitor.stop()
    }

    func refresh() {
        monitor.check()
    }

    func copyToClipboard(_ item: ClipboardItem) {
        PasteboardManager.shared.copyToClipboard(item.content)
    }

    private func updateMonitor() {
        if isMonitoring {
            monitor.start()
            monitor.check()
        } else {
            monitor.stop()
        }
    }
}