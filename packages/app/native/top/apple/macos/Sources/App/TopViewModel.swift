import TopCore
import SwiftUI
import ApplicationServices

final class TopViewModel: ObservableObject {
    @Published var isPermissionGranted = false
    @Published var windowsByApp: [(appName: String, bundleIdentifier: String, windows: [(title: String, isPinned: Bool)])] = []
    @Published var launchAtLogin = false
    @Published var rePinOnAppLaunch = true
    @Published var refreshID = UUID()

    private let pinningService = WindowPinningService()
    private let windowDiscovery = WindowDiscovery()
    private let pinnedStore = PinnedWindowStore()
    private let settingsStore = SettingsStore()
    private var refreshTimer: Timer?

    init() {
        self.launchAtLogin = settingsStore.launchAtLogin
        self.rePinOnAppLaunch = settingsStore.rePinOnAppLaunch
        checkPermission()
        startAutoRefresh()
    }

    func checkPermission() {
        isPermissionGranted = pinningService.checkPermission()
        if isPermissionGranted {
            refreshWindows()
        }
    }

    func requestPermission() {
        pinningService.requestPermission()
    }

    func refreshWindows() {
        let discoveries = windowDiscovery.discoverWindows()
        let pinned = pinnedStore.pinnedIdentifiers

        windowsByApp = discoveries.compactMap { discovery in
            let windows = discovery.windows.compactMap { window -> (title: String, isPinned: Bool)? in
                guard !window.title.isEmpty else { return nil }
                let id = AppIdentifier(
                    bundleIdentifier: discovery.bundleIdentifier,
                    windowTitle: window.title
                )
                return (title: window.title, isPinned: pinned.contains(id))
            }
            guard !windows.isEmpty else { return nil }
            return (
                appName: discovery.appName,
                bundleIdentifier: discovery.bundleIdentifier,
                windows: windows
            )
        }

        refreshID = UUID()
    }

    func togglePin(bundleIdentifier: String, windowTitle: String) {
        let identifier = AppIdentifier(
            bundleIdentifier: bundleIdentifier,
            windowTitle: windowTitle
        )

        if pinnedStore.contains(identifier) {
            _ = pinningService.unpinByAppIdentifier(identifier)
            pinnedStore.remove(identifier)
        } else {
            _ = pinningService.pinByAppIdentifier(identifier)
            pinnedStore.add(identifier)
        }

        refreshWindows()
    }

    func unpinAll() {
        for pinned in pinnedStore.pinnedWindows {
            _ = pinningService.unpinByAppIdentifier(pinned.appIdentifier)
        }
        pinnedStore.clearAll()
        refreshWindows()
    }

    func updateLaunchAtLogin(_ enabled: Bool) {
        launchAtLogin = enabled
        settingsStore.launchAtLogin = enabled
    }

    func updateRePinOnAppLaunch(_ enabled: Bool) {
        rePinOnAppLaunch = enabled
        settingsStore.rePinOnAppLaunch = enabled
    }

    private func startAutoRefresh() {
        refreshTimer = Timer.scheduledTimer(withTimeInterval: 2.0, repeats: true) { [weak self] _ in
            self?.refreshWindows()
        }
    }

    deinit {
        refreshTimer?.invalidate()
    }
}
