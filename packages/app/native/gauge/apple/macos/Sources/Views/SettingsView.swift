import GaugeCore
import SwiftUI

struct SettingsView: View {
    @ObservedObject var viewModel: GaugeViewModel
    @ObservedObject var clipboardViewModel: ClipboardViewModel
    @State private var launchAtLogin = LaunchAtLogin.isEnabled

    static let windowID = "settings"
    static let windowTitle = "Settings"

    var body: some View {
        Form {
            Section("General") {
                Toggle("Launch at Login", isOn: $launchAtLogin)
                    .toggleStyle(.switch)
            }

            Section("Monitoring") {
                Picker("Refresh Interval", selection: Binding(
                    get: { SelectableInterval(seconds: viewModel.refreshInterval) },
                    set: { viewModel.updateRefreshInterval($0.rawValue) }
                )) {
                    ForEach(SelectableInterval.allCases, id: \.self) { interval in
                        Text(interval.label).tag(interval)
                    }
                }
            }

            Section("Menu Bar") {
                Picker("Display", selection: Binding(
                    get: { viewModel.menuBarDisplay },
                    set: { viewModel.updateMenuBarDisplay($0) }
                )) {
                    ForEach(MenuBarDisplay.allCases, id: \.self) { display in
                        Text(display.title).tag(display)
                    }
                }
            }

            Section("Clipboard") {
                Toggle("Monitor clipboard automatically", isOn: $clipboardViewModel.isMonitoring)
                Picker("Max history size", selection: $clipboardViewModel.maxHistorySize) {
                    Text("100").tag(100)
                    Text("500").tag(500)
                    Text("1,000").tag(1000)
                    Text("5,000").tag(5000)
                }
                HStack {
                    Text("Saved items")
                    Spacer()
                    Text("\(clipboardViewModel.store.totalCount)")
                        .foregroundColor(.secondary)
                }
            }

            Section {
                Label {
                    Text("No special permissions required")
                        .font(.caption)
                        .foregroundColor(.secondary)
                } icon: {
                    Image(systemName: "checkmark.shield")
                }
            }
        }
        .formStyle(.grouped)
        .frame(width: 400, height: 400)
        .onChange(of: launchAtLogin) { newValue in
            launchAtLogin = LaunchAtLogin.setEnabled(newValue) ? newValue : LaunchAtLogin.isEnabled
        }
        .onAppear {
            launchAtLogin = LaunchAtLogin.isEnabled
        }
        .onDisappear {
            NSApp.setActivationPolicy(.accessory)
        }
    }
}

private enum SelectableInterval: Double, CaseIterable {
    case oneSecond = 1.0
    case twoSeconds = 2.0
    case fiveSeconds = 5.0
    case tenSeconds = 10.0

    var label: String {
        switch self {
        case .oneSecond: return "1 second"
        case .twoSeconds: return "2 seconds"
        case .fiveSeconds: return "5 seconds"
        case .tenSeconds: return "10 seconds"
        }
    }

    init(seconds: TimeInterval) {
        let match = SelectableInterval.allCases.first { abs($0.rawValue - seconds) < 0.01 }
        self = match ?? .oneSecond
    }
}