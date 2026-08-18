import SnapCore
import SwiftUI

struct SettingsView: View {
    @ObservedObject var viewModel: SnapViewModel
    @State private var settings: AppSettings

    init(viewModel: SnapViewModel) {
        self.viewModel = viewModel
        _settings = State(initialValue: SettingsStore.shared.settings)
    }

    var body: some View {
        TabView {
            GeneralSettingsView(settings: $settings)
                .tabItem {
                    Label("General", systemImage: "gear")
                }

            ShortcutsSettingsView()
                .tabItem {
                    Label("Shortcuts", systemImage: "keyboard")
                }

            AboutView()
                .tabItem {
                    Label("About", systemImage: "info.circle")
                }
        }
        .frame(minWidth: 500, minHeight: 350)
        .onChange(of: settings) { newSettings in
            SettingsStore.shared.settings = newSettings
        }
    }
}

struct GeneralSettingsView: View {
    @Binding var settings: AppSettings

    var body: some View {
        Form {
            Toggle("Launch at login", isOn: $settings.launchAtLogin)
            Toggle("Show in Dock", isOn: $settings.showInDock)
            Toggle("Restore layouts on monitor change", isOn: $settings.restoreOnMonitorChange)
        }
        .padding()
    }
}

struct ShortcutsSettingsView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Global Shortcuts")
                .font(.headline)

            Text("Configure keyboard shortcuts for layout restoration and window snapping.")
                .foregroundColor(.secondary)

            List {
                shortcutRow("Restore Layout 1", shortcut: "⌘⇧1")
                shortcutRow("Restore Layout 2", shortcut: "⌘⇧2")
                shortcutRow("Restore Layout 3", shortcut: "⌘⇧3")
                shortcutRow("Save Current Layout", shortcut: "⌘⇧S")
                shortcutRow("Snap Left Half", shortcut: "⌃⌥←")
                shortcutRow("Snap Right Half", shortcut: "⌃⌥→")
                shortcutRow("Snap Top Half", shortcut: "⌃⌥↑")
                shortcutRow("Snap Bottom Half", shortcut: "⌃⌥↓")
                shortcutRow("Maximize Window", shortcut: "⌃⌥M")
                shortcutRow("Center Window", shortcut: "⌃⌥C")
            }
        }
        .padding()
    }

    private func shortcutRow(_ name: String, shortcut: String) -> some View {
        HStack {
            Text(name)
            Spacer()
            Text(shortcut)
                .font(.system(.body, design: .monospaced))
                .foregroundColor(.secondary)
        }
    }
}

struct AboutView: View {
    var body: some View {
        VStack(spacing: 16) {
            Image(systemName: "rectangle.split.2x2")
                .font(.system(size: 64))
                .foregroundColor(.accentColor)

            Text("Snap")
                .font(.title)
                .fontWeight(.bold)

            Text("Snap your workspace. Restore it anytime.")
                .foregroundColor(.secondary)

            Text("Version 1.0.0")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
