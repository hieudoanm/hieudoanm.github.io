import PortsCore
import SwiftUI

@main
struct PortsApp: App {
    @StateObject private var viewModel = AppDelegate.viewModel
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra {
            MenuBarView(viewModel: viewModel)
        } label: {
            MenuBarIcon(viewModel: viewModel)
        }
        .menuBarExtraStyle(.window)

        Window(SettingsView.windowTitle, id: SettingsView.windowID) {
            SettingsView(viewModel: viewModel)
        }
        .windowResizability(.contentSize)
    }
}

final class AppDelegate: NSObject, NSApplicationDelegate {
    @MainActor
    static let viewModel: PortsViewModel = PortsViewModel()

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)
        Task { @MainActor in
            Self.viewModel.start()
        }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        false
    }
}