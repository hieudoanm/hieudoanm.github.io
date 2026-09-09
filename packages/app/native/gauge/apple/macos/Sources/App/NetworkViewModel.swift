import Foundation
import GaugeCore
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

    init(
        settingsStore: SettingsStore,
        monitor: NetworkMonitor = NetworkMonitor()
    ) {
        self.settingsStore = settingsStore
        self.monitor = monitor
    }

    deinit {
        refreshTask?.cancel()
    }

    func start() {
        guard refreshTask == nil else { return }
        refreshTask = Task { @MainActor [weak self] in
            while let self, !Task.isCancelled {
                self.refresh()
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