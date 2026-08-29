import PortsCore
import SwiftUI

struct SettingsView: View {
    @ObservedObject var viewModel: PortsViewModel

    static let windowID = "settings"
    static let windowTitle = "Settings"

    var body: some View {
        Form {
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

            Section {
                Label {
                    Text("Ports runs entirely on your Mac")
                        .font(.caption)
                        .foregroundColor(.secondary)
                } icon: {
                    Image(systemName: "hand.raised")
                }
            }
        }
        .formStyle(.grouped)
        .frame(width: 360, height: 160)
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