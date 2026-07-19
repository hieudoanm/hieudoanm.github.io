import Foundation
import MacOSXCore
import SwiftUI

/// Drives per-tick network sampling and accumulates session totals.
@MainActor
final class NetworkViewModel: ObservableObject {
    @Published private(set) var stats: NetworkStats?
    @Published private(set) var totalReceivedBytes: UInt64 = 0
    @Published private(set) var totalSentBytes: UInt64 = 0

    private let settingsStore: SettingsStore
    private let monitor: NetworkMonitor
    private var refreshTask: Task<Void, Never>?
    private var accumulatedReceived: UInt64 = 0
    private var accumulatedSent: UInt64 = 0
    private var visibilityObservation: NSObjectProtocol?
    private var isPanelVisible = false

    init(
        settingsStore: SettingsStore,
        monitor: NetworkMonitor = NetworkMonitor()
    ) {
        self.settingsStore = settingsStore
        self.monitor = monitor
        self.isPanelVisible = PanelVisibilityMonitor.shared.isPanelVisible
        self.visibilityObservation = PanelVisibilityMonitor.shared.observeVisibilityChange { [weak self] visible in
            Task { @MainActor in self?.handleVisibilityChange(visible) }
        }
    }

    deinit {
        refreshTask?.cancel()
        if let visibilityObservation {
            NotificationCenter.default.removeObserver(visibilityObservation)
        }
    }

    private func handleVisibilityChange(_ visible: Bool) {
        isPanelVisible = visible
        guard visible else { return }
        refresh()
    }

    func start() {
        guard refreshTask == nil else { return }
        refreshTask = Task { @MainActor [weak self] in
            while let self, !Task.isCancelled {
                if self.isPanelVisible {
                    self.refresh()
                }
                try? await Task.sleep(for: .seconds(self.settingsStore.refreshInterval))
            }
        }
    }

    func refresh() {
        guard case let .success(next) = monitor.read() else {
            stats = nil
            return
        }
        accumulatedReceived += next.receivedBytes
        accumulatedSent += next.sentBytes
        totalReceivedBytes = accumulatedReceived
        totalSentBytes = accumulatedSent
        stats = next
    }
}