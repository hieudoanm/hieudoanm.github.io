import GaugeCore
import SwiftUI

final class GaugeViewModel: ObservableObject {
    @Published private(set) var memoryStats: MemoryStats?
    @Published private(set) var diskStats: DiskStats?
    @Published private(set) var swapStats: SwapStats?
    @Published private(set) var cpuStats: CPUStats?
    @Published private(set) var systemInfo: SystemInfo?
    @Published private(set) var memoryPressure: MemoryPressureStatus = .unknown
    @Published var refreshInterval: TimeInterval
    @Published var menuBarDisplay: MenuBarDisplay

    private let memoryMonitor = MemoryMonitor()
    private let diskMonitor = DiskMonitor()
    private let swapMonitor = SwapMonitor()
    private let cpuMonitor = CPUMonitor()
    private let systemMonitor = SystemInfoMonitor()
    private let pressureMonitor = MemoryPressureMonitor()
    private let settingsStore = SettingsStore()
    private var refreshTimer: Timer?

    init() {
        self.refreshInterval = settingsStore.refreshInterval
        self.menuBarDisplay = settingsStore.menuBarDisplay
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

    var cpuPercentText: String {
        guard let stats = cpuStats else { return "--" }
        return "\(stats.usage.intRounded)%"
    }

    var swapPercentText: String {
        guard let stats = swapStats else { return "--" }
        return "\(stats.usagePercentage.intRounded)%"
    }

    var memoryValueText: String? {
        memoryStats.map { ByteFormatter.usedOverTotal(usedBytes: $0.usedBytes, totalBytes: $0.totalBytes) }
    }

    var diskValueText: String? {
        diskStats.map { ByteFormatter.usedOverTotal(usedBytes: $0.usedBytes, totalBytes: $0.totalBytes) }
    }

    var swapValueText: String? {
        swapStats.map { ByteFormatter.usedOverTotal(usedBytes: $0.usedBytes, totalBytes: $0.totalBytes) }
    }

    var cpuValueText: String? {
        cpuStats.map { $0.loadAverageText }
    }

    var diskUsedText: String? {
        diskStats.map { ByteFormatter.humanReadable($0.usedBytes) }
    }

    var menuBarDiskText: String {
        switch menuBarDisplay {
        case .percentage:
            return diskPercentText
        case .value:
            return diskUsedText ?? "--"
        case .usedOverTotal:
            return diskValueText ?? "--"
        }
    }

    func refresh() {
        if case let .success(stats) = memoryMonitor.read() {
            memoryStats = stats
        }
        if case let .success(stats) = diskMonitor.read() {
            diskStats = stats
        }
        if case let .success(stats) = swapMonitor.read() {
            swapStats = stats
        }
        if case let .success(stats) = cpuMonitor.read() {
            cpuStats = stats
        }
        if case let .success(info) = systemMonitor.read() {
            systemInfo = info
        }
        if case let .success(status) = pressureMonitor.read() {
            memoryPressure = status
        }
    }

    func updateMenuBarDisplay(_ display: MenuBarDisplay) {
        menuBarDisplay = display
        settingsStore.menuBarDisplay = display
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