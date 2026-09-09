import GaugeCore
import SwiftUI

@main
struct GaugeApp: App {
    @StateObject private var clipboardViewModel = AppDelegate.clipboardViewModel
    @StateObject private var viewModel = AppDelegate.viewModel
    @StateObject private var networkViewModel = AppDelegate.networkViewModel
    @StateObject private var portsViewModel = AppDelegate.portsViewModel
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra {
            MenuBarView(
                clipboardViewModel: clipboardViewModel,
                viewModel: viewModel,
                networkViewModel: networkViewModel,
                portsViewModel: portsViewModel
            )
        } label: {
            MenuBarIcon(viewModel: viewModel)
        }
        .menuBarExtraStyle(.window)

        Window(SettingsView.windowTitle, id: SettingsView.windowID) {
            SettingsView(viewModel: viewModel, clipboardViewModel: clipboardViewModel)
        }
        .windowResizability(.contentSize)
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate {
    @MainActor
    static let settingsStore = SettingsStore()

    @MainActor
    static let clipboardViewModel = ClipboardViewModel()

    @MainActor
    static let viewModel = GaugeViewModel(settingsStore: settingsStore)

    @MainActor
    static let networkViewModel = NetworkViewModel(settingsStore: settingsStore)

    @MainActor
    static let portsViewModel = PortsViewModel(settingsStore: settingsStore)

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)
        Task { @MainActor in
            Self.networkViewModel.start()
            Self.portsViewModel.start()
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        false
    }
}