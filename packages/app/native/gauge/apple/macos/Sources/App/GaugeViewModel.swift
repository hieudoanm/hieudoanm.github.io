import GaugeCore
import SwiftUI

final class GaugeViewModel: ObservableObject {
    @Published private(set) var memoryStats: MemoryStats?
    @Published private(set) var diskStats: DiskStats?
    @Published var refreshInterval: TimeInterval

    private let memoryMonitor = MemoryMonitor()
    private let diskMonitor = DiskMonitor()
    private let settingsStore = SettingsStore()
    private var refreshTimer: Timer?

    init() {
        self.refreshInterval = settingsStore.refreshInterval
        refresh()
        startAutoRefresh()
    }

    var memoryPercentText: String {
        guard let stats = memoryStats else { return "--" }
        return "\(stats.usagePercentage.intRounded)%"
    }

    var diskPercentText: String {
        guard let stats = diskStats else { return "--" }
        return "\(stats.usagePercentage.intRounded)%"
    }

    var memoryPressure: MemoryPressureStatus {
        memoryStats.map(ThresholdMonitor.status) ?? .unknown
    }

    func refresh() {
        if case let .success(stats) = memoryMonitor.read() {
            memoryStats = stats
        }
        if case let .success(stats) = diskMonitor.read() {
            diskStats = stats
        }
    }

    func updateRefreshInterval(_ interval: TimeInterval) {
        guard interval >= 0.5 else { return }
        refreshInterval = interval
        settingsStore.refreshInterval = interval
        restartAutoRefresh()
    }

    private func startAutoRefresh() {
        refreshTimer = Timer.scheduledTimer(withTimeInterval: refreshInterval, repeats: true) { [weak self] _ in
            self?.refresh()
        }
    }

    private func restartAutoRefresh() {
        refreshTimer?.invalidate()
        startAutoRefresh()
    }

    deinit {
        refreshTimer?.invalidate()
    }
}

private extension Double {
    var intRounded: Int {
        Int(rounded())
    }
}