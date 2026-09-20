import MacOSXCore
import SwiftUI

@main
struct MacOSXApp: App {
    @StateObject private var clipboardViewModel = AppDelegate.clipboardViewModel
    @StateObject private var clockViewModel = AppDelegate.clockViewModel
    @StateObject private var ipViewModel = AppDelegate.ipViewModel
    @StateObject private var viewModel = AppDelegate.viewModel
    @StateObject private var networkViewModel = AppDelegate.networkViewModel
    @StateObject private var portsViewModel = AppDelegate.portsViewModel
    @StateObject private var appsViewModel = AppDelegate.appsViewModel
    @StateObject private var workspacesViewModel = AppDelegate.workspacesViewModel
    @StateObject private var homebrewViewModel = AppDelegate.homebrewViewModel
    @StateObject private var batteryViewModel = AppDelegate.batteryViewModel
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra {
            MenuBarView(
                clipboardViewModel: clipboardViewModel,
                clockViewModel: clockViewModel,
                ipViewModel: ipViewModel,
                viewModel: viewModel,
                networkViewModel: networkViewModel,
                portsViewModel: portsViewModel,
                appsViewModel: appsViewModel,
                workspacesViewModel: workspacesViewModel,
                homebrewViewModel: homebrewViewModel,
                batteryViewModel: batteryViewModel
            )
        } label: {
            MenuBarIcon(viewModel: viewModel)
        }
        .menuBarExtraStyle(.window)

        Window(SettingsView.windowTitle, id: SettingsView.windowID) {
            SettingsView(viewModel: viewModel, clipboardViewModel: clipboardViewModel)
        }
        .windowResizability(.contentSize)

        Window(HomebrewView.windowTitle, id: HomebrewView.windowID) {
            HomebrewView(viewModel: homebrewViewModel)
        }
        .defaultSize(width: 1100, height: 700)
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate {
    @MainActor
    static let settingsStore = SettingsStore()

    @MainActor
    static let clipboardViewModel = ClipboardViewModel()

    @MainActor
    static let clockViewModel = ClockViewModel()

    @MainActor
    static let ipViewModel = IPViewModel()

    @MainActor
    static let viewModel = MemoryViewModel(settingsStore: settingsStore)

    @MainActor
    static let networkViewModel = NetworkViewModel(settingsStore: settingsStore)

    @MainActor
    static let portsViewModel = PortsViewModel(settingsStore: settingsStore)

    @MainActor
    static let appsViewModel = AppsViewModel()

    @MainActor
    static let workspacesViewModel = WorkspacesViewModel()

    @MainActor
    static let homebrewViewModel = HomebrewViewModel()

    @MainActor
    static let batteryViewModel = BatteryViewModel(settingsStore: settingsStore)

    @MainActor
    static let menuBarPanelPositioner = MenuBarPanelPositioner.shared

    @MainActor
    static let panelVisibilityMonitor = PanelVisibilityMonitor.shared

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)
        Task { @MainActor in
            Self.panelVisibilityMonitor.start()
            Self.networkViewModel.start()
            Self.portsViewModel.start()
            Self.batteryViewModel.start()
            Self.menuBarPanelPositioner.start()
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        false
    }
}