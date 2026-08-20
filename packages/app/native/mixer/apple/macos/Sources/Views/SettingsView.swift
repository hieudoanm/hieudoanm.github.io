import MixerCore
import SwiftUI

struct SettingsView: View {
    @ObservedObject var viewModel: MixerViewModel
    @StateObject private var settingsManager = SettingsManager()

    var body: some View {
        Form {
            Section("General") {
                Toggle("Launch at login", isOn: $settingsManager.launchAtLogin)
                Toggle("Show inactive apps", isOn: $settingsManager.showInactiveApps)
                Toggle("Remember volumes", isOn: $settingsManager.rememberVolumes)
            }

            Section("Shortcuts") {
                HStack {
                    Text("Global shortcut")
                    Spacer()
                    Text(settingsManager.globalShortcut)
                        .foregroundColor(.secondary)
                }
            }

            Section("About") {
                HStack {
                    Text("Version")
                    Spacer()
                    Text("0.0.1")
                        .foregroundColor(.secondary)
                }
            }
        }
        .formStyle(.grouped)
        .frame(width: 400, height: 300)
    }
}
