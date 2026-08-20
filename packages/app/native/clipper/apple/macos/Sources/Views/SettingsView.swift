import ClipperCore
import SwiftUI

struct SettingsView: View {
    @ObservedObject var store: ClipperStore
    @AppStorage("maxHistorySize") private var maxHistorySize = 500
    @AppStorage("monitorEnabled") private var monitorEnabled = true

    var body: some View {
        Form {
            Section("Clipboard Monitoring") {
                Toggle("Monitor clipboard automatically", isOn: $monitorEnabled)
                Picker("Max history size", selection: $maxHistorySize) {
                    Text("100").tag(100)
                    Text("500").tag(500)
                    Text("1,000").tag(1000)
                    Text("5,000").tag(5000)
                }
            }

            Section("Storage") {
                HStack {
                    Text("Total items")
                    Spacer()
                    Text("\(store.totalCount)")
                        .foregroundColor(.secondary)
                }
                HStack {
                    Text("Pinned items")
                    Spacer()
                    Text("\(store.pinnedCount)")
                        .foregroundColor(.secondary)
                }
                HStack {
                    Text("Text items")
                    Spacer()
                    Text("\(store.textCount)")
                        .foregroundColor(.secondary)
                }
            }

            Section {
                Button("Clear All Unpinned") {
                    store.clearUnpinned()
                }
                .foregroundColor(.red)
            }
        }
        .formStyle(.grouped)
        .frame(width: 400, height: 350)
    }
}
