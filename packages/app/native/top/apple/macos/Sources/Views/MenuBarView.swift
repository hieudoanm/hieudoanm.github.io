import TopCore
import SwiftUI

struct MenuBarView: View {
    @ObservedObject var viewModel: TopViewModel

    var body: some View {
        VStack(spacing: 0) {
            header

            Divider()

            if !viewModel.isPermissionGranted {
                PermissionView(viewModel: viewModel)
            } else if viewModel.windowsByApp.isEmpty {
                emptyState
            } else {
                windowList
            }

            Divider()

            footer
        }
        .frame(width: 300, height: 250)
        .id(viewModel.refreshID)
        .onAppear {
            viewModel.refreshWindows()
        }
    }

    private var header: some View {
        HStack {
            Label("Top", systemImage: "pin.fill")
                .font(.headline)
            Spacer()
            Button(action: { viewModel.refreshWindows() }) {
                Image(systemName: "arrow.clockwise")
            }
            .buttonStyle(.borderless)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
    }

    private var emptyState: some View {
        VStack(spacing: 8) {
            Image(systemName: "pin.slash")
                .font(.title2)
                .foregroundColor(.secondary)
            Text("No windows found")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 20)
    }

    private var windowList: some View {
        List {
            ForEach(viewModel.windowsByApp.indices, id: \.self) { appIndex in
                let app = viewModel.windowsByApp[appIndex]
                Section(header: Text("\(app.appName) (\(app.bundleIdentifier))")) {
                    ForEach(app.windows.indices, id: \.self) { windowIndex in
                        let window = app.windows[windowIndex]
                        Button(action: {
                            viewModel.togglePin(
                                bundleIdentifier: app.bundleIdentifier,
                                windowTitle: window.title
                            )
                        }) {
                            HStack {
                                Image(systemName: window.isPinned ? "pin.fill" : "pin")
                                    .foregroundColor(window.isPinned ? .accentColor : .secondary)
                                    .frame(width: 16)
                                Text(window.title)
                                    .lineLimit(1)
                                Spacer()
                                if window.isPinned {
                                    Text("Pinned")
                                        .font(.caption2)
                                        .foregroundColor(.accentColor)
                                }
                            }
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
        }
        .listStyle(.sidebar)
    }

    private var footer: some View {
        HStack {
            Button("Unpin All") {
                viewModel.unpinAll()
            }
            .disabled(!viewModel.isPermissionGranted)
            .buttonStyle(.borderless)
            .font(.caption)

            Spacer()

            Button(action: {
                if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility") {
                    NSWorkspace.shared.open(url)
                }
            }) {
                Image(systemName: "gear")
                    .font(.caption)
            }
            .buttonStyle(.borderless)

            Divider()
                .frame(height: 12)

            Button("Quit") {
                NSApplication.shared.terminate(nil)
            }
            .buttonStyle(.borderless)
            .font(.caption)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
    }
}
