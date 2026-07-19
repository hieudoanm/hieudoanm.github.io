import SnapCore
import SwiftUI

@main
struct SnapApp: App {
    @StateObject private var viewModel = SnapViewModel()
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        MenuBarExtra {
            MenuBarView(viewModel: viewModel)
        } label: {
            Label("Snap", systemImage: "rectangle.split.2x2")
        }
        .menuBarExtraStyle(.window)

        Settings {
            SettingsView(viewModel: viewModel)
        }

        Window("Snap Layouts", id: "layouts") {
            LayoutListView(viewModel: viewModel)
        }
        .defaultSize(width: 500, height: 400)

        Window("Snap Settings", id: "settings") {
            SettingsView(viewModel: viewModel)
        }
        .defaultSize(width: 500, height: 350)
        .handlesExternalEvents(matching: ["settings"])

        Window("Permissions", id: "permissions") {
            PermissionView()
        }
        .defaultSize(width: 500, height: 400)
        .handlesExternalEvents(matching: ["permissions"])
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
