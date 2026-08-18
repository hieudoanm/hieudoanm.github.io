import TopCore
import SwiftUI

struct SettingsView: View {
    @ObservedObject var viewModel: TopViewModel

    var body: some View {
        Form {
            Section("General") {
                Toggle("Re-pin windows on app launch", isOn: Binding(
                    get: { viewModel.rePinOnAppLaunch },
                    set: { viewModel.updateRePinOnAppLaunch($0) }
                ))
            }

            Section("Accessibility") {
                HStack {
                    Text("Permission Status")
                    Spacer()
                    if viewModel.isPermissionGranted {
                        Label("Granted", systemImage: "checkmark.circle.fill")
                            .foregroundColor(.green)
                    } else {
                        Label("Not Granted", systemImage: "xmark.circle.fill")
                            .foregroundColor(.red)
                    }
                }

                if !viewModel.isPermissionGranted {
                    Button("Request Permission") {
                        viewModel.requestPermission()
                    }
                }
            }

            Section("Pinned Windows") {
                if viewModel.windowsByApp.flatMap(\.windows).filter(\.isPinned).isEmpty {
                    Text("No pinned windows")
                        .foregroundColor(.secondary)
                } else {
                    ForEach(viewModel.windowsByApp, id: \.bundleIdentifier) { app in
                        ForEach(app.windows.filter(\.isPinned), id: \.title) { window in
                            HStack {
                                Image(systemName: "pin.fill")
                                    .foregroundColor(.accentColor)
                                Text(window.title)
                                    .font(.caption)
                                Spacer()
                            }
                        }
                    }

                    Button("Unpin All", role: .destructive) {
                        viewModel.unpinAll()
                    }
                }
            }
        }
        .formStyle(.grouped)
        .frame(width: 400, height: 300)
    }
}
