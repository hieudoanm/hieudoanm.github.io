import GaugeCore
import SwiftUI

@main
struct GaugeApp: App {
    @StateObject private var viewModel = GaugeViewModel()
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
    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        false
    }
}