import SwiftUI

@main
struct ClipperApp: App {
    @StateObject private var viewModel = ClipperViewModel()
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra {
            MenuBarView(
                store: viewModel.store,
                showHistory: $viewModel.showHistory,
                showSettings: $viewModel.showSettings
            )
        } label: {
            Label("Clipper", systemImage: "doc.on.clipboard")
        }
        .menuBarExtraStyle(.window)

        Settings {
            SettingsView(store: viewModel.store)
        }

        Window("Clipboard History", id: "history") {
            HistoryView(store: viewModel.store)
        }
        .defaultSize(width: 450, height: 500)

        Window("Clipper Settings", id: "settings") {
            SettingsView(store: viewModel.store)
        }
        .defaultSize(width: 400, height: 350)
        .handlesExternalEvents(matching: ["settings"])
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
