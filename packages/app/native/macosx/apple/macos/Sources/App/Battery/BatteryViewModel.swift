import MacOSXCore
import SwiftUI

/// Drives the Battery tab: a battery snapshot refreshed while the panel is open.
@MainActor
final class BatteryViewModel: ObservableObject {
    enum State: Equatable {
        case unavailable
        case loaded(BatteryInfo)
    }

    @Published private(set) var state: State = .unavailable

    private let monitor: BatteryMonitor
    private let settingsStore: SettingsStore
    private var refreshTask: Task<Void, Never>?
    private var visibilityObservation: NSObjectProtocol?
    private var isPanelVisible: Bool

    init(settingsStore: SettingsStore = SettingsStore(), monitor: BatteryMonitor = BatteryMonitor()) {
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
        guard case let .success(info) = monitor.read() else {
            state = .unavailable
            return
        }
        state = .loaded(info)
    }

    private func handleVisibilityChange(_ visible: Bool) {
        isPanelVisible = visible
        guard visible else { return }
        refresh()
    }
}